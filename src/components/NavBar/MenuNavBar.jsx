import React, { createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

export default () => {

    const refLi = createRef()
    const refUl = createRef()

    const blurMenu = () => {

        setTimeout(() => {

            document.querySelectorAll('.nav.navbar-top-links.navbar-right > li.dropdown').forEach((e) => {

                e.classList.remove('show')
                e.setAttribute('data-control', 'collapsed')
                let ul = e.querySelector('ul')
                if (ul) ul.classList.remove('show')
            })
        }, 100)
    }

    const toggleMenu = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const isExpanded = refLi.current.getAttribute('data-control') === 'expanded'
        if (!isExpanded) {
            setTimeout(() => {

                refLi.current.classList.add('show')
                refUl.current.classList.add('show')
                refLi.current.setAttribute('data-control', 'expanded')
            }, 150);

        } else {
            setTimeout(() => {

                refLi.current.classList.remove('show')
                refUl.current.classList.remove('show')
                refLi.current.setAttribute('data-control', 'collapsed')
            }, 150);
        }
    }
    function handleTrace(e) {
        e.preventDefault()
    }

    return (
        <li className="dropdown" ref={refLi} onClick={toggleMenu} onBlur={blurMenu}>
            <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#!">
                <FontAwesomeIcon icon={faEllipsisV} />
            </a>

            <ul className="dropdown-menu dropdown-alerts animated flipInX" ref={refUl} >

                <li>
                    <div className="text-center link-block">
                        <a href="#!" className="dropdown-item" onClick={(e) => handleTrace(e)}>
                            <i className="pe-7s-stopwatch"></i>
                            <p>Trace</p>
                        </a>
                    </div>
                </li>
            </ul>
        </li>
    )
};
