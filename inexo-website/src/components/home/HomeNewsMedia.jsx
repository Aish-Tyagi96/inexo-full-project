import { useNavigate } from 'react-router-dom'
import { useNewsEventsQuery } from '@/hooks/useNewsEventsQuery'
import { Container } from '@/components/common/Container'
import { NewsMediaCard } from '@/components/home/NewsMediaCard'

export function HomeNewsMedia() {
  const navigate = useNavigate()
  const { data: newsEvents = [], isLoading } = useNewsEventsQuery()

  // Get the latest 2 news items
  const latestEvents = newsEvents.slice(0, 2)

  if (isLoading) {
    return (
      <section className="bg-surface-page py-14 sm:py-18 lg:py-[120px]">
        <Container>
          <div className="text-center text-gray-500 py-10 font-sans">
            Loading News & Media...
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="bg-surface-page py-14 sm:py-18 lg:py-[120px]">
      <Container>
        <div className="grid items-start gap-8 min-[1400px]:grid-cols-[550px_minmax(0,1fr)] min-[1400px]:gap-12">
          <div className="w-full flex flex-col items-center min-[1400px]:items-start lg:pt-[52px]">
            <h2 className="type-2 w-full text-center min-[1400px]:text-left">
              News &amp; Media
              <br className="hidden min-[1400px]:inline" /> Center
            </h2>

            <p className="mt-6 news-panel-description w-full text-center mx-auto min-[1400px]:text-left min-[1400px]:mx-0 max-w-[520px] lg:mt-[32px]">
              Stay updated with the latest news, milestones, and industry developments from INEXO Metal Casts.
            </p>
          </div>

          <div className="w-full">
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
              {latestEvents.map((item) => (
                <NewsMediaCard
                  key={item.id}
                  date={item.date}
                  description={item.description}
                  image={item.image}
                  imageAlt={item.imageAlt}
                  title={item.title}
                  onClick={() => navigate('/news-events', { state: { openEventId: item.id } })}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-end lg:mt-10">
              <button
                className="inline-flex min-h-[52px] min-w-[126px] items-center justify-center rounded-full border border-brand-blue px-8 font-serif text-[19px] font-bold leading-none text-brand-blue transition-colors hover:bg-brand-blue hover:text-white lg:min-h-[58px] lg:min-w-[140px] cursor-pointer"
                onClick={() => navigate('/news-events')}
              >
                View All
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}