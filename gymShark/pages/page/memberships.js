import React, { useEffect } from 'react'
import Head from 'next/head'

// import Custom Components
import Header from '../../containers/common/header'
import BannerSection from '../../pages/layouts/sections/gym/banner'
import CounterSection from '../../pages/layouts/sections/gym/counter'
import PricingSection from '../../pages/layouts/sections/gym/pricing'
import FooterSection from '../../pages/layouts/sections/gym/footer'
import Faq from '../layouts/sections/modern-sass/faq'
import Location from './membership/location'
import ScheduleSection from '../../pages/layouts/sections/gym/schedule'
import Benefits from './membership/benefits'


const Memberships = () => {

    useEffect(() => {
        document.body.style.setProperty('--primary', '#000')
        document.body.style.setProperty('--secondary', '#000')
        document.body.style.setProperty('--light', '#000')
        document.body.style.setProperty('--dark', '#000')
    })

    const sliderData = [
        {
            bannerImg: "/assets/images/OTF/banner/membershipbanner.jpg",
            title: "Let’s talk membership",
            detail: "No matter what your fitness level is, 2 to 4 workout a week is all you need to maximize your results at Orangetheory. Let’s find the membership option that works best for you.",
            btnm: "Avail one of our membership now",
            viewbtn: "View membership details"
        },
        {
            bannerImg: "/assets/images/OTF/banner/membershipbanner.jpg",
            title: "Let’s talk membership",
            detail: "No matter what your fitness level is, 2 to 4 workout a week is all you need to maximize your results at Orangetheory. Let’s find the membership option that works best for you.",
            btnm: "Avail one of our membership now",
            viewbtn: "View membership details"
        }
    ];
    const list = [
        "Free Lunch & Burn intro class",
        "Free Team-Building Workout",
        "Preferred Membership Pricing for all employees"
    ];

    const benefitList = [
        {
            img: "/assets/images/OTF/membership/Dumbells.png",
            title: "Easy online booking"
        },
        {
            img: "/assets/images/OTF/membership/LAT.png",
            title: "Nationwide studio access*"
        },
        {
            img: "/assets/images/OTF/membership/Threadmill.png",
            title: "Month-to-month memberships"
        }
    ]
    return (
        <div>
            <Head>
                <title>Memberships</title>
            </Head>

            <Header className="gym nav-lg" />

            <BannerSection
                sliderData={sliderData}
            />

            <Location />

            <PricingSection />

            <ScheduleSection
                titleM={"Corporate Memberships"}
                detail={"Orangetheory Fitness is more than just a workout. It's an employee-engaging, productivity-elevating experience designed to give your company More Bottom Line and give your employees More Life, one class at a time."}
                list={list}
                btnText="Avail now"
                bgImg="/assets/images/OTF/membership/corporateBg.jpg"
            />

            <Benefits
                benefitList={benefitList}
            />

            <CounterSection
                title="Get 10% off during this festive season!"
                subtitle="Senectus viverra laoreet proin eget. Ullamcorper in lorem nisl aliquet orci enim vel, a. Ut quis luctus massa."
                btntext="Book a class now"
                bgImg="/assets/images/OTF/home/get-off.jpg"
            />

            <Faq />

            <FooterSection />

        </div>
    )
}
export default Memberships;