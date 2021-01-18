import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {withTranslation} from 'react-i18next';
import * as Icon from "react-bootstrap-icons";
import Alert from "../Alert";

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email, password} = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.DASHBOARD);
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
        const {email, password, error} = this.state;
        const isInvalid = password === '' || email === '';
        const {t} = this.props;

        return (
            <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                    <label htmlFor="user-sign-in-input-email" className="form-label">{t('label_email')}</label>
                    <input
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="email"
                        id="user-sign-in-input-email"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="user-sign-in-input-password" className="form-label">{t('label_password')}</label>
                    <input
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        id="user-sign-in-input-password"
                        className="form-control"
                    />
                </div>
                <div className="text-end">
                    <button disabled={isInvalid} type="submit" className="btn btn__neu btn-primary mb-3">
                        {t('btn_sign_in')}
                    </button>
                </div>
                {error &&
                <Alert type={"warning"} message={error.message} icon={<Icon.ExclamationCircleFill className="fs-3"/>}/>
                }
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
    withTranslation()
)(SignInFormBase);

export default SignInForm;
