import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import is from 'is_js'
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import moment from 'moment'
import './edit.css'
import {editUserById, fetchUserById} from "../../store/actions/user";
import Loader from "../../components/UI/Loader/Loader";


class Edit extends Component {

    state = {
        isFormValid: false,
        formControls: {
            firstName: {
                value: '',
                type: 'text',
                label: 'First name',
                errorMessage: 'Enter correct first name',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 2
                }
            },
            lastName: {
                value: '',
                type: 'text',
                label: 'Second name',
                errorMessage: 'Enter correct second name',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 2
                }
            },
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter correct email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            date: {
                value: '',
                type: 'date',
                label: 'Date',
                errorMessage: 'Enter correct first name',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 2
                }
            },
            phone: {
                value: '',
                type: 'text',
                label: 'Phone',
                errorMessage: 'Phone must be more than 8 characters',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 2
                }
            },
            account: {
                value: '',
                type: 'number',
                label: 'Account',
                errorMessage: 'Account must be more than 8 characters',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 8
                }
            },
            accountName: {
                value: '',
                type: 'text',
                label: 'Account Name',
                errorMessage: 'AccountName must be more than 2 characters',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 2
                }
            },
        }
    }

    componentDidMount() {
        this.props.fetchUserById(this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.user !== nextProps.user) {
            const formControls = {...this.state.formControls}
            Object.keys(formControls).forEach(p => {
              if(p=='date')  {
                  console.log(nextProps.user[p])
                  console.log(moment(nextProps.user[p]).format('DD-MM-YYYY'))
                  formControls[p].value = moment(nextProps.user[p]).format('YYYY-MM-DD')
              }else{
                  formControls[p].value = nextProps.user[p]

              }
                formControls[p].valid = true

                this.setState({
                    formControls,
                    isFormValid:true
                    }
                );
            })
        }
    }

    submitHandler = event => {
        event.preventDefault()
    }

    editHandler = () => {
        const updatedUser = {
            id: this.props.match.params.id,
            firstName: this.state.formControls.firstName.value,
            lastName: this.state.formControls.lastName.value,
            email: this.state.formControls.email.value,
            date: this.state.formControls.date.value,
            phone: this.state.formControls.phone.value,
            account: this.state.formControls.account.value,
            accountName: this.state.formControls.accountName.value
        }
        this.props.editUser(updatedUser)
        this.props.history.push('/home')
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    inputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className='container-sm edit'>
                {this.props.user === null ? <Loader/> :
                    <div>
                        <h1>Edit user</h1>
                        <form onSubmit={this.submitHandler} className='editForm'>
                            {this.inputs()}
                            <Button
                                type="success"
                                onClick={this.editHandler}
                                disabled={!this.state.isFormValid}
                            >שמירה</Button>
                            <Button
                                type="primary"
                                onClick={() => this.props.history.push('/home')}
                            >חזרה</Button>
                        </form>
                    </div>
                }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUserById: (id) => dispatch(fetchUserById(id)),
        editUser: (user) => dispatch(editUserById(user))
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        loading: state.user.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))
