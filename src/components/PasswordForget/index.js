import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {useTranslation} from "react-i18next";
import {withTranslation} from 'react-i18next';
import {compose} from "recompose";

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
        const {t} = this.props;
        const isInvalid = email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                    <label htmlFor="user-change-pass-input-email" className="form-label">{t('label_email')}</label>
                    <input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        id="user-change-pass-input-email"
                        className="form-control"
                    />
                </div>
                <div className="text-end">
                    <button disabled={isInvalid} type="submit" className="btn btn__neu btn-primary mb-3">
                        {t('btn_send')}
                    </button>
                </div>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const PasswordForgetLink = (props) => {

    const {t} = useTranslation();

    return (

        <p className={props.class}>
            <Link to={ROUTES.PASSWORD_FORGET}>{t('link_forgot_password')}</Link>
        </p>
    )
};

export default PasswordForgetPage;

const PasswordForgetForm = compose(withFirebase, withTranslation())(PasswordForgetFormBase);

export {PasswordForgetForm, PasswordForgetLink};