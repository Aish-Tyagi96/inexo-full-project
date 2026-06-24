import cardRightArrow from '@/assets/images/home/card-right-arrow.svg'

export function NewsMediaCard({ image, imageAlt, title, description, date, readMoreHref = '#', onClick }) {
  const handleReadMoreClick = (e) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <article
      className="flex h-full w-full flex-col md:mx-auto md:max-w-[441px] group"
    >
      <div className="w-full overflow-hidden rounded-[10px]">
        <img alt={imageAlt} className="h-[262px] w-full object-cover opacity-100 transition-transform duration-500 group-hover:scale-105" src={image} />
      </div>

      <h3 className="news-media-card-title mt-5 transition-opacity duration-200 group-hover:opacity-85">
        {title}
      </h3>

      <p className="news-media-card-description mt-4">
        {description}
      </p>

      <div className="mt-5 flex items-center justify-between gap-4 pt-1 lg:mt-6">
        <span className="news-media-card-date">{date}</span>

        <a className="inline-flex items-center gap-5 cursor-pointer transition-opacity duration-200 hover:opacity-80" href={readMoreHref} onClick={handleReadMoreClick}>
          <span className="news-media-card-read-more">Read More</span>
          <span className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full bg-brand-blue">
            <img alt="" aria-hidden="true" className="h-4 w-4 object-contain brightness-0 invert" src={cardRightArrow} />
          </span>
        </a>
      </div>
    </article>
  )
}