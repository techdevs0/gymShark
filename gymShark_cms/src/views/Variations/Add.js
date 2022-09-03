import React, { Fragment, useEffect, useState } from "react"; //Suspense
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import MaterialButton from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { FormControl, MenuItem, Select, TextField, } from "@material-ui/core";
import LangAPI from "langapi/http";
import { useParams, withRouter, useLocation } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

export default withRouter(function AddVariation(props) {
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const lang = query.get('lang');
    const classes = useStyles();
    let { id } = useParams();

    const initialObject = {
        name: "",
        route: ""
    };
    const [room, setRoom] = useState({ ...initialObject });
    const [selectedLang, setSelectedLang] = useState(lang || "en");

    useEffect(() => {
        if (id && id != null) {
            LangAPI.get(`/variations-values/${id}`).then((response) => {
                if (response.status === 200) {
                    let data = { ...response?.data};
                    if (response?.data) {
                        setRoom({ ...room, ...data });
                    } else {
                        setRoom({ ...initialObject });
                    }
                }
            });
        }
    }, []);

    const handleInputChange = (e) => {
        let updatedRoom = { ...room };
        updatedRoom[e.target.name] = e.target.value;
        setRoom(updatedRoom);
    };

    const handleSlugChange = (e) => {
        let updatedRoom = { ...room };
        let updatedValue = e.target.value.replace(/\s+/g, "-");
        updatedValue = updatedValue.replace(/--/g, "-");
        updatedRoom[e.target.name] = updatedValue.toLowerCase();
        setRoom(updatedRoom);
    };

    const handleSubmit = () => {
        let finalRoom = room;
        if (!finalRoom.name || finalRoom.name == "") {
            alert("Please Enter Name before Submiting")
            return false;
        }
        if (!finalRoom.route || finalRoom.route == "") {
            alert("Please Enter Route before Submiting")
            return false;
        }
        
        let token =  localStorage.getItem("authToken") || "";

        if (id && id != null) {
            LangAPI.put(`/variations-values/${id}`, finalRoom).then((response) => {
                if (response.status === 200) {
                    alert("Variation Value Updated");
                    setRoom({ ...initialObject });
                    props.history.push("/admin/variations");
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            LangAPI.post(`/variations-values`, finalRoom, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }}).then((response) => {
                if (response.status === 200) {
                    alert("Variation Value");
                    setRoom({ ...initialObject });
                    props.history.push("/admin/variations");
                }
            });
        }
    };

    return (
        <div className={classes.root}>
            <Card>
                <CardHeader color="primary" className="d-flex justify-content-between align-items-center">
                    {/* <div className="d-flex justify-content-between align-items-center"> */}
                    <h4 style={{ fontWeight: "400" }} className="mb-0">
                        Add Variation
                    </h4>
                </CardHeader>
                <CardBody>
                    <h4 style={{ fontWeight: "400" }} className="mt-3">
                        General Information
                    </h4>
                    <Grid container spacing={2} style={{ display: "flex" }}>
                        <Grid item xs={12} sm={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="name"
                                        name="name"
                                        label="Name"
                                        value={room.name}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleInputChange}
                                        size="small"
                                        helperText={''}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="route"
                                        name="route"
                                        label="Route *"
                                        value={room.route}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleSlugChange}
                                        size="small"
                                        helperText={''}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <div className="clearfix clear-fix"></div>
                    <hr />
                    </Grid>
                </CardBody>
            </Card>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <MaterialButton
                        onClick={handleSubmit}
                        style={{ float: "right" }}
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Submit
                    </MaterialButton>
                </Grid>
            </Grid>
        </div>
    );
});
