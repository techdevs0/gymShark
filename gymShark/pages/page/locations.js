import React from 'react'
import 'react-light-accordion/demo/css/index.css';
// import Custom Components
import Layout from '../../containers/common/common-layout'
import CalculateSection from '../../pages/layouts/sections/gym/calculate'


const Locations = () => {

    return (
        <Layout
            title="Find us near you!"
            subtitle="Feugiat vulputate cursus sagittis pulvinar duis non magna cursus. Parturient donec vehicula neque, ut consectetur pretium. Velit et duis a purus vitae vivamus. Aliquet tellus est."
            btntext="Book your session"
            bannerImg="/assets/images/OTF/banner/locationbanner.jpg"
            metaTitle={"Locations"}
        >
            <CalculateSection />

        </Layout>
    )
}

export default Locations;