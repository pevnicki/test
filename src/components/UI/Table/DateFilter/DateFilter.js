import React, {useState} from 'react'
import moment from "moment";
import './dateFilter.css'


const DateFilter = (props) => {

    const [items] = useState([
            {
                name: 'Select…',
                value: null,
            },
            {
                name: 'היום',
                value: 'today'
            },
            {
                name: 'השבוע',
                value: 'thisWeek'
            },
            {
                name: 'החודש',
                value: 'thisMonth'
            },
            {
                name: 'השנה',
                value: 'thisYear'
            },
            {
                name: 'מעל שנה',
                value: 'overAYear'
            }
        ]
    )


    return (
        <div className='date'>
            <select
                className="custom-select"
                onChange={(e) => props.onFilterChange(e.currentTarget.value)}
            >
                {items.map((v, i) => (
                    <option
                        key={i}
                        value={v.value}
                    >{v.name}</option>
                ))}
            </select>
        </div>
    );
}

export default DateFilter
