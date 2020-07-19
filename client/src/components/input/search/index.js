import React from 'react'

export default function SearchInput({placeholder}) {
    return (
        <>
            <div className="field is-grouped">
                <p className="control is-expanded">
                    <input className="input" type="text" placeholder={placeholder} />
                </p>
                <p className="control">
                    <button className="button is-primary">
                        Search
                     </button>
                </p>
            </div>
        </>
    )
}
