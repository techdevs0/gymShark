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

class ProductList extends Component {
  state = {
    selectedLang: "en",
    offers: [],
    columns: [
      {
        name: "featured_image",
        label: "Image",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (val, row) => (
            <Avatar
              alt={row.tableData[row.rowIndex][1]?.toUpperCase()}
              src={val}
            ></Avatar>
          ),
        },
      },
      {
        name: "name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "short_description",
        label: "Description",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (val) => (
            <code>{val?.length > 100 ? val?.substr(0, 100) + "..." : val}</code>
          ),
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
              {/* <Link
                title="View Details"
                to={`/admin/products/${val}?lang=${this.state.selectedLang}`}
              >
                <VisibilityOutlined fontSize="small" color="action" />
              </Link> */}
              <Link
                className="ml-2"
                title="Edit"
                to={`/admin/products/edit/${val}`}
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
    filterType: "checkbox",
    responsive: "vertical",
  };

  componentDidMount() {
    API.get(`/products?lang=${this.state.selectedLang}`).then((response) => {
      let rows = response.data;
      this.setState({ rows });
    }).catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedLang !== this.state.selectedLang) {
      API.get(`/products?lang=${this.state.selectedLang}`).then((response) => {
        let rows = response.data;
        if (this.state.rows != rows) {
          this.setState({ rows });
        }
      }).catch(err => console.log(err));
    }
  }

  handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {
      let token = localStorage.getItem("authToken") || ""
      API.delete(`/products/${id}?lang=${this.state.selectedLang}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          if (response.status === 200) {
            alert("Product deleted successfully!");
          }
        })
        .then(() => {
          API.get(`/products?lang=${this.state.selectedLang}`).then((response) => {
            let rows = response.data;
            this.setState({ rows });
          });
        })
        .catch((err) => console.log(err));
    }
  };

  // handleDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete this ?")) {
  //     API.delete(`/products/${id}?lang=${this.state.selectedLang}`)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           alert("Blog deleted successfully !");
  //         }
  //       })
  //       .then(() => {
  //         API.get(`/products?lang=${this.state.selectedLang}`).then((response) => {
  //           let rows = response.data;
  //           this.setState({ rows });
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  handleChange = (event) => {
    // setAge(event.target.value as string);
    if (event.target.value != this.state.selectedLang) {
      this.setState({ selectedLang: event.target.value })
    }
  };


  render() {
    return (
      <div>
        <Box marginBottom={4}>
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/admin/products/add">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddOutlined />}
              >
                Add Product
              </Button>
            </Link>
            {/* <FormControl
              variant="outlined"
              size="small"
              style={{ width: "20%" }}
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
          title="Products"
          columns={this.state.columns}
          data={this.state.rows}
          options={this.options}
          loading
        />
      </div>
    );
  }
}

export default ProductList;
