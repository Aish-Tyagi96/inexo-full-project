import preekyLogo from '@/assets/images/home/preeky.svg'
import kmriLogo from '@/assets/images/home/kmri.svg'
import matrixmetalLogo from '@/assets/images/home/matrixmetal.svg'
import nelcastLogo from '@/assets/images/home/nel_cast.svg'
import malnadLogo from '@/assets/images/home/malnad.svg'
import { Container } from '@/components/common/Container'
import { SectionLabel } from '@/components/common/SectionLabel'

const customers = [
  { name: 'PREEKY', logo: preekyLogo },
  { name: 'KMRI', logo: kmriLogo },
  { name: 'Matrix Metals', logo: matrixmetalLogo },
  { name: 'NELCAST', logo: nelcastLogo },
  { name: 'MALNAD', logo: malnadLogo },
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
            <div className="flex w-max animate-marquee-reverse gap-8 md:gap-16 py-4">
              {marqueeItems.map((customer, idx) => (
                <div
                  key={`${customer.name}-${idx}`}
                  className="flex items-center justify-center p-4 w-[160px] sm:w-[200px] md:w-[240px] shrink-0"
                >
                  <img
                    alt={customer.name}
                    src={customer.logo}
                    className="h-auto w-full max-w-[120px] sm:max-w-[150px] md:max-w-[180px] object-contain select-none pointer-events-none"
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
