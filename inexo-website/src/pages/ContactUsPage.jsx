import { Hero } from '@/components/common/Hero'
import { ContactFormSection } from '@/components/contact/ContactFormSection'
import { ContactMapSection } from '@/components/contact/ContactMapSection'
import { ContactDistributorsSection } from '@/components/contact/ContactDistributorsSection'
import { ContactFAQ } from '@/components/contact/ContactFAQ'
import homebanner1 from '@/assets/images/home/homebanner1.png'


const contactHeroSlides = [
  {
    id: 1,
    title: 'Connect With INEXO –Engineering Solutions Together.',
    ctaLabel: 'Chat with US',
    imageSrc: homebanner1,
  },
]

export default function ContactUsPage() {
  return (
    <>
      <Hero slides={contactHeroSlides} />
      <ContactFormSection />
      <ContactFAQ />
      <ContactMapSection />
      <ContactDistributorsSection />
    </>
  )
}

