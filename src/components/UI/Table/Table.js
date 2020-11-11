import React from 'react'
import moment from 'moment'
import './table.css'
import DateFilter from "./DateFilter/DateFilter";

export default props => {
    const arrow = (<span className="material-icons">{props.sort === 'asc' ? 'arrow_upward' : 'arrow_downward'}</span>)
    return (
        <table className="table table-bordered">
            <thead>

            <tr>
                <th>

                    <div className="Row">
                        <div className="Column" onClick={props.onSort.bind(null, 'id')}>ID</div>
                        <div className="Column">{props.sortField === 'id' ? arrow : null}</div>
                        <div className="Column"><span className="material-icons">filter_alt</span></div>
                    </div>
                </th>
                <th onClick={props.onSort.bind(null, 'firstName')}>Name {props.sortField === 'firstName' ? arrow : null}
                    <div className="input-group mb-1">
                        <input onChange={props.onStringFilterChange.bind(null, 'firstName')} type="text"
                               className="form-control" placeholder="Username" aria-label="Username"
                               aria-describedby="basic-addon1"/>
                    </div>
                </th>
                <th onClick={props.onSort.bind(null, 'lastName')}>Last
                    Name {props.sortField === 'lastName' ? arrow : null}
                    <div className="input-group mb-1">
                        <input onChange={props.onStringFilterChange.bind(null, 'lastName')} type="text"
                               className="form-control" placeholder="Username" aria-label="Username"
                               aria-describedby="basic-addon1"/>
                    </div>
                </th>
                <th><span onClick={props.onSort.bind(null, 'date')}>Date {props.sortField === 'date' ? arrow : null}</span>
                    <DateFilter onFilterChange={props.onDateFilterChange}/>
                </th>
                <th onClick={props.onSort.bind(null, 'phone')}>
                    <span>Phone {props.sortField === 'phone' ? arrow : null}</span>
                    <span className="material-icons">filter_alt</span>

                </th>
            </tr>

            </thead>
            <tbody>
            {props.data.map(item => (
                <tr key={item.id} onClick={() => props.onRowSelect(item)}>
                    <th>{item.id}</th>
                    <th>{item.firstName}</th>
                    <th>{item.lastName}</th>
                    <th>{moment(item.date).format('DD-MM-YYYY')}</th>
                    <th>{item.phone}</th>
                </tr>
            ))}
            </tbody>
        </table>
    )

}
