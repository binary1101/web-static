/*global i18n */
import React, { PropTypes } from 'react';

class SettingsRadioItem {
  handleChange(ev) {
    this.props.onChange(ev.target.checked);
  }
  render() {
    const { checked, description, id, title } = this.props;

    return (
      <div className="settings__item">
        <div className="settings__right">
          <div className="switcher">
            <input
              checked={checked}
              className="switcher__input"
              id={id}
              onChange={this.handleChange.bind(this)}
              type="checkbox"
            />
            <label className="switcher__label" htmlFor={id}>
              <span className="switcher__btn switcher__btn--on">
                {i18n.t('settings_radio_button_on')}
              </span>
              <span className="switcher__btn switcher__btn--off">
                {i18n.t('settings_radio_button_off')}
              </span>
            </label>
          </div>
        </div>
        <div className="settings__left">
          <h3 className="settings__title">{title}</h3>
          <p className="settings__desc">{description}</p>
        </div>
      </div>
    );
  }
}

SettingsRadioItem.propTypes = {
  checked: PropTypes.bool,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

SettingsRadioItem.defaultProps = {
  checked: true,
};

export default SettingsRadioItem;
