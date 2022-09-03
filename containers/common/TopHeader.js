import React from 'react'
import { Container } from 'reactstrap'

const TopHeader = props => {

    return (
        <div className='topheader'>
            <Container>
                <a href="tel:+971 526582020" >
                    <i className="fa fa-phone"></i> +971 526582020
                </a>
            </Container>
        </div>
    )
}

export default TopHeader
