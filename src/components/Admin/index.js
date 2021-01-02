import React, {Component} from 'react';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase';
import {withAuthorization} from '../Session';
import * as ROLES from '../../constants/roles';
import * as Icon from "react-bootstrap-icons";

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({loading: true});

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const {users, loading} = this.state;
        return (
            <div className="container pt-5">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <h1>Admin</h1>
                        <p className="lead mb-5">
                            The Admin Page is accessible by every signed in admin user.
                        </p>
                        {loading && <div>Loading ...</div>}
                    </div>
                    <UserList users={users}/>
                </div>
            </div>
        );
    }
}

const UserList = ({users}) => (
    <div className="col-12">
        <h2>Users</h2>
        <ul className="list-unstyled">
            {users.map(user => (
                <li key={user.uid}>
                    <div className="card col-12 col-md-6 col-lg-4">
                        <div className="card-body">
                            <h3 className="card-title text-capitalize">{user.username}</h3>
                            <p className="card-subtitle mb-2 text-muted">{user.uid}</p>
                            <p className="card-text">{user.email}</p>
                            <a href="#" className="card-link"><Icon.Person className="fs-5 me-1"/> Link to user page</a>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

const condition = authUser =>
    authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
    withAuthorization(condition),
    withFirebase,
)(AdminPage);
