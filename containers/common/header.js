import React, { useState } from 'react'
import Nav from './nav'
import { Container, Row, Col } from 'reactstrap'

const Header = props => {
    const [sidebar, setSidebar] = useState(false);

    const clickSidebar = () => {
        setSidebar(!sidebar)
        document.querySelector('.navbar').classList.add('openSidebar')
    }

    return (
        <>
            <header className={`${props.className || 'app2'} loding-header nav-abs custom-scroll  `}>
                <Container>
                    <Row>
                        <Col>
                            <nav>
                                <a className="m-r-auto" href="/">
                                    <img alt="" className="img-fluid" src="/assets/images/OTF/logo/main-logo.png" style={{height:"40px"}}  />
                                </a>
                                <div className="responsive-btn">
                                    <a className="toggle-nav" onClick={clickSidebar} >
                                        <i aria-hidden="true" className="fa fa-bars text-white"></i>
                                    </a>
                                </div>
                                <Nav />
                            </nav>
                        </Col>
                    </Row>
                </Container>
            </header>
        </>
    )
}

export default Header
