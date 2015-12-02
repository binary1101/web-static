/*global i18n */
import React, { Component, PropTypes } from 'react';
import UserOnboardingList from './UserOnboardingList';
import UserOnboardingContinueButton from './UserOnboardingMoreButton';
import UserOnboardingStore from '../../stores/UserOnboardingStore';
import * as UserOnboardingActions from '../../actions/UserOnboardingActions';

const SUBSCRIBE_LIMIT = 5;

class UserOnboarding extends Component {
  state = Object.assign(
    {},
    this.getStoreState(),
    { subscribed: 0 })
  componentWillMount() {
    const { isLoading, relationships: rels } = this.state;
    this.sync = this._syncWithStore.bind(this);
    UserOnboardingStore.addChangeListener(this.sync);
    if (rels.length === 0 && !isLoading) {
      UserOnboardingActions.load();
    }
  }
  componentWillUnmount() {
    UserOnboardingStore.removeChangeListener(this.sync);
  }
  getStoreState() {
    return UserOnboardingStore.getState();
  }
  _syncWithStore() {
    this.setState(this.getStoreState());
  }
  render() {
    const { isLoading, relationships } = this.state;
    const subscribed = 0;
    const enough = subscribed >= SUBSCRIBE_LIMIT;

    return (
      <div className="user-onboarding">
        {!enough &&
         <div className="user-onboarding__header">
           {i18n.t('user_onboarding_header', { left: SUBSCRIBE_LIMIT - subscribed })}
         </div>
        }
        <div className="user-onboarding__body">
          <UserOnboardingList
            enough={enough}
            isLoading={isLoading}
            relationships={relationships}
          />
          {enough && <UserOnboardingContinueButton continue={() => {}} />}
        </div>
      </div>
    );
  }
}

export default UserOnboarding;
