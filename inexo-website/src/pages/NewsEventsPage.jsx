import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useNewsEventsQuery } from '@/hooks/useNewsEventsQuery'
import { Hero } from '@/components/common/Hero'
import { Container } from '@/components/common/Container'
import { SectionLabel } from '@/components/common/SectionLabel'
import { NewsMediaCard } from '@/components/home/NewsMediaCard'
import { NewsEventsGallery } from '@/components/newsEvents/NewsEventsGallery'
import { EventDetailModal } from '@/components/newsEvents/EventDetailModal'

import homebanner1 from '@/assets/images/home/homebanner1.png'

const newsEventSlides = [
  {
    id: 1,
    title: 'Among the World’s Leading Risering Products Manufacturers',
    ctaLabel: 'Explore Updates',
    imageSrc: homebanner1,
  },
  // {
  //   id: 2,
  //   title: 'Industry Events & Corporate Updates',
  //   imageSrc: facilityImage,
  // },
  // {
  //   id: 3,
  //   title: 'Stay Connected With Our Community',
  //   imageSrc: facilityImage,
  // },
]

export default function NewsEventsPage() {
  const [activeEvent, setActiveEvent] = useState(null)
  const location = useLocation()
  const { data: newsEventItems = [], isLoading } = useNewsEventsQuery()

  useEffect(() => {
    if (location.state?.openEventId && newsEventItems.length > 0) {
      const event = newsEventItems.find(
        (item) => item.id === location.state.openEventId || String(item.id) === String(location.state.openEventId)
      )
      if (event) {
        setActiveEvent(event)
        // Clear history state to avoid opening on back/refresh
        window.history.replaceState({}, document.title)
      }
    }
  }, [location.state, newsEventItems])

  if (isLoading) {
    return (
      <>
        <Hero slides={newsEventSlides} />
        <section className="bg-white py-14 sm:py-18 lg:py-[120px]">
          <Container>
            <div className="text-center text-gray-500 py-10 font-sans">
              Loading News & Events...
            </div>
          </Container>
        </section>
      </>
    )
  }

  return (
    <>
      <Hero slides={newsEventSlides} />

      <section className="bg-white py-14 sm:py-18 lg:py-[120px]">
        <Container>
          {/* Events, Updates & CSR Programs Section */}
          <div className="mb-14 lg:mb-20">
            <SectionLabel>From News</SectionLabel>
            <h2 className="type-2 mt-6 mb-5">Events, Updates & CSR Programs</h2>
            <p className="text-[16px] sm:text-[17px] leading-[1.7] text-[#4b4b4b] max-w-[980px]">
              Stay updated with the latest happenings at INEXO Metal Casts. Our News & Events section highlights important company milestones, industry participation, product developments, exhibitions, and corporate initiatives. Through this section, we share updates on our achievements, collaborations, CSR initiatives, and events that reflect our commitment to excellence, innovation, and responsible corporate growth.
            </p>
          </div>

          {/* Latest Events Grid Section */}
          <div>
            <h2 className="type-2 mb-8">Latest Events</h2>
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 min-[1400px]:gap-10">
              {newsEventItems.map((item) => (
                <NewsMediaCard
                  key={item.id}
                  date={item.date}
                  description={item.description}
                  image={item.image}
                  imageAlt={item.imageAlt}
                  title={item.title}
                  readMoreHref={item.readMoreHref}
                  onClick={() => setActiveEvent(item)}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      <NewsEventsGallery />

      {/* Event Detail Modal */}
      {activeEvent && (
        <EventDetailModal
          event={activeEvent}
          allEvents={newsEventItems}
          onClose={() => setActiveEvent(null)}
          onSelectEvent={(item) => setActiveEvent(item)}
        />
      )}
    </>
  )
}
