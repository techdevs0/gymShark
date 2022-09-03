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
import CreatableSelect from "react-select/creatable";
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

export default withRouter(function AddRoom(props) {
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const lang = query.get('lang');
    const classes = useStyles();
    let { id } = useParams();

    const initialObject = {
        title: "",
        description: "",
        short_description: "",
        featured_img: "",
        banner_img: "",
        sub_title: "",
        route: "",
        tags: [],
        seo: {
            meta_title: "",
            meta_description: "",
            schema_markup: "",
            // is_followed: true,
            // is_indexed: true,
            // is_indexed_or_is_followed: "0,0",
        },
    };
    const tagsList = [
        {
            value: "photography",
            label: "Photography",
        },
        {
            value: "style",
            label: "Style",
        },
    ];
    const [room, setRoom] = useState({ ...initialObject });
    const [isEdit, setIsEdit] = useState(false);
    const [imagesData, setImagesData] = useState([]);
    const [showGallery, setShowGallery] = useState(false);
    const [isSingle, setIsSingle] = useState(false);
    const [selectedLang, setSelectedLang] = useState(lang || "en");
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [isBanner, setIsBanner] = useState(false);
    const [bannerThumbnailPreview, setBannerThumbnailPreview] = useState("");

    useEffect(() => {
        if (id && id != null) {
            setIsEdit(true);
            LangAPI.get(`/blogs/${id}`).then((response) => {
                if (response.status === 200) {
                    let data = { ...response?.data };
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
    }, []);

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
    };
    const handleSEOInputChange = (e) => {
        let updatedRoom = { ...room };
        updatedRoom.seo[e.target.name] = e.target.value;
        setRoom(updatedRoom);
    };

    const handlerouteChange = (e) => {
        let updatedRoom = { ...room };
        let updatedValue = e.target.value.replace(/\s+/g, "-");
        updatedValue = updatedValue.replace(/--/g, "-");
        updatedRoom[e.target.name] = updatedValue.toLowerCase();
        setRoom(updatedRoom);
    };

    const handleImageSelect = (e, index) => {
        if (e.target.checked) {
            if (isSingle && !isBanner) {
                setRoom({ ...room, featured_img: imagesData[index].avatar });
                setThumbnailPreview(imagesData[index].avatar);
                setTimeout(() => {
                    setShowGallery(false);
                }, 500);
            }
            else if (isBanner && !isSingle) {
                setRoom({ ...room, banner_img: imagesData[index].avatar });
                setBannerThumbnailPreview(imagesData[index].avatar);
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
            if (isSingle && !isBanner) {
                setRoom({ ...room, img: "" });
                setThumbnailPreview("");
            }
            else if (isBanner && !isSingle) {
                setRoom({ ...room, banner_img: "" });
                setBannerThumbnailPreview("");
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

    const handleTagsSelect = (
        newValue: OnChangeValue<tagsList, true>,
        actionMeta: ActionMeta<tagsList>
    ) => {
        let updateValues = { ...room };

        updateValues.tags = newValue;

        setRoom(updateValues)

    };

    const handleSubmit = () => {
        let finalRoom = room;
        console.log("finalRoom", finalRoom)
        if (!finalRoom.title || finalRoom.title == "") {
            alert("Please Enter Name before Submiting")
            return false;
        }
        if (!finalRoom.route || finalRoom.route == "") {
            alert("Please Enter route before Submiting")
            return false;
        }
        if (!finalRoom.featured_img || finalRoom.featured_img == "") {
            alert("Please Select Featured Image before Submiting")
            return false;
        }
        if (!finalRoom.banner_img || finalRoom.banner_img == "") {
            alert("Please Select Banner Image before Submiting")
            return false;
        }
        if (!finalRoom.short_description || finalRoom.short_description == "") {
            alert("Please Enter Short Description before Submiting")
            return false;
        }
        if (!finalRoom.description || finalRoom.description == "") {
            alert("Please Enter Description before Submiting")
            return false;
        }

        let token = localStorage.getItem("authToken") || ""
        LangAPI.post(`/blogs`, finalRoom, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log(response)
                alert("Blog Added");
                setRoom({ ...initialObject });
                props.history.push("/admin/blogs");
            }
        }).catch(function (error) {
            console.log(error);
        });

        // if (isEdit) {
        //     LangAPI.post(`/blogs`, finalRoom).then((response) => {
        //         if (response.status === 200) {
        //             alert("Blog Updated");
        //             setRoom({ ...initialObject });
        //             props.history.push("/admin/blogs");
        //         }
        //     });
        // } else {
        //     LangAPI.post(`/blogs`, finalRoom).then((response) => {
        //         if (response.status === 200) {
        //             alert("Blog Added");
        //             setRoom({ ...initialObject });
        //             props.history.push("/admin/blogs");
        //         }
        //     });
        // }
    };

    // const handleChange = (event) => {
    //     if (event.target.value != selectedLang) {
    //         setSelectedLang(event.target.value)
    //     }
    //     console.log(event.target.value, "event.target.value")
    // };
    return (
        <div className={classes.root}>
            <Card>
                <CardHeader color="primary" className="d-flex justify-content-between align-items-center">
                    <h4 style={{ fontWeight: "400" }} className="mb-0">
                        Add Blogs
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
                                        id="title"
                                        name="title"
                                        label="Name"
                                        value={room.title}
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
                                        label="Sub Title"
                                        value={room.sub_title}
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
                                        id="posted_by"
                                        name="posted_by"
                                        label="Written By"
                                        value={room.posted_by}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleInputChange}
                                        size="small"
                                        helperText={''}
                                    />
                                </Grid> */}
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="route"
                                        name="route"
                                        label="Route"
                                        value={room.route}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handlerouteChange}
                                        size="small"
                                        helperText={''}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                        <p>Select Tags</p>
                                        <CreatableSelect
                                            isMulti
                                            onChange={handleTagsSelect}
                                            options={tagsList}
                                            value={room?.tags}
                                        />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <div className="thumbnail-preview-wrapper img-thumbnail">
                                        {!isEdit ? (
                                            thumbnailPreview && thumbnailPreview !== "" ? (
                                                <img src={thumbnailPreview} alt={room.alt_text || ""} />
                                            ) : (
                                                <img
                                                    src={require("./../../assets/img/placeholder.png")}
                                                    alt=""
                                                />
                                            )
                                        ) : typeof room.featured_img === typeof 0 ? (
                                            // room.thumbnail && room.thumbnail !== "" ?
                                            <img src={thumbnailPreview} alt={room.alt_text || ""} />
                                        ) : (
                                            <img src={room.featured_img} alt={room.alt_text || ""} />
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
                                                setIsBanner(false);
                                                setShowGallery(true);
                                            }}
                                        >
                                            {isEdit ? "Change" : "Upload"} Featured Image
                                        </MaterialButton>
                                    </Fragment>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <div className="thumbnail-preview-wrapper img-thumbnail">
                                        {!isEdit ? (
                                            bannerThumbnailPreview &&
                                                bannerThumbnailPreview !== "" ? (
                                                <img
                                                    src={bannerThumbnailPreview}
                                                    alt={room.alt_text || ""}
                                                />
                                            ) : (
                                                <img
                                                    src={require("./../../assets/img/placeholder.png")}
                                                    alt=""
                                                />
                                            )
                                        ) : typeof room.banner_img === typeof 0 ? (
                                            // room.thumbnail && room.thumbnail !== "" ?
                                            <img
                                                src={bannerThumbnailPreview}
                                                alt={room.alt_text || ""}
                                            />
                                        ) : (
                                            <img src={room.banner_img} alt={room.alt_text || ""} />
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
                                                setIsSingle(false);
                                                setIsBanner(true);
                                                setShowGallery(true);
                                            }}
                                        >
                                            {isEdit ? "Change" : "Upload"} Banner Image
                                        </MaterialButton>
                                    </Fragment>
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
                        <Grid item xs={12} sm={12}>
                            <hr />
                            <h4 style={{ fontWeight: "400" }}>Detailed Content</h4>

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
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="meta_title"
                                name="meta_title"
                                label="Meta Title"
                                value={room?.seo?.meta_title}
                                variant="outlined"
                                fullWidth
                                onChange={handleSEOInputChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="meta_description"
                                name="meta_description"
                                label="Meta Description"
                                value={room?.seo?.meta_description}
                                variant="outlined"
                                fullWidth
                                onChange={handleSEOInputChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="schema_markup"
                                name="schema_markup"
                                label="Schema Markup"
                                value={room?.seo?.schema_markup}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                rowsMax={4}
                                onChange={handleSEOInputChange}
                                size="small"
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="is_followed"
                                    row
                                    defaultChecked
                                    name="is_followed"
                                    value={room?.seo?.is_followed}
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
