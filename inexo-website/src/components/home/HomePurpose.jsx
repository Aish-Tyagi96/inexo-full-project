import { Container } from '@/components/common/Container'
import { SectionLabel } from '@/components/common/SectionLabel'
import { PurposeInfoCard } from '@/components/home/PurposeInfoCard'

const purposeItems = [
  {
    id: 'vision',
    icon: 'vision',
    title: 'Our Vision',
    align: 'lg:mr-auto',
    description: (
      <>
        To emerge as a leading feeding systems company in India, recognized for innovation, reliability, and strong
        market leadership. We envision building a future-ready organization that consistently delivers value through
        advanced solutions, strategic partnerships, and a deep understanding of industry needs. As we grow, we aim to
        achieve a 25% market share in a &#8377;600 crore industry while scaling into a &#8377;100+ crore organization and
        beyond. Our vision is to set new benchmarks in quality, performance, and customer trust, while contributing
        meaningfully to the progress and efficiency of the foundry ecosystem.
      </>
    ),
  },
  {
    id: 'mission',
    icon: 'mission',
    title: 'Our Mission',
    align: 'lg:ml-auto',
    description: (
      <>
        Our mission is to deliver consistent quality and performance-driven products that meet the evolving demands of
        the industry. We strive to strengthen our distribution network as a core competitive advantage, while building
        long-term, profitable relationships with our channel partners. Through a strong focus on speed, reliability, and
        service excellence, we aim to create a seamless customer experience. At the same time, we are committed to
        continuous innovation to address changing foundry requirements and sustain long-term growth.
      </>
    ),
  },
  {
    id: 'values',
    icon: 'values',
    title: 'Our Values',
    align: 'lg:mr-auto',
    description: (
      <>
        We believe in a partnership-first approach, growing together through trust, transparency, and mutual respect. Our
        customer-centric mindset ensures that every decision we make is aligned with customer success and satisfaction.
        We uphold integrity and trust in all our actions, always choosing to do business the right way. We value agility
        and adaptability, enabling us to respond effectively to evolving market conditions. Above all, we foster an
        ownership mindset, where every individual and partner contributes as a stakeholder in INEXO&apos;s growth.
      </>
    ),
  },
]

export function HomePurpose() {
  return (
    <section className="bg-surface-page py-16 sm:py-20 lg:py-[120px]">
      <Container>
        <div className="text-center">
          <SectionLabel className="mx-auto">Our Purpose</SectionLabel>
          <h2 className="type-4 mt-8">Our Vision, Mission &amp; Values</h2>
        </div>

        <div className="mt-12 flex flex-col gap-8 lg:mt-16 lg:gap-12 xl:gap-14">
          {purposeItems.map((item) => (
            <PurposeInfoCard key={item.id} className={item.align} icon={item.icon} title={item.title}>
              {item.description}
            </PurposeInfoCard>
          ))}
        </div>
      </Container>
    </section>
  )
}
