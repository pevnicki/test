import React, {Component} from 'react'
import _ from 'lodash'
import moment from 'moment';
import {extendMoment} from 'moment-range';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Table from '../../components/UI/Table/Table'
import Filter from '../../components/UI/Table/Filter/Filter'
import {fetchUserById, fetchUsers} from '../../store/actions/user'
import Loader from "../../components/UI/Loader/Loader";
import './user.css'

const mmt = extendMoment(moment);

class User extends Component {

    state = {
        users: undefined,
        sort: 'asc',
        sortField: 'id'
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.props.fetchUsers()
    }


    onSort = (sortField) => {
        const clonedData = this.props.users.concat()
        const sortType = this.state.sort === 'asc' ? 'desc' : 'asc'
        const orderedData = _.orderBy(clonedData, sortField, sortType)
        this.setState({
            users: orderedData,
            sort: sortType,
            sortField
        })
    }

    onGlobalFilterChange = e => {
        const k = e.target.value.toString().toLowerCase()
        const clonedData = this.props.users.concat()
        let filteredData = clonedData.filter(value => {
            return (
                value.id.toString().toLowerCase().includes(k) ||
                value.firstName.toLowerCase().includes(k) ||
                value.lastName.toLowerCase().includes(k) ||
                value.date.toLowerCase().includes(k) ||
                value.phone.toString().toLowerCase().includes(k)
            )
        });
        this.setState({
            users: filteredData,
        })
    }

    onStringFilterChange = (field, e) => {
        const clonedData = this.props.users.concat()
        let filteredData = clonedData.filter(value => {
            return (
                value[field].toString().toLowerCase().includes(e.target.value.toString().toLowerCase())
            )
        })
        this.setState({
            users: filteredData,
        })
    }
    onDateFilterChange = (type) => {
        const clonedData = this.props.users.concat()
        console.log( moment('"2020-11-10T10:12:31.775Z"',"YYYY-MM-DD").isSame(moment().format("YYYY-MM-DD")))
        let filteredData
        switch (type) {
            case 'today':
                filteredData = clonedData.filter(value => {
                    return (
                        moment(value.date,"YYYY-MM-DD").isSame(moment().format("YYYY-MM-DD"))
                    )
                })
            case 'thisWeek':
                filteredData = clonedData.filter(value => {
                    return (
                        mmt.range(moment().startOf('week'), new Date()).contains(value.date)
                    )
                })


        }


        this.setState({
            users: filteredData,
        })
    }

    onRowSelect = row => {
       this.props.history.push(`/edit/${row.id}`);
    }

    render() {
        return (
            <div className='container-sm user'>
                <h1>Users list</h1>
                {this.props.loading ?
                    <Loader/> :
                    <div>
                        <Filter onInputChange={this.onGlobalFilterChange}/>
                        <Table
                            data={!this.state.users ? this.props.users : this.state.users}
                            onSort={this.onSort}
                            sort={this.state.sort}
                            sortField={this.state.sortField}
                            onRowSelect={this.onRowSelect}
                            onStringFilterChange={this.onStringFilterChange}
                            onDateFilterChange={this.onDateFilterChange}
                        />
                    </div>
                }
            </div>
        );
    }
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
