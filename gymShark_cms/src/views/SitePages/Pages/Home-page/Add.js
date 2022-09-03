import React, { Fragment, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
// import GridItem from "components/Grid/GridItem.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import CustomInput from "components/CustomInput/CustomInput.js";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MaterialButton from "@material-ui/core/Button";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import {
  MenuItem,
  Select,
  FormControl,
  TextField,
  CardMedia,
  CardActionArea,
  CardContent,
  CardActions,
  RadioGroup, FormControlLabel, Radio
} from "@material-ui/core";
import CKEditor from 'ckeditor4-react';
import { ckEditorConfig } from "utils/data";

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@arslanshahab/ckeditor5-build-classic';
import { Image } from "@material-ui/icons";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useParams } from "react-router-dom";
import API from "utils/http";
import LangAPI from "langapi/http";
import GalleryDialog from "../../../Common/GalleryDialog";
import { AddCircleOutline, DeleteOutlined } from "@material-ui/icons";

// const website_url = "/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // width:'60%',
    // margin:'auto'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function AddHomePage() {
  const pageId = useParams().id;
  const classes = useStyles();

  let initObj = {
    banner: [
      {
        heading: '',
        sub_heading: "",
        image: ""
      },
    ],
    contact: [
      {
        icon: "",
        text: "",
        value: ""
      },
      {
        icon: "",
        text: "",
        value: ""
      },
      {
        icon: "",
        text: "",
        value: "",
        value2: "#",
      }
    ],
    collections: [
      {
        heading: "",
        sub_heading: "",
        starting_from: "",
        image: ""
      },
      {
        heading: "",
        sub_heading: "",
        starting_from: "",
        image: ""
      },
      {
        heading: "",
        sub_heading: "",
        starting_from: "",
        image: ""
      },
      {
        heading: "",
        sub_heading: "",
        starting_from: "",
        image: ""
      },
    ],
    projects: {
      heading: "",
      sub_heading: "",
      image: ""
    },
    deal: [
      {
        heading_image1: "",
        heading_image2: "",
        sub_heading_image1: "",
        sub_heading_image2: "",
        old_price: "",
        new_price: "",
        expires_in: "",
        slider_images:
        {
          main_image: "",
          sub_image: ""
        }
      }
    ],
    video: {
      heading: "",
      icon: "",
      link: ""
    }
  }

  let seoObj = {
    id: 0,
    post_id: pageId || 0,
    meta_title: '',
    meta_description: '',
    // route: website_url,
    schema_markup: '',
    is_followed: true,
    is_indexed: true,
    is_indexed_or_is_followed: '1,1',
  }
  const [termsUse, setTermsUse] = useState(initObj);
  const [seoInfo, setSeoInfo] = useState(seoObj)
  const [currentSection, setCurrentSection] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageType, setImageType] = useState("")
  const [pageData, setPageData] = useState({})

  const [imagesData, setImagesData] = useState([])
  // const [uploadsPreview, setUploadsPreview] = useState(null)
  // const [selectedImages, setSelectedImages] = useState([])
  const [showGallery, setShowGallery] = useState(false)
  const [isSingle, setIsSingle] = useState(true)
  // const [renderPreviews, setRenderPreviews] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    var splitUrl = window.location.href.split('/');
    let route = splitUrl[splitUrl.length - 1]
    LangAPI.get(`/pages/${route}?${selectedLang}`).then(response => {
      if (response?.status === 200) {
        setPageData(response.data);
        if (response.data.content) {
          console.log(response.data.content);
          let data = response.data.content;
          // data.banner = [
          //   {
          //     heading: "",
          //     sub_heading: "",
          //     image: ""
          //   }
          // ]
          setTermsUse(data)
          if (response.data.content.meta) {
            setSeoInfo(response.data.content.meta)
          }

        }

      }
    }).catch(err => console.log(err));;



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

  const handleInputChange = (e, section, index = -1) => {
    let updatedAbout = { ...termsUse };
    if (index > -1) {
      updatedAbout[section][index][e.target.name] = e.target.value;
    } else {
      updatedAbout[section][e.target.name] = e.target.value;
    }
    setTermsUse(updatedAbout);
  }

  const handleImageSelect = (e, index, section) => {
    setTimeout(() => {
      setShowGallery(false);
    }, 500);

    if (e.target.checked) {
      if (section == "banner") {

        console.log("banner :: ",)
        let upTerm = { ...termsUse }
        // upTerm.banner = [
        //   {
        //     heading: "",
        //     sub_heading: "",
        //     image: ""
        //   }
        // ]
        upTerm[section][currentIndex - 1].image = imagesData[index].avatar
        setTermsUse(upTerm)
        setCurrentIndex(0)
        setTimeout(() => {
          setShowGallery(false);
        }, 500);

        // setTermsUse({ ...termsUse, [section]: { ...termsUse[section], image: imagesData[index].avatar } })

      }

      if (section == "contact") {
        let upTerm = { ...termsUse }
        upTerm[section][currentIndex - 1].icon = imagesData[index].avatar
        setTermsUse(upTerm)
        setCurrentIndex(0)
      }
      if (section == "collections") {
        let upTerm = { ...termsUse }
        upTerm[section][currentIndex - 1].image = imagesData[index].avatar
        setTermsUse(upTerm)
        setCurrentIndex(0)
      }
      if (section == "deal") {
        let upTerm = { ...termsUse }
        // console.log("upTerm[section].slider_images[currentIndex -1]",upTerm[section].slider_images[currentIndex -1]);return false;
        // upTerm.deal[currentIndex - 1].slider_images.main_image
        upTerm[section][currentIndex - 1].slider_images[imageType] = imagesData[index].avatar
        console.log("upTerm :: ", upTerm)
        setTermsUse(upTerm)
        setCurrentIndex(0)
      }
      if (section == "projects") {
        let upTerm = { ...termsUse }
        upTerm[section].image = imagesData[index].avatar
        setTermsUse(upTerm)
        setCurrentIndex(0)
      }
      if (section == "video") {
        let upTerm = { ...termsUse }
        upTerm[section].icon = imagesData[index].avatar
        setTermsUse(upTerm)
        setCurrentIndex(0)
      }
    } else {
      setTermsUse({ ...termsUse, [section]: { ...termsUse[section], section_avatar: "" } })
      setThumbnailPreview("")

      setImagesData(imagesData.map((x, i) => {
        if (i === index) {
          return {
            ...x,
            isChecked: false
          }
        } else {
          return x
        }
      }));
    }
  }

  const handleSEOInputChange = (e) => {
    let updatedSeoInfo = { ...seoInfo };
    updatedSeoInfo[e.target.name] = e.target.value;
    setSeoInfo(updatedSeoInfo);
  }

  const handleSubmit = () => {

    let updatedTermsUse = { ...termsUse };

    updatedTermsUse.meta = { ...seoInfo };
    let updatedData = { ...pageData }
    updatedData.content = updatedTermsUse
    let token = localStorage.getItem("authToken") || ""

    // updatedData.content.deal[currentIndex].slider_images = {
    //   main_image: "",
    //   sub_image: "",
    // }

    // console.log("updatedData ::", updatedData)

    // return false;
    
    LangAPI.post(`/pages`, updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if (response.status === 200) {
        alert("Record Updated");
      }
    }).catch(err => alert("Something went wrong"));
  }

  // const handleChange = (event) => {
  //   // setAge(event.target.value as string);
  //   if (event.target.value != selectedLang) {
  //     setSelectedLang(event.target.value)
  //   }
  // };

  const handleDeals = (type, index) => {
    if (type === "delete") {
      let productUp = { ...termsUse }
      productUp.deal.splice(index, 1)
      setTermsUse(productUp)
    }

    if (type === "add") {
      let newItem = {
        heading_image1: "",
        heading_image2: "",
        sub_heading_image1: "",
        sub_heading_image2: "",
        old_price: "",
        new_price: "",
        expires_in: "",
        slider_images:
        {
          main_image: "",
          sub_image: ""
        }
      }
      let productUp = { ...termsUse }
      productUp.deal.push(newItem)
      setTermsUse(productUp)
    }
  };

  const handleSliders = (type, index) => {
    if (type === "delete") {
      let productUp = { ...termsUse }
      productUp.banner.splice(index, 1)
      setTermsUse(productUp)
    }

    if (type === "add") {
      let newItem = {
        heading: "",
        sub_heading: "",
        image: "",
      }
      let productUp = { ...termsUse }
      productUp.banner.push(newItem)
      setTermsUse(productUp)
    }
  };


  return (
    <div>
      <div className={classes.root}>
        <Card>
          <CardHeader color="primary" className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Add Home Page</h4>
            {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
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
          </CardHeader>
          <CardBody>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panelaa-content"
                id="panelaa-header"
              >
                <Typography className={classes.heading}>Banner Slider</Typography>
              </AccordionSummary>
              <AccordionDetails className="accordian-flex-column">
                {termsUse?.banner?.map((item, index) => (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>Slider # {index + 1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <>
                          <Grid item xs={12} sm={12}>
                            {/* SECTION TITLE */}
                            <TextField
                              required
                              id="heading"
                              name="heading"
                              label="Section Heading"
                              value={item?.heading}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => handleInputChange(e, "banner", index)}
                              size="medium"
                              style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                              required
                              id="sub_heading"
                              name="sub_heading"
                              label="Section Sub Heading"
                              value={item?.sub_heading}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => handleInputChange(e, "banner", index)}
                              size="medium"
                              style={{ marginBottom: '1rem' }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} style={{ marginBottom: "15px" }}>
                            <div className="thumbnail-preview-wrapper-large img-thumbnail">
                              {
                                item?.image !== "" ?
                                  <img src={item?.image} alt={""} />
                                  :
                                  <img src="https://cpworldgroup.com/wp-content/uploads/2021/01/placeholder.png" alt="" />
                              }
                            </div>
                            <Fragment>
                              <MaterialButton
                                variant="outlined"
                                color="primary"
                                startIcon={<Image />}
                                className="mt-1"
                                fullWidth
                                size="large"
                                onClick={() => {
                                  setIsSingle(true);
                                  setCurrentSection("banner");
                                  setShowGallery(true);
                                  setCurrentIndex(index + 1);
                                }}
                              >
                                Upload Featured Image
                              </MaterialButton>
                            </Fragment>
                          </Grid>
                        </>
                        <Grid item xs={12} sm={12}>
                          <hr />
                          {termsUse?.banner.length > 1 &&
                            <DeleteOutlined
                              style={{ cursor: "pointer", fontSize: "30px" }}
                              titleAccess="Delete Item"
                              onClick={() => handleSliders("delete", index)}
                              color="primary"
                            />
                          }
                          {index == termsUse?.banner?.length - 1 &&
                            <AddCircleOutline
                              style={{ cursor: "pointer", fontSize: "30px" }}
                              titleAccess="Add item"
                              onClick={() => handleSliders("add")}
                              color="primary"
                            />
                          }
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Contact</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {termsUse?.contact?.map((x, i) => (

                    <Grid item xs={12} sm={12} style={{ marginBottom: "15px" }}>
                      <b>Item # {i + 1}</b>
                      {/* SECTION TITLE */}
                      <TextField
                        required
                        id="text"
                        name="text"
                        label="Title"
                        value={x.text}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleInputChange(e, "contact", i)}
                        size="small"
                        style={{ marginBottom: '1rem' }}
                      />
                      <TextField
                        required
                        id="value"
                        name="value"
                        label="Title Value"
                        value={x.value}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleInputChange(e, "contact", i)}
                        size="small"
                        style={{ marginBottom: '1rem' }}
                      />
                      {x.value2 &&
                        <TextField
                          required
                          id="value2"
                          name="value2"
                          label="Link"
                          value={x.value2}
                          variant="outlined"
                          fullWidth
                          onChange={(e) => handleInputChange(e, "contact", i)}
                          size="small"
                          style={{ marginBottom: '1rem' }}
                        />
                      }

                      <div className="thumbnail-preview-wrapper-large img-thumbnail">
                        {
                          x.icon !== "" ?
                            <img src={x.icon} alt={""} />
                            :
                            <img src="https://cpworldgroup.com/wp-content/uploads/2021/01/placeholder.png" alt="" />
                        }
                      </div>
                      <Fragment>
                        <MaterialButton
                          variant="outlined"
                          color="primary"
                          startIcon={<Image />}
                          className="mt-1"
                          fullWidth
                          size="large"
                          onClick={() => {
                            setIsSingle(true);
                            setCurrentSection("contact");
                            setCurrentIndex(i + 1)
                            setShowGallery(true);
                          }}
                        >
                          Upload Icon
                        </MaterialButton>
                      </Fragment>
                    </Grid>

                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Collections</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {termsUse?.collections?.map((x, i) => (
                    <Grid item xs={12} sm={12} style={{ marginBottom: "15px" }}>
                      <b>Item # {i + 1}</b>
                      {/* SECTION TITLE */}
                      <TextField
                        required
                        id="heading"
                        name="heading"
                        label="Heading"
                        value={x.heading}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleInputChange(e, "collections", i)}
                        size="small"
                        style={{ marginBottom: '1rem' }}
                      />
                      <TextField
                        required
                        id="sub_headiing"
                        name="sub_heading"
                        label="Sub Headiing"
                        value={x.sub_heading}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleInputChange(e, "collections", i)}
                        size="small"
                        style={{ marginBottom: '1rem' }}
                      />
                      <TextField
                        required
                        id="starting_form"
                        name="starting_from"
                        label="Starting Form"
                        value={x.starting_from}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleInputChange(e, "collections", i)}
                        size="small"
                        style={{ marginBottom: '1rem' }}
                      />
                      <div className="thumbnail-preview-wrapper-large img-thumbnail">
                        {
                          x.image !== "" ?
                            <img src={x.image} alt={""} />
                            :
                            <img src="https://cpworldgroup.com/wp-content/uploads/2021/01/placeholder.png" alt="" />
                        }
                      </div>
                      <Fragment>
                        <MaterialButton
                          variant="outlined"
                          color="primary"
                          startIcon={<Image />}
                          className="mt-1"
                          fullWidth
                          size="large"
                          onClick={() => {
                            setIsSingle(true);
                            setCurrentSection("collections");
                            setCurrentIndex(i + 1)
                            setShowGallery(true);
                          }}
                        >
                          Upload Icon
                        </MaterialButton>
                      </Fragment>
                    </Grid>

                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panelaa-content"
                id="panelaa-header"
              >
                <Typography className={classes.heading}>Projects</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    {/* SECTION TITLE */}
                    <TextField
                      required
                      id="heading"
                      name="heading"
                      label="Section Heading"
                      value={termsUse?.projects?.heading}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => handleInputChange(e, "projects")}
                      size="medium"
                      style={{ marginBottom: '1rem' }}
                    />
                    <TextField
                      required
                      id="sub_heading"
                      name="sub_heading"
                      label="Section Sub Heading"
                      value={termsUse?.projects?.sub_heading}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => handleInputChange(e, "projects")}
                      size="medium"
                      style={{ marginBottom: '1rem' }}
                    />

                    <div className="thumbnail-preview-wrapper-large img-thumbnail">
                      {
                        termsUse?.projects?.image !== "" ?
                          <img src={termsUse?.projects?.image} alt={""} />
                          :
                          <img src="https://cpworldgroup.com/wp-content/uploads/2021/01/placeholder.png" alt="" />
                      }
                    </div>
                    <Fragment>
                      <MaterialButton
                        variant="outlined"
                        color="primary"
                        startIcon={<Image />}
                        className="mt-1"
                        fullWidth
                        size="large"
                        onClick={() => {
                          setIsSingle(true);
                          setCurrentSection("projects");
                          setShowGallery(true);
                        }}
                      >
                        Upload Featured Image
                      </MaterialButton>
                    </Fragment>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panelaa-content"
                id="panelaa-header"
              >
                <Typography className={classes.heading}>Video</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    {/* SECTION TITLE */}
                    <TextField
                      required
                      id="heading"
                      name="heading"
                      label="Video Heading"
                      value={termsUse?.video?.heading}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => handleInputChange(e, "video")}
                      size="medium"
                      style={{ marginBottom: '1rem' }}
                    />
                    <TextField
                      required
                      id="link"
                      name="link"
                      label="Link"
                      value={termsUse?.video?.link}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => handleInputChange(e, "video")}
                      size="medium"
                      style={{ marginBottom: '1rem' }}
                    />

                    <div className="thumbnail-preview-wrapper-large img-thumbnail">
                      {
                        termsUse?.video?.icon !== "" ?
                          <img src={termsUse?.video?.icon} alt={""} />
                          :
                          <img src="https://cpworldgroup.com/wp-content/uploads/2021/01/placeholder.png" alt="" />
                      }
                    </div>
                    <Fragment>
                      <MaterialButton
                        variant="outlined"
                        color="primary"
                        startIcon={<Image />}
                        className="mt-1"
                        fullWidth
                        size="large"
                        onClick={() => {
                          setIsSingle(true);
                          setCurrentSection("video");
                          setShowGallery(true);
                        }}
                      >
                        Upload Icon Image
                      </MaterialButton>
                    </Fragment>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Deal</Typography>
              </AccordionSummary>
              <AccordionDetails className="accordian-flex-column">
                {termsUse?.deal?.map((item, index) => (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>Slider # {index + 1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        {/* {termsUse?.deal?.map((item, index) => ( */}
                        <>
                          <Grid item xs={12} sm={12}>
                            {/* <Grid item xs={12} sm={12} style={{marginBottom:"15px"}}><b>Slider # {index+1}</b></Grid> */}
                            {/* SECTION TITLE */}
                            <TextField
                              required
                              id="heading_image1"
                              name="heading_image1"
                              label="Heading Image1"
                              value={item?.heading_image1}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => handleInputChange(e, "deal", index)}
                              size="medium"
                              style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                              required
                              id="heading_image2"
                              name="heading_image2"
                              label="heading Image2"
                              value={item?.heading_image2}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => handleInputChange(e, "deal", index)}
                              size="medium"
                              style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                              required
                              id="sub_heading_image1"
                              name="sub_heading_image1"
                              label="Sub heading Image1"
                              value={item?.sub_heading_image1}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => handleInputChange(e, "deal", index)}
                              size="medium"
                              style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                              required
                              id="sub_heading_image2"
                              name="sub_heading_image2"
                              label="Sub heading Image2"
                              value={item?.sub_heading_image2}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => handleInputChange(e, "deal", index)}
                              size="medium"
                              style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                              required
                              id="old_price"
                              name="old_price"
                              label="Old Price"
                              value={item?.old_price}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => handleInputChange(e, "deal", index)}
                              size="medium"
                              style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                              required
                              id="new_price"
                              name="new_price"
                              label="New Price"
                              value={item?.new_price}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => handleInputChange(e, "deal", index)}
                              size="medium"
                              style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                              required
                              id="expires_in"
                              name="expires_in"
                              label="Expired in"
                              value={item?.expires_in}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => handleInputChange(e, "deal", index)}
                              size="medium"
                              style={{ marginBottom: '1rem' }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} style={{ marginBottom: "15px" }}>
                            <div className="thumbnail-preview-wrapper-large img-thumbnail">
                              {
                                item?.slider_images?.main_image !== "" ?
                                  <img src={item?.slider_images?.main_image} alt={""} />
                                  :
                                  <img src="https://cpworldgroup.com/wp-content/uploads/2021/01/placeholder.png" alt="" />
                              }
                            </div>
                            <Fragment>
                              <MaterialButton
                                variant="outlined"
                                color="primary"
                                startIcon={<Image />}
                                className="mt-1"
                                fullWidth
                                size="large"
                                onClick={() => {
                                  setIsSingle(true);
                                  setCurrentSection("deal");
                                  setCurrentIndex(index + 1)
                                  setImageType("main_image")
                                  setShowGallery(true);
                                }}
                              >
                                Upload Main Image
                              </MaterialButton>
                            </Fragment>
                          </Grid>
                          <Grid item xs={12} sm={6} style={{ marginBottom: "15px" }}>

                            <div className="thumbnail-preview-wrapper-large img-thumbnail">
                              {
                                item.slider_images.sub_image !== "" ?
                                  <img src={item.slider_images.sub_image} alt={""} />
                                  :
                                  <img src="https://cpworldgroup.com/wp-content/uploads/2021/01/placeholder.png" alt="" />
                              }
                            </div>
                            <Fragment>
                              <MaterialButton
                                variant="outlined"
                                color="primary"
                                startIcon={<Image />}
                                className="mt-1"
                                fullWidth
                                size="large"
                                onClick={() => {
                                  setIsSingle(true);
                                  setCurrentSection("deal");
                                  setCurrentIndex(index + 1)
                                  setImageType("sub_image")
                                  setShowGallery(true);
                                }}
                              >
                                Upload Sub Image
                              </MaterialButton>
                            </Fragment>
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <hr />
                            {termsUse?.deal.length > 0 &&
                              <DeleteOutlined
                                style={{ cursor: "pointer", fontSize: "30px" }}
                                titleAccess="Delete Item"
                                onClick={() => handleDeals("delete", index)}
                                color="primary"
                              />
                            }
                            {index == termsUse?.deal?.length - 1 &&
                              <AddCircleOutline
                                style={{ cursor: "pointer", fontSize: "30px" }}
                                titleAccess="Add item"
                                onClick={() => handleDeals("add")}
                                color="primary"
                              />
                            }
                          </Grid>

                        </>
                        {/* ))} */}

                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>SEO Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="meta_title"
                      name="meta_title"
                      label="Meta Title"
                      value={seoInfo.meta_title}
                      variant="outlined"
                      fullWidth
                      onChange={handleSEOInputChange}
                      size="small"
                    />
                  </Grid>
                  {/*<Grid item xs={12} sm={3}>*/}
                  {/*  <span>https://fishermanscove-resort.com</span>*/}
                  {/*</Grid>*/}
                  {/*<Grid item xs={12} sm={3}>*/}
                  {/*  <TextField*/}
                  {/*      required*/}
                  {/*      id="route"*/}
                  {/*      name="route"*/}
                  {/*      label="Permalink"*/}
                  {/*      value={seoInfo.route}*/}
                  {/*      variant="outlined"*/}
                  {/*      fullWidth*/}
                  {/*      onChange={handleRouteChange}*/}
                  {/*      size="small"*/}
                  {/*  />*/}
                  {/*</Grid>*/}
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="meta_description"
                      name="meta_description"
                      label="Meta Description"
                      value={seoInfo.meta_description}
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
                      value={seoInfo.schema_markup}
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      rowsMax={4}
                      onChange={handleSEOInputChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset">
                      <RadioGroup aria-label="is_followed" row defaultChecked name="is_followed" value={seoInfo.is_followed} onChange={(e) => {
                        setSeoInfo({ ...seoInfo, is_followed: !seoInfo.is_followed })
                      }}>
                        <FormControlLabel value={true} control={<Radio />} label="Follow" />
                        <FormControlLabel value={false} control={<Radio />} label="No Follow" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset">
                      <RadioGroup aria-label="is_indexed" row defaultChecked name="is_indexed" value={seoInfo.is_indexed} onChange={(e) => {
                        setSeoInfo({ ...seoInfo, is_indexed: !seoInfo.is_indexed })
                      }}>
                        <FormControlLabel value={true} control={<Radio />} label="Index" />
                        <FormControlLabel value={false} control={<Radio />} label="No Index" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </CardBody>
        </Card>
        <Grid item xs={12} sm={12}>
          <MaterialButton onClick={() => handleSubmit()} size="large" color="primary" variant="contained">
            Update Section
          </MaterialButton>
        </Grid>
      </div>
      <GalleryDialog isSingle={isSingle} section={currentSection} open={showGallery} handleImageSelect={handleImageSelect} handleClose={() => {
        setShowGallery(false);
        // setRenderPreviews(true);
      }} refreshGallery={getGalleryImages} data={imagesData} />
    </div>
  );
}
