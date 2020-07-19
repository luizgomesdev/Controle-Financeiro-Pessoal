import React from 'react'

export default function Button({ children, styles }) {


    return (
        <button className={`button ${styles}`} >
            {children}
        </button >
    )
}


// ${setup.marginClass} ${setup.isFullWidth && "is-fullwidth"}