import facebookIcon from '@/assets/images/brand/Facebook Icon.svg'
import googleIcon from '@/assets/images/brand/Google Icon.svg'
import inexoLogo from '@/assets/images/brand/footer_Logo.svg'
import instagramIcon from '@/assets/images/brand/insta.svg'
import xIcon from '@/assets/images/brand/X Icon.svg'
import youtubeIcon from '@/assets/images/brand/Youtube Icon.svg'
import safetyPolicyPdf from '@/assets/images/footer/Safety Policy-Inexo.pdf'
import privacyPolicyPdf from '@/assets/images/footer/Privacy Policy.pdf'
import tcPdf from '@/assets/images/footer/T&C.pdf'

const quickLinks = [
  { label: 'Safety Policy', href: safetyPolicyPdf },
  { label: 'Privacy Policy', href: privacyPolicyPdf },
  { label: 'Terms & Conditions', href: tcPdf },
]

const socialLinks = [
  { label: 'X', href: '#', icon: xIcon },
  { label: 'Instagram', href: '#', icon: instagramIcon },
  { label: 'Facebook', href: '#', icon: facebookIcon },
  { label: 'YouTube', href: '#', icon: youtubeIcon },
  { label: 'Google', href: '#', icon: googleIcon },
]

export function Footer() {
  return (
    <footer className=" bg-brand-blue text-white pb-8 pt-8">
      {/* <footer className="min-h-[692px] bg-brand-blue text-white"> */}

      <div className="site-container px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-7">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.8fr_1.5fr] lg:gap-12">
          <div>
            <img alt="INEXO logo" className="h-auto w-[94px] sm:w-[106px]" src={inexoLogo} />

            <h3 className="footer-office-heading mt-5">Regd. Office &amp; Works</h3>

            <p className="footer-address-text mt-5">
              No : 28, Thiruvallur High Road, via Thirumazhisai,
              <br />
              Puduchathiram Post, Gudapakkam,
              <br />
              Chennai - 600 124,
              <br />
              Tamil Nadu, India.
            </p>

            <p className="mt-6 font-serif text-[22px] leading-[1.4] text-white/95">Mobile Number : +91 - 97909 04848</p>

            <p className="mt-6 font-serif text-[22px] leading-[1.4] text-white/95">Email id : sales@inexocast.in</p>
          </div>

          <div>
            <h3 className="footer-section-heading">Quick links</h3>

            <ul className="mt-8 space-y-6">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a className="footer-address-text" href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-section-heading">Follow us on</h3>

            <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8">
              {socialLinks.map((item) => (
                <a
                  aria-label={item.label}
                  className="inline-flex h-12 w-12 items-center justify-center transition-transform hover:scale-105"
                  href={item.href}
                  key={item.label}
                >
                  <img alt="" aria-hidden="true" className="h-[42px] w-[42px] object-contain" src={item.icon} />
                </a>
              ))}
            </div>

            <h3 className="mt-12 footer-section-heading ">Subscribe us</h3>

            <form className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:items-center" onSubmit={(event) => event.preventDefault()}>
              <label className="sr-only" htmlFor="footer-email">
                Enter Email ID
              </label>
              <input
                className="h-[56px] w-full rounded-[4px] border border-white/35 bg-white px-4 font-sans text-[28px] leading-none text-brand-blue placeholder:text-brand-blue/90 focus:outline-none"
                id="footer-email"
                placeholder="Enter Email ID"
                type="email"
              />
              <button
                className="footer-submit-button inline-flex h-[56px] min-w-[150px] items-center justify-center rounded-[4px] bg-brand-yellow transition-opacity hover:opacity-90"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <p className="mt-12 text-center footer-address-text sm:mt-14">Copyright@INEXO2025</p>
      </div>
    </footer>
  )
}