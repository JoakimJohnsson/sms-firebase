import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {withTranslation} from 'react-i18next';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    wantAdminPrivileges: false,
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {username, email, passwordOne, wantAdminPrivileges} = this.state;
        const roles = {};

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne, wantAdminPrivileges)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        wantAdminPrivileges,
                        roles
                    });
            })
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

    onChangeCheckbox = event => {
        this.setState({[event.target.name]: event.target.checked});
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            wantAdminPrivileges,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        const {t} = this.props;

        return (
            <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                    <label htmlFor="user-create-input-full-name" className="form-label">{t('label_username')}</label>
                    <input
                        name="username"
                        value={username}
                        onChange={this.onChange}
                        type="text"
                        id="user-create-input-full-name"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="user-create-input-email" className="form-label">{t('label_email')}</label>
                    <input
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="email"
                        id="user-create-input-email"
                        className="form-control"
                    />
                    <div className="form-text">{t('form_email_disclaimer')}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="user-create-input-password-one" className="form-label">{t('label_password')}</label>
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    id="user-create-input-password-one"
                    className="form-control"
                />
                </div>
                <div className="mb-3">
                    <label htmlFor="user-create-input-password-two" className="form-label">{t('label_confirm_password')}</label>
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    id="user-create-input-password-two"
                    className="form-control"
                />
                </div>
                <label>
                    {t('label_admin_privileges')}
                    <input
                        className="ms-2"
                        name="wantAdminPrivileges"
                        type="checkbox"
                        checked={wantAdminPrivileges}
                        onChange={this.onChangeCheckbox}
                    />
                </label>
                <div className="text-end">
                    <button disabled={isInvalid} type="submit" className="btn btn__neu btn-primary mb-3">
                        {t('btn_create')}
                    </button>
                </div>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

// const SignUpForm = withRouter(withFirebase(SignUpFormBase));
// Use compose, so we don't have to nest higher order components as above.
const SignUpForm = compose(
    withRouter,
    withFirebase,
    withTranslation()
)(SignUpFormBase);

export default SignUpForm;