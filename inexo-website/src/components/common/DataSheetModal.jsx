import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { apiRequest } from '@/services/apiClient'

const submitDataSheetRequest = async (data) => {
  return await apiRequest('/contact', { method: 'POST', body: data })
}

export function DataSheetModal({ open, onClose, productCategory = '' }) {
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: '',
      organizationName: '',
      email: '',
    },
  })

  const mutation = useMutation({
    mutationFn: submitDataSheetRequest,
    onSuccess: () => {
      setSuccess(true)
      reset()
    },
  })

  const onSubmit = (data) => {
    mutation.mutate({
      firstName: data.fullName,
      lastName: '',
      organizationName: data.organizationName,
      inquiryType: 'sales',
      category: productCategory,
      subCategory: '',
      product: '',
      preferredDate: '',
      preferredTime: '',
      mobileNumber: '',
      message: `Data Sheet Request for ${productCategory}. Contact email: ${data.email}`,
    })
  }

  const handleClose = () => {
    setSuccess(false)
    mutation.reset()
    reset()
    onClose()
  }

  const inputClass = (hasError) =>
    `w-full h-[54px] px-5 rounded-[10px] bg-[#F6FAFF] border ${
      hasError
        ? 'border-red-400 focus:ring-red-100'
        : 'border-[#e2eaf4] focus:ring-brand-blue/20'
    } font-sans text-[15px] text-[#00307a] focus:outline-none focus:ring-2 focus:border-[#00307a] transition-all`

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#00173db3] backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
            className="relative w-full max-w-lg bg-white rounded-[20px] shadow-2xl z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#00307a] px-8 py-6 flex items-center justify-between">
              <h2 className="text-white font-serif text-[22px] sm:text-[26px] font-bold">
                Request Data Sheet
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-8 py-8">
              {success ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-[22px] font-serif font-bold text-[#00307a] mb-3">
                    Request Submitted!
                  </h3>
                  <p className="text-[15px] text-gray-600 mb-8 font-sans">
                    Thank you! Our sales team will send the data sheet to your email shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full h-[50px] bg-[#00307a] text-white rounded-lg font-bold tracking-wide hover:bg-[#002257] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Full Name & Organization Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-[14px] font-semibold text-gray-700 mb-2" htmlFor="ds-fullName">
                        Full Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="ds-fullName"
                        placeholder="Full Name"
                        className={inputClass(errors.fullName)}
                        {...register('fullName', { required: 'Full name is required' })}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block font-sans text-[14px] font-semibold text-gray-700 mb-2" htmlFor="ds-organizationName">
                        Organization Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="ds-organizationName"
                        placeholder="Organization Name"
                        className={inputClass(errors.organizationName)}
                        {...register('organizationName', { required: 'Organization name is required' })}
                      />
                      {errors.organizationName && (
                        <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.organizationName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-sans text-[14px] font-semibold text-gray-700 mb-2" htmlFor="ds-email">
                      Email Address<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="ds-email"
                      placeholder="your@email.com"
                      className={inputClass(errors.email)}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Product Category (auto-filled, read-only) */}
                  <div>
                    <label className="block font-sans text-[14px] font-semibold text-gray-700 mb-2" htmlFor="ds-category">
                      Product Category
                    </label>
                    <input
                      type="text"
                      id="ds-category"
                      value={productCategory}
                      readOnly
                      className="w-full h-[54px] px-5 rounded-[10px] bg-[#eef3fb] border border-[#e2eaf4] font-sans text-[15px] text-[#00307a] cursor-not-allowed opacity-80"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full h-[56px] inline-flex items-center justify-center rounded-[10px] bg-[#00307a] hover:bg-[#002257] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-sans text-[16px] font-bold tracking-wide transition-all shadow-md cursor-pointer mt-2"
                  >
                    {mutation.isPending ? 'Submitting...' : 'Submit Request'}
                  </button>

                  {mutation.isError && (
                    <p className="text-red-500 text-sm font-semibold text-center mt-2">
                      Failed to submit. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
