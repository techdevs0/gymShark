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

export default withRouter(function AddPartner(props) {
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const lang = query.get('lang');
    const classes = useStyles();
    let { id } = useParams();

    const initialObject = {
        name: "",
        image: "",
        route: "",
        logo: "",
        link: "",
        description: "",
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
            LangAPI.get(`/partners/${id}?lang=${selectedLang}`).then((response) => {
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
            if (isSingle && !isBanner) {
                setRoom({ ...room, image: imagesData[index].avatar });
                setTimeout(() => {
                    setShowGallery(false);
                }, 500);
            }
            else if (isBanner && !isSingle) {
                setRoom({ ...room, logo: imagesData[index].avatar });
                setTimeout(() => {
                    setShowGallery(false);
                }, 500);
            }

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
        if (!finalRoom.route || finalRoom.route == "") {
            alert("Please Enter route before Submiting")
            return false;
        }
        if (!finalRoom.image || finalRoom.image == "") {
            alert("Please Select Featured Image before Submiting")
            return false;
        }

        let token = localStorage.getItem("authToken") || ""
        LangAPI.post(`/partners?lang=${selectedLang}`, finalRoom, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log(response)
                alert("Partner Added");
                setRoom({ ...initialObject });
                props.history.push("/admin/partners");
            }
        }).catch(function (error) {
            console.log(error);
        });
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
                        Add Partner
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
                                        id="link"
                                        name="link"
                                        label="Link"
                                        value={room.link}
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
                                <Grid item xs={0} sm={6}>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div className="thumbnail-preview-wrapper img-thumbnail">
                                        {!isEdit ? (
                                            room.image && room.image !== "" ? (
                                                <img src={room.image} alt={room.alt_text || ""} />
                                            ) : (
                                                <img
                                                    src={require("./../../assets/img/placeholder.png")}
                                                    alt=""
                                                />
                                            )
                                        ) : typeof room.image === typeof 0 ? (
                                            // room.thumbnail && room.thumbnail !== "" ?
                                            <img src={room.image} alt={room.alt_text || ""} />
                                        ) : (
                                            <img src={room.image} alt={room.alt_text || ""} />
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
                                            {isEdit ? "Change" : "Upload"} Image
                                        </MaterialButton>
                                    </Fragment>

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div className="thumbnail-preview-wrapper img-thumbnail">

                                        {room.logo && room.logo !== "" ? (
                                            <img src={room.logo} alt={room.alt_text || ""} />
                                        ) : (
                                            <img
                                                src={require("./../../assets/img/placeholder.png")}
                                                alt=""
                                            />
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
                                            {isEdit ? "Change" : "Upload"} logo
                                        </MaterialButton>
                                    </Fragment>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <p>Detailed Content</p>
                            <CKEditor
                                config={ckEditorConfig}
                                onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)} data={room?.description} onChange={(e) => setRoom({ ...room, description: e.editor.getData() })} />
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
