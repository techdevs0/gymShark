webpackHotUpdate("static\\development\\pages\\portfolio\\basic-4-grid.js",{

/***/ "./containers/common/nav.js":
/*!**********************************!*\
  !*** ./containers/common/nav.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constant_navMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constant/navMenu */ "./constant/navMenu.js");
var _this = undefined,
    _jsxFileName = "E:\\laragon\\www\\Prism\\otf\\containers\\common\\nav.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var Nav = function Nav() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_constant_navMenu__WEBPACK_IMPORTED_MODULE_2__["MENUITEMS"]),
      mainmenu = _useState[0],
      setMainMenu = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      sidebar = _useState2[0],
      setSidebar = _useState2[1];

  function closeSidebar() {
    setSidebar(!sidebar);
    document.querySelector('.navbar').classList.remove('openSidebar');
  }

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var currentUrl = location.pathname;
    mainmenu.filter(function (items) {
      if (items.path === currentUrl) setNavActive(items);
      if (!items.children) return false;
      items.children.filter(function (subItems) {
        if (subItems.path === currentUrl) setNavActive(subItems);
        if (!subItems.children) return false;
        subItems.children.filter(function (subSubItems) {
          if (subSubItems.path === currentUrl) setNavActive(subSubItems);
        });
      });
    });
  }, []);

  var setNavActive = function setNavActive(item) {
    _constant_navMenu__WEBPACK_IMPORTED_MODULE_2__["MENUITEMS"].filter(function (menuItem) {
      if (menuItem != item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item)) menuItem.active = true;

      if (menuItem.children) {
        menuItem.children.filter(function (submenuItems) {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
    item.active = !item.active;
    setMainMenu({
      mainmenu: _constant_navMenu__WEBPACK_IMPORTED_MODULE_2__["MENUITEMS"]
    });
  }; // Click Toggle menu


  var toggletNavActive = function toggletNavActive(item) {
    if (!item.active) {
      _constant_navMenu__WEBPACK_IMPORTED_MODULE_2__["MENUITEMS"].forEach(function (a) {
        if (_constant_navMenu__WEBPACK_IMPORTED_MODULE_2__["MENUITEMS"].includes(item)) a.active = false;
        if (!a.children) return false;
        a.children.forEach(function (b) {
          if (a.children.includes(item)) {
            b.active = false;
          }

          if (!b.children) return false;
          b.children.forEach(function (c) {
            if (b.children.includes(item)) {
              c.active = false;
            }
          });
        });
      });
    }

    item.active = !item.active;
    setMainMenu({
      mainmenu: _constant_navMenu__WEBPACK_IMPORTED_MODULE_2__["MENUITEMS"]
    });
  };

  return __jsx("div", {
    className: "navbar",
    id: "togglebtn",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "responsive-btn text-right",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 13
    }
  }, __jsx("i", {
    "aria-hidden": "true",
    className: "fa fa-close modalIconStyle",
    onClick: closeSidebar,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 17
    }
  })), __jsx("ul", {
    className: "main-menu",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 13
    }
  }, _constant_navMenu__WEBPACK_IMPORTED_MODULE_2__["MENUITEMS"].map(function (menuItem, i) {
    return __jsx("li", {
      key: i,
      className: "navItemStyle",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 25
      }
    }, menuItem.type === 'sub' ? __jsx("a", {
      className: "dropdown",
      href: "/page/locations",
      onClick: function onClick() {
        return toggletNavActive(menuItem);
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 97,
        columnNumber: 33
      }
    }, __jsx("span", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 98,
        columnNumber: 37
      }
    }, menuItem.title)) : '', menuItem.type === 'link' && __jsx("a", {
      href: menuItem.path,
      className: "".concat(menuItem.active ? 'active' : ''),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 33
      }
    }, menuItem.title), menuItem.children && __jsx("ul", {
      className: "".concat(menuItem.active ? 'menu-open activeSubmenu' : ''),
      style: menuItem.active ? {
        opacity: 1,
        transition: 'opacity 500ms ease-in'
      } : {},
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 110,
        columnNumber: 33
      }
    }, menuItem.children.map(function (childrenItem, index) {
      return __jsx("li", {
        key: index,
        className: "".concat(childrenItem.children ? 'sub-menu ' : ''),
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115,
          columnNumber: 41
        }
      }, childrenItem.type === 'sub' ? __jsx("a", {
        href: "#javascript",
        onClick: function onClick() {
          return toggletNavActive(childrenItem);
        },
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117,
          columnNumber: 49
        }
      }, childrenItem.title) : '', childrenItem.type === 'link' ? __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        href: "".concat(childrenItem.path),
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122,
          columnNumber: 49
        }
      }, __jsx("a", {
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123,
          columnNumber: 53
        }
      }, childrenItem.title, " ")) : '', childrenItem.children ? __jsx("ul", {
        className: "".concat(childrenItem.active ? 'menu-open' : 'active'),
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127,
          columnNumber: 49
        }
      }, childrenItem.children.map(function (childrenSubItem, key) {
        return __jsx("li", {
          key: key,
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 129,
            columnNumber: 57
          }
        }, childrenSubItem.type === 'link' ? __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
          href: "".concat(childrenSubItem.path),
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 131,
            columnNumber: 65
          }
        }, __jsx("a", {
          className: "sub-menu-title",
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 132,
            columnNumber: 69
          }
        }, childrenSubItem.title)) : '');
      })) : '');
    })));
  }), __jsx("li", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 145,
      columnNumber: 17
    }
  }, "  ", __jsx("button", {
    className: "otfBtn1 ml-3",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 145,
      columnNumber: 23
    }
  }, "Free Class"), " ")));
};

/* harmony default export */ __webpack_exports__["default"] = (Nav);

/***/ })

})
//# sourceMappingURL=basic-4-grid.js.46f44521dd297b0a8454.hot-update.js.map