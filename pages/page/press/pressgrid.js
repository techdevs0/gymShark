import React from "react";
import { Container, Row, Col } from "reactstrap";
import { MesonryData } from "../../../database/blog/database";
import Masonry from "react-masonry-css";
import CardWrapper from "../../../containers/blog/card/grid-wrapper";
import Categories from "../../../containers/blog/categories";
import PopularPosts from "../../../containers/blog/posts";
import NewsLetter from "../../../containers/blog/newsletter";
import Instagram from "../../../containers/blog/instagram";

const Pressgrid = () => (
  <section className="agency blog blog-sec blog-sidebar rightAnimation">
    <div className="animated-bg">
      <i
        style={{
          background: "#f0494b91",
          boxShadow: "0 15px 30px 0 #f0494b91",
        }}
      ></i>
      <i
        style={{
          background: "#f0494b91",
          boxShadow: "0 15px 30px 0 #f0494b91",
        }}
      ></i>
      <i
        style={{
          background: "#f0494b91",
          boxShadow: "0 15px 30px 0 #f0494b91",
        }}
      ></i>
    </div>
    <Container>
      <Row>
        <Col lg="9" className="order-lg-2">
          <div>
            <Masonry
              breakpointCols={2}
              className="my-masonry-grid masonry-with-dec row"
              columnClassName="col-md-6 col-12"
            >
              {MesonryData.length > 0
                ? MesonryData.map((item, index) => (
                    <CardWrapper
                      key={`grid-no-sidebar-${index}`}
                      className=""
                      image={item.image}
                      blogDate={item.createdAt}
                      place={item.place}
                      title={item.title}
                      description={item.description}
                      readUrl={item.readUrl}
                    />
                  ))
                : "!! No Blogs Found"}
            </Masonry>
          </div>
        </Col>
        <Col lg="3">
          <div className="blog-side">
            <Categories />
            <PopularPosts />
            <NewsLetter />
            <Instagram />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Pressgrid;
