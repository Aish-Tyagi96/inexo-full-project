import arrowIcon from '@/assets/images/home/card-right-arrow.svg'
import { Container } from '@/components/common/Container'
import { SectionLabel } from '@/components/common/SectionLabel'

const ratingPoints = [
  'Initiation of Quotation Process',
  'Understanding Customer Needs',
  'Communication',
  'Infrastructure',
  'Quality Of Supplies',
  'Ontime Deliveries',
]

function ArrowBadge({ direction = 'right', className = '' }) {
  return (
    <span
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-yellow shadow-md ${className}`.trim()}
    >
      <img
        alt=""
        aria-hidden="true"
        className={`h-4 w-4 ${direction === 'left' ? 'rotate-180' : ''}`.trim()}
        src={arrowIcon}
      />
    </span>
  )
}

function RetentionCard({ className = '', showArrow = true }) {
  return (
    <article
      className={`flex min-h-[210px] items-center justify-between gap-6 rounded-[15px] bg-[rgba(0,48,122,0.03)] px-7 py-8 sm:px-9 ${className}`.trim()}
    >
      <div>
        <h3 className="font-['IBM_Plex_Sans'] text-[24px] font-bold leading-tight text-brand-blue lg:text-[28px]">
          Customer Retention
        </h3>

        <p className="mt-6 max-w-[250px] font-['IBM_Plex_Sans'] text-[17px] font-medium leading-[1.35] text-brand-blue lg:text-[18px]">
          Consistently trusted by our Customer year after year
        </p>
      </div>

      {showArrow && <ArrowBadge />}
    </article>
  )
}

function RetentionStat({ className = '', children }) {
  return (
    <div
      className={`flex items-center justify-center rounded-[15px] bg-brand-blue text-white ${className}`.trim()}
    >
      <span className="font-['IBM_Plex_Serif'] text-[58px] font-semibold leading-none sm:text-[66px] lg:text-[76px] select-none">
        98%
      </span>
      {children}
    </div>
  )
}

function RatingStat({ className = '', children }) {
  return (
    <div
      className={`flex items-center justify-center rounded-[15px] bg-brand-yellow text-brand-blue ${className}`.trim()}
    >
      <span className="relative font-['IBM_Plex_Serif'] text-[78px] font-semibold leading-none sm:text-[90px] lg:text-[104px] select-none">
        9
        <sup className="absolute -right-6 top-2 font-['IBM_Plex_Sans'] text-[28px] font-bold leading-none sm:text-[32px] lg:text-[36px]">
          +
        </sup>
      </span>
      {children}
    </div>
  )
}

function RatingCard({ className = '', showArrow = true }) {
  return (
    <article
      className={`flex min-h-[250px] items-center gap-7 rounded-[15px] bg-[rgba(0,48,122,0.03)] px-7 py-8 sm:px-9 ${className}`.trim()}
    >
      {showArrow && <ArrowBadge direction="left" />}

      <div>
        <h3 className="font-['IBM_Plex_Sans'] text-[24px] font-bold leading-tight text-brand-blue lg:text-[28px]">
          Rated By Customers
        </h3>

        <p className="mt-6 font-['IBM_Plex_Sans'] text-[17px] font-medium leading-[1.35] text-brand-blue lg:text-[18px]">
          Across by customers touch points
        </p>

        <ul className="mt-5 space-y-2 font-['IBM_Plex_Sans'] text-[13px] font-medium leading-tight text-brand-blue lg:text-[14px]">
          {ratingPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function HomeWhyInexo() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[120px] overflow-hidden">
      <Container>
        <div className="text-center">
          <SectionLabel className="mx-auto">Why Inexo</SectionLabel>

          <h2 className="type-4 mt-8">
            Trusted by Industry. Proven by Results.
          </h2>
        </div>

        {/* Mobile & Tablet Layout (< 1024px) */}
        <div className="mt-12 space-y-6 lg:hidden">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] md:items-center">
            <RetentionCard className="h-full" showArrow={true} />

            <RetentionStat className="mx-auto flex aspect-square w-full max-w-[280px] md:mx-0 md:max-w-none h-full" />
          </div>

          <div className="grid gap-6 md:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] md:items-center">
            <RatingStat className="mx-auto flex aspect-square w-full max-w-[280px] md:mx-0 md:max-w-none h-full" />

            <RatingCard className="h-full" showArrow={true} />
          </div>
        </div>

        {/* Responsive Desktop Overlapping Layout (>= 1024px) */}
        <div className="relative mx-auto mt-16 hidden lg:block lg:h-[420px] xl:h-[500px] w-full max-w-[960px] xl:max-w-[1120px]">
          {/* Left Card */}
          <RetentionCard 
            className="absolute lg:left-0 lg:top-0 lg:w-[400px] lg:h-[220px] lg:pr-[90px] xl:w-[470px] xl:h-[248px] xl:pr-[120px] z-[1]" 
            showArrow={false} 
          />

          {/* Blue Stat */}
          <RetentionStat 
            className="absolute lg:left-[280px] lg:top-0 lg:w-[220px] lg:h-[220px] xl:left-[330px] xl:w-[250px] xl:h-[250px] z-[3]"
          >
            <ArrowBadge 
              direction="right" 
              className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[5]" 
            />
          </RetentionStat>

          {/* Yellow Stat */}
          <RatingStat 
            className="absolute lg:left-[370px] lg:top-[175px] lg:w-[220px] lg:h-[220px] xl:left-[440px] xl:top-[205px] xl:w-[250px] xl:h-[250px] z-[4]"
          >
            <ArrowBadge 
              direction="left" 
              className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-[5]" 
            />
          </RatingStat>

          {/* Right Card */}
          <RatingCard 
            className="absolute lg:right-0 lg:top-[175px] lg:w-[440px] lg:h-[220px] lg:pl-[110px] xl:top-[205px] xl:w-[500px] xl:h-[248px] xl:pl-[128px] pr-8 z-[2]" 
            showArrow={false} 
          />
        </div>
      </Container>
    </section>
  )
}