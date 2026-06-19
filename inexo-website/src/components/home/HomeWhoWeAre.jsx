import aboutImage from '@/assets/images/home/who-we-are-facility.png'
import { Container } from '@/components/common/Container'
import { SectionLabel } from '@/components/common/SectionLabel'

export function HomeWhoWeAre() {
  return (
    <section className="bg-[#f4f4f4] py-10 md:py-20 lg:py-[160px]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-10 min-[1728px]:grid-cols-[809px_782px] min-[1728px]:gap-8 min-[1728px]:justify-center">
          <div className="w-full max-w-[809px] pt-[46px]">
            <SectionLabel>Who we are</SectionLabel>

            <h2 className="type-2 mt-[48px]">
              High Performance Feeding Systems manufacturers
            </h2>
            

            <p className="type-3 mt-[43px] max-w-[52ch]">
              Since 1989, INEXO has been a leading name in foundry feeding systems, delivering innovative,
              high-performance solutions through a customer-focused and future-ready approach, trusted across India
              and global markets.
            </p>
          </div>

          <div className="w-full max-w-[782px] overflow-hidden " style={{ borderRadius: '100px 0 100px 0' }}>
            <img
              alt="INEXO manufacturing facility"
              className="h-full w-full object-cover min-[1728px]:aspect-[782/636]"
              src={aboutImage}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
