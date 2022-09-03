import React, { Fragment, useEffect, useState } from "react"; //Suspense
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MaterialButton from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { TextField, } from "@material-ui/core";
import CKEditor from "ckeditor4-react";
import { Image } from "@material-ui/icons";
import LangAPI from "langapi/http";
import GalleryDialog from "views/Common/GalleryDialog";
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

export default withRouter(function AddSubCategory(props) {
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const lang = query.get('lang');
    const classes = useStyles();
    let { id } = useParams();

    const initialObject = {
        title: "",
        sub_title: "",
        link: "",
        description: "",
        thumbnail: ""
    };
    const [video, setVideo] = useState({ ...initialObject });
    const [imagesData, setImagesData] = useState([]);
    const [showGallery, setShowGallery] = useState(false);
    const [isSingle, setIsSingle] = useState(false);
    const [selectedLang, setSelectedLang] = useState(lang || "en");
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (id && id != null) {
            setIsEdit(true);
            LangAPI.get(`/videos/${id}?lang=${selectedLang}`).then((response) => {
                if (response.status === 200) {
                    let data = { ...response?.data };
                    // data.route = website_url + data.route;
                    if (response?.data) {
                        setVideo({ ...video, ...data });
                    } else {
                        setVideo({ ...initialObject });
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
        let updatedvideo = { ...video };
        updatedvideo[e.target.name] = e.target.value;
        setVideo(updatedvideo);
    };

    const handleImageSelect = (e, index) => {
        if (e.target.checked) {
            if (isSingle) {
                setVideo({ ...video, thumbnail: imagesData[index].avatar });
                setThumbnailPreview(imagesData[index].avatar);
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
            if (isSingle) {
                setVideo({ ...video, thumbnail: "" });
                setThumbnailPreview("");
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
        let finalvideo = video;
        if (finalvideo.child) {
            delete finalvideo.child;
        }
        if (!finalvideo.title || finalvideo.title == "") {
            alert("Please Enter title before Submiting")
            return false;
        }
        if (!finalvideo.link || finalvideo.link == "") {
            alert("Please Enter Link before Submiting")
            return false;
        }
        if (!finalvideo.description || finalvideo.description == "") {
            alert("Please Enter description before Submiting")
            return false;
        }

        let token = localStorage.getItem("authToken") || ""
        LangAPI.post(`/videos?lang=${selectedLang}`, finalvideo, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                // console.log(response)
                alert("Video Added");
                setVideo({ ...initialObject });
                props.history.push("/admin/video");
            }
        }).catch(function (error) {
            console.log(error);
        });
    };

    // const handleChange = (event) => {
    //     if (event.target.value != selectedLang) {
    //         setSelectedLang(event.target.value)
    //     }
    // };

    return (
        <div className={classes.root}>
            <Card>
                <CardHeader color="primary" className="d-flex justify-content-between align-items-center">
                    {/* <div className="d-flex justify-content-between align-items-center"> */}
                    <h4 style={{ fontWeight: "400" }} className="mb-0">
                        Add Video
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
                                        id="title"
                                        name="title"
                                        label="Title"
                                        value={video.title}
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
                                        value={video.sub_title}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleInputChange}
                                        size="small"
                                        helperText={''}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        id="link"
                                        name="link"
                                        label="Video Link"
                                        value={video.link}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleInputChange}
                                        size="small"
                                        helperText={''}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <h4 style={{ fontWeight: "400" }}>Description</h4>
                                    <CKEditor
                                        onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                                        data={video.description}
                                        onChange={(e) =>
                                            setVideo({ ...video, description: e.editor.getData() })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div className="thumbnail-preview-wrapper img-thumbnail">
                                        {!isEdit ? (
                                            video.thumbnail && video.thumbnail !== "" ? (
                                                <img src={video.thumbnail} alt={video.alt_text || ""} />
                                            ) : (
                                                <img
                                                    src={require("./../../assets/img/placeholder.png")}
                                                    alt=""
                                                />
                                            )
                                        ) : typeof video.thumbnail === typeof 0 ? (
                                            <img src={video.thumbnail} alt={video.alt_text || ""} />
                                        ) : (
                                            <img src={video.thumbnail} alt={video.alt_text || ""} />
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
                                            Upload thumbnail Image
                                        </MaterialButton>
                                    </Fragment>
                                </Grid>
                            </Grid>
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
