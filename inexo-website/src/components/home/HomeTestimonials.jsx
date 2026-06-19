import { useMemo, useState } from 'react'
import amsteelLogo from '@/assets/images/home/amsteel.png'
import heroArrowRight from '@/assets/images/home/heroarrow-right.svg'
import { Container } from '@/components/common/Container'
import { SectionLabel } from '@/components/common/SectionLabel'

const testimonials = [
  {
    id: 'amsteel-castings',
    company: 'AMSTEEL CASTINGS',
    quote:
      'INEXO Cast Metal consistently delivers high-quality castings with reliable lead times and excellent process control.',
    logo: amsteelLogo,
    logoAlt: 'AMSTEEL Castings logo',
  },
  {
    id: 'amsteel-castings2',
    company: 'AMSTEEL CASTINGS 2',
    quote:
      'INEXO Cast Metal consistently delivers high-quality castings with reliable lead times and excellent process control.',
    logo: amsteelLogo,
    logoAlt: 'AMSTEEL Castings 2 logo',
  },
  {
    id: 'amsteel-castings3',
    company: 'AMSTEEL CASTINGS 3',
    quote:
      'INEXO Cast Metal consistently delivers high-quality castings with reliable lead times and excellent process control.',
    logo: amsteelLogo,
    logoAlt: 'AMSTEEL Castings 3 logo',
  },
]

export function HomeTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState('next')
  const activeTestimonial = useMemo(() => testimonials[activeIndex], [activeIndex])
  const isAtStart = activeIndex === 0
  const isAtEnd = activeIndex === testimonials.length - 1

  const goToPrevious = () => {
    setDirection('previous')
    setActiveIndex((currentIndex) => (currentIndex === 0 ? 0 : currentIndex - 1))
  }

  const goToNext = () => {
    setDirection('next')
    setActiveIndex((currentIndex) => (currentIndex === testimonials.length - 1 ? currentIndex : currentIndex + 1))
  }

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[110px]">
      <Container>
        <div className="flex flex-col items-center">
          <SectionLabel className="mx-auto">Testimonials</SectionLabel>

          <h2 className="type-4 mt-8 max-w-[760px] md:mt-12">
            Words From Our Valued
            <br />
            Clients
          </h2>

          <div className="mt-12 w-full max-w-[1152px] xl:mt-16">
            <div
              className={`flex flex-col overflow-hidden rounded-[10px] bg-[#F5F8FC] lg:flex-row lg:items-stretch testimonial-slide-in-${direction}`}
              key={activeTestimonial.id}
            >
              <div className="flex h-[320px] items-center justify-center bg-black p-6 sm:h-[360px] lg:h-[385px] lg:w-[412px] lg:flex-none lg:p-8">
                <img
                  alt={activeTestimonial.logoAlt}
                  className="h-auto w-full max-w-[270px] object-contain lg:max-w-[320px]"
                  src={activeTestimonial.logo}
                />
              </div>

              <div className="flex min-h-[260px] flex-1 items-center justify-center px-6 py-10 text-center sm:px-10 sm:py-12 lg:h-[385px] lg:w-[740px] lg:px-[20px] lg:py-[52px]">
                <div className="w-full">
                  <p className="text-[22px] font-normal leading-[1.5] text-[#111111] sm:text-[24px] lg:text-[24px] xl:text-[24px] xl:leading-[1.6]">
                    &ldquo;{activeTestimonial.quote}&rdquo;
                  </p>

                  <p className="mt-8 font-serif text-[22px] font-semibold uppercase leading-[1.1] tracking-[0.01em] text-brand-blue sm:text-[24px] lg:mt-10 lg:text-[22px]">
                    {activeTestimonial.company}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-[10px] sm:mt-5 lg:mt-6">
              <button
                aria-label="Previous testimonial"
                className={`grid h-[40px] w-[40px] place-items-center rounded-l-[6px] font-semibold leading-none text-[#0a2d57] cursor-pointer sm:h-[46px] sm:w-[47px] lg:h-[52px] lg:w-[53px] ${
                  isAtStart ? 'bg-[#EFEFEF]' : 'bg-[#FFB400]'
                }`}
                disabled={isAtStart}
                onClick={goToPrevious}
                type="button"
              >
                <span className="inline-flex h-[40px] w-[40px] items-center justify-center sm:h-[46px] sm:w-[47px] lg:h-[52px] lg:w-[53px]">
                  <img
                    alt=""
                    aria-hidden="true"
                    className="h-[16px] w-[8px] rotate-180 object-contain sm:h-[18px] sm:w-[9px] lg:h-[20px] lg:w-[10px]"
                    src={heroArrowRight}
                  />
                </span>
              </button>

              <button
                aria-label="Next testimonial"
                className={`grid h-[40px] w-[40px] place-items-center rounded-r-[6px] font-semibold leading-none text-[#0a2d57] cursor-pointer sm:h-[46px] sm:w-[47px] lg:h-[52px] lg:w-[53px] ${
                  isAtEnd ? 'bg-[#EFEFEF]' : 'bg-[#FFB400]'
                }`}
                disabled={isAtEnd}
                onClick={goToNext}
                type="button"
              >
                <span className="inline-flex h-[40px] w-[40px] items-center justify-center sm:h-[46px] sm:w-[47px] lg:h-[52px] lg:w-[53px]">
                  <img
                    alt=""
                    aria-hidden="true"
                    className="h-[16px] w-[8px] object-contain sm:h-[18px] sm:w-[9px] lg:h-[20px] lg:w-[10px]"
                    src={heroArrowRight}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
