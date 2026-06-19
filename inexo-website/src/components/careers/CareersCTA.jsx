import { Container } from '@/components/common/Container'

export function CareersCTA() {
  return (
    <section className="bg-brand-yellow py-12 sm:py-16 lg:py-[72px]">
      <Container className="text-center">
        {/* Title */}
        <h2 className="font-serif text-[22px] sm:text-[28px] lg:text-[34px] font-bold text-[#00307a] leading-tight mb-4 lg:mb-5">
          Didn’t Find the Role You’re Looking For?
        </h2>

        {/* Description & Contact Email */}
        <p className="font-sans text-[15px] sm:text-[18px] lg:text-[20px] leading-[1.6] text-[#00307a] max-w-[860px] mx-auto">
          We’re always open to hearing from enthusiastic individuals. Share your resume and a
          short introduction at:{' '}
          <a
            href="mailto:HR@inexocast.com"
            className="font-bold underline hover:text-[#002257] transition-colors duration-200"
          >
            HR@inexocast.com
          </a>
        </p>
      </Container>
    </section>
  )
}
