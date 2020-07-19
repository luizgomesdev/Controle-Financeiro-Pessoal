import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Totalizers({ styles, icon, name, value }) {
    return (
        <div className={`box ${styles}`}>
            <p><span className="mr-3" ><FontAwesomeIcon icon={icon} /></span>{name}: {value}</p>
        </div>
    )
}
