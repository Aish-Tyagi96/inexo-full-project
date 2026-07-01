import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import Confetti from 'react-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { addSubmission } from '@/features/contact/contactSlice'
import contactImage from '@/assets/images/ContactUs/ContactUs.png'
import { useProductCatalogQuery } from '@/hooks/useProductCatalogQuery'

import { apiRequest } from '@/services/apiClient'

// Submit API call for TanStack Query
const submitQuoteRequestApi = async (data) => {
  return await apiRequest('/contact', { method: 'POST', body: data })
}

export function ContactFormSection() {
  const dispatch = useDispatch()
  const [success, setSuccess] = useState(false)

  // Fetch product catalog tree from API (TanStack Query)
  const { data: catalog } = useProductCatalogQuery()

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      inquiryType: '',
      firstName: '',
      lastName: '',
      organizationName: '',
      category: '',
      subCategory: '',
      product: '',
      preferredDate: '',
      preferredTime: '',
      mobileNumber: '',
      message: '',
    },
  })

  // Watch inquiry type, category and subcategory selections to update options dynamically
  const selectedInquiryType = watch('inquiryType')
  const selectedCategorySlug = watch('category')
  const selectedSubCategorySlug = watch('subCategory')

  // Get categories and subcategories based on selection
  const categories = catalog?.categories || []
  const subCategories = selectedCategorySlug
    ? catalog?.getSubCategoriesByCategorySlug(selectedCategorySlug) || []
    : []
  const hasSubCategories = subCategories.length > 0

  // Get products based on category / subcategory selection
  const productOptions = selectedCategorySlug
    ? hasSubCategories
      ? (selectedSubCategorySlug ? catalog?.getProductsByCategoryAndSubCategorySlugs(selectedCategorySlug, selectedSubCategorySlug) || [] : [])
      : catalog?.getProductsByCategorySlug(selectedCategorySlug) || []
    : []

  // Reset dependent fields when category or subcategory changes
  useEffect(() => {
    setValue('subCategory', '')
    setValue('product', '')
  }, [selectedCategorySlug, setValue])

  useEffect(() => {
    setValue('product', '')
  }, [selectedSubCategorySlug, setValue])

  // Clear products selections if inquiryType changes to careers
  useEffect(() => {
    if (selectedInquiryType === 'careers') {
      setValue('category', '')
      setValue('subCategory', '')
      setValue('product', '')
    }
  }, [selectedInquiryType, setValue])

  // TanStack Query Mutation
  const mutation = useMutation({
    mutationFn: submitQuoteRequestApi,
    onSuccess: (response) => {
      // Dispatch to Redux store
      dispatch(addSubmission(response.data))
      setSuccess(true)
      reset()
      setTimeout(() => setSuccess(false), 5000)
    }
  })

  const onSubmit = (data) => {
    mutation.mutate(data)
  }

  return (
    <section id="contact-form" className="bg-white py-14 sm:py-20 lg:py-[100px]">
      <Container>
        {/* Main Title Section */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <h2 className="type-2 font-serif text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.2] text-[#00307a] mb-4">
            Get a Call Back for a Quotation
          </h2>
          <p className="font-sans text-[15px] sm:text-[17px] leading-[1.6] text-[#4b4b4b]">
            Request a call back to receive a quotation from our team—just share your details, and we’ll get in touch with you shortly!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Form Column */}
          <div className="lg:col-span-6 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block form-label text-gray-700 mb-2" htmlFor="firstName">
                      First Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      className={`w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border ${errors.firstName ? 'border-red-400 focus:ring-red-100' : 'border-[#e2eaf4] focus:ring-brand-blue/20'
                        } font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:border-[#00307a] transition-all`}
                      {...register('firstName', { required: 'First name is required' })}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block form-label text-gray-700 mb-2" htmlFor="lastName">
                      Last Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      className={`w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border ${errors.lastName ? 'border-red-400 focus:ring-red-100' : 'border-[#e2eaf4] focus:ring-brand-blue/20'
                        } font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:border-[#00307a] transition-all`}
                      {...register('lastName', { required: 'Last name is required' })}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Organization Name */}
                <div>
                  <label className="block form-label text-gray-700 mb-2" htmlFor="organizationName">
                    Organization Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    placeholder="Organization Name"
                    className={`w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border ${errors.organizationName ? 'border-red-400 focus:ring-red-100' : 'border-[#e2eaf4] focus:ring-brand-blue/20'
                      } font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:border-[#00307a] transition-all`}
                    {...register('organizationName', { required: 'Organization name is required' })}
                  />
                  {errors.organizationName && (
                    <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.organizationName.message}</p>
                  )}
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block form-label text-gray-700 mb-2" htmlFor="inquiryType">
                    Inquiry Type<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    className={`w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border ${errors.inquiryType ? 'border-red-400 focus:ring-red-100' : 'border-[#e2eaf4] focus:ring-brand-blue/20'
                      } font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:border-[#00307a] transition-all appearance-none cursor-pointer`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300307a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 20px center',
                      backgroundSize: '16px',
                      backgroundRepeat: 'no-repeat',
                    }}
                    {...register('inquiryType', { required: 'Inquiry type is required' })}
                  >
                    <option value="">Careers or Sales</option>
                    <option value="careers">Careers</option>
                    <option value="sales">Sales</option>
                  </select>
                  {errors.inquiryType && (
                    <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.inquiryType.message}</p>
                  )}
                </div>

                {/* Select Category */}
                <div>
                  <label className="block form-label text-gray-700 mb-2" htmlFor="category">
                    Select Category{selectedInquiryType !== 'careers' && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    id="category"
                    disabled={selectedInquiryType === 'careers'}
                    className={`w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border ${errors.category ? 'border-red-400 focus:ring-red-100' : 'border-[#e2eaf4] focus:ring-brand-blue/20'
                      } font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:border-[#00307a] transition-all appearance-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300307a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 20px center',
                      backgroundSize: '16px',
                      backgroundRepeat: 'no-repeat',
                    }}
                    {...register('category', { required: selectedInquiryType === 'careers' ? false : 'Category selection is required' })}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.category.message}</p>
                  )}
                </div>

                {/* Select Sub Category */}
                <div>
                  <label className="block form-label text-gray-700 mb-2" htmlFor="subCategory">
                    Select Sub Category{hasSubCategories && selectedInquiryType !== 'careers' && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    id="subCategory"
                    disabled={selectedInquiryType === 'careers' || !selectedCategorySlug || !hasSubCategories}
                    className={`w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border ${errors.subCategory ? 'border-red-400 focus:ring-red-100' : 'border-[#e2eaf4] focus:ring-brand-blue/20'
                      } font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:border-[#00307a] transition-all appearance-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300307a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 20px center',
                      backgroundSize: '16px',
                      backgroundRepeat: 'no-repeat',
                    }}
                    {...register('subCategory', { required: (hasSubCategories && selectedInquiryType !== 'careers') ? 'Subcategory selection is required' : false })}
                  >
                    <option value="">
                      {selectedInquiryType === 'careers'
                        ? 'Select Sub Category'
                        : !selectedCategorySlug
                          ? 'Select Sub Category'
                          : hasSubCategories
                            ? 'Select Sub Category'
                            : 'No Sub Category Available'}
                    </option>
                    {subCategories.map((sub) => (
                      <option key={sub.id} value={sub.slug}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                  {errors.subCategory && (
                    <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.subCategory.message}</p>
                  )}
                </div>

                {/* Select Product */}
                <div>
                  <label className="block form-label text-gray-700 mb-2" htmlFor="product">
                    Select Product{selectedInquiryType !== 'careers' && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    id="product"
                    disabled={selectedInquiryType === 'careers' || !selectedCategorySlug || (hasSubCategories && !selectedSubCategorySlug)}
                    className={`w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border ${errors.product ? 'border-red-400 focus:ring-red-100' : 'border-[#e2eaf4] focus:ring-brand-blue/20'
                      } font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:border-[#00307a] transition-all appearance-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300307a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 20px center',
                      backgroundSize: '16px',
                      backgroundRepeat: 'no-repeat',
                    }}
                    {...register('product', { required: selectedInquiryType === 'careers' ? false : 'Product selection is required' })}
                  >
                    <option value="">Select Product</option>
                    {productOptions.map((prod) => (
                      <option key={prod.id} value={prod.slug}>
                        {prod.name}
                      </option>
                    ))}
                  </select>
                  {errors.product && (
                    <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.product.message}</p>
                  )}
                </div>

                {/* Preferred Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block form-label text-gray-700 mb-2" htmlFor="preferredDate">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      className="w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border border-[#e2eaf4] font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-[#00307a] transition-all cursor-pointer"
                      {...register('preferredDate')}
                    />
                  </div>

                  <div>
                    <label className="block form-label text-gray-700 mb-2" htmlFor="preferredTime">
                      Preferred Time
                    </label>
                    <select
                      id="preferredTime"
                      className="w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border border-[#e2eaf4] font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-[#00307a] transition-all appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300307a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundPosition: 'right 20px center',
                        backgroundSize: '16px',
                        backgroundRepeat: 'no-repeat',
                      }}
                      {...register('preferredTime')}
                    >
                      <option value="">Preferred Time</option>
                      <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                      <option value="Evening (3 PM - 6 PM)">Evening (3 PM - 6 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block form-label text-gray-700 mb-2" htmlFor="mobileNumber">
                    Mobile Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    placeholder="Mobile Number"
                    className={`w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border ${errors.mobileNumber ? 'border-red-400 focus:ring-red-100' : 'border-[#e2eaf4] focus:ring-brand-blue/20'
                      } font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:border-[#00307a] transition-all`}
                    {...register('mobileNumber', {
                      required: 'Mobile number is required',
                      pattern: {
                        value: /^[0-9+\-\s]{8,15}$/,
                        message: 'Please enter a valid mobile number',
                      },
                    })}
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.mobileNumber.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block form-label text-gray-700 mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Message"
                    className="w-full p-5 rounded-[10px] bg-[#F6FAFF] border border-[#e2eaf4] font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-[#00307a] transition-all resize-none"
                    {...register('message')}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full h-[60px] inline-flex items-center justify-center rounded-[8px] bg-[#00307a] hover:bg-[#002257] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-sans text-[18px] font-bold tracking-wide transition-all shadow-md cursor-pointer"
                >
                  {mutation.isPending ? 'Requesting...' : 'Request a Call Back'}
                </button>
                {mutation.isError && (
                   <p className="text-red-500 text-sm font-semibold text-center mt-3">
                     Failed to submit request. Please check your network and try again.
                   </p>
                 )}
              </form>
          </div>

          {/* Image & Location Column */}
          <div className="lg:col-span-6 flex flex-col space-y-10">
            {/* Photo Frame */}
            <div className="w-full overflow-hidden rounded-[20px] shadow-md">
              <img
                src={contactImage}
                alt="Customer Requesting Call Back"
                className="w-full h-auto object-cover aspect-[4/3] lg:aspect-[1.4]"
              />
            </div>

            {/* Office Details */}
            <div className="space-y-6">
              <h3 className="contact-office-heading">
                Regd. Office &amp; Works
              </h3>

              <p className="contact-office-body">
                No:28, Thiruvallur High Road, via Thirumazhisai, Puduchathiram Post, Gudapakkam, Chennai – 600 124, Tamil Nadu, India.
              </p>

              <p className="contact-office-body">
                Mobile Number :{' '}
                <a href="tel:+919790904848">
                  +91 – 97909 04848
                </a>
              </p>

              <p className="contact-office-body">
                Email id :{' '}
                <a href="mailto:sales@inexocast.in">
                  sales@inexocast.in
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#00173db3] backdrop-blur-sm"
              onClick={() => setSuccess(false)}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="relative w-full max-w-md bg-white rounded-[20px] p-8 sm:p-10 text-center shadow-2xl z-10"
            >
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={400}
                gravity={0.15}
                style={{ position: 'fixed', top: 0, left: 0, zIndex: 100, pointerEvents: 'none' }}
              />
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-[24px] sm:text-[28px] font-serif font-bold text-[#00307a] mb-3">
                Request Submitted!
              </h3>
              <p className="text-[16px] text-gray-600 mb-8 font-sans">
                Thank you for your interest. A representative from INEXO will reach out to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="w-full h-[50px] bg-[#00307a] text-white rounded-lg font-bold tracking-wide hover:bg-[#002257] transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
