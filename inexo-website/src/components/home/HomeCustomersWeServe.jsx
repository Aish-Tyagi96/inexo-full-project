import acerlanLogo from '@/assets/images/home/acerlan_sa_de_cv_logo.jpeg'
import neoSymLogo from '@/assets/images/home/Neo_Sym_logo.jpg'
import ashokLeylandLogo from '@/assets/images/home/Ashok_Leyland_logo.png'
import kiswokLogo from '@/assets/images/home/Kiswok_logo.jpeg'
import kmriLogo from '@/assets/images/home/KMRI_logo.jpg'
import malnadLogo from '@/assets/images/home/Malnad_logo.jpeg'
import matrixLogo from '@/assets/images/home/matrix_logo.jpeg'
import metsoLogo from '@/assets/images/home/Metso-logo.png'
import nelcastLogo from '@/assets/images/home/Nelcast_logo.png'
import { Container } from '@/components/common/Container'
import { SectionLabel } from '@/components/common/SectionLabel'

const customers = [
  { name: 'Acerlan SA de CV', logo: acerlanLogo },
  { name: 'Neo Sym', logo: neoSymLogo },
  { name: 'Ashok Leyland', logo: ashokLeylandLogo },
  { name: 'Kiswok', logo: kiswokLogo },
  { name: 'KMRI', logo: kmriLogo },
  { name: 'Malnad', logo: malnadLogo },
  { name: 'Matrix', logo: matrixLogo },
  { name: 'Metso', logo: metsoLogo },
  { name: 'Nelcast', logo: nelcastLogo },
]

export function HomeCustomersWeServe() {
  // Duplicate the customers array to construct a seamless scrolling marquee
  const marqueeItems = [...customers, ...customers, ...customers, ...customers]

  return (
    <section className="bg-surface-page py-12 md:py-20 lg:py-[100px] overflow-hidden">
      <Container>
        <div className="flex flex-col items-center">
          <h2 className="type-2 mt-8 text-center md:mt-[48px] mb-12">
            Customers We Serve
          </h2>

          <div className="w-full overflow-hidden relative">
            {/* Smooth gradient fade overlays at the edges */}
            <div 
              style={{ background: 'linear-gradient(to right, var(--color-surface-page), transparent)' }} 
              className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none" 
            />
            <div 
              style={{ background: 'linear-gradient(to left, var(--color-surface-page), transparent)' }} 
              className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none" 
            />

            {/* Seamless scrolling marquee list wrapper */}
            <div className="flex w-max animate-marquee gap-8 md:gap-16 py-4">
              {marqueeItems.map((customer, idx) => (
                <div
                  key={`${customer.name}-${idx}`}
                  className="flex items-center justify-center p-6 shrink-0"
                  style={{
                    width: '376px',
                    height: '184px',
                    borderRadius: '30px',
                    background: '#FFF',
                    boxShadow: '0 22px 34px 0 rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <img
                    alt={customer.name}
                    src={customer.logo}
                    className="max-h-[110px] max-w-[220px] object-contain select-none pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
