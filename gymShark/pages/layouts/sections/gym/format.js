import React from 'react'
import { Container, Row, Col } from 'reactstrap'

const featureData = [
    {
        img: "/assets/images/OTF/icons/f1.png",
        title: "Free classes per month",
        subtitle: "In nulla tristique consequat mattis. Netus aliquet."
    },
    {
        img: "/assets/images/OTF/icons/f2.png",
        title: "Largest & most affordable",
        subtitle: "In faucibus volutpat fringilla dictumst blandit scelerisque."
    },
    {
        img: "/assets/images/OTF/icons/f3.png",
        title: "Gender based workout spaces",
        subtitle: "Parturient vitae arcu mollis nulla. Velit ligula amet quis eget."
    },
    {
        img: "/assets/images/OTF/icons/f4.png",
        title: "Latest piece of equipments",
        subtitle: "Sit maecenas metus odio purus. Adipiscing donec in orci."
    },
    {
        img: "/assets/images/OTF/icons/f5.png",
        title: "Covered car parking",
        subtitle: "Cras lobortis mattis sed faucibus tempus."
    },
    {
        img: "/assets/images/OTF/icons/f6.png",
        title: "open anytime 24/7",
        subtitle: "Vulputate dolor eu mattis condimentum. "
    }
];

const Format = () => (
    <section className="gym formatBG rightAnimation"
        style={{ backgroundImage: "url('/assets/images/OTF/home/features.jpg')" }}
    >
        <div className="animated-bg"><i></i><i></i><i></i></div>

        <Container fluid>
            <div className='bgFeature'>
                <Row>
                    {featureData &&
                        featureData.length > 0 &&
                        featureData.map((x, i) => (
                            <Col md="6" key={i} className="mb-4">
                                <Row>
                                    <Col sm="2">
                                        <img alt="" className="img-fluid formateImg" src={x.img} />
                                    </Col>
                                    <Col sm={10} className={"d-flex flex-column justify-content-center align-items-start formatedetailDiv"} >
                                        <h4 className="formatHeading">{x.title}</h4>
                                        <p className="p-light formatsubHeading">
                                            {x.subtitle}
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </Container>
    </section>
)


export default Format;