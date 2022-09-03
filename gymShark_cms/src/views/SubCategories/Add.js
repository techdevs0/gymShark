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
        sub_title: "",
        description: "",
        featured_image: "",
        route: "",
        parent_id: "",
        seo: {
            meta_title: "",
            meta_description: ""
        }
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
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (id && id != null) {
            setIsEdit(true);
            LangAPI.get(`/sub-categories/${id}`).then((response) => {
                if (response.status === 200) {
                    let data = { ...response?.data };
                    console.log("response?.data?.data", response?.data)
                    // data.route = website_url + data.route;
                    if (response?.data) {
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

        LangAPI.get(`/categories`).then((response) => {
            if (response.status === 200) {

                console.log("response?.data?.data", response?.data)
                setCategories(response?.data);
            }
        });


    }, [selectedLang]);

    const getGalleryImages = () => {
        LangAPI.get(`/files`).then((response) => {
            if (response.status === 200) {
                setImagesData(response.data?.map((x) => ({ ...x, isChecked: false })));
            }
        }).catch(err => console.log(err));
    };

    const handleInputChange = (e) => {
        let updatedRoom = { ...room };
        updatedRoom[e.target.name] = e.target.value;
        setRoom(updatedRoom);
    };
    const handleInputChangeSEO = (e) => {
        let updatedRoom = { ...room };
        if (!updatedRoom.seo) {
            updatedRoom.seo = {
                meta_title: "",
                meta_description: ""
            }
        }
        updatedRoom.seo[e.target.name] = e.target.value;
        setRoom(updatedRoom);
    };

    const handleSlugChange = (e) => {
        let updatedRoom = { ...room };
        let updatedValue = e.target.value.replace(/\s+/g, "-");
        updatedValue = updatedValue.replace(/--/g, "-");
        updatedRoom[e.target.name] = updatedValue.toLowerCase();
        setRoom(updatedRoom);
    };

    const handleImageSelect = (e, index) => {
        if (e.target.checked) {
            if (isSingle && !isBanner && !isAuthorImg) {
                setRoom({ ...room, featured_image: imagesData[index].avatar });
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
                setRoom({ ...room, featured_image: "" });
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
        if (finalRoom.child) {
            delete finalRoom.child;

        }
        if (finalRoom.created_at) {
            delete finalRoom.created_at;
        }
        if (finalRoom.updated_at) {
            delete finalRoom.updated_at;
        }
        // console.log("finalRoom",finalRoom) ;return false
        if (!finalRoom.name || finalRoom.name == "") {
            alert("Please Enter name before Submiting")
            return false;
        }
        if (!finalRoom.sub_title || finalRoom.sub_title == "") {
            alert("Please Enter Sub name before Submiting")
            return false;
        }
        if (!finalRoom.route || finalRoom.route == "") {
            alert("Please Enter route before Submiting")
            return false;
        }



        let token = localStorage.getItem("authToken") || "";

        if (id && id != null) {
            setIsEdit(true);
            LangAPI.put(`/sub-categories/${id}`, finalRoom).then((response) => {
                console.log(response)
                if (response.status === 200) {
                    console.log(response)
                    alert("Sub Ctegory Updated");
                    setRoom({ ...initialObject });
                    props.history.push("/admin/sub-categories");
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            LangAPI.post(`/sub-categories`, finalRoom, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response)
                if (response.status === 200) {
                    console.log(response)
                    alert("Sub Ctegory Added");
                    setRoom({ ...initialObject });
                    props.history.push("/admin/sub-categories");
                }
            }).catch(function (error) {
                console.log(error);
            });
        }


    };

    const handleChange = (event) => {
        if (event.target.value != selectedLang) {
            setSelectedLang(event.target.value)
        }
    };
    const handleChangeCategory = (event) => {
        if (event.target.value != room.parent_id) {
            let updatedRoom = { ...room };
            updatedRoom.parent_id = event.target.value;
            setRoom(updatedRoom);
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
                                <Grid item xs={12} sm={6}>
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
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="route"
                                        name="route"
                                        label="Route"
                                        value={room.route}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleInputChange}
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
                                        <InputLabel id="parent_id"
                                            style={{ color: "" }}
                                        >Select Category</InputLabel>
                                        <Select
                                            labelId="parent_id"
                                            id="parent_id"
                                            name="parent_id"
                                            value={room.parent_id}
                                            label="Select Category"
                                            fullWidth
                                            style={{ color: "" }}
                                            onChange={handleChangeCategory}
                                        >
                                            {categories?.map(item => (
                                                <MenuItem value={item._id}>{item.name}</MenuItem>
                                            ))}


                                            {/* <MenuItem value={'de'}>DE</MenuItem> */}

                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <div className="thumbnail-preview-wrapper img-thumbnail">
                                        {!isEdit ? (
                                            room.featured_image && room.featured_image !== "" ? (
                                                <img src={room.featured_image} alt={room.alt_text || ""} />
                                            ) : (
                                                <img
                                                    src={require("./../../assets/img/placeholder.png")}
                                                    alt=""
                                                />
                                            )
                                        ) : typeof room.featured_image === typeof 0 ? (
                                            // room.thumbnail && room.thumbnail !== "" ?
                                            <img src={room.featured_image} alt={room.alt_text || ""} />
                                        ) : (
                                            <img src={room.featured_image} alt={room.alt_text || ""} />
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
                                                setIsAuthorImg(false);
                                                setIsBanner(false);
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
                            <hr />
                            <h4 style={{ fontWeight: "400" }}>Description</h4>
                            <CKEditor
                                onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                                data={room.description}
                                onChange={(e) =>
                                    setRoom({ ...room, description: e.editor.getData() })
                                }
                            />
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

                    <h4 style={{ fontWeight: "400" }} className="mt-2">
                        SEO Information
                    </h4>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="meta_title"
                                name="meta_title"
                                label="Meta name"
                                value={room?.seo?.meta_title}
                                variant="outlined"
                                fullWidth
                                onChange={handleInputChangeSEO}
                                size="small"
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
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
                        </Grid> */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="meta_description"
                                name="meta_description"
                                label="Meta Description"
                                value={room?.seo?.meta_description}
                                variant="outlined"
                                fullWidth
                                onChange={handleInputChangeSEO}
                                size="small"
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={12}>
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
                        </Grid> */}
                        {/* <Grid item xs={12} sm={6}>
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
                        </Grid> */}
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
