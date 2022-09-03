import React, { useEffect } from 'react'
import Head from 'next/head'

// import Custom Components
import Header from '../../containers/common/header'
import FooterSection from '../../pages/layouts/sections/gym/footer'

import Offerbanner from './offers/offerbanner'
import Plans from './offers/plans'
import Coaching from './offers/coaching'
import Workouteveryone from './offers/workouteveryone'

const Offers = () => {

    useEffect(() => {
        document.body.style.setProperty('--primary', '#000')
        document.body.style.setProperty('--secondary', '#000')
        document.body.style.setProperty('--light', '#000')
        document.body.style.setProperty('--dark', '#000')
    })

    return (
        <div>
            <Head>
                <title>Offers</title>
            </Head>

            <Header className="gym nav-lg" />

            <Offerbanner />

            <Plans />

            <Coaching />

            <Workouteveryone />

            <FooterSection />

        </div>
    )
}
export default Offers;