import React, {Component} from 'react';

import {withFirebase} from '../Firebase';
import {withTranslation} from 'react-i18next';
import {compose} from "recompose";

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {passwordOne} = this.state;

        this.props.firebase
            .doPasswordUpdate(passwordOne)
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
        const {passwordOne, passwordTwo, error} = this.state;
        const {t} = this.props;
        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';

        return (
            <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                    <label htmlFor="user-input-new-password" className="form-label">{t('label_new_password')}</label>
                    <input
                        name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                        id="user-input-new-password"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="user-input-confirm-new-password" className="form-label">{t('label_confirm_new_password')}</label>
                    <input
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        id="user-input-confirm-new-password"
                        className="form-control"
                    />
                </div>
                <button disabled={isInvalid} type="submit" className="btn btn__neu btn-primary mb-3">
                    {t('btn_change_password')}
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default compose(withFirebase, withTranslation())(PasswordChangeForm);
