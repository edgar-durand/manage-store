import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ActioNavBar from './ActionsNavBar';

export default () => {

    function SmoothlyMenu() {
        if (!document.body.classList.contains('mini-navbar') || document.body.classList.contains('body-small')) {
            // Hide menu in order to smoothly turn on when maximize menu
            document.querySelector('#side-menu').style.display = 'none';
            // For smoothly turn on menu
            setTimeout(() => {
                document.querySelector('#side-menu').style.display = '';
            }, 300);
        } else if (document.body.classList.contains('fixed-sidebar')) {
            document.querySelector('#side-menu').style.display = 'none';
            setTimeout(() => {
                document.querySelector('#side-menu').style.display = '';
            }, 300);
        } else {
            document.querySelector('#side-menu').removeAttribute('style');
        }
    }
    const actionToggleNav = (e) => {
        e.preventDefault();
        document.body.classList.toggle('mini-navbar');
        SmoothlyMenu();
    };

    return (
        <div className='row border-bottom'>
            <nav className='navbar navbar-static-top' role='navigation' style={{ marginBottom: 0 }}>

                <div className='navbar-header'>
                    <a className='navbar-minimalize minimalize-styl-2 btn btn-primary' href='#!' onClick={actionToggleNav}>
                        <FontAwesomeIcon icon={faBars} />
                    </a>
                </div>

                <ActioNavBar
                    title="INSPINIA+ React .NET Core"
                />
            </nav>
        </div>
    );
};
