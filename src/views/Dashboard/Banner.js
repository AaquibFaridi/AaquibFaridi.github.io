import React from 'react'
import Swiper from 'react-id-swiper'
import img1 from 'assets/img/slider/banner-1.jpg'
import img2 from 'assets/img/slider/banner-2.jpg'
import img3 from 'assets/img/slider/banner-3.jpg'
import img4 from 'assets/img/slider/banner-4.jpg'
import img5 from 'assets/img/slider/banner-5.jpg'

const params = {
  spaceBetween: 200,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
}

const Banner = () => {
  return (
    <div>
      <Swiper {...params}>
        <div>
          <img
            src={img1}
            alt="swiper 1"
            className="img-fluid"
            style={{ minHeight: '215px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <img
            src={img2}
            alt="swiper 2"
            className="img-fluid"
            style={{ minHeight: '230px' }}
          />
        </div>
        <div>
          <img
            src={img3}
            alt="swiper 3"
            className="img-fluid"
            style={{ minHeight: '230px' }}
          />
        </div>
        <div>
          <img
            src={img4}
            alt="swiper 4"
            className="img-fluid"
            style={{ minHeight: '230px' }}
          />
        </div>
        <div>
          <img
            src={img5}
            alt="swiper 5"
            className="img-fluid"
            style={{ minHeight: '230px' }}
          />
        </div>
      </Swiper>
    </div>
  )
}
export default Banner
