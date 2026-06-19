import certificateImage from '@/assets/images/home/certificateImage.png'
import { Container } from '@/components/common/Container'
import { SectionLabel } from '@/components/common/SectionLabel'

const certificationBenefits = [
  'Improved quality and consistency',
  'Increased customer satisfaction',
  'Better operational efficiency',
  'Enhanced market ability & competitive advantage',
]

export function HomeIndustryRecognition() {
  return (
    <section className="bg-white py-12 md:py-20 lg:py-[140px]">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(360px,0.95fr)_minmax(0,1.15fr)] lg:gap-12 min-[1728px]:grid-cols-[minmax(0,1fr)_minmax(0,751px)] min-[1728px]:justify-center">
          <div className="w-full pt-0 lg:pt-[46px]">
            <SectionLabel>Industry Recognition</SectionLabel>

            <h2 className="type-2 mt-8 w-full md:mt-[48px]">
              Quality Systems Certified Organisation
            </h2>

            <p className="mt-6 w-full type-3  leading-[1.7] md:mt-[43px] ">
              ISO 9001 Certification provides numerous benefits for business, helping them improve quality,
              efficiency, and customer satisfaction.
            </p>

            <ul className="mt-6 space-y-1 text-[14px] leading-[1.45] type-3">
              {certificationBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[785px] aspect-[785/881] lg:justify-self-end">
            <div className="absolute left-[4.46%] top-1/2 h-[77.07%] w-[92.36%] -translate-y-1/2 rounded-[32px] bg-[#E5EFFF] lg:top-[11.47%] lg:-translate-y-0 lg:rounded-[60px]" />
            <div
              className="absolute left-[4.33%] top-1/2 h-[68.1%] w-[95.67%] -translate-y-1/2 rounded-[10px] lg:top-[15.95%] lg:-translate-y-0"
              style={{ background: 'rgba(248, 150, 216, 0.08)' }}
            />

            <img
              alt="INEXO ISO 9001 certification"
              className="absolute left-0 top-1/2 z-10 aspect-[677/881] w-[86.11%] -translate-y-1/2 object-contain drop-shadow-[0_24px_48px_rgba(0,48,122,0.16)] lg:top-0 lg:-translate-y-0"
              src={certificateImage}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
