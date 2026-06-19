import productsImage from '@/assets/images/Products/INEXO_Products.png'
import searchIcon from '@/assets/images/brand/search_Icon.svg'
import { Container } from '@/components/common/Container'
import { SectionLabel } from '@/components/common/SectionLabel'

export function ProductsOverviewSection() {
    return (
        <section className="bg-[#f4f4f4] py-10 md:py-20 lg:py-[120px]">
            <Container>
                <div className="mb-8 flex justify-end md:mb-12">
                    <label className="relative block w-full max-w-[330px]">
                        <img src={searchIcon} alt="Search" className="absolute left-[25px] top-1/2 -translate-y-1/2 w-[29.451px] h-[29.451px]" />
                        <input
                            aria-label="Search for products"
                            className="search-input w-full bg-transparent placeholder:text-[#A6B4CF] focus:outline-none"
                            placeholder="Search for products"
                            type="search"
                        />
                    </label>
                </div>

                <div className="grid items-center gap-10 grid-cols-1 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
                    <div className="w-full max-w-[991px]">
                        <SectionLabel>INEXO Products</SectionLabel>

                        <h2 className="type-2 mt-10">
                            Engineered to Perform. Built to deliver sound castings.
                        </h2>

                        <p className="mt-8 text-[18px] leading-[1.65] text-[#2A2A2A] sm:text-[20px]">
                            At INEXO cast metal solutions, we manufacture high-quality risers and runners engineered for strength,
                            precision, and long-term performance. Our products are designed to meet the requirements of every
                            feeding system for foundry applications. With advanced foundry technology, strict quality control, and
                            customer-focused engineering, INEXO products delivers precision feeding solutions for sound castings.
                            From SPOTEX to FEDPOUR or FEDEXO to ISOTOP, every product reflects our commitment to excellence and
                            reliability.
                        </p>
                    </div>

                    <div className="aspect-[769/435] w-full overflow-hidden rounded-[12px] bg-[#DDDDDD] sm:rounded-[16px] lg:max-w-[769px] lg:rounded-[20px]">
                        <img
                            alt="INEXO products"
                            className="h-full w-full object-contain aspect-[769/435] lg:aspect-auto"
                            src={productsImage}
                        />
                    </div>
                </div>
            </Container>
        </section>
    )
}