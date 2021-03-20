import React from 'react'
import Menu from './MenuNavBar'
import { Link } from 'react-router-dom'


export default (props) => {

    const { title } = props

    return (
        <ul className="nav navbar-top-links navbar-right">

            <li style={{ padding: "20px" }}>
                <span className="m-r-sm text-muted welcome-message"><Link to="/">{title}</Link></span>
            </li>



            <Menu />



        </ul>
    )
}