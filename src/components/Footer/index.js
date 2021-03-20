import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

export default function () {

    const version = "1.0.0.0";    
    return (


        <div className="footer">
            <div>
                <FontAwesomeIcon icon={faLock} className="color-success m-r-xs" title="Seguridad Activada" />
                <label>versión {version}</label>
            </div>
        </div>
    )
}