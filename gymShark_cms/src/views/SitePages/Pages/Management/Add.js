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
import SelectedImagesThumbnails from "../../../Common/SelectedImagesThumbnails";
// import SelectedImagesThumbnails from "....//Common/SelectedImagesThumbnails";

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


export default function AddManagementPage() {
  const pageId = useParams().id;
  const classes = useStyles();

  let initObj = {
    banner: {
      heading: '  ',
      sub_heading: "  ",
      image: ""
    },
    sliders: [''],
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

  let initManObj = [
    {
      name: "  ",
      applications: [
        {
          heading: "  ",
          sub_heading: "  ",
          description: "  ",
          images: [],
          shopableImg: ""
        }
      ]
    }
  ]

  const [termsUse, setTermsUse] = useState(initObj);
  const [seoInfo, setSeoInfo] = useState(seoObj)
  const [currentSection, setCurrentSection] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentIndex2, setCurrentIndex2] = useState(0)
  const [imageType, setImageType] = useState("")
  const [pageData, setPageData] = useState({})

  const [imagesData, setImagesData] = useState([])
  const [imagesDataBackup, setImagesDataBackup] = useState([]);
  // const [uploadsPreview, setUploadsPreview] = useState(null)
  // const [selectedImages, setSelectedImages] = useState([])
  const [showGallery, setShowGallery] = useState(false)
  const [isSingle, setIsSingle] = useState(true)
  // const [renderPreviews, setRenderPreviews] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const [selectedLang, setSelectedLang] = useState("top-management");
  const [managementData, setManagementData] = useState(initManObj);

  useEffect(() => {
    var splitUrl = window.location.href.split('/');
    let route = splitUrl[splitUrl.length - 1]
    // LangAPI.get(`/pages/${route}`).then(response => {
    //   if (response?.status === 200) {
    //     setPageData(response.data)
    //     if (response.data.content) {
    //       console.log(response.data.content, "response.data.content,130")
    //       setTermsUse(response.data.content)
    //       if (response.data.content.meta) {
    //         setSeoInfo(response.data.content.meta)
    //       }

    //     }

    //   }
    // }).catch(err => console.log(err));



    if (!imagesData.length > 0) {
      getGalleryImages();
    }
  }, []);

  useEffect(() => {
    var splitUrl = window.location.href.split('/');
    let route = splitUrl[splitUrl.length - 1]
    LangAPI.get(`/managements/${selectedLang}`).then(response => {
      if (response?.status === 200) {

        if (response.data.content) {
          setManagementData(response.data?.content?.data)
          setTermsUse(response.data?.content?.content)
        } else {
          setTermsUse(initObj);
          setManagementData(initManObj)
        }

      }
    }).catch(err => {
      console.log(err)
      setTermsUse(initObj);
      setManagementData(initManObj)
    });

    if (!imagesData.length > 0) {
      getGalleryImages();
    }
  }, [selectedLang]);

  const getGalleryImages = () => {
    LangAPI.get(`/uploads`).then((response) => {
      if (response.status === 200) {
        setImagesData(response.data?.data?.map((x) => ({ ...x, isChecked: false })));
        setImagesDataBackup(response.data?.data?.map((x) => ({ ...x, isChecked: false })));
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

  const handleChangeApplication = (e, index, index2 = -1) => {
    let updatedAbout = [...managementData];
    updatedAbout[index].applications[index2][e.target.name] = e.target.value;
    setManagementData(updatedAbout);
  }

  const handleInputManagementChange = (e, index = -1) => {
    let updatedAbout = [...managementData];
    updatedAbout[index][e.target.name] = e.target.value;
    setManagementData(updatedAbout);
  }

  const handleRemoveSelectedImage = (x, arrayListType, index, index2) => {
    switch (arrayListType) {
      case "applicationListing":
        let updateDataVariation = managementData[index]?.applications[index2].images?.filter((u) => u.id !== x.id);
        let updata = [...managementData]
        updata[index].applications[index2].images = updateDataVariation
        setManagementData(updata);
        break;

    }
  }

  const handleImageSelect = (e, index, section) => {

    if (e.target.checked) {
      if (section == "banner") {
        setTermsUse({ ...termsUse, [section]: { ...termsUse[section], image: imagesData[index].avatar } })
        setTimeout(() => {
          setShowGallery(false);
        }, 500);

      }

      if (section == "sliders") {
        let upTerm = { ...termsUse }
        upTerm[section][currentIndex - 1] = imagesData[index].avatar
        setTermsUse(upTerm)
        setCurrentIndex(0)
        setTimeout(() => {
          setShowGallery(false);
        }, 500);

      }
      if (section == "shopableimg") {
        let upTerm = [...managementData]
        upTerm[currentIndex - 1].applications[currentIndex2 - 1].shopableImg = imagesData[index].avatar
        setManagementData(upTerm)
        setCurrentIndex(0)
        setCurrentIndex2(0)
        setTimeout(() => {
          setShowGallery(false);
        }, 500);

      }
      if (section == "applicationListing") {

        let upTerm = [...managementData];
        if (!upTerm[currentIndex - 1].applications[currentIndex2 - 1].images) {
          upTerm[currentIndex - 1].applications[currentIndex2 - 1].images = []
        }
        upTerm[currentIndex - 1].applications[currentIndex2 - 1].images.push({ avatar: imagesData[index].avatar, id: imagesData[index].id, url: imagesData[index].url, is_default: false });
        setManagementData(upTerm);

        setImagesData(imagesData.map((x, i) => {
          if (i === index) {
            return {
              ...x,
              isChecked: true
            }
          } else {
            return x
          }
        }));

      }

    } else {
      if (section == "applicationListing") {
        let updateData = [...managementData];
        let images = updateData[currentIndex - 1].applications[currentIndex2 - 1].images?.filter((u) => u.id !== imagesData[index].id);
        updateData[currentIndex - 1].applications[currentIndex2 - 1].images = images
        setManagementData(updateData)
      }
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
    updatedData.content = updatedTermsUse;
    let token = localStorage.getItem("authToken") || ""

    let updata = {}
    updata.type = selectedLang
    updata.content = {
      data: managementData,
      content: updatedTermsUse
    }
    // updata.content. = managementData
    // console.log("updatedData", updata); return false

    LangAPI.post(`/managements`, updata, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      // console.log(response);
      if (response.status === 200) {
        alert("Record Updated");
      }
    }).catch(err => alert("Something went wrong"));
  }

  const handleChange = (event) => {
    // setAge(event.target.value as string);
    if (event.target.value != selectedLang) {
      setSelectedLang(event.target.value)
    }
  };

  const handleSliders = (type, index) => {
    if (type === "delete") {
      let productUp = { ...termsUse }
      productUp.sliders.splice(index, 1)
      setTermsUse(productUp)
    }

    if (type === "add") {
      let productUp = { ...termsUse }
      productUp.sliders.push("")
      setTermsUse(productUp)
    }
  };

  const handleApplications = (type, index, index2) => {
    if (type === "delete") {
      let productUp = [...managementData]
      productUp[index].applications.splice(index2, 1)
      setManagementData(productUp)
    }

    if (type === "add") {
      let productUp = [...managementData]
      let obj = {
        heading: "",
        sub_heading: "",
        description: "",
        images: "",
        shopableImg: ""
      }
      productUp[index].applications.push(obj)
      setManagementData(productUp)
    }
  };


  const handlemanagement = (type, index) => {
    if (type === "delete") {
      let productUp = [...managementData]
      productUp.splice(index, 1)
      setManagementData(productUp)
    }

    if (type === "add") {
      let productUp = [...managementData]

      let newPr = {
        name: "",
        applications: [
          {
            heading: "",
            sub_heading: "",
            description: "",
            images: "",
            shopableImg: ""
          }
        ]
      }
      productUp.push(newPr)
      setManagementData(productUp)
    }
  };

  const handleEditorValue = (e, index, index2) => {
    let upTerm = [...managementData]
    upTerm[index].applications[index2].description = e.editor.getData()
    setManagementData(upTerm)
  }
  return (
    <div>
      <div className={classes.root}>
        <Card>
          <CardHeader color="primary" className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Management Page</h4>
            {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            <FormControl
              variant="outlined"
              size="small"
              style={{ width: "20%", color: "white" }}
            // fullWidth
            >
              <InputLabel id="language"
                style={{ color: "white" }}
              >Select Type</InputLabel>
              <Select
                labelId="type"
                id="type"
                name="type"
                value={selectedLang}
                label="Select type"
                fullWidth
                style={{ color: "white" }}
                onChange={handleChange}
              >
                <MenuItem value={'top-management'}>{'Top Management'}</MenuItem>
                <MenuItem value={'senior-management'}>{'Senior Management'}</MenuItem>
                <MenuItem value={'majlis-area'}>{'Majlis Soft Seating'}</MenuItem>
                <MenuItem value={'management-desk-and-chairs'}>{'Management Desk'}</MenuItem>
                <MenuItem value={'workstation-and-desks'}>{'Workstation & Desks'}</MenuItem>
                <MenuItem value={'executive-chairs'}>{'Executive Chairs'}</MenuItem>
                <MenuItem value={'boardroom'}>{'Boardroom'}</MenuItem>
                <MenuItem value={'meeting-rooms'}>{'Meeting Rooms'}</MenuItem>
                <MenuItem value={'executive-sofa'}>{'Executive Sofa'}</MenuItem>
                <MenuItem value={'task-chairs'}>{'Task Chairs'}</MenuItem>
                <MenuItem value={'collaborative-and-public-seating'}>{'Modular & Collaborative Seating'}</MenuItem>
                <MenuItem value={'training-area-and-pantry-area'}>{'Training Area & Pantry Area'}</MenuItem>
              </Select>
            </FormControl>

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
                      value={termsUse?.banner?.heading}
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
                      value={termsUse?.banner?.sub_heading}
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
                          setImagesData(imagesDataBackup)
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
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Sliders</Typography>
              </AccordionSummary>
              <AccordionDetails className="accordian-flex-column">
                {termsUse?.sliders?.map((item, index) => (
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
                          <Grid item xs={12} sm={6} style={{ marginBottom: "15px" }}>
                            <div className="thumbnail-preview-wrapper-large img-thumbnail">
                              {
                                item !== "" ?
                                  <img src={item} alt={""} />
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
                                  setCurrentSection("sliders");
                                  setCurrentIndex(index + 1)
                                  setShowGallery(true);
                                  setImagesData(imagesDataBackup)
                                }}
                              >
                                Upload Main Image
                              </MaterialButton>
                            </Fragment>
                          </Grid>

                          <Grid item xs={12} sm={12}>
                            <hr />
                            {termsUse?.sliders.length > 1 &&
                              <DeleteOutlined
                                style={{ cursor: "pointer", fontSize: "30px" }}
                                titleAccess="Delete Item"
                                onClick={() => handleSliders("delete", index)}
                                color="primary"
                              />
                            }
                            {index == termsUse?.sliders?.length - 1 &&
                              <AddCircleOutline
                                style={{ cursor: "pointer", fontSize: "30px" }}
                                titleAccess="Add item"
                                onClick={() => handleSliders("add")}
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
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Managements</Typography>
              </AccordionSummary>
              <AccordionDetails className="accordian-flex-column">
                {managementData?.map((item, index) => (
                  <Grid container spacing={2}>
                    <>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          required
                          id="name"
                          name="name"
                          label="Heading Image1"
                          value={item?.name}
                          variant="outlined"
                          fullWidth
                          onChange={(e) => handleInputManagementChange(e, index)}
                          size="medium"
                          style={{ marginBottom: '1rem' }}
                        />
                      </Grid>
                      {item.applications?.map((item2, index2) => (
                        <Accordion className="accordian-class-custom">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>Application # {index2 + 1}</Typography>
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
                                    id="heading"
                                    name="heading"
                                    label="Heading"
                                    value={item2?.heading}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => handleChangeApplication(e, index, index2)}
                                    size="medium"
                                    style={{ marginBottom: '1rem' }}
                                  />
                                  <TextField
                                    required
                                    id="sub_heading"
                                    name="sub_heading"
                                    label="Sub Heading"
                                    value={item2?.sub_heading}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => handleChangeApplication(e, index, index2)}
                                    size="medium"
                                    style={{ marginBottom: '1rem' }}
                                  />

                                </Grid>
                                <Grid item xs={12} sm={12}>
                                  <p>Detailed Content</p>
                                  <CKEditor
                                    config={ckEditorConfig}
                                    onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                                    data={item2?.description}
                                    onChange={(e) => handleEditorValue(e, index, index2)} />
                                </Grid>

                                <Grid item xs={12} sm={12} style={{ marginBottom: "15px" }}>
                                  <div className="thumbnail-preview-wrapper-large img-thumbnail">
                                    {
                                      item2.shopableImg !== "" ?
                                        <img src={item2.shopableImg} alt={""} />
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
                                        setCurrentSection("shopableimg");
                                        setCurrentIndex(index + 1)
                                        setCurrentIndex2(index2 + 1)
                                        setImageType("list")
                                        setShowGallery(true);
                                        setImagesData(imagesDataBackup)
                                      }}
                                    >
                                      Upload shopable Image
                                    </MaterialButton>
                                  </Fragment>
                                </Grid>
                                <Card>
                                  <CardBody>
                                    <h3>Application Images</h3>
                                    <p>
                                      <em>Please select images from gallery.</em>
                                    </p>
                                    <Grid container spacing={2}>
                                      <Grid item xs={12} sm={12}>
                                        <MaterialButton
                                          variant="outlined"
                                          color="primary"
                                          onClick={() => {
                                            setIsSingle(false);
                                            setShowGallery(true);
                                            setCurrentSection("applicationListing");
                                            setCurrentIndex(index + 1);
                                            setCurrentIndex2(index2 + 1);
                                            // setImagesData(imagesData);
                                            setImagesData(imagesDataBackup)
                                          }}
                                        >
                                          Select Gallery Images
                                        </MaterialButton>
                                      </Grid>
                                      {item2?.images &&
                                        item2?.images?.map((x) => (
                                          <SelectedImagesThumbnails x={x} handleRemoveSelectedImage={(r) => handleRemoveSelectedImage(r, "applicationListing", index, index2)} />
                                        ))}
                                      <div className="clearfix clear-fix"></div>
                                      {/* GALLERY DIALOG BOX START */}
                                      <GalleryDialog
                                        isSingle={isSingle}
                                        open={showGallery}
                                        handleImageSelect={handleImageSelect}
                                        handleClose={() => {
                                          setShowGallery(false);
                                        }}
                                        refreshGallery={getGalleryImages}
                                        data={imagesData}
                                        selectedData={item2.images}
                                      />
                                      {/* GALLERY DIALOG BOX END */}
                                    </Grid>
                                  </CardBody>
                                </Card>

                                <Grid item xs={12} sm={12}>
                                  <hr />
                                  {item.applications.length > 1 &&
                                    <DeleteOutlined
                                      style={{ cursor: "pointer", fontSize: "30px" }}
                                      titleAccess="Delete Item"
                                      onClick={() => handleApplications("delete", index, index2)}
                                      color="primary"
                                    />
                                  }
                                  {index2 == item.applications?.length - 1 &&
                                    <AddCircleOutline
                                      style={{ cursor: "pointer", fontSize: "30px" }}
                                      titleAccess="Add item"
                                      onClick={() => handleApplications("add", index)}
                                      color="primary"
                                    />
                                  }
                                </Grid>
                              </>

                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      ))}

                      {/* <Grid item xs={12} sm={12}>
                            <hr />
                            {managementData.length > 1 &&
                              <DeleteOutlined
                                style={{ cursor: "pointer", fontSize: "30px" }}
                                titleAccess="Delete Item"
                                onClick={() => handlemanagement("delete", index)}
                                color="primary"
                              />
                            }
                            {index == managementData?.length - 1 &&
                              <AddCircleOutline
                                style={{ cursor: "pointer", fontSize: "30px" }}
                                titleAccess="Add item"
                                onClick={() => handlemanagement("add")}
                                color="primary"
                              />
                            }
                          </Grid> */}
                    </>
                  </Grid>
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
