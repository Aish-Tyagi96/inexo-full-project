import { Hero } from '@/components/common/Hero'
import { ContactFormSection } from '@/components/contact/ContactFormSection'
import { ContactMapSection } from '@/components/contact/ContactMapSection'
import { ContactDistributorsSection } from '@/components/contact/ContactDistributorsSection'
import { ContactFAQ } from '@/components/contact/ContactFAQ'
import facilityImage from '@/assets/images/home/who-we-are-facility.png'

const contactHeroSlides = [
  {
    id: 1,
    title: 'Contact INEXO Metal Casts',
    ctaLabel: 'Get in Touch',
    imageSrc: facilityImage,
  },
  {
    id: 2,
    title: 'Ready to Support Your Foundry Operations',
    imageSrc: facilityImage,
  },
  {
    id: 3,
    title: 'Partner with a Leader in Feeding Systems',
    imageSrc: facilityImage,
  },
]

export default function ContactUsPage() {
  return (
    <>
      <Hero slides={contactHeroSlides} />
      <ContactFormSection />
      <ContactMapSection />
      <ContactDistributorsSection />
      <ContactFAQ />
    </>
  )
}

