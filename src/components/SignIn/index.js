import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

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

        return (
            <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                    <label htmlFor="user-sign-in-input-email" className="form-label">Email address</label>
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
                    <label htmlFor="user-sign-in-input-password" className="form-label">Password</label>
                    <input
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        id="user-sign-in-input-password"
                        className="form-control"
                    />
                </div>
                <button disabled={isInvalid} type="submit" className="btn btn btn-primary mb-3">
                    Sign In
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInForm;
