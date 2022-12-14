import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { MENUITEMS } from '../../constant/navMenu';


const Nav = () => {
    const [mainmenu, setMainMenu] = useState(MENUITEMS);
    const [sidebar, setSidebar] = useState(false);

    function closeSidebar() {
        setSidebar(!sidebar)
        document.querySelector('.navbar').classList.remove('openSidebar')
    }


    useEffect(() => {
        const currentUrl = location.pathname;
        mainmenu.filter(items => {
            if (items.path === currentUrl)
                setNavActive(items)
            if (!items.children) return false
            items.children.filter(subItems => {
                if (subItems.path === currentUrl)
                    setNavActive(subItems)
                if (!subItems.children) return false
                subItems.children.filter(subSubItems => {
                    if (subSubItems.path === currentUrl)
                        setNavActive(subSubItems)
                })
            })
        })

    }, [])

    const setNavActive = (item) => {
        MENUITEMS.filter(menuItem => {
            if (menuItem != item)
                menuItem.active = false
            if (menuItem.children && menuItem.children.includes(item))
                menuItem.active = true
            if (menuItem.children) {
                menuItem.children.filter(submenuItems => {
                    if (submenuItems.children && submenuItems.children.includes(item)) {
                        menuItem.active = true
                        submenuItems.active = true
                    }
                })
            }
        })
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS })

    }

    // Click Toggle menu
    const toggletNavActive = (item) => {

        if (!item.active) {
            MENUITEMS.forEach(a => {
                if (MENUITEMS.includes(item))
                    a.active = false
                if (!a.children) return false
                a.children.forEach(b => {
                    if (a.children.includes(item)) {
                        b.active = false
                    }
                    if (!b.children) return false
                    b.children.forEach(c => {
                        if (b.children.includes(item)) {
                            c.active = false
                        }
                    })
                })
            });
        }
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS })
    }


    return (
        <div className={`navbar`} id="togglebtn">
            <div className="responsive-btn text-right">
                <i aria-hidden="true" className="fa fa-close modalIconStyle"
                    onClick={closeSidebar}
                ></i>
                {/* <a className="btn-back" onClick={closeSidebar}>
                    <h5>close</h5>
                </a> */}
            </div>
            <ul className="main-menu">
                {MENUITEMS.map((menuItem, i) => {
                    return (
                        <li key={i} className={"navItemStyle"}>

                            {(menuItem.type === 'sub') ?
                                <a className="dropdown" href="/page/locations" onClick={() => toggletNavActive(menuItem)}>
                                    <span>{menuItem.title}</span>
                                </a>
                                : ''}
                            {(menuItem.type === 'link') &&
                                <a
                                    href={menuItem.path}
                                    className={`${menuItem.active ? 'active' : ''}`}
                                >
                                    {menuItem.title}
                                </a>
                            }
                            {menuItem.children &&
                                <ul
                                    className={`${menuItem.active ? 'menu-open activeSubmenu' : ''}`}
                                    style={menuItem.active ? { opacity: 1, transition: 'opacity 500ms ease-in' } : {}}
                                >
                                    {menuItem.children.map((childrenItem, index) =>
                                        <li key={index} className={`${childrenItem.children ? 'sub-menu ' : ''}`}>
                                            {(childrenItem.type === 'sub') ?
                                                <a href="#javascript" onClick={() => toggletNavActive(childrenItem)} >
                                                    {childrenItem.title}
                                                </a>
                                                : ''}
                                            {(childrenItem.type === 'link') ?
                                                <Link href={`${childrenItem.path}`}>
                                                    <a>{childrenItem.title} </a>
                                                </Link>
                                                : ''}
                                            {childrenItem.children ?
                                                <ul className={`${childrenItem.active ? 'menu-open' : 'active'}`}>
                                                    {childrenItem.children.map((childrenSubItem, key) =>
                                                        <li key={key}>
                                                            {(childrenSubItem.type === 'link') ?
                                                                <Link href={`${childrenSubItem.path}`} >
                                                                    <a className="sub-menu-title">{childrenSubItem.title}</a>
                                                                </Link>
                                                                : ''}
                                                        </li>
                                                    )}
                                                </ul>
                                                : ''}
                                        </li>
                                    )}
                                </ul>}
                        </li>
                    )
                })}
                <li>  <button className='otfBtn1 ml-3'>Free Class</button> </li>
            </ul>
        </div>
    )
}

export default Nav
