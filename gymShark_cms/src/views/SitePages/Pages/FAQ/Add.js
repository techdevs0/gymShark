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
import LangAPI from "langapi/http";
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
import GalleryDialog from "../../../Common/GalleryDialog";
const website_url = "/";

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


export default function FAQPage() {
  const pageId = useParams().id;
  const classes = useStyles();

  let initObj = {
    banner: {
      heading: '',
      sub_heading: "",
      image: ""
    },
    faqData: [
      {
        faqcategory: "",
        faqList: [
          {
            faqQuestion: "",
            faqAnswer: "",
          }
        ],
      }
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
  const [gallery, setGallery] = useState(initObj);
  const [seoInfo, setSeoInfo] = useState(seoObj)
  const [currentSection, setCurrentSection] = useState("")
  const [selectedLang, setSelectedLang] = useState("en");
  const [imagesData, setImagesData] = useState([])
  const [showGallery, setShowGallery] = useState(false)
  const [isSingle, setIsSingle] = useState(true)
  const [pageData, setPageData] = useState({})

  useEffect(() => {
    var splitUrl = window.location.href.split('/');
    let route = splitUrl[splitUrl.length - 1]
    LangAPI.get(`/pages/${route}?${selectedLang}`).then(response => {
      if (response?.status === 200) {
        setPageData(response.data)
        if (response.data.content) {
          setGallery(response.data.content)
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

  const handleInputChange = (e, section) => {
    let updatedAbout = { ...gallery };
    updatedAbout[section][e.target.name] = e.target.value;
    setGallery(updatedAbout);
  }

  const handleImageSelect = (e, index, section) => {
    setTimeout(() => {
      setShowGallery(false);
    }, 500);

    if (e.target.checked) {
      if (section == "banner") {
        setGallery({ ...gallery, [section]: { ...gallery[section], image: imagesData[index].avatar } })
      }
    } else {
      setGallery({ ...gallery, [section]: { ...gallery[section], section_avatar: "" } })

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

    let updatedTermsUse = { ...gallery };
    updatedTermsUse.meta = { ...seoInfo };
    let updatedData = { ...pageData }
    updatedData.content = updatedTermsUse
    let token = localStorage.getItem("authToken") || ""
    console.log(token, "token")
    return false;
    LangAPI.post(`/pages`, updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      console.log(response);
      if (response.status === 200) {
        alert("Record Updated");
      }
    }).catch(err => alert("Something went wrong"));
  }

  const handleChange = (event) => {
    if (event.target.value != selectedLang) {
      setSelectedLang(event.target.value)
    }
  };


  return (
    <div>
      <div className={classes.root}>
        <Card>
          <CardHeader color="primary" className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Add FAQ Page</h4>
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
                      value={gallery?.banner?.heading}
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
                      value={gallery?.banner?.sub_heading}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => handleInputChange(e, "banner")}
                      size="medium"
                      style={{ marginBottom: '1rem' }}
                    />

                    <div className="thumbnail-preview-wrapper-large img-thumbnail">
                      {
                        gallery?.banner?.image !== "" ?
                          <img src={gallery?.banner?.image} alt={""} />
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
