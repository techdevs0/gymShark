import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import API from "langapi/http";
import InputLabel from "@material-ui/core/InputLabel";
import { Avatar, Box, Button } from "@material-ui/core";
import { FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Modal } from "reactstrap";
import {
  AddOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  VisibilityOutlined,
} from "@material-ui/icons";
import OrderDetailModal from './ProductReportModal'


import Card from "components/Card/Card.js";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
class ProductReport extends Component {
  state = {
    selectedLang: "en",
    offers: [],
    columns: [
      {
        name: "barcode",
        label: "barcode",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "name",
        label: "product Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "price",
        label: "Price",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "qunatity_sold",
        label: "qunatity Sold",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "amount",
        label: "Amount",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "route",
        label: "Actions",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (val) => (
            <div className="d-flex nowrap">
              <Button
                className="ml-2"
                onClick={() => this.setState({ show: true })}
              // title="Edit"
              // to={`/admin/variations/edit/${val}?lang=${this.state.selectedLang}`}
              >
                <VisibilityOutlined fontSize="small" color="primary" />
              </Button>
              {/* <Link
                className="ml-2"
                title="Delete"
                to={`#`}
                onClick={() => this.handleDelete(val)}
              >
                <DeleteOutlined fontSize="small" color="secondary" />
              </Link> */}
            </div>
          ),
        },
      },
    ],
    rows: [],
    date: "",
    dateFrom: "",
    dateTo: "",
    show: false
  };

  options = {
    // filterType: "checkbox",
    responsive: "vertical",
    selectableRows: false
  };

  componentDidMount() {
    API.get(`/variations?lang=${this.state.selectedLang}`).then((response) => {
      let rows = response?.data?.data;
      this.setState({ rows });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedLang !== this.state.selectedLang) {
      API.get(`/variations?lang=${this.state.selectedLang}`).then((response) => {
        let rows = response?.data?.data;
        if (this.state.rows != rows) {
          this.setState({ rows });
        }
      });
    }
  }


  handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {

      let token = localStorage.getItem("authToken") || ""
      API.delete(`/variations/${id}?lang=${this.state.selectedLang}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          if (response.status === 200) {
            alert("Variation deleted successfully !");
          }
        })
        .then(() => {
          API.get(`/variations?lang=${this.state.selectedLang}`).then((response) => {
            let rows = response?.data?.data;
            this.setState({ rows });
          });
        })
        .catch((err) => console.log(err));
    }
  };

  handleChange = (event) => {
    // setAge(event.target.value as string);
    if (event.target.value != this.state.selectedLang) {
      this.setState({ selectedLang: event.target.value })
    }
    console.log(event.target.value, "event.target.value")
  };

  onSelect = (dateValue) => {

    if (dateValue.length > 1) {
      let formMonth = dateValue[0].getMonth() + 1
      let toMonth = dateValue[1].getMonth() + 1
      let fromDate = dateValue[0].getDate()
      let toDate = dateValue[1].getDate()

      if (formMonth < 10) {
        formMonth = "0" + formMonth
      }
      if (toMonth < 10) {
        toMonth = "0" + toMonth
      }
      if (fromDate < 10) {
        fromDate = "0" + fromDate
      }
      if (toDate < 10) {
        toDate = "0" + toDate
      }

      let from = dateValue[0].getFullYear() + "-" + formMonth + "-" + fromDate
      let to = dateValue[1].getFullYear() + "-" + toMonth + "-" + toDate

      this.setState({ dateFrom: from, dateTo: to })
    }

  };
  render() {
    return (
      <div>
        <Card>
          <OrderDetailModal show={this.state.show}
            onHide={() => {
              this.setState({ show: false });
            }}
            review={this.state.selectReview}
          />
          <Box marginBottom={2} margin={2}>
            <div className="d-flex align-items-center" style={{ columnGap: "20px" }}>
              {/* <FormControl
              variant="outlined"
              size="small"
              style={{ width: "20%" }}
            // fullWidth
            >
              <InputLabel id="language">Select Payment Type</InputLabel>
              <Select
                labelId="payment_type"
                id="payment_type"
                name="payment_type"
                value={this.state.selectedLang}
                // onChange={handleInputChange}
                label="Payment Type"
                fullWidth
                onChange={this.handleChange}
              >
                <MenuItem value={'en'}>En</MenuItem>
                <MenuItem value={'fr'}>FR</MenuItem>
                <MenuItem value={'de'}>DE</MenuItem>

              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              size="small"
              style={{ width: "20%" }}
            // fullWidth
            >
              <InputLabel id="language">Select Order Status</InputLabel>
              <Select
                labelId="order_status"
                id="order_status"
                name="order_status"
                value={this.state.selectedLang}
                // onChange={handleInputChange}
                label="Order Status"
                fullWidth
                onChange={this.handleChange}
              >
                <MenuItem value={'en'}>En</MenuItem>
                <MenuItem value={'fr'}>FR</MenuItem>
                <MenuItem value={'de'}>DE</MenuItem>

              </Select>
            </FormControl> */}
              <FormControl
                variant="outlined"
                size="small"
                style={{ width: "20%" }}
              // fullWidth
              >
                <Flatpickr
                  value={this.state.date}
                  mode="range"
                  options={{
                    dateFormat: "Y-m-d",
                    mode: "range"
                  }}
                  onChange={(date) => {
                    this.onSelect(date)
                    this.setState({ date });
                  }}
                  placeholder={"Select Date Here"}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchOutlined />}
              >
                Search
              </Button>
            </div>
          </Box>
        </Card>
        <MUIDataTable
          title="Product Report"
          columns={this.state.columns}
          data={this.state.rows}
          options={this.options}
          loading
        />
      </div>
    );
  }
}

export default ProductReport;
