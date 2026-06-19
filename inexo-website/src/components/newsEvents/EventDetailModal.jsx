import { useEffect } from 'react'

export function EventDetailModal({ event, allEvents, onClose, onSelectEvent }) {
  // Lock scroll on body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!event) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white shadow-2xl max-w-[95vw] sm:max-w-3xl lg:max-w-[900px] w-full max-h-[90vh] overflow-y-auto cursor-default animate-fade-in rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white text-gray-700 hover:text-black hover:bg-gray-100 transition-all shadow-lg cursor-pointer border border-gray-200 z-10"
          aria-label="Close modal"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 lg:p-10">
          {/* Event Title */}
          <h2 className="text-[22px] sm:text-[26px] lg:text-[30px] font-bold leading-[1.25] text-[#1a1a1a] font-serif pr-10 mb-6 sm:mb-8">
            {event.title}
          </h2>

          {/* Event Image */}
          <div className="w-full overflow-hidden rounded-[8px] sm:rounded-[12px] mb-6 sm:mb-8 bg-[#f5f5f5]">
            <img
              src={event.image}
              alt={event.imageAlt}
              className="w-full h-auto max-h-[400px] object-cover"
            />
          </div>

          {/* Full Description */}
          <p className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.75] text-[#4b4b4b] font-sans mb-8 sm:mb-10">
            {event.fullDescription || event.description}
          </p>

          {/* Other Events Navigation */}
          {/* <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {allEvents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectEvent(item)}
                  className={`text-[13px] sm:text-[14px] font-semibold transition-colors duration-200 cursor-pointer text-left ${
                    item.id === event.id
                      ? 'text-brand-blue underline underline-offset-4'
                      : 'text-[#333] hover:text-brand-blue'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
