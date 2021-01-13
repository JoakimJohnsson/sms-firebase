import React, {Component} from "react";
import {withFirebase} from "../../Firebase";
import LoadingComponent from "../../Loading"
import Confirmation from "../../Confirmation";
import {compose} from 'recompose';
import * as Icon from "react-bootstrap-icons";
import {withTranslation} from 'react-i18next';

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
            state => ({limit: state.limit + 2}),
            this.onListenForTitles,
        );
    };
    onEditTitleName = (title, name) => {
        const {uid, ...titleSnapshot} = title;

        this.props.firebase.title(title.uid).set({
            ...titleSnapshot,
            name,
            editedAt: this.props.firebase.serverValue.TIMESTAMP,
        });
    };

    render() {
        const {titles, loading, limit} = this.state;
        const {t} = this.props;

        return (
            <div>
                {loading && <LoadingComponent/>}
                {titles ? (
                    <TitleListUl
                        titlesList={titles}
                        t={t}
                        onEditTitleName={this.onEditTitleName}
                        onRemoveTitle={this.onRemoveTitle}
                    />
                ) : (
                    <div>There are no titles ...</div>
                )}
                {!loading && titles && (
                    <>
                        {limit <= titles.length ?
                            <div className="text-end">
                                <button className="btn btn__neu btn-primary m-3" aria-label={t('aria_label_show_more_titles')} type="button"
                                        onClick={this.onNextPage}>
                                    <Icon.ArrowDown className="fs-4"/>
                                </button>
                            </div>
                            :
                            <div className="alert alert-info">{t('administration_admin_card_component_showing_all_titles')}</div>
                        }
                    </>
                )}
            </div>
        );
    }

}

const TitleListUl = ({titlesList, onEditTitleName, onRemoveTitle, t}
) => (
    <ul className="list-group-flush list-group__editable">
        {titlesList.map(title => (
            <TitleListLi
                key={title.uid}
                title={title}
                onEditTitleName={onEditTitleName}
                onRemoveTitle={onRemoveTitle}
                t={t}
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
        this.setState({editTitleName: event.target.value});
    };

    onSaveEditTitleName = () => {
        this.props.onEditTitleName(this.props.title, this.state.editTitleName);

        this.setState({editMode: false});
    };

    render() {
        const {title, onRemoveTitle} = this.props;
        const {editMode, editTitleName} = this.state;
        const {t} = this.props;
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">

                {editMode ?
                    <input
                        className="form-control w-75"
                        type="text"
                        value={editTitleName}
                        onChange={this.onChangeEditTitleName}/>
                    :
                    <div>
                        <span className="font-weight-bold">{title.name}</span>
                    </div>}

                <div>
                    {!editMode && (
                        <span className="mr-2">
                            <Confirmation
                                onConfirm={() => {
                                    onRemoveTitle(title.uid)
                                }}
                                body={t('confirmation_are_you_sure')}
                                confirmText={t('confirmation_confirm_delete')}
                                confirmBSStyle={"btn btn__neu btn-primary"}
                                title={t('confirmation_delete_title')}>
                                <button className={"btn sms-button__list-group-icon"}>
                                    <Icon.X className="fs-3"/>
                                </button>
                            </Confirmation>
                        </span>
                    )}
                    {editMode ?
                        <div>
                            <span className="mr-2">
                                <button className="btn sms-button__list-group-icon" onClick={this.onSaveEditTitleName}>
                                    <Icon.BoxArrowInDown className="fs-5"/>
                                </button>
                            </span>
                            <button className="btn sms-button__list-group-icon" onClick={this.onToggleEditMode}>
                                <Icon.X className="fs-3"/>
                            </button>
                        </div>
                        :
                        <span>
                            <button className="btn sms-button__list-group-icon" onClick={this.onToggleEditMode}>
                                <Icon.Pencil className="fs-5"/>
                            </button>
                        </span>}
                </div>
            </li>
        );
    }
}

const Title = compose(
    withFirebase,
    withTranslation()
)(TitleBase);

export default Title;