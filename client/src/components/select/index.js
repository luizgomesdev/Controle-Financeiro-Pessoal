import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'

export default function Select({ defaultValue, options }) {

    return (
        <>
            <div className="field">
                <div className="control has-icons-left">
                    <div className="icon is-small is-left">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                    </div>
                    <div className="select">
                        <select name="select">

                            <option defaultValue> {defaultValue}</option>
                            {options && options.map(option => {
                                return <option key={option} defaultValue={option}>{option}</option>
                            })}

                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}
