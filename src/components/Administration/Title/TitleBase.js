import React, {Component} from "react";
import {withFirebase} from "../../Firebase";
import LoadingComponent from "../../Loading"
import Confirmation from "../../Confirmation";
import {compose} from 'recompose';
import * as Icon from "react-bootstrap-icons";
import {withTranslation} from 'react-i18next';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import Alert from "../../Alert";

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

    onEditTitleStartYear = (title, startYear) => {
        const {uid, ...titleSnapshot} = title;

        this.props.firebase.title(title.uid).set({
            ...titleSnapshot,
            startYear,
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
                        onEditTitleStartYear={this.onEditTitleStartYear}
                        onRemoveTitle={this.onRemoveTitle}
                    />
                ) : (
                    <Alert type={"info"} message={t('administration_title_card_component_no_titles')} icon={<Icon.InfoCircleFill className="fs-3"/>}/>
                )}
                {!loading && titles && (
                    <>
                        {limit <= titles.length ?
                            <div className="text-end">
                                <OverlayTrigger
                                    key={"bottom"}
                                    placement={"bottom"}
                                    overlay={
                                        <Tooltip id={"tooltip-show-more"}>
                                            {t('aria_label_show_more_titles')}
                                        </Tooltip>
                                    }>
                                    <button className="btn btn__neu btn-primary m-3" aria-label={t('aria_label_show_more_titles')} type="button"
                                            onClick={this.onNextPage}>
                                        <Icon.ArrowDown className="fs-4"/>
                                    </button>
                                </OverlayTrigger>
                            </div>
                            :
                            <Alert type={"info"} message={t('administration_admin_card_component_showing_all_titles')}
                                   icon={<Icon.InfoCircleFill className="fs-3"/>}/>
                        }
                    </>
                )}
            </div>
        );
    }

}

const TitleListUl = ({titlesList, onEditTitleName, onEditTitleStartYear, onRemoveTitle, t}
) => (
    <ul className="list-group-flush list-group__editable">
        {titlesList.map(title => (
            <TitleListLi
                key={title.uid}
                title={title}
                onEditTitleName={onEditTitleName}
                onEditTitleStartYear={onEditTitleStartYear}
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
            editTitleStartYear: this.props.title.startYear,
        };
    }

    onToggleEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
            editTitleName: this.props.title.name,
        }));
    };

    onToggleEditStartYearMode = () => {
        this.setState(state => ({
            editModeStartYear: !state.editModeStartYear,
            editTitleStartYear: this.props.title.startYear,
        }));
    };

    onChangeEditTitleName = event => {
        this.setState({editTitleName: event.target.value});
    };

    onChangeEditTitleStartYear = event => {
        this.setState({editTitleStartYear: event.target.value});
    };

    onSaveEditTitleName = () => {
        this.props.onEditTitleName(this.props.title, this.state.editTitleName);

        this.setState({editMode: false});
    };

    onSaveEditTitleStartYear = () => {
        this.props.onEditTitleStartYear(this.props.title, this.state.editTitleStartYear);

        this.setState({editModeStartYear: false});
    };

    render() {
        const {title, onRemoveTitle} = this.props;
        const {editMode, editTitleName} = this.state;
        const {editModeStartYear, editTitleStartYear} = this.state;
        const {t} = this.props;
        return (
            <>
                <div className="fs-5 text-secondary text-uppercase d-flex align-items-center m-0">
                    <span>{title.name}</span>
                    <span className="mx-sm-2 d-none d-sm-inline">|</span>
                    <span className="d-none d-sm-inline">{title.startYear}</span>
                    <OverlayTrigger
                        key={"bottom"}
                        placement={"bottom"}
                        overlay={
                            <Tooltip id={"tooltip-delete-title"}>
                                {t('tooltip_delete')}
                            </Tooltip>
                        }>
                        <div className="d-inline mr-2">
                            <Confirmation
                                onConfirm={() => {
                                    onRemoveTitle(title.uid)
                                }}
                                body={t('confirmation_are_you_sure')}
                                confirmText={t('confirmation_confirm_delete')}
                                confirmBSStyle={"btn btn__neu btn-primary"}
                                title={t('confirmation_delete_title')}>
                                <button className={"btn sms-button__list-group-icon text-danger"}>
                                    <Icon.X className="fs-1"/>
                                </button>
                            </Confirmation>
                        </div>
                    </OverlayTrigger>
                </div>

                <li className="list-group-item d-flex justify-content-between align-items-center">
                    {editMode ?
                        <input
                            className="form-control w-75"
                            type="text"
                            value={editTitleName}
                            onChange={this.onChangeEditTitleName}/>
                        :
                        <div>
                            <span className="fw-bold">{t('label_name')}: </span><span>{title.name}</span>
                        </div>
                    }
                    <div>
                        {editMode ?
                            <>
                                <div className="d-inline mr-2">
                                    <OverlayTrigger
                                        key={"bottom"}
                                        placement={"bottom"}
                                        overlay={
                                            <Tooltip id={"tooltip-save"}>
                                                {t('tooltip_save')}
                                            </Tooltip>
                                        }>
                                        <button className="btn sms-button__list-group-icon text-success" onClick={this.onSaveEditTitleName}>
                                            <Icon.BoxArrowInDown className="fs-5"/>
                                        </button>
                                    </OverlayTrigger>
                                </div>
                                <button className="btn sms-button__list-group-icon text-warning" onClick={this.onToggleEditMode}>
                                    <Icon.X className="fs-3"/>
                                </button>
                            </>
                            :
                            <div className="d-inline">
                                <OverlayTrigger
                                    key={"bottom"}
                                    placement={"bottom"}
                                    overlay={
                                        <Tooltip id={"tooltip-edit"}>
                                            {t('tooltip_edit')}
                                        </Tooltip>
                                    }>
                                    <button className="btn sms-button__list-group-icon" onClick={this.onToggleEditMode}>
                                        <Icon.Pencil className="fs-5"/>
                                    </button>
                                </OverlayTrigger>
                            </div>}
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center mb-4">
                    {editModeStartYear ?
                        <input
                            className="form-control w-75"
                            type="text"
                            value={editTitleStartYear}
                            onChange={this.onChangeEditTitleStartYear}/>
                        :
                        <div>
                            <span className="fw-bold">{t('label_startyear')}: </span><span>{title.startYear}</span>
                        </div>}
                    <div>
                        {editModeStartYear ?
                            <>
                                <div className="d-inline mr-2">
                                    <OverlayTrigger
                                        key={"bottom"}
                                        placement={"bottom"}
                                        overlay={
                                            <Tooltip id={"tooltip-save"}>
                                                {t('tooltip_save')}
                                            </Tooltip>
                                        }>
                                        <button className="btn sms-button__list-group-icon text-success" onClick={this.onSaveEditTitleStartYear}>
                                            <Icon.BoxArrowInDown className="fs-5"/>
                                        </button>
                                    </OverlayTrigger>
                                </div>
                                <button className="btn sms-button__list-group-icon text-warning" onClick={this.onToggleEditStartYearMode}>
                                    <Icon.X className="fs-3"/>
                                </button>
                            </>
                            :
                            <div className="d-inline">
                                <OverlayTrigger
                                    key={"bottom"}
                                    placement={"bottom"}
                                    overlay={
                                        <Tooltip id={"tooltip-edit"}>
                                            {t('tooltip_edit')}
                                        </Tooltip>
                                    }>
                                    <button className="btn sms-button__list-group-icon" onClick={this.onToggleEditStartYearMode}>
                                        <Icon.Pencil className="fs-5"/>
                                    </button>
                                </OverlayTrigger>
                            </div>}
                    </div>
                </li>
            </>
        );
    }
}

const Title = compose(
    withFirebase,
    withTranslation()
)(TitleBase);

export default Title;