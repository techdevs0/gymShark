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


import Card from "components/Card/Card.js";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
class SalesList extends Component {
  state = {
    selectedLang: "en",
    offers: [],
    columns: [
      // {
      //   name: "img",
      //   label: "Image",
      //   options: {
      //     filter: false,
      //     sort: false,
      //     customBodyRender: (val, row) => (
      //       <Avatar
      //         alt={row.tableData[row.rowIndex][1]?.toUpperCase()}
      //         src={val}
      //       ></Avatar>
      //     ),
      //   },
      // },
      {
        name: "date",
        label: "Date",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "user",
        label: "Customer Name",
        options: {
          filter: true,
          sort: true,
        },
        customBodyRender: (val) => (
          <code>{val?.name || ""}</code>
        ),
      },
      {
        name: "paymentmethod",
        label: "Payment Type",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "subTotal",
        label: "Sub Toal",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "discount",
        label: "Discount",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "shippingCharges",
        label: "Shipping Charges",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "promo_discount",
        label: "Promo Code Discount",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (val) => (
            <code>{val}</code>
          ),
        },
      },
      {
        name: "final_amount",
        label: "Total Amount",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (val) => (
            <code>{val}</code>
          ),
        },
      },
      // {
      //   name: "short_description",
      //   label: "Description",
      //   options: {
      //     filter: true,
      //     sort: false,
      //     customBodyRender: (val) => (
      //       <code>{val?.length > 100 ? val?.substr(0, 100) + "..." : val}</code>
      //     ),
      //   },
      // },
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
    // options={{
    //   selectableRows: false // <===== will turn off checkboxes in rows
    // }}
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
          title="Sales"
          columns={this.state.columns}
          data={this.state.rows}
          options={this.options}
          loading

        />
      </div>
    );
  }
}

export default SalesList;
