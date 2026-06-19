export function toCategoryCard(category, overrides = {}) {
  return {
    id: category.slug,
    title: category.cardTitle || category.name,
    image: category.image,
    description: category.cardDescription || category.description,
    href: `/products/${category.slug}`,
    ctaLabel: 'View Products',
    ...overrides,
  }
}

export function toSubCategoryCard(subCategory, overrides = {}) {
  const { categorySlug: overrideCategorySlug, ...cardOverrides } = overrides
  const categorySlug = overrideCategorySlug ?? subCategory.categorySlug ?? subCategory.category?.slug
  const fallbackHref = '/products'

  return {
    id: subCategory.slug,
    title: subCategory.cardTitle || subCategory.name,
    image: subCategory.image,
    description: subCategory.cardDescription || subCategory.description,
    href: categorySlug ? `/products/${categorySlug}/${subCategory.slug}` : fallbackHref,
    ctaLabel: 'View Products',
    ...cardOverrides,
  }
}

export function toProductCard(product, overrides = {}) {
  return {
    id: product.slug,
    title: product.cardTitle || product.name,
    image: product.image,
    description: product.cardDescription || product.description,
    href: `/product/${product.slug}`,
    ctaLabel: 'View Details',
    ...overrides,
  }
}

function toLegacyCatalogProduct(product) {
  return {
    id: product.slug,
    title: product.cardTitle || product.name,
    image: product.image,
    href: `/product/${product.slug}`,
    description: product.cardDescription || product.description,
    heroTitle: product.carouselDescription || `${product.name} - Strength in Every Structure.`,
    detailTitle: product.name,
    overview: product.description,
    highlights: product.features.flatMap((feature) => feature.points || []),
    benefits: product.benefits.flatMap((benefit) => benefit.points || []),
    keyFeatureItems: product.features.map((feature) => ({
      title: feature.title,
      points: feature.points || [],
    })),
    typicalBenefitItems: product.benefits.map((benefit) => ({
      title: benefit.title,
      points: benefit.points || [],
    })),
    gallery: product.gallery,
    relatedProducts: product.relatedProducts || [],
  }
}

export function createCatalogModel(tree = {}) {
  const categories = Array.isArray(tree.categories) ? tree.categories : []
  const subCategories = Array.isArray(tree.subCategories) ? tree.subCategories : []
  const products = (Array.isArray(tree.products) ? tree.products : []).map((product) => {
    let related = product.relatedProducts || []
    if (typeof related === 'string') {
      try {
        related = JSON.parse(related)
      } catch {
        related = []
      }
    }
    return {
      ...product,
      relatedProducts: Array.isArray(related) ? related.map(Number) : [],
    }
  })

  const categoryBySlug = new Map(categories.map((category) => [category.slug, category]))
  const categoryById = new Map(categories.map((category) => [category.id, category]))
  const subCategoryBySlug = new Map(subCategories.map((subCategory) => [subCategory.slug, subCategory]))
  const subCategoryById = new Map(subCategories.map((subCategory) => [subCategory.id, subCategory]))
  const productBySlug = new Map(products.map((product) => [product.slug, product]))

  function getCategoryBySlug(categorySlug) {
    return categoryBySlug.get(categorySlug)
  }

  function getCategoryById(categoryId) {
    return categoryById.get(categoryId)
  }

  function getSubCategoryBySlug(subCategorySlug) {
    return subCategoryBySlug.get(subCategorySlug)
  }

  function getSubCategoryById(subCategoryId) {
    return subCategoryById.get(subCategoryId)
  }

  function getSubCategoriesByCategorySlug(categorySlug) {
    const category = getCategoryBySlug(categorySlug)

    if (!category) {
      return []
    }

    return subCategories.filter((subCategory) => subCategory.categoryId === category.id)
  }

  function getProductBySlug(productSlug) {
    return productBySlug.get(productSlug)
  }

  function getProductsByCategorySlug(categorySlug) {
    const category = getCategoryBySlug(categorySlug)

    if (!category) {
      return []
    }

    return products.filter((product) => product.categoryId === category.id)
  }

  function getProductsByCategoryAndSubCategorySlugs(categorySlug, subCategorySlug) {
    const category = getCategoryBySlug(categorySlug)
    const subCategory = getSubCategoryBySlug(subCategorySlug)

    if (!category || !subCategory || subCategory.categoryId !== category.id) {
      return []
    }

    return products.filter((product) => (
      product.categoryId === category.id && product.subCategoryId === subCategory.id
    ))
  }

  function getProductById(productId) {
    const bySlug = getProductBySlug(productId)

    if (bySlug) {
      return toLegacyCatalogProduct(bySlug)
    }

    const asNumber = Number(productId)

    if (!Number.isNaN(asNumber)) {
      const byNumericId = products.find((product) => product.id === asNumber)

      if (byNumericId) {
        return toLegacyCatalogProduct(byNumericId)
      }
    }

    return undefined
  }

  return {
    categories,
    featuredProducts: [
      ...categories.map((category) => toCategoryCard(category)),
      ...products
        .filter((product) => product.categoryId === null)
        .map((product) => toProductCard(product, { ctaLabel: 'View Details' })),
    ],
    getCategoryById,
    getCategoryBySlug,
    getProductById,
    getProductBySlug,
    getProductsByCategoryAndSubCategorySlugs,
    getProductsByCategorySlug,
    getSubCategoriesByCategorySlug,
    getSubCategoryById,
    getSubCategoryBySlug,
    homeProducts: categories.map((category) => toCategoryCard(category)),
    productCatalog: products.map((product) => toLegacyCatalogProduct(product)),
    productTree: {
      categories,
      products,
      subCategories,
    },
    products,
    subCategories,
  }
}

export const emptyCatalogModel = createCatalogModel()