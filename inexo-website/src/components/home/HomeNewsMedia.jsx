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
      <section className="bg-white py-14 sm:py-18 lg:py-[120px]">
        <Container>
          <div className="text-center text-gray-500 py-10 font-sans">
            Loading News & Media...
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="bg-white py-14 sm:py-18 lg:py-[120px]">
      <Container>
        <div className="grid items-start gap-8 min-[1400px]:grid-cols-[630px_minmax(0,1fr)] min-[1400px]:gap-8">
          <div className="clip-news-panel w-full bg-[#F0F3F8] px-8 py-12 sm:px-10 sm:py-14 lg:h-[395px] lg:px-0 lg:py-0">
            <div className="w-full max-[1399px]:mx-auto max-[1399px]:flex max-[1399px]:flex-col max-[1399px]:items-center min-[1400px]:ml-[132px] lg:pt-[52px]">
              <h2 className="type-2 w-full max-[1399px]:mx-auto max-[1399px]:w-[50%] min-[1400px]:w-[70%]">
                News &amp; Media
                <br />
                Center
              </h2>

              <p className="mt-8 type-3 w-full text-center lg:mt-[42px] max-[1399px]:mx-auto max-[1399px]:w-[50%] min-[1400px]:w-[70%]">
                Stay updated with the latest news, milestones, and industry developments from INEXO Metal Casts.
              </p>
            </div>
          </div>

          <div className="w-full">
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 min-[1400px]:max-w-[920px]">
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