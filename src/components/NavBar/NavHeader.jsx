import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const NavHeader = (props) => {
    const {profile_small, name, status} = props;

    return (

        <li className='nav-header'>
            <div className='dropdown profile-element' style={{textAlign: 'center'}}>
                <Link style={{cursor: 'hand'}} data-toggle='dropdown' className='dropdown-toggle' to="/home/profile">
                    {profile_small !== undefined ?
                        <img style={{width: '60px', height: '60px'}} alt="" className='rounded-circle'
                             src={profile_small}/> :
                        <FontAwesomeIcon icon={'user-circle'} transform="right-1" style={{fontSize: "60px"}}/>}


                    <span className='block m-t-xs font-bold'>{name}</span>

                    <p>{status}</p>

                </Link>
            </div>
            <div className='logo-element'>
                <Link style={{cursor: 'hand'}} to="/home/profile">
                    {profile_small !== undefined ?
                        <img style={{width: '60px', height: '60px'}} alt="" className='rounded-circle'
                             src={profile_small}/> :
                        <FontAwesomeIcon icon={'user-circle'} transform="right-1" style={{fontSize: "60px"}}/>}

                </Link>
            </div>
        </li>
    );
};


export default NavHeader;