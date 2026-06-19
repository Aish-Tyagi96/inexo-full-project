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
  return (
    <section className="bg-white py-12 md:py-20 lg:py-[100px]">
      <Container>
        <div className="flex flex-col items-center">
          {/* <SectionLabel>Our Clients</SectionLabel> */}

          <h2 className="type-2 mt-8 text-center md:mt-[48px]">
            Customers We Serve
          </h2>

          <div className="mt-12 grid w-full grid-cols-2 gap-8 md:mt-16 md:grid-cols-3 lg:grid-cols-5 lg:gap-10">
            {customers.map((customer) => (
              <div
                key={customer.name}
                className="flex items-center justify-center p-6 lg:p-8"
              >
                <img
                  alt={customer.name}
                  src={customer.logo}
                  className="h-auto w-full max-w-[140px] object-contain md:max-w-[160px] lg:max-w-[180px]"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
