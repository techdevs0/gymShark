/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// import Person from "@material-ui/icons/Person";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
// import UserProfile from "views/UserProfile/UserProfile.js";
// import TableList from "views/TableList/TableList.js";
// import Typography from "views/Typography/Typography.js";
// import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";

// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.js";
import { AttachFileRounded, HotelOutlined, SupervisedUserCircle, FormatQuote, Code, FeaturedVideo, CardGiftcardOutlined, ViewCarouselOutlined, InsertDriveFileOutlined, PostAddOutlined, TrackChanges, AddShoppingCart, Reorder, ViewList, SportsHandball } from "@material-ui/icons";

import AddOffer from "views/Offers/Add";
import OffersList from "views/Offers/List";
import AddPremiuimOffer from "views/Premiuim-offers/Add";
import PremiuimOffersList from "views/Premiuim-offers/List";
import RoomsList from "views/RoomsSuites/List";
import RoomDetail from "views/RoomsSuites/Details";
import AddRoom from "views/RoomsSuites/Add";
import BlogsList from "views/Blogs/List";
import ProductsList from "views/Products/List";
import AddProducts from "views/Products/Add";
import VariationsList from "views/Variations/List";
import TagList from "views/Tag/List";
import AddTag from "views/Tag/Add";
import Orders from "views/Orders/List";
import ProductReport from "views/ProductReport/List";
import Transactions from "views/Transactions/List";
import PromoCodes from "views/PromoCodes/List";
import AddPromoCode from "views/PromoCodes/Add";
import AddVariations from "views/Variations/Add";
import AddVariationValues from "views/VariationValues/Add";
import VariationValuesList from "views/VariationValues/List";
import CategoriesList from "views/Categories/List";
import AddCategories from "views/Categories/Add";
import SubCategoriesList from "views/SubCategories/List";
import AddSubCategories from "views/SubCategories/Add";
import BlogDetail from "views/Blogs/Details";
import AddBlog from "views/Blogs/Add";
import DiningList from "views/Dining/List";
import DiningDetail from "views/Dining/Details";
import DiningAdd from "views/Dining/Add";
import LeisureList from "views/Leisure/List";
import WeddingList from "views/Wedding/List";
import WeddingAdd from "views/Wedding/Add";

import LeisureAdd from "views/Leisure/Add";
import LeisureDetail from "views/Leisure/Details";
import WeddingDetail from "views/Wedding/Details";
import SpaWellnessList from "views/SpaWellness/List";
import SpaWellnessAdd from "views/SpaWellness/Add";
import PageAdd from "views/SitePages/Add";
import PageDetail from "views/SitePages/Details";
import PageList from "views/SitePages/List";
import Footer from "views/Footer/Add";
import UpdateHeader from "views/Header/Add";
import AddSustainability from "views/SitePages/Pages/Sustainability/Add";
import AddRoomsSuites from "views/SitePages/Pages/RoomsSuites/Add";
import LeisureActivities from "views/SitePages/Pages/leisureActivities/Add";
import AddLeisureInner from "views/SitePages/Pages/LeisureInner/Add";
import AddDiningInner from "views/SitePages/Pages/DiningInner/Add";
import AddAboutUs from "views/SitePages/Pages/About/Add";
import AddManagement from "views/SitePages/Pages/Management/Add";
import AddServices from "views/SitePages/Pages/Services/Add";
import AddSpaWellness from "views/SitePages/Pages/SpaWellness/Add";
import AddPrivacyPolicy from "views/SitePages/Pages/PrivacyPolicy/Add";
import AddTermsOfUse from "views/SitePages/Pages/TermsOfUse/Add"
import HomePage from "views/SitePages/Pages/Home-page/Add";
import Innovations from "views/SitePages/Pages/Innovations/Add";
import Resources from "views/SitePages/Pages/Resources/Add";
import AddCovidPolicy from "views/SitePages/Pages/CovidPolicy/Add";
import AddCancellationPolicy from "views/SitePages/Pages/CancellationPolicy/Add";
import AddWedding from "views/SitePages/Pages/Wedding/Add";
import AddAboutSeychelles from "views/SitePages/Pages/AboutSeychelles/Add";
import ParisFrenchRestaurant from "views/SitePages/Pages/ParisFrenchRestaurant/Add";
import AddGalleryPage from "views/SitePages/Pages/Gallery/Add";
import FAQPage from "views/SitePages/Pages/FAQ/Add";
import FAQList from "views/FAQ/List";
import GalleryList from "views/Gallery/List";
import AddGallery from "views/Gallery/Add";
import OfferDetail from "views/Offers/Details";
import PremiuimOfferDetail from "views/Premiuim-offers/Details";
import SignInSide from "views/Auth/Login";
import AddContactUs from "views/SitePages/Pages/Contact/Add";
import SalesList from "views/Sales/List";
import UsersList from "views/Users/List";
import TeamList from "views/OurTeam/List";
import TestimonialList from "views/Testimonial/List";
import AddTeam from "views/OurTeam/Add";
import AddTestimonial from "views/Testimonial/Add";
import PartnersList from "views/Partners/List";
import AddPartner from "views/Partners/Add";
import VideoList from "views/Videos/List";
import AddVideo from "views/Videos/Add";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/gallery",
    name: "Media",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ViewCarouselOutlined,
    component: GalleryList,
    layout: "/admin",
    exact: true,
    // hide: true
  },
  {
    path: "/pages",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: InsertDriveFileOutlined,
    component: PageList,
    layout: "/admin",
    exact: true
  },
  {
    path: "/pages/add",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: PageAdd,
    layout: "/admin",
    exact: true,
    hide: true
  },
  // {
  //   path: "/categories",
  //   name: "Categories",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: HotelOutlined,
  //   component: CategoriesList,
  //   layout: "/admin",
  //   exact: true
  // },
  // {
  //   path: "/categories/add",
  //   name: "Categories",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: HotelOutlined,
  //   component: AddCategories,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },
  {
    path: "/sub-categories",
    name: "Categories",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ViewList,
    component: SubCategoriesList,
    layout: "/admin",
    exact: true
  },
  {
    path: "/sub-categories/add",
    name: "Categories",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ViewList,
    component: AddSubCategories,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/sub-categories/edit/:id",
    name: "Categories",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ViewList,
    component: AddSubCategories,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/variations",
    name: "Variation Values",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ViewList,
    component: VariationsList,
    layout: "/admin",
    exact: true
  },
  {
    path: "/variations/edit/:id",
    name: "Variation Values",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ViewList,
    component: AddVariations,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/variations/add",
    name: "Variation Values",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ViewList,
    component: AddVariations,
    layout: "/admin",
    exact: true,
    hide: true,
  },
  {
    path: "/tags",
    name: "Tags",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ViewList,
    component: TagList,
    layout: "/admin",
    exact: true
  },
  {
    path: "/tags/edit/:id",
    name: "Tags",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ViewList,
    component: AddTag,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/tags/add",
    name: "Tags",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ViewList,
    component: AddTag,
    layout: "/admin",
    exact: true,
    hide: true,
  },
  // {
  //   path: "/variation-values/add",
  //   name: "Variation Items",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: HotelOutlined,
  //   component: AddVariationValues,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true,
  // },
  // {
  //   path: "/variation-values/edit/:id",
  //   name: "Variation Items",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: ViewList,
  //   component: AddVariationValues,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true,
  // },
  // {
  //   path: "/variation-values",
  //   name: "Variation Items",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: ViewList,
  //   component: VariationValuesList,
  //   layout: "/admin",
  //   exact: true
  // },
  {
    path: "/products",
    name: "Products",
    rtlName: "ملف تعريفي للمستخدم",
    icon: HotelOutlined,
    component: ProductsList,
    layout: "/admin",
    exact: true
  },
  {
    path: "/products/add",
    name: "Products",
    rtlName: "ملف تعريفي للمستخدم",
    icon: HotelOutlined,
    component: AddProducts,
    layout: "/admin",
    exact: true,
    hide: true,
  },

  {
    path: "/products/edit/:id",
    name: "Products",
    rtlName: "ملف تعريفي للمستخدم",
    icon: HotelOutlined,
    component: AddProducts,
    layout: "/admin",
    exact: true,
    hide: true,
  },

  {
    path: "/orders",
    name: "Orders",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Reorder,
    component: Orders,
    layout: "/admin",
    exact: true
  },
  {
    path: "/sales",
    name: "Sales",
    rtlName: "ملف تعريفي للمستخدم",
    icon: AddShoppingCart,
    component: SalesList,
    layout: "/admin",
    exact: true
  },
  {
    path: "/product-report",
    name: "Product Report",
    rtlName: "ملف تعريفي للمستخدم",
    icon: HotelOutlined,
    component: ProductReport,
    layout: "/admin",
    exact: true
  },
  {
    path: "/transactions",
    name: "Transactions",
    rtlName: "ملف تعريفي للمستخدم",
    icon: TrackChanges,
    component: Transactions,
    layout: "/admin",
    exact: true
  },
  {
    path: "/promo-codes",
    name: "Promo Codes",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Code,
    component: PromoCodes,
    layout: "/admin",
    exact: true
  },
  {
    path: "/promo-code/add",
    name: "Promo Codes",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Code,
    component: AddPromoCode,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/users",
    name: "Users",
    rtlName: "ملف تعريفي للمستخدم",
    icon: SupervisedUserCircle,
    component: UsersList,
    layout: "/admin",
    exact: true
  },

  {
    path: "/team",
    name: "Team",
    rtlName: "ملف تعريفي للمستخدم",
    icon: SupervisedUserCircle,
    component: TeamList,
    layout: "/admin",
    exact: true
  },
  {
    path: "/team/add",
    name: "Team",
    rtlName: "ملف تعريفي للمستخدم",
    icon: SupervisedUserCircle,
    component: AddTeam,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/team/edit/:id",
    name: "Team",
    rtlName: "ملف تعريفي للمستخدم",
    icon: SupervisedUserCircle,
    component: AddTeam,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/testimonial",
    name: "Testimonial",
    rtlName: "ملف تعريفي للمستخدم",
    icon: FormatQuote,
    component: TestimonialList,
    layout: "/admin",
    exact: true
  },

  {
    path: "/testimonial/add",
    name: "Testimonial",
    rtlName: "ملف تعريفي للمستخدم",
    icon: FormatQuote,
    component: AddTestimonial,
    layout: "/admin",
    exact: true,
    hide: true
  },

  {
    path: "/testimonial/edit/:id",
    name: "Testimonial",
    rtlName: "ملف تعريفي للمستخدم",
    icon: FormatQuote,
    component: AddTestimonial,
    layout: "/admin",
    exact: true,
    hide: true
  },


  {
    path: "/partners",
    name: "Partners",
    rtlName: "ملف تعريفي للمستخدم",
    icon: SportsHandball,
    component: PartnersList,
    layout: "/admin",
    exact: true
  },
  {
    path: "/partner/add",
    name: "Partners",
    rtlName: "ملف تعريفي للمستخدم",
    icon: SportsHandball,
    component: AddPartner,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/partner/edit/:id",
    name: "Partners",
    rtlName: "ملف تعريفي للمستخدم",
    icon: SportsHandball,
    component: AddPartner,
    layout: "/admin",
    exact: true,
    hide: true
  },

  {
    path: "/video",
    name: "Video",
    rtlName: "ملف تعريفي للمستخدم",
    icon: FeaturedVideo,
    component: VideoList,
    layout: "/admin",
    exact: true
  },
  {
    path: "/video/add",
    name: "Video",
    rtlName: "ملف تعريفي للمستخدم",
    icon: FeaturedVideo,
    component: AddVideo,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/video/edit/:id",
    name: "Video",
    rtlName: "ملف تعريفي للمستخدم",
    icon: FeaturedVideo,
    component: AddVideo,
    layout: "/admin",
    exact: true,
    hide: true
  },
  // {
  //   path: "/room-suites",
  //   name: "Rooms & Suites",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: HotelOutlined,
  //   component: RoomsList,
  //   layout: "/admin",
  //   exact: true
  // },
  // {
  //   path: "/room-suites/add",
  //   component: AddRoom,
  //   layout: "/admin",
  //   hide: true,
  //   exact: true
  // },
  // {
  //   path: "/room-suites/edit/:id",
  //   component: AddRoom,
  //   layout: "/admin",
  //   hide: true,
  //   exact: true
  // },
  // {
  //   path: "/room-suites/:id",
  //   component: RoomDetail,
  //   layout: "/admin",
  //   hide: true,
  //   exact: true
  // },
  {
    path: "/blogs",
    name: "Blogs",
    rtlName: "ملف تعريفي للمستخدم",
    icon: AttachFileRounded,
    component: BlogsList,
    layout: "/admin",
    exact: true
  },
  {
    path: "/blogs/add",
    component: AddBlog,
    layout: "/admin",
    hide: true,
    exact: true
  },
  {
    path: "/blogs/edit/:id",
    component: AddBlog,
    layout: "/admin",
    hide: true,
    exact: true
  },
  {
    path: "/blogs/:id",
    component: BlogDetail,
    layout: "/admin",
    hide: true,
    exact: true
  },
  // {
  //   path: "/dining",
  //   name: "Restaurant & Bars",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: RestaurantOutlined,
  //   component: DiningList,
  //   layout: "/admin",
  //   exact: true
  // },
  // {
  //   path: "/dining/add",
  //   component: DiningAdd,
  //   layout: "/admin",
  //   hide: true,
  //   exact: true
  // },
  // {
  //   path: "/dining/edit/:id",
  //   component: DiningAdd,
  //   layout: "/admin",
  //   hide: true,
  //   exact: true
  // },
  // {
  //   path: "/dining/:id",
  //   component: DiningDetail,
  //   layout: "/admin",
  //   hide: true,
  //   exact: true
  // },
  // {
  //   path: "/weddings",
  //   name: "Weddings",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: FavoriteBorderOutlined,
  //   component: WeddingList,
  //   layout: "/admin",
  //   exact: true
  // },
  // {
  //   path: "/weddings/add",
  //   name: "Weddings",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: CardGiftcardOutlined,
  //   component: WeddingAdd,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },
  // {
  //   path: "/weddings/edit/:id",
  //   name: "Weddings",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: CardGiftcardOutlined,
  //   component: WeddingAdd,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },
  // {
  //   path: "/weddings/:id",
  //   name: "Weddings",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: CardGiftcardOutlined,
  //   component: WeddingDetail,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },
  // {
  //   path: "/offers",
  //   name: "Offers",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: CardGiftcardOutlined,
  //   component: OffersList,
  //   layout: "/admin",
  //   exact: true
  // },
  // {
  //   path: "/offers/add",
  //   name: "Offers",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: CardGiftcardOutlined,
  //   component: AddOffer,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },
  // {
  //   path: "/offers/edit/:id",
  //   name: "Offers",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: CardGiftcardOutlined,
  //   component: AddOffer,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },
  // {
  //   path: "/offers/:id",
  //   name: "Offers",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: CardGiftcardOutlined,
  //   component: OfferDetail,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },

  // {
  //   path: "/premium-offers",
  //   name: "Premiuim Offers",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: CardGiftcardOutlined,
  //   component: PremiuimOffersList,
  //   layout: "/admin",
  //   exact: true
  // },
  // {
  //   path: "/premium-offers/add",
  //   name: "Premiuim Offers",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: CardGiftcardOutlined,
  //   component: AddPremiuimOffer,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },
  // {
  //   path: "/premium-offers/edit/:id",
  //   name: "Premiuim Offers",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: CardGiftcardOutlined,
  //   component: AddPremiuimOffer,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },
  // {
  //   path: "/premium-offers/:id",
  //   name: "Premiuim Offers",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: CardGiftcardOutlined,
  //   component: PremiuimOfferDetail,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },
  // {
  //   path: "/spa-wellness",
  //   name: "Spa & Wellness",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: SpaOutlined,
  //   component: SpaWellnessList,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },
  // {
  //   path: "/spa-wellness/add",
  //   name: "Spa & Wellness",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: CardGiftcardOutlined,
  //   component: SpaWellnessAdd,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },
  // {
  //   path: "/spa-wellness/:id",
  //   name: "Spa & Wellness",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: CardGiftcardOutlined,
  //   component: SpaWellnessList,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },
  // {
  //   path: "/whats-on",
  //   name: "Leisure Activities",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: PoolOutlined,
  //   component: LeisureList,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },
  // {
  //   path: "/whats-on/add",
  //   name: "Leisure Activities",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: CardGiftcardOutlined,
  //   component: LeisureAdd,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },
  // {
  //   path: "/whats-on/:id",
  //   name: "Leisure Activities",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: CardGiftcardOutlined,
  //   component: LeisureDetail,
  //   layout: "/admin",
  //   exact: true,
  //   hide: true
  // },

  {
    path: "/pages/sustainability/add/:id",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddSustainability,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/gallery/add/:id",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddGalleryPage,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/paris-french-restaurant/add/:id",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: ParisFrenchRestaurant,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/whats-on/add/:id",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: LeisureActivities,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/faq",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: FAQPage,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/leisure-inner/add/:id",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddLeisureInner,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/fine-dining-seychelles/add/:id",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddDiningInner,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/about",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddAboutUs,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/management",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddManagement,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/services",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddServices,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/contact",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddContactUs,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/spa-wellness/add/:id",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddSpaWellness,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/privacy-policy/add/:id",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddPrivacyPolicy,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/terms-of-use/add/:id",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddTermsOfUse,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/home-page",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: HomePage,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/innovations",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: Innovations,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/resources",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: Resources,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/covid-policy/add/:id",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddCovidPolicy,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/cancellation-policy/add/:id",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddCancellationPolicy,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/wedding/add/:id",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddWedding,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/rooms-suites-seychelles/add/:id",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddRoomsSuites,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/about-seychelles/add/:id",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: AddAboutSeychelles,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/pages/:id",
    name: "Pages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CardGiftcardOutlined,
    component: PageDetail,
    layout: "/admin",
    exact: true,
    hide: true
  },

  {
    path: "/gallery/add",
    name: "Gallery",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ViewCarouselOutlined,
    component: AddGallery,
    layout: "/admin",
    exact: true,
    hide: true
  },
  {
    path: "/gallery/:id",
    name: "Gallery",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ViewCarouselOutlined,
    component: GalleryList,
    layout: "/admin",
    exact: true,
    hide: true
  },
  // {
  //   path: "/gallery",
  //   name: "Gallery",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: ViewCarouselOutlined,
  //   component: DashboardPage,
  //   layout: "/admin",
  //   exact: true
  // },
  // {
  //   path: "/header",
  //   name: "Main Header",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: ArtTrackOutlined,
  //   component: UpdateHeader,
  //   layout: "/admin",
  //   exact: true
  // },
  // {
  //   path: "/footer",
  //   name: "Main Footer",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: HorizontalSplitOutlined,
  //   component: Footer,
  //   layout: "/admin",
  //   exact: true
  // },
  {
    path: "/posts",
    name: "Posts",
    rtlName: "ملف تعريفي للمستخدم",
    icon: PostAddOutlined,
    component: UpdateHeader,
    layout: "/admin",
    exact: true,
    hide: true
  },
  // {
  //   path: "/faq",
  //   name: "F.A.Q's",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: QuestionAnswerOutlined,
  //   component: FAQList,
  //   layout: "/admin",
  //   exact: true
  // },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
