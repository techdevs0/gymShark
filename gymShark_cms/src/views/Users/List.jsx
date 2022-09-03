import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import API from "langapi/http";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { Link } from "react-router-dom";
import {
  AddOutlined,
  DeleteOutlined,
  EditOutlined,
  VisibilityOutlined,
} from "@material-ui/icons";
import UserDetailsModal from "./UserDetailsModal";
import { Avatar, Box, Button } from "@material-ui/core";

class UsersList extends Component {
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
        name: "name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "email",
        label: "Email",
        options: {
          filter: true,
          sort: true,
        },
        customBodyRender: (val) => (
          <code>{val?.name || ""}</code>
        ),
      },
      {
        name: "mobile",
        label: "Mobile",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "area",
        label: "Area",
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
                onClick={() => this.setState({show:true})}
                // title="Edit"
                // to={`/admin/variations/edit/${val}?lang=${this.state.selectedLang}`}
              >
                <VisibilityOutlined fontSize="small" color="primary" />
              </Button>
              
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
      }
    ],
    rows: [],
    date: "",
    dateFrom:"",
    dateTo:"",
    show:false
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
    // API.get(`/users?lang=${this.state.selectedLang}`).then((response) => {
    //   let rows = response?.data?.data;
    //   this.setState({ rows });
    // }).catch(err => console.log(err));

    this.setState({rows:[{name:"ali",email:"eee@gm.com"}]})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedLang !== this.state.selectedLang) {
      API.get(`/users?lang=${this.state.selectedLang}`).then((response) => {
        let rows = response?.data?.data;
        if(this.state.rows != rows){
            this.setState({ rows });
        }
      }).catch(err => console.log(err));
    }
  }
  

  handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {

      let token =  localStorage.getItem("authToken") || ""
      API.delete(`/variations/${id}?lang=${this.state.selectedLang}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }})
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

  render() {
    return (
      <div>
        <UserDetailsModal show={this.state.show}
        onHide={() => {
          this.setState({ show: false });
        }}
        review={this.state.selectReview}
        />

        <MUIDataTable
          title="Users"
          columns={this.state.columns}
          data={this.state.rows}
          options={this.options}
          loading

        />
      </div>
    );
  }
}

export default UsersList;
