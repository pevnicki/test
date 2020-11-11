import React, {Component} from 'react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import User from './containers/User/User'
import {connect} from 'react-redux'
import Edit from './containers/Edit/Edit'
import Auth from './containers/Auth/Auth'
import {autoLogin} from './store/actions/auth'


class App extends Component {

    componentDidMount() {
        this.props.autoLogin()
    }

    render() {

        // let routes = (
        //     <Switch>
        //         <Route path="/login" component={Auth}/>
        //         <Redirect to="/login"/>
        //     </Switch>
        // )

        // if (this.props.isAuthenticated) {
        // if (this.props.isAuthenticated) {
            let routes = (
                <Switch>
                    <Route path="/home" component={User}/>
                    <Route path="/edit/:id" component={Edit}/>
                    <Redirect to="/home"/>
                </Switch>
            )
        // }
        return (
            <div>
                {routes}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
