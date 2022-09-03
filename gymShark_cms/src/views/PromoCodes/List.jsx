import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import API from "langapi/http";
import InputLabel from "@material-ui/core/InputLabel";
import { Avatar, Box, Button } from "@material-ui/core";
import { FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  AddOutlined,
  DeleteOutlined,
  EditOutlined,
  VisibilityOutlined,
} from "@material-ui/icons";

class VariationsList extends Component {
  state = {
    selectedLang: "en",
    offers: [],
    columns: [
      {
        name: "name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "value",
        label: "Discount in %",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "usage",
        label: "Usage Limit",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "usage_per_person",
        label: "Usage Count",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "start_date",
        label: "Start Date",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "end_date",
        label: "End Date",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "id",
        label: "Actions",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (val) => (
            <div className="d-flex nowrap">
              <Link
                className="ml-2"
                title="Edit"
                to={`/admin/variations/edit/${val}?lang=${this.state.selectedLang}`}
              >
                <EditOutlined fontSize="small" color="primary" />
              </Link>
              <Link
                className="ml-2"
                title="Delete"
                to={`#`}
                onClick={() => this.handleDelete(val)}
              >
                <DeleteOutlined fontSize="small" color="secondary" />
              </Link>
            </div>
          ),
        },
      },
    ],
    rows: [],
  };

  options = {
    // filterType: "checkbox",
    selectableRows: false,
    responsive: "vertical",
  };

  componentDidMount() {
    API.get(`/promo-codes?lang=${this.state.selectedLang}`).then((response) => {
      let rows = response?.data?.data;
      this.setState({ rows });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedLang !== this.state.selectedLang) {
      API.get(`/promo-codes?lang=${this.state.selectedLang}`).then((response) => {
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
      API.delete(`/promo-codes/${id}?lang=${this.state.selectedLang}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          if (response.status === 200) {
            alert("Promo Code deleted successfully !");
          }
        })
        .then(() => {
          API.get(`/promo-codes?lang=${this.state.selectedLang}`).then((response) => {
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


  render() {
    return (
      <div>
        <Box marginBottom={4}>
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/admin/promo-code/add">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddOutlined />}
              >
                Create Promo Code
              </Button>
            </Link>
            {/* <FormControl
              variant="outlined"
              size="small"
              style={{ width: "20%" }}
            // fullWidth
            >
              <InputLabel id="language">Select Language</InputLabel>
              <Select
                labelId="language"
                id="language"
                name="language"
                value={this.state.selectedLang}
                // onChange={handleInputChange}
                label="Select Language"
                fullWidth
                onChange={this.handleChange}
              >
                <MenuItem value={'en'}>En</MenuItem>
                <MenuItem value={'fr'}>FR</MenuItem>
                <MenuItem value={'de'}>DE</MenuItem>

              </Select>
            </FormControl> */}
          </div>
        </Box>
        <MUIDataTable
          title="Promo codes"
          columns={this.state.columns}
          data={this.state.rows}
          options={this.options}
          loading
        />
      </div>
    );
  }
}

export default VariationsList;
