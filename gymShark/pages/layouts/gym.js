import React, { useEffect } from 'react'
import Head from 'next/head'

// import Custom Components
import Header from '../../containers/common/header'
import BannerSection from './sections/gym/banner'
import FormatSection from './sections/gym/format'
import AboutSection from './sections/gym/about'
import ScheduleSection from './sections/gym/schedule'
import PricingSection from './sections/gym/pricing'
import CounterSection from './sections/gym/counter'
import TestimonialSection from './sections/gym/testimonial'
import TrainerSection from './sections/gym/trainer'
import CalculateSection from './sections/gym/calculate'
// import BrandSection from './sections/gym/brand'
import FooterSection from './sections/gym/footer'

const Gym = () => {

    useEffect(() => {
        document.body.style.setProperty('--primary', '#000')
        document.body.style.setProperty('--secondary', '#000')
        document.body.style.setProperty('--light', '#000')
        document.body.style.setProperty('--dark', '#000')
    })

    return (
        <div>
            <Head>
                <title>Orange Theory</title>
            </Head>

            <Header className="gym nav-lg" />

            <BannerSection />

            <FormatSection />

            <AboutSection />

            <ScheduleSection />

            <PricingSection />

            <CounterSection />

            <TestimonialSection />

            <TrainerSection />

            <CalculateSection />

            {/* <BrandSection /> */}

            <FooterSection />

        </div>
    )
}
export default Gym;