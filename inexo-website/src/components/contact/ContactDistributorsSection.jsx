import { useState } from 'react'
import { Container } from '@/components/common/Container'
import { SectionLabel } from '@/components/common/SectionLabel'
import mapPlaceholder from '@/assets/images/ContactUs/map_placeholder.png'

const distributorsData = {
  India: [
    {
      id: 'ind-1',
      title: 'North India',
      companyName: 'M/S FS International',
      address: 'Plot No. 341, Udyog Vihar Phase VI, Sector 37, Gurugram Haryana - 122001',
      email: 'customersupport@fsinternational.in',
      phone: '+91-9971288866 / +91-9311905208',
      type: 'Mobile'
    },
    {
      id: 'ind-2',
      title: 'Shivmogga',
      companyName: 'M/S Shreyonidhi enterprises (India) Pvt Ltd',
      address: 'Plot No. 29 A & B, KIADB Indl. Area, Machenahalli, Nidige Post, Shivamogga-577222. Karnataka.',
      email: 'shreyonidhi@shreyonidhi.com',
      phone: '+91-98454 16616',
      type: 'Mobile'
    },
    {
      id: 'ind-3',
      title: 'Belgaum',
      companyName: 'M/S Surya Alloys(P) Ltd',
      address: 'Shed No. 3/4, SY No, 103, Desai Building, Udyumbag, Belgaum-590008, Karnataka.',
      email: 'suryaalloys939@gmail.com',
      phone: '+91-94498 17939',
      type: 'Mobile'
    },
    {
      id: 'ind-4',
      title: 'Coimbatore',
      companyName: 'M/S Indo Flow Tech (P) Ltd',
      address: '41E, 5th Cross, Thanneerpandhal Road, Maheswari Nagar, Peelamedu, Coimbatore-641 004. Tamil Nadu.',
      email: 'indfoflowtech@yahoo.in',
      phone: '0422-2511027',
      type: 'Ph'
    }
  ],
  Malaysia: [
    {
      id: 'mys-1',
      title: 'Klang, Selangor',
      companyName: 'Maxhot Metalcast Solutions Sdn Bhd',
      address: 'No. 28-1A, Jalan Raya Barat, 41100 Klang, Selangor, Malaysia',
      email: 'sales@maxhot.com.my',
      phone: '+6-011-1270 1817',
      type: 'Mobile'
    }
  ]
}

export function ContactDistributorsSection() {
  const [activeTab, setActiveTab] = useState('India')

  const activeDistributors = distributorsData[activeTab] || []

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-[100px] border-b border-[#e2eaf4]">
      <Container>
        {/* Header Label and Title */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="mb-6">
            <SectionLabel className="mx-auto" textClassName="text-[#00307a] font-sans font-bold text-[14px] uppercase tracking-wider">
              Distributors
            </SectionLabel>
          </div>

          <h2 className="type-2 font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold leading-[1.2] text-[#00307a]">
            Our Channel Partners
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-4 border-b border-[#e2eaf4]/60 pb-4 mb-8 sm:mb-12">
          {Object.keys(distributorsData).map((country) => {
            const isActive = activeTab === country
            return (
              <button
                key={country}
                onClick={() => setActiveTab(country)}
                className={`px-6 py-2.5 rounded-full font-sans text-[16px] font-bold tracking-wide transition-all cursor-pointer focus:outline-none ${
                  isActive
                    ? 'bg-[#ffeed1] text-[#00307a]'
                    : 'text-[#00307a] hover:text-[#002257] hover:bg-gray-50'
                }`}
              >
                {country}
              </button>
            )
          })}
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeDistributors.map((distributor) => {
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${distributor.companyName} ${distributor.address}`
            )}`

            return (
              <div
                key={distributor.id}
                className="bg-white rounded-[24px] overflow-hidden border border-[#e2eaf4] shadow-[0_10px_30px_rgba(0,48,122,0.03)] flex flex-col transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,48,122,0.08)] hover:-translate-y-1"
              >
                {/* Map Image Thumbnail */}
                <div className="w-full h-[180px] overflow-hidden relative border-b border-[#e2eaf4]/40">
                  <img
                    src={mapPlaceholder}
                    alt={`${distributor.title} Map Location`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                  <div className="space-y-4">
                    <h3 className="font-serif text-[20px] font-bold text-[#00307a] leading-tight">
                      {distributor.title}
                    </h3>

                    <div className="space-y-3">
                      <p className="font-sans text-[14px] font-bold text-gray-900 leading-snug">
                        {distributor.companyName}
                      </p>

                      <p className="font-sans text-[13px] leading-relaxed text-gray-600">
                        {distributor.address}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-gray-50">
                        <p className="font-sans text-[13px] text-gray-600">
                          <span className="font-semibold text-gray-800">Email Id:</span>{' '}
                          <a
                            href={`mailto:${distributor.email}`}
                            className="hover:underline text-[#00307a] font-medium"
                          >
                            {distributor.email}
                          </a>
                        </p>

                        <p className="font-sans text-[13px] text-gray-600">
                          <span className="font-semibold text-gray-800">{distributor.type}:</span>{' '}
                          <span className="font-medium text-gray-800">{distributor.phone}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-[44px] inline-flex items-center justify-center rounded-full bg-[#00307a] hover:bg-[#002257] text-white font-sans text-[14px] font-bold tracking-wide transition-all shadow-sm hover:shadow cursor-pointer"
                    >
                      View Location
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
