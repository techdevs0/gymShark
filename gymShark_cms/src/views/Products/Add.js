import React, { Fragment, useEffect, useState } from "react"; //Suspense
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import MaterialButton from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { FormControl, MenuItem, Select, TextField, } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import CKEditor from "ckeditor4-react";
import LangAPI from "langapi/http";
import SelectedImagesThumbnails from "../Common/SelectedImagesThumbnails";
import Checkbox from '@material-ui/core/Checkbox';
import { useParams, withRouter } from "react-router-dom";
import GalleryDialog from "views/Common/GalleryDialog";
import { AddCircleOutline, DeleteOutlined, Image } from "@material-ui/icons";


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
  const classes = useStyles();
  let { id } = useParams();

  const initialObject = {
    name: "",
    route: "",
    category: "",
    related_categories: [],
    tags: [],
    brand: "",
    price:"",
    discount:0,
    variations: [
      {
        code: "",
        color: "",
        in_stock: true,
        description: "",
        featured_image:"",
        images: [],
        variation_values: []
      }
    ],
    seo: {
      meta_title: "",
      meta_description: "",
      schema_markup: "",
    },
  };
  const [products, setProducts] = useState({ ...initialObject });

  const [imagesData, setImagesData] = useState([]);
  const [imagesDataBackup, setImagesDataBackup] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [isSingle, setIsSingle] = useState(false);
  const [uploadsPreview, setUploadsPreview] = useState(null);
  const [imageType, setImageType] = useState("");
  const [activeVariationIndex, setActiveVariationIndex] = useState(-1);
  const [variationValues, setVariationValues] = useState([]);
  const [categories2, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

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
  const classes2 = useStyles2();

  const handleChangeMultiple = (event, type,variationIndex) => {

    console.log("event.target.value :: ", event.target.value)

    let selected_val = event.target.value[event.target.value.length - 1]

    console.log("selected_val :: ", selected_val)
    if(type == "relatedCategory"){

      setProducts({ ...products, related_categories: event.target.value })
      return;
    }
    
    if(type == "tags"){

      setProducts({ ...products, tags: event.target.value })
      return;
    }

    if(type == "variation_values"){

      let updatedProduct = JSON.parse(JSON.stringify(products))
      updatedProduct.variations[variationIndex].variation_values = event.target.value
      setProducts(updatedProduct)
      return;
    }
  };

  function getStyles(singleObj, dataArray, theme) {
    const index = dataArray.findIndex(object => {
      return object._id === singleObj._id;
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
      }).catch(err => console.log(err));
    }

    LangAPI.get(`/variations-values`).then((response) => {
      if (response.status === 200) {
        if (response?.data.length > 0) {
          setVariationValues(response?.data);
        }
      }
    }).catch(err => console.log(err));

    LangAPI.get(`/sub-categories`).then((response) => {
      if (response.status === 200) {
        if (response?.data) {
          setCategories(response?.data);
        }
      }
    }).catch(err => console.log(err));

    LangAPI.get(`/tags`).then((response) => {
      if (response.status === 200) {
        if (response?.data) {
          setTags(response?.data);
        }
      }
    }).catch(err => console.log(err));

    if (!imagesData.length > 0) {
      getGalleryImages();
    }
  }, []);


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

  const handleRemoveSelectedImage = (x, arrayListType) => {
    switch (arrayListType) {
      case "variation":
        let updateDataVariation = products?.variations[activeVariationIndex].images?.filter((u) => u._id !== x._id);
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
        let updateData = { ...products };
        updateData.variations[activeVariationIndex].featured_image = imagesData[index].avatar;
        setTimeout(() => {
          setShowGallery(false);
        }, 500);
        return;
      } else if (imageType == "variation") {
        let updateData = { ...products };
        const index3 = updateData.variations[activeVariationIndex].images?.findIndex(img => img._id === imagesData[index]._id);
        if (index3 === -1) {
          updateData.variations[activeVariationIndex].images.push({ avatar: imagesData[index].avatar, _id: imagesData[index]._id, url: imagesData[index].url, is_default: false })
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
      
      if (imageType == "variation") {
        let updateData = { ...products };
        let images = updateData.variations[activeVariationIndex].images?.filter((u) => u._id !== imagesData[index]._id);
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

    if (!finalproducts.name || finalproducts.name == "") {
      alert("Please Enter name before Submiting")
      return false;
    }
    if (!finalproducts.price || finalproducts.price == "") {
      alert("Please Enter Price before Submiting")
      return false;
    } else {
      finalproducts.price = Number(finalproducts.price)
    }
    if (!finalproducts.discount || finalproducts.discount == "") {
      finalproducts.discount = 0
    } else {
      finalproducts.discount = Number(finalproducts.discount)
    }

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

    finalproducts.variations.forEach((variation) => {
      variation.images = JSON.stringify(variation.images)
    })

    LangAPI.post(`/products`, finalproducts, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        alert("Product Added");
        // setProducts({ ...initialObject });
        props.history.push("/admin/products");
      }
    }).catch((e) => console.log(e));

  };
  const handleCheckBox = (e, index) => {
    let product = { ...products }
    product.variations[index][e.target.name] = e.target.checked
    setProducts(product)
  };
  const handleChangeVariation = (e, index) => {
    let product = { ...products }
    product.variations[index][e.target.name] = e.target.value
    setProducts(product)
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
        color: "",
        in_stock: true,
        description: "",
        featured_image:"",
        images: [],
        variation_values: []
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
  }

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader color="primary" className="d-flex justify-content-between align-items-center">
          {/* <div className="d-flex justify-content-between align-items-center"> */}
          <h4 style={{ fontWeight: "400" }} className="mb-0">
            Add Product
          </h4>
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
                      name="category"
                      value={products?.category}
                      label="Select Category"
                      fullWidth
                      style={{ color: "" }}
                      onChange={handleInputChange}
                    >
                      {categories2?.map((name) => (
                        <MenuItem key={name._id} value={name._id}>{name.name}</MenuItem>
                      ))}

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
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="price"
                    name="price"
                    label="price"
                    value={products.price}
                    variant="outlined"
                    fullWidth
                    onChange={handleInputChange}
                    size="small"
                    helperText={''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="discount"
                    name="discount"
                    label="discount"
                    value={products.discount}
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
                  onChange={(e) => handleChangeMultiple(e,"relatedCategory")}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes2.chips}>
                      {categories2.map((value, i) => {
                        if(selected.includes(value._id)){
                          return (
                            <Chip key={i} label={value.name} className={classes2.chip} />
                          )
                        }
                        
                      }
                        
                      )}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {categories2?.map((name) => (
                    <MenuItem key={name._id} value={name._id} style={getStyles(name, categories2, theme)}>
                        {name.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl className={classes2.formControl}>
                <InputLabel id="demo-mutiple-chip-label3">Tags</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label3"
                  id="demo-mutiple-chip3"
                  multiple
                  name="tags"
                  style={{ width: "100%", color: "" }}
                  value={products?.tags}
                  onChange={(e) => handleChangeMultiple(e,"tags")}
                  input={<Input id="select-multiple-chip3" />}
                  renderValue={(selected) => (
                    <div className={classes2.chips}>
                      {tags.map((value, i) => {
                        if(selected.includes(value._id)){
                          return (
                            <Chip key={i} label={value.name} className={classes2.chip} />
                          )
                        }
                        
                      }
                        
                      )}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {tags?.map((name) => (
                    <MenuItem key={name._id} value={name._id} style={getStyles(name, tags, theme)}>
                        {name.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h3>Variations</h3>
          {products?.variations?.map((variation, variationIndex) => (
            <CardBody style={{ border: "1px solid rgb(201, 194, 194)", boxShadow: "0 0px 10px 0 rgba(0, 0, 0, 0.14)", marginBottom: "5px" }}>
              <Grid container spacing={2} style={{ display: "flex",marginTop:"15px" }}>
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
                        required
                        id="color"
                        name="color"
                        label="color"
                        value={variation.color}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleChangeVariation(e, variationIndex)}
                        size="small"
                        helperText={''}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} style={{ display: "flex" }}>
                      <InputLabel id="Variation_id" style={{ padding: "14px 3px 9px 8px", paddingBottom: "12px !important" }}>In Stock : </InputLabel>
                      <Checkbox
                        checked={variation.in_stock}
                        name="in_stock"
                        onChange={(e) => handleCheckBox(e, variationIndex)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl className={classes2.formControl}>
                        <InputLabel id="demo-mutiple-chip-label2">Variation Values</InputLabel>
                        <Select
                          labelId="demo-mutiple-chip-label2"
                          id="demo-mutiple-chip2"
                          multiple
                          name="variation_values"
                          style={{ width: "100%", color: "" }}
                          value={variation.variation_values}
                          onChange={(e) => handleChangeMultiple(e,"variation_values", variationIndex)}
                          input={<Input id="select-multiple-chip2" />}
                          renderValue={(selected) => (
                            <div className={classes2.chips}>
                              {variationValues.map((value, i) => {
                                if(selected.includes(value._id)){
                                  return (
                                    <Chip key={i} label={value.name} className={classes2.chip} />
                                  )
                                }
                              })}
                            </div>
                          )}
                          MenuProps={MenuProps}
                        >
                          {variationValues?.map((name) => (
                            <MenuItem key={name._id} value={name._id} style={getStyles(name, variationValues, theme)}>
                                {name.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                              <div className="thumbnail-preview-wrapper img-thumbnail">
                                  {
                                    variation.featured_image && variation.featured_image !== "" ? (
                                      <img src={variation.featured_image} alt={variation.alt_text || ""} />
                                    ) : (
                                      <img
                                          src={require("./../../assets/img/placeholder.png")}
                                          alt=""
                                      />
                                    )
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
                                          setShowGallery(true);
                                          setImageType("featured_image")
                                          setActiveVariationIndex(variationIndex)
                                          setImagesData(imagesDataBackup)
                                      }}
                                  >
                                      {"Upload Featured Image"}
                                  </MaterialButton>
                              </Fragment>
                          </Grid>
                      </Grid>
                    </Grid>
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
                              setShowGallery(true);
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
