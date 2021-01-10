import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from "../../Firebase";
import {Alert} from "react-bootstrap";
import * as ROUTES from "../../../constants/routes";

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
                this.props.history.push(ROUTES.DASHBOARD);
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
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="addTitleName">Name</label>
                    <input
                        name="name"
                        id="addTitleName"
                        value={name}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Title name"
                        className="form-control"
                    />
                </div>
                <button className="btn btn-secondary btn-lg d-block mb-4" disabled={isInvalid} type="submit">
                    Add
                </button>
                {error && <Alert variant="danger"><span>{error.message}</span></Alert>}
            </form>
        );
    }
}

const TitleForm = compose(
    withRouter,
    withFirebase,
)(AddTitleForm);

export default TitleForm;