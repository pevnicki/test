import React from 'react'
import './filter.css'

const Filter = props => {

    return (
        <div className="custom-filter">
            <div className="input-group">
                <input onChange={(e) => props.onInputChange(e)} type="text" className="form-control"/>
                <div className="input-group-append">
                    <span className="input-group-text">פילטר</span>
                </div>
            </div>
        </div>
    );
}

export default Filter
