import ourMissionIcon from '@/assets/images/home/OurMission.svg'
import ourValuesIcon from '@/assets/images/home/OurValues.svg'
import ourVisionIcon from '@/assets/images/home/OurVision.svg'

const icons = {
  vision: ourVisionIcon,
  mission: ourMissionIcon,
  values: ourValuesIcon,
}

export function PurposeInfoCard({ icon, title, children, className = '' }) {
  return (
    <article
      className={`flex w-full flex-col gap-5 rounded-[15px] bg-[rgba(0,48,122,0.03)] px-5 py-6 sm:flex-row sm:gap-8 sm:px-8 sm:py-8 lg:max-w-[1000px] lg:px-[56px] lg:py-[48px] ${className}`.trim()}
    >
      <div className="flex h-[101px] w-[101px] shrink-0 items-center justify-center rounded-full bg-[rgba(0,48,122,0.12)]">
        <img alt="" aria-hidden="true" className="aspect-square h-12 w-12 object-contain" src={icons[icon]} />
      </div>

      <div className="min-w-0 pt-0 sm:pt-1">
        <h3 className="purpose-card-title">
          {title}
        </h3>
        <p className="purpose-card-description mt-4">
          {children}
        </p>
      </div>
    </article>
  )
}
