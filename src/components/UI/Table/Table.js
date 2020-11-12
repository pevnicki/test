import React, {useState, useEffect, useMemo} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import BTable from 'react-bootstrap/Table'
import {matchSorter} from 'match-sorter'
import moment from 'moment'
import {useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce} from 'react-table'

function GlobalFilter({preGlobalFilteredRows, globalFilter, setGlobalFilter,}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span style={{textAlign: "right"}}>
      Global Search:{' '}
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    width: '100%',
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />
    </span>
    )
}

function DefaultColumnFilter({column: {filterValue, preFilteredRows, setFilter}}) {
    const count = preFilteredRows.length
    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function dateFilterFn(rows, id, filter) {
    const clonedData = [...rows]
    let filteredData
    switch (filter) {
        case 'today':
            filteredData = clonedData.filter(value => {
                console.log(value.original.date)
                const date = moment(value.original.date).format('YYYY-MM-DD').toString()
                return moment(date).isSame(moment().format('YYYY-MM-DD'))
            })
            break
        case 'thisWeek':
            filteredData = clonedData.filter(value => {
                const date = moment(value.original.date).format('YYYY-MM-DD').toString()
                return moment(date).isBetween(moment().startOf('week').format('YYYY-MM-DD').toString(), moment().format('YYYY-MM-DD').toString(), undefined, '[]')
            })
            break
        case 'thisMonth':
            filteredData = clonedData.filter(value => {
                const date = moment(value.original.date).format('YYYY-MM-DD').toString()
                return moment(date).isBetween(moment().startOf('month').format('YYYY-MM-DD').toString(), moment().format('YYYY-MM-DD').toString(), undefined, '[]')
            })
            break
        case 'thisYear':
            filteredData = clonedData.filter(value => {
                const date = moment(value.original.date).format('YYYY-MM-DD').toString()
                return moment(date).isBetween(moment().startOf('year').format('YYYY-MM-DD').toString(), moment().format('YYYY-MM-DD').toString(), undefined, '[]')
            })
            break
        case 'overAYear':
            filteredData = clonedData.filter(value => {
                const date = moment(value.original.date).format('YYYY-MM-DD').toString()
                return moment(date).isBefore(moment().subtract(1, 'year').format('YYYY-MM-DD'))
            })
            break
    }
    return filteredData
}

dateFilterFn.autoRemove = val => !val


const Table = ({data, onRowSelect, columns}) => {

    const filterTypes = React.useMemo(
        () => ({dateFilter: dateFilterFn}),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter
    } = useTable({columns, data, defaultColumn, filterTypes}, useFilters, useGlobalFilter, useSortBy)

    return (
        <>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <BTable {...getTableProps()} >
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                    {column.isSorted
                        ? column.isSortedDesc
                            ? <span className="material-icons"> arrow_upward</span>
                            : <span className="material-icons">arrow_downward</span>
                        : ''}
                  </span>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                    </tr>

                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(
                    (row, i) => {
                        prepareRow(row);
                        return (
                            <tr  {...row.getRowProps()} onClick={() => onRowSelect(row.original)}>
                                {row.cells.map(cell => {

                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                })}
                            </tr>
                        )
                    }
                )}
                </tbody>
            </BTable>
            <br/>
        </>
    )


}


export default Table
