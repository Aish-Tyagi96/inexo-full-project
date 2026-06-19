import { Container } from '@/components/common/Container'

// Image imports
import innovationImage from '@/assets/images/Careers/Innovation-Driven.png'
import cultureImage from '@/assets/images/Careers/Employee-Centric.png'
import growthImage from '@/assets/images/Careers/Growth-Learning.png'
import industryImage from '@/assets/images/Careers/Industry.png'

const whyJoinCards = [
  {
    id: 1,
    title: 'Innovation-Driven Environment',
    image: innovationImage,
    alt: 'Innovation-Driven Environment at INEXO'
  },
  {
    id: 2,
    title: 'Employee-Centric Culture',
    image: cultureImage,
    alt: 'Employee-Centric Culture at INEXO'
  },
  {
    id: 3,
    title: 'Growth & Learning Opportunities',
    image: growthImage,
    alt: 'Growth & Learning Opportunities at INEXO'
  },
  {
    id: 4,
    title: 'Industry Recognition',
    image: industryImage,
    alt: 'Industry Recognition of INEXO'
  }
]

export function CareersWhyJoin() {
  return (
    <section className="bg-white pb-20 sm:pb-28 lg:pb-[140px] pt-4 sm:pt-6">
      <Container>
        {/* Section Title */}
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <h2 className="type-2 font-serif text-[28px] sm:text-[36px] lg:text-[48px] font-bold leading-tight text-[#00307a]">
            Why Join INEXO?
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {whyJoinCards.map((card) => (
            <div
              key={card.id}
              className="bg-[#F6FAFF] rounded-[10px] p-5 sm:p-6 flex flex-col items-center border border-[#e8f1fc]"
            >
              {/* Card Image */}
              <div className="w-full aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden rounded-[10px] bg-white">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Title */}
              <h3 className="type-careers-card-title mt-6 lg:mt-8 min-h-[50px] sm:min-h-[60px] flex items-center justify-center">
                {card.title}
              </h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
