import { useState } from 'react'
import { Container } from '@/components/common/Container'
import { SectionLabel } from '@/components/common/SectionLabel'

const faqData = [
  {
    id: 'faq-1',
    question: 'What products does INEXO Cast Metals specialize in?',
    answer: 'INEXO Cast Metals specializes in high-performance feeding system solutions for metal casting foundries. Our core product line includes custom-engineered exothermic and insulating riser sleeves, breaker cores, and specialized feeding accessories that optimize casting yields and reduce casting defects.',
  },
  {
    id: 'faq-2',
    question: 'What industries does INEXO serve?',
    answer: 'We serve a diverse range of metal casting industries worldwide, including automotive, heavy engineering, power generation, mining, aerospace, and defense foundries. Our products are designed to support steel, iron, and non-ferrous foundry operations.',
  },
  {
    id: 'faq-3',
    question: 'Where is INEXO located?',
    answer: 'Our state-of-the-art manufacturing facility and headquarters are located in India. We operate an extensive global logistics and distribution network to efficiently deliver solutions to foundry customers across the Americas, Europe, Middle East, and Asia-Pacific.',
  },
  {
    id: 'faq-4',
    question: 'What quality standards does INEXO follow?',
    answer: 'Quality is at the core of everything we do. INEXO is ISO 9001 certified and maintains rigorous quality control systems. We carry out complete thermal, chemical, and dimensional analyses on each production batch to guarantee consistent performance and reliability on the foundry floor.',
  },
  {
    id: 'faq-5',
    question: 'How can I apply for a job at INEXO?',
    answer: 'We are always looking for talented professionals to join our growing team. You can view our current openings and apply directly on our Careers page. Alternatively, you can send your resume and cover letter to our recruitment department at careers@inexocasts.com.',
  },
  {
    id: 'faq-6',
    question: 'How can I contact INEXO for product inquiries?',
    answer: 'For product quotes, technical specifications, or specialized engineering requests, please fill out the contact/quotation form on this page. You can also reach our sales and support team directly by emailing sales@inexocasts.com or calling our customer service helpline.',
  },
]

export function ContactFAQ() {
  const [openId, setOpenId] = useState(null)

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-[100px]">
      <Container>
        {/* Eyebrow Label */}
        <div className="mb-6">
          <SectionLabel textClassName="text-[#00307a] font-sans font-bold text-[14px] tracking-wider">
            Need Help?
          </SectionLabel>
        </div>

        {/* Section Heading */}
        <h2 className="type-2 font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold leading-[1.2] text-[#00307a] mb-10 sm:mb-12">
          Your Questions, Our Expertise
        </h2>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4 sm:gap-5 w-full">
          {faqData.map((item) => {
            const isOpen = openId === item.id
            return (
              <div
                key={item.id}
                className={`bg-[#FFFDF9] border border-[#f5edd6]/80 transition-all duration-300 ${isOpen
                    ? 'rounded-[28px] p-6 sm:p-8'
                    : 'rounded-[100px] px-6 py-4 sm:px-8 sm:py-5'
                  }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="flex w-full items-center justify-between gap-4 text-left font-sans font-semibold focus:outline-none cursor-pointer group"
                >
                  <span className="type-faq-question transition-colors duration-200 group-hover:text-brand-yellow">
                    {item.question}
                  </span>
                  <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200">
                    <svg
                      className={`h-5 w-5 sm:h-6 sm:w-6 text-[#00307a] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Accordion Content */}
                <div
                  id={`faq-answer-${item.id}`}
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[14px] sm:text-[16px] lg:text-[17px] leading-relaxed text-[#2A2A2A] font-sans">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
