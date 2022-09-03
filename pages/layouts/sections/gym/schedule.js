import React from "react";
import { Container, Row, Col } from "reactstrap";

const Schedule = ({
  titleM,
  title,
  detail,
  list,
  btnText,
  bgImg,
  subtitle,
  detail2,
}) => (
  <section
    className={`gym format rightAnimation bg-schedule ${subtitle && "mt-5"}`}
    id="schedule"
    style={{ backgroundImage: `url("${bgImg}")` }}
  >
    <div className="animated-bg">
      <i></i>
      <i></i>
      <i></i>
    </div>

    <Container>
      {title && <h3 className="oftHeading">{title}</h3>}
      <Row>
        <Col md="6">
          <div className="center-text">
            <div>
              {titleM && (
                <h3 className={`oftHeading text-left ${subtitle && "mb-3"}`}>
                  {titleM}
                </h3>
              )}
              {subtitle && (
                <h4 className="text-white mb-5" style={{ fontSize: "20px" }}>
                  {subtitle}
                </h4>
              )}
              <div className="format-sub-text">
                <p className="p-light oftsubHeading text-white">{detail}</p>
                {detail2 && (
                  <p className="p-light oftsubHeading text-white mt-3">
                    {detail2}
                  </p>
                )}
              </div>
              {list && (
                <ul className="text-white pl-4" style={{ listStyle: "circle" }}>
                  {list.length > 0 &&
                    list.map((x, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: "16px",
                          fontWeight: "300",
                          textAlign: "left",
                        }}
                      >
                        {x}
                      </li>
                    ))}
                </ul>
              )}

              {btnText && (
                <button className={`otfBtn1 px-5 ${subtitle ? "mt-2" : ""}`}>
                  {btnText}
                </button>
              )}
            </div>
          </div>
        </Col>
        <Col md="6">
          <div className="text-center center-content">
            <img
              alt=""
              className="img-fluid format-img"
              src="/assets/images/OTF/home/healthtrainer.webp"
            />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Schedule;
