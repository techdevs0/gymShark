import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Badge, Col, Row } from "reactstrap";
import MUIDataTable from "mui-datatables";
// import "./OrderDetails.scss";

const ProductReportModal = (props) => {
  // let { user, product, rating, comments } = props.review;
  let order = props?.review || "";
  let data = order?.order_detail
  // console.log(order,"order list")
  let columns = [
    {
      name: "Image",
      selector: "englishImage",
      sortable: true,
      cell: (row) => <img style={{width:"25%"}} src={row.englishImage} />,
    },
    {
      name: "Name",
      selector: "productName",
      sortable: true,
      cell: (row) => <p className="text-bold-500 mb-0"><span className="productNameStyle">{row.productName}</span>{row.variation && <>({row.variation})</> } {row.color && <>({row.color})</>} {row.decoration && <>({row.decoration})</>}</p>,
    },
    {
      name: "Item Code",
      selector: "productCode",
      sortable: true,
      cell: (row) => <p className="text-bold-500 mb-0">{row.productCode}</p>,
    },
    {
      name: "Barcode",
      selector: "productBarcode",
      sortable: true,
      cell: (row) => <p className="text-bold-500 mb-0">{row?.productBarcode || ""}</p>,
    },
    {
      name: "Quantity",
      selector: "quantity",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 mb-0">{row.quantity}</p>
      ),
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 mb-0">{row.discounted_price > 0 ? row.discounted_price.toFixed(2) : row.price.toFixed(2)}</p>
      ),
    },
    {
      name: "Sub Total",
      selector: "",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 mb-0">{row.discounted_price > 0 ? (row.quantity * row.discounted_price).toFixed(2) : (row.quantity * row.price).toFixed(2)}</p>
      ),
    }
  ]

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modelForOrder"
    >
      <Modal.Header closeButton className="orderdetailModelheader">
        <Modal.Title id="contained-modal-title-vcenter">
          Order Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="orderdetailModelBody">
        <div>
          <Row>
            <Col sm={3}>
              <h6>Order ID:</h6>
            </Col>
            <Col>
              <p>{order?.orderNo}</p>
            </Col>
            <Col sm={3}>
              <h6>Sub Total:</h6>
            </Col>
            <Col sm={3}>
              <p>{order?.payment_details?.subTotal?.toFixed(2)}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <h6>User Name:</h6>
            </Col>
            <Col sm={3}>
              <p>{order?.user_name}</p>
            </Col>
            <Col sm={3}>
              <h6 style={{fontWeight : 'bold'}}>Promo Code:</h6>
            </Col>
            <Col sm={3}>
              <p>{order?.promo_code}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <h6>Phone :</h6>
            </Col>
            <Col sm={3}>
              <p>{order?.customer_details?.phone || ""}</p>
            </Col>
            {order?.payment_details?.promo_discount > 0 &&
              <>
                <Col sm={3}>
                  <h6>Promo Code Discount :</h6>
                </Col>
                <Col sm={3}>
                  <p>{(order?.payment_details?.promo_discount).toFixed(2) || ""}</p>
                </Col>
              </>
            }

          </Row>
          <Row>
          <Col sm={3}>
              <h6>Email:</h6>
          </Col>
          <Col sm={3}>
              <p>{order?.user_email}</p>
          </Col>
          <Col sm={3}>
              <h6>Total After promo Code:</h6>
          </Col>
          <Col sm={3}>
              <p>{(order?.payment_details?.subTotal - order?.payment_details?.promo_discount).toFixed(2)}</p>
          </Col>

          </Row>
          <Row>
          <Col sm={3}>
              <h6>Date:</h6>
            </Col>
            <Col sm={3}>
              <p>{new Date(order?.created_at).toLocaleDateString()}</p>
            </Col>
            <Col sm={3}>
              <h6>Shipping Charges:</h6>
            </Col>
            <Col sm={3}>
            <p>{Number(order?.payment_details?.shippingCharges)}</p>
            </Col>
          </Row>
          <Row>
          <Col sm={3}>
              <h6>Status:</h6>
            </Col>
            <Col sm={3}>
            {/* {order?.status == "accepted" ? <Badge color="success">Paid</Badge> : <Badge color="warning">Un Paid</Badge> } */}
            <Badge color="primary" className="badgeClassPrimary">{order?.status}</Badge>
            </Col>
            <Col sm={3}>
              <h6 style={{fontWeight : 'bold'}}>Final Total: </h6>
            </Col>
            <Col sm={3}>
            {/* {order?.status == "accepted" ? <Badge color="success">Paid</Badge> : <Badge color="warning">Un Paid</Badge> } */}
            <p>{order?.payment_details?.finalTotal?.toFixed(2)}</p>
            </Col>
          </Row>
        </div>
        <div className="mt-2">
          <h6>Products List:</h6>
          {/* <p>{comments}</p> */}
          <MUIDataTable
            className="dataTable-custom"
            data={order?.cart}
            columns={columns}
            noHeader
            // pagination
            // subHeader
            // subHeaderComponent={
            //   <CustomHeader
            //     value={value}
            //     handleFilter={this.handleFilter}
            //     {...this.props}
            //   />
            // }
          />

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductReportModal;
