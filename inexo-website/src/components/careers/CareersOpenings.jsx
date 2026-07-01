import { Container } from '@/components/common/Container'
import { SectionLabel } from '@/components/common/SectionLabel'
import { useJobsQuery } from '@/hooks/useJobsQuery'

export function CareersOpenings() {
  const { data: jobOpenings = [], isLoading, isError } = useJobsQuery()

  const countStr = jobOpenings.length === 0 ? '0' : jobOpenings.length < 10 ? `0${jobOpenings.length}` : `${jobOpenings.length}`

  return (
    <section className="bg-white pb-20 sm:pb-28 lg:pb-[140px]">
      <Container>
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <SectionLabel>Our Openings</SectionLabel>
          <h2 className="type-2 font-serif text-[28px] sm:text-[36px] lg:text-[48px] font-bold leading-tight text-[#00307a] mt-6">
            Current Job Openings ({countStr})
          </h2>
        </div>

        {/* Job Listings */}
        {isLoading ? (
          <p className="text-gray-500 text-lg font-sans">Loading job openings...</p>
        ) : isError ? (
          <p className="text-red-500 text-lg font-sans">Failed to load job openings.</p>
        ) : jobOpenings.length === 0 ? (
          <p className="text-gray-500 text-lg font-sans">No job openings available at the moment.</p>
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {jobOpenings.map((job) => (
              <div key={job.id} className="flex flex-col items-start max-w-[980px]">
                {/* Job Title */}
                <h3 className="font-sans text-[20px] sm:text-[22px] lg:text-[26px] font-bold text-[#00307a] leading-snug">
                  {job.title}
                </h3>

                {/* Job Description */}
                <p className="font-sans text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.7] text-[#1e40af]/90 mt-4 sm:mt-5">
                  {job.description}
                </p>

                {/* Apply Button */}
                <a
                  href={job.link || 'https://www.linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 sm:mt-8 inline-flex h-[48px] sm:h-[54px] px-8 sm:px-10 items-center justify-center rounded-full bg-[#00307a] text-white font-sans text-[14px] sm:text-[16px] font-bold tracking-wide transition-all duration-300 hover:bg-[#002257] hover:scale-[1.02] shadow-sm cursor-pointer"
                >
                  Apply Via LinkedIn
                </a>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
