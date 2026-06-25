import { Hero } from '@/components/common/Hero'
import { CareersIntro } from '@/components/careers/CareersIntro'
import { CareersWhyJoin } from '@/components/careers/CareersWhyJoin'
import { CareersOpenings } from '@/components/careers/CareersOpenings'
import { CareersCTA } from '@/components/careers/CareersCTA'
import facilityImage from '@/assets/images/home/who-we-are-facility.png'



import homebanner1 from '@/assets/images/home/homebanner1.png'




const careersHeroSlides = [
  {
    id: 1,
    title: 'Build Your Career with INEXO',
    ctaLabel: 'Watch Our Video',
    videoSrc: '/videos/INEXO_COMPANY VIDEO_27_01_2026.mp4',
    poster: homebanner1,
  }
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
