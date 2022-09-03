import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import API from "langapi/http";
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  AddOutlined,
  DeleteOutlined,
  EditOutlined
} from "@material-ui/icons";

class TagsList extends Component {
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
        name: "_id",
        label: "Actions",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (val) => (
            <div className="d-flex nowrap">
              <Link
                className="ml-2"
                title="Edit"
                to={`/admin/tags/edit/${val}`}
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
    API.get(`/tags`).then((response) => {
      let rows = response?.data;
      this.setState({ rows });
    });
  }

  handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {

      let token = localStorage.getItem("authToken") || ""
      API.delete(`/tags/${id}`, {
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
          API.get(`/tags`).then((response) => {
            let rows = response?.data;
            this.setState({ rows });
          });
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <Box marginBottom={4}>
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/admin/tags/add">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddOutlined />}
              >
                Add Tag
              </Button>
            </Link>
          </div>
        </Box>
        <MUIDataTable
          title="Variations"
          columns={this.state.columns}
          data={this.state.rows}
          options={this.options}
          loading
        />
      </div>
    );
  }
}

export default TagsList;
