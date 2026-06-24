import { Hero } from '@/components/common/Hero'
import solutionpage_banner from '@/assets/images/solutions/solutionpage_banner.png'
import SolutionsShowcase from '@/components/solutions/SolutionsShowcase'

const solutionsHeroSlides = [
  {
    id: 1,
    title: 'Built to Solve. Designed to Perform.',
    imageSrc: solutionpage_banner,
  },
  // {
  //   id: 2,
  //   title: 'Solutions Engineered For Modern Foundry Demands.',
  //   imageSrc: facilityImage,
  // },
  // {
  //   id: 3,
  //   title: 'Performance You Can Measure. Reliability You Can Trust.',
  //   imageSrc: facilityImage,
  // },
]

export default function SolutionsPage() {
  return (
    <>
      <Hero slides={solutionsHeroSlides} />
      <SolutionsShowcase />
    </>
  )
}
