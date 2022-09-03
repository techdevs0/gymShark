import React from 'react'

// import Custom Components
import Layout from '../../containers/common/common-layout'
import CounterSection from '../../pages/layouts/sections/gym/counter'
import Aboutpress from './press/aboutpress'
import Pressgrid from './press/pressgrid'

const Press = () => (
    <Layout
        title="Lorem ipsum"
        subtitle="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        btntext="Lorem ipsum dolor"
        bannerImg="/assets/images/OTF/banner/pressbanner.jpg"
        metaTitle={"Press"}
    >
        <Aboutpress />

        <Pressgrid />

        <CounterSection
            title="Follow us on Social Media"
            subtitle="Senectus viverra laoreet proin eget. Ullamcorper in lorem nisl aliquet orci enim vel, a. Ut quis luctus massa."
            btntext="Lorem Ipsum"
            bgImg="/assets/images/OTF/press/pressbg.jpg"
        />

    </Layout>
);


export default Press;