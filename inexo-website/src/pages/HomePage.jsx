import { HomeManagingDirectorDesk } from '@/components/home/HomeManagingDirectorDesk'
import { HomeCustomersWeServe } from '@/components/home/HomeCustomersWeServe'
import { HomeFoundryProducts } from '@/components/home/HomeFoundryProducts'
import { Hero } from '@/components/common/Hero'
import { HomeIndustryRecognition } from '@/components/home/HomeIndustryRecognition'
import { HomeNewsMedia } from '@/components/home/HomeNewsMedia'
import { HomePurpose } from '@/components/home/HomePurpose'
import { HomeTestimonials } from '@/components/home/HomeTestimonials'
import { HomeWhoWeAre } from '@/components/home/HomeWhoWeAre'
import { HomeWhyInexo } from '@/components/home/HomeWhyInexo'

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeWhoWeAre />
      <HomeFoundryProducts />
      <HomeIndustryRecognition />
      <HomePurpose />
      <HomeWhyInexo />
      <HomeCustomersWeServe />
      <HomeManagingDirectorDesk />
      <HomeTestimonials />
      <HomeNewsMedia />
    </>
  )
}
