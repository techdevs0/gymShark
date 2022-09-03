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

export default withRouter(function AddCategory(props) {
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const lang = query.get('lang');
    const classes = useStyles();
    let { id } = useParams();

    const initialObject = {
        name: "",
        short_description: "",
        route: "",

        // meta_name: "",
        // meta_description: "",
        // schema_markup: "",
        // route: website_url,
        // inner_route: append_url,
        // is_followed: true,
        // is_indexed: true,
        // is_indexed_or_is_followed: "0,0",
    };
    const [room, setRoom] = useState({ ...initialObject });

    const [isEdit, setIsEdit] = useState(false);

    const [imagesData, setImagesData] = useState([]);
    const [showGallery, setShowGallery] = useState(false);
    const [isSingle, setIsSingle] = useState(false);
    const [isAuthorImg, setIsAuthorImg] = useState(false);
    const [selectedLang, setSelectedLang] = useState(lang || "en");
    const [authorthumbnailPreview, setAuthorThumbnailPreview] = useState("");
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [isBanner, setIsBanner] = useState(false);
    const [bannerThumbnailPreview, setBannerThumbnailPreview] = useState("");

    useEffect(() => {
        if (id && id != null) {
            setIsEdit(true);
            LangAPI.get(`/blogs/${id}?lang=${selectedLang}`).then((response) => {
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
        // if (e.target.name === "name" && !isEdit) {
        //     let updatedValue = e.target.value.replace(/\s+/g, "-");
        //     updatedValue = updatedValue.replace(/--/g, "-");
        //     updatedRoom["route"] = website_url + updatedValue.toLowerCase();
        // }
        setRoom(updatedRoom);
    };

    const handleSlugChange = (e) => {
        let updatedRoom = { ...room };
        let updatedValue = e.target.value.replace(/\s+/g, "-");
        updatedValue = updatedValue.replace(/--/g, "-");
        updatedRoom[e.target.name] = updatedValue.toLowerCase();
        setRoom(updatedRoom);
    };

    // const handleRouteChange = (e) => {
    //     let updatedRoom = { ...room };
    //     let splitValues = e.target.value.split(website_url);
    //     let updatedValue = splitValues[1]
    //         ? splitValues[1].replace(/\s+/g, "-")
    //         : "";
    //     updatedValue = updatedValue.replace(/--/g, "-");
    //     updatedRoom[e.target.name] = website_url + updatedValue.toLowerCase();
    //     setRoom(updatedRoom);
    // };

    const handleImageSelect = (e, index) => {
        if (e.target.checked) {
            if (isSingle && !isBanner && !isAuthorImg) {
                setRoom({ ...room, img: imagesData[index].avatar });
                setThumbnailPreview(imagesData[index].avatar);
                setTimeout(() => {
                    setShowGallery(false);
                }, 500);
            }
            else if (isBanner && !isSingle && !isAuthorImg) {
                setRoom({ ...room, banner_img: imagesData[index].avatar });
                setBannerThumbnailPreview(imagesData[index].avatar);
                setTimeout(() => {
                    setShowGallery(false);
                }, 500);
            }
            else if (isAuthorImg && !isSingle && !isBanner) {
                setRoom({ ...room, author_img: imagesData[index].avatar });
                setAuthorThumbnailPreview(imagesData[index].avatar);
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
            if (isSingle && !isBanner && !isAuthorImg) {
                setRoom({ ...room, img: "" });
                setThumbnailPreview("");
            }
            else if (isBanner && !isSingle && !isAuthorImg) {
                setRoom({ ...room, banner_img: "" });
                setBannerThumbnailPreview("");
            }
            else if (isAuthorImg && !isSingle && !isBanner) {
                setRoom({ ...room, author_img: "" });
                setAuthorThumbnailPreview("");
            }
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

    const handleSubmit = () => {
        let finalRoom = room;
        console.log("finalRoom",finalRoom) ;return false
        if (!finalRoom.name || finalRoom.name == "") {
            alert("Please Enter Name before Submiting")
            return false;
        }
        if (!finalRoom.route || finalRoom.route == "") {
            alert("Please Enter route before Submiting")
            return false;
        }
        if (!finalRoom.short_description || finalRoom.short_description == "") {
            alert("Please Enter Short Description before Submiting")
            return false;
        }

        LangAPI.post(`/blogs?lang=${selectedLang}`, finalRoom).then((response) => {
            if (response.status === 200) {
                alert("Blog Added");
                setRoom({ ...initialObject });
                props.history.push("/admin/categories");
            }
        });
    };

    const handleChange = (event) => {
        if (event.target.value != selectedLang) {
            setSelectedLang(event.target.value)
        }
    };
    return (
        <div className={classes.root}>
            <Card>
                <CardHeader color="primary" className="d-flex justify-content-between align-items-center">
                    {/* <div className="d-flex justify-content-between align-items-center"> */}
                    <h4 style={{ fontWeight: "400" }} className="mb-0">
                        Add Category
                    </h4>
                    <FormControl
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
                    </FormControl>
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
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="route"
                                        name="route"
                                        label="route"
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
                        <Grid item xs={12} sm={12}>
                            <hr />
                            <h4 style={{ fontWeight: "400" }}>Short Description</h4>
                            <CKEditor
                                onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                                data={room.short_description}
                                onChange={(e) =>
                                    setRoom({ ...room, short_description: e.editor.getData() })
                                }
                            />
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
