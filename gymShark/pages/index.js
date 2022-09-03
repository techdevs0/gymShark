import React, { useEffect } from 'react'
import Head from 'next/head'

// import Custom Components
import Header from '../containers/common/header'
import BannerSection from '../pages/layouts/sections/gym/banner'
import FormatSection from '../pages/layouts/sections/gym/format'
import AboutSection from '../pages/layouts/sections/gym/about'
import ScheduleSection from '../pages/layouts/sections/gym/schedule'
import CounterSection from '../pages/layouts/sections/gym/counter'
import TrainerSection from '../pages/layouts/sections/gym/trainer'
// import TestimonialSection from '../pages/layouts/sections/gym/testimonial'
import PricingSection from '../pages/layouts/sections/gym/pricing'
import CalculateSection from '../pages/layouts/sections/gym/calculate'
// import BrandSection from '../pages/layouts/sections/gym/brand'
import FooterSection from '../pages/layouts/sections/gym/footer'

const Gym = () => {

  useEffect(() => {
    document.body.style.setProperty('--primary', '#000')
    document.body.style.setProperty('--secondary', '#000')
    document.body.style.setProperty('--light', '#000')
    document.body.style.setProperty('--dark', '#000')
  })

  const sliderData = [
    {
      bannerImg: "/assets/images/OTF/banner/homeBannerSlider.jpg",
      title: "The Smartest Workout for More Results",
      detail: "Aliquet nullam cursus mollis donec imperdiet enim viverra. A ac tincidunt mollis sit sed placerat diam bibendum porta. Egestas nisl viverra arcu faucibus.",
      btn1: "BOOK A FREE CLASS NOW",
      btn2: "view membership details"
    },
    {
      bannerImg: "/assets/images/OTF/banner/homeBannerSlider.jpg",
      title: "The Smartest Workout for More Results",
      detail: "Aliquet nullam cursus mollis donec imperdiet enim viverra. A ac tincidunt mollis sit sed placerat diam bibendum porta. Egestas nisl viverra arcu faucibus.",
      btn1: "BOOK A FREE CLASS NOW",
      btn2: "view membership details"
    }
  ];

  const listImg = [
    "/assets/images/OTF/icons/heatl1.png",
    "/assets/images/OTF/icons/heatl2.png",
    "/assets/images/OTF/icons/heatl3.png"
  ];

  const testimonial = [
    {
      img: "/assets/images/OTF/testimonial/testimonial1.png",
      title: "Client name example",
      subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit.."
    },
    {
      img: "/assets/images/OTF/testimonial/testimonial2.png",
      title: "Client name example",
      subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit.."
    },
    {
      img: "/assets/images/OTF/testimonial/testimonial3.png",
      title: "Client name example",
      subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit.."
    },
    {
      img: "/assets/images/OTF/testimonial/testimonial4.png",
      title: "Client name example",
      subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit.."
    },
    {
      img: "/assets/images/OTF/testimonial/testimonial5.png",
      title: "Client name example",
      subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit.."
    },
    {
      img: "/assets/images/OTF/testimonial/testimonial6.png",
      title: "Client name example",
      subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit.."
    },
    {
      img: "/assets/images/OTF/testimonial/testimonial7.png",
      title: "Client name example",
      subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit.."
    }
  ];

  return (
    <div>
      <Head>
        <title>Gym Shark</title>
      </Head>

      <Header className="gym nav-lg" />

      <BannerSection
        sliderData={sliderData}
      />

      <AboutSection />

      <ScheduleSection
        title={"Health and Safety (It's not either/or)"}
        detail={"As the pandemic continues, it’s incredibly important Orangetheory studios operate with an abundance of caution. We continually review and evaluate our safety and disinfection protocols to align with the latest recommendations and local government mandates."}
        detail2="The Orangetheory studio design, structured class schedule, block interval training and tight-knit community of franchisees enables us to have a more controlled environment in comparison to other fitness gyms."
        listImg={listImg}
        bgImg="/assets/images/OTF/home/health-safetybg.jpg"
      />

      <PricingSection />

      <CounterSection
        title="Get 10% off during this festive season!"
        subtitle="Senectus viverra laoreet proin eget. Ullamcorper in lorem nisl aliquet orci enim vel, a. Ut quis luctus massa."
        btntext="BOOK A FREE CLASS NOW"
        bgImg="/assets/images/OTF/home/get-off.jpg"

      />

      <TrainerSection
        testimonial={testimonial}
        title="Testimonials"
      />

      {/* <TestimonialSection /> */}

      <FormatSection />

      <CalculateSection />

      {/* <BrandSection /> */}

      <FooterSection />

    </div>
  )
}
export default Gym;