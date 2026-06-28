import { Container } from '@/components/common/Container'

export function CareersCTA() {
  return (
    <section className="bg-brand-yellow py-12 sm:py-16 lg:py-[72px]">
      <Container className="text-center">
        {/* Title */}
        <h2 className="careers-cta-heading mb-4 lg:mb-5">
          Didn’t Find the Role You’re Looking For?
        </h2>

        {/* Description & Contact Email */}
        <p className="careers-cta-description w-full">
          We’re always open to hearing from enthusiastic individuals. Share your resume and a
          short introduction at:{' '}
          <a
            href="mailto:HR@inexocast.com"
            className="careers-cta-link"
          >
            HR@inexocast.com
          </a>
        </p>
      </Container>
    </section>
  )
}
