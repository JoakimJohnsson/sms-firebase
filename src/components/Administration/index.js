import React, {Component} from 'react';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase';
import {withAuthorization} from '../Session';
import {useTranslation, withTranslation} from 'react-i18next';
import * as ROLES from '../../constants/roles';
import * as Icon from "react-bootstrap-icons";
import LoadingComponent from "../Loading";
import Titles from "./Title";

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
        const {t} = this.props;
        return (
            <div className="container pt-5">
                <div className="row">
                    <div className="col-12 col-lg-8 mb-5">
                        <h1>{t('administration_header_administration')}</h1>
                        <p className="lead mb-5">
                            {t('administration_lead_administration')}
                        </p>
                        <h2>{t('administration_header_statistics')}</h2>
                        <p>{t('administration_p_statistics')}</p>
                        <p>Number of users: {users.length}</p>
                        <h2>{t('administration_header_guides')}</h2>
                        <p>{t('administration_p_guides')}</p>
                    </div>
                    {loading && <LoadingComponent/>}
                    <UserList users={users}/>
                    <AddContentComponent/>
                </div>
            </div>
        );
    }
}

const UserList = ({users}) => {
    const {t} = useTranslation();
    return (
        <div className="col-12">
            <h2>{t('administration_user-list_component_header_users')}</h2>
            <ul className="list-unstyled row">
                {users.map(user => (
                    <li key={user.uid} className="col-12 col-md-6 col-lg-4 ">
                        <div className="card mb-5">
                            <div className="card-header text-capitalize fs-5 d-flex align-items-center">
                                {user.firstname} {user.lastname}
                                {user.wantAdminPrivileges && !user.roles ? <Icon.Award className="fs-5 ms-2 text-warning"/> : ""}
                                {user.roles ? <Icon.AwardFill className="fs-5 ms-2"/> : ""}
                            </div>
                            <div className="card-body">
                                <p className="card-subtitle mb-2 text-muted">{user.uid}</p>
                                <p className="card-text">{user.email}</p>
                                <a href="https://www.sn.se" className="card-link"><Icon.Person className="fs-5 me-1"/> TBA Link to user page</a>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

const AddContentComponent = () => {
    const {t} = useTranslation();
    return (
        <div className="col-12">
            <h2>{t('administration_add_content_component_header_add_content')}</h2>
            <p>{t('administration_add_content_component_p_forms')}</p>
            <Titles />
        </div>
    )
};

const condition = authUser =>
    authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
    withAuthorization(condition),
    withFirebase,
    withTranslation()
)(AdministrationPage);
