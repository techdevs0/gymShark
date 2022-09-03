import React, { useEffect } from 'react'
import Head from 'next/head'

// import Custom Components
import Header from '../../containers/common/header'
import BannerSection from '../../pages/layouts/sections/gym/banner'
import CounterSection from '../../pages/layouts/sections/gym/counter'
import FooterSection from '../../pages/layouts/sections/gym/footer'
import ScheduleSection from '../../pages/layouts/sections/gym/schedule'
import AbouSection from './about-us/about'
import TrainerSection from '../../pages/layouts/sections/gym/trainer'




const Workout = () => {

    useEffect(() => {
        document.body.style.setProperty('--primary', '#000')
        document.body.style.setProperty('--secondary', '#000')
        document.body.style.setProperty('--light', '#000')
        document.body.style.setProperty('--dark', '#000')
    })

    const sliderData = [
        {
            bannerImg: "/assets/images/OTF/banner/workoutbanner.jpg",
            title: "Est commodo enim.",
            detail: "Commodo eu nunc ullamcorper felis. Praesent quisque morbi egestas adipiscing malesuada faucibus purus. Ut neque tortor eu imperdiet arcu, pretium diam sem sed. Imperdiet.",
            btnm: "Book your free class with us!"
        },
        {
            bannerImg: "/assets/images/OTF/banner/workoutbanner.jpg",
            title: "Est commodo enim.",
            detail: "Commodo eu nunc ullamcorper felis. Praesent quisque morbi egestas adipiscing malesuada faucibus purus. Ut neque tortor eu imperdiet arcu, pretium diam sem sed. Imperdiet.",
            btnm: "Book your free class with us!"
        }
    ];

    const testimonial = [
        {
            img: "/assets/images/OTF/testimonial/testimonial1.png",
            title: "Member name example",
            subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit.."
        },
        {
            img: "/assets/images/OTF/testimonial/testimonial2.png",
            title: "Member name example",
            subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit.."
        },
        {
            img: "/assets/images/OTF/testimonial/testimonial3.png",
            title: "Member name example",
            subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit.."
        },
        {
            img: "/assets/images/OTF/testimonial/testimonial4.png",
            title: "Member name example",
            subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit.."
        },
        {
            img: "/assets/images/OTF/testimonial/testimonial5.png",
            title: "Member name example",
            subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit.."
        },
        {
            img: "/assets/images/OTF/testimonial/testimonial6.png",
            title: "Member name example",
            subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit.."
        },
        {
            img: "/assets/images/OTF/testimonial/testimonial7.png",
            title: "Member name example",
            subtitle: "Lorem ipsum dolor amit set lorem ipsum dolor amit.."
        }
    ];

    return (
        <div>
            <Head>
                <title>The Workout</title>
            </Head>

            <Header className="gym nav-lg" />

            <BannerSection
                sliderData={sliderData}
            />

            <AbouSection
                title="What Happens in class"
                detail="Magna eu pulvinar donec id. Vestibulum, egestas orci, volutpat vitae rhoncus facilisi. Id tristique consequat turpis lobortis elit nisl est sit et. Nisl, egestas condimentum sed id. Nulla dui cras enim massa, senectus etiam tortor massa quam. Fringilla vel, placerat eros eget tortor, aliquam orci. Ut condimentum est sed accumsan id. Eget enim interdum id interdum eu, dictum. Sollicitudin nisl tempus non fusce nisl euismod neque. Ut ultricies tincidunt massa rutrum nisi vestibulum, nisi eleifend. Integer egestas aliquam magna sollicitudin pulvinar sed."
                info1title="01. Rowing"
                info1detail="Every stroke on the rower activates 85% of your body’s muscles to help you improve endurance, strength and power."
                info2title="02. Cardio"
                info2detail="Whether you walk, jog or run, you’ll go at your own pace based on your fitness level. We also have bikes and striders available as alternates to the treadmill."
                info3title="03. Strength Training"
                info3detail="Our weight and floor exercises change daily so you can focus on different muscles. Your coach can provide options for any movement if you have..."
            />

            <ScheduleSection
                titleM={"Coach Professionalism"}
                subtitle={"Our Coaches Are More than Just Coaches."}
                detail={"As you take in the energy of our group workout, you’ll also get the attention and inspiration that comes from our experienced personal coaches. They’re full of the life they promise and always pushing you forward with tough love."}
                detail2={"Fermentum in commodo, massa faucibus velit ut natoque. Ultrices sit varius ut justo nisl, interdum. Tortor, odio egestas erat volutpat. Urna volutpat aliquam leo mauris magna at feugiat accumsan."}
                btnText="book a class now"
                bgImg="/assets/images/OTF/workout/coachprofBg.jpg"
            />

            <TrainerSection
                testimonial={testimonial}
                title="What Our Members Are Saying About"
            />

            <CounterSection
                title="Get 10% off during this festive season!"
                subtitle="Senectus viverra laoreet proin eget. Ullamcorper in lorem nisl aliquet orci enim vel, a. Ut quis luctus massa."
                btntext="Book a class now"
                bgImg="/assets/images/OTF/home/get-off.jpg"
            />

            <FooterSection />

        </div>
    )
}
export default Workout;