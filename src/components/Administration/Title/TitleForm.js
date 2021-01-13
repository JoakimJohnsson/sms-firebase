import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from "../../Firebase";
import * as ROUTES from "../../../constants/routes";
import {withTranslation} from 'react-i18next';

const INITIAL_STATE = {
    name: '',
    error: null
};

class AddTitleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE
        };
    }

    onSubmit = event => {
        this.props.firebase.titles().push({
            name: this.state.name,
            createdAt: this.props.firebase.serverValue.TIMESTAMP,

        })
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.ADMIN);
            })
            .catch(error => {
                this.setState({error})
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {
            name,
            error,
        } = this.state;
        const isInvalid =
            name === '';
        const {t} = this.props;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                    <label htmlFor="add-title-name" className="form-label">{t('label_name')}</label>
                    <input
                        name="name"
                        id="add-title-name"
                        value={name}
                        onChange={this.onChange}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="text-end">
                <button className="btn btn__neu btn-primary mb-3" disabled={isInvalid} type="submit">
                    {t('btn_add')}
                </button>
                </div>
                {error && <p className="alert alert-warning">{error.message}</p>}
            </form>
        );
    }
}

const TitleForm = compose(
    withRouter,
    withTranslation(),
    withFirebase,
)(AddTitleForm);

export default TitleForm;