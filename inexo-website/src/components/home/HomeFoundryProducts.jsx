import { Container } from '@/components/common/Container'
import { FoundryProductCard } from '@/components/common/FoundryProductCard'
import { SectionLabel } from '@/components/common/SectionLabel'
import { useProductCatalogQuery } from '@/hooks/useProductCatalogQuery'

export function HomeFoundryProducts() {
  const { data: catalog } = useProductCatalogQuery()
  const homeProducts = catalog?.homeProducts ?? []

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[120px]">
      <Container>
        <div className="text-center">
          <SectionLabel className="mx-auto">Feeding Systems</SectionLabel>

          <h2 className="type-4 mt-8">Foundry Products</h2>

          <div className="relative mx-auto mt-6 max-w-[980px]">
            <p className="type-5 mx-auto max-w-[730px] bg-white px-4 text-center text-[16px] leading-[1.7] text-[#4b4b4b] sm:text-[17px] lg:px-12">
              INEXO&apos;s products are used for making castings in a wide range of metals and alloys. These castings
              cover a wide range of applications like automotive, earthmoving, railways, petrochemicals,
              infrastructure, wind energy and power plants.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          {homeProducts.map((product) => (
            <FoundryProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  )
}
