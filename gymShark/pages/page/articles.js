import React from 'react'

// import Custom Components
import Layout from '../../containers/common/common-layout'
import CounterSection from '../../pages/layouts/sections/gym/counter'
import Aboutarticles from './articles/aboutarticles'
import Articlesgrid from './articles/articlesgrid'


const Articles = () => (
    <Layout
        title="Lorem ipsum"
        subtitle="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        btntext="Lorem ipsum dolor"
        bannerImg="/assets/images/OTF/banner/articlesbanner.jpg"
        metaTitle={"Articles"}
    >
        <Aboutarticles />

        <Articlesgrid />

        <CounterSection
            title="Lorem Ipsum"
            subtitle="Senectus viverra laoreet proin eget. Ullamcorper in lorem nisl aliquet orci enim vel, a. Ut quis luctus massa."
            btntext="Lorem Ipsum"
            bgImg="/assets/images/OTF/articles/articalbg.jpg"
        />

    </Layout>
);


export default Articles;