import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { Container } from '@/components/common/Container'
import { addSubmission } from '@/features/contact/contactSlice'
import contactImage from '@/assets/images/ContactUs/ContactUs.png'

// Mock submit API call for TanStack Query
const submitQuoteRequestApi = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 1500)) // simulate network delay
  return { success: true, data }
}

export function ContactFormSection() {
  const dispatch = useDispatch()
  const [success, setSuccess] = useState(false)

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
      firstName: '',
      lastName: '',
      organizationName: '',
      product: '',
      model: '',
      preferredDate: '',
      preferredTime: '',
      mobileNumber: '',
      message: '',
    },
  })

  // Watch selected product to update model options dynamically
  const selectedProduct = watch('product')

  // Reset model field if product changes
  useEffect(() => {
    setValue('model', '')
  }, [selectedProduct, setValue])

  // Get models based on selected product
  const getModelOptions = () => {
    switch (selectedProduct) {
      case 'FEDEXO 55 XP':
        return ['FEDEXO 55 XP 50x75', 'FEDEXO 55 XP 80x150', 'FEDEXO 55 XP EPT 85x100']
      case 'FEDPOUR 40×125':
        return ['FEDPOUR 40x125 RT', 'FEDPOUR 40x125 Standard']
      case 'SPOTEX HD V 680':
        return ['SPOTEX HD V 680 Standard', 'SPOTEX HD V 680 Custom']
      case 'SPOTEX HD VC 97':
        return ['SPOTEX HD VC 97 Premium', 'SPOTEX HD VC 97 Custom']
      default:
        return []
    }
  }

  // TanStack Query Mutation
  const mutation = useMutation({
    mutationFn: submitQuoteRequestApi,
    onSuccess: (response) => {
      // Dispatch to Redux store
      dispatch(addSubmission(response.data))
      setSuccess(true)
      reset()
      setTimeout(() => setSuccess(false), 5000)
    },
  })

  const onSubmit = (data) => {
    mutation.mutate(data)
  }

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-[100px]">
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
          <div className="lg:col-span-7 w-full">
            {success ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-[12px] font-sans text-center shadow-sm">
                <p className="font-bold text-[20px] mb-2">Request Submitted!</p>
                <p className="text-[16px]">Thank you for your interest. A representative from INEXO will call you back shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[14px] font-semibold text-gray-700 mb-2" htmlFor="firstName">
                      First Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      className={`w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border ${
                        errors.firstName ? 'border-red-400 focus:ring-red-100' : 'border-[#e2eaf4] focus:ring-brand-blue/20'
                      } font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:border-[#00307a] transition-all`}
                      {...register('firstName', { required: 'First name is required' })}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[14px] font-semibold text-gray-700 mb-2" htmlFor="lastName">
                      Last Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      className={`w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border ${
                        errors.lastName ? 'border-red-400 focus:ring-red-100' : 'border-[#e2eaf4] focus:ring-brand-blue/20'
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
                  <label className="block text-[14px] font-semibold text-gray-700 mb-2" htmlFor="organizationName">
                    Organization Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    placeholder="Organization Name"
                    className={`w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border ${
                      errors.organizationName ? 'border-red-400 focus:ring-red-100' : 'border-[#e2eaf4] focus:ring-brand-blue/20'
                    } font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:border-[#00307a] transition-all`}
                    {...register('organizationName', { required: 'Organization name is required' })}
                  />
                  {errors.organizationName && (
                    <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.organizationName.message}</p>
                  )}
                </div>

                {/* Select a Product */}
                <div>
                  <label className="block text-[14px] font-semibold text-gray-700 mb-2" htmlFor="product">
                    Select a Product<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="product"
                    className={`w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border ${
                      errors.product ? 'border-red-400 focus:ring-red-100' : 'border-[#e2eaf4] focus:ring-brand-blue/20'
                    } font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:border-[#00307a] transition-all appearance-none cursor-pointer`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300307a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 20px center',
                      backgroundSize: '16px',
                      backgroundRepeat: 'no-repeat',
                    }}
                    {...register('product', { required: 'Product selection is required' })}
                  >
                    <option value="">Select a Product</option>
                    <option value="FEDEXO 55 XP">FEDEXO 55 XP</option>
                    <option value="FEDPOUR 40×125">FEDPOUR 40×125</option>
                    <option value="SPOTEX HD V 680">SPOTEX HD V 680</option>
                    <option value="SPOTEX HD VC 97">SPOTEX HD VC 97</option>
                  </select>
                  {errors.product && (
                    <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.product.message}</p>
                  )}
                </div>

                {/* Select Model */}
                <div>
                  <label className="block text-[14px] font-semibold text-gray-700 mb-2" htmlFor="model">
                    Select Model<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="model"
                    disabled={!selectedProduct}
                    className={`w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border ${
                      errors.model ? 'border-red-400 focus:ring-red-100' : 'border-[#e2eaf4] focus:ring-brand-blue/20'
                    } font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:border-[#00307a] transition-all appearance-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300307a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 20px center',
                      backgroundSize: '16px',
                      backgroundRepeat: 'no-repeat',
                    }}
                    {...register('model', { required: 'Model selection is required' })}
                  >
                    <option value="">Select Model</option>
                    {getModelOptions().map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.model && (
                    <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.model.message}</p>
                  )}
                </div>

                {/* Preferred Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[14px] font-semibold text-gray-700 mb-2" htmlFor="preferredDate">
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
                    <label className="block text-[14px] font-semibold text-gray-700 mb-2" htmlFor="preferredTime">
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
                  <label className="block text-[14px] font-semibold text-gray-700 mb-2" htmlFor="mobileNumber">
                    Mobile Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    placeholder="Mobile Number"
                    className={`w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border ${
                      errors.mobileNumber ? 'border-red-400 focus:ring-red-100' : 'border-[#e2eaf4] focus:ring-brand-blue/20'
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
                  <label className="block text-[14px] font-semibold text-gray-700 mb-2" htmlFor="message">
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
              </form>
            )}
          </div>

          {/* Image & Location Column */}
          <div className="lg:col-span-5 flex flex-col space-y-10">
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
              <h3 className="font-serif text-[24px] lg:text-[28px] font-bold text-[#00307a] leading-tight">
                Regd. Office &amp; Works
              </h3>

              <p className="font-sans text-[16px] sm:text-[18px] leading-[1.8] text-[#00307a] font-medium max-w-[450px]">
                No:28, Thiruvallur High Road, via Thirumazhisai, Puduchathiram Post, Gudapakkam, Chennai – 600 124, Tamil Nadu, India.
              </p>

              <p className="font-sans text-[16px] sm:text-[18px] leading-[1.8] text-[#00307a] font-semibold">
                Mobile Number : <a href="tel:+919790904848" className="hover:underline">+91 – 97909 04848</a>
              </p>

              <p className="font-sans text-[16px] sm:text-[18px] leading-[1.8] text-[#00307a] font-semibold">
                Email id : <a href="mailto:sales@inexocast.in" className="hover:underline">sales@inexocast.in</a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
