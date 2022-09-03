import React, { useEffect } from 'react'
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';
import { Container, Row, Col } from 'reactstrap'
// import Custom Components
import Layout from '../../containers/common/common-layout'
import Faqform from './faq/faqform';

const FAQ = () => {

    useEffect(() => {
        document.querySelector(".accordion .accordion-item").classList.add("active");
        return () => {
            document.querySelector(".accordion .accordion-item").classList.remove("active");
        }
    }, []);

    const DummyContent1 = (props) => (
        <p>
            {props.answer}
        </p>
    );

    const faqData = [
        {
            question: "How early should I arrive for my first Orangetheory class?",
            answer: "No one cares about products. People care about ideas. Is a product an idea? Noup. Is a brand? A good one is. No one cares about products. People care about ideas. Is a product an idea? Noup. Is a brand? A good one is."
        },
        {
            question: "I haven't worked out in a long time? Can I still do the workout?",
            answer: "No one cares about products. People care about ideas. Is a product an idea? Noup. Is a brand? A good one is. No one cares about products. People care about ideas. Is a product an idea? Noup. Is a brand? A good one is."
        },
        {
            question: "I have issues with (part of the body). Can I still do your workout?",
            answer: "No one cares about products. People care about ideas. Is a product an idea? Noup. Is a brand? A good one is. No one cares about products. People care about ideas. Is a product an idea? Noup. Is a brand? A good one is."
        },
        {
            question: "What do the 5 zones mean, and why is the Orange zone so important?",
            answer: "No one cares about products. People care about ideas. Is a product an idea? Noup. Is a brand? A good one is. No one cares about products. People care about ideas. Is a product an idea? Noup. Is a brand? A good one is."
        },
        {
            question: "What equipment do you use at Orangetheory?",
            answer: "No one cares about products. People care about ideas. Is a product an idea? Noup. Is a brand? A good one is. No one cares about products. People care about ideas. Is a product an idea? Noup. Is a brand? A good one is."
        }
    ];
    return (
        <Layout
            title="Try Us For Free.Yes, Free!"
            btntext="book a free class now"
            promtext="*Promotion Terms. Limited Time Offer."
            bannerImg="/assets/images/OTF/banner/faqbanner.jpg"
            metaTitle={"Support"}
        >
            <section className="saas1 faq testimonial-bg inner-container rightAnimation" id="faq">

                <div className="animated-bg"><i
                    style={{
                        background: "#f5822091",
                        boxShadow: "0 15px 30px 0 #f5822091"
                    }}
                ></i>
                    <i
                        style={{
                            background: "#f5822091",
                            boxShadow: "0 15px 30px 0 #f5822091"
                        }}
                    ></i>
                    <i style={{
                        background: "#f5822091",
                        boxShadow: "0 15px 30px 0 #f5822091"
                    }}></i>
                </div>

                <Container>

                    <div className="faq-block">
                        <div>
                            <h3 className="frequent-text">Frequently Asked Questions</h3>
                            <Accordion atomic={true}>
                                {faqData &&
                                    faqData.length > 0 &&
                                    faqData.map((x, i) => (
                                        <AccordionItem className="card-header bg-primary" title={x.question} key={i} >
                                            <DummyContent1 answer={x.answer} />
                                        </AccordionItem>
                                    ))
                                }
                            </Accordion>
                        </div>
                    </div>
                </Container>
            </section>
            <Faqform />
        </Layout>
    )
}

export default FAQ;