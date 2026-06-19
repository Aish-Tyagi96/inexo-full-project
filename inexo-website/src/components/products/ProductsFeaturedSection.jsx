import { useEffect, useState } from 'react'
import heroArrowRight from '@/assets/images/home/heroarrow-right.svg'
import { Container } from '@/components/common/Container'
import { FoundryProductCard } from '@/components/common/FoundryProductCard'
import { SectionLabel } from '@/components/common/SectionLabel'
import { useProductCatalogQuery } from '@/hooks/useProductCatalogQuery'

function getCardsPerPage(width) {
  if (width < 640) {
    return 1
  }

  if (width < 1024) {
    return 2
  }

  if (width < 1536) {
    return 3
  }

  return 4
}

export function ProductsFeaturedSection() {
  const { data: catalog } = useProductCatalogQuery()
  const featuredProducts = catalog?.featuredProducts ?? []
  const [cardsPerPage, setCardsPerPage] = useState(() => {
    if (typeof window === 'undefined') {
      return 4
    }

    return getCardsPerPage(window.innerWidth)
  })
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(getCardsPerPage(window.innerWidth))
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const totalPages = Math.max(1, Math.ceil(featuredProducts.length / cardsPerPage))

  useEffect(() => {
    if (currentPage > totalPages - 1) {
      setCurrentPage(0)
    }
  }, [currentPage, totalPages])

  const currentProducts = featuredProducts.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage,
  )

  const goToPrevious = () => {
    setCurrentPage((value) => (value - 1 + totalPages) % totalPages)
  }

  const goToNext = () => {
    setCurrentPage((value) => (value + 1) % totalPages)
  }

  return (
    <section className="bg-[#f4f4f4] pb-16 pt-10 sm:pb-20 sm:pt-16 lg:pb-[120px] lg:pt-20">
      <Container>
        <div className="text-center">
          <SectionLabel className="mx-auto">Products</SectionLabel>
          <h2 className="type-4 mt-8">Our Featured Products</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 xl:gap-8">
          {currentProducts.map((product) => (
            <FoundryProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-end gap-3 sm:gap-5 lg:gap-8">
          <button
            aria-label="Previous products"
            className="grid h-[40px] w-[40px] place-items-center rounded-l-[6px] bg-white font-semibold leading-none text-[#0a2d57] cursor-pointer sm:h-[46px] sm:w-[47px] lg:h-[52px] lg:w-[53px]"
            onClick={goToPrevious}
            type="button"
          >
            <span className="inline-flex h-[40px] w-[40px] items-center justify-center sm:h-[46px] sm:w-[47px] lg:h-[52px] lg:w-[53px]">
              <img alt="" aria-hidden="true" className="h-[16px] w-[8px] rotate-180 object-contain sm:h-[18px] sm:w-[9px] lg:h-[20px] lg:w-[10px]" src={heroArrowRight} />
            </span>
          </button>

          <div className="flex items-center gap-[6px] sm:gap-[8px]">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                aria-label={`Go to product page ${index + 1}`}
                className={`rounded-full transition-all duration-200 cursor-pointer ${
                  index === currentPage
                    ? 'h-[10px] w-[28px] bg-[#FFB400] sm:h-[12px] sm:w-[34px] lg:h-[14px] lg:w-[39.5px]'
                    : 'h-[10px] w-[10px] bg-[#9AAAC4] sm:h-[12px] sm:w-[12px] lg:h-[15px] lg:w-[15px]'
                }`}
                key={index}
                onClick={() => setCurrentPage(index)}
                type="button"
              />
            ))}
          </div>

          <button
            aria-label="Next products"
            className="grid h-[40px] w-[40px] place-items-center rounded-r-[6px] bg-[#FFB400] font-semibold leading-none text-[#0a2d57] cursor-pointer sm:h-[46px] sm:w-[47px] lg:h-[52px] lg:w-[53px]"
            onClick={goToNext}
            type="button"
          >
            <span className="inline-flex h-[40px] w-[40px] items-center justify-center sm:h-[46px] sm:w-[47px] lg:h-[52px] lg:w-[53px]">
              <img alt="" aria-hidden="true" className="h-[16px] w-[8px] object-contain sm:h-[18px] sm:w-[9px] lg:h-[20px] lg:w-[10px]" src={heroArrowRight} />
            </span>
          </button>
        </div>
      </Container>
    </section>
  )
}
