import { Link } from 'react-router-dom'
import cardRightArrow from '@/assets/images/home/card-right-arrow.svg'

export function FoundryProductCard({ product }) {
  const destination = product.href ?? '/products'
  const ctaLabel = product.ctaLabel ?? 'View Details'

  return (
    <article className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-[10px] border border-[rgba(0,48,122,0.24)] bg-white sm:min-h-[470px] xl:min-h-[544px]">
      <Link aria-label={`View ${product.title} details`} className="group flex h-full flex-col" to={destination}>
        <div className="flex h-[220px] w-full items-center justify-center bg-[linear-gradient(180deg,_#FFF_0%,_#D6DAFF_100%)] px-5 py-5 sm:h-[250px] sm:px-7 xl:h-[305px] xl:px-8 xl:py-6">
          <img alt={product.title} className="h-full w-full object-contain" src={product.image} />
        </div>

        <div className="flex min-h-[200px] flex-1 flex-col bg-[var(--color-surface-foundry-product-card-panel)] px-4 pb-4 pt-4 text-white sm:min-h-[220px] sm:px-5 sm:pb-5 xl:min-h-[239px] xl:px-[20px] xl:pb-[20px] xl:pt-[20px]">
          <h3 className="foundry-product-card-title uppercase transition-opacity duration-200 group-hover:opacity-85">
            {product.title}
          </h3>

          <p className="foundry-product-card-description mt-4 max-w-[31ch] xl:max-w-[28ch]">
            {product.description}
          </p>

          <span className="mt-auto flex items-center justify-end gap-3 pt-5 text-[18px] font-semibold leading-none text-white transition-opacity duration-200 group-hover:opacity-80">
            <span className="foundry-product-card-cta">{ctaLabel}</span>
            <span className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#ffb400]">
              <img alt="" aria-hidden="true" className="h-[14px] w-[14px] object-contain" src={cardRightArrow} />
            </span>
          </span>
        </div>
      </Link>
    </article>
  )
}