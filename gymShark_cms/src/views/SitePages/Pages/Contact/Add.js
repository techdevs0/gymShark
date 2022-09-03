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
import { AddCircleOutline, CancelOutlined } from "@material-ui/icons";
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


export default function AddContactPage() {
  const pageId = useParams().id;
  const classes = useStyles();

  let initObj = {
    banner: {
      heading: '',
      sub_heading: "",
      image: ""
    },
    getInTouch: {
      heading: "",
      sub_heading: "",
      description: "",
    },
    contact: [
      {
        heading: "",
        address: "",
        number: "",
        email: ""
      },
      {
        heading: "",
        address: "",
        number: "",
        email: ""
      },
      {
        heading: "",
        address: "",
        number: "",
        email: ""
      },
    ]
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
        setPageData(response.data)
        if (response.data.content) {
          setTermsUse(response.data.content)
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

  const getSEOInfo = () => {
    // API.get(`/meta/${pageId}`).then(response => {
    //   if (response.status === 200) {
    //     let seoInfoData = response.data;
    //     if (seoInfoData) {
    //       setSeoInfo(seoInfoData);
    //     }
    //     else {
    //       seoInfoData(seoInfo);
    //     }
    //   }
    // })
  }

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
      // if (isSingle && thumbnailPreview !== "") {
      //   alert("You can only select 1 image for thubnail. If you want to change image, deselect the image and then select a new one");
      //   return;
      // } else {
      if (section == "banner") {
        setTermsUse({ ...termsUse, [section]: { ...termsUse[section], image: imagesData[index].avatar } })
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
        upTerm[section].slider_images[currentIndex - 1][imageType] = imagesData[index].avatar
        setTermsUse(upTerm)
        setCurrentIndex(0)
      }
      if (section == "getInTouch" || section == "founder") {
        let upTerm = { ...termsUse }
        upTerm[section].image = imagesData[index].avatar
        setTermsUse(upTerm)
        setCurrentIndex(0)
      }
      // setThumbnailPreview(imagesData[index].avatar)

      // let imagesDataUpdated = imagesData.map((x, i) => {
      //   if (i === index) {
      //     return {
      //       ...x,
      //       isChecked: true
      //     }
      //   } else {
      //     return x
      //   }
      // });
      // setImagesData(imagesDataUpdated);
      // }
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

  // const handleRouteChange = (e) => {
  //   let updatedSeoInfo = { ...seoInfo };
  //   let splitValues = e.target.value.split(website_url);
  //   let updatedValue = splitValues[1] ? splitValues[1].replace(/\s+/g, '-') : ""
  //   updatedValue = updatedValue.replace(/--/g, '-')
  //   updatedSeoInfo[e.target.name] = website_url + updatedValue;
  //   setSeoInfo(updatedSeoInfo);
  // }

  const handleSEOSubmit = () => {
    let updatedSeoInfo = seoInfo;
    updatedSeoInfo.is_indexed_or_is_followed = `${updatedSeoInfo.is_indexed},${updatedSeoInfo.is_followed}`;

    if (updatedSeoInfo.id > 0) {
      // API.put(`/meta/${pageId}`, updatedSeoInfo).then(response => {
      //   if (response.status === 200) {
      //     alert("Section updated successfully !");
      //   }
      // }).catch(err => console.log(err))
    } else {
      // API.post(`/meta`, updatedSeoInfo).then(response => {
      //   if (response.status === 200) {
      //     alert("Section updated successfully !");
      //   }
      // }).catch(err => console.log(err))

    }
  }

  const handleSubmit = () => {
    // API.post(`/add_section`, termsUse[name]).then(response => {
    //   if (response.status === 200) {
    //     alert("Section updated successfully !");
    //   }
    // }).catch(err => console.log(err))

    let updatedTermsUse = { ...termsUse };

    updatedTermsUse.meta = { ...seoInfo };
    // updatedTermsUse.page_id = pageId
    // updatedTermsUse.slug="termsUse-sections";
    let updatedData = { ...pageData }
    updatedData.content = updatedTermsUse
    let token = localStorage.getItem("authToken") || ""
    console.log(token, "token")
    LangAPI.post(`/pages`, updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      console.log(response);
      if (response.status === 200) {
        alert("Record Updated");
        // setWedding({ ...initialObject }); //resetting the form
        // props.contact.push('/admin/weddings');
      }
    }).catch(err => alert("Something went wrong"));

    // console.log("updatedTermsUse",updatedTermsUse); return false;

    // LangAPI.post(`/add-section?lang=${selectedLang}`, updatedTermsUse).then(response => {
    //   if (response.status === 200) {
    //     alert("Section updated successfully !");
    //   }
    // }).catch(err => console.log(err))
  }

  const handleChange = (event) => {
    // setAge(event.target.value as string);
    if (event.target.value != selectedLang) {
      setSelectedLang(event.target.value)
    }
  };

  const handleEditorValue = (e, obj, valueName) => {
    let upTerm = { ...termsUse }
    upTerm[obj][valueName] = e.editor.getData()
    setTermsUse(upTerm)
  }

  const handleAddressItem = (type, index) => {
    if (type === "delete") {
      let productUp = { ...termsUse }
      let newlist = productUp.contact?.filter((element, index2) => { return index2 !== index })
      // productUp.contact.splice(index,1)
      productUp.contact = newlist
      setTermsUse(productUp)
    }
    if (type === "add") {
      let newItem = {
        heading: "  ",
        address: "  ",
        number: "  ",
        email: "  "
      }
      let productUp = { ...termsUse }
      productUp.contact.push(newItem)
      setTermsUse(productUp)
    }
  };

  return (
    <div>
      <div className={classes.root}>
        <Card>
          <CardHeader color="primary" className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Contact Page</h4>
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
                <Typography className={classes.heading}>Banner</Typography>
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
                      value={termsUse.banner.heading}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => handleInputChange(e, "banner")}
                      size="medium"
                      style={{ marginBottom: '1rem' }}
                    />
                    <TextField
                      required
                      id="sub_heading"
                      name="sub_heading"
                      label="Section Sub Heading"
                      value={termsUse.banner.sub_heading}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => handleInputChange(e, "banner")}
                      size="medium"
                      style={{ marginBottom: '1rem' }}
                    />

                    <div className="thumbnail-preview-wrapper-large img-thumbnail">
                      {
                        termsUse?.banner?.image !== "" ?
                          <img src={termsUse?.banner?.image} alt={""} />
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
                <Typography className={classes.heading}>get In Touch</Typography>
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
                      value={termsUse?.getInTouch?.heading}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => handleInputChange(e, "getInTouch")}
                      size="medium"
                      style={{ marginBottom: '1rem' }}
                    />
                    <TextField
                      required
                      id="sub_heading"
                      name="sub_heading"
                      label="Sub Heading"
                      value={termsUse?.getInTouch?.sub_heading}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => handleInputChange(e, "getInTouch")}
                      size="medium"
                      style={{ marginBottom: '1rem' }}
                    />
                    <Grid item xs={12} sm={12}>
                      <p>Detailed Content</p>
                      <CKEditor
                        config={ckEditorConfig}
                        onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)} data={termsUse?.getInTouch?.description} onChange={(e) => handleEditorValue(e, 'getInTouch', 'description')} />
                    </Grid>
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
                <Typography className={classes.heading}>contact</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {termsUse?.contact.map((item, index) => (
                    <Grid item xs={12} sm={12}>
                      <b>Item # {index + 1}</b>
                      {/* SECTION TITLE */}
                      <TextField
                        required
                        id="heading"
                        name="heading"
                        label="Heading"
                        value={item?.heading}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleInputChange(e, "contact", index)}
                        size="medium"
                        style={{ marginBottom: '1rem' }}
                      />
                      <TextField
                        required
                        id="address"
                        name="address"
                        label="sub Heading"
                        value={item?.address}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleInputChange(e, "contact", index)}
                        size="medium"
                        style={{ marginBottom: '1rem' }}
                      />
                      <TextField
                        required
                        id="number"
                        name="number"
                        label="Phone Number"
                        value={item?.number}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleInputChange(e, "contact", index)}
                        size="medium"
                        style={{ marginBottom: '1rem' }}
                      />
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        value={item?.email}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleInputChange(e, "contact", index)}
                        size="medium"
                        style={{ marginBottom: '1rem' }}
                      />
                      <Grid item xs={12} sm={2} style={{ display: "flex", alignItems: "center", columnGap: "5px" }}>
                        {termsUse?.contact?.length > 1 &&
                          <CancelOutlined
                            style={{ cursor: "pointer", fontSize: "30px" }}
                            titleAccess="Add submenu"
                            onClick={() => handleAddressItem("delete", index)}
                            color="primary"
                          />
                        }
                        {index == termsUse?.contact?.length - 1 &&
                          <AddCircleOutline
                            style={{ cursor: "pointer", fontSize: "30px" }}
                            titleAccess="Add item"
                            onClick={() => handleAddressItem("add", index)}
                            color="primary"
                          />
                        }
                      </Grid>
                    </Grid>
                  ))}

                </Grid>
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
