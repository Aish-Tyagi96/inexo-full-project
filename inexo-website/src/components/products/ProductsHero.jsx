import { useEffect, useState } from 'react'
import heroArrowRight from '@/assets/images/home/heroarrow-right.svg'
import productHeroImage from '@/assets/images/Products/INEXO.png'
import { Container } from '@/components/common/Container'

const defaultSlides = [
  {
    id: 1,
    title: 'INEXO Feeding Systems - Strength in Every Structure',
    imageSrc: productHeroImage,
  },
  {
    id: 2,
    title: 'Engineered Sleeves Built For Better Yield And Reliable Feed Performance',
    imageSrc: productHeroImage,
  },
  {
    id: 3,
    title: 'Product Innovation Designed For Modern Foundry Needs',
    imageSrc: productHeroImage,
  },
]

export function ProductsHero({ slides = defaultSlides }) {
  const heroSlides = slides.length > 0 ? slides : defaultSlides
  const hasMultipleSlides = heroSlides.length > 1
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState('next')

  useEffect(() => {
    if (currentIndex >= heroSlides.length) {
      setCurrentIndex(0)
    }
  }, [currentIndex, heroSlides.length])

  useEffect(() => {
    if (!hasMultipleSlides) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((value) => (value + 1) % heroSlides.length)
      setDirection('next')
    }, 7000)

    return () => window.clearInterval(timer)
  }, [hasMultipleSlides, heroSlides.length])

  const currentSlide = heroSlides[currentIndex]

  const goToNext = () => {
    if (!hasMultipleSlides) {
      return
    }

    setDirection('next')
    setCurrentIndex((value) => (value + 1) % heroSlides.length)
  }

  const goToPrevious = () => {
    if (!hasMultipleSlides) {
      return
    }

    setDirection('prev')
    setCurrentIndex((value) => (value - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index) => {
    if (!hasMultipleSlides) {
      return
    }

    setDirection(index > currentIndex ? 'next' : 'prev')
    setCurrentIndex(index)
  }

  return (
    <section className="bg-white">
      <div className="bg-[linear-gradient(110deg,#F5F5F5_9.65%,#E1EDFF_87.99%)]">
        <Container>
          <div className="relative isolate min-h-[360px] overflow-hidden py-10 sm:min-h-[430px] sm:py-14 lg:min-h-[560px] lg:py-0">
            <div className="grid min-h-[inherit] grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_564.743px]">
              <div className={`${direction === 'next' ? 'hero-copy-slide-in-right' : 'hero-copy-slide-in-left'} min-w-0 max-w-[991px]`} key={`copy-${currentSlide.id}`}>
                <h1 className="hero-title-on-light w-full max-w-[991px]">
                  {currentSlide.title}
                </h1>
              </div>

              <div className="relative mx-auto flex w-full items-center justify-center lg:mx-0 lg:w-[564.743px] lg:h-[555.31px]">
                <div
                  className={`${direction === 'next' ? 'hero-media-slide-in-right' : 'hero-media-slide-in-left'} relative flex h-[300px] w-[300px] items-center justify-center sm:h-[380px] sm:w-[380px] lg:h-full lg:w-full`}
                  key={currentSlide.id}
                >
                  <img
                    alt="Inexo product"
                    className="h-[82%] w-[82%] object-contain"
                    src={currentSlide.imageSrc}
                  />
                </div>
              </div>
            </div>

            {hasMultipleSlides ? (
              <div className="absolute bottom-5 right-0 flex items-center gap-3 sm:bottom-7 sm:gap-5 lg:bottom-11 lg:right-0 lg:gap-8 min-[1728px]:gap-[21px]">
                <button
                  aria-label="Previous slide"
                  className="grid h-[40px] w-[40px] place-items-center rounded-l-[6px] bg-white font-semibold leading-none text-[#0a2d57] cursor-pointer sm:h-[46px] sm:w-[47px] lg:h-[52px] lg:w-[53px]"
                  onClick={goToPrevious}
                  type="button"
                >
                  <span className="inline-flex h-[40px] w-[40px] items-center justify-center sm:h-[46px] sm:w-[47px] lg:h-[52px] lg:w-[53px]">
                    <img alt="" aria-hidden="true" className="h-[16px] w-[8px] rotate-180 object-contain sm:h-[18px] sm:w-[9px] lg:h-[20px] lg:w-[10px]" src={heroArrowRight} />
                  </span>
                </button>

                <div className="flex items-center gap-[6px] sm:gap-[8px]">
                  {heroSlides.map((slide, index) => (
                    <button
                      aria-label={`Go to slide ${index + 1}`}
                      className={`rounded-full transition-all duration-200 cursor-pointer ${
                        index === currentIndex
                          ? 'h-[10px] w-[28px] bg-[#FFB400] sm:h-[12px] sm:w-[34px] lg:h-[14px] lg:w-[39.5px]'
                          : 'h-[10px] w-[10px] bg-[#7D95BD] sm:h-[12px] sm:w-[12px] lg:h-[15px] lg:w-[15px]'
                      }`}
                      key={slide.id}
                      onClick={() => goToSlide(index)}
                      type="button"
                    />
                  ))}
                </div>

                <button
                  aria-label="Next slide"
                  className="grid h-[40px] w-[40px] place-items-center rounded-r-[6px] bg-[#FFB400] font-semibold leading-none text-[#0a2d57] cursor-pointer sm:h-[46px] sm:w-[47px] lg:h-[52px] lg:w-[53px]"
                  onClick={goToNext}
                  type="button"
                >
                  <span className="inline-flex h-[40px] w-[40px] items-center justify-center sm:h-[46px] sm:w-[47px] lg:h-[52px] lg:w-[53px]">
                    <img alt="" aria-hidden="true" className="h-[16px] w-[8px] object-contain sm:h-[18px] sm:w-[9px] lg:h-[20px] lg:w-[10px]" src={heroArrowRight} />
                  </span>
                </button>
              </div>
            ) : null}
          </div>
        </Container>
      </div>
    </section>
  )
}