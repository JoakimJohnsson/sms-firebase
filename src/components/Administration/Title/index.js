import React, {Component, useState} from "react";
import {withFirebase} from "../../Firebase";
import LoadingComponent from "../../Loading"
import TitleForm from "./TitleForm";
import Confirmation from "../../Confirmation";
import * as Icon from "react-bootstrap-icons";
import {Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";

class TitleBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            titles: [],
            limit: 4,
        };
    }
    componentDidMount() {
        this.onListenForTitles()
    }
    onListenForTitles() {
        this.setState({loading: true});
        this.props.firebase
            .titles()
            .orderByChild('name')
            .limitToLast(this.state.limit)
            .on('value', snapshot => {
                const titleObject = snapshot.val();
                if (titleObject) {
                    const titleList = Object.keys(titleObject).map(key => ({
                        ...titleObject[key],
                        uid: key,
                    }));
                    this.setState({
                        titles: titleList,
                        loading: false
                    });
                } else {
                    this.setState({titles: null, loading: false});
                }
            });
    }
    componentWillUnmount() {
        this.props.firebase.titles().off();
    }
    onRemoveTitle = uid => {
        this.props.firebase.title(uid).remove();
    };
    onNextPage = () => {
        this.setState(
            state => ({ limit: state.limit + 2 }),
            this.onListenForTitles,
        );
    };
    onEditTitleName = (title, name) => {
        const { uid, ...titleSnapshot } = title;

        this.props.firebase.title(title.uid).set({
            ...titleSnapshot,
            name,
            editedAt: this.props.firebase.serverValue.TIMESTAMP,
        });
    };

    render() {
        const { titles, loading } = this.state;
        return (
            <div>
                {loading && <LoadingComponent />}
                {titles ? (
                    <TitleListUl
                        titlesList={titles}
                        onEditTitleName={this.onEditTitleName}
                        onRemoveTitle={this.onRemoveTitle}
                    />
                ) : (
                    <div>There are no titles ...</div>
                )}
                {!loading && titles && (
                    <button className="btn btn__neu btn-primary m-3" aria-label="Load more titles" type="button" onClick={this.onNextPage}>
                        <Icon.ArrowDown className="fs-4"/> Show more
                    </button>
                )}
            </div>
        );
    }
}

const AdminCardTitle = () => (
    <div className="col-12 mb-3">
        <div className="card">
            <div className="card-header p-4 d-flex justify-content-between align-items-center">
                <h3 className="m-0">Titles</h3>
                <AdminModalTitle />
            </div>
            <div className="card-body">
                <Title />
            </div>
        </div>
    </div>
);

const AdminModalTitle = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {t} = useTranslation();

    return (
    <>
        <Modal show={show} onHide={handleClose}>

            <div className="modal-header px-0">
                <h2 className="modal-title" id="exampleModalLabel">Add title</h2>
                <button type="button"
                        className="btn"
                        data-bs-dismiss="modal"
                        aria-label={t('aria_label_close')}
                        onClick={handleClose}>
                    <Icon.X className="fs-1"/>
                </button>
            </div>

            <Modal.Body className="px-0">
                <TitleForm/>
            </Modal.Body>
        </Modal>
        <button className="btn" aria-label="Add Title" onClick={handleShow}>
            <Icon.PlusCircle className="fs-2 me-3"/>
        </button>
    </>
)};

const TitleListUl = ({ titlesList, onEditTitleName, onRemoveTitle }) => (
    <ul className="list-group-flush list-group__editable">
        {titlesList.map(title => (
            <TitleListLi
                key={title.uid}
                title={title}
                onEditTitleName={onEditTitleName}
                onRemoveTitle={onRemoveTitle}
            />
        ))}
    </ul>
);

class TitleListLi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            editTitleName: this.props.title.name,
        };
    }

    onToggleEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
            editTitleName: this.props.title.name,
        }));
    };

    onChangeEditTitleName = event => {
        this.setState({ editTitleName: event.target.value });
    };

    onSaveEditTitleName = () => {
        this.props.onEditTitleName(this.props.title, this.state.editTitleName);

        this.setState({ editMode: false });
    };

    render() {
        const { title, onRemoveTitle } = this.props;
        const { editMode, editTitleName } = this.state;

        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">

                {editMode ? (
                    <input
                        className="form-control w-75"
                        type="text"
                        value={editTitleName}
                        onChange={this.onChangeEditTitleName}
                    />
                ) : (
                    <div><span className="font-weight-bold">{title.name}</span> {title.editedAt && <span>(Edited)</span>}</div>
                )}

                <div>
                    {!editMode && (
                        <span className="mr-2">
                            <Confirmation
                                onConfirm={() => {
                                    onRemoveTitle(title.uid)
                                }}
                                body="Are you sure you want to delete this title?"
                                confirmText="Confirm delete"
                                confirmBSStyle={"btn btn__neu btn-primary"}
                                title="Delete title">
                                <button className={"btn sms-button__list-group-icon"}>
                                    <Icon.X className="fs-3"/>
                                </button>
                            </Confirmation>
                        </span>
                    )}
                    {editMode ? (
                        <div>
                            <span className="mr-2">
                                <button className="btn sms-button__list-group-icon" onClick={this.onSaveEditTitleName}><Icon.BoxArrowInDown className="fs-5"/></button>

                            </span>
                            <button className="btn sms-button__list-group-icon"
                                    onClick={this.onToggleEditMode}>
                                <Icon.X className="fs-3"/>
                            </button>

                        </div>

                    ) : (
                        <span>
                            <button className="btn sms-button__list-group-icon" onClick={this.onToggleEditMode}><Icon.Pencil className="fs-5"/></button>

                    </span>
                    )}
                </div>
            </li>
        );
    }
}

const Title = withFirebase(TitleBase);

export default AdminCardTitle;