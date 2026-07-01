import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
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

function CountUp({ to, from = 0, duration = 2.5 }) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-50px' })

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: duration,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setCount(Math.round(latest))
        },
      })
      return () => controls.stop()
    }
  }, [isInView, from, to, duration])

  return <span ref={ref}>{count}</span>
}

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
    <motion.article
      initial={{ opacity: 0, x: -120 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`flex min-h-[210px] items-center justify-between gap-6 rounded-[15px] bg-[rgba(0,48,122,0.03)] px-7 py-8 sm:px-9 ${className}`.trim()}
    >
      <div>
        <h3 className="why-inexo-card-title">
          Customer Retention
        </h3>

        <p className="why-inexo-card-description mt-6 max-w-[250px]">
          Consistently trusted by our Customer year after year
        </p>
      </div>

      {showArrow && <ArrowBadge />}
    </motion.article>
  )
}

function RetentionStat({ className = '', children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
      className={`flex items-center justify-center rounded-[15px] bg-brand-blue text-white ${className}`.trim()}
    >
      <span className="why-inexo-stat-number select-none">
        <CountUp to={98} />%
      </span>
      {children}
    </motion.div>
  )
}

function RatingStat({ className = '', children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      className={`flex items-center justify-center rounded-[15px] bg-brand-yellow text-brand-blue ${className}`.trim()}
    >
      <span className="relative why-inexo-rating-number select-none">
        <CountUp to={9} />
        <sup className="absolute -right-6 top-2 why-inexo-rating-sup">
          +
        </sup>
      </span>
      {children}
    </motion.div>
  )
}

function RatingCard({ className = '', showArrow = true }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 120 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`flex min-h-[250px] items-center gap-7 rounded-[15px] bg-[rgba(0,48,122,0.03)] px-7 py-8 sm:px-9 ${className}`.trim()}
    >
      {showArrow && <ArrowBadge direction="left" />}

      <div>
        <h3 className="why-inexo-card-title">
          Rated By Customers
        </h3>

        <p className="why-inexo-card-description mt-6">
          Across by customers touch points
        </p>

        <p className="why-inexo-card-detail mt-5">
          {ratingPoints.join(', ')}
        </p>
      </div>
    </motion.article>
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
            className="absolute lg:left-0 lg:top-0 lg:w-[400px] lg:h-[220px] lg:pr-[190px] xl:w-[470px] xl:h-[248px] xl:pr-[220px] z-[1]" 
            showArrow={false} 
          />

          {/* Blue Stat */}
          <RetentionStat 
            className="absolute lg:left-[280px] lg:top-0 lg:w-[220px] lg:h-[220px] xl:left-[330px] xl:w-[250px] xl:h-[250px] z-[3]"
          >
            <ArrowBadge 
              direction="right" 
              className="absolute left-0 -ml-[56px] top-1/2 -translate-y-1/2 z-[5]" 
            />
          </RetentionStat>

          {/* Yellow Stat */}
          <RatingStat 
            className="absolute lg:left-[370px] lg:top-[175px] lg:w-[220px] lg:h-[220px] xl:left-[440px] xl:top-[205px] xl:w-[250px] xl:h-[250px] z-[4]"
          >
            <ArrowBadge 
              direction="left" 
              className="absolute right-0 -mr-[56px] top-1/2 -translate-y-1/2 z-[5]" 
            />
          </RatingStat>

          {/* Right Card */}
          <RatingCard 
            className="absolute lg:right-0 lg:top-[175px] lg:w-[440px] lg:h-[220px] lg:pl-[160px] xl:top-[205px] xl:w-[500px] xl:h-[248px] xl:pl-[176px] pr-8 z-[2]" 
            showArrow={false} 
          />
        </div>
      </Container>
    </section>
  )
}