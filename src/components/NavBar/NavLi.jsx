import React, {useRef} from 'react';
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

const NavLi = (props) => {

    const {title, menu, icon, to, component, span, keep_active} = props;
    const haveMenu = Array.isArray(menu) && menu.length > 0;
    const li = useRef()
    const ul = useRef()

    function handleLi() {

        if (typeof component === "undefined") {

            const isActive = li.current.classList.contains('active');

            document.querySelectorAll('nav li.active').forEach((e) => {
                e.classList.remove('active')
            });
            !keep_active &&
            document.querySelectorAll('.nav-second-level.collapse.in').forEach((e) => {
                e.classList.remove('in')
            });

            document.querySelectorAll('.arrow-nav-li').forEach(e => e.style.transform = '');

            if (!isActive && !keep_active) {

                li.current.classList.add('active')
                if (haveMenu) {
                    li.current.querySelector('.arrow-nav-li').style.transform = 'rotate(-90deg)'
                    ul.current.classList.add('in')
                }
            } else if (!haveMenu && !keep_active) {
                li.current.classList.add('active')
            } else if (haveMenu && !keep_active) {
                ul.current.classList.remove('in')
            }
        }
    }


    return (
        <>
            <li ref={li} >
                <NavLink className={component ? "not-hover" : ""} onClick={() => handleLi()} to={to ? to : f => f}>

                    <FontAwesomeIcon className={component ? 'component-li-icon' : ''} icon={icon} size="2x"
                                     style={{marginRight: '5px'}}/>

                    {component ? (<div className="component-li col-auto">{component} {span ? span : null}</div>) :
                        <span className='nav-label'>{title} {span ? span : null}</span>}

                    {haveMenu&& !keep_active ? <FontAwesomeIcon className="hide-on-mini arrow-nav-li" icon={faChevronLeft}
                                                 style={{float: 'right'}}/> : null}

                </NavLink>
                {
                    haveMenu ? (

                        <ul ref={ul} className={keep_active ? 'nav nav-second-level collapse in' : 'nav nav-second-level collapse' }>
                            {menu.map((item, i) => {

                                if (item.component) {

                                    return (
                                        <li key={i}>
                                            <div className="component-submenu">{item.component}</div>
                                        </li>
                                    )
                                } else {

                                    return (
                                        <li key={i}>{item.to ?
                                            <NavLink to={item.to}>{item.text ? item.text : ""}</NavLink> : <a href="#!"
                                                                                                              onClick={f => f.preventDefault()}>{item.text ? item.text : ""}</a>}</li>
                                    )
                                }

                            })}
                        </ul>

                    ) : null
                }
                {
                    component ? (

                        <ul className='nav nav-second-level component'>
                            {component}
                        </ul>

                    ) : null
                }
            </li>


        </>
    );
};
export default NavLi;