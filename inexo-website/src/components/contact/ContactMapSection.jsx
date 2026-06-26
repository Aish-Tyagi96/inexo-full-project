export function ContactMapSection() {
  return (
    <section className="bg-[#F6FAFF] py-10 md:py-16 border-y border-[#e2eaf4] overflow-hidden">
      <div className="w-full px-4 sm:px-8 lg:px-[48px]">
        <div className="w-full h-[822px] relative rounded-[24px] overflow-hidden border border-[#e2eaf4] shadow-[0_10px_30px_rgba(0,48,122,0.06)] hover:shadow-[0_15px_40px_rgba(0,48,122,0.1)] transition-all duration-300 group">
          <iframe
            title="INEXO Cast Metals Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.803362141566!2d79.98694007603649!3d13.095791986958434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5263d327be9c81%3A0xd57596b33a7485c2!2sInexo%20Cast%20Metals%20and%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1717810000000!5m2!1sen!2sin"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
