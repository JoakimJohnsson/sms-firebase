import React, {Component} from 'react';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase';
import {withAuthorization} from '../Session';
import * as ROLES from '../../constants/roles';
import * as Icon from "react-bootstrap-icons";

class AdministrationPage extends Component {
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
                    <div className="col-12 col-lg-8 mb-5">
                        <h1>Administration</h1>
                        <p className="lead mb-5">
                            The Admin Page is accessible by every signed in admin user. Use it to add content to the database and keep track of users.
                        </p>
                        <h2>Guides</h2>
                        <p>TBA - guides to help Admins add content to database.</p>
                        {loading && <div>Loading ...</div>}
                    </div>
                    <UserList users={users}/>
                    <AddContentComponent/>
                </div>
            </div>
        );
    }
}

const UserList = ({users}) => (
    <div className="col-12">
        <h2>Users</h2>
        <ul className="list-unstyled row">
            {users.map(user => (
                <li key={user.uid} className="col-12 col-md-6 col-lg-4 ">
                    <div className="card mb-5">
                        <div className="card-header text-capitalize fs-5 d-flex align-items-center">
                            {user.username}
                            {user.wantAdminPrivileges ? <Icon.Award className="fs-5 ms-2 text-warning"/> : ""}
                            {user.roles ? <Icon.AwardFill className="fs-5 ms-2 text-success"/> : ""}
                        </div>
                        <div className="card-body">
                            <p className="card-subtitle mb-2 text-muted">{user.uid}</p>
                            <p className="card-text">{user.email}</p>
                            <a href="www.sn.se" className="card-link"><Icon.Person className="fs-5 me-1"/> TBA Link to user page</a>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

const AddContentComponent = () => (
    <div className="col-12">
        <h2>Add content</h2>
        <p>TBA - Forms to add content to database.</p>
    </div>
);

const condition = authUser =>
    authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
    withAuthorization(condition),
    withFirebase,
)(AdministrationPage);
