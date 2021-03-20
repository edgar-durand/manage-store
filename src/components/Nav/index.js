import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Nav.css';
import NavHeader from './NavHeader';
import NavLi from './NavLi';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Dlg } from '../Helpers/MdsReactUtils';
import {updateState} from "../../actions/actionCreator";

const Nav = () => {

    const userInfo = useSelector((state) => state.globalState)
    const dispatch = useDispatch()
   
    useEffect(() => {
        async function getUser() {
            try {
                dispatch(updateState())

            } catch (err) {
                Dlg.warning(err.message, null, err.stack)

            }

        }
        getUser();
    }, [dispatch])


    return (
        <nav className="navbar-default navbar-static-side" role="navigation">
            <div className="sidebar-collapse">
                <ul className="nav metismenu animated fadeIn" id="side-menu">

                    <NavHeader
                        profile_small={userInfo ? userInfo.photo ? userInfo.photo : `${window.SitePath}content/images/user.png` : `${window.SitePath}content/images/user.png`}
                        name={userInfo ? userInfo.firstName ? userInfo.firstName : "" : ""}
                    />


                    <NavLi
                        title="Inicio"
                        icon={faHome}
                        to="/"
                    />




                </ul>

            </div>
        </nav>
    );
}

export default Nav;