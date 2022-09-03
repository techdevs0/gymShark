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


export default function AddServicePage() {
  const pageId = useParams().id;
  const classes = useStyles();

  let initObj = {
    banner: {
      heading: '',
      sub_heading: "",
      image: ""
    },
  }

  let servicesList = [
    {
      heading: " ",
      description: "",
      images: "",
    }]

  let seoObj = {
    id: 0,
    post_id: pageId || 0,
    meta_title: '',
    meta_description: '',
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
  const [showGallery, setShowGallery] = useState(false)
  const [isSingle, setIsSingle] = useState(true)
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const [selectedLang, setSelectedLang] = useState("en");
  const [servicesListData, setServicesListData] = useState(servicesList);

  useEffect(() => {
    var splitUrl = window.location.href.split('/');
    let route = splitUrl[splitUrl.length - 1]
    LangAPI.get(`/pages/${route}`).then(response => {
      if (response?.status === 200) {
        setPageData(response.data)
        if (response.data.content) {
          setTermsUse(response.data.content);
          setServicesListData(response.data?.content?.content)
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
        setTermsUse({ ...termsUse, [section]: { ...termsUse[section], image: imagesData[index].avatar } })
      }
      if (section == "serviceimage") {
        let upTerm = [...servicesListData]
        upTerm[currentIndex - 1].images = imagesData[index].avatar
        setServicesListData(upTerm)
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
    

    let token = localStorage.getItem("authToken") || ""
    console.log(token, "token")

    let updata = {}
    updata.type = selectedLang
    updata.content = {
      data: servicesListData,
      content: updatedTermsUse
    }

    let obj ={
      banner: updatedTermsUse.banner,
      meta: { ...seoInfo },
      content:servicesListData,
    }

    updatedData.content = obj

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

  const handleEditorValue = (e, index) => {
    let upTerm = [...servicesListData]
    upTerm[index].description = e.editor.getData()
    setServicesListData(upTerm)
  }

  const handleChangeServices = (e, index) => {
    let updatedAbout = [...servicesListData];
    updatedAbout[index][e.target.name] = e.target.value;
    setServicesListData(updatedAbout);
  }

  const handlemanagement = (type, index) => {
    if (type === "delete") {
      let productUp = [...servicesListData];
      productUp.splice(index, 1)
      setServicesListData(productUp)
    }

    if (type === "add") {
      let productUp = [...servicesListData]

      let newPr = {
        heading: " ",
        description: "",
        images: "",
      }

      productUp.push(newPr)
      setServicesListData(productUp)
    }
  };



  return (
    <div>
      <div className={classes.root}>
        <Card>
          <CardHeader color="primary" className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Add Service Page</h4>
            {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
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
                <Typography className={classes.heading}>Services</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={12}>
                    {servicesListData?.map((item, index) => (
                      <Accordion className="accordian-class-custom">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className={classes.heading}>Service # {index + 1}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                              <TextField
                                required
                                id="heading"
                                name="heading"
                                label="Heading"
                                value={item?.heading}
                                variant="outlined"
                                fullWidth
                                onChange={(e) => handleChangeServices(e, index)}
                                size="medium"
                                style={{ marginBottom: '1rem' }}
                              />
                              <Grid xs={12} sm={12}>
                                <p>Detailed Content</p>
                                <CKEditor
                                  config={ckEditorConfig}
                                  onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                                  data={item?.description}
                                  onChange={(e) => handleEditorValue(e, index)} />
                              </Grid>
                              <Grid xs={12} sm={12} style={{ marginBottom: "15px" }}>
                                <div className="thumbnail-preview-wrapper-large img-thumbnail">
                                  {
                                    item.images !== "" ?
                                      <img src={item.images} alt={""} />
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
                                      setCurrentSection("serviceimage");
                                      setShowGallery(true);
                                      setCurrentIndex(index + 1)
                                    }}
                                  >
                                    Upload Image
                                  </MaterialButton>
                                </Fragment>
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <hr />
                                {servicesListData.length > 1 &&
                                  <DeleteOutlined
                                    style={{ cursor: "pointer", fontSize: "30px" }}
                                    titleAccess="Delete Item"
                                    onClick={() => handlemanagement("delete", index)}
                                    color="primary"
                                  />
                                }
                                {index == servicesListData?.length - 1 &&
                                  <AddCircleOutline
                                    style={{ cursor: "pointer", fontSize: "30px" }}
                                    titleAccess="Add item"
                                    onClick={() => handlemanagement("add")}
                                    color="primary"
                                  />
                                }
                              </Grid>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Grid>
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
