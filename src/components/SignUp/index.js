import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {username, email, passwordOne, isAdmin} = this.state;
        const roles = {};

        if (isAdmin) {
            roles[ROLES.ADMIN] = ROLES.ADMIN;
        }
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
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
            // isAdmin,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                    <label htmlFor="user-create-input-full-name" className="form-label">User name</label>
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
                    <label htmlFor="user-create-input-email" className="form-label">Email address</label>
                    <input
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="email"
                        id="user-create-input-email"
                        className="form-control"
                    />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="user-create-input-password-one" className="form-label">Password</label>
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
                    <label htmlFor="user-create-input-password-two" className="form-label">Confirm password</label>
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    id="user-create-input-password-two"
                    className="form-control"
                />
                </div>
                {/*<label>*/}
                {/*    Admin:*/}
                {/*    <input*/}
                {/*        name="isAdmin"*/}
                {/*        type="checkbox"*/}
                {/*        checked={isAdmin}*/}
                {/*        onChange={this.onChangeCheckbox}*/}
                {/*    />*/}
                {/*</label>*/}
                <button disabled={isInvalid} type="submit" className="btn btn btn-primary mb-3">
                    Sign Up
                </button>

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
)(SignUpFormBase);

export default SignUpForm;