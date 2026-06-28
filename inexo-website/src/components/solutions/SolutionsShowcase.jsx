import { useState } from 'react'
import { Container } from '@/components/common/Container'
import whoWeAreFacilityImage from '@/assets/images/home/who-we-are-facility.png'
import CastingDetails_sideImage from '@/assets/images/solutions/CastingDetails_side_Image.png'
import adaptorVideo from '@/assets/images/solutions/adaptor.mp4'
import belgaumPoVideo from '@/assets/images/solutions/belgaum_po.mp4'
import bracketVideo from '@/assets/images/solutions/bracket-2.mp4'
import mahalakhmiNewVideo from '@/assets/images/solutions/mahalakhmi_new.mp4'
import mayuraSwivellingLeverVideo from '@/assets/images/solutions/mayura_swivelling_lever.mp4'
import mayuraYokeVideo from '@/assets/images/solutions/mayura-yoke.mp4'
import spotexImage from '@/assets/images/home/SPOTEX.svg'
import adaptorPoster from '@/assets/images/solutions/ADAPTOR.png'
import bracketPoster from '@/assets/images/solutions/BRACKET.png'
import portBlockPoster from '@/assets/images/solutions/PORT BLOCK.png'
import innerHubPoster from '@/assets/images/solutions/INNER HUB.png'
import exhaustManifoldPoster from '@/assets/images/solutions/EXHAUST MANIFOLD.png'
import swivellingLeverPoster from '@/assets/images/solutions/SWIVELLING LEVER.png'
import yokePoster from '@/assets/images/solutions/YOKE.png'
import spotexHdV680 from '@/assets/images/solutions/SPOTEX HD V 680.png'
import spotexHdVc97 from '@/assets/images/solutions/SPOTEX HD VC 97.png'
import fedpour60x150 from '@/assets/images/solutions/FEDPOUR 60×150 (RT).png'
import spotexHdVc13425 from '@/assets/images/solutions/SPOTEX HD VC 13425.png'
import spotexHdV8 from '@/assets/images/solutions/SPOTEX HD V 8.png'
import fedpour40x125 from '@/assets/images/solutions/FEDPOUR 40×125 (RT).png'
import fedexo55XpEpt80x100 from '@/assets/images/solutions/FEDEXO 55 XP EPT 80x100.png'
import spotexHdV134 from '@/assets/images/solutions/SPOTEX HD V 134.png'
import fedexoNd2 from '@/assets/images/solutions/FEDEXO 55 XP ND2.png'
import fedexo50x75 from '@/assets/images/solutions/FEDEXO 55 XP 50x75(0).png'
import fedexoEpt85x100 from '@/assets/images/solutions/FEDEXO 55 XP EPT 85×100.png'
import fedexo80x150 from '@/assets/images/solutions/FEDEXO 55 XP 80×150(0).png'

const solutionCategories = [
  {
    id: 'iron',
    title: 'IRON Casting Solutions',
    items: [
      {
        id: 'adaptor-casting',
        title: 'Yield Improvement of ADAPTOR Casting',
        summary:
          'SPOTEX HD replaces 3 conventional sleeves to reduce shrinkage defects and improve yield to 77%.',
        poster: adaptorPoster,
        videoSrc: adaptorVideo,
        castingDetails: [
          { label: 'Name', content: 'M/S Naetek Ferro Castings P Ltd' },
          { label: 'Casting', content: 'Adaptor Casting' },
          { label: 'Casting weight', content: '85.0 Kg.' },
          { label: 'Bunch Weight', content: '110.0 Kg' },
          { label: 'Yield', content: '77 %' },
          { label: 'Material', content: 'SG 400/18' },
          { label: 'Objective', content: 'To eliminate shrinkage defect and improve yield.' },
        ],
        processDetails: [
          { label: 'Moulding Process', content: 'Two Part no Bake' },
          { label: 'Pouring Weight', content: '116 Kg' },
          { label: 'Pouring Temperature', content: '1540 - 1560 Deg C' },
          { label: 'Pouring Time', content: '10-11 Sec' },
        ],
        productsBenefits: [
          {
            label: 'Products used',
            content: ['SPOTEX HD V 680'],
          },
          {
            label: 'Benefits',
            content: [
              '77% Yield',
              'Three FEDEXO 55 (XP) EPT ND 80 X 100 (O) Replaced With ONE SPOTEX HD V 680',
            ],
          },
        ],
         sectionImages: {
          castingDetails: [CastingDetails_sideImage],
          // processDetails: [whoWeAreFacilityImage],
          productsBenefits: [spotexHdV680],
        },
      },
      {
        id: 'bracket-casting',
        title: 'Reduce fettling time for BRACKET Casting',
        summary:
          'Padding was eliminated by locating SPOTEX HD on the hot spot to save on fettling time and improve yield by adding a casting.',
        poster: bracketPoster,
        videoSrc: bracketVideo,
        castingDetails: [
          { label: 'Name', content: 'Bracket' },
          { label: 'Casting weight', content: '11.0 Kg' },
          { label: 'Castings per Mould', content: '4 Nos' },
          { label: 'Poured weight', content: '55.0 Kg' },
          { label: 'Material', content: 'SG 500/7' },
          { label: 'Objective', content: 'Yield Improvement' },
        ],
        processDetails: [
          { label: 'Moulding Process', content: 'Green Sand Machine Moulding' },
          { label: 'Pouring Weight', content: '55.0 Kg' },
          { label: 'Pouring Temperature', content: '1380 to 1400° C' },
          { label: 'Pouring Time', content: '10-12 S' },
        ],
        productsBenefits: [
          {
            label: 'Products used',
            content: [
              'SPOTEX HD VC 97',
              'FEDPOUR 60×150 (RT)',
            ],
          },
          {
            label: 'Benefits',
            content: [
              'Yield improved to 82%',
              'Reduced fettling time',
            ],
          },
        ],
        sectionImages: {
          castingDetails: [CastingDetails_sideImage],
          // processDetails: [whoWeAreFacilityImage],
          productsBenefits: [spotexHdVc97, fedpour60x150],
        },
      },
      {
        id: 'port-block-casting',
        title: 'Eliminating Shrinkage in PORT BLOCK casting',
        summary:
          'SPOTEX HD is placed on the ‘Hot-spot’ to eliminate shrinkage defect and reduce fettling time.',
        poster: portBlockPoster,
        videoSrc: belgaumPoVideo,
        castingDetails: [
          { label: 'Name', content: 'M/S. Belgaum Ferrocast (India) Pvt Ltd.' },
          { label: 'Casting', content: 'Port Block' },
          { label: 'Casting weight', content: '9.5 Kg' },
          { label: 'No of Cavity', content: '2 nos' },
          { label: 'Bunch Weight', content: '33.0 Kg' },
          { label: 'Yield', content: '57.5 %' },
          { label: 'Material', content: 'SG 500/7' },
          { label: 'Objective', content: 'To Eliminate the Shrinkage Defect In the Casting' },
        ],
        processDetails: [
          { "label": "Moulding Process", "content": "Green Sand Machine Moulding" },
          { "label": "Pouring Weight", "content": "33.0 Kg" },
          { "label": "Pouring Temperature", "content": "1390 - 1410 Deg C" },
          { "label": "Pouring Time", "content": "10-11 Sec" },
        ],
        productsBenefits: [
          {
            label: 'Products used',
            content: [
              'SPOTEX HD VC 134/25',
            ],
          },
          {
            label: 'Benefits',
            content: [
              'Eliminated the Shrinkage Defect from difficult to feed location.',
              'Easy Fettling.'
            ],
          },
        ],
        sectionImages: {
          castingDetails: [CastingDetails_sideImage],
          // processDetails: [whoWeAreFacilityImage],
          productsBenefits: [spotexHdVc13425],
        },
      },
      {
        id: 'inner-hub-casting',
        title: 'Maximise yield and eliminate shrinkage on INNER HUB casting',
        summary:
          'SPOTEX HD and FEDPOUR together help to eliminate shrinkage defects and improve yield by adding one more casting.',
        poster: innerHubPoster,
        videoSrc: mahalakhmiNewVideo,
        castingDetails: [
          { "label": "Name", "content": "M/S. Mahalaxmi Cast Alloy P Ltd" },
          { "label": "Casting", "content": "Inner Hub" },
          { "label": "Casting weight", "content": "2.1 Kg" },
          { "label": "Number of Cavity", "content": "4" },
          { "label": "Bunch Weight", "content": "12.3 Kg" },
          { "label": "Yield", "content": "68.3 %" },
          { "label": "Material", "content": "SG 700/2" },
          { "label": "Objective", "content": "To Eliminate Bore Shrinkage" }
        ],
        processDetails: [
          [
            { "label": "Moulding Process", "content": "Green Sand Machine Moulding" },
            { "label": "Pouring Weight", "content": "12.30 Kg" },
            { "label": "Pouring Temperature", "content": "1380 - 1430 Deg C" },
            { "label": "Pouring Time", "content": "6 Sec" }
          ]
        ],
        productsBenefits: [
          {
            label: 'Products used',
            content: [
              'SPOTEX HD V 8',
              'FEDPOUR 40×125 (RT)',
            ],
          },
          {
            label: 'Benefits',
            content: [
              'Eliminated Bore Shrinkage Without Any Padding Or Casting Modification.',
              'Higher Yield.',
            ],
          },
        ],
        sectionImages: {
          castingDetails: [CastingDetails_sideImage],
          // processDetails: [whoWeAreFacilityImage],
          productsBenefits: [spotexHdV8, fedpour40x125],
        },
      },
      {
        id: 'exhaust-manifold-casting',
        title: 'Eliminate shrinkage and reduce fettling for EXHAUST MANIFOLD casting',
        summary:
          'Elliptical ND sleeves are placed on the flanges for effective feeding with the need for extra padding.',
        poster: exhaustManifoldPoster,
        videoSrc: mahalakhmiNewVideo,
        castingDetails: [
          { label: 'Name', content: 'M/S. Mahalaxmi Cast Alloy P Ltd' },
          { label: 'Casting', content: 'Exhaust Manifold' },
          { label: 'Casting weight', content: '15 Kg' },
          { label: 'Bunch Weight', content: '20 Kg' },
          { label: 'Yield', content: '75.0 %' },
          { label: 'Material', content: 'SG 400/15' },
          { label: 'Objective', content: 'To reduce Shrinkage Defect and Fettling' }
        ],
        processDetails: [
          { label: 'Moulding Process', content: 'Two Part No Bake' },
          { label: 'Pouring Weight', content: '20.0 Kg' },
          { label: 'Pouring Temperature', content: '1360 - 1380 Deg C' },
          { label: 'Pouring Time', content: '10 Sec' }
        ],
        productsBenefits: [
          {
            label: 'Products used',
            content: [
              'FEDEXO 55 XP EPT 80x100',
            ],
          },
          {
            label: 'Benefits',
            content: [
              'Eliminated Shrinkage Without Any Padding.',
              'Higher Yield.',
              'Reduce fettling Activity',
            ],
          },
        ],
        sectionImages: {
          castingDetails: [CastingDetails_sideImage],
          // processDetails: [whoWeAreFacilityImage],
          productsBenefits: [fedexo55XpEpt80x100],
        },
      },
    ],
  },
  {
    id: 'steel',
    title: 'STEEL Casting Solutions',
    items: [
      {
        id: 'valve-body-steel',
        title: 'Productivity improvement for SWIVELLING LEVER casting.',
        summary:
          'SPOTEX HD and various FEDEXO 55 XP sleeves help to maximise yield and reduce fettling times.',
        poster: swivellingLeverPoster,
        videoSrc: mayuraSwivellingLeverVideo,
        castingDetails: [
          { label: 'Name', content: 'M/S. Mayura Steel P Ltd' },
          { label: 'Casting', content: 'Swiveling Lever' },
          { label: 'Casting weight', content: '17.5 Kg' },
          { label: 'Number of Cavity', content: '4' },
          { label: 'Bunch Weight', content: '116 Kg' },
          { label: 'Yield', content: '60.0 %' },
          { label: 'Material', content: 'Steel' },
          { label: 'Objective', content: 'To reduce Shrinkage Defect and Fettling' }
        ],
        processDetails: [
          { content: 'Moulding Process: Two Part no Bake' },
          { content: 'Pouring Weight: 116 Kg' },
          { content: 'Pouring Temperature: 1540 - 1560 Deg C' },
          { content: 'Pouring Time: 10-11 Sec' }
        ],
        productsBenefits: [
          {
            label: 'Benefits',
            content: [
              'SPOTEX HD V 134',
              'FEDEXO 55 XP EPT 80x100',
              'FEDEXO 55 XP ND2',
              'FEDEXO 55 XP 50x75(0)',
            ],
          },
          {
            label: 'Benefits',
            content: [
              'Eliminated Shrinkage Without Any Padding.',
              'Higher Yield.',
              'Reduce fettling',
            ],
          },
        ],
        sectionImages: {
          castingDetails: [CastingDetails_sideImage],
          // processDetails: [whoWeAreFacilityImage],
          productsBenefits: [spotexHdV134, fedexo55XpEpt80x100, fedexoNd2, fedexo50x75],
        },
      },
      {
        id: 'housing-steel',
        title: 'Eliminate shrinkage and reduce fettling for YOKE casting',
        summary:
          'Methoding was designed using the Inexo sleeves at various points for the elimination of shrinkage and reduction of fettling time. The reduction of fettling time is achieved using EPT 85x100 – elliptical sleeves.',
        poster: yokePoster,
        videoSrc: mayuraYokeVideo,
        castingDetails: [
          { content: 'Name: M/S. Mayura Steel P Ltd' },
          { content: 'Casting: Yoke' },
          { content: 'Casting weight: 33 Kg' },
          { content: 'No of Cavity: 2 nos' },
          { content: 'Bunch Weight: 105 Kg' },
          { content: 'Yield: 63.0 %' },
          { content: 'Material: Steel' },
          { content: 'Objective: To Shrinkage Defect and Fettling activity' }
        ],
        processDetails: [
          { content: 'Moulding Process: Two Part No Bake' },
          { content: 'Pouring Weight: 105 Kg' },
          { content: 'Pouring Temperature: 1540 - 1580 Deg C' },
          { content: 'Pouring Time: 9-11 Sec' }
        ],
        productsBenefits: [
          {
            label: 'Products used',
            content: [
              'FEDEXO 55 XP EPT 85×100',
              'FEDEXO 55 XP 80×150(0)',
            ],
          },
          {
            label: 'Benefits',
            content: [
              '77% Yield',
              'Three FEDEXO 55 (XP) EPT ND 80 X 100 (O) Replaced With ONE SPOTEX HD V 680',
            ],
          },
        ],
        sectionImages: {
          castingDetails: [CastingDetails_sideImage],
          // processDetails: [whoWeAreFacilityImage],
          productsBenefits: [fedexoEpt85x100, fedexo80x150],
        },
      },
    ],
  },
]

const accordionSections = [
  { id: 'castingDetails', label: 'Casting Details' },
  { id: 'processDetails', label: 'Process Details' },
  { id: 'productsBenefits', label: 'Products & Benefits' },
]

const defaultOpenPanels = { castingDetails: true }

function ChevronIcon({ open = false }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-[50px] w-[50px] shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 9L12 15L18 9" stroke="#00307A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" className="h-16 w-16 translate-x-[3px] text-white drop-shadow-[0_8px_18px_rgba(0,0,0,0.28)] sm:h-25 sm:w-25" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5.14v13.72c0 .77.84 1.25 1.5.86l10.53-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
    </svg>
  )
}

function TitleWithCaps({ text }) {
  if (!text) return null

  const parts = text.split(' ')

  return (
    <>
      {parts.map((word, i) => {
        const letters = word.replace(/[^A-Za-z]/g, '')
        const isAllCaps = letters.length > 0 && letters === letters.toUpperCase()
        const space = i < parts.length - 1 ? ' ' : ''

        return (
          <span key={i} className={isAllCaps ? 'solution-title-caps' : ''}>
            {word}{space}
          </span>
        )
      })}
    </>
  )
}

function normalizeAccordionEntry(entry) {
  if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
    return {
      label: entry.label ?? '',
      content: entry.content ?? '',
    }
  }

  if (typeof entry !== 'string') {
    return { label: '', content: '' }
  }

  const separatorIndex = entry.indexOf(':')

  if (separatorIndex === -1) {
    return { label: '', content: entry }
  }

  return {
    label: entry.slice(0, separatorIndex).trim(),
    content: entry.slice(separatorIndex + 1).trim(),
  }
}

function renderLabeledAccordionList(content) {
  const entries = Array.isArray(content) ? content : []

  return (
    <ul className="solution-accordion-list space-y-5 pl-6">
      {entries.map((entry, index) => {
        const { label, content: entryContent } = normalizeAccordionEntry(entry)
        const value = Array.isArray(entryContent) ? entryContent.join(' ') : entryContent

        return (
          <li key={`${label}-${value}-${index}`} className="solution-accordion-list-item list-disc marker:text-brand-blue">
            {label ? <span className="solution-accordion-label">{label}: </span> : null}
            <span className="solution-accordion-value">{value}</span>
          </li>
        )
      })}
    </ul>
  )
}

function getProductsBenefitsGroups(content) {
  const entries = Array.isArray(content) ? content : []

  return entries
    .map((entry) => normalizeAccordionEntry(entry))
    .filter((entry) => {
      if (Array.isArray(entry.content)) {
        return entry.content.length > 0
      }

      return Boolean(entry.label || entry.content)
    })
}

function renderProductsBenefitsContent(content) {
  const groups = getProductsBenefitsGroups(content)

  return (
    <div className="space-y-6 pb-1">
      {groups.map((group, index) => {
        const items = Array.isArray(group.content) ? group.content : [group.content]

        return (
          <div className="space-y-4" key={`${group.label}-${index}`}>
            {group.label ? <h4 className="products-benefits-group-title">{group.label}</h4> : null}
            <ul className="products-benefits-list space-y-4 pl-6">
              {items.map((entry, itemIndex) => (
                <li key={`${group.label}-${entry}-${itemIndex}`} className="products-benefits-list-item list-disc">
                  {entry}
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default function SolutionsShowcase() {
  const [activeCategoryId, setActiveCategoryId] = useState(solutionCategories[0].id)
  const [activeSolutionId, setActiveSolutionId] = useState(solutionCategories[0].items[0].id)
  const [openPanels, setOpenPanels] = useState(defaultOpenPanels)
  const [sectionImageIndexes, setSectionImageIndexes] = useState({})
  const [showVideo, setShowVideo] = useState(false)
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [solutionDropdownOpen, setSolutionDropdownOpen] = useState(false)

  const activeCategory = solutionCategories.find((category) => category.id === activeCategoryId) ?? solutionCategories[0]
  const activeSolution = activeCategory.items.find((item) => item.id === activeSolutionId) ?? activeCategory.items[0]
  const activeSolutionPosterSrc = activeSolution.poster
  const hasActiveSolutionPoster = Boolean(activeSolutionPosterSrc)
  const activeSolutionVideoSrc = activeSolution.videoSrc
  const hasActiveSolutionVideo = Boolean(activeSolutionVideoSrc)

  const handleCategoryChange = (category) => {
    const nextSolution = category.items[0]

    setActiveCategoryId(category.id)
    setActiveSolutionId(nextSolution.id)
    setOpenPanels(defaultOpenPanels)
    setSectionImageIndexes({})
    setShowVideo(false)
  }

  const handleSolutionChange = (solutionId) => {
    setActiveSolutionId(solutionId)
    setOpenPanels(defaultOpenPanels)
    setSectionImageIndexes({})
    setShowVideo(false)
  }

  const togglePanel = (panelId) => {
    setOpenPanels((current) => ({
      ...current,
      [panelId]: !current[panelId],
    }))
  }

  return (
    <section className="solutions-showcase bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[1680px]">
          <div className="max-w-[1558px]">
            <h2 className="type-2">Comprehensive Foundry Solutions</h2>
            <p className="body-copy-large mt-4 max-w-[1558px] text-[15px] leading-[1.7] text-[#1F1F1F] sm:mt-6 sm:text-[18px] lg:text-[20px]">
              INEXO stands as a trusted foundry partner, delivering precision-cast components engineered for strength,
              consistency, and long-term performance. Backed by technical expertise and quality-focused manufacturing
              practices, we serve a wide range of industries with reliable iron casting solutions. Our commitment to
              innovation, process control, and customer satisfaction enables us to meet complex casting requirements with
              confidence and efficiency. At INEXO, every casting reflects our dedication to engineering excellence,
              operational reliability, and lasting industrial value.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(400px,34%)_minmax(0,1fr)] xl:grid-cols-[minmax(400px,36%)_minmax(0,1fr)] xl:gap-10 2xl:grid-cols-[minmax(460px,38%)_minmax(0,1fr)]">
            {/* Mobile/Tablet Dropdown Selector */}
            <div className="relative block lg:hidden w-full bg-[#FBF8EF] px-5 py-6 rounded-[15px] border border-[#00307A]/10 z-20 space-y-4">
              <h3 className="type-2 text-center mb-2">
                Our Solutions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category Dropdown */}
                <div className="relative">
                  <label className="block text-[13px] font-semibold text-brand-blue/60 uppercase tracking-wider mb-1.5 pl-1">
                    Select Category
                  </label>
                  <button 
                    className="flex w-full items-center justify-between gap-3 text-left font-serif text-[16px] font-bold text-brand-blue bg-white border border-[#00307A]/20 rounded-[10px] px-3.5 py-3 shadow-sm"
                    onClick={() => {
                      setCategoryDropdownOpen(!categoryDropdownOpen)
                      setSolutionDropdownOpen(false)
                    }}
                    type="button"
                  >
                    <span className="truncate">{activeCategory.title}</span>
                    <ChevronIcon open={categoryDropdownOpen} />
                  </button>

                  {categoryDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-[10px] p-2 border border-[#00307A]/20 shadow-lg z-30">
                      <ul className="space-y-1">
                        {solutionCategories.map((category) => {
                          const isSelected = category.id === activeCategoryId
                          return (
                            <li key={category.id}>
                              <button
                                className={`w-full text-left py-2 px-3 rounded-[6px] font-serif text-[15px] font-medium leading-[1.3] transition-colors ${
                                  isSelected 
                                    ? 'bg-[#00307A]/10 text-brand-blue font-bold border-l-4 border-brand-yellow pl-2' 
                                    : 'text-brand-blue hover:bg-brand-blue/5'
                                }`}
                                onClick={() => {
                                  handleCategoryChange(category)
                                  setCategoryDropdownOpen(false)
                                }}
                                type="button"
                              >
                                {category.title}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Solution Dropdown */}
                <div className="relative">
                  <label className="block text-[13px] font-semibold text-brand-blue/60 uppercase tracking-wider mb-1.5 pl-1">
                    Select Solution
                  </label>
                  <button 
                    className="flex w-full items-center justify-between gap-3 text-left font-serif text-[16px] font-bold text-brand-blue bg-white border border-[#00307A]/20 rounded-[10px] px-3.5 py-3 shadow-sm"
                    onClick={() => {
                      setSolutionDropdownOpen(!solutionDropdownOpen)
                      setCategoryDropdownOpen(false)
                    }}
                    type="button"
                  >
                    <span className="truncate">
                      <TitleWithCaps text={activeSolution.title} />
                    </span>
                    <ChevronIcon open={solutionDropdownOpen} />
                  </button>

                  {solutionDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-[10px] p-2 border border-[#00307A]/20 shadow-lg max-h-[250px] overflow-y-auto z-30">
                      <ul className="space-y-1">
                        {activeCategory.items.map((solution) => {
                          const isSelected = solution.id === activeSolution.id
                          return (
                            <li key={solution.id}>
                              <button
                                className={`w-full text-left py-2 px-3 rounded-[6px] font-serif text-[15px] font-medium leading-[1.3] transition-colors ${
                                  isSelected 
                                    ? 'bg-[#00307A]/10 text-brand-blue font-bold border-l-4 border-brand-yellow pl-2' 
                                    : 'text-brand-blue hover:bg-brand-blue/5'
                                }`}
                                onClick={() => {
                                  handleSolutionChange(solution.id)
                                  setSolutionDropdownOpen(false)
                                }}
                                type="button"
                              >
                                <TitleWithCaps text={solution.title} />
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Sidebar (lg and up) */}
            <aside className="hidden lg:block bg-[#FBF8EF] px-5 py-7 sm:px-8 sm:py-9 lg:min-h-[760px] min-w-0">
              <h3 className="type-2 text-center ">
                Our Solutions
              </h3>

              <div className="mt-10 space-y-7">
                {solutionCategories.map((category) => {
                  const isCategoryActive = category.id === activeCategoryId

                  return (
                    <div key={category.id}>
                      <button
                        className="flex w-full items-center justify-between gap-4 text-left font-serif text-[24px] font-bold leading-[1.2] text-brand-blue transition-opacity duration-200 hover:opacity-80 sm:text-[28px]"
                        onClick={() => handleCategoryChange(category)}
                        type="button"
                      >
                        <span className="solutions-category-title">{category.title}</span>
                        <ChevronIcon open={isCategoryActive} />
                      </button>

                      {isCategoryActive ? (
                        <ul className="mt-6 space-y-1">
                          {category.items.map((solution) => {
                            const isSelected = solution.id === activeSolution.id

                            return (
                              <li key={solution.id}>
                                <button
                                  className={`group relative w-full pl-5 pr-2 py-3 text-left font-serif text-[18px] font-semibold leading-[1.45] text-brand-blue transition-colors duration-200 sm:text-[20px] ${isSelected ? 'bg-white/50' : 'hover:bg-white/40'
                                    }`}
                                  onClick={() => handleSolutionChange(solution.id)}
                                  type="button"
                                >
                                  <span
                                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[9px] rounded-full bg-brand-yellow transition-opacity duration-200 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}
                                  />
                                  <span className="solution-title">
                                    <TitleWithCaps text={solution.title} />
                                  </span>
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </aside>

            <div className="flex flex-col gap-6 sm:gap-8 w-full 2xl:max-w-[951px] min-w-0">
              <div className="relative overflow-hidden rounded-[10px] bg-[#D9E0EC]">
                {showVideo && hasActiveSolutionVideo ? (
                  <video
                    autoPlay
                    className="aspect-[16/9] w-full object-cover"
                    controls
                    poster={activeSolutionPosterSrc}
                    src={activeSolutionVideoSrc}
                  />
                ) : (
                  <>
                    {hasActiveSolutionPoster ? (
                      <>
                        <img
                          alt={activeSolution.title}
                          className="aspect-[16/9] w-full object-cover"
                          src={activeSolutionPosterSrc}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,48,122,0.08),rgba(0,48,122,0.18))]" />
                      </>
                    ) : hasActiveSolutionVideo ? (
                      <video
                        className="aspect-[16/9] w-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                        src={activeSolutionVideoSrc}
                      />
                    ) : null}
                    {hasActiveSolutionVideo ? (
                      <button
                        aria-label={`Play video for ${activeSolution.title}`}
                        className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-105"
                        onClick={() => setShowVideo(true)}
                        type="button"
                      >
                        <PlayIcon />
                      </button>
                    ) : null}
                  </>
                )}
              </div>

              <div>
                <h3 className="solution-main-title">
                  <TitleWithCaps text={activeSolution.title} />
                </h3>
                <p className="mt-4 max-w-[950px] solution-summary">
                  {activeSolution.summary}
                </p>
              </div>

              <div>
                {accordionSections.map((section, index) => {
                  const isOpen = Boolean(openPanels[section.id])
                  const content = activeSolution[section.id]
                  const images = activeSolution.sectionImages?.[section.id] ?? []
                  const hasImages = images.length > 0
                  const selectedImageIndex = sectionImageIndexes[section.id] ?? 0
                  const imageSrc = hasImages ? images[selectedImageIndex] ?? images[0] : null
                  const sectionTextContent =
                    section.id === 'productsBenefits'
                      ? renderProductsBenefitsContent(content)
                      : renderLabeledAccordionList(content)

                  return (
                    <div
                      className={`border-b border-[#00307A] ${index === 0 ? 'border-t' : ''}`}
                      key={section.id}
                    >
                      <button
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 py-5 text-left font-serif text-[24px] font-semibold leading-[1.3] text-brand-blue sm:text-[28px]"
                        onClick={() => togglePanel(section.id)}
                        type="button"
                      >
                        <span className="solutions-category-title" >{section.label}</span>
                        <ChevronIcon open={isOpen} />
                      </button>

                      {isOpen ? (
                        <div className={`grid gap-6 pb-5 ${hasImages ? 'md:grid-cols-[minmax(0,1fr)_minmax(200px,36%)] md:items-start lg:grid-cols-[minmax(0,1fr)_minmax(220px,34%)] xl:grid-cols-[minmax(0,1fr)_minmax(260px,417px)]' : ''}`}>
                          {sectionTextContent}

                          {hasImages ? (
                            <div className="w-full max-w-[417px] md:justify-self-end">
                              <div className="aspect-[417/302] w-full overflow-hidden rounded-[10px] bg-[#F7F7F7]">
                                <img
                                  alt={section.label}
                                  className="h-full w-full object-cover"
                                  src={imageSrc}
                                />
                              </div>

                              {images.length > 1 ? (
                                <div className="mt-3 flex items-center justify-end gap-[6px] pr-1">
                                  {images.map((_, imageIndex) => (
                                    <button
                                      aria-label={`Go to ${section.label} image ${imageIndex + 1}`}
                                      className={`rounded-full transition-all duration-200 ${imageIndex === selectedImageIndex
                                        ? 'h-[10px] w-[32px] bg-[#FFB400]'
                                        : 'h-[10px] w-[10px] bg-[#D3D3D3]'
                                        }`}
                                      key={`${section.id}-${imageIndex}`}
                                      onClick={() =>
                                        setSectionImageIndexes((current) => ({
                                          ...current,
                                          [section.id]: imageIndex,
                                        }))
                                      }
                                      type="button"
                                    />
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
