import oldManImage from '@/assets/images/home/old_man.png'

const messageParagraphs = [
  'At INEXO Cast Metal, excellence is a continuous journey driven by passion, precision, and purpose. Our evolution from humble beginnings to a trusted industry name has been shaped by innovation, customer trust, and an unwavering commitment to quality.',
  'By embracing advanced technologies, strengthening operational excellence, and staying true to our core values, we deliver world-class casting solutions across industries. As we move forward, our focus remains on setting new benchmarks and building enduring global partnerships, together shaping the future.',
]

export function HomeManagingDirectorDesk() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[120px]">
      <div className="overflow-hidden bg-brand-blue lg:grid lg:grid-cols-[minmax(0,1.28fr)_minmax(320px,0.95fr)]">
        <div className="px-6 py-10 text-white sm:px-10 sm:py-12 md:px-12 lg:px-[54px] lg:py-[44px] min-[1400px]:px-[58px]">
          <h2 className="managing-director-desk-heading">
            From the Managing Director&apos;s Desk
          </h2>

          <div className="mt-6 text-[52px] font-semibold leading-none text-white/95 sm:text-[64px] lg:mt-8 lg:text-[72px]">
            &ldquo;
          </div>

          <div className="managing-director-desk-body mt-3 space-y-6 lg:mt-5 lg:max-w-[92%]">
            {messageParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 text-white sm:mt-10 lg:mt-12">
            <p className="text-[20px] font-semibold leading-[1.15] sm:text-[22px] lg:text-[28px]">
              Ramasamy Jagan
            </p>
            <p className="mt-2 text-[17px] font-semibold leading-[1.15] sm:text-[18px] lg:text-[24px]">
              Managing Director
            </p>
            <p className="mt-2 text-[17px] font-semibold leading-[1.2] sm:text-[18px] lg:text-[24px]">
              INEXO Cast Metal Solutions Pvt. Ltd.
            </p>
          </div>
        </div>

        <div className="relative min-h-[360px] bg-[#0D1530] sm:min-h-[420px] lg:min-h-full">
          <img
            alt="Ramasamy Jagan, Managing Director"
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={oldManImage}
          />
        </div>
      </div>
    </section>
  )
}