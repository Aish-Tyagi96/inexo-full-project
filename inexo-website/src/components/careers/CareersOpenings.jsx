import { Container } from '@/components/common/Container'
import { SectionLabel } from '@/components/common/SectionLabel'

const jobOpenings = [
  {
    id: 1,
    title: 'Production Supervisor – Chennai (Plant)',
    description: 'Oversee production processes, maintain quality standards, and manage a skilled team of operators.',
    linkedInUrl: 'https://www.linkedin.com'
  },
  {
    id: 2,
    title: 'Sales & Marketing Executive – South India Region',
    description: 'Develop and manage client relationships, support product promotion and technical sales.',
    linkedInUrl: 'https://www.linkedin.com'
  }
]

export function CareersOpenings() {
  return (
    <section className="bg-white pb-20 sm:pb-28 lg:pb-[140px]">
      <Container>
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <SectionLabel>Our Openings</SectionLabel>
          <h2 className="type-2 font-serif text-[28px] sm:text-[36px] lg:text-[48px] font-bold leading-tight text-[#00307a] mt-6">
            Current Job Openings(02)
          </h2>
        </div>

        {/* Job Listings */}
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
                href={job.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 sm:mt-8 inline-flex h-[48px] sm:h-[54px] px-8 sm:px-10 items-center justify-center rounded-full bg-[#00307a] text-white font-sans text-[14px] sm:text-[16px] font-bold tracking-wide transition-all duration-300 hover:bg-[#002257] hover:scale-[1.02] shadow-sm cursor-pointer"
              >
                Apply Via LinkedIn
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
