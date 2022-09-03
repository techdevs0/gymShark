import React, { Fragment, useEffect, useState } from "react"; //Suspense
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import MaterialButton from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, } from "@material-ui/core";
import CKEditor from "ckeditor4-react";
import { Image } from "@material-ui/icons";
import LangAPI from "langapi/http";

import { useParams, withRouter, useLocation } from "react-router-dom";
import GalleryDialog from "views/Common/GalleryDialog";

const website_url = "https://fishermanscove-resort.com/blog-inner/";
const append_url = "blog-inner";

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

export default withRouter(function AddSubCategory(props) {
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const lang = query.get('lang');
    const classes = useStyles();
    let { id } = useParams();

    const initialObject = {
        name: "",
        route: "",
        variation_id: "",
        type: 1,
        type_value: ""
    };
    const [room, setRoom] = useState({ ...initialObject });
    const [showGallery, setShowGallery] = useState(false);
    const [isSingle, setIsSingle] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedLang, setSelectedLang] = useState(lang || "en");
    const [veriations, setVeriations] = useState([]);
    const [imagesData, setImagesData] = useState([]);

    useEffect(() => {
        if (id && id != null) {
            setIsEdit(true);
            LangAPI.get(`/variation_values/${id}?lang=${selectedLang}`).then((response) => {
                if (response.status === 200) {
                    let data = { ...response?.data?.data };
                    console.log("response?.data?.data", response?.data)
                    // data.route = website_url + data.route;
                    if (response?.data?.data) {
                        setRoom({ ...room, ...data });
                    } else {
                        setRoom({ ...initialObject });
                    }
                }
            });
        }

        getVeriations();
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

    const handleImageSelect = (e, index) => {
        console.log(`Image:: `, imagesData[index].avatar)
        if (e.target.checked) {
            if (isSingle) { 
                setRoom({ ...room, type_value: imagesData[index].avatar });
                // console.log()
                setTimeout(() => {
                    setShowGallery(false);
                }, 500);
            }
            let imagesDataUpdated = imagesData.map((x, i) => {
                if (i === index) {
                    return {
                        ...x,
                        isChecked: true,
                    };
                } else {
                    return x;
                }
            });
            setImagesData(imagesDataUpdated);
            // }
        } else {
            // if (isSingle) {
            //     setRoom({ ...initialObject, type_value: "" });
            //     setThumbnailPreview("");
            // }
            setImagesData(
                imagesData.map((x, i) => {
                    if (i === index) {
                        return {
                            ...x,
                            isChecked: false,
                        };
                    } else {
                        return x;
                    }
                })
            );
        }
    };

    const getVeriations = () => {
        LangAPI.get(`/variations`).then((response) => {
            if (response.status === 200) {
                setVeriations(response.data);
            }
        });
    };

    const handleInputChange = (e) => {
        let updatedRoom = { ...room };
        updatedRoom[e.target.name] = e.target.value;
        setRoom(updatedRoom);
    };
    // const handleTypeValueChange = (e) => {
    //     let updatedRoom = { ...room };
    //     updatedRoom[e.target.name] = e.target.value;
    //     setRoom(updatedRoom);
    // };

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
            alert("Please Enter name before Submiting")
            return false;
        }
        if (!finalRoom.route || finalRoom.route == "") {
            alert("Please Enter Route before Submiting")
            return false;
        }
        if (!finalRoom.variation_id || finalRoom.variation_id == "") {
            alert("Please Select Variation before Submiting")
            return false;
        }
        if (!finalRoom.type_value || finalRoom.type_value == "") {
            alert("Please Enter Type Value before Submiting")
            return false;
        }

        let token = localStorage.getItem("authToken") || ""

        LangAPI.post(`/variation_values?lang=${selectedLang}`, finalRoom, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                alert("Variation Value Added");
                setRoom({ ...initialObject });
                props.history.push("/admin/variation-values");
            }
        });
    };

    const handleChangeCategory = (event) => {
        if (event.target.value != room.variation_id) {
            let updatedRoom = { ...room };
            updatedRoom.variation_id = event.target.value;
            setRoom(updatedRoom);
        }
    };
    const handleChangeType = (event) => {
        if (event.target.value != room.type) {
            let updatedRoom = { ...room };
            updatedRoom.type = event.target.value;
            updatedRoom.type_value = "";
            setRoom(updatedRoom);
        }
    };
    return (
        <div className={classes.root}>
            <Card>
                <CardHeader color="primary" className="d-flex justify-content-between align-items-center">
                    {/* <div className="d-flex justify-content-between align-items-center"> */}
                    <h4 style={{ fontWeight: "400" }} className="mb-0">
                        Add Variation Item
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
                                {/* <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="sub_title"
                                        name="sub_title"
                                        label="Sub_Title"
                                        value={room.sub_title}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleInputChange}
                                        size="small"
                                        helperText={''}
                                    />
                                </Grid> */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="route"
                                        name="route"
                                        label="Route"
                                        value={room.route}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleSlugChange}
                                        size="small"
                                        helperText={''}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        variant="outlined"
                                        size="small"
                                        style={{ width: "100%", color: "" }}
                                    // fullWidth
                                    >
                                        <InputLabel id="Variation_id"
                                            style={{ color: "" }}
                                        >Select Type</InputLabel>
                                        <Select
                                            labelId="Variation"
                                            id="Variation"
                                            name="type"
                                            value={room.type}
                                            label="Select Type"
                                            fullWidth
                                            style={{ color: "" }}
                                            onChange={handleChangeType}
                                        >
                                            <MenuItem value={'1'}>Plain Text</MenuItem>
                                            <MenuItem value={'2'}>Text With Color Code</MenuItem>
                                            <MenuItem value={'3'}>Text With Image</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        variant="outlined"
                                        size="small"
                                        style={{ width: "100%", color: "" }}
                                    // fullWidth
                                    >
                                        <InputLabel id="Variation_id"
                                            style={{ color: "" }}
                                        >Select Variation</InputLabel>
                                        <Select
                                            labelId="Variation"
                                            id="Variation"
                                            name="variation_id"
                                            value={room.variation_id}
                                            label="Select Variation"
                                            fullWidth
                                            style={{ color: "" }}
                                            onChange={handleChangeCategory}
                                        >
                                            {veriations?.map((veriation) => (
                                                <MenuItem value={veriation.id}>{veriation.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        {room.type == 3 ?
                            <Grid item xs={12} sm={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <div className="thumbnail-preview-wrapper img-thumbnail">
                                            {!isEdit ? (room.type_value && room.type_value !== "" ? (
                                                <img src={room.type_value} alt={room.alt_text || ""} />
                                            ) : (
                                                <img
                                                    src={require("./../../assets/img/placeholder.png")}
                                                    alt=""
                                                />
                                            )
                                            ) : typeof room.type_value === typeof 0 ? (
                                                // room.thumbnail && room.thumbnail !== "" ?
                                                <img src={room.type_value} alt={room.alt_text || ""} />
                                            ) : (
                                                <img src={room.type_value} alt={room.alt_text || ""} />
                                            )}
                                        </div>
                                        <Fragment>
                                            <MaterialButton
                                                variant="outlined"
                                                color="primary"
                                                startIcon={<Image />}
                                                className="mt-1"
                                                fullWidth
                                                onClick={() => {
                                                    setIsSingle(true);
                                                    setShowGallery(true);
                                                }}
                                            >
                                                Upload Image
                                            </MaterialButton>
                                        </Fragment>
                                    </Grid>
                                </Grid>
                            </Grid>
                            :
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="type_value"
                                    name="type_value"
                                    label="type value"
                                    value={room.type_value}
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleInputChange}
                                    size="small"
                                    helperText={''}
                                />
                            </Grid>
                        }
                        <div className="clearfix clear-fix"></div>
                    </Grid>
                    {/* GALLERY DIALOG BOX START */}

                    <GalleryDialog
                        open={showGallery} handleImageSelect={handleImageSelect} handleClose={() => {
                            setShowGallery(false);
                        }}
                        refreshGallery={getGalleryImages}
                        data={imagesData} />
                    {/* GALLERY DIALOG BOX END */}
                    <hr />

                    {/* <h4 style={{ fontWeight: "400" }} className="mt-2">
                        SEO Information
                    </h4>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="meta_title"
                                name="meta_title"
                                label="Meta name"
                                value={room.meta_title}
                                variant="outlined"
                                fullWidth
                                onChange={handleInputChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="route"
                                name="route"
                                label="Permalink"
                                value={room.route}
                                variant="outlined"
                                fullWidth
                                onChange={handleRouteChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="meta_description"
                                name="meta_description"
                                label="Meta Description"
                                value={room.meta_description}
                                variant="outlined"
                                fullWidth
                                onChange={handleInputChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="schema_markup"
                                name="schema_markup"
                                label="Schema Markup"
                                value={room.schema_markup}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                rowsMax={4}
                                onChange={handleInputChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="is_followed"
                                    row
                                    defaultChecked
                                    name="is_followed"
                                    value={room.is_followed}
                                    onChange={(e) => {
                                        setRoom({ ...room, is_followed: !room.is_followed });
                                    }}
                                >
                                    <FormControlLabel
                                        value={true}
                                        control={<Radio />}
                                        label="Follow"
                                    />
                                    <FormControlLabel
                                        value={false}
                                        control={<Radio />}
                                        label="No Follow"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="is_indexed"
                                    row
                                    defaultChecked
                                    name="is_indexed"
                                    value={room.is_indexed}
                                    onChange={(e) => {
                                        setRoom({ ...room, is_indexed: !room.is_indexed });
                                    }}
                                >
                                    <FormControlLabel
                                        value={true}
                                        control={<Radio />}
                                        label="Index"
                                    />
                                    <FormControlLabel
                                        value={false}
                                        control={<Radio />}
                                        label="No Index"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid> */}
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
