import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from '@material-ui/core/Grid';
import MaterialButton from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import SelectedImagesThumbnails from "../../../Common/SelectedImagesThumbnails";
import {
  MenuItem,
  Select,
  FormControl,
  TextField,
  RadioGroup, FormControlLabel, Radio
} from "@material-ui/core";
import CKEditor from 'ckeditor4-react';
import { ckEditorConfig } from "utils/data";
import { AddCircleOutline, DeleteOutlined } from "@material-ui/icons";
import { Image } from "@material-ui/icons";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useParams } from "react-router-dom";
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


export default function AddResourcesPage() {
  const pageId = useParams().id;
  const classes = useStyles();

  let initObj = {
    banner: {
      heading: '',
      sub_heading: "",
      image: ""
    },
    projectReferences: [
      {
        heading: "",
        sub_heading: "",
        description: "",
        image: "",
        btn_url: "",
      }
    ],
    planingIdeas: [
      {
        title: "",
        sub_title: "",
        image: "",
        btn_url: "",
      }
    ],
    brochures: [
      {
        categorie: "",
        categorieBrochures: [
          {
            title: "",
            sub_title: "",
            image: "",
          },
        ],
      }
    ],
    fabricFinished: {
      title: "",
      sub_title: "",
      description: "",
      fabricFinished_images: [],
    }
  }

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
  const [currentIndex2, setCurrentIndex2] = useState(0)
  const [pageData, setPageData] = useState({})
  const [imagesData, setImagesData] = useState([])
  const [showGallery, setShowGallery] = useState(false)
  const [isSingle, setIsSingle] = useState(true)
  const [selectedLang, setSelectedLang] = useState("en");
  const [categories2, setCategories] = useState([]);
  const [uploadsPreview, setUploadsPreview] = useState(null);

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
    }).catch(err => console.log(err));

    LangAPI.get(`/categories?lang=${selectedLang}`).then((response) => {
      if (response.status === 200) {
        if (response?.data) {
          setCategories(response?.data);
        }
      }
    });

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

    if (e.target.checked) {
      if (section == "banner") {
        setTermsUse({ ...termsUse, [section]: { ...termsUse[section], image: imagesData[index].avatar } })

        setTimeout(() => {
          setShowGallery(false);
        }, 500);

      }
      if (section == "projectReferencesImg") {
        let upTerm = { ...termsUse }
        upTerm.projectReferences[currentIndex - 1].image = imagesData[index].avatar
        setTermsUse(upTerm)
        setCurrentIndex(0)
        setTimeout(() => {
          setShowGallery(false);
        }, 500);

      }
      if (section == "planingIdeasImg") {
        let upTerm = { ...termsUse }
        upTerm.planingIdeas[currentIndex - 1].image = imagesData[index].avatar
        setTermsUse(upTerm)
        setCurrentIndex(0)
        setTimeout(() => {
          setShowGallery(false);
        }, 500);

      }
      if (section == "BrochuresImg") {
        let upTerm = { ...termsUse }
        upTerm.brochures[currentIndex - 1].categorieBrochures[currentIndex2 - 1].image = imagesData[index].avatar
        setTermsUse(upTerm)
        setCurrentIndex(0)
        setCurrentIndex2(0)
        setTimeout(() => {
          setShowGallery(false);
        }, 500);

      }
      if (section == "fabricFinished_images") {

        let upTerm = { ...termsUse };
        // if (!upTerm?.fabricFinished?.fabricFinished_images) {
        //   upTerm.fabricFinished.fabricFinished_images = []
        // }
        upTerm.fabricFinished.fabricFinished_images.push({ avatar: imagesData[index].avatar, id: imagesData[index].id, url: imagesData[index].url, is_default: false });
        setTermsUse(upTerm);

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
    // console.log(updatedData, " :: updatedData");
    // return false;
    LangAPI.post(`/pages`, updatedData, {
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

  const handleInputProjectReferencesChange = (e, index = -1) => {
    let updatedprojectReferences = { ...termsUse };
    updatedprojectReferences.projectReferences[index][e.target.name] = e.target.value;
    setTermsUse(updatedprojectReferences);
  }

  const handleProjectReferencesEditorValue = (e, index) => {
    let upTerm = { ...termsUse }
    upTerm.projectReferences[index].description = e.editor.getData()
    setTermsUse(upTerm)
  }

  const handleProjectReferences = (type, index) => {
    if (type === "delete") {
      let productUp = { ...termsUse }
      productUp.projectReferences.splice(index, 1)
      setTermsUse(productUp)
    }

    if (type === "add") {
      let productUp = { ...termsUse }

      let newPr = {
        heading: "",
        sub_heading: "",
        description: "",
        image: "",
        btn_url: "",
      }
      productUp.projectReferences.push(newPr)
      setTermsUse(productUp)
    }
  };

  const handleInputPlaningIdeasChange = (e, index = -1) => {
    let updatedplaningIdeas = { ...termsUse };
    updatedplaningIdeas.planingIdeas[index][e.target.name] = e.target.value;
    setTermsUse(updatedplaningIdeas);
  }

  const handlePlaningIdeas = (type, index) => {
    if (type === "delete") {
      let productUp = { ...termsUse }
      productUp.planingIdeas.splice(index, 1)
      setTermsUse(productUp)
    }

    if (type === "add") {
      let productUp = { ...termsUse }

      let newPr = {
        title: "",
        sub_title: "",
        image: "",
        btn_url: "",
      }
      productUp.planingIdeas.push(newPr)
      setTermsUse(productUp)
    }
  };

  const handleInputBrochuresChange = (e, index, index2 = -1) => {
    let updatedbrochures = { ...termsUse };
    updatedbrochures.brochures[index].categorieBrochures[index2][e.target.name] = e.target.value;
    setTermsUse(updatedbrochures);
  }

  const handleBrochures = (type, index) => {
    if (type === "delete") {
      let productUp = { ...termsUse }
      productUp.brochures.splice(index, 1)
      setTermsUse(productUp)
    }

    if (type === "add") {
      let productUp = { ...termsUse }

      let newPr = {
        categorie: "",
        categorieBrochures: [
          {
            title: "",
            sub_title: "",
            image: "",
          }
        ]
      }
      productUp.brochures.push(newPr)
      setTermsUse(productUp)
    }
  };

  const handleBrochuresItem = (type, index, index2) => {
    if (type === "delete") {
      let productUp = { ...termsUse }
      productUp.brochures[index].categorieBrochures.splice(index2, 1)
      setTermsUse(productUp)
    }

    if (type === "add") {
      let productUp = { ...termsUse }
      let newPr = {
        title: "",
        sub_title: "",
        image: "",
      }
      productUp.brochures[index].categorieBrochures.push(newPr)
      setTermsUse(productUp)
    }
  };

  const handleChangeCategory = (e, index) => {
    let updatecategorie = { ...termsUse }
    updatecategorie.brochures[index][e.target.name] = e.target.value
    setTermsUse(updatecategorie)
  };

  const handleInputFabricFinishedChange = (e) => {
    let updatedfabricFinished = { ...termsUse };
    updatedfabricFinished.fabricFinished[e.target.name] = e.target.value;
    setTermsUse(updatedfabricFinished);
  }

  const handleEditorValue = (e, obj, valueName) => {
    let upTerm = { ...termsUse }
    upTerm[obj][valueName] = e.editor.getData()
    setTermsUse(upTerm)
  }

  const handleRemoveSelectedImage = (x, arrayListType) => {
    switch (arrayListType) {
      case "fabricFinished_images":

        let updateDataPromotional = termsUse?.fabricFinished?.fabricFinished_images.filter((u) => u.id !== x.id);
        let updata = { ...termsUse }
        updata.fabricFinished.fabricFinished_images = updateDataPromotional
        setTermsUse(updata);

        break;
      default:
        return setUploadsPreview(uploadsPreview.filter((u) => u.id !== x.id))
    }
  }

  return (
    <div>
      <div className={classes.root}>
        <Card>
          <CardHeader color="primary" className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Resources Page</h4>
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
                <Typography className={classes.heading}>Project References</Typography>
              </AccordionSummary>
              <AccordionDetails className="accordian-flex-column">
                {termsUse?.projectReferences?.map((item, index) => (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>Item # {index + 1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              id="heading"
                              name="heading"
                              label="Heading"
                              value={item?.heading}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => handleInputProjectReferencesChange(e, index)}
                              size="medium"
                              style={{ marginBottom: '1rem' }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              id="sub_heading"
                              name="sub_heading"
                              label="Sub Heading"
                              value={item?.sub_heading}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => handleInputProjectReferencesChange(e, index)}
                              size="medium"
                              style={{ marginBottom: '1rem' }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextField
                              required
                              id="btn_url"
                              name="btn_url"
                              label="Button URL"
                              value={item?.btn_url}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => handleInputProjectReferencesChange(e, index)}
                              size="medium"
                              style={{ marginBottom: '1rem' }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <p>Detailed Content</p>
                            <CKEditor
                              config={ckEditorConfig}
                              onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                              data={item.description}
                              onChange={(e) => handleProjectReferencesEditorValue(e, index)} />
                          </Grid>
                          <Grid item xs={12} sm={12} style={{ marginBottom: "15px" }}>
                            <div className="thumbnail-preview-wrapper-large img-thumbnail">
                              {
                                item.image !== "" ?
                                  <img src={item.image} alt={""} />
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
                                  setCurrentSection("projectReferencesImg");
                                  setCurrentIndex(index + 1)
                                  setShowGallery(true);
                                }}
                              >
                                Upload Image
                              </MaterialButton>
                            </Fragment>
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <hr />
                            {termsUse?.projectReferences.length > 1 &&
                              <DeleteOutlined
                                style={{ cursor: "pointer", fontSize: "30px" }}
                                titleAccess="Delete Item"
                                onClick={() => handleProjectReferences("delete", index)}
                                color="primary"
                              />
                            }
                            {index == termsUse?.projectReferences?.length - 1 &&
                              <AddCircleOutline
                                style={{ cursor: "pointer", fontSize: "30px" }}
                                titleAccess="Add item"
                                onClick={() => handleProjectReferences("add")}
                                color="primary"
                              />
                            }
                          </Grid>
                        </>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panelaa-content"
                id="panelaa-header"
              >
                <Typography className={classes.heading}>Planing Ideas</Typography>
              </AccordionSummary>
              <AccordionDetails className="accordian-flex-column">
                {termsUse?.planingIdeas?.map((item, index) => (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>Item # {index + 1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              id="title"
                              name="title"
                              label="Heading"
                              value={item?.title}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => handleInputPlaningIdeasChange(e, index)}
                              size="medium"
                              style={{ marginBottom: '1rem' }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              id="sub_title"
                              name="sub_title"
                              label="Sub Heading"
                              value={item?.sub_title}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => handleInputPlaningIdeasChange(e, index)}
                              size="medium"
                              style={{ marginBottom: '1rem' }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextField
                              required
                              id="btn_url"
                              name="btn_url"
                              label="Button URL"
                              value={item?.btn_url}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => handleInputPlaningIdeasChange(e, index)}
                              size="medium"
                              style={{ marginBottom: '1rem' }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} style={{ marginBottom: "15px" }}>
                            <div className="thumbnail-preview-wrapper-large img-thumbnail">
                              {
                                item.image !== "" ?
                                  <img src={item.image} alt={""} />
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
                                  setCurrentSection("planingIdeasImg");
                                  setCurrentIndex(index + 1)
                                  setShowGallery(true);
                                }}
                              >
                                Upload Image
                              </MaterialButton>
                            </Fragment>
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <hr />
                            {termsUse?.planingIdeas.length > 1 &&
                              <DeleteOutlined
                                style={{ cursor: "pointer", fontSize: "30px" }}
                                titleAccess="Delete Item"
                                onClick={() => handlePlaningIdeas("delete", index)}
                                color="primary"
                              />
                            }
                            {index == termsUse?.planingIdeas?.length - 1 &&
                              <AddCircleOutline
                                style={{ cursor: "pointer", fontSize: "30px" }}
                                titleAccess="Add item"
                                onClick={() => handlePlaningIdeas("add")}
                                color="primary"
                              />
                            }
                          </Grid>
                        </>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panelaa-content"
                id="panelaa-header"
              >
                <Typography className={classes.heading}>Brochures</Typography>
              </AccordionSummary>
              <AccordionDetails className="accordian-flex-column">
                {termsUse?.brochures?.map((item, index) => (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>{item.categorie !== "" ? item.categorie : `Item #${index + 1}`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <>
                          <Grid item xs={12} sm={6}>
                            <FormControl
                              variant="outlined"
                              size="small"
                              style={{ width: "100%", color: "#000" }}
                            >
                              <InputLabel id="language"
                                style={{ color: "#000" }}
                              >Select Categorie</InputLabel>
                              <Select
                                labelId="Categorie"
                                id="categorie"
                                name="categorie"
                                value={item.categorie}
                                label="Select Categorie"
                                fullWidth
                                style={{ color: "#000" }}
                                onChange={(e) => handleChangeCategory(e, index)}
                              >
                                {categories2?.map((name) => (
                                  <MenuItem key={name.id} value={name.name}>{name.name}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          {item?.categorieBrochures?.map((item2, index2) => (
                            <Accordion className="accordian-class-custom">
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography className={classes.heading}>Item # {index2 + 1}</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Grid container spacing={2}>
                                  <>
                                    <Grid item2 xs={12} sm={6}>
                                      <TextField
                                        required
                                        id="title"
                                        name="title"
                                        label="Heading"
                                        value={item2?.title}
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => handleInputBrochuresChange(e, index, index2)}
                                        size="medium"
                                        style={{ marginBottom: '1rem' }}
                                      />
                                    </Grid>
                                    <Grid item2 xs={12} sm={6}>
                                      <TextField
                                        required
                                        id="sub_title"
                                        name="sub_title"
                                        label="Sub Heading"
                                        value={item2?.sub_title}
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => handleInputBrochuresChange(e, index, index2)}
                                        size="medium"
                                        style={{ marginBottom: '1rem' }}
                                      />
                                    </Grid>
                                    <Grid item2 xs={12} sm={12} style={{ marginBottom: "15px" }}>
                                      <div className="thumbnail-preview-wrapper-large img-thumbnail">
                                        {
                                          item2.image !== "" ?
                                            <img src={item2.image} alt={""} />
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
                                            setCurrentSection("BrochuresImg");
                                            setCurrentIndex(index + 1)
                                            setCurrentIndex2(index2 + 1);
                                            setShowGallery(true);
                                          }}
                                        >
                                          Upload Image
                                        </MaterialButton>
                                      </Fragment>
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                      <hr />
                                      {item.categorieBrochures.length > 1 &&
                                        <DeleteOutlined
                                          style={{ cursor: "pointer", fontSize: "30px" }}
                                          titleAccess="Delete Item"
                                          onClick={() => handleBrochuresItem("delete", index, index2)}
                                          color="primary"
                                        />
                                      }
                                      {index2 == item?.categorieBrochures?.length - 1 &&
                                        <AddCircleOutline
                                          style={{ cursor: "pointer", fontSize: "30px" }}
                                          titleAccess="Add item"
                                          onClick={() => handleBrochuresItem("add", index)}
                                          color="primary"
                                        />
                                      }
                                    </Grid>
                                  </>
                                </Grid>
                              </AccordionDetails>
                            </Accordion>
                          ))}

                          <Grid item xs={12} sm={12}>
                            <hr />
                            {termsUse?.brochures.length > 1 &&
                              <DeleteOutlined
                                style={{ cursor: "pointer", fontSize: "30px" }}
                                titleAccess="Delete Item"
                                onClick={() => handleBrochures("delete", index)}
                                color="primary"
                              />
                            }
                            {index == termsUse?.brochures?.length - 1 &&
                              <AddCircleOutline
                                style={{ cursor: "pointer", fontSize: "30px" }}
                                titleAccess="Add item"
                                onClick={() => handleBrochures("add")}
                                color="primary"
                              />
                            }
                          </Grid>
                        </>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panelaa-content"
                id="panelaa-header"
              >
                <Typography className={classes.heading}>Fabric And Finished</Typography>
              </AccordionSummary>
              <AccordionDetails className="accordian-flex-column">
                <Grid container spacing={2}>
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="title"
                        name="title"
                        label="Heading"
                        value={termsUse?.fabricFinished?.title}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleInputFabricFinishedChange(e)}
                        size="medium"
                        style={{ marginBottom: '1rem' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="sub_title"
                        name="sub_title"
                        label="Sub Heading"
                        value={termsUse?.fabricFinished?.sub_title}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleInputFabricFinishedChange(e)}
                        size="medium"
                        style={{ marginBottom: '1rem' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <p>Detailed Content</p>
                      <CKEditor
                        config={ckEditorConfig}
                        onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                        data={termsUse?.fabricFinished?.description}
                        onChange={(e) => handleEditorValue(e, 'fabricFinished', 'description')}
                      />
                    </Grid>
                    <Card>
                      <CardBody>
                        <h3>Fabric Images</h3>
                        <p>
                          <em>Please select images from gallery.</em>
                        </p>
                        <Grid container spacing={2}>
                          <Grid xs={12} sm={12}>
                            <MaterialButton
                              variant="outlined"
                              color="primary"
                              onClick={() => {
                                setIsSingle(true);
                                setShowGallery(true);
                                setCurrentSection("fabricFinished_images")
                                setImagesData(imagesData)
                              }}
                            >
                              Select Gallery Images
                            </MaterialButton>
                          </Grid>
                          {termsUse?.fabricFinished?.fabricFinished_images?.map((x) => (
                            <SelectedImagesThumbnails
                              x={x}
                              handleRemoveSelectedImage={(r) => handleRemoveSelectedImage(r, "fabricFinished_images")}
                            />
                          ))}
                          <div className="clearfix clear-fix"></div>
                          {/* GALLERY DIALOG BOX START */}
                          <GalleryDialog
                            isSingle={isSingle}
                            open={showGallery}
                            handleImageSelect={handleImageSelect}
                            handleClose={() => {
                              setShowGallery(false);
                              setUploadsPreview([])
                            }}
                            refreshGallery={getGalleryImages}
                            data={imagesData}
                            selectedData={termsUse?.fabricFinished?.images}
                          />
                          {/* GALLERY DIALOG BOX END */}
                        </Grid>
                      </CardBody>
                    </Card>
                  </>
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
