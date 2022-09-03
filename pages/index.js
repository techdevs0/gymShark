import React, { useEffect } from "react";
import Head from "next/head";

// import Custom Components
import Header from "../containers/common/header";
import BannerSection from "../pages/layouts/sections/gym/banner";
import FormatSection from "../pages/layouts/sections/gym/format";
import AboutSection from "../pages/layouts/sections/gym/about";
import ScheduleSection from "../pages/layouts/sections/gym/schedule";
import CounterSection from "../pages/layouts/sections/gym/counter";
import TrainerSection from "../pages/layouts/sections/gym/trainer";
// import TestimonialSection from '../pages/layouts/sections/gym/testimonial'
import PricingSection from "../pages/layouts/sections/gym/pricing";
import CalculateSection from "../pages/layouts/sections/gym/calculate";
// import BrandSection from '../pages/layouts/sections/gym/brand'
import FooterSection from "../pages/layouts/sections/gym/footer";

const Gym = () => {
  useEffect(() => {
    document.body.style.setProperty("--primary", "#000");
    document.body.style.setProperty("--secondary", "#000");
    document.body.style.setProperty("--light", "#000");
    document.body.style.setProperty("--dark", "#000");
  });

  const sliderData = [
    {
      bannerImg: "/assets/images/OTF/banner/homeBannerSlider.webp",
      title: "Exercise Until The Body Obeys.",
      detail:
        "Aliquet nullam cursus mollis donec imperdiet enim viverra. A ac tincidunt mollis sit sed placerat diam bibendum porta. Egestas nisl viverra arcu faucibus.",
      btn1: "BOOK A FREE CLASS NOW",
      btn2: "view membership details",
    },
    {
      bannerImg: "/assets/images/OTF/banner/homeBannerSlider2.jpg",
      title: "Be Strong Traning Hard",
      detail:
        "Aliquet nullam cursus mollis donec imperdiet enim viverra. A ac tincidunt mollis sit sed placerat diam bibendum porta. Egestas nisl viverra arcu faucibus.",
      btn1: "BOOK A FREE CLASS NOW",
      btn2: "view membership details",
    },
  ];

  const testimonial = [
    {
      img: "/assets/images/OTF/testimonial/testimonial1.png",
      title: "Client name example",
      subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit..",
    },
    {
      img: "/assets/images/OTF/testimonial/testimonial2.png",
      title: "Client name example",
      subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit..",
    },
    {
      img: "/assets/images/OTF/testimonial/testimonial3.png",
      title: "Client name example",
      subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit..",
    },
    {
      img: "/assets/images/OTF/testimonial/testimonial4.png",
      title: "Client name example",
      subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit..",
    },
    {
      img: "/assets/images/OTF/testimonial/testimonial5.png",
      title: "Client name example",
      subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit..",
    },
    {
      img: "/assets/images/OTF/testimonial/testimonial6.png",
      title: "Client name example",
      subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit..",
    },
    {
      img: "/assets/images/OTF/testimonial/testimonial7.png",
      title: "Client name example",
      subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit..",
    },
  ];

  return (
    <div>
      <Head>
        <title>Gym Shark</title>
      </Head>

      <Header className="gym nav-lg" />

      <BannerSection sliderData={sliderData} />

      <AboutSection />

      <ScheduleSection
        title={"Get Training Today"}
        detail={
          "Gimply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard."
        }
        detail2="Vel vitae, assumenda blanditiis nemo in vero reprehenderit asperiores distinctio exercitationem aliquid, quam velit explicabo neque. Sapiente provident sequi omnis itaque eaque voluptatum vel. Accusamus deserunt atque eligendi mollitia voluptates eum libero, ratione id labore. Magnam porro dolorem aspernatur, dolor?"
        bgImg="/assets/images/OTF/home/health-safetybg.webp"
        btnText="Contact Now"
      />

      <PricingSection />

      <CounterSection
        title="REGISTRATION NOW TO GET MORE DEALS"
        subtitle="Senectus viverra laoreet proin eget. Ullamcorper in lorem nisl aliquet orci enim vel, a. Ut quis luctus massa."
        btntext="BOOK A FREE CLASS NOW"
        bgImg="/assets/images/OTF/home/get-off.webp"
      />

      <TrainerSection testimonial={testimonial} title="Testimonials" />

      {/* <TestimonialSection /> */}

      <FormatSection />

      <CalculateSection />

      {/* <BrandSection /> */}

      <FooterSection />
    </div>
  );
};
export default Gym;
