import React, {useMemo, useEffect} from 'react'
import moment from 'moment'
import {useHistory } from "react-router-dom"
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/actions/user'
import Loader from "../../components/UI/Loader/Loader"
import './user.css'
import Table from "../../components/UI/Table/Table"

function SelectColumnFilter({column: { filterValue, setFilter, preFilteredRows, id }}) {
    const options = React.useMemo(() => {
        const values=[
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
        return [...values]
    }, [id, preFilteredRows])

    return (
        <select
            value={filterValue}
            onChange={e => {setFilter(e.target.value || undefined)}}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    )
}

function NumberRangeColumnFilter({column: { filterValue = [], preFilteredRows, setFilter, id }}) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
        })
        return [min, max]
    }, [id, preFilteredRows])

    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            Less:<input
                value={filterValue[0] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
                }}
                placeholder={`More`}
                style={{
                    width: '50px',
                    marginRight: '0.5rem',
                }}
            />
            More:
            <input
                value={filterValue[1] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
                }}
                placeholder={`Less`}
                style={{
                    width: '50px',
                    marginLeft: '0.5rem',
                }}
            />
        </div>
    )
}

const User = ({loading, users, fetchUsers}) => {

    useEffect(() => {
        fetchUsers()
    },[])

    const columns = useMemo(() => [{
        Header: 'User list',
        columns: [
            {
                Header: "Id",
                label: "Id",
                accessor: 'id',
                Filter:NumberRangeColumnFilter,
                filter: 'between'
            },
            {
                Header: 'First Name',
                label: "First Name",
                accessor: 'firstName',
            },
            {
                Header: 'Last Name',
                label: 'Last Name',
                accessor: 'lastName',


            },
            {
                Header: 'Date',
                label: 'Date',
                accessor: d => moment(d.date).format("DD-MM-YYYY"),
                Filter: SelectColumnFilter,
                filter: 'dateFilter',

            },
            {
                Header: 'Phone',
                label: 'Phone',
                accessor: 'phone',
            },
        ]
    }
    ], [])

    const history = useHistory();
    const onRowSelect = row => {
        history.push(`/edit/${row.id}`);
    }


    return (
        <div className='container-sm user'>
            <h1>Users list</h1>
            {loading ?
                <Loader/> :
                <div>
                    {/*<Filter onInputChange={this.onGlobalFilterChange}/>*/}
                    <Table
                        data={users}
                        columns={columns}
                        onRowSelect={onRowSelect}
                    />
                </div>
            }
        </div>
    );

}

function mapStateToProps(state) {
    return {
        users: state.user.users,
        loading: state.user.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User))
