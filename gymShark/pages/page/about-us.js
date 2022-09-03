import React from 'react'

// import Custom Components
import Layout from '../../containers/common/common-layout'
import AbouSection from './about-us/about'
import SpeakerSection from './about-us/speaker'
import CounterSection from './about-us/counter'
import Faq from '../layouts/sections/modern-sass/faq'
import CalculateSection from '../../pages/layouts/sections/gym/calculate'
import TestimonialSection from '../layouts/sections/modern-sass/testimonial'


const AboutUs = () => (
    <Layout
        title="Backed by science"
        subtitle="You don’t need to be a scientist to understand how spending 12 minutes or more in the Orange Zone gives you more strength, more energy and more life. You just need to be a member."
        btntext="Book your Free class!"
        bannerImg="/assets/images/OTF/banner/aboutbanner.jpg"
        metaTitle={"About Us"}
    >

        <AbouSection
            divId="mission"
            title="We’re Gymshark."
            detail=" It’s not our goals that unite us, but the things we do to achieve them. Because although our training grounds and end goals might be different, sweat is our sport. And we’re a team of individuals who know that to go further, we go together.


            Our legacy began in 2012, from a garage in Birmingham, UK with nothing but a sewing machine, a screen-printer and ambitions we had no right to hold. Today, we create the tools that help everyone become their personal best: the clothing you’ll sweat in, the content you’ll find inspiration in and the community you’ll become your best in.
            
            
            Our Gymshark family of employees, athletes and followers is now over 10 million strong, with a total social media following of over 18 million and customers in over 230 countries across our 14 online stores. Our employee family is growing too, with over 900 employees across offices in five regions, including Solihull, UK (just outside our hometown) and Denver, Colorado."
            info1title="Our Mission"
            info1detail="Aliquam felis augue non nisl morbi elit. Eu pharetra, scelerisque varius amet vulputate porta vitae. Facilisi."
            info2title="Our Vision"
            info2detail="Vitae quisque facilisis vel aliquam dolor enim ut risus. Diam aliquam faucibus semper habitasse parturient."
            info3title="Our Values"
            info3detail="Molestie dui posuere amet, nunc, placerat. Ullamcorper at ultrices lorem malesuada arcu nisi."
        />

        <SpeakerSection />
        <TestimonialSection />

        <CounterSection />
        <Faq />
        <CalculateSection />
    </Layout>
);


export default AboutUs;