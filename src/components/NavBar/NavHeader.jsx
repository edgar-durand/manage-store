import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const NavHeader = (props) => {
    const { profile_small, name, status } = props;

    return (
        <li className='nav-header'>
            <div className='dropdown profile-element' style={{textAlign: 'center'}}>
                {profile_small !== undefined ?
                    <img style={{width: '60px', height: '60px'}} alt="" className='rounded-circle'
                         src={profile_small}/> :
                    <FontAwesomeIcon icon={'user-circle'} transform="right-1" style={{fontSize: "60px"}}/>}

                <a style={{cursor: 'default'}} data-toggle='dropdown' className='dropdown-toggle' href="#!"
                   onClick={(e) => e.preventDefault()}>
                    <span className='block m-t-xs font-bold'>{name}</span>
                </a>
                <p>{ status }</p>

            </div>
            <div className='logo-element'>ES+</div>
        </li>
    );
};
export default NavHeader;