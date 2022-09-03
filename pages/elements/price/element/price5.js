import React, { Fragment } from 'react';
// import Slider from "react-slick";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row, Col } from 'reactstrap'

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    centerMode: true,
    swipeToSlide: true,
    centerPadding: '0px',
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true
            }
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 1,
                centerPadding: "160px",
                padding: "20px",
                slidesToScroll: 1,
                centerMode: true,
                autoplay: true,
                dots: true
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3
            }
        }
    ]
};


const PricingFive = () => {

    const PricingResume2 = [
        {
            icon: "assets/images/OTF/icons/Premier.png",
            iconW: "assets/images/OTF/icons/PremierW.png",
            title: "Orange Premier",
            feature1: "Unlimited classes",
            feature2: 'Reduced rate for families'
        },
        {
            icon: "assets/images/OTF/icons/Orange-elite.png",
            iconW: "assets/images/OTF/icons/eliteW.png",
            title: "Orange Elite",
            feature1: "8 classes/month",
            feature2: 'Extra classes at reduced rate'
        },
        {
            icon: "assets/images/OTF/icons/Basic.png",
            iconW: "assets/images/OTF/icons/BasicW.png",
            title: "Orange Basic",
            feature1: "4 classes/month",
            feature2: 'Extra classes at reduced rate'
        }
    ];

    return (
        <Fragment>
            <Container>
                <div className="wrapper-full" id="monthly">
                    <Row>
                        <Col xs="12">
                            <Slider className="owl-carousel owl-theme pricing-slider price-margin" {...settings}>
                                {
                                    PricingResume2.map((item, i) => {
                                        return (
                                            <div className="item" key={i}>
                                                <div className="price-container hover-overlay shadows bg-white text-center">
                                                    <div className="price-feature-container set-relative">
                                                        <div className="feature-text">
                                                            <center>
                                                                <img src={item.icon} className="feature-icon1 mb-4" alt={"icon"} />
                                                                <img src={item.iconW} className="feature-icon2 d-none mb-4" alt={"icon"} />
                                                            </center>
                                                            <h4 className="feature-text-heading text-center bold text-uppercase font-primary">{item.title}</h4>
                                                            <hr className="set-border" />
                                                        </div>
                                                        <div className="price-features font-primary">
                                                            <h5 className="price-feature text-center">{item.feature1}</h5>
                                                            <h5 className="price-feature text-center">{item.feature2}</h5>
                                                        </div>
                                                        <a className="otfBtn2" href="#">join now</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Fragment>
    )
}


export default PricingFive;