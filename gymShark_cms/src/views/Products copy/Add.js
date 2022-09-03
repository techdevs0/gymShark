import React, { Fragment, useEffect, useState } from "react"; //Suspense
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import MaterialButton from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import CKEditor from "ckeditor4-react";
import LangAPI from "langapi/http";
import SelectedImagesThumbnails from "../Common/SelectedImagesThumbnails";
import Checkbox from '@material-ui/core/Checkbox';
import { useParams, withRouter, useLocation } from "react-router-dom";
import GalleryDialog from "views/Common/GalleryDialog";
// import productssSuites from "views/SitePages/Pages/productssSuites/Add";

import { AddCircleOutline, DeleteOutlined, CancelOutlined, Image } from "@material-ui/icons";

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

export default withRouter(function AddProduct(props) {
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const lang = query.get('lang');
  const classes = useStyles();
  let { id } = useParams();

  const initialObject = {
    name: "",
    short_description: "",
    featured_image: "",
    route: "",
    long_description: "",
    shiping_and_return: "",
    category_id: "",
    related_categories: [],
    brand: "",
    album: [],
    download: "",
    promotional_images: [],
    variations: [
      {
        code: "",
        lc_code: "",
        cbm: "",
        in_stock: "1",
        upper_price: "",
        lower_price: "",
        height: "",
        depth: "",
        width: "",
        description: "",
        images: [],
        variationItems: [""],
      }
    ],
    footrest: [""],
    headrest: [""],
    seo: {
      meta_title: "",
      meta_description: "",
      schema_markup: "",
    },
  };
  const [products, setProducts] = useState({ ...initialObject });

  const [isEdit, setIsEdit] = useState(false);

  const [imagesData, setImagesData] = useState([]);
  const [imagesDataBackup, setImagesDataBackup] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [isSingle, setIsSingle] = useState(false);
  const [isAuthorImg, setIsAuthorImg] = useState(false);
  const [selectedLang, setSelectedLang] = useState(lang || "en");
  const [isBanner, setIsBanner] = useState(false);
  const [uploadsPreview, setUploadsPreview] = useState(null);
  const [isImagesList, setImagesList] = useState(false);
  const [imageType, setImageType] = useState("");
  const [activeVariationIndex, setActiveVariationIndex] = useState(-1);
  const [variations2, setVariations] = useState([]);
  const [categories2, setCategories] = useState([]);


  const names = [
    { id: 1, name: 'Oliver Hansen' },
    { id: 2, name: 'April Tucker' },
    { id: 3, name: 'Ralph Hubbard' },
    { id: 4, name: 'Omar Alexander' },
    { id: 5, name: 'Carlos Abbott' },
    { id: 6, name: 'Kelly Snyder' },
    { id: 7, name: 'Virginia Andrews' },
    { id: 8, name: 'Bradley Wilkerson' },
    { id: 9, name: 'Miriam Wagner' },
  ];

  const variations = [
    {
      id: "1234",
      name: "a",
      items: [
        {
          id: "432",
          name: "a-1"
        },
        {
          id: "433",
          name: "a-2"
        },
        {
          id: "434",
          name: "a-3"
        },
      ]
    },
    {
      id: "2",
      name: "b",
      items: [
        {
          id: "2",
          name: "a-1"
        },
        {
          id: "433",
          name: "a-2"
        },
        {
          id: "434",
          name: "a-3"
        },
      ]
    },
    {
      id: "1236",
      name: "c",
      items: [
        {
          id: "432",
          name: "a-1"
        },
        {
          id: "433",
          name: "a-2"
        },
        {
          id: "434",
          name: "a-3"
        },
      ]
    },
  ]

  const useStyles2 = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
      //   maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const classes2 = useStyles2();

  const handleChangeMultiple = (event) => {

    console.log("event.target.value :: ", event.target.value)

    let selected_val = event.target.value[event.target.value.length - 1]

    console.log("selected_val :: ", selected_val)

    // const index = personName.findIndex(object => {
    //     return object.id === selected_val.id;
    // });

    let product = { ...products }

    const index = product.related_categories.findIndex(object => {
      return object === selected_val;
    });

    console.log("index ::", index);

    if (index === -1) {
      // setPersonName(event.target.value);
      setProducts({ ...products, related_categories: event.target.value })
      console.log("setPersonName ::", event.target.value)
    } else {
      let upData = product.related_categories.filter((element, index2) => { return index2 !== index })
      // setPersonName(upData)
      setProducts({ ...products, related_categories: upData })

      console.log("else ::", products)
    }

    console.log("related_categories :: ", products)
  };

  const handleDownloadsUpload = (event) => {

    let downloadFile = event.target.files[0];

    let cfiles = []

    let obj = {
      image: downloadFile,
      alt_text: downloadFile.name,
      is360: false
    }

    cfiles.push(obj);

    let imagesFormData = new FormData();

    cfiles.forEach(x => {
      imagesFormData.append("images[]", x.image);
      imagesFormData.append("data[]", JSON.stringify(x))
    })

    LangAPI.post("/uploads", imagesFormData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${imagesFormData._boundary}`,
      }
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          let updatedProducts = { ...products };
          // updatedProducts.download = data.location;
          updatedProducts.download = response.data.data.avatar;
          setProducts(updatedProducts);
          if (response.data.status === 200) {
            alert(response.data.message)
          } else {
            alert(response.data.message)
          }
        }
      })
      .catch((err) => {
        alert("Something went wrong.");
        console.log(err);
      });
  };


  function getStyles(name, personName, theme) {

    const index = personName.findIndex(object => {
      return object.id === name.id;
    });
    return {
      fontWeight:
        index === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  useEffect(() => {

    if (id && id != null) {
      setIsEdit(true);
      LangAPI.get(`/products/${id}`).then((response) => {
        if (response.status === 200) {
          console.log("response?.data", response?.data)
          // data.route = website_url + data.route;
          if (response?.data) {
            setProducts(response?.data);
          } else {
            setProducts({ ...initialObject });
          }
        }
      });
    }

    // LangAPI.get(`/variation_values?lang=${selectedLang}`).then((response) => {
    //   if (response.status === 200) {
    //     let data = { ...response?.data };
    //     // console.log("response?.data?.data", response?.data)
    //     if (response?.data) {
    //       setVariations(response?.data);
    //     }
    //   }
    // });
    LangAPI.get(`/sub-categories`).then((response) => {
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
    LangAPI.get(`/files`).then((response) => {
      if (response.status === 200) {
        // console.log("response.data?.data", response.data?.data)
        setImagesData(response.data?.map((x) => ({ ...x, isChecked: false })));
        setImagesDataBackup(response.data?.map((x) => ({ ...x, isChecked: false })));
      }
    }).catch(err => console.log(err));
  };

  const handleInputChange = (e) => {
    let updatedproducts = { ...products };
    updatedproducts[e.target.name] = e.target.value;
    setProducts(updatedproducts);
  };

  const handleSEOInputChange = (e) => {
    let updatedproducts = { ...products };
    updatedproducts.seo[e.target.name] = e.target.value;
    setProducts(updatedproducts);
  };

  const handleSlugChange = (e) => {
    let updatedproducts = { ...products };
    let updatedValue = e.target.value.replace(/\s+/g, "-");
    updatedValue = updatedValue.replace(/--/g, "-");
    updatedproducts[e.target.name] = updatedValue.toLowerCase();
    setProducts(updatedproducts);
  };

  // const handleRouteChange = (e) => {
  //   let updatedproducts = { ...products };
  //   let splitValues = e.target.value.split(website_url);
  //   let updatedValue = splitValues[1]
  //     ? splitValues[1].replace(/\s+/g, "-")
  //     : "";
  //   updatedValue = updatedValue.replace(/--/g, "-");
  //   updatedproducts[e.target.name] = website_url + updatedValue.toLowerCase();
  //   setProducts(updatedproducts);
  // };

  const handleRemoveSelectedImage = (x, arrayListType) => {
    switch (arrayListType) {
      case "album":
        let updateDataAlbum = products?.album?.filter((u) => u.id !== x.id);
        setProducts({ ...products, album: updateDataAlbum });
        break;
      case "promotional_images":
        let updateDataPromotional = products?.promotional_images?.filter((u) => u.id !== x.id);
        setProducts({ ...products, promotional_images: updateDataPromotional });
        break;
      case "variation":
        let updateDataVariation = products?.variations[activeVariationIndex].images?.filter((u) => u.id !== x.id);
        let updata = { ...products }
        updata.variations[activeVariationIndex].images = updateDataVariation
        setProducts(updata);
        break;
      default:
        return setUploadsPreview(uploadsPreview.filter((u) => u.id !== x.id))
    }
  }

  const handleImageSelect = (e, index) => {
    if (e.target.checked) {

      if (imageType == "featured_image") {
        setProducts({ ...products, featured_image: imagesData[index].avatar });
        setTimeout(() => {
          setShowGallery(false);
        }, 500);
      } else if (imageType == "album") {

        const index2 = products?.album?.findIndex(img => img.id === imagesData[index].id);
        if (index2 === -1) {
          setProducts({ ...products, album: [...products.album, { avatar: imagesData[index].avatar, id: imagesData[index].id, url: imagesData[index].url, is_default: false }] });
        } else {
          alert("This Image is already selected")
        }

      } else if (imageType == "promotional_images") {

        const index4 = products?.promotional_images?.findIndex(img => img.id === imagesData[index].id);
        if (index4 === -1) {
          setProducts({ ...products, promotional_images: [...products.promotional_images, { avatar: imagesData[index].avatar, id: imagesData[index].id, url: imagesData[index].url, is_default: false }] });
        } else {
          alert("This Image is already selected")
        }
      } else if (imageType == "variation") {
        let updateData = { ...products };
        const index3 = updateData.variations[activeVariationIndex].images?.findIndex(img => img.id === imagesData[index].id);
        if (index3 === -1) {
          updateData.variations[activeVariationIndex].images.push({ avatar: imagesData[index].avatar, id: imagesData[index].id, url: imagesData[index].url, is_default: false })
          setProducts(updateData);
        } else {
          alert("This Image is already selected")
        }
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

    } else {
      if (imageType == "featured_image") {
        // let updateData = products?.promotional_images?.filter((u) => u.id !== imagesData[index].id);
        // setProducts({ ...products, promotional_images: updateData});
      } else if (imageType == "album") {
        let updateData = products?.album?.filter((u) => u.id !== imagesData[index].id);
        setProducts({ ...products, album: updateData });
      } else if (imageType == "promotional_images") {
        let updateData = products?.promotional_images?.filter((u) => u.id !== imagesData[index].id);
        setProducts({ ...products, promotional_images: updateData });
      } else if (imageType == "variation") {
        let updateData = { ...products };
        let images = updateData.variations[activeVariationIndex].images?.filter((u) => u.id !== imagesData[index].id);
        updateData.variations[activeVariationIndex].images = images
        setProducts(updateData)
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
    let finalproducts = products;
    // console.log("finalproducts", finalproducts);
    // return false
    if (!finalproducts.name || finalproducts.name == "") {
      alert("Please Enter name before Submiting")
      return false;
    }
    if (!finalproducts.route || finalproducts.route == "") {
      alert("Please Enter Route before Submiting")
      return false;
    }
    let token = localStorage.getItem("authToken") || ""
    console.log("finalproducts :: ", finalproducts)
    LangAPI.post(`/products?lang=${selectedLang}`, finalproducts, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        alert("Product Added");
        setProducts({ ...initialObject });
        props.history.push("/admin/products");
      }
    });

  };
  const handleCheckBox = (e, index) => {
    let product = { ...products }
    product.variations[index][e.target.name] = e.target.checked
    setProducts(product)
  };
  const handleChangeCategory = (event) => {
    if (event.target.value != products.variation_id) {
      let updatedproducts = { ...products };
      updatedproducts.variation_id = event.target.value;
      setProducts(updatedproducts);
    }
  };
  const handleChangeType = (event) => {
    if (event.target.value != products.type) {
      let updatedproducts = { ...products };
      updatedproducts.type = event.target.value;
      updatedproducts.type_value = "";
      setProducts(updatedproducts);
    }
  };
  const handleChangeVariation = (e, index) => {
    let product = { ...products }
    product.variations[index][e.target.name] = e.target.value
    setProducts(product)
    // console.log("e, index", e, index)
    // if (event.target.value != products.type) {
    //     let updatedproducts = { ...products };
    //     updatedproducts.type = event.target.value;
    //     updatedproducts.type_value = "";
    //     setProducts(updatedproducts);
    // }
  };
  const handleChangeVariationItem = (e, variationIndex, vitemIndex) => {
    let product = { ...products }
    // console.log("e, index", vitemIndex)
    product.variations[variationIndex].variationItems[vitemIndex] = e.target.value
    // console.log("product :: ", product)
    setProducts(product)
  };
  const handleChangeCustomeColor = (e, type, vitemIndex) => {
    // console.log("e, index, itemmm", e.target.name, e.target.value, type, vitemIndex);
    let product = { ...products }
    product[type][vitemIndex] = e.target.value
    // console.log("product ", product);
    setProducts(product)
  };

  const handleVariationItem = (type, vindex, index) => {
    if (type === "delete") {
      let productUp = { ...products }
      // let newlist = productUp.variations[vindex].variationItems.filter((element, index2) => { return index2 !== index } )
      productUp.variations[vindex].variationItems.splice(index, 1)
      setProducts(productUp)
    }
    if (type === "add") {
      // let newItem = {
      //   _id: "",
      //   value_id: ""
      // }
      let productUp = { ...products }
      productUp.variations[vindex].variationItems.push(productUp)
      setProducts(productUp)
      // console.log("add, itemmm", index, type)
    }
  };
  const handleCustomVariationItem = (type, name, index) => {
    if (type === "delete") {
      let productUp = { ...products }
      // let newlist = productUp.variations[vindex].variationItems.filter((element, index2) => { return index2 !== index } )
      productUp[name].splice(index, 1)
      setProducts(productUp)
    }
    if (type === "add") {
      // let newItem = {
      //   // _id:"",
      //   value_id:""
      // }
      let productUp = { ...products }
      productUp[name].push("")
      setProducts(productUp)
      // console.log("add, itemmm", index, type)
    }
  };

  const handleVariation = (type, index) => {
    if (type === "delete") {
      let productUp = { ...products }
      productUp.variations[index].splice(index, 1)
      setProducts(productUp)
    }
    if (type === "add") {
      let newItem = {
        code: "",
        lc_code: "",
        cbm: "",
        in_stock: "1",
        upper_price: "",
        lower_price: "",
        height: "",
        depth: "",
        width: "",
        variationItems: [""],
        description: "",
        images: []
      }
      let productUp = { ...products }
      productUp.variations.push(newItem)
      setProducts(productUp)
    }
  };

  const changeVariationDescription = (e, index) => {
    let productData = { ...products }
    productData.variations[index].description = e.editor.getData()
    setProducts(productData)
    // console.log(e.editor.getData(), index, "e, index")
  }

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader color="primary" className="d-flex justify-content-between align-items-center">
          {/* <div className="d-flex justify-content-between align-items-center"> */}
          <h4 style={{ fontWeight: "400" }} className="mb-0">
            Add Product
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
                    value={products.name}
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
                    value={products.route}
                    variant="outlined"
                    fullWidth
                    onChange={handleSlugChange}
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
                    <InputLabel id="Variation_id"
                      style={{ color: "" }}
                    >Select Category</InputLabel>
                    <Select
                      labelId="category"
                      id="category"
                      name="category_id"
                      value={products?.category_id}
                      label="Select Category"
                      fullWidth
                      style={{ color: "" }}
                      onChange={handleInputChange}
                    >
                      {categories2?.map((name) => (
                        <MenuItem key={name._id} value={name._id}>{name.name}</MenuItem>
                      ))}
                      {/* <MenuItem value={'1'}>Plain Text</MenuItem>
                      <MenuItem value={'2'}>Text With Color Code</MenuItem>
                      <MenuItem value={'3'}>Text With Image</MenuItem> */}

                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="brand"
                    name="brand"
                    label="brand"
                    value={products.brand}
                    variant="outlined"
                    fullWidth
                    onChange={handleInputChange}
                    size="small"
                    helperText={''}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl className={classes2.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Related Categories</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  name="related_categories"
                  style={{ width: "100%", color: "" }}
                  value={products?.related_categories}
                  onChange={handleChangeMultiple}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes2.chips}>
                      {selected.map((value, i) => (
                        <Chip key={i} label={value} className={classes2.chip} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {categories2?.map((name) => (
                    <MenuItem key={name.id} value={name.name} style={getStyles(name, products?.related_categories, theme)}>
                      {name.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                required
                type="file"
                id="downloads"
                name="downloads"
                onChange={handleDownloadsUpload}
              />

              <p className="mt-2 font-weight-bold">
                Current Download File:{" "}
                {products?.download ? (
                  <a href={products?.download}>{products?.download}</a>
                ) : (
                  "None selected"
                )}
              </p>
              {/* <Input
                    required
                    id="download"
                    type="file"
                    name="download"
                    label="Recources"
                    value={products?.download}
                    variant="outlined"
                    fullWidth
                    onChange={handleDownloadsUpload}
                    size="small"
                    helperText={''}
                  /> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <div className="thumbnail-preview-wrapper img-thumbnail">
                    {
                      products?.featured_image ?
                        <img src={products?.featured_image} alt={products.alt_text || ""} />
                        :
                        <img src={require("./../../assets/img/placeholder.png")} alt="" />
                    }
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
                        setImageType("featured_image")
                        setImagesData(imagesDataBackup)
                      }}
                    >
                      {isEdit ? "Change" : "Upload"} Featured Image
                    </MaterialButton>
                  </Fragment>
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
          </Grid>
          <hr />
          <Grid item xs={12} sm={12}>
            <hr />
            <h4 style={{ fontWeight: "400" }}>Short Description</h4>
            <CKEditor
              onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
              data={products.short_description}
              onChange={(e) =>
                setProducts({ ...products, short_description: e.editor.getData() })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <hr />
            <h4 style={{ fontWeight: "400" }}>Detailed Content</h4>

            <CKEditor
              onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
              data={products.long_description}
              onChange={(e) =>
                setProducts({ ...products, long_description: e.editor.getData() })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <hr />
            <h4 style={{ fontWeight: "400" }}>Shipping And Return</h4>

            <CKEditor
              onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
              data={products.shiping_and_return}
              onChange={(e) =>
                setProducts({ ...products, shiping_and_return: e.editor.getData() })
              }
            />
          </Grid>
        </CardBody>
      </Card>

      {/* MULTIPLE IMAGES UPLOAD SECTION START */}
      <Card>
        <CardBody>
          <h3>Promotional Images</h3>
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
                  setIsBanner(false);
                  setShowGallery(true);
                  setImagesList(true);
                  setImageType("promotional_images")
                  setImagesData(imagesDataBackup)
                }}
              >
                Select Gallery Images
              </MaterialButton>
            </Grid>
            {
              products?.promotional_images?.map((x) => (
                <SelectedImagesThumbnails x={x} handleRemoveSelectedImage={(r) => handleRemoveSelectedImage(r, "promotional_images")} />
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
              selectedData={products?.promotional_images}
            />
            {/* GALLERY DIALOG BOX END */}
          </Grid>
        </CardBody>
      </Card>
      {/* MULTIPLE IMAGES UPLOAD SECTION END */}
      {/* MULTIPLE IMAGES UPLOAD SECTION START */}
      <Card>
        <CardBody>
          <h3>Album</h3>
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
                  setIsBanner(false);
                  setShowGallery(true);
                  setImagesList(true);
                  setImageType("album")
                  setImagesData(imagesDataBackup)
                }}
              >
                Select Gallery Images
              </MaterialButton>
            </Grid>
            {

              products?.album
                ?.map((x) => (
                  <SelectedImagesThumbnails x={x} handleRemoveSelectedImage={(r) => handleRemoveSelectedImage(r, "album")} />
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
              selectedData={products?.album}
            />
            {/* GALLERY DIALOG BOX END */}
          </Grid>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h3>Variations</h3>
          {products?.variations?.map((variation, variationIndex) => (
            <CardBody style={{ border: "1px solid rgb(201, 194, 194)", boxShadow: "0 0px 10px 0 rgba(0, 0, 0, 0.14)", marginBottom: "5px" }}>
              <Grid container spacing={2} style={{ display: "flex" }}>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="code"
                        name="code"
                        label="code"
                        value={variation.code}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleChangeVariation(e, variationIndex)}
                        size="small"
                        helperText={''}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="lc_code"
                        name="lc_code"
                        label="LC Code"
                        value={variation.lc_code}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleChangeVariation(e, variationIndex)}
                        size="small"
                        helperText={''}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="cbm"
                        name="cbm"
                        label="CBM"
                        value={variation.cbm}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleChangeVariation(e, variationIndex)}
                        size="small"
                        helperText={''}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ display: "flex" }}>
                      <InputLabel id="Variation_id" style={{ padding: "14px 3px 9px 8px", paddingBottom: "12px !important" }}>In Stock : </InputLabel>
                      <Checkbox
                        checked={variation.in_stock}
                        name="in_stock"
                        onChange={(e) => handleCheckBox(e, variationIndex)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="upper_price"
                        name="upper_price"
                        label="Price for Small Order"
                        value={variation.upper_price}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleChangeVariation(e, variationIndex)}
                        size="small"
                        helperText={''}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="lower_price"
                        name="lower_price"
                        label="Price for Big Order"
                        value={variation.lower_price}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleChangeVariation(e, variationIndex)}
                        size="small"
                        helperText={''}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="depth"
                        name="depth"
                        label="Depth"
                        value={variation.depth}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleChangeVariation(e, variationIndex)}
                        size="small"
                        helperText={''}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="width"
                        name="width"
                        label="Width"
                        value={variation.width}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleChangeVariation(e, variationIndex)}
                        size="small"
                        helperText={''}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="height"
                        name="height"
                        label="Height"
                        value={variation.height}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleChangeVariation(e, variationIndex)}
                        size="small"
                        helperText={''}
                      />
                    </Grid>
                    <>
                      {variation?.variationItems?.map((item, vitemIndex) => (
                        <>
                          <Grid item xs={12} sm={6}>
                            <FormControl
                              variant="outlined"
                              size="small"
                              style={{ width: "100%", color: "" }}
                            // fullWidth
                            >
                              <InputLabel id="Variation_id"
                                style={{ color: "" }}
                              >Variation Value</InputLabel>
                              <Select
                                labelId="item_value_id"
                                id="value_id"
                                name="value_id"
                                value={item}
                                label="Select Category"
                                fullWidth
                                style={{ color: "" }}
                                onChange={(e) => handleChangeVariationItem(e, variationIndex, vitemIndex)}>
                                {variations2?.map((x, i) => {
                                  return <MenuItem value={x.id} key={i}>{x.name}</MenuItem>
                                })}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={2} style={{ display: "flex", alignItems: "center", columnGap: "5px" }}>
                            {variation?.variationItems?.length > 1 &&
                              <CancelOutlined
                                style={{ cursor: "pointer", fontSize: "30px" }}
                                titleAccess="Add submenu"
                                onClick={() => handleVariationItem("delete", variationIndex, vitemIndex)}
                                color="primary"
                              />
                            }
                            {vitemIndex == variation?.variationItems?.length - 1 &&
                              <AddCircleOutline
                                style={{ cursor: "pointer", fontSize: "30px" }}
                                titleAccess="Add item"
                                onClick={() => handleVariationItem("add", variationIndex)}
                                color="primary"
                              />
                            }
                          </Grid>
                        </>
                      ))}
                    </>
                    <Grid item xs={12} sm={12}>
                      <hr />
                      <h4 style={{ fontWeight: "400" }}>Description</h4>

                      <CKEditor
                        onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                        data={variation?.description}
                        onChange={(e) => changeVariationDescription(e, variationIndex)}
                      />
                    </Grid>
                    <Grid>
                    </Grid>
                    <>
                      <h3>Variation Images</h3>
                      <Grid container spacing={2} style={{ paddingBottom: "10px" }}>
                        <Grid item xs={12} sm={12}>
                          <MaterialButton
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              setIsSingle(false);
                              setIsBanner(false);
                              setShowGallery(true);
                              setImagesList(true);
                              setImageType("variation")
                              setActiveVariationIndex(variationIndex)
                              setImagesData(imagesDataBackup)
                            }}
                          >
                            Select Gallery Images
                          </MaterialButton>
                        </Grid>
                        {
                          variation.images
                            ?.map((x) => (
                              <SelectedImagesThumbnails x={x} handleRemoveSelectedImage={(r) => handleRemoveSelectedImage(r, "variation")} />
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
                          selectedData={products?.album}
                        />
                        {/* GALLERY DIALOG BOX END */}
                      </Grid>
                    </>

                    <Grid item xs={12} sm={12}>
                      <hr />
                      {products?.variations.length > 1 &&
                        <DeleteOutlined
                          style={{ cursor: "pointer", fontSize: "30px" }}
                          titleAccess="Delete Item"
                          onClick={() => handleVariation("delete", variationIndex)}
                          color="primary"
                        />
                      }
                      {variationIndex == products?.variations?.length - 1 &&
                        <AddCircleOutline
                          style={{ cursor: "pointer", fontSize: "30px" }}
                          titleAccess="Add item"
                          onClick={() => handleVariation("add")}
                          color="primary"
                        />
                      }
                    </Grid>

                  </Grid>
                </Grid>
              </Grid>
            </CardBody>
          ))}
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h3>Seat/Footrest</h3>
          <CardBody style={{ border: "1px solid rgb(201, 194, 194)", boxShadow: "0 0px 10px 0 rgba(0, 0, 0, 0.14)", marginBottom: "5px" }}>
            <Grid container spacing={2} style={{ display: "flex" }}>
              <Grid item xs={12} sm={12}>
                <Grid container spacing={2}>
                  <>
                    {products?.footrest?.map((item, vitemIndex) => (
                      <>
                        <Grid item xs={12} sm={6}>
                          <FormControl
                            variant="outlined"
                            size="small"
                            style={{ width: "100%", color: "" }}
                          >
                            <InputLabel id="Variation_id"
                              style={{ color: "" }}
                            >Variation Value</InputLabel>
                            <Select
                              labelId="item_value_id"
                              id="value_id"
                              name="value_id"
                              value={item}
                              label="Select Category"
                              fullWidth
                              style={{ color: "" }}
                              onChange={(e) => handleChangeCustomeColor(e, 'footrest', vitemIndex)}
                            >
                              {variations2?.map((x, i) => {
                                return <MenuItem value={x.id} key={i}>{x.name}</MenuItem>
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2} style={{ display: "flex", alignItems: "center", columnGap: "5px" }}>
                          {products?.footrest?.length > 1 &&
                            <CancelOutlined
                              style={{ cursor: "pointer", fontSize: "30px" }}
                              titleAccess="Add submenu"
                              onClick={() => handleCustomVariationItem("delete", 'footrest', vitemIndex)}
                              color="primary"
                            />
                          }
                          {vitemIndex == products?.footrest?.length - 1 &&
                            <AddCircleOutline
                              style={{ cursor: "pointer", fontSize: "30px" }}
                              titleAccess="Add item"
                              onClick={() => handleCustomVariationItem("add", 'footrest', vitemIndex)}
                              color="primary"
                            />
                          }
                        </Grid>
                      </>
                    ))}
                  </>
                  <Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardBody>
        </CardBody>
        <CardBody>
          <h3>Headrest/Backrest</h3>
          <CardBody style={{ border: "1px solid rgb(201, 194, 194)", boxShadow: "0 0px 10px 0 rgba(0, 0, 0, 0.14)", marginBottom: "5px" }}>
            <Grid container spacing={2} style={{ display: "flex" }}>
              <Grid item xs={12} sm={12}>
                <Grid container spacing={2}>
                  <>
                    {products?.headrest?.map((item, vitemIndex) => (
                      <>

                        <Grid item xs={12} sm={6}>
                          <FormControl
                            variant="outlined"
                            size="small"
                            style={{ width: "100%", color: "" }}
                          // fullWidth
                          >
                            <InputLabel id="Variation_id"
                              style={{ color: "" }}
                            >Variation Value</InputLabel>
                            <Select
                              labelId="item_value_id"
                              id="value_id"
                              name="value_id"
                              value={item}
                              label="Select Category"
                              fullWidth
                              style={{ color: "" }}
                              onChange={(e) => handleChangeCustomeColor(e, 'headrest', vitemIndex)}
                            >
                              {variations2?.map((x, i) => {
                                return <MenuItem value={x.id} key={i}>{x.name}</MenuItem>
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2} style={{ display: "flex", alignItems: "center", columnGap: "5px" }}>
                          {products?.headrest?.length > 1 &&
                            <CancelOutlined
                              style={{ cursor: "pointer", fontSize: "30px" }}
                              titleAccess="Add submenu"
                              onClick={() => handleCustomVariationItem("delete", 'headrest', vitemIndex)}
                              color="primary"
                            />
                          }
                          {vitemIndex == products?.headrest?.length - 1 &&
                            <AddCircleOutline
                              style={{ cursor: "pointer", fontSize: "30px" }}
                              titleAccess="Add item"
                              onClick={() => handleCustomVariationItem("add", 'headrest', vitemIndex)}
                              color="primary"
                            />
                          }
                        </Grid>
                      </>
                    ))}
                  </>
                  <Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardBody>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h3>SEO Information</h3>
          <CardBody style={{ border: "1px solid rgb(201, 194, 194)", boxShadow: "0 0px 10px 0 rgba(0, 0, 0, 0.14)", marginBottom: "5px" }}>
            <Grid container spacing={2} style={{ display: "flex" }}>
              <Grid item xs={12} sm={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="meta_title"
                      name="meta_title"
                      label="Meta Title"
                      value={products?.seo?.meta_title}
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
                      value={products?.seo?.meta_description}
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
                      value={products?.seo?.schema_markup}
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      rowsMax={4}
                      onChange={handleSEOInputChange}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardBody>
        </CardBody>
      </Card>
      {/* MULTIPLE IMAGES UPLOAD SECTION END */}
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
