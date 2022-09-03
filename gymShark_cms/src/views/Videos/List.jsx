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

class VideoList extends Component {
  state = {
    selectedLang: "en",
    offers: [],
    columns: [
      {
        name: "thumbnail",
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
        name: "title",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "link",
        label: "Link",
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
              {/* <Link
                title="View Details"
                to={`/admin/blogs/${val}?lang=${this.state.selectedLang}`}
              >
                <VisibilityOutlined fontSize="small" color="action" />
              </Link> */}
              <Link
                className="ml-2"
                title="Edit"
                to={`/admin/video/edit/${val}`}
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
    API.get(`/videos?lang=${this.state.selectedLang}`).then((response) => {
      let rows = response.data;
      this.setState({ rows });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedLang !== this.state.selectedLang) {
      API.get(`/videos?lang=${this.state.selectedLang}`).then((response) => {
        let rows = response.data;
        if (this.state.rows != rows) {
          this.setState({ rows });
        }
      });
    }
  }


  handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {
      let token = localStorage.getItem("authToken") || ""
      API.delete(`/videos/${id}?lang=${this.state.selectedLang}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          if (response.status === 200) {
            alert("Video deleted successfully !");
          }
        })
        .then(() => {
          API.get(`/videos?lang=${this.state.selectedLang}`).then((response) => {
            let rows = response.data;
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
            <Link to="/admin/video/add">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddOutlined />}
              >
                Add Video
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
          title="Categories"
          columns={this.state.columns}
          data={this.state.rows}
          options={this.options}
          loading
        />
      </div>
    );
  }
}

export default VideoList;
