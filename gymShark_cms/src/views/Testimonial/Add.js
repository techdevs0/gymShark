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
import { ckEditorConfig } from "utils/data";
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

export default withRouter(function AddTestimonial(props) {
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const lang = query.get('lang');
    const classes = useStyles();
    let { id } = useParams();

    const initialObject = {
        name: "",
        designation: "",
        img: "",
        review: ""
    };

    const [testimonial, setTestimonial] = useState({ ...initialObject });
    const [isEdit, setIsEdit] = useState(false);
    const [imagesData, setImagesData] = useState([]);
    const [showGallery, setShowGallery] = useState(false);
    const [isSingle, setIsSingle] = useState(false);

    useEffect(() => {
        if (id && id != null) {
            setIsEdit(true);
            LangAPI.get(`/testimonials/${id}`).then((response) => {
                if (response.status === 200) {
                    let data = { ...response?.data };
                    if (response?.data) {
                        setTestimonial({ ...testimonial, ...data });
                    } else {
                        setTestimonial({ ...initialObject });
                    }
                }
            });
        }
        if (!imagesData.length > 0) {
            getGalleryImages();
        }

    }, []);

    const getGalleryImages = () => {
        LangAPI.get(`/uploads`).then((response) => {
            if (response.status === 200) {
                setImagesData(response.data?.data?.map((x) => ({ ...x, isChecked: false })));
            }
        }).catch(err => console.log(err));
    };

    const handleInputChange = (e) => {
        let updatedRoom = { ...testimonial };
        updatedRoom[e.target.name] = e.target.value;
        setTestimonial(updatedRoom);
    };

    const handleEditorValue = (e, obj) => {
        let upTerm = { ...testimonial }
        upTerm[obj] = e.editor.getData()
        setTestimonial(upTerm)
    }

    const handleImageSelect = (e, index) => {
        if (e.target.checked) {
            if (isSingle) {
                setTestimonial({ ...testimonial, img: imagesData[index].avatar });
                setTimeout(() => {
                    setShowGallery(false);
                }, 500);
            }
        }
    };

    const handleSubmit = () => {
        let finalRoom = testimonial;
        if (finalRoom.child) {
            delete finalRoom.child;
        }
        if (finalRoom.created_at) {
            delete finalRoom.created_at;
        }
        if (finalRoom.updated_at) {
            delete finalRoom.updated_at;
        }
        if (!finalRoom.name || finalRoom.name == "") {
            alert("Please Enter name before Submiting")
            return false;
        }
        if (!finalRoom.designation || finalRoom.designation == "") {
            alert("Please Enter Designation before Submiting")
            return false;
        }
        if (!finalRoom.img || finalRoom.img == "") {
            alert("Please Select Featured Image before Submiting")
            return false;
        }
        if (!finalRoom.review || finalRoom.review == "") {
            alert("Please Enter Review before Submiting")
            return false;
        }

        let token = localStorage.getItem("authToken") || ""
        LangAPI.post(`/testimonials`, finalRoom, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log(response)
                alert("Record Added");
                setTestimonial({ ...initialObject });
                props.history.push("/admin/testimonial");
            }
        }).catch(function (error) {
            console.log(error);
        });
    };

    return (
        <div className={classes.root}>
            <Card>
                <CardHeader color="primary" className="d-flex justify-content-between align-items-center">
                    {/* <div className="d-flex justify-content-between align-items-center"> */}
                    <h4 style={{ fontWeight: "400" }} className="mb-0">
                        Add Testimonial
                    </h4>
                    {/* <FormControl
                        variant="outlined"
                        size="small"
                        style={{ width: "20%", color: "white" }}
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
                                        value={testimonial.name}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleInputChange}
                                        size="small"
                                        helperText={''}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="designation"
                                        name="designation"
                                        label="designation"
                                        value={testimonial.designation}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleInputChange}
                                        size="small"
                                        helperText={''}
                                    />
                                </Grid>
                                <Grid xs={12} sm={12}>
                                    {/* <p>Review</p> */}
                                    <h4 style={{ fontWeight: "400" }} className="mt-3">
                                        Review
                                    </h4>
                                    <CKEditor
                                        config={ckEditorConfig}
                                        onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                                        data={testimonial?.review}
                                        onChange={(e) => handleEditorValue(e, 'review')} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div className="thumbnail-preview-wrapper img-thumbnail">
                                        {!isEdit ? (
                                            testimonial?.img && testimonial?.img !== "" ? (
                                                <img src={testimonial?.img} alt={testimonial?.alt_text || ""} />
                                            ) : (
                                                <img
                                                    src={require("./../../assets/img/placeholder.png")}
                                                    alt=""
                                                />
                                            )
                                        ) : typeof testimonial?.img === typeof 0 ? (
                                            <img src={testimonial?.img} alt={testimonial?.alt_text || ""} />
                                        ) : (
                                            <img src={testimonial?.img} alt={testimonial?.alt_text || ""} />
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
                                            {isEdit ? "Change" : "Upload"} Featured Image
                                        </MaterialButton>
                                    </Fragment>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Grid container spacing={2}>

                            </Grid>
                        </Grid>

                        <div className="clearfix clear-fix"></div>
                        {/* GALLERY DIALOG BOX START */}

                        <GalleryDialog
                            open={showGallery} handleImageSelect={handleImageSelect} handleClose={() => {
                                setShowGallery(false);
                            }}
                            refreshGallery={getGalleryImages}
                            data={imagesData} />
                        {/* GALLERY DIALOG BOX END */}
                    </Grid>
                    <hr />

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
