import { Navigate, useParams } from 'react-router-dom'
import searchIcon from '@/assets/images/brand/search_Icon.svg'
import { Container } from '@/components/common/Container'
import { FoundryProductCard } from '@/components/common/FoundryProductCard'
import { ProductsHero } from '@/components/products/ProductsHero'
import { PillTag } from '@/components/common/PillTag'
import { toProductCard, toSubCategoryCard, toCategoryCard } from '@/data/productCatalog'
import { useProductCatalogQuery } from '@/hooks/useProductCatalogQuery'

export default function ProductsPage() {
  const { categorySlug, subCategorySlug } = useParams()
  const { data: catalog, isLoading } = useProductCatalogQuery()
  const category = catalog?.getCategoryBySlug(categorySlug)
  const subCategory = catalog?.getSubCategoryBySlug(subCategorySlug)

  if (isLoading) {
    return null
  }

  if (!category || !subCategory || subCategory.categoryId !== category.id) {
    return <Navigate replace to="/products" />
  }

  const subCategoryProducts = catalog.getProductsByCategoryAndSubCategorySlugs(category.slug, subCategory.slug)
    .map((product) => toProductCard(product))
  let relatedCards = [
    ...catalog.getSubCategoriesByCategorySlug(category.slug)
      .filter((item) => item.id !== subCategory.id)
      .map((item) => toSubCategoryCard(item, { categorySlug: category.slug })),
    ...catalog.getProductsByCategorySlug(category.slug)
      .filter((product) => product.subCategoryId === null)
      .map((product) => toProductCard(product)),
  ].slice(0, 4)

  let showGenericTitle = false
  if (relatedCards.length === 0) {
    relatedCards = catalog.categories
      .filter((c) => c.id !== category.id)
      .map((c) => toCategoryCard(c, { ctaLabel: 'View Products' }))
      .slice(0, 4)
    showGenericTitle = true
  }
  const heroSlides = [
    {
      id: `${subCategory.slug}-hero`,
      title: subCategory.carouselText || subCategory.description || `${subCategory.name} - Strength in Every Structure.`,
      imageSrc: subCategory.carouselImage || subCategory.image,
    },
  ]

  return (
    <>
      <ProductsHero slides={heroSlides} />

      <section className="bg-[#f4f4f4] py-10 md:py-20 lg:py-[120px]">
        <Container>
          <div className="mb-8 flex justify-end md:mb-12">
            <label className="relative block w-full max-w-[330px]">
              <img alt="Search" className="absolute left-[25px] top-1/2 h-[29.451px] w-[29.451px] -translate-y-1/2" src={searchIcon} />
              <input
                aria-label="Search for products"
                className="search-input w-full bg-transparent placeholder:text-[#A6B4CF] focus:outline-none"
                placeholder="Search for products"
                type="search"
              />
            </label>
          </div>

          <div className="w-full max-w-[991px]">
            <div>
              <h2 className="type-2 mt-10">{subCategory.name}</h2>
              <p className="mt-8 text-[18px] leading-[1.65] text-[#2A2A2A] sm:text-[20px]">
                {subCategory.description}
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
            {subCategoryProducts.map((product) => (
              <FoundryProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#f4f4f4] py-16 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="text-center">
            <PillTag>Request Data Sheet</PillTag>
            <h2 className="type-2 mt-8">
              {showGenericTitle ? 'Related Products' : `Related Products of ${category.name}`}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
            {relatedCards.map((relatedProduct) => (
              <FoundryProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}