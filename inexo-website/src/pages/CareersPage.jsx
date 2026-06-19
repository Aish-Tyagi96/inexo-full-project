import { Hero } from '@/components/common/Hero'
import { CareersIntro } from '@/components/careers/CareersIntro'
import { CareersWhyJoin } from '@/components/careers/CareersWhyJoin'
import { CareersOpenings } from '@/components/careers/CareersOpenings'
import { CareersCTA } from '@/components/careers/CareersCTA'
import facilityImage from '@/assets/images/home/who-we-are-facility.png'

const careersHeroSlides = [
  {
    id: 1,
    title: 'Build your career with INEXO Metal Casts',
    ctaLabel: 'Explore Openings',
    imageSrc: facilityImage,
  },
  {
    id: 2,
    title: 'Innovate, Collaborate & Lead the Foundry Industry',
    imageSrc: facilityImage,
  },
  {
    id: 3,
    title: 'Empowering Careers, Engineering the Future',
    imageSrc: facilityImage,
  },
]

export default function CareersPage() {
  return (
    <>
      <Hero slides={careersHeroSlides} />
      <CareersIntro />
      <CareersWhyJoin />
      <CareersOpenings />
      <CareersCTA />
    </>
  )
}
