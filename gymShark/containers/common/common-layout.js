import React, { useEffect } from 'react';
import Header from '../../containers/common/header'
import Breadcrumb from "./breadcrumb"
import FooterSection from '../../pages/layouts/sections/gym/footer'
import Head from 'next/head'


const CommonLayout = ({ children, btntext, title, subtitle, bannerImg, metaTitle, promtext }) => {

    useEffect(() => {
        document.body.style.setProperty('--primary', '#000')
        document.body.style.setProperty('--secondary', '#000')
        document.body.style.setProperty('--light', '#252525')
        document.body.style.setProperty('--dark', '#000')
    })

    return (
        <>
            <Head>
                <title>
                    {metaTitle}
                </title>
            </Head>

            <Header className="gym nav-lg" />

            <Breadcrumb
                subtitle={subtitle}
                title={title}
                bannerImg={bannerImg}
                btntext={btntext}
                promtext={promtext}
            />

            <>{children}</>

            <FooterSection />
        </>
    )
}


export default CommonLayout;