/*global i18n */
import React, { findDOMNode, Component, PropTypes } from 'react';
import UserAvatar from '../../../../components/avatars/user_avatar';
import ThreadFormUploadButton from './ThreadFormUploadButton';
import ThreadFormMediaPreview from './ThreadFormMediaPreview';

class MessagesPopupThreadForm extends Component {
  componentDidMount() {
    this.form = findDOMNode(this.refs.messageForm);
    if (this.form instanceof HTMLElement) {
      this.form.focus();
    }
  }
  state = {
    user: window.CurrentUserStore.getUser(),
    files: [],
    isLoading: false,
  }
  onKeyDown(ev) {
    if (ev.key === 'Enter' && !ev.shiftKey && !ev.ctrlKey && !ev.altKey && !ev.metaKey) {
      ev.preventDefault();
      this.sendMessage();
    }
  }
  onFileInputChange(ev) {
    if (!window.File || !window.FileList) {
      return;
    }
    const files = [].slice.call(ev.target.files);
    this.setState({ files: this.state.files.concat(files.map(this.getFileData)) });
  }
  onFileRemove(idx) {
    this.setState({
      files: this.state.files.filter((el, i) => i !== idx),
    });
  }
  getFileData(file) {
    return file;
  }
  clearForm() {
    this.form.value = '';
    this.setState({ files: [] });
  }
  sendMessage() {
    if (this.form.value !== '' || this.state.files.length) {
      MessageActions.newMessage({
        content: this.form.value,
        files: this.state.files,
        conversationId: this.props.conversationId,
      });

      this.clearForm();
    }
  }
  render() {
    return (
      <div className="message-form">
        <span className="messages__user-avatar">
          {
            this.state.isLoading
              ? <span className="spinner spinner--31x31">
                  <span className="spinner__icon"></span>
                </span>
              : <UserAvatar
                  size={35}
                  user={this.state.user}
                />
          }
        </span>
        <div className="message-form__controls">
          <div className="message-form__textarea-container">
            <textarea
                className="message-form__textarea"
                onKeyDown={this.onKeyDown.bind(this)}
                placeholder={i18n.t('new_message_placeholder')}
                ref="messageForm"
            />
          </div>
          <ThreadFormMediaPreview
            files={this.state.files}
            onFileRemove={this.onFileRemove.bind(this)}
          />
          <div className="message-form__button-container">
            <ThreadFormUploadButton onChange={this.onFileInputChange.bind(this)}/>
            <button
              className="message-form__button-send"
              onTouchTap={this.sendMessage.bind(this)}  
            >
              {i18n.t('buttons.messenger.send')}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

MessagesPopupThreadForm.propTypes = {
  conversationId: PropTypes.number.isRequired,
};

export default MessagesPopupThreadForm;