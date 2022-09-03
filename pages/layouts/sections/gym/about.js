import React from "react";
import { Container, Row, Col } from "reactstrap";
const About = () => (
  <section className="gym format" id="about">
    <div className="animated-bg">
      <i></i>
      <i></i>
      <i></i>
    </div>

    <Container>
      <h3 className="oftHeading">Story About Us</h3>
      <Row>
        <Col md="6">
          <img
            alt=""
            className="img-fluid format-img mb-3"
            src="/assets/images/OTF/home/about.webp"
          />
        </Col>
        <Col md="6">
          <div>
            <div className="format-sub-text">
              <p className="p-light oftsubHeading mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
                est soluta blanditiis velit doloremque corrupti aliquid ducimus
                consectetur ea nobis dolorem, id quibusdam praesentium
                consequuntur modi eligendi, sunt suscipit ullam iure nesciunt
                tempore. Itaque placeat, libero aliquam odio ex voluptas.
              </p>
              <p className="p-light oftsubHeading">
                Vel vitae, assumenda blanditiis nemo in vero reprehenderit
                asperiores distinctio exercitationem aliquid, quam velit
                explicabo neque. Sapiente provident sequi omnis itaque eaque
                voluptatum vel. Accusamus deserunt atque eligendi mollitia
                voluptates eum libero, ratione id labore. Magnam porro dolorem
                aspernatur, dolor?
              </p>
            </div>
            <a className="otfBtn" href="#">
              learn more
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default About;
