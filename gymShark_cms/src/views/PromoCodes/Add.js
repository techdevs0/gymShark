import React, { Fragment, useEffect, useState } from "react"; //Suspense
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import MaterialButton from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { FormControl, MenuItem, Select, TextField, } from "@material-ui/core";
import CKEditor from "ckeditor4-react";
import { Image } from "@material-ui/icons";
import LangAPI from "langapi/http";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

import { useParams, withRouter, useLocation } from "react-router-dom";
import GalleryDialog from "views/Common/GalleryDialog";


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

export default withRouter(function AddPromoCode(props) {
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const lang = query.get('lang');
    const classes = useStyles();
    let { id } = useParams();

    const initialObject = {
        name: "",
        value: "",
        usage: "",
        usage_per_person: "",
        start_date: "",
        end_date: "",

    };
    const [room, setRoom] = useState({ ...initialObject });
    const [isEdit, setIsEdit] = useState(false);
    const [imagesData, setImagesData] = useState([]);
    const [selectedLang, setSelectedLang] = useState(lang || "en");
    const [dateVals, setdateVals] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        if (id && id != null) {
            setIsEdit(true);
            LangAPI.get(`/variations/${id}?lang=${selectedLang}`).then((response) => {
                if (response.status === 200) {
                    let data = { ...response?.data?.data };
                    console.log("response?.data?.data", response?.data?.data)
                    // data.route = website_url + data.route;
                    if (response?.data?.data) {
                        setRoom({ ...room, ...data });
                    } else {
                        setRoom({ ...initialObject });
                    }
                }
            });
        }
        if (!imagesData.length > 0) {
            getGalleryImages();
        }
    }, [selectedLang]);

    const getGalleryImages = () => {
        LangAPI.get(`/uploads`).then((response) => {
            if (response.status === 200) {
                setImagesData(response.data?.data?.map((x) => ({ ...x, isChecked: false })));
            }
        }).catch(err => console.log(err));
    };

    const handleInputChange = (e) => {
        let updatedRoom = { ...room };
        updatedRoom[e.target.name] = e.target.value;
        setRoom(updatedRoom);
        console.log(room)
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
        if (!finalRoom.value || finalRoom.value == "") {
            alert("Please Enter Discount in % before Submiting")
            return false;
        }
        if (!finalRoom.usage || finalRoom.usage == "") {
            alert("Please Enter Usage in Total before Submiting")
            return false;
        }
        if (!finalRoom.usage_per_person || finalRoom.usage_per_person == "") {
            alert("Please Enter usage per person before Submiting")
            return false;
        }

        let token = localStorage.getItem("authToken") || ""
        LangAPI.post(`/promo-codes?lang=${selectedLang}`, finalRoom, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                alert("Promo Codes Added");
                setRoom({ ...initialObject });
                props.history.push("/admin/promo-codes");
            }
        });
    };

    const onSelect = (dateValue, states) => {
        if (dateValue.length > 1) {
            console.log(dateValue[0].getMonth() + 1)
            let formMonth = dateValue[0].getMonth() + 1
            let toMonth = dateValue[1].getMonth() + 1
            let from = dateValue[0].getFullYear() + "-" + formMonth + "-" + dateValue[0].getDate()
            let to = dateValue[1].getFullYear() + "-" + toMonth + "-" + dateValue[1].getDate()
            setRoom({ ...room, start_date: from, end_date: to })

        }
    };

    return (
        <div className={classes.root}>
            <Card>
                <CardHeader color="primary" className="d-flex justify-content-between align-items-center">
                    {/* <div className="d-flex justify-content-between align-items-center"> */}
                    <h4 style={{ fontWeight: "400" }} className="mb-0">
                        Add Promo Code
                    </h4>
                    {/* <FormControl
                        variant="outlined"
                        size="small"
                        style={{ width: "20%", color: "white" }}
                    // fullWidth
                    >
                        <InputLabel id="language"
                            style={{ color: "white" }}
                        >Select Language</InputLabel>
                        <Select
                            labelId="language"
                            id="language"
                            name="language"
                            value={selectedLang}
                            label="Select Language"
                            fullWidth
                            style={{ color: "white" }}
                            onChange={handleChange}
                        >
                            <MenuItem value={'en'}>En</MenuItem>
                            <MenuItem value={'fr'}>FR</MenuItem>
                            <MenuItem value={'de'}>DE</MenuItem>

                        </Select>
                    </FormControl> */}
                    {/* </div> */}

                </CardHeader>
                <CardBody>
                    <h4 style={{ fontWeight: "400" }} className="mt-3">
                        General Information
                    </h4>
                    <Grid container spacing={2} style={{ display: "flex" }}>
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
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
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="value"
                                        name="value"
                                        label="Discount in % *"
                                        value={room.value}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleInputChange}
                                        size="small"
                                        helperText={''}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="usage"
                                        name="usage"
                                        label="Usage in Total *"
                                        value={room.usage}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleSlugChange}
                                        size="small"
                                        helperText={''}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="usage_per_person"
                                        name="usage_per_person"
                                        label="Usage Per Person *"
                                        value={room.usage_per_person}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleSlugChange}
                                        size="small"
                                        helperText={''}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <Flatpickr className="dateRangeForPromo"
                                        value={date}
                                        mode="range"
                                        options={{
                                            dateFormat: "Y-m-d",
                                            mode: "range"
                                        }}
                                        onChange={(date) => {
                                            onSelect(date)
                                            setDate(date);
                                        }}
                                        placeholder={"Select Date Here"}
                                    />

                                </Grid>
                            </Grid>
                        </Grid>
                        {/* <Grid item xs={12} sm={12}>
                            <hr />
                            <h4 style={{ fontWeight: "400" }}>Short Description</h4>
                            <CKEditor
                                onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                                data={room.short_description}
                                onChange={(e) =>
                                    setRoom({ ...room, short_description: e.editor.getData() })
                                }
                            />
                        </Grid> */}
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
