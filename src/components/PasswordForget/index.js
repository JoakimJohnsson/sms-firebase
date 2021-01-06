import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
    <div className="container pt-5">
        <div className="row">
            <div className="col-12 col-lg-8">
                <h1>Forgot password?</h1>
                <p className="lead mb-5">
                    Enter your submitted email address in this form, and we'll send you information on how to reset your password.
                </p>
                <div className="sms-form-box__neu mb-5">
                    <h2 className="form-header">Fix my password</h2>
                    <PasswordForgetForm/>
                </div>
            </div>
        </div>
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email} = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({...INITIAL_STATE});
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {email, error} = this.state;

        const isInvalid = email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                    <label htmlFor="user-change-pass-input-email" className="form-label">Email address</label>
                    <input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        id="user-change-pass-input-email"
                        className="form-control"
                    />
                </div>
                <button disabled={isInvalid} type="submit" className="btn btn__neu btn-primary mb-3">
                    Send information
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const PasswordForgetLink = (props) => (
    <p className={props.class}>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export {PasswordForgetForm, PasswordForgetLink};