import React from 'react';
import Layout from '../../../../containers/common/common-layout'
import Portfolio from '../../../../containers/portfolio/basic'

const SubCategoriesProductList = () => (
    <Layout
    title="Products"
    subtitle="You don’t need to be a scientist to understand how spending 12 minutes or more in the Orange Zone gives you more strength, more energy and more life. You just need to be a member."
    // btntext="Book your Free class!"
    bannerImg="/assets/images/OTF/banner/aboutbanner.jpg"
    metaTitle={"About Us"} 
    pathList={['portfolio basic', 'basic-3 grid with title']} pathTitle="portfolio with basic-3 grid"
    >
        <Portfolio
            className="col-md-4 col-sm-6 isotopeSelector"
            title="Lorem Ipsum"
            subTitle="Lorem Ipsum"
        />
    </Layout>
)

export default SubCategoriesProductList;