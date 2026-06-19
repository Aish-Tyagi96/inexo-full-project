import { Container } from '@/components/common/Container'
import futureOfFoundryImage from '@/assets/images/Careers/FutureofFoundry.png'

export function CareersIntro() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">
          {/* Image Column */}
          <div className="w-full">
            <img
              src={futureOfFoundryImage}
              alt="Build the Future of Foundry Technology with us"
              className="w-full h-auto object-cover rounded-[16px] sm:rounded-[24px]"
            />
          </div>

          {/* Text Content Column */}
          <div className="flex flex-col justify-center">
            <h2 className="type-2 font-serif text-[28px] sm:text-[36px] lg:text-[42px] font-bold leading-[1.2] text-[#00307a] mb-6 lg:mb-8">
              Build the Future of Foundry
              <br className="hidden sm:inline" />
              Technology with us
            </h2>
            
            <p className="type-careers-body max-w-[620px]">
              At INEXO Cast Metals, we believe our people are the foundation of our innovation. We're on a mission to deliver world-class feeding system solutions to foundries across the globe — and we're always looking for passionate professionals to join us on this journey.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
