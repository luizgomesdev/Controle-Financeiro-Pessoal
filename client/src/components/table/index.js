import React from 'react'
import Button from '../button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
export default function TableEntries() {
    return (
        <div className="table-container">
            <table className="table table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Spend</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <th>1</th>
                        <td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester City</a> <strong>(C)</strong>
                        </td>
                        <td>38</td>
                        <td>23</td>
                        <td className="has-text-right">
                            <Button styles="is-primary mr-3">
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button styles="is-danger">
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    )
}
