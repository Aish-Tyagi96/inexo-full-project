import { Navigate, useParams } from 'react-router-dom'
import searchIcon from '@/assets/images/brand/search_Icon.svg'
import { Container } from '@/components/common/Container'
import { FoundryProductCard } from '@/components/common/FoundryProductCard'
import { ProductsHero } from '@/components/products/ProductsHero'
import { toCategoryCard, toProductCard, toSubCategoryCard } from '@/data/productCatalog'
import { useProductCatalogQuery } from '@/hooks/useProductCatalogQuery'
import { PillTag } from '@/components/common/PillTag'

export default function ProductCategories() {
  const { categorySlug } = useParams()
  const { data: catalog, isLoading } = useProductCatalogQuery()
  const category = catalog?.getCategoryBySlug(categorySlug)

  if (isLoading) {
    return null
  }

  if (!category) {
    return <Navigate replace to="/products" />
  }

  const categorySubCategories = catalog.getSubCategoriesByCategorySlug(category.slug).map((subCategory) => (
    toSubCategoryCard(subCategory, { categorySlug: category.slug })
  ))
  const directCategoryProducts = catalog.getProductsByCategorySlug(category.slug)
    .filter((product) => product.subCategoryId === null)
    .map((product) => toProductCard(product))
  const categoryCards = [...categorySubCategories, ...directCategoryProducts]

  const corePasteProduct = catalog.getProductBySlug('core-paste-05')
  const relatedCategories = catalog.categories
    .filter((item) => item.id !== category.id)
    .map((item) => toCategoryCard(item, { ctaLabel: 'View Products' }))

  const relatedItems = [
    ...relatedCategories,
    ...(corePasteProduct ? [toProductCard(corePasteProduct)] : [])
  ].slice(0, 4)

  const relatedSectionTitle = category.slug === 'spotex' ? 'Other Products' : 'Related Products'
  const heroSlides = [
    {
      id: `${category.slug}-hero`,
      title: category.carouselText || category.description || `${category.name} - Strength in Every Structure.`,
      imageSrc: category.carouselImage || category.image,
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
              <h2 className="type-2 mt-10">{category.name}</h2>
              <p className="mt-8 text-[18px] leading-[1.65] text-[#2A2A2A] sm:text-[20px]">
                {category.description}
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
            {categoryCards.map((card) => (
              <FoundryProductCard key={card.id} product={card} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#f4f4f4] py-16 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="text-center">
            {categorySubCategories.length === 0 ? (
              <PillTag>Request Data Sheet</PillTag>
            ) : null}
            <h2 className="type-2 mt-8">{relatedSectionTitle}</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
            {relatedItems.map((item) => (
              <FoundryProductCard key={item.id} product={item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
