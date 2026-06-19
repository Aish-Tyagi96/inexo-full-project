import { Container } from '@/components/common/Container'
import { SectionLabel } from '@/components/common/SectionLabel'

export function ContactMapSection() {
  return (
    <section className="bg-[#F6FAFF] py-14 sm:py-20 lg:py-[100px] border-y border-[#e2eaf4] overflow-hidden">
      <Container>
        {/* Header Content */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <div className="mb-6">
            <SectionLabel textClassName="text-[#00307a] font-sans font-bold text-[14px] uppercase tracking-wider">
              Find Us
            </SectionLabel>
          </div>

          <h2 className="type-2 font-serif text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.2] text-[#00307a] mb-4">
            Our Manufacturing Facility &amp; Works
          </h2>
          <p className="font-sans text-[15px] sm:text-[17px] leading-[1.6] text-[#4b4b4b]">
            Locate our primary manufacturing unit on the map or calculate directions directly to our facility. We welcome clients and partners for scheduled tours and technical consultations.
          </p>
        </div>

        {/* Map and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Map Column */}
          <div className="lg:col-span-8 w-full min-h-[350px] sm:min-h-[450px] lg:min-h-[500px] flex">
            <div className="w-full relative rounded-[24px] overflow-hidden border border-[#e2eaf4] shadow-[0_10px_30px_rgba(0,48,122,0.06)] hover:shadow-[0_15px_40px_rgba(0,48,122,0.1)] transition-all duration-300 group">
              <iframe
                title="INEXO Metal Casts Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.803362141566!2d79.98694007603649!3d13.095791986958434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5263d327be9c81%3A0xd57596b33a7485c2!2sInexo%20Cast%20Metals%20and%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1717810000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Details Card Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="w-full h-full bg-white rounded-[24px] p-8 sm:p-10 border border-[#e2eaf4] shadow-[0_10px_30px_rgba(0,48,122,0.06)] flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#00307a]/5 flex items-center justify-center text-[#00307a] mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-[18px] font-bold text-[#00307a] mb-2">Registered Office</h4>
                    <p className="font-sans text-[15px] leading-[1.6] text-gray-600">
                      No:28, Thiruvallur High Road, via Thirumazhisai, Puduchathiram Post, Gudapakkam, Chennai – 600 124, Tamil Nadu, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#00307a]/5 flex items-center justify-center text-[#00307a] mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-[18px] font-bold text-[#00307a] mb-2">Operational Hours</h4>
                    <p className="font-sans text-[15px] leading-[1.6] text-gray-600">
                      Monday – Saturday<br />
                      9:00 AM – 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <a
                  href="https://maps.app.goo.gl/rWCsHJRSCT7bDQF46"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-[54px] inline-flex items-center justify-center gap-2 rounded-[12px] bg-[#00307a] hover:bg-[#002257] text-white font-sans text-[16px] font-bold transition-all shadow-md cursor-pointer hover:shadow-lg group"
                >
                  <span>Open in Google Maps</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
