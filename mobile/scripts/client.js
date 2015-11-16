(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

global.AppStorage = require('./shared/resources/AppStorage');
global.gon = require('./mobile/resources/gon');
require('./mobile/bundle');

ReactApp.start({
  locale: gon.locale,
  userID: gon.user ? gon.user.id : null,
  userToken: gon.user ? gon.user.api_key.access_token : null
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./mobile/bundle":2,"./mobile/resources/gon":243,"./shared/resources/AppStorage":263}],2:[function(require,module,exports){
(function (global){
require('../shared/shims/console');

require('./resources/libs');

global.Routes = require('../shared/routes/routes');

global.ApiRoutes = require('../shared/routes/api');

require('./react/application');

require('./locales/moment/ru');

global.ThumborService = require('../shared/react/services/thumbor');

require('./react/components/auth/auth');

require('./react/components/auth/authEmailSignIn');

require('./react/components/auth/authEmailSignUp');

global.EntryPage = require('./react/pages/entry');

global.TlogDaylogPage = require('./react/pages/tlogDaylog');

global.FeedLivePage = require('./react/pages/feedLive');

global.FeedBestPage = require('./react/pages/feedBest');

global.FeedFriendsPage = require('./react/pages/feedFriends');

global.NotificationsPage = require('./react/pages/notifications');

global.MessengerPage = require('./react/pages/messenger');

global.MessengerThreadPage = require('./react/pages/messengerThread');

global.AuthPage = require('./react/pages/auth');

global.FlowPage = require('./react/components/FlowPage');

global.SettingsPage = require('./react/components/SettingsPage');

global.TlogRegularPage = require('./react/components/TlogRegularPage');

require('./react/stores/conversation');

require('./react/stores/currentUser');

require('./react/stores/feed');

require('./react/stores/message');

require('./react/stores/messagingStatus');

require('./react/stores/notification');

require('./react/stores/relationships');


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../shared/react/services/thumbor":261,"../shared/routes/api":264,"../shared/routes/routes":265,"../shared/shims/console":266,"./locales/moment/ru":3,"./react/application":18,"./react/components/FlowPage":24,"./react/components/SettingsPage":40,"./react/components/TlogRegularPage":50,"./react/components/auth/auth":52,"./react/components/auth/authEmailSignIn":54,"./react/components/auth/authEmailSignUp":55,"./react/pages/auth":224,"./react/pages/entry":225,"./react/pages/feedBest":226,"./react/pages/feedFriends":227,"./react/pages/feedLive":228,"./react/pages/messenger":229,"./react/pages/messengerThread":230,"./react/pages/notifications":232,"./react/pages/tlogDaylog":233,"./react/stores/conversation":236,"./react/stores/currentUser":237,"./react/stores/feed":238,"./react/stores/message":239,"./react/stores/messagingStatus":240,"./react/stores/notification":241,"./react/stores/relationships":242,"./resources/libs":244}],3:[function(require,module,exports){
// Подключаем оригинальный файл с локализацией. В нём производится определение перевода
// вида moment.defineLocale(...)
'use strict';

require('../../../../../node_modules/moment/locale/ru');

// Перезаписываем необходимые правила вендорной локализации.

function plural(word, num) {
  var forms = word.split('_');
  return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
}

function pastTime(output) {
  return output != 'только что' ? '%s назад'.replace(/%s/i, output) : output;
}

function relativeTimeWithPlural(number, withoutSuffix, key) {
  var format = {
    'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
    'hh': 'час_часа_часов',
    'dd': 'день_дня_дней',
    'MM': 'месяц_месяца_месяцев',
    'yy': 'год_года_лет'
  };

  if (key === 'm') {
    return withoutSuffix ? 'минута' : 'минуту';
  } else {
    return number + ' ' + plural(format[key], +number);
  }
}

moment.locale('ru', {
  relativeTime: {
    future: 'через %s',
    past: pastTime,
    s: 'только что',
    m: relativeTimeWithPlural,
    mm: relativeTimeWithPlural,
    h: 'час',
    hh: relativeTimeWithPlural,
    d: 'день',
    dd: relativeTimeWithPlural,
    M: 'месяц',
    MM: relativeTimeWithPlural,
    y: 'год',
    yy: relativeTimeWithPlural
  }
});

},{"../../../../../node_modules/moment/locale/ru":336}],4:[function(require,module,exports){
var AppDispatcher, Constants, CurrentUserServerActions;

Constants = require('../../constants/constants');

AppDispatcher = require('../../dispatcher/dispatcher');

CurrentUserServerActions = {
  update: function(user) {
    return AppDispatcher.handleServerAction({
      type: Constants.currentUser.UPDATE,
      user: user
    });
  },
  updateAvatar: function(userpic) {
    return AppDispatcher.handleServerAction({
      type: Constants.currentUser.UPDATE_AVATAR,
      userpic: userpic
    });
  },
  cancelEmailConfirmation: function() {
    return AppDispatcher.handleServerAction({
      type: Constants.currentUser.CANCEL_EMAIL_CONFIRMATION
    });
  }
};

module.exports = CurrentUserServerActions;


},{"../../constants/constants":210,"../../dispatcher/dispatcher":220}],5:[function(require,module,exports){
var AppDispatcher, Constants, FeedServerActions;

Constants = require('../../constants/constants');

AppDispatcher = require('../../dispatcher/dispatcher');

FeedServerActions = {
  initializeFeed: function(entries) {
    return AppDispatcher.handleServerAction({
      type: Constants.feed.INITIALIZE_FEED,
      entries: entries
    });
  },
  loadEntries: function(entries) {
    return AppDispatcher.handleServerAction({
      type: Constants.feed.LOAD_ENTRIES,
      entries: entries
    });
  }
};

module.exports = FeedServerActions;


},{"../../constants/constants":210,"../../dispatcher/dispatcher":220}],6:[function(require,module,exports){
var AppDispatcher, Constants, MessengerServerActions;

Constants = require('../../constants/constants');

AppDispatcher = require('../../dispatcher/dispatcher');

MessengerServerActions = {
  createConversation: function(conversation) {
    return AppDispatcher.handleServerAction({
      type: Constants.messenger.CREATE_CONVERSATION,
      conversation: conversation
    });
  },
  loadMessages: function(messages) {
    return AppDispatcher.handleServerAction({
      type: Constants.messenger.LOAD_MESSAGES,
      messages: messages
    });
  },
  readMessages: function(ids) {
    return AppDispatcher.handleServerAction({
      type: Constants.messenger.READ_MESSAGES,
      ids: ids
    });
  },
  createMessage: function(message) {
    return AppDispatcher.handleServerAction({
      type: Constants.messenger.CREATE_REMOTE_MESSAGE,
      message: message
    });
  },
  createMessageFail: function(uuid) {
    return AppDispatcher.handleServerAction({
      type: Constants.messenger.CREATE_REMOTE_MESSAGE_FAIL,
      uuid: uuid
    });
  }
};

module.exports = MessengerServerActions;


},{"../../constants/constants":210,"../../dispatcher/dispatcher":220}],7:[function(require,module,exports){
var AppDispatcher, Constants, NotificationsServerActions;

Constants = require('../../constants/constants');

AppDispatcher = require('../../dispatcher/dispatcher');

NotificationsServerActions = {
  load: function(notifications, totalCount) {
    return AppDispatcher.handleServerAction({
      type: Constants.notifications.LOAD,
      notifications: notifications,
      totalCount: totalCount
    });
  },
  read: function(notification) {
    return AppDispatcher.handleServerAction({
      type: Constants.notifications.READ,
      notification: notification
    });
  },
  readAll: function(notifications) {
    return AppDispatcher.handleServerAction({
      type: Constants.notifications.READ_ALL,
      notifications: notifications
    });
  }
};

module.exports = NotificationsServerActions;


},{"../../constants/constants":210,"../../dispatcher/dispatcher":220}],8:[function(require,module,exports){
var AppDispatcher, Constants, RelationshipServerActions;

Constants = require('../../constants/constants');

AppDispatcher = require('../../dispatcher/dispatcher');

RelationshipServerActions = {
  updateRelationship: function(arg) {
    var relationship, userId;
    userId = arg.userId, relationship = arg.relationship;
    return AppDispatcher.handleServerAction({
      type: Constants.relationship.UPDATE_RELATIONSHIP,
      userId: userId,
      relationship: relationship
    });
  }
};

module.exports = RelationshipServerActions;


},{"../../constants/constants":210,"../../dispatcher/dispatcher":220}],9:[function(require,module,exports){
var Api, CurrentUserServerActions, CurrentUserViewActions, NotifyController;

Api = require('../../api/api');

NotifyController = require('../../controllers/notify');

CurrentUserServerActions = require('../server/currentUser');

CurrentUserViewActions = {
  updateEmail: function(newEmail) {
    return this.update({
      email: newEmail
    }).then(function() {
      return NotifyController.notifySuccess(i18n.t('messages.settings_update_email_success'));
    });
  },
  updateAvatar: function(formData) {
    return Api.currentUser.updateAvatar(formData).then(function(userpic) {
      NotifyController.notifySuccess(i18n.t('messages.settings_update_avatar_success'));
      return CurrentUserServerActions.updateAvatar(userpic);
    }).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  update: function(data) {
    return Api.currentUser.update(data).then(function(user) {
      NotifyController.notifySuccess(i18n.t('messages.settings_update_success'));
      return CurrentUserServerActions.update(user);
    }).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  cancelEmailConfirmation: function() {
    return Api.currentUser.cancelEmailConfirmation().then(function() {
      NotifyController.notifySuccess(i18n.t('messages.settings_cancel_email_confirmation_success'));
      return CurrentUserServerActions.cancelEmailConfirmation();
    });
  }
};

module.exports = CurrentUserViewActions;


},{"../../api/api":17,"../../controllers/notify":218,"../server/currentUser":4}],10:[function(require,module,exports){
var Api, EntryViewActions, NotifyController;

Api = require('../../api/api');

NotifyController = require('../../controllers/notify');

EntryViewActions = {
  addToFavorites: function(entryId) {
    return Api.entry.addToFavorites(entryId).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  removeFromFavorites: function(entryId) {
    return Api.entry.removeFromFavorites(entryId).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  startWatch: function(entryId) {
    return Api.entry.startWatch(entryId).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  stopWatch: function(entryId) {
    return Api.entry.stopWatch(entryId).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  report: function(entryId) {
    return Api.entry.report(entryId).then(function() {
      return NotifyController.notifySuccess(i18n.t('messages.entry_report_success'));
    }).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  "delete": function(entryId) {
    return Api.entry["delete"](entryId).then(function() {
      return NotifyController.notifySuccess(i18n.t('messages.entry_delete_success'));
    }).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  vote: function(entryId) {
    return Api.entry.vote(entryId).then(function(rating) {
      NotifyController.notifySuccess(i18n.t('messages.entry_vote_success'));
      return rating;
    }).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  loadComments: function(entryId, toCommentId, limit) {
    return Api.entry.loadComments(entryId, toCommentId, limit).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  createComment: function(entryId, text) {
    return Api.entry.createComment(entryId, text).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  editComment: function(entryId, commentId, text) {
    return Api.entry.editComment(commentId, text).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  deleteComment: function(entryId, commentId) {
    return Api.entry.deleteComment(commentId).then(function() {
      return NotifyController.notifySuccess(i18n.t('messages.comment_report_success'));
    }).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  reportComment: function(commentId) {
    return Api.entry.reportComment(commentId).then(function() {
      return NotifyController.notifySuccess(i18n.t('messages.comment_delete_success'));
    }).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  }
};

module.exports = EntryViewActions;


},{"../../api/api":17,"../../controllers/notify":218}],11:[function(require,module,exports){
var Api, FeedServerActions, FeedViewActions, NotifyController;

Api = require('../../api/api');

NotifyController = require('../../controllers/notify');

FeedServerActions = require('../server/feed');

FeedViewActions = {
  initializeFeed: function(entries) {
    return FeedServerActions.initializeFeed(entries);
  },
  loadLiveEntries: function(sinceEntryId, limit) {
    return Api.feed.loadLiveEntries(sinceEntryId, limit).then((function(_this) {
      return function(response) {
        return FeedServerActions.loadEntries(response.entries);
      };
    })(this)).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  loadBestEntries: function(sinceEntryId, limit) {
    return Api.feed.loadBestEntries(sinceEntryId, limit).then((function(_this) {
      return function(response) {
        return FeedServerActions.loadEntries(response.entries);
      };
    })(this)).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  loadFriendsEntries: function(sinceEntryId, limit) {
    return Api.feed.loadFriendsEntries(sinceEntryId, limit).then((function(_this) {
      return function(response) {
        return FeedServerActions.loadEntries(response.entries);
      };
    })(this)).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  loadTlogEntries: function(tlogId, sinceEntryId, limit) {
    return Api.tlog.loadTlogEntries(tlogId, sinceEntryId, limit).then(function(response) {
      return FeedServerActions.loadEntries(response.entries);
    }).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  }
};

module.exports = FeedViewActions;


},{"../../api/api":17,"../../controllers/notify":218,"../server/feed":5}],12:[function(require,module,exports){
var Api, AppDispatcher, Constants, MessengerServerActions, MessengerViewActions, NotifyController, UuidService;

Api = require('../../api/api');

Constants = require('../../constants/constants');

NotifyController = require('../../controllers/notify');

AppDispatcher = require('../../dispatcher/dispatcher');

MessengerServerActions = require('../server/messenger');

UuidService = require('../../../../shared/react/services/uuid');

MessengerViewActions = {
  createConversation: function(userId) {
    return Api.messenger.createConversation(userId).then(function(conversation) {
      MessengerServerActions.createConversation(conversation);
      return conversation;
    });
  },
  openConversation: function(convID) {
    return AppDispatcher.handleViewAction({
      type: Constants.messenger.OPEN_CONVERSATION,
      convID: convID
    });
  },
  loadMessages: function(convID) {
    return Api.messenger.loadMessages(convID).then(function(response) {
      return MessengerServerActions.loadMessages(response.messages);
    });
  },
  loadMoreMessages: function(convID, toMsgID) {
    return Api.messenger.loadMessages(convID, toMsgID).then(function(response) {
      MessengerServerActions.loadMessages(response.messages);
      return response;
    });
  },
  readMessages: function(convID, ids) {
    return Api.messenger.readMessages(convID, ids).then(function(response) {
      return MessengerServerActions.readMessages(ids);
    });
  },
  createMessage: function(convID, messageText) {
    var uuid;
    uuid = UuidService.generate();
    AppDispatcher.handleViewAction({
      type: Constants.messenger.CREATE_LOCAL_MESSAGE,
      convID: convID,
      messageText: messageText,
      uuid: uuid
    });
    return Api.messenger.createMessage(convID, messageText, uuid).then(function(message) {
      return MessengerServerActions.createMessage(message);
    }).fail(function() {
      NotifyController.notifyError(i18n.t('messages.messenger_create_message_error'));
      return MessengerServerActions.createMessageFail(uuid);
    });
  },
  recreateMessage: function(convID, messageText, uuid) {
    return Api.messenger.createMessage(convID, messageText, uuid).then(function(message) {
      return MessengerServerActions.createMessage(message);
    }).fail(function() {
      NotifyController.notifyError(i18n.t('messages.messenger_recreate_message_error'));
      return MessengerServerActions.createMessageFail(uuid);
    });
  }
};

module.exports = MessengerViewActions;


},{"../../../../shared/react/services/uuid":262,"../../api/api":17,"../../constants/constants":210,"../../controllers/notify":218,"../../dispatcher/dispatcher":220,"../server/messenger":6}],13:[function(require,module,exports){
var Api, NotificationsServerActions, NotificationsViewActions, NotifyController;

Api = require('../../api/api');

NotifyController = require('../../controllers/notify');

NotificationsServerActions = require('../server/notifications');

NotificationsViewActions = {
  loadMore: function(sinceId, limit) {
    return Api.notifications.load(sinceId, limit).then((function(_this) {
      return function(response) {
        var notifications, total_count;
        notifications = response.notifications, total_count = response.total_count;
        return NotificationsServerActions.load(notifications, total_count);
      };
    })(this)).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  read: function(id) {
    return Api.notifications.read(id).then(function(notification) {
      return NotificationsServerActions.read(notification);
    }).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  readAll: function() {
    return Api.notifications.readAll().then((function(_this) {
      return function(notifications) {
        NotifyController.notifySuccess(i18n.t('messages.notifications_mark_all_as_read_success'));
        return NotificationsServerActions.readAll(notifications);
      };
    })(this)).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  }
};

module.exports = NotificationsViewActions;


},{"../../api/api":17,"../../controllers/notify":218,"../server/notifications":7}],14:[function(require,module,exports){
var Api, NotifyController, RelationshipServerActions, RelationshipViewActions;

Api = require('../../api/api');

NotifyController = require('../../controllers/notify');

RelationshipServerActions = require('../server/relationship');

RelationshipViewActions = {
  follow: function(userId) {
    return Api.relationship.follow(userId).then(function(relationship) {
      return RelationshipServerActions.updateRelationship({
        userId: userId,
        relationship: relationship
      });
    }).fail((function(_this) {
      return function(xhr) {
        return NotifyController.errorResponse(xhr);
      };
    })(this));
  },
  unfollow: function(userId) {
    return Api.relationship.unfollow(userId).then(function(relationship) {
      return RelationshipServerActions.updateRelationship({
        userId: userId,
        relationship: relationship
      });
    }).fail((function(_this) {
      return function(xhr) {
        return NotifyController.errorResponse(xhr);
      };
    })(this));
  },
  cancel: function(userId) {
    return Api.relationship.cancel(userId).then(function(relationship) {
      return RelationshipServerActions.updateRelationship({
        userId: userId,
        relationship: relationship
      });
    }).fail((function(_this) {
      return function(xhr) {
        return NotifyController.errorResponse(xhr);
      };
    })(this));
  },
  ignore: function(userId) {
    return Api.relationship.ignore(userId).then(function(relationship) {
      return RelationshipServerActions.updateRelationship({
        userId: userId,
        relationship: relationship
      });
    }).fail((function(_this) {
      return function(xhr) {
        return NotifyController.errorResponse(xhr);
      };
    })(this));
  },
  report: function(userId) {
    return Api.relationship.report(userId).then(function() {
      return NotifyController.notifySuccess(i18n.t('messages.tlog_report_success'));
    }).fail((function(_this) {
      return function(xhr) {
        return NotifyController.errorResponse(xhr);
      };
    })(this));
  }
};

module.exports = RelationshipViewActions;


},{"../../api/api":17,"../../controllers/notify":218,"../server/relationship":8}],15:[function(require,module,exports){
var Api, NotifyController, SessionsViewActions;

Api = require('../../api/api');

NotifyController = require('../../controllers/notify');

SessionsViewActions = {
  signIn: function(login, password) {
    return Api.sessions.signIn(login, password).then(function(user) {
      NotifyController.notifySuccess(i18n.t('messages.auth_signin_success', {
        userSlug: user.slug
      }));
      return user;
    }).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  signUp: function(email, password, nickname) {
    return Api.sessions.signUp(email, password, nickname).then(function(user) {
      NotifyController.notifySuccess(i18n.t('messages.auth_signup_success', {
        userSlug: user.slug
      }));
      return user;
    }).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  },
  recover: function(login) {
    return Api.sessions.recover(login).then(function() {
      return NotifyController.notifySuccess(i18n.t('messages.auth_recovery_mail_sent_success'));
    }).fail(function(xhr) {
      return NotifyController.errorResponse(xhr);
    });
  }
};

module.exports = SessionsViewActions;


},{"../../api/api":17,"../../controllers/notify":218}],16:[function(require,module,exports){
var Api, UsersViewActions;

Api = require('../../api/api');

UsersViewActions = {
  predict: function(query) {
    return Api.users.predict(query);
  }
};

module.exports = UsersViewActions;


},{"../../api/api":17}],17:[function(require,module,exports){
var Api, Constants, CurrentUserStore, TIMEOUT, _, _pendingRequests, abortPendingRequests, assign, csrfToken, deleteRequest, getRequest, postRequest, putRequest, request, userToken;

_ = require('lodash');

assign = require('react/lib/Object.assign');

Constants = require('../constants/constants');

CurrentUserStore = require('../stores/currentUser');

TIMEOUT = 10000;

_pendingRequests = {};

abortPendingRequests = function(key) {
  if (_pendingRequests[key]) {
    _pendingRequests[key].abort();
    return _pendingRequests[key] = null;
  }
};

userToken = function() {
  return CurrentUserStore.getAccessToken();
};

csrfToken = function() {
  var tokenNode;
  tokenNode = document.querySelector('[name="csrf-token"]');
  if (tokenNode != null) {
    return tokenNode.getAttribute('content');
  } else {
    return null;
  }
};

request = function(_method, url, data) {
  var contentType, headers, method, processData;
  if (data == null) {
    data = {};
  }
  headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Tasty-Client-Name': 'web_mobile',
    'X-Tasty-Client-Version': gon.version
  };
  if (userToken()) {
    headers['X-User-Token'] = userToken();
  }
  if (csrfToken()) {
    headers['X-CSRF-Token'] = csrfToken();
  }
  method = (function() {
    switch (_method) {
      case 'GET':
        return 'GET';
      case 'POST':
      case 'PUT':
      case 'DELETE':
        return 'POST';
      default:
        return 'GET';
    }
  })();
  if (data instanceof FormData) {
    contentType = false;
    processData = false;
    data.append('_method', _method);
  } else {
    contentType = 'application/x-www-form-urlencoded';
    processData = true;
    data = _.extend({}, data, {
      _method: _method
    });
  }
  return $.ajax({
    url: url,
    method: method,
    data: data,
    contentType: contentType,
    processData: processData,
    headers: headers,
    xhrFields: {
      withCredentials: true,
      crossDomain: true
    }
  });
};

getRequest = function(url, data) {
  return request('GET', url, data);
};

postRequest = function(url, data) {
  return request('POST', url, data);
};

putRequest = function(url, data) {
  return request('PUT', url, data);
};

deleteRequest = function(url, data) {
  return request('DELETE', url, data);
};

Api = {
  locales: {
    load: function(locale) {
      var url;
      url = gon.localesPath + '/' + locale + '.json';
      return getRequest(url);
    }
  },
  currentUser: {
    update: function(data) {
      var key, url;
      url = ApiRoutes.update_profile_url();
      key = Constants.api.UPDATE_CURRENT_USER;
      abortPendingRequests(key);
      return _pendingRequests[key] = putRequest(url, data);
    },
    updateAvatar: function(formData) {
      var key, url;
      url = ApiRoutes.userpic_url();
      key = Constants.api.UPDATE_CURRENT_USER_AVATAR;
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url, formData);
    },
    cancelEmailConfirmation: function() {
      var key, url;
      url = ApiRoutes.request_confirm_url();
      key = Constants.api.CANCEL_EMAIL_CONFIRMATION;
      abortPendingRequests(key);
      return _pendingRequests[key] = deleteRequest(url);
    }
  },
  users: {
    predict: function(query) {
      var data, key, url;
      url = ApiRoutes.users_predict();
      key = Constants.api.USERS_PREDICT;
      data = {
        query: query
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = getRequest(url, data);
    }
  },
  notifications: {
    load: function(sinceId, limit) {
      var data, key, url;
      url = ApiRoutes.notificationsUrl();
      key = Constants.api.LOAD_NOTIFICATIONS;
      data = {
        limit: limit,
        to_notification_id: sinceId
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = getRequest(url, data);
    },
    read: function(id) {
      var key, url;
      url = ApiRoutes.notifications_read_url(id);
      key = Constants.api.READ_NOTIFICATIONS;
      abortPendingRequests(key);
      return _pendingRequests[key] = putRequest(url);
    },
    readAll: function() {
      var key, url;
      url = ApiRoutes.notificationsReadAllUrl();
      key = Constants.api.READ_NOTIFICATIONS;
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url);
    }
  },
  messaging: {
    ready: function(socketID) {
      var data, key, url;
      url = ApiRoutes.messenger_ready_url();
      key = Constants.api.READY_TO_MESSAGING;
      data = {
        socket_id: socketID
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url, data);
    }
  },
  messenger: {
    createConversation: function(userID) {
      var key, url;
      url = ApiRoutes.messengerConversationsByUserId(userID);
      key = Constants.api.CREATE_CONVERSATION;
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url);
    },
    loadMessages: function(convID, toMsgID) {
      var data, key, url;
      url = ApiRoutes.messenger_load_messages_url(convID);
      key = Constants.api.LOAD_MESSAGES;
      data = {
        limit: 40
      };
      if (toMsgID != null) {
        data.to_message_id = toMsgID;
      }
      abortPendingRequests(key);
      return _pendingRequests[key] = getRequest(url, data);
    },
    readMessages: function(convID, ids) {
      var data, key, url;
      url = ApiRoutes.messenger_read_messages_url(convID);
      key = Constants.api.READ_MESSAGES;
      data = {
        ids: ids.join(',')
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = putRequest(url, data);
    },
    createMessage: function(convID, messageText, uuid) {
      var data, key, url;
      url = ApiRoutes.messenger_new_message_url(convID);
      key = Constants.api.CREATE_MESSAGE;
      data = {
        content: messageText,
        uuid: uuid
      };
      return _pendingRequests[key] = postRequest(url, data);
    }
  },
  relationship: {
    follow: function(userId) {
      var key, url;
      url = ApiRoutes.change_my_relationship_url(userId, 'follow');
      key = Constants.api.FOLLOW_USER;
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url);
    },
    unfollow: function(userId) {
      var key, url;
      url = ApiRoutes.change_my_relationship_url(userId, 'unfollow');
      key = Constants.api.UNFOLLOW_USER;
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url);
    },
    cancel: function(userId) {
      var key, url;
      url = ApiRoutes.change_my_relationship_url(userId, 'cancel');
      key = Constants.api.CANCEL_USER;
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url);
    },
    ignore: function(userId) {
      var key, url;
      url = ApiRoutes.change_my_relationship_url(userId, 'ignore');
      key = Constants.api.IGNORE_USER;
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url);
    },
    report: function(userId) {
      var key, url;
      url = ApiRoutes.tlog_report(userId);
      key = Constants.api.REPORT_USER;
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url);
    }
  },
  entry: {
    addToFavorites: function(entryId) {
      var data, key, url;
      url = ApiRoutes.favorites_url();
      key = Constants.api.ADD_TO_FAVORITES;
      data = {
        entry_id: entryId
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url, data);
    },
    removeFromFavorites: function(entryId) {
      var data, key, url;
      url = ApiRoutes.favorites_url();
      key = Constants.api.REMOVE_FROM_FAVORITES;
      data = {
        entry_id: entryId
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = deleteRequest(url, data);
    },
    startWatch: function(entryId) {
      var data, key, url;
      url = ApiRoutes.watching_url();
      key = Constants.api.START_WATCH;
      data = {
        entry_id: entryId
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url, data);
    },
    stopWatch: function(entryId) {
      var data, key, url;
      url = ApiRoutes.watching_url();
      key = Constants.api.STOP_WATCH;
      data = {
        entry_id: entryId
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = deleteRequest(url, data);
    },
    report: function(entryId) {
      var key, url;
      url = ApiRoutes.report_url(entryId);
      key = Constants.api.REPORT;
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url);
    },
    "delete": function(entryId) {
      var key, url;
      url = ApiRoutes.entry_url(entryId);
      key = Constants.api.DELETE;
      abortPendingRequests(key);
      return _pendingRequests[key] = deleteRequest(url);
    },
    vote: function(entryId) {
      var key, url;
      url = ApiRoutes.votes_url(entryId);
      key = Constants.api.VOTE;
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url);
    },
    loadComments: function(entryId, toCommentId, limit) {
      var data, key, url;
      url = ApiRoutes.comments_url();
      key = Constants.api.LOAD_COMMENTS;
      data = {
        entry_id: entryId,
        to_comment_id: toCommentId,
        limit: limit
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = getRequest(url, data);
    },
    deleteComment: function(commentId) {
      var key, url;
      url = ApiRoutes.comments_edit_delete_url(commentId);
      key = Constants.api.DELETE_COMMENT;
      abortPendingRequests(key);
      return _pendingRequests[key] = deleteRequest(url);
    },
    reportComment: function(commentId) {
      var key, url;
      url = ApiRoutes.comments_report_url(commentId);
      key = Constants.api.REPORT_COMMENT;
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url);
    },
    createComment: function(entryId, text) {
      var data, key, url;
      url = ApiRoutes.comments_url();
      key = Constants.api.CREATE_COMMENT;
      data = {
        entry_id: entryId,
        text: text
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url, data);
    },
    editComment: function(commentId, text) {
      var data, key, url;
      url = ApiRoutes.comments_edit_delete_url(commentId);
      key = Constants.api.EDIT_COMMENT;
      data = {
        text: text
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = putRequest(url, data);
    }
  },
  tlog: {
    loadTlogEntries: function(tlogId, sinceEntryId, limit) {
      var data, key, url;
      url = ApiRoutes.tlogEntries(tlogId);
      key = Constants.api.LOAD_TLOG_ENTRIES;
      data = {
        since_entry_id: sinceEntryId,
        limit: limit
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = getRequest(url, data);
    },
    loadTlogEntriesTlogs: function(tlogId, sinceEntryId, limit) {
      var data, key, url;
      url = ApiRoutes.tlogEntriesTlogs(tlogId);
      key = Constants.api.LOAD_TLOG_ENTRIES;
      data = {
        since_entry_id: sinceEntryId,
        limit: limit
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = getRequest(url, data);
    }
  },
  feed: {
    loadLiveEntries: function(sinceEntryId, limit) {
      var data, key, url;
      url = ApiRoutes.feedLive();
      key = Constants.api.LOAD_FEED_ENTRIES;
      data = {
        since_entry_id: sinceEntryId,
        limit: limit,
        include_comments_info: 1
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = getRequest(url, data);
    },
    loadBestEntries: function(sinceEntryId, limit) {
      var data, key, url;
      url = ApiRoutes.feedBest();
      key = Constants.api.LOAD_FEED_ENTRIES;
      data = {
        since_entry_id: sinceEntryId,
        limit: limit,
        include_comments_info: 1
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = getRequest(url, data);
    },
    loadFriendsEntries: function(sinceEntryId, limit) {
      var data, key, url;
      url = ApiRoutes.feedFriends();
      key = Constants.api.LOAD_FEED_ENTRIES;
      data = {
        since_entry_id: sinceEntryId,
        limit: limit,
        include_comments_info: 1
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = getRequest(url, data);
    }
  },
  sessions: {
    signIn: function(login, password) {
      var data, key, url;
      url = ApiRoutes.signin_url();
      key = Constants.api.SIGN_IN;
      data = {
        email: login,
        password: password
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url, data);
    },
    signUp: function(email, password, nickname) {
      var data, key, url;
      url = ApiRoutes.signup_url();
      key = Constants.api.SIGN_UP;
      data = {
        email: email,
        password: password,
        slug: nickname
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url, data);
    },
    recover: function(login) {
      var data, key, url;
      url = ApiRoutes.recovery_url();
      key = Constants.api.RECOVER;
      data = {
        slug_or_email: login
      };
      abortPendingRequests(key);
      return _pendingRequests[key] = postRequest(url, data);
    }
  }
};

module.exports = Api;


},{"../constants/constants":210,"../stores/currentUser":237,"lodash":"lodash","react/lib/Object.assign":339}],18:[function(require,module,exports){
(function (global){
var MessagingService, ReactUjs, initLocales;

global.i18n = require('i18next');

ReactUjs = require('reactUjs');

MessagingService = require('./services/messaging');

initLocales = function(locale, callback) {
  return i18n.init({
    lng: locale,
    fallbackLng: 'ru',
    cache: true,
    resGetPath: Routes.locale()
  }, callback);
};

window.ReactApp = {
  messagingService: null,
  start: function(arg) {
    var locale, userID, userToken;
    locale = arg.locale, userID = arg.userID, userToken = arg.userToken;
    console.log('ReactApp start');
    initLocales(locale, function() {
      console.log('Locales loaded');
      return ReactUjs.initialize();
    });
    if (userID && userToken) {
      return this.messagingService = new MessagingService(userID, userToken);
    }
  }
};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./services/messaging":234,"i18next":"i18next","reactUjs":"reactUjs"}],19:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _storesCurrentUser = require('../../stores/currentUser');

var _storesCurrentUser2 = _interopRequireDefault(_storesCurrentUser);

var _sharedReactMixinsConnectStore = require('../../../../shared/react/mixins/connectStore');

var _sharedReactMixinsConnectStore2 = _interopRequireDefault(_sharedReactMixinsConnectStore);

var _DaylogEmptyPage = require('./DaylogEmptyPage');

var _DaylogEmptyPage2 = _interopRequireDefault(_DaylogEmptyPage);

var _DaylogOwnEmptyPage = require('./DaylogOwnEmptyPage');

var _DaylogOwnEmptyPage2 = _interopRequireDefault(_DaylogOwnEmptyPage);

var _entryTlog = require('../entry/Tlog');

var _entryTlog2 = _interopRequireDefault(_entryTlog);

var Daylog = React.createClass({
  displayName: 'Daylog',

  mixins: [(0, _sharedReactMixinsConnectStore2['default'])(_storesCurrentUser2['default'])],

  propTypes: {
    tlog: React.PropTypes.object.isRequired,
    entries: React.PropTypes.array.isRequired
  },

  render: function render() {
    var content = undefined;

    if (this.props.entries.length) {
      content = this.renderEntryList();
    } else {
      content = this.renderEmptyPage();
    }

    return content;
  },

  renderEntryList: function renderEntryList() {
    var entries = this.props.entries;

    return React.createElement(
      'div',
      { className: 'posts' },
      entries.map(function (entry) {
        return React.createElement(_entryTlog2['default'], {
          commentFormVisible: entries.length === 1,
          entry: entry,
          key: entry.id
        });
      })
    );
  },

  renderEmptyPage: function renderEmptyPage() {
    var isLogged = this.state.user != null;
    var emptyPage = undefined;

    if (isLogged && this.props.tlog.author.id == this.state.user.id) {
      emptyPage = React.createElement(_DaylogOwnEmptyPage2['default'], { userSlug: this.state.user.slug });
    } else {
      emptyPage = React.createElement(_DaylogEmptyPage2['default'], null);
    }

    return emptyPage;
  },

  getStateFromStore: function getStateFromStore() {
    return {
      user: _storesCurrentUser2['default'].getUser()
    };
  }
});

exports['default'] = Daylog;
module.exports = exports['default'];

},{"../../../../shared/react/mixins/connectStore":260,"../../stores/currentUser":237,"../entry/Tlog":101,"./DaylogEmptyPage":20,"./DaylogOwnEmptyPage":21,"babel-runtime/helpers/interop-require-default":278}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DaylogEmptyPage = React.createClass({
  displayName: "DaylogEmptyPage",

  render: function render() {
    return React.createElement(
      "div",
      { className: "content-info" },
      React.createElement(
        "div",
        { className: "content-info__icon" },
        React.createElement("i", { className: "icon icon--paper-corner" })
      ),
      React.createElement(
        "p",
        { className: "content-info__text" },
        i18n.t('tlog.daylog_empty_page')
      )
    );
  }
});

exports["default"] = DaylogEmptyPage;
module.exports = exports["default"];

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var DaylogOwnEmptyPage = React.createClass({
  displayName: 'DaylogOwnEmptyPage',

  propTypes: {
    userSlug: React.PropTypes.string.isRequired
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'text-content text-content--main' },
      React.createElement(
        'h2',
        null,
        i18n.t('tlog.welcome', { userSlug: this.props.userSlug })
      ),
      React.createElement(
        'p',
        null,
        i18n.t('tlog.welcome_tasty')
      ),
      React.createElement(
        'p',
        null,
        i18n.t('tlog.ready_for'),
        ' ',
        React.createElement(
          'a',
          { href: Routes.new_entry_url(this.props.userSlug) },
          i18n.t('tlog.for_new_entry')
        ),
        '.'
      ),
      React.createElement(
        'p',
        null,
        i18n.t('tlog.list_of_options'),
        ':'
      ),
      React.createElement(
        'ul',
        null,
        React.createElement(
          'li',
          null,
          i18n.t('tlog.setting_up_design'),
          ' ',
          React.createElement(
            'a',
            { href: Routes.userDesignSettings(this.props.userSlug) },
            i18n.t('tlog.design_here')
          )
        ),
        React.createElement(
          'li',
          null,
          i18n.t('tlog.setting_up_settings'),
          ' ',
          React.createElement(
            'a',
            { href: Routes.userSettings(this.props.userSlug) },
            i18n.t('tlog.settings_here')
          )
        ),
        React.createElement(
          'li',
          null,
          i18n.t('tlog.read_live_feed'),
          ' ',
          React.createElement(
            'a',
            { href: Routes.live_feed_path() },
            i18n.t('tlog.live_feed')
          ),
          '.'
        )
      ),
      React.createElement(
        'p',
        null,
        i18n.t('tlog.ask_question')
      )
    );
  }
});

exports['default'] = DaylogOwnEmptyPage;
module.exports = exports['default'];

},{}],22:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sharedReactProjectTypes = require('../../../../shared/react/ProjectTypes');

var ProjectTypes = _interopRequireWildcard(_sharedReactProjectTypes);

var _storesFeed = require('../../stores/feed');

var _storesFeed2 = _interopRequireDefault(_storesFeed);

var _mixinsComponent = require('../../mixins/component');

var _mixinsComponent2 = _interopRequireDefault(_mixinsComponent);

var _sharedReactMixinsConnectStore = require('../../../../shared/react/mixins/connectStore');

var _sharedReactMixinsConnectStore2 = _interopRequireDefault(_sharedReactMixinsConnectStore);

var _feedMixinsFeed = require('../feed/mixins/feed');

var _feedMixinsFeed2 = _interopRequireDefault(_feedMixinsFeed);

var _actionsViewFeed = require('../../actions/view/feed');

var _actionsViewFeed2 = _interopRequireDefault(_actionsViewFeed);

var _feedFeed = require('../feed/feed');

var _feedFeed2 = _interopRequireDefault(_feedFeed);

var FeedFlow = (0, _react.createClass)({
  displayName: 'FeedFlow',
  mixins: [(0, _sharedReactMixinsConnectStore2['default'])(_storesFeed2['default']), _feedMixinsFeed2['default'], _mixinsComponent2['default']],
  propTypes: {
    flow: ProjectTypes.flow.isRequired,
    limit: _react.PropTypes.number.isRequired
  },

  loadMoreEntries: function loadMoreEntries() {
    var _props = this.props;
    var flowId = _props.flow.id;
    var limit = _props.limit;
    var entries = this.state.entries;

    var sinceEntryId = entries[entries.length - 1].id;

    this.activateLoadingState();

    _actionsViewFeed2['default'].loadTlogEntries(flowId, sinceEntryId, limit).then(this.activateShowState).fail(this.activateErrorState);
  },

  render: function render() {
    var _state = this.state;
    var entries = _state.entries;
    var everythingLoaded = _state.everythingLoaded;

    return _react2['default'].createElement(_feedFeed2['default'], {
      entries: entries,
      everythingLoaded: everythingLoaded,
      loading: this.isLoadingState(),
      onLoadMore: this.loadMoreEntries
    });
  }
});

exports['default'] = FeedFlow;
module.exports = exports['default'];

},{"../../../../shared/react/ProjectTypes":247,"../../../../shared/react/mixins/connectStore":260,"../../actions/view/feed":11,"../../mixins/component":222,"../../stores/feed":238,"../feed/feed":133,"../feed/mixins/feed":138,"babel-runtime/helpers/interop-require-default":278,"babel-runtime/helpers/interop-require-wildcard":279,"react":"react"}],23:[function(require,module,exports){
/*global i18n, Routes */
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sharedReactProjectTypes = require('../../../../shared/react/ProjectTypes');

var ProjectTypes = _interopRequireWildcard(_sharedReactProjectTypes);

var _heroFeed = require('../hero/feed');

var _heroFeed2 = _interopRequireDefault(_heroFeed);

var _buttonsRelationshipFollow = require('../buttons/relationship/follow');

var _buttonsRelationshipFollow2 = _interopRequireDefault(_buttonsRelationshipFollow);

var HeroFlow = (function (_Component) {
  _inherits(HeroFlow, _Component);

  function HeroFlow() {
    _classCallCheck(this, HeroFlow);

    _get(Object.getPrototypeOf(HeroFlow.prototype), 'constructor', this).apply(this, arguments);

    this.state = { flow: this.props.flow };
  }

  _createClass(HeroFlow, [{
    key: 'writeButton',
    value: function writeButton() {
      function redirect() {
        window.location.href = Routes.new_entry_url(this.state.flow.slug);
      }

      return(
        //cannot use <a> with href. it breaks the design of the button
        _react2['default'].createElement(
          'button',
          { className: 'button button--extra-small button--green',
            onClick: redirect.bind(this)
          },
          i18n.t('buttons.hero_flow_create_entry')
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _state$flow = this.state.flow;
      var can_write = _state$flow.can_write;
      var original_url = _state$flow.flowpic.original_url;
      var name = _state$flow.name;
      var public_tlog_entries_count = _state$flow.public_tlog_entries_count;
      var _props$relationship = this.props.relationship;
      var reader_id = _props$relationship.reader_id;
      var state = _props$relationship.state;

      return _react2['default'].createElement(
        _heroFeed2['default'],
        { backgroundUrl: original_url,
          entriesCount: public_tlog_entries_count,
          title: '#' + name
        },
        _react2['default'].createElement(
          'div',
          { className: 'hero__actions hero__actions--visible' },
          can_write && this.writeButton(),
          _react2['default'].createElement(_buttonsRelationshipFollow2['default'], { status: state, user: this.state.flow })
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      flow: ProjectTypes.flow.isRequired,
      relationship: ProjectTypes.relationship
    },
    enumerable: true
  }]);

  return HeroFlow;
})(_react.Component);

exports['default'] = HeroFlow;
module.exports = exports['default'];

},{"../../../../shared/react/ProjectTypes":247,"../buttons/relationship/follow":73,"../hero/feed":139,"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/get":276,"babel-runtime/helpers/inherits":277,"babel-runtime/helpers/interop-require-default":278,"babel-runtime/helpers/interop-require-wildcard":279,"react":"react"}],24:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sharedReactProjectTypes = require('../../../../shared/react/ProjectTypes');

var ProjectTypes = _interopRequireWildcard(_sharedReactProjectTypes);

var _storesFeed = require('../../stores/feed');

var _storesFeed2 = _interopRequireDefault(_storesFeed);

var _commonPagePageWithAuth = require('../common/page/PageWithAuth');

var _commonPagePageWithAuth2 = _interopRequireDefault(_commonPagePageWithAuth);

var _commonPagePageLayout = require('../common/page/PageLayout');

var _commonPagePageLayout2 = _interopRequireDefault(_commonPagePageLayout);

var _commonPagePageHeader = require('../common/page/PageHeader');

var _commonPagePageHeader2 = _interopRequireDefault(_commonPagePageHeader);

var _commonPagePageBody = require('../common/page/PageBody');

var _commonPagePageBody2 = _interopRequireDefault(_commonPagePageBody);

var _HeroFlow = require('./HeroFlow');

var _HeroFlow2 = _interopRequireDefault(_HeroFlow);

var _FeedFlow = require('./FeedFlow');

var _FeedFlow2 = _interopRequireDefault(_FeedFlow);

var FlowPage = (function (_Component) {
  _inherits(FlowPage, _Component);

  function FlowPage() {
    _classCallCheck(this, FlowPage);

    _get(Object.getPrototypeOf(FlowPage.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(FlowPage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _storesFeed2['default'].initialize(this.props.entries);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var currentUser = _props.currentUser;
      var entries = _props.entries;
      var flow = _props.flow;
      var locale = _props.locale;
      var relationship = _props.relationship;

      return _react2['default'].createElement(
        _commonPagePageWithAuth2['default'],
        {
          currentUser: currentUser,
          locale: locale
        },
        _react2['default'].createElement(
          _commonPagePageLayout2['default'],
          null,
          _react2['default'].createElement(
            _commonPagePageHeader2['default'],
            null,
            _react2['default'].createElement(_HeroFlow2['default'], {
              flow: flow,
              relationship: relationship
            })
          ),
          _react2['default'].createElement(
            _commonPagePageBody2['default'],
            null,
            _react2['default'].createElement(_FeedFlow2['default'], {
              entries: entries,
              flow: flow
            })
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      currentUser: _react.PropTypes.object, //elaborate
      entries: _react.PropTypes.array.isRequired,
      flow: ProjectTypes.flow.isRequired,
      locale: _react.PropTypes.string.isRequired,
      relationship: ProjectTypes.relationship
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      entries: []
    },
    enumerable: true
  }]);

  return FlowPage;
})(_react.Component);

exports['default'] = FlowPage;
module.exports = exports['default'];

},{"../../../../shared/react/ProjectTypes":247,"../../stores/feed":238,"../common/page/PageBody":80,"../common/page/PageHeader":81,"../common/page/PageLayout":82,"../common/page/PageWithAuth":83,"./FeedFlow":22,"./HeroFlow":23,"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/get":276,"babel-runtime/helpers/inherits":277,"babel-runtime/helpers/interop-require-default":278,"babel-runtime/helpers/interop-require-wildcard":279,"react":"react"}],25:[function(require,module,exports){
var PropTypes, SettingsAccounts, UserAvatar;

UserAvatar = require('../common/avatar/user');

PropTypes = React.PropTypes;

SettingsAccounts = React.createClass({
  displayName: 'SettingsAccounts',
  propTypes: {
    user: PropTypes.object.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "settings__item"
    }, React.createElement("div", {
      "className": "accounts"
    }, React.createElement("div", {
      "className": "account __active"
    }, React.createElement("div", {
      "className": "account__actions"
    }, React.createElement("a", {
      "href": Routes.logout_path(),
      "className": "account__logout"
    }, i18n.t('buttons.settings_accounts_logout'))), React.createElement("div", {
      "className": "account__info"
    }, React.createElement("div", {
      "className": "account__avatar"
    }, React.createElement(UserAvatar, {
      "user": this.props.user,
      "size": 220.
    })), React.createElement("div", {
      "className": "account__desc"
    }, React.createElement("div", {
      "className": "account__name"
    }, this.props.user.slug), React.createElement("div", {
      "className": "account__status"
    }, i18n.t('settings.account_active_status')))))));
  }
});

module.exports = SettingsAccounts;


},{"../common/avatar/user":76}],26:[function(require,module,exports){
var PropTypes, SettingsSaveButton;

PropTypes = React.PropTypes;

SettingsSaveButton = React.createClass({
  displayName: 'SettingsSaveButton',
  propTypes: {
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "settings__item"
    }, React.createElement("button", {
      "className": "settings__submit-button",
      "onClick": this.handleClick
    }, i18n.t('buttons.settings_save')));
  },
  handleClick: function(e) {
    e.preventDefault();
    return this.props.onClick();
  }
});

module.exports = SettingsSaveButton;


},{}],27:[function(require,module,exports){
var PropTypes, Settings_Radio, UuidService;

UuidService = require('../../../../../shared/react/services/uuid');

PropTypes = React.PropTypes;

Settings_Radio = React.createClass({
  displayName: 'Settings_Radio',
  propTypes: {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  },
  componentWillMount: function() {
    return this.id = UuidService.generate();
  },
  render: function() {
    return React.createElement("div", {
      "className": "settings__item"
    }, React.createElement("div", {
      "className": "settings__right"
    }, React.createElement("div", {
      "className": "switcher"
    }, React.createElement("input", {
      "type": "checkbox",
      "id": this.id,
      "className": "switcher__input",
      "onChange": this.handleChange
    }), React.createElement("label", {
      "htmlFor": this.id,
      "className": "switcher__label"
    }, React.createElement("span", {
      "className": "switcher__btn switcher__btn--on"
    }, i18n.t('buttons.settings_switcher_on')), React.createElement("span", {
      "className": "switcher__btn switcher__btn--off"
    }, i18n.t('buttons.settings_switcher_off'))))), React.createElement("div", {
      "className": "settings__left"
    }, React.createElement("h3", {
      "className": "settings__title"
    }, this.props.title), React.createElement("p", {
      "className": "settings__desc"
    }, this.props.description)));
  },
  handleChange: function(e) {
    var checked;
    checked = e.target.checked;
    return this.props.onChange(checked);
  }
});

module.exports = Settings_Radio;


},{"../../../../../shared/react/services/uuid":262}],28:[function(require,module,exports){
var DECLARE_STATE, PropTypes, SHOW_STATE, SettingsEmail, SettingsEmailDeclare, SettingsEmailMixin, SettingsEmailShow, SettingsEmailUnconfirmed, UNCONFIRMED_STATE;

SettingsEmailMixin = require('./mixins/email');

SettingsEmailShow = require('./email/show');

SettingsEmailDeclare = require('./email/declare');

SettingsEmailUnconfirmed = require('./email/unconfirmed');

PropTypes = React.PropTypes;

SHOW_STATE = 'show';

DECLARE_STATE = 'declare';

UNCONFIRMED_STATE = 'unconfirmed';

SettingsEmail = React.createClass({
  displayName: 'SettingsEmail',
  mixins: [SettingsEmailMixin],
  propTypes: {
    email: PropTypes.string.isRequired,
    confirmationEmail: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  },
  getInitialState: function() {
    return {
      currentState: this.getCurrentStateFromProps(this.props)
    };
  },
  componentWillReceiveProps: function(nextProps) {
    return this.setState({
      currentState: this.getCurrentStateFromProps(nextProps)
    });
  },
  render: function() {
    switch (this.state.currentState) {
      case SHOW_STATE:
        return React.createElement(SettingsEmailShow, {
          "email": this.props.email,
          "onChange": this.updateEmail
        });
      case DECLARE_STATE:
        return React.createElement(SettingsEmailDeclare, {
          "onDeclare": this.updateEmail
        });
      case UNCONFIRMED_STATE:
        return React.createElement(SettingsEmailUnconfirmed, {
          "confirmationEmail": this.props.confirmationEmail,
          "onCancel": this.cancelEmailConfirmation
        });
      default:
        return console.warn('Unknown currentState of SettingsEmail component', this.state.currentState);
    }
  },
  activateUnconfirmedState: function() {
    return this.setState({
      currentState: UNCONFIRMED_STATE
    });
  },
  getCurrentStateFromProps: function(props) {
    switch (false) {
      case props.confirmationEmail == null:
        return UNCONFIRMED_STATE;
      case props.email == null:
        return SHOW_STATE;
      default:
        return DECLARE_STATE;
    }
  }
});

module.exports = SettingsEmail;


},{"./email/declare":32,"./email/show":34,"./email/unconfirmed":35,"./mixins/email":41}],29:[function(require,module,exports){
var PropTypes, SettingsEmailCancelButton;

PropTypes = React.PropTypes;

SettingsEmailCancelButton = React.createClass({
  displayName: 'SettingsEmailCancelButton',
  propTypes: {
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("button", {
      "className": "settings__cancel-button",
      "onClick": this.handleClick
    }, i18n.t('buttons.settings_email_cancel'));
  },
  handleClick: function(e) {
    e.preventDefault();
    return this.props.onClick();
  }
});

module.exports = SettingsEmailCancelButton;


},{}],30:[function(require,module,exports){
var PropTypes, SettingsEmailChangeButton;

PropTypes = React.PropTypes;

SettingsEmailChangeButton = React.createClass({
  displayName: 'SettingsEmailChangeButton',
  propTypes: {
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("button", {
      "className": "settings__change-button",
      "onClick": this.handleClick
    }, i18n.t('buttons.settings_email_change'));
  },
  handleClick: function(e) {
    e.preventDefault();
    return this.props.onClick();
  }
});

module.exports = SettingsEmailChangeButton;


},{}],31:[function(require,module,exports){
var PropTypes, SettingsEmailDeclareButton;

PropTypes = React.PropTypes;

SettingsEmailDeclareButton = React.createClass({
  displayName: 'SettingsEmailDeclareButton',
  propTypes: {
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("button", {
      "className": "settings__declare-button",
      "onClick": this.handleClick
    }, i18n.t('buttons.settings_email_declare'));
  },
  handleClick: function(e) {
    e.preventDefault();
    return this.props.onClick();
  }
});

module.exports = SettingsEmailDeclareButton;


},{}],32:[function(require,module,exports){
var NotifyController, PropTypes, SettingsEmailDeclare, SettingsEmailDeclareButton, SettingsEmailField;

NotifyController = require('../../../controllers/notify');

SettingsEmailField = require('./fields/email');

SettingsEmailDeclareButton = require('./buttons/declare');

PropTypes = React.PropTypes;

SettingsEmailDeclare = React.createClass({
  displayName: 'SettingsEmailDeclare',
  propTypes: {
    onDeclare: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "settings__item"
    }, React.createElement("div", {
      "className": "settings__left"
    }, React.createElement("h3", {
      "className": "settings__title"
    }, i18n.t('settings.email_declare_header')), React.createElement(SettingsEmailField, {
      "ref": "emailField"
    }), React.createElement("div", {
      "className": "settings__actions"
    }, React.createElement(SettingsEmailDeclareButton, {
      "onClick": this.handleClick
    }))));
  },
  isValid: function() {
    var email;
    email = this.refs.emailField.getValue();
    if (email.length === 0) {
      NotifyController.notifyError(i18n.t('messages.settings_empty_email_error'));
      return false;
    } else {
      return true;
    }
  },
  handleClick: function() {
    var email;
    email = this.refs.emailField.getValue();
    if (this.isValid()) {
      return this.props.onDeclare(email);
    }
  }
});

module.exports = SettingsEmailDeclare;


},{"../../../controllers/notify":218,"./buttons/declare":31,"./fields/email":33}],33:[function(require,module,exports){
var PropTypes, SettingsEmailField, _;

_ = require('lodash');

PropTypes = React.PropTypes;

SettingsEmailField = React.createClass({
  displayName: 'SettingsEmailField',
  propTypes: {
    value: PropTypes.string,
    disabled: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      value: '',
      disabled: false
    };
  },
  render: function() {
    return React.createElement("div", {
      "className": "form-field form-field--default form-field--light"
    }, React.createElement("input", {
      "ref": "input",
      "type": "email",
      "placeholder": i18n.t('placeholders.settings_email'),
      "defaultValue": this.props.value,
      "disabled": this.props.disabled,
      "className": "form-field__input"
    }));
  },
  getValue: function() {
    return _.trim(this.refs.input.getDOMNode().value);
  }
});

module.exports = SettingsEmailField;


},{"lodash":"lodash"}],34:[function(require,module,exports){
var NotifyController, PropTypes, SettingsEmailChangeButton, SettingsEmailField, SettingsEmailShow;

NotifyController = require('../../../controllers/notify');

SettingsEmailField = require('./fields/email');

SettingsEmailChangeButton = require('./buttons/change');

PropTypes = React.PropTypes;

SettingsEmailShow = React.createClass({
  displayName: 'SettingsEmailShow',
  propTypes: {
    email: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "settings__item"
    }, React.createElement("div", {
      "className": "settings__left"
    }, React.createElement("h3", {
      "className": "settings__title"
    }, i18n.t('settings.email_show_header')), React.createElement(SettingsEmailField, {
      "ref": "emailField",
      "value": this.props.email
    }), React.createElement("div", {
      "className": "settings__actions"
    }, React.createElement(SettingsEmailChangeButton, {
      "onClick": this.handleClick
    }))));
  },
  isValid: function() {
    var email;
    email = this.refs.emailField.getValue();
    switch (false) {
      case email.length !== 0:
        NotifyController.notifyError(i18n.t('messages.settings_empty_email_error'));
        return false;
      case email !== this.props.email:
        NotifyController.notifyError(i18n.t('messages.settings_not_unique_email_error'));
        return false;
      default:
        return true;
    }
  },
  handleClick: function() {
    var email;
    email = this.refs.emailField.getValue();
    if (this.isValid()) {
      return this.props.onChange(email);
    }
  }
});

module.exports = SettingsEmailShow;


},{"../../../controllers/notify":218,"./buttons/change":30,"./fields/email":33}],35:[function(require,module,exports){
var PropTypes, SettingsEmailCancelButton, SettingsEmailField, SettingsEmailUnconfirmed;

SettingsEmailField = require('./fields/email');

SettingsEmailCancelButton = require('./buttons/cancel');

PropTypes = React.PropTypes;

SettingsEmailUnconfirmed = React.createClass({
  displayName: 'SettingsEmailUnconfirmed',
  propTypes: {
    confirmationEmail: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onCancel: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "settings__item"
    }, React.createElement("div", {
      "className": "settings__left"
    }, React.createElement("h3", {
      "className": "settings__title"
    }, i18n.t('settings.email_unconfirmed_header')), React.createElement(SettingsEmailField, {
      "value": this.props.confirmationEmail,
      "disabled": true
    }), React.createElement("div", {
      "className": "settings__actions"
    }, React.createElement(SettingsEmailCancelButton, {
      "onClick": this.handleClick
    }))));
  },
  handleClick: function() {
    return this.props.onCancel();
  }
});

module.exports = SettingsEmailUnconfirmed;


},{"./buttons/cancel":29,"./fields/email":33}],36:[function(require,module,exports){
var PropTypes, SettingsHero, SettingsHeroAvatar, SettingsHeroSlug, SettingsHeroTitle;

SettingsHeroAvatar = require('./hero/avatar');

SettingsHeroSlug = require('./hero/slug');

SettingsHeroTitle = require('./hero/title');

PropTypes = React.PropTypes;

SettingsHero = React.createClass({
  displayName: 'SettingsHero',
  propTypes: {
    user: PropTypes.object.isRequired,
    onSlugChange: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "settings__hero",
      "style": this.getHeroStyles()
    }, React.createElement("div", {
      "className": "settings__hero__overlay"
    }), React.createElement("div", {
      "className": "settings__hero__box"
    }, React.createElement(SettingsHeroAvatar, {
      "user": this.props.user
    }), React.createElement(SettingsHeroSlug, {
      "slug": this.props.user.slug,
      "onChange": this.props.onSlugChange
    }), React.createElement(SettingsHeroTitle, {
      "title": this.props.user.title,
      "onChange": this.props.onTitleChange
    })));
  },
  getHeroStyles: function() {
    var backgroundUrl, ref;
    backgroundUrl = (ref = this.props.user.design) != null ? ref.background_url : void 0;
    return {
      backgroundImage: "url('" + backgroundUrl + "')"
    };
  }
});

module.exports = SettingsHero;


},{"./hero/avatar":37,"./hero/slug":38,"./hero/title":39}],37:[function(require,module,exports){
var CurrentUserViewAcitons, LOADING_STATE, PropTypes, SHOW_STATE, SettingsHeroAvatar, Spinner, UserAvatar;

CurrentUserViewAcitons = require('../../../actions/view/currentUser');

Spinner = require('../../../../../shared/react/components/common/Spinner');

UserAvatar = require('../../common/avatar/user');

PropTypes = React.PropTypes;

SHOW_STATE = 'show';

LOADING_STATE = 'loading';

SettingsHeroAvatar = React.createClass({
  displayName: 'SettingsHeroAvatar',
  propTypes: {
    user: PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      currentState: SHOW_STATE,
      previewImage: null
    };
  },
  render: function() {
    return React.createElement("div", {
      "className": "settings__hero__avatar"
    }, this.renderAvatar(), React.createElement("span", {
      "className": "settings__hero__avatar-overlay"
    }, this.renderContent()));
  },
  renderAvatar: function() {
    if (this.state.previewImage != null) {
      return React.createElement("span", {
        "className": "avatar",
        "style": {
          backgroundImage: "url('" + this.state.previewImage + "')"
        }
      });
    } else {
      return React.createElement(UserAvatar, {
        "user": this.props.user,
        "size": 220.
      });
    }
  },
  renderContent: function() {
    if (this.isLoadingState()) {
      return React.createElement("span", {
        "className": "settings__hero__avatar-spinner"
      }, React.createElement(Spinner, {
        "size": 30.
      }));
    } else {
      return React.createElement("span", {
        "className": "form-choose-file"
      }, React.createElement("span", {
        "className": "form-choose-file__text"
      }, React.createElement("i", {
        "className": "icon icon--pencil"
      })), React.createElement("input", {
        "ref": "fileInput",
        "type": "file",
        "accept": "image/*",
        "className": "form-choose-file__input",
        "onChange": this.handleChange
      }));
    }
  },
  isLoadingState: function() {
    return this.state.currentState === LOADING_STATE;
  },
  activateLoadingState: function() {
    return this.setState({
      currentState: LOADING_STATE
    });
  },
  activateShowState: function() {
    return this.setState({
      currentState: SHOW_STATE
    });
  },
  updatePreviewImage: function(file) {
    var reader;
    reader = new FileReader();
    reader.onload = this.showPreviewImage;
    return reader.readAsDataURL(file);
  },
  showPreviewImage: function(e) {
    return this.setState({
      previewImage: e.target.result
    });
  },
  hidePreviewImage: function() {
    return this.setState({
      previewImage: null
    });
  },
  uploadImage: function(file) {
    var formData;
    this.activateLoadingState();
    formData = new FormData();
    formData.append('file', file);
    return CurrentUserViewAcitons.updateAvatar(formData).then(this.hidePreviewImage).always(this.activateShowState);
  },
  handleChange: function(e) {
    var files;
    files = e.target.files;
    if (files != null ? files[0] : void 0) {
      this.updatePreviewImage(files[0]);
      return this.uploadImage(files[0]);
    }
  }
});

module.exports = SettingsHeroAvatar;


},{"../../../../../shared/react/components/common/Spinner":250,"../../../actions/view/currentUser":9,"../../common/avatar/user":76}],38:[function(require,module,exports){
var NotifyController, PropTypes, SettingsHeroSlug, _;

_ = require('lodash');

NotifyController = require('../../../controllers/notify');

PropTypes = React.PropTypes;

SettingsHeroSlug = React.createClass({
  displayName: 'SettingsHeroSlug',
  propTypes: {
    slug: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      value: this.props.slug
    };
  },
  render: function() {
    return React.createElement("div", {
      "className": "settings__hero__name"
    }, React.createElement("input", {
      "className": "settings__hero__textarea",
      "maxLength": 20.,
      "onBlur": this.onBlur,
      "onChange": this.onChange,
      "onKeyDown": this.onKeyDown,
      "placeholder": i18n.t('placeholders.settings_slug'),
      "value": this.state.value
    }));
  },
  onBlur: function(ev) {
    return this.setState({
      value: this.props.slug
    });
  },
  onChange: function(ev) {
    return this.setState({
      value: ev.target.value
    });
  },
  onKeyDown: function(ev) {
    if (ev.key === 'Enter') {
      this.commitChanges(_.trim(ev.target.value));
      ev.target.blur();
      this.onChange(ev);
      return ev.preventDefault();
    }
  },
  commitChanges: function(value) {
    if (value.length) {
      return this.props.onChange(value);
    } else {
      return NotifyController.notifyError(i18n.t('messages.settings_empty_slug_error'));
    }
  }
});

module.exports = SettingsHeroSlug;


},{"../../../controllers/notify":218,"lodash":"lodash"}],39:[function(require,module,exports){
var PropTypes, SettingsHeroTitle, _;

_ = require('lodash');

PropTypes = React.PropTypes;

SettingsHeroTitle = React.createClass({
  displayName: 'SettingsHeroTitle',
  propTypes: {
    title: PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      value: this.props.title
    };
  },
  render: function() {
    return React.createElement("div", {
      "className": "settings__hero__text"
    }, React.createElement("textarea", {
      "placeholder": i18n.t('placeholders.settings_title'),
      "maxLength": 140.,
      "className": "settings__hero__textarea",
      "onBlur": this.onBlur,
      "onChange": this.onChange,
      "onKeyDown": this.onKeyDown,
      "value": this.state.value
    }));
  },
  onBlur: function(ev) {
    return this.setState({
      value: this.props.title
    });
  },
  onChange: function(ev) {
    return this.setState({
      value: ev.target.value
    });
  },
  onKeyDown: function(ev) {
    if (ev.key === 'Enter') {
      this.props.onChange(_.trim(ev.target.value));
      ev.target.blur();
      this.onChange(ev);
      return ev.preventDefault();
    }
  }
});

module.exports = SettingsHeroTitle;


},{"lodash":"lodash"}],40:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _commonPagePageWithToolbars = require('../common/page/PageWithToolbars');

var _commonPagePageWithToolbars2 = _interopRequireDefault(_commonPagePageWithToolbars);

var _commonPagePageLayout = require('../common/page/PageLayout');

var _commonPagePageLayout2 = _interopRequireDefault(_commonPagePageLayout);

var _commonPagePageBody = require('../common/page/PageBody');

var _commonPagePageBody2 = _interopRequireDefault(_commonPagePageBody);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var SettingsPage = (function (_Component) {
  _inherits(SettingsPage, _Component);

  function SettingsPage() {
    _classCallCheck(this, SettingsPage);

    _get(Object.getPrototypeOf(SettingsPage.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(SettingsPage, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var currentUser = _props.currentUser;
      var locale = _props.locale;

      return _react2['default'].createElement(
        _commonPagePageWithToolbars2['default'],
        {
          currentUser: currentUser,
          locale: locale
        },
        _react2['default'].createElement(
          _commonPagePageLayout2['default'],
          null,
          _react2['default'].createElement(
            _commonPagePageBody2['default'],
            null,
            _react2['default'].createElement(_settings2['default'], null)
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      currentUser: _react.PropTypes.object.isRequired
    },
    enumerable: true
  }]);

  return SettingsPage;
})(_react.Component);

exports['default'] = SettingsPage;
module.exports = exports['default'];

},{"../common/page/PageBody":80,"../common/page/PageLayout":82,"../common/page/PageWithToolbars":84,"./settings":46,"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/get":276,"babel-runtime/helpers/inherits":277,"babel-runtime/helpers/interop-require-default":278,"react":"react"}],41:[function(require,module,exports){
var CurrentUserViewActions, SettingsEmailMixin;

CurrentUserViewActions = require('../../../actions/view/currentUser');

SettingsEmailMixin = {
  updateEmail: function(newEmail) {
    return CurrentUserViewActions.updateEmail(newEmail);
  },
  cancelEmailConfirmation: function() {
    return CurrentUserViewActions.cancelEmailConfirmation();
  }
};

module.exports = SettingsEmailMixin;


},{"../../../actions/view/currentUser":9}],42:[function(require,module,exports){
var CurrentUserViewActions, NotifyController, SettingsMixin, _;

_ = require('lodash');

NotifyController = require('../../../controllers/notify');

CurrentUserViewActions = require('../../../actions/view/currentUser');

SettingsMixin = {
  saveSettings: function() {
    if (_.size(this.state.tempSettings) > 0) {
      return CurrentUserViewActions.update(this.state.tempSettings).then(this.resetTempSettings);
    } else {
      return NotifyController.notifyError(i18n.t('messages.settings_no_unsaved_changes_error'));
    }
  }
};

module.exports = SettingsMixin;


},{"../../../actions/view/currentUser":9,"../../../controllers/notify":218,"lodash":"lodash"}],43:[function(require,module,exports){
var PropTypes, SettingsPassword, SettingsPasswordConfirmField, SettingsPasswordField;

SettingsPasswordField = require('./password/fields/password');

SettingsPasswordConfirmField = require('./password/fields/passwordConfirm');

PropTypes = React.PropTypes;

SettingsPassword = React.createClass({
  displayName: 'SettingsPassword',
  propTypes: {
    onChange: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      password: '',
      passwordConfirm: ''
    };
  },
  render: function() {
    return React.createElement("div", {
      "className": "settings__item"
    }, React.createElement("div", {
      "className": "settings__left"
    }, React.createElement("h3", {
      "className": "settings__title"
    }, i18n.t('settings.password_header')), React.createElement("p", {
      "className": "settings__desc"
    }, i18n.t('settings.password_description')), React.createElement(SettingsPasswordField, {
      "value": this.state.password,
      "onChange": this.handlePasswordChange
    }), React.createElement(SettingsPasswordConfirmField, {
      "value": this.state.passwordConfirm,
      "onChange": this.handlePasswordConfirmChange
    })));
  },
  resetFields: function() {
    return this.setState(this.getInitialState());
  },
  handlePasswordChange: function(password) {
    if (this.state.passwordConfirm === password && password !== '') {
      this.props.onChange(password);
    }
    if (this.state.password === this.state.passwordConfirm && this.state.password !== '') {
      this.props.onUndo();
    }
    return this.setState({
      password: password
    });
  },
  handlePasswordConfirmChange: function(password) {
    if (this.state.password === password && password !== '') {
      this.props.onChange(password);
    }
    if (this.state.password === this.state.passwordConfirm && this.state.password !== '') {
      this.props.onUndo();
    }
    return this.setState({
      passwordConfirm: password
    });
  }
});

module.exports = SettingsPassword;


},{"./password/fields/password":44,"./password/fields/passwordConfirm":45}],44:[function(require,module,exports){
var PropTypes, SettingsPasswordField;

PropTypes = React.PropTypes;

SettingsPasswordField = React.createClass({
  displayName: 'SettingsPasswordField',
  propTypes: {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "form-field form-field--default"
    }, React.createElement("input", {
      "type": "password",
      "value": this.props.value,
      "placeholder": i18n.t('placeholders.settings_password'),
      "className": "form-field__input",
      "onChange": this.handleChange
    }));
  },
  handleChange: function(e) {
    return this.props.onChange(e.target.value);
  }
});

module.exports = SettingsPasswordField;


},{}],45:[function(require,module,exports){
var PropTypes, SettingsPasswordConfirmField;

PropTypes = React.PropTypes;

SettingsPasswordConfirmField = React.createClass({
  displayName: 'SettingsPasswordConfirmField',
  propTypes: {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "form-field form-field--default"
    }, React.createElement("input", {
      "type": "password",
      "value": this.props.value,
      "placeholder": i18n.t('placeholders.settings_password_confirm'),
      "className": "form-field__input",
      "onChange": this.handleChange
    }));
  },
  handleChange: function(e) {
    return this.props.onChange(e.target.value);
  }
});

module.exports = SettingsPasswordConfirmField;


},{}],46:[function(require,module,exports){
var ConnectStoreMixin, CurrentUserStore, Settings, SettingsAccounts, SettingsEmail, SettingsHero, SettingsMixin, SettingsPassword, SettingsSaveButton, Settings_Radio, _;

_ = require('lodash');

CurrentUserStore = require('../../stores/currentUser');

ConnectStoreMixin = require('../../../../shared/react/mixins/connectStore');

SettingsMixin = require('./mixins/settings');

Settings_Radio = require('./common/radio');

SettingsSaveButton = require('./buttons/save');

SettingsHero = require('./hero');

SettingsEmail = require('./email');

SettingsPassword = require('./password');

SettingsAccounts = require('./accounts');

Settings = React.createClass({
  displayName: 'Settings',
  mixins: [ConnectStoreMixin(CurrentUserStore), SettingsMixin],
  getInitialState: function() {
    return {
      tempSettings: {}
    };
  },
  render: function() {
    return React.createElement("div", {
      "className": "settings"
    }, React.createElement("form", null, React.createElement("div", {
      "className": "settings__header"
    }, React.createElement(SettingsHero, {
      "user": this.state.user,
      "onSlugChange": this.updateTempSettings.bind(null, 'slug'),
      "onTitleChange": this.updateTempSettings.bind(null, 'title')
    })), React.createElement("div", {
      "className": "settings__body"
    }, React.createElement(Settings_Radio, {
      "title": i18n.t('settings.privacy_header'),
      "description": i18n.t('settings.privacy_description'),
      "checked": this.state.user.is_privacy,
      "onChange": this.updateTempSettings.bind(null, 'is_privacy')
    }), React.createElement(Settings_Radio, {
      "title": i18n.t('settings.daylog_header'),
      "description": i18n.t('settings.daylog_description'),
      "checked": this.state.user.is_daylog,
      "onChange": this.updateTempSettings.bind(null, 'is_daylog')
    }), React.createElement(Settings_Radio, {
      "title": i18n.t('settings.female_header'),
      "description": i18n.t('settings.female_description'),
      "checked": this.state.user.is_female,
      "onChange": this.updateTempSettings.bind(null, 'is_female')
    }), React.createElement(SettingsEmail, {
      "email": this.state.user.email,
      "confirmationEmail": this.state.user.confirmation_email
    }), React.createElement(Settings_Radio, {
      "title": i18n.t('settings.available_notifications_header'),
      "description": i18n.t('settings.available_notifications_description'),
      "checked": this.state.user.available_notifications,
      "onChange": this.updateTempSettings.bind(null, 'available_notifications')
    }), React.createElement(SettingsPassword, {
      "ref": "passwordSetting",
      "onChange": this.updateTempSettings.bind(null, 'password'),
      "onUndo": this.undoTempSetting.bind(null, 'password')
    }), React.createElement(SettingsAccounts, {
      "user": this.state.user
    }), React.createElement(SettingsSaveButton, {
      "onClick": this.saveSettings
    }))));
  },
  updateTempSettings: function(key, value) {
    var newTempSettings;
    newTempSettings = _.clone(this.state.tempSettings);
    newTempSettings[key] = value;
    return this.setState({
      tempSettings: newTempSettings
    });
  },
  undoTempSetting: function(key) {
    var newTempSettings;
    newTempSettings = _.omit(this.state.tempSettings, key);
    return this.setState({
      tempSettings: newTempSettings
    });
  },
  resetTempSettings: function() {
    this.refs.passwordSetting.resetFields();
    return this.setState({
      tempSettings: {}
    });
  },
  getStateFromStore: function() {
    return {
      user: CurrentUserStore.getUser()
    };
  }
});

module.exports = Settings;


},{"../../../../shared/react/mixins/connectStore":260,"../../stores/currentUser":237,"./accounts":25,"./buttons/save":26,"./common/radio":27,"./email":28,"./hero":36,"./mixins/settings":42,"./password":43,"lodash":"lodash"}],47:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _storesCurrentUser = require('../../stores/currentUser');

var _storesCurrentUser2 = _interopRequireDefault(_storesCurrentUser);

var _sharedReactMixinsConnectStore = require('../../../../shared/react/mixins/connectStore');

var _sharedReactMixinsConnectStore2 = _interopRequireDefault(_sharedReactMixinsConnectStore);

var _TlogEmptyPage = require('./TlogEmptyPage');

var _TlogEmptyPage2 = _interopRequireDefault(_TlogEmptyPage);

var _TlogOwnEmptyPage = require('./TlogOwnEmptyPage');

var _TlogOwnEmptyPage2 = _interopRequireDefault(_TlogOwnEmptyPage);

var _entryTlog = require('../entry/Tlog');

var _entryTlog2 = _interopRequireDefault(_entryTlog);

var Tlog = React.createClass({
  displayName: 'Tlog',

  mixins: [(0, _sharedReactMixinsConnectStore2['default'])(_storesCurrentUser2['default'])],

  propTypes: {
    tlog: React.PropTypes.object.isRequired,
    entries: React.PropTypes.array.isRequired
  },

  render: function render() {
    var content = undefined;

    if (this.props.entries.length) {
      content = this.renderEntryList();
    } else {
      content = this.renderEmptyPage();
    }

    return content;
  },

  renderEntryList: function renderEntryList() {
    var entries = this.props.entries;

    return React.createElement(
      'div',
      { className: 'posts' },
      entries.map(function (entry) {
        return React.createElement(_entryTlog2['default'], {
          commentFormVisible: entries.length === 1,
          entry: entry,
          key: entry.id
        });
      })
    );
  },

  renderEmptyPage: function renderEmptyPage() {
    var isLogged = this.state.user != null;
    var emptyPage = undefined;

    if (isLogged && this.props.tlog.author.id == this.state.user.id) {
      emptyPage = React.createElement(_TlogOwnEmptyPage2['default'], { userSlug: this.state.user.slug });
    } else {
      emptyPage = React.createElement(_TlogEmptyPage2['default'], null);
    }

    return emptyPage;
  },

  getStateFromStore: function getStateFromStore() {
    return {
      user: _storesCurrentUser2['default'].getUser()
    };
  }
});

exports['default'] = Tlog;
module.exports = exports['default'];

},{"../../../../shared/react/mixins/connectStore":260,"../../stores/currentUser":237,"../entry/Tlog":101,"./TlogEmptyPage":48,"./TlogOwnEmptyPage":49,"babel-runtime/helpers/interop-require-default":278}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TlogEmptyPage = React.createClass({
  displayName: "TlogEmptyPage",

  render: function render() {
    return React.createElement(
      "div",
      { className: "content-info" },
      React.createElement(
        "div",
        { className: "content-info__icon" },
        React.createElement("i", { className: "icon icon--paper-corner" })
      ),
      React.createElement(
        "p",
        { className: "content-info__text" },
        i18n.t('tlog.tlog_empty_page')
      )
    );
  }

});

exports["default"] = TlogEmptyPage;
module.exports = exports["default"];

},{}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var TlogOwnEmptyPage = React.createClass({
  displayName: 'TlogOwnEmptyPage',

  propTypes: {
    userSlug: React.PropTypes.string.isRequired
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'text-content text-content--main' },
      React.createElement(
        'h2',
        null,
        i18n.t('tlog.welcome', { userSlug: this.props.userSlug })
      ),
      React.createElement(
        'p',
        null,
        i18n.t('tlog.welcome_tasty')
      ),
      React.createElement(
        'p',
        null,
        i18n.t('tlog.ready_for'),
        ' ',
        React.createElement(
          'a',
          { href: Routes.new_entry_url(this.props.userSlug) },
          i18n.t('tlog.for_new_entry')
        ),
        '.'
      ),
      React.createElement(
        'p',
        null,
        i18n.t('tlog.list_of_options'),
        ':'
      ),
      React.createElement(
        'ul',
        null,
        React.createElement(
          'li',
          null,
          i18n.t('tlog.setting_up_design'),
          ' ',
          React.createElement(
            'a',
            { href: Routes.userDesignSettings(this.props.userSlug) },
            i18n.t('tlog.design_here')
          )
        ),
        React.createElement(
          'li',
          null,
          i18n.t('tlog.setting_up_settings'),
          ' ',
          React.createElement(
            'a',
            { href: Routes.userSettings(this.props.userSlug) },
            i18n.t('tlog.settings_here')
          )
        ),
        React.createElement(
          'li',
          null,
          i18n.t('tlog.read_live_feed'),
          ' ',
          React.createElement(
            'a',
            { href: Routes.live_feed_path() },
            i18n.t('tlog.live_feed')
          ),
          '.'
        )
      ),
      React.createElement(
        'p',
        null,
        i18n.t('tlog.ask_question')
      )
    );
  }
});

exports['default'] = TlogOwnEmptyPage;
module.exports = exports['default'];

},{}],50:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sharedReactProjectTypes = require('../../../../shared/react/ProjectTypes');

var ProjectTypes = _interopRequireWildcard(_sharedReactProjectTypes);

var _commonPagePageWithAuth = require('../common/page/PageWithAuth');

var _commonPagePageWithAuth2 = _interopRequireDefault(_commonPagePageWithAuth);

var _commonPagePageLayout = require('../common/page/PageLayout');

var _commonPagePageLayout2 = _interopRequireDefault(_commonPagePageLayout);

var _commonPagePageHeader = require('../common/page/PageHeader');

var _commonPagePageHeader2 = _interopRequireDefault(_commonPagePageHeader);

var _commonPagePageBody = require('../common/page/PageBody');

var _commonPagePageBody2 = _interopRequireDefault(_commonPagePageBody);

var _heroTlog = require('../hero/tlog');

var _heroTlog2 = _interopRequireDefault(_heroTlog);

var _TlogTlog = require('../Tlog/Tlog');

var _TlogTlog2 = _interopRequireDefault(_TlogTlog);

var _paginationTlogPagination = require('../pagination/TlogPagination');

var _paginationTlogPagination2 = _interopRequireDefault(_paginationTlogPagination);

var TlogRegularPage = (function (_Component) {
  _inherits(TlogRegularPage, _Component);

  function TlogRegularPage() {
    _classCallCheck(this, TlogRegularPage);

    _get(Object.getPrototypeOf(TlogRegularPage.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(TlogRegularPage, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var currentUser = _props.currentUser;
      var entries = _props.entries;
      var locale = _props.locale;
      var pagination = _props.pagination;
      var tlog = _props.tlog;

      return _react2['default'].createElement(
        _commonPagePageWithAuth2['default'],
        { currentUser: currentUser, locale: locale },
        _react2['default'].createElement(
          _commonPagePageLayout2['default'],
          null,
          _react2['default'].createElement(
            _commonPagePageHeader2['default'],
            null,
            _react2['default'].createElement(_heroTlog2['default'], { tlog: tlog })
          ),
          _react2['default'].createElement(
            _commonPagePageBody2['default'],
            null,
            _react2['default'].createElement(_TlogTlog2['default'], { entries: entries, tlog: tlog }),
            _react2['default'].createElement(_paginationTlogPagination2['default'], {
              pagination: pagination,
              slug: tlog.author.slug
            })
          )
        )
      );
    }
  }]);

  return TlogRegularPage;
})(_react.Component);

exports['default'] = TlogRegularPage;

TlogRegularPage.propTypes = {
  currentUser: _react.PropTypes.object, //elaborate
  entries: _react.PropTypes.array.isRequired,
  locale: _react.PropTypes.string.isRequired,
  pagination: ProjectTypes.pagination,
  tlog: ProjectTypes.tlog.isRequired
};

TlogRegularPage.defaultProps = {
  entries: []
};

exports['default'] = TlogRegularPage;
module.exports = exports['default'];

},{"../../../../shared/react/ProjectTypes":247,"../Tlog/Tlog":47,"../common/page/PageBody":80,"../common/page/PageHeader":81,"../common/page/PageLayout":82,"../common/page/PageWithAuth":83,"../hero/tlog":143,"../pagination/TlogPagination":193,"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/get":276,"babel-runtime/helpers/inherits":277,"babel-runtime/helpers/interop-require-default":278,"babel-runtime/helpers/interop-require-wildcard":279,"react":"react"}],51:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var TYPE = 'success';
var TIMEOUT = 3000;

var Notify = (function () {
  function Notify() {
    _classCallCheck(this, Notify);

    this.defaultProps = {
      type: TYPE,
      timeout: TIMEOUT
    };
  }

  _createClass(Notify, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.timeout = setTimeout(this.props.onClose, this.props.timeout);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.timeout) clearTimeout(this.timeout);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'alert alert--' + this.props.type },
        this.props.text
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      text: _react.PropTypes.string.isRequired,
      type: _react.PropTypes.string,
      timeout: _react.PropTypes.number,
      onClose: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return Notify;
})();

exports['default'] = Notify;
module.exports = exports['default'];

},{"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/interop-require-default":278,"react":"react"}],52:[function(require,module,exports){
(function (global){
var AuthEmailSignInButton, AuthEmailSignUpButton, AuthFacebookButton, AuthVkontakteButton, PropTypes, classnames;

classnames = require('classnames');

AuthVkontakteButton = require('./buttons/vkontakte');

AuthFacebookButton = require('./buttons/facebook');

AuthEmailSignInButton = require('./buttons/emailSignIn');

AuthEmailSignUpButton = require('./buttons/emailSignUp');

PropTypes = React.PropTypes;

global.Auth = React.createClass({
  displayName: 'Auth',
  propTypes: {
    fixed: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      fixed: false
    };
  },
  render: function() {
    var authBgStyles, authClasses;
    authClasses = classnames('auth', {
      'auth--fixed': this.props.fixed
    });
    authBgStyles = {
      backgroundImage: 'url("http://taaasty.com/images/Polly-73.jpg")'
    };
    return React.createElement("div", {
      "className": authClasses
    }, React.createElement("div", {
      "className": "auth__grid-table"
    }, React.createElement("div", {
      "className": "auth__grid-cell"
    }, React.createElement("div", {
      "className": "auth__bg",
      "style": authBgStyles
    }), React.createElement("div", {
      "className": "auth__section"
    }, React.createElement("div", {
      "className": "auth__body"
    }, React.createElement("div", {
      "className": "auth__logo"
    }, React.createElement("i", {
      "className": "icon icon--ribbon"
    })), React.createElement("h1", {
      "className": "auth__lead",
      "dangerouslySetInnerHTML": {
        __html: i18n.t('auth.header')
      }
    }), React.createElement("div", {
      "className": "auth__buttons"
    }, React.createElement(AuthVkontakteButton, null), React.createElement(AuthFacebookButton, null), React.createElement(AuthEmailSignInButton, null), React.createElement(AuthEmailSignUpButton, null)))))));
  }
});

module.exports = Auth;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./buttons/emailSignIn":58,"./buttons/emailSignUp":59,"./buttons/facebook":61,"./buttons/vkontakte":62,"classnames":332}],53:[function(require,module,exports){
var AuthEmailRecovery, AuthEmailResetButton, AuthRememberedPasswordLink, ComponentMixin, EmailLoginField, NotifyController, PropTypes, ScreenController, SessionsViewActions, classnames;

classnames = require('classnames');

ScreenController = require('../../controllers/screen');

NotifyController = require('../../controllers/notify');

SessionsViewActions = require('../../actions/view/sessions');

ComponentMixin = require('../../mixins/component');

EmailLoginField = require('./fields/EmailLoginField');

AuthEmailResetButton = require('./buttons/emailReset');

AuthRememberedPasswordLink = require('./links/rememberedPassword');

PropTypes = React.PropTypes;

AuthEmailRecovery = React.createClass({
  displayName: 'AuthEmailRecovery',
  mixins: [ComponentMixin],
  propTypes: {
    fixed: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      fixed: false
    };
  },
  getInitialState: function() {
    return {
      login: '',
      loading: false
    };
  },
  render: function() {
    var authBgStyles, authClasses;
    authClasses = classnames('auth', {
      'auth--fixed': this.props.fixed
    });
    authBgStyles = {
      backgroundImage: 'url("http://taaasty.com/images/Polly-73.jpg")'
    };
    return React.createElement("div", {
      "className": authClasses
    }, React.createElement("div", {
      "className": "auth__grid-table"
    }, React.createElement("div", {
      "className": "auth__grid-cell"
    }, React.createElement("div", {
      "className": "auth__bg",
      "style": authBgStyles
    }), React.createElement("div", {
      "className": "auth__section"
    }, React.createElement("div", {
      "className": "auth__header"
    }, React.createElement("div", {
      "className": "auth__header-title"
    }, i18n.t('auth.email_recovery_header'))), React.createElement("div", {
      "className": "auth__body"
    }, React.createElement("form", {
      "onSubmit": this.handleSubmit
    }, React.createElement(EmailLoginField, {
      "value": this.state.login,
      "onChange": this.handleLoginChange
    }), React.createElement("div", {
      "className": "auth__buttons"
    }, React.createElement(AuthEmailResetButton, {
      "loading": this.state.loading
    })))), React.createElement("div", {
      "className": "auth__footer"
    }, React.createElement(AuthRememberedPasswordLink, null))))));
  },
  activateLoadingState: function() {
    return this.safeUpdateState({
      loading: true
    });
  },
  deactivateLoadingState: function() {
    return this.safeUpdateState({
      loading: false
    });
  },
  isValid: function() {
    var login;
    login = this.state.login;
    if (login.length === 0) {
      NotifyController.notifyError(i18n.t('messages.auth_empty_login_error'));
      return false;
    } else {
      return true;
    }
  },
  recover: function() {
    var login;
    login = this.state.login;
    this.activateLoadingState();
    return SessionsViewActions.recover(login).then(ScreenController.close).always(this.deactivateLoadingState);
  },
  handleLoginChange: function(login) {
    return this.setState({
      login: login
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if (this.isValid() && !this.state.loading) {
      return this.recover();
    }
  }
});

module.exports = AuthEmailRecovery;


},{"../../actions/view/sessions":15,"../../controllers/notify":218,"../../controllers/screen":219,"../../mixins/component":222,"./buttons/emailReset":57,"./fields/EmailLoginField":64,"./links/rememberedPassword":70,"classnames":332}],54:[function(require,module,exports){
(function (global){
var AuthEmailSubmitButton, AuthForgotPasswordLink, AuthNotRegisteredYetLink, ComponentMixin, EmailLoginField, EmailPasswordField, NotifyController, PropTypes, SessionsViewActions, classnames;

classnames = require('classnames');

NotifyController = require('../../controllers/notify');

SessionsViewActions = require('../../actions/view/sessions');

ComponentMixin = require('../../mixins/component');

EmailLoginField = require('./fields/EmailLoginField');

EmailPasswordField = require('./fields/EmailPasswordField');

AuthEmailSubmitButton = require('./buttons/emailSubmit');

AuthNotRegisteredYetLink = require('./links/notRegisteredYet');

AuthForgotPasswordLink = require('./links/forgotPassword');

PropTypes = React.PropTypes;

global.AuthEmailSignIn = React.createClass({
  displayName: 'AuthEmailSignIn',
  mixins: [ComponentMixin],
  propTypes: {
    fixed: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      fixed: false
    };
  },
  getInitialState: function() {
    return {
      login: '',
      password: '',
      loading: false
    };
  },
  render: function() {
    var authBgStyles, authClasses;
    authClasses = classnames('auth', {
      'auth--fixed': this.props.fixed
    });
    authBgStyles = {
      backgroundImage: 'url("http://taaasty.com/images/Polly-73.jpg")'
    };
    return React.createElement("div", {
      "className": authClasses
    }, React.createElement("div", {
      "className": "auth__grid-table"
    }, React.createElement("div", {
      "className": "auth__grid-cell"
    }, React.createElement("div", {
      "className": "auth__bg",
      "style": authBgStyles
    }), React.createElement("div", {
      "className": "auth__section"
    }, React.createElement("div", {
      "className": "auth__header"
    }, React.createElement("div", {
      "className": "auth__header-title"
    }, i18n.t('auth.email_signin_header'))), React.createElement("div", {
      "className": "auth__body"
    }, React.createElement("form", {
      "onSubmit": this.handleSubmit
    }, React.createElement(EmailLoginField, {
      "value": this.state.login,
      "onChange": this.handleLoginChange
    }), React.createElement(EmailPasswordField, {
      "value": this.state.password,
      "onChange": this.handlePasswordChange
    }), React.createElement("div", {
      "className": "auth__buttons"
    }, React.createElement(AuthEmailSubmitButton, {
      "loading": this.state.loading
    })))), React.createElement("div", {
      "className": "auth__footer"
    }, React.createElement(AuthNotRegisteredYetLink, null), React.createElement("span", {
      "className": "auth__footer-sep"
    }, "·"), React.createElement(AuthForgotPasswordLink, null))))));
  },
  activateLoadingState: function() {
    return this.safeUpdateState({
      loading: true
    });
  },
  deactivateLoadingState: function() {
    return this.safeUpdateState({
      loading: false
    });
  },
  isValid: function() {
    var login, password;
    login = this.state.login;
    password = this.state.password;
    switch (false) {
      case login.length !== 0:
        NotifyController.notifyError(i18n.t('messages.auth_empty_login_error'));
        return false;
      case password.length !== 0:
        NotifyController.notifyError(i18n.t('messages.auth_empty_password_error'));
        return false;
      default:
        return true;
    }
  },
  signIn: function() {
    var login, password;
    login = this.state.login;
    password = this.state.password;
    this.activateLoadingState();
    return SessionsViewActions.signIn(login, password).then((function(_this) {
      return function() {
        return setTimeout((function() {
          return window.location.reload(true);
        }), 0);
      };
    })(this)).always(this.deactivateLoadingState);
  },
  handleLoginChange: function(login) {
    return this.setState({
      login: login
    });
  },
  handlePasswordChange: function(password) {
    return this.setState({
      password: password
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if (this.isValid() && !this.state.loading) {
      return this.signIn();
    }
  }
});

module.exports = AuthEmailSignIn;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../actions/view/sessions":15,"../../controllers/notify":218,"../../mixins/component":222,"./buttons/emailSubmit":60,"./fields/EmailLoginField":64,"./fields/EmailPasswordField":66,"./links/forgotPassword":68,"./links/notRegisteredYet":69,"classnames":332}],55:[function(require,module,exports){
(function (global){
var AuthAlreadyRegisteredLink, AuthEmailSubmitButton, ComponentMixin, EmailEmailField, EmailNicknameField, EmailPasswordField, NotifyController, PropTypes, SessionsViewActions, classnames;

classnames = require('classnames');

NotifyController = require('../../controllers/notify');

SessionsViewActions = require('../../actions/view/sessions');

ComponentMixin = require('../../mixins/component');

EmailEmailField = require('./fields/EmailEmailField');

EmailPasswordField = require('./fields/EmailPasswordField');

EmailNicknameField = require('./fields/EmailNicknameField');

AuthEmailSubmitButton = require('./buttons/emailSubmit');

AuthAlreadyRegisteredLink = require('./links/alreadyRegistered');

PropTypes = React.PropTypes;

global.AuthEmailSignUp = React.createClass({
  displayName: 'AuthEmailSignUp',
  mixins: [ComponentMixin],
  propTypes: {
    fixed: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      fixed: false
    };
  },
  getInitialState: function() {
    return {
      email: '',
      password: '',
      nickname: '',
      loading: false
    };
  },
  render: function() {
    var authBgStyles, authClasses;
    authClasses = classnames('auth', {
      'auth--fixed': this.props.fixed
    });
    authBgStyles = {
      backgroundImage: 'url("http://taaasty.com/images/Polly-73.jpg")'
    };
    return React.createElement("div", {
      "className": authClasses
    }, React.createElement("div", {
      "className": "auth__grid-table"
    }, React.createElement("div", {
      "className": "auth__grid-cell"
    }, React.createElement("div", {
      "className": "auth__bg",
      "style": authBgStyles
    }), React.createElement("div", {
      "className": "auth__section"
    }, React.createElement("div", {
      "className": "auth__header"
    }, React.createElement("div", {
      "className": "auth__header-title"
    }, i18n.t('auth.email_signup_header'))), React.createElement("div", {
      "className": "auth__body"
    }, React.createElement("form", {
      "onSubmit": this.handleSubmit
    }, React.createElement(EmailEmailField, {
      "value": this.state.email,
      "onChange": this.handleEmailChange
    }), React.createElement(EmailPasswordField, {
      "value": this.state.password,
      "onChange": this.handlePasswordChange
    }), React.createElement(EmailNicknameField, {
      "value": this.state.nickname,
      "onChange": this.handleNicknameChange
    }), React.createElement("div", {
      "className": "auth__buttons"
    }, React.createElement(AuthEmailSubmitButton, {
      "loading": this.state.loading
    })))), React.createElement("div", {
      "className": "auth__footer"
    }, React.createElement(AuthAlreadyRegisteredLink, null))))));
  },
  activateLoadingState: function() {
    return this.safeUpdateState({
      loading: true
    });
  },
  deactivateLoadingState: function() {
    return this.safeUpdateState({
      loading: false
    });
  },
  isValid: function() {
    var email, password;
    email = this.state.email;
    password = this.state.password;
    switch (false) {
      case email.length !== 0:
        NotifyController.notifyError(i18n.t('messages.auth_empty_email_error'));
        return false;
      case password.length !== 0:
        NotifyController.notifyError(i18n.t('messages.auth_empty_password_error'));
        return false;
      default:
        return true;
    }
  },
  signUp: function() {
    var email, nickname, password;
    email = this.state.email;
    password = this.state.password;
    nickname = this.state.nickname;
    this.activateLoadingState();
    return SessionsViewActions.signUp(email, password, nickname).then((function(_this) {
      return function(user) {
        return setTimeout((function() {
          return window.location.href = user.tlog_url;
        }), 0);
      };
    })(this)).always(this.deactivateLoadingState);
  },
  handleEmailChange: function(email) {
    return this.setState({
      email: email
    });
  },
  handlePasswordChange: function(password) {
    return this.setState({
      password: password
    });
  },
  handleNicknameChange: function(nickname) {
    return this.setState({
      nickname: nickname
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if (this.isValid() && !this.state.loading) {
      return this.signUp();
    }
  }
});

module.exports = AuthEmailSignUp;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../actions/view/sessions":15,"../../controllers/notify":218,"../../mixins/component":222,"./buttons/emailSubmit":60,"./fields/EmailEmailField":63,"./fields/EmailNicknameField":65,"./fields/EmailPasswordField":66,"./links/alreadyRegistered":67,"classnames":332}],56:[function(require,module,exports){
var Auth, AuthManager, ConnectStoreMixin, CurrentUserStore;

CurrentUserStore = require('../../stores/currentUser');

ConnectStoreMixin = require('../../../../shared/react/mixins/connectStore');

Auth = require('./auth');

AuthManager = React.createClass({
  displayName: 'AuthManager',
  mixins: [ConnectStoreMixin(CurrentUserStore)],
  render: function() {
    if (!this.state.logged) {
      return React.createElement(Auth, null);
    } else {
      return null;
    }
  },
  getStateFromStore: function() {
    return {
      logged: CurrentUserStore.isLogged()
    };
  }
});

module.exports = AuthManager;


},{"../../../../shared/react/mixins/connectStore":260,"../../stores/currentUser":237,"./auth":52}],57:[function(require,module,exports){
var AuthEmailResetButton, PropTypes, Spinner;

Spinner = require('../../../../../shared/react/components/common/Spinner');

PropTypes = React.PropTypes;

AuthEmailResetButton = React.createClass({
  displayName: 'AuthEmailResetButton',
  propTypes: {
    loading: PropTypes.bool.isRequired
  },
  render: function() {
    return React.createElement("button", {
      "className": "outline-auth-button"
    }, this.renderSpinner(), " ", i18n.t('buttons.auth_reset_password'));
  },
  renderSpinner: function() {
    if (this.props.loading) {
      return React.createElement(Spinner, {
        "size": 14.
      });
    }
  }
});

module.exports = AuthEmailResetButton;


},{"../../../../../shared/react/components/common/Spinner":250}],58:[function(require,module,exports){
var AuthEmailSignIn, AuthEmailSignInButton, ScreenController;

ScreenController = require('../../../controllers/screen');

AuthEmailSignIn = require('../authEmailSignIn');

AuthEmailSignInButton = React.createClass({
  displayName: 'AuthEmailSignInButton',
  render: function() {
    return React.createElement("button", {
      "className": "site-auth-button",
      "onClick": this.handleClick
    }, i18n.t('buttons.auth_email_signin'));
  },
  handleClick: function() {
    return ScreenController.show(AuthEmailSignIn, {}, 'auth-page');
  }
});

module.exports = AuthEmailSignInButton;


},{"../../../controllers/screen":219,"../authEmailSignIn":54}],59:[function(require,module,exports){
var AuthEmailSignUpButton, ScreenController;

ScreenController = require('../../../controllers/screen');

AuthEmailSignUpButton = React.createClass({
  displayName: 'AuthEmailSignUpButton',
  render: function() {
    return React.createElement("button", {
      "className": "reg-auth-button",
      "onClick": this.handleClick
    }, i18n.t('buttons.auth_email_signup'));
  },
  handleClick: function() {
    return ScreenController.show(AuthEmailSignUp, {}, 'auth-page');
  }
});

module.exports = AuthEmailSignUpButton;


},{"../../../controllers/screen":219}],60:[function(require,module,exports){
var AuthEmailSubmitButton, PropTypes, Spinner;

Spinner = require('../../../../../shared/react/components/common/Spinner');

PropTypes = React.PropTypes;

AuthEmailSubmitButton = React.createClass({
  displayName: 'AuthEmailSubmitButton',
  propTypes: {
    loading: PropTypes.bool.isRequired
  },
  render: function() {
    return React.createElement("button", {
      "className": "outline-auth-button"
    }, this.renderSpinner(), " ", i18n.t('buttons.auth_email_submit'));
  },
  renderSpinner: function() {
    if (this.props.loading) {
      return React.createElement(Spinner, {
        "size": 14.
      });
    }
  }
});

module.exports = AuthEmailSubmitButton;


},{"../../../../../shared/react/components/common/Spinner":250}],61:[function(require,module,exports){
var AuthFacebookButton;

AuthFacebookButton = React.createClass({
  displayName: 'AuthFacebookButton',
  render: function() {
    return React.createElement("button", {
      "className": "fb-auth-button",
      "onClick": this.handleClick
    }, i18n.t('buttons.auth_facebook_signin'));
  },
  handleClick: function() {
    return window.location = ApiRoutes.omniauth_url('facebook');
  }
});

module.exports = AuthFacebookButton;


},{}],62:[function(require,module,exports){
var AuthVkontakteButton;

AuthVkontakteButton = React.createClass({
  displayName: 'AuthVkontakteButton',
  render: function() {
    return React.createElement("button", {
      "className": "vk-auth-button",
      "onClick": this.handleClick
    }, i18n.t('buttons.auth_vkontakte_signin'));
  },
  handleClick: function() {
    return window.location = ApiRoutes.omniauth_url('vkontakte');
  }
});

module.exports = AuthVkontakteButton;


},{}],63:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _sharedReactComponentsCommonFieldsEmailField = require('../../../../../shared/react/components/common/fields/EmailField');

var _sharedReactComponentsCommonFieldsEmailField2 = _interopRequireDefault(_sharedReactComponentsCommonFieldsEmailField);

var EmailEmailField = React.createClass({
  displayName: 'EmailEmailField',

  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'auth__field' },
      React.createElement(
        'label',
        { htmlFor: 'auth-email', className: 'auth__field-icon' },
        React.createElement('i', { className: 'icon icon--profile' })
      ),
      React.createElement(_sharedReactComponentsCommonFieldsEmailField2['default'], {
        defaultValue: this.props.value,
        placeholder: i18n.t('placeholders.auth_email'),
        id: 'auth-email',
        className: 'auth__field-input',
        required: true,
        onChange: this.props.onChange })
    );
  }
});

exports['default'] = EmailEmailField;
module.exports = exports['default'];

},{"../../../../../shared/react/components/common/fields/EmailField":256,"babel-runtime/helpers/interop-require-default":278,"classnames":332}],64:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _sharedReactComponentsCommonFieldsTextField = require('../../../../../shared/react/components/common/fields/TextField');

var _sharedReactComponentsCommonFieldsTextField2 = _interopRequireDefault(_sharedReactComponentsCommonFieldsTextField);

var EmailLoginField = React.createClass({
  displayName: 'EmailLoginField',

  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'auth__field' },
      React.createElement(
        'label',
        { htmlFor: 'auth-email-nick', className: 'auth__field-icon' },
        React.createElement('i', { className: 'icon icon--profile' })
      ),
      React.createElement(_sharedReactComponentsCommonFieldsTextField2['default'], {
        defaultValue: this.props.value,
        placeholder: i18n.t('placeholders.auth_login'),
        id: 'auth-email-nick',
        className: 'auth__field-input',
        required: true,
        onChange: this.props.onChange })
    );
  }
});

exports['default'] = EmailLoginField;
module.exports = exports['default'];

},{"../../../../../shared/react/components/common/fields/TextField":259,"babel-runtime/helpers/interop-require-default":278,"classnames":332}],65:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _sharedReactComponentsCommonFieldsTextField = require('../../../../../shared/react/components/common/fields/TextField');

var _sharedReactComponentsCommonFieldsTextField2 = _interopRequireDefault(_sharedReactComponentsCommonFieldsTextField);

var EmailNicknameField = React.createClass({
  displayName: 'EmailNicknameField',

  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'auth__field' },
      React.createElement(
        'label',
        { htmlFor: 'auth-nick', className: 'auth__field-icon' },
        React.createElement('i', { className: 'icon icon--diary' })
      ),
      React.createElement(_sharedReactComponentsCommonFieldsTextField2['default'], {
        defaultValue: this.props.value,
        placeholder: i18n.t('placeholders.auth_nickname'),
        id: 'auth-nick',
        className: 'auth__field-input',
        required: true,
        onChange: this.props.onChange })
    );
  }
});

exports['default'] = EmailNicknameField;
module.exports = exports['default'];

},{"../../../../../shared/react/components/common/fields/TextField":259,"babel-runtime/helpers/interop-require-default":278,"classnames":332}],66:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _sharedReactComponentsCommonFieldsPasswordField = require('../../../../../shared/react/components/common/fields/PasswordField');

var _sharedReactComponentsCommonFieldsPasswordField2 = _interopRequireDefault(_sharedReactComponentsCommonFieldsPasswordField);

var EmailPasswordField = React.createClass({
  displayName: 'EmailPasswordField',

  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'auth__field' },
      React.createElement(
        'label',
        { htmlFor: 'auth-password', className: 'auth__field-icon' },
        React.createElement('i', { className: 'icon icon--lock' })
      ),
      React.createElement(_sharedReactComponentsCommonFieldsPasswordField2['default'], {
        defaultValue: this.props.value,
        placeholder: i18n.t('placeholders.auth_password'),
        id: 'auth-password',
        className: 'auth__field-input',
        required: true,
        onChange: this.props.onChange })
    );
  }
});

exports['default'] = EmailPasswordField;
module.exports = exports['default'];

},{"../../../../../shared/react/components/common/fields/PasswordField":258,"babel-runtime/helpers/interop-require-default":278,"classnames":332}],67:[function(require,module,exports){
var AuthNotRegisteredYetLink, ScreenController;

ScreenController = require('../../../controllers/screen');

AuthNotRegisteredYetLink = React.createClass({
  displayName: 'AuthNotRegisteredYetLink',
  render: function() {
    return React.createElement("a", {
      "className": "auth__footer-link",
      "onClick": this.handleClick
    }, i18n.t('auth.already_registered_link'));
  },
  handleClick: function() {
    return ScreenController.show(Auth, {}, 'auth-page');
  }
});

module.exports = AuthNotRegisteredYetLink;


},{"../../../controllers/screen":219}],68:[function(require,module,exports){
var AuthEmailRecovery, AuthForgotPasswordLink, ScreenController;

ScreenController = require('../../../controllers/screen');

AuthEmailRecovery = require('../authEmailRecovery');

AuthForgotPasswordLink = React.createClass({
  displayName: 'AuthForgotPasswordLink',
  render: function() {
    return React.createElement("a", {
      "className": "auth__footer-link",
      "onClick": this.handleClick
    }, i18n.t('auth.forgot_password_link'));
  },
  handleClick: function() {
    return ScreenController.show(AuthEmailRecovery, {}, 'auth-page');
  }
});

module.exports = AuthForgotPasswordLink;


},{"../../../controllers/screen":219,"../authEmailRecovery":53}],69:[function(require,module,exports){
var AuthNotRegisteredYetLink, ScreenController;

ScreenController = require('../../../controllers/screen');

AuthNotRegisteredYetLink = React.createClass({
  displayName: 'AuthNotRegisteredYetLink',
  render: function() {
    return React.createElement("a", {
      "className": "auth__footer-link",
      "onClick": this.handleClick
    }, i18n.t('auth.not_registered_yet_link'));
  },
  handleClick: function() {
    return ScreenController.show(AuthEmailSignUp, {}, 'auth-page');
  }
});

module.exports = AuthNotRegisteredYetLink;


},{"../../../controllers/screen":219}],70:[function(require,module,exports){
var AuthRememberedPasswordLink, ScreenController;

ScreenController = require('../../../controllers/screen');

AuthRememberedPasswordLink = React.createClass({
  displayName: 'AuthRememberedPasswordLink',
  render: function() {
    return React.createElement("a", {
      "className": "auth__footer-link",
      "onClick": this.handleClick
    }, i18n.t('auth.remembered_password_link'));
  },
  handleClick: function() {
    return ScreenController.show(Auth, {}, 'auth-page');
  }
});

module.exports = AuthRememberedPasswordLink;


},{"../../../controllers/screen":219}],71:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _controllersScreen = require('../../../controllers/screen');

var _controllersScreen2 = _interopRequireDefault(_controllersScreen);

var AuthButton = _react2['default'].createClass({
  displayName: 'AuthButton',

  render: function render() {
    return _react2['default'].createElement(
      'button',
      { className: 'auth-button',
        onClick: this.handleClick },
      i18n.t('buttons.auth_signin')
    );
  },

  handleClick: function handleClick() {
    //FIXME: Route transitionTo Auth
    _controllersScreen2['default'].show(Auth, {}, 'auth-page');
  }
});

exports['default'] = AuthButton;
module.exports = exports['default'];

},{"../../../controllers/screen":219,"babel-runtime/helpers/interop-require-default":278,"react":"react"}],72:[function(require,module,exports){
var AuthButton, AuthButtonManager, ConnectStoreMixin, CurrentUserStore, ScreenController;

ScreenController = require('../../../controllers/screen');

CurrentUserStore = require('../../../stores/currentUser');

ConnectStoreMixin = require('../../../../../shared/react/mixins/connectStore');

AuthButton = require('./auth');

AuthButtonManager = React.createClass({
  displayName: 'AuthButtonManager',
  mixins: [ConnectStoreMixin(CurrentUserStore)],
  render: function() {
    if (!this.state.logged) {
      return React.createElement(AuthButton, null);
    } else {
      return null;
    }
  },
  getStateFromStore: function() {
    return {
      logged: CurrentUserStore.isLogged()
    };
  },
  handleClick: function() {
    return ScreenController.show(Auth, {}, 'auth-page');
  }
});

module.exports = AuthButtonManager;


},{"../../../../../shared/react/mixins/connectStore":260,"../../../controllers/screen":219,"../../../stores/currentUser":237,"./auth":71}],73:[function(require,module,exports){
var ComponentMixin, ConnectStoreMixin, ERROR_STATE, FRIEND_STATUS, FollowButton, GUESSED_STATUS, IGNORED_STATUS, NONE_STATUS, PROCESS_STATE, PropTypes, REQUESTED_STATUS, RelationshipButtonMixin, RelationshipsStore, SHOW_STATE, classnames;

classnames = require('classnames');

RelationshipsStore = require('../../../stores/relationships');

RelationshipButtonMixin = require('./mixins/relationship');

ComponentMixin = require('../../../mixins/component');

ConnectStoreMixin = require('../../../../../shared/react/mixins/connectStore');

PropTypes = React.PropTypes;

SHOW_STATE = 'show';

ERROR_STATE = 'error';

PROCESS_STATE = 'process';

FRIEND_STATUS = 'friend';

REQUESTED_STATUS = 'requested';

IGNORED_STATUS = 'ignored';

GUESSED_STATUS = 'guessed';

NONE_STATUS = 'none';

FollowButton = React.createClass({
  displayName: 'FollowButton',
  mixins: [ConnectStoreMixin(RelationshipsStore), RelationshipButtonMixin, ComponentMixin],
  propTypes: {
    user: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      currentState: SHOW_STATE
    };
  },
  render: function() {
    var buttonClasses;
    buttonClasses = classnames('follow-button', {
      '__active': this.isFollowStatus() && this.isShowState()
    });
    if (this.state.status != null) {
      return React.createElement("button", {
        "style": {
          display: 'inline-block!important'
        },
        "className": buttonClasses,
        "onClick": this.handleClick
      }, this.getTitle());
    } else {
      return null;
    }
  },
  isShowState: function() {
    return this.state.currentState === SHOW_STATE;
  },
  isErrorState: function() {
    return this.state.currentState === ERROR_STATE;
  },
  isFollowStatus: function() {
    return this.state.status === FRIEND_STATUS;
  },
  isTlogPrivate: function() {
    return this.props.user.is_privacy;
  },
  activateProcessState: function() {
    return this.safeUpdateState({
      currentState: PROCESS_STATE
    });
  },
  activateErrorState: function() {
    return this.safeUpdateState({
      currentState: ERROR_STATE
    });
  },
  activateShowState: function() {
    return this.safeUpdateState({
      currentState: SHOW_STATE
    });
  },
  getTitle: function() {
    switch (this.state.currentState) {
      case ERROR_STATE:
        return i18n.t('buttons.follow.error');
      case PROCESS_STATE:
        return i18n.t('buttons.follow.process');
    }
    switch (this.state.status) {
      case FRIEND_STATUS:
        return i18n.t('buttons.follow.subscribed');
      case REQUESTED_STATUS:
        return i18n.t('buttons.follow.requested');
      case IGNORED_STATUS:
        return i18n.t('buttons.follow.ignored');
      case GUESSED_STATUS:
      case NONE_STATUS:
        if (this.isTlogPrivate()) {
          return i18n.t('buttons.follow.send_request');
        } else {
          return i18n.t('buttons.follow.subscribe');
        }
        break;
      default:
        return console.warn('Unknown follow status of FollowButton component', this.state.status);
    }
  },
  handleClick: function() {
    var userId;
    userId = this.props.user.id;
    if (this.isShowState()) {
      switch (this.state.status) {
        case FRIEND_STATUS:
          return this.unfollow(userId);
        case REQUESTED_STATUS:
          return this.cancel(userId);
        case IGNORED_STATUS:
          return this.cancel(userId);
        case GUESSED_STATUS:
          return this.follow(userId);
        case NONE_STATUS:
          return this.follow(userId);
        default:
          return console.warn('Unknown follow status of FollowButton component', this.state.status);
      }
    }
  },
  getStateFromStore: function() {
    return {
      status: RelationshipsStore.getStatus(this.props.user.id) || this.props.status
    };
  }
});

module.exports = FollowButton;


},{"../../../../../shared/react/mixins/connectStore":260,"../../../mixins/component":222,"../../../stores/relationships":242,"./mixins/relationship":74,"classnames":332}],74:[function(require,module,exports){
var RelationshipButtonMixin, RelationshipViewActions;

RelationshipViewActions = require('../../../../actions/view/relationship');

RelationshipButtonMixin = {
  componentWillUnmount: function() {
    return this.clearErrorTimeout();
  },
  clearErrorTimeout: function() {
    if (this.errorTimeout != null) {
      return clearTimeout(this.errorTimeout);
    }
  },
  startErrorTimeout: function() {
    if (!this.isErrorState()) {
      this.activateErrorState();
    }
    return this.errorTimeout = setTimeout(this.activateShowState, 1000);
  },
  follow: function(userId) {
    this.activateProcessState();
    return RelationshipViewActions.follow(userId).then(this.activateShowState).fail(this.startErrorTimeout);
  },
  unfollow: function(userId) {
    this.activateProcessState();
    return RelationshipViewActions.unfollow(userId).then(this.activateShowState).fail(this.startErrorTimeout);
  },
  cancel: function(userId) {
    this.activateProcessState();
    return RelationshipViewActions.cancel(userId).then(this.activateShowState).fail(this.startErrorTimeout);
  }
};

module.exports = RelationshipButtonMixin;


},{"../../../../actions/view/relationship":14}],75:[function(require,module,exports){
var Avatar, PropTypes, classnames;

classnames = require('classnames');

PropTypes = React.PropTypes;

Avatar = React.createClass({
  displayName: 'Avatar',
  propTypes: {
    name: PropTypes.string.isRequired,
    userpic: PropTypes.object.isRequired,
    size: PropTypes.number
  },
  getDefaultProps: function() {
    return {
      size: 220
    };
  },
  render: function() {
    var avatarClasses, avatarStyles, avatarSymbol, avatarUrl;
    avatarUrl = this.props.userpic.original_url || this.props.userpic.large_url;
    avatarSymbol = this.props.userpic.symbol;
    avatarClasses = classnames('avatar', {
      'anonymous_char': this.isAnonymous()
    });
    if (avatarUrl != null) {
      avatarUrl = ThumborService.imageUrl({
        url: avatarUrl,
        path: this.props.userpic.thumbor_path,
        size: this.props.size + 'x' + this.props.size
      });
      avatarStyles = {
        backgroundImage: "url('" + avatarUrl + "')"
      };
      return React.createElement("span", {
        "style": avatarStyles,
        "className": avatarClasses
      }, React.createElement("img", {
        "src": avatarUrl,
        "alt": this.props.name,
        "className": "avatar__img"
      }));
    } else {
      avatarStyles = {
        backgroundColor: this.props.userpic.default_colors.background,
        color: this.props.userpic.default_colors.name
      };
      return React.createElement("span", {
        "style": avatarStyles,
        "className": avatarClasses,
        "title": this.props.name
      }, React.createElement("span", {
        "className": "avatar__text"
      }, avatarSymbol));
    }
  },
  isAnonymous: function() {
    return this.props.userpic.kind === 'anonymous';
  },
  isUser: function() {
    return this.props.userpic.kind === 'user';
  }
});

module.exports = Avatar;


},{"classnames":332}],76:[function(require,module,exports){
var Avatar, PropTypes, UserAvatar;

Avatar = require('./avatar');

PropTypes = React.PropTypes;

UserAvatar = React.createClass({
  displayName: 'UserAvatar',
  propTypes: {
    user: PropTypes.object.isRequired,
    size: PropTypes.number
  },
  render: function() {
    return React.createElement(Avatar, {
      "name": this.props.user.name,
      "userpic": this.props.user.userpic,
      "size": this.props.size
    });
  }
});

module.exports = UserAvatar;


},{"./avatar":75}],77:[function(require,module,exports){
var ConnectStoreMixin, FollowStatus, PropTypes, RelationshipsStore;

RelationshipsStore = require('../../../stores/relationships');

ConnectStoreMixin = require('../../../../../shared/react/mixins/connectStore');

PropTypes = React.PropTypes;

FollowStatus = React.createClass({
  displayName: 'FollowStatus',
  mixins: [ConnectStoreMixin(RelationshipsStore)],
  propTypes: {
    userId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired
  },
  render: function() {
    if (this.state.status != null) {
      return React.createElement("span", {
        "className": 'follow-status __' + this.state.status
      }, React.createElement("i", {
        "className": "follow-status__icon"
      }));
    } else {
      return null;
    }
  },
  getStateFromStore: function() {
    return {
      status: RelationshipsStore.getStatus(this.props.userId) || this.props.status
    };
  }
});

module.exports = FollowStatus;


},{"../../../../../shared/react/mixins/connectStore":260,"../../../stores/relationships":242}],78:[function(require,module,exports){
var Image, PropTypes;

PropTypes = React.PropTypes;

Image = React.createClass({
  displayName: 'Image',
  propTypes: {
    image: PropTypes.object.isRequired,
    maxWidth: PropTypes.number,
    maxHeight: PropTypes.number,
    className: PropTypes.string
  },
  render: function() {
    return React.createElement("div", {
      "className": this.props.className,
      "style": this.getImageProportions()
    }, React.createElement("img", {
      "src": this.getImageUrl()
    }));
  },
  getImageProportions: function() {
    var height, maxHeight, maxWidth, ratio, ref, ref1, srcHeight, srcWidth, width;
    if ((this.props.maxWidth != null) || (this.props.maxHeight != null)) {
      maxWidth = (ref = this.props.maxWidth) != null ? ref : this.props.maxHeight;
      maxHeight = (ref1 = this.props.maxHeight) != null ? ref1 : this.props.maxWidth;
      srcWidth = this.props.image.geometry.width;
      srcHeight = this.props.image.geometry.height;
      if (srcWidth > maxWidth) {
        ratio = maxWidth / srcWidth;
        width = maxWidth;
        height = srcHeight * ratio;
        srcHeight = srcHeight * ratio;
        srcWidth = srcWidth * ratio;
      } else if (srcHeight > maxHeight) {
        ratio = maxHeight / srcHeight;
        height = maxHeight;
        width = srcWidth * ratio;
        srcWidth = srcWidth * ratio;
        srcHeight = srcHeight * ratio;
      } else {
        width = srcWidth;
        height = srcHeight;
      }
      width = parseInt(width, 10);
      height = parseInt(height, 10);
      return {
        width: width,
        height: height
      };
    }
  },
  getImageUrl: function() {
    var height, ref, url, width;
    ref = this.getImageProportions(), width = ref.width, height = ref.height;
    return url = ThumborService.imageUrl({
      url: this.props.image.url,
      path: this.props.image.path,
      size: width + "x" + height
    });
  }
});

module.exports = Image;


},{}],79:[function(require,module,exports){
/*global i18n, moment */
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Page = (function () {
  function Page() {
    _classCallCheck(this, Page);
  }

  _createClass(Page, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var locale = this.props.locale;

      if (locale !== i18n.lng()) {
        i18n.setLng(locale);
      }
      moment.locale(locale);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        this.props.children
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      locale: _react.PropTypes.string.isRequired
    },
    enumerable: true
  }]);

  return Page;
})();

exports['default'] = Page;
module.exports = exports['default'];

},{"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/interop-require-default":278,"react":"react"}],80:[function(require,module,exports){
"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var PageBody = (function () {
  function PageBody() {
    _classCallCheck(this, PageBody);
  }

  _createClass(PageBody, [{
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "div",
        { className: "layout__body" },
        this.props.children
      );
    }
  }]);

  return PageBody;
})();

exports["default"] = PageBody;
module.exports = exports["default"];

},{"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/interop-require-default":278,"react":"react"}],81:[function(require,module,exports){
"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var PageHeader = (function () {
  function PageHeader() {
    _classCallCheck(this, PageHeader);
  }

  _createClass(PageHeader, [{
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "div",
        { className: "layout__header" },
        this.props.children
      );
    }
  }]);

  return PageHeader;
})();

exports["default"] = PageHeader;
module.exports = exports["default"];

},{"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/interop-require-default":278,"react":"react"}],82:[function(require,module,exports){
"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var PageLayout = (function () {
  function PageLayout() {
    _classCallCheck(this, PageLayout);
  }

  _createClass(PageLayout, [{
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "div",
        { className: "layout" },
        this.props.children
      );
    }
  }]);

  return PageLayout;
})();

exports["default"] = PageLayout;
module.exports = exports["default"];

},{"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/interop-require-default":278,"react":"react"}],83:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PageWithToolbars = require('./PageWithToolbars');

var _PageWithToolbars2 = _interopRequireDefault(_PageWithToolbars);

var _authAuthManager = require('../../auth/authManager');

var _authAuthManager2 = _interopRequireDefault(_authAuthManager);

var _buttonsAuthAuthManager = require('../../buttons/auth/authManager');

var _buttonsAuthAuthManager2 = _interopRequireDefault(_buttonsAuthAuthManager);

var PageWithAuth = (function () {
  function PageWithAuth() {
    _classCallCheck(this, PageWithAuth);
  }

  _createClass(PageWithAuth, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var currentUser = _props.currentUser;
      var locale = _props.locale;

      return _react2['default'].createElement(
        _PageWithToolbars2['default'],
        {
          currentUser: currentUser,
          locale: locale
        },
        _react2['default'].createElement(_buttonsAuthAuthManager2['default'], null),
        children,
        _react2['default'].createElement(_authAuthManager2['default'], null)
      );
    }
  }], [{
    key: 'propTypes',
    value: _PageWithToolbars2['default'].propTypes,
    enumerable: true
  }]);

  return PageWithAuth;
})();

exports['default'] = PageWithAuth;
module.exports = exports['default'];

},{"../../auth/authManager":56,"../../buttons/auth/authManager":72,"./PageWithToolbars":84,"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/interop-require-default":278,"react":"react"}],84:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storesCurrentUser = require('../../../stores/currentUser');

var _storesCurrentUser2 = _interopRequireDefault(_storesCurrentUser);

var _Page = require('./Page');

var _Page2 = _interopRequireDefault(_Page);

var _toolbarsFeedManager = require('../../toolbars/feedManager');

var _toolbarsFeedManager2 = _interopRequireDefault(_toolbarsFeedManager);

var _toolbarsUserManager = require('../../toolbars/userManager');

var _toolbarsUserManager2 = _interopRequireDefault(_toolbarsUserManager);

var PageWithToolbars = (function () {
  function PageWithToolbars() {
    _classCallCheck(this, PageWithToolbars);
  }

  _createClass(PageWithToolbars, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // Temporarily initialize CurrentUserStore here. Later on it will be set at
      // root App component
      // Some signin gists https://gist.github.com/ButuzGOL/707d1605f63eef55e4af
      _storesCurrentUser2['default'].initialize(this.props.currentUser);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var locale = _props.locale;
      var children = _props.children;

      return _react2['default'].createElement(
        _Page2['default'],
        { locale: locale },
        _react2['default'].createElement(_toolbarsFeedManager2['default'], null),
        _react2['default'].createElement(_toolbarsUserManager2['default'], null),
        children
      );
    }
  }], [{
    key: 'propTypes',
    value: _extends({}, _Page2['default'].propTypes, {
      currentUser: _react.PropTypes.object
    }),
    enumerable: true
  }]);

  return PageWithToolbars;
})();

exports['default'] = PageWithToolbars;
module.exports = exports['default'];

},{"../../../stores/currentUser":237,"../../toolbars/feedManager":201,"../../toolbars/userManager":208,"./Page":79,"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/extends":275,"babel-runtime/helpers/interop-require-default":278,"react":"react"}],85:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _MetaMeta = require('./Meta/Meta');

var _MetaMeta2 = _interopRequireDefault(_MetaMeta);

var _FeedMeta = require('./Feed/Meta');

var _FeedMeta2 = _interopRequireDefault(_FeedMeta);

var _commentsComments = require('./comments/comments');

var _commentsComments2 = _interopRequireDefault(_commentsComments);

var _contentContent = require('./content/content');

var _contentContent2 = _interopRequireDefault(_contentContent);

var _storesCurrentUser = require('../../stores/currentUser');

var _storesCurrentUser2 = _interopRequireDefault(_storesCurrentUser);

var _sharedReactMixinsConnectStore = require('../../../../shared/react/mixins/connectStore');

var _sharedReactMixinsConnectStore2 = _interopRequireDefault(_sharedReactMixinsConnectStore);

var _mixinsComponent = require('../../mixins/component');

var _mixinsComponent2 = _interopRequireDefault(_mixinsComponent);

var _mixinsEntry = require('./mixins/entry');

var _mixinsEntry2 = _interopRequireDefault(_mixinsEntry);

var EntryFeed = React.createClass({
  displayName: 'EntryFeed',

  mixins: [(0, _sharedReactMixinsConnectStore2['default'])(_storesCurrentUser2['default']), _mixinsEntry2['default'], _mixinsComponent2['default']],

  propTypes: {
    entry: React.PropTypes.object.isRequired,
    loadPerTime: React.PropTypes.number,
    commentFormVisible: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      commentFormVisible: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      commentFormVisible: this.props.commentFormVisible
    };
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: this.getEntryClasses() },
      React.createElement(_FeedMeta2['default'], { author: this.props.entry.author }),
      React.createElement(_contentContent2['default'], { entry: this.props.entry }),
      React.createElement(_MetaMeta2['default'], {
        entry: this.props.entry,
        commentsCount: this.state.commentsCount,
        onMetaCommentsClick: this.toggleCommentForm }),
      React.createElement(_commentsComments2['default'], {
        user: this.state.user,
        entry: this.props.entry,
        comments: this.state.comments,
        commentsCount: this.state.commentsCount,
        loading: this.isLoadingState(),
        loadPerTime: this.props.loadPerTime,
        formVisible: this.state.commentFormVisible,
        onCommentsLoadMore: this.loadMoreComments,
        onCommentCreate: this.createComment,
        onCommentEdit: this.editComment,
        onCommentDelete: this.deleteComment,
        onCommentReport: this.reportComment })
    );
  },

  toggleCommentForm: function toggleCommentForm() {
    this.setState({ commentFormVisible: !this.state.commentFormVisible });
  },

  getStateFromStore: function getStateFromStore() {
    return {
      user: _storesCurrentUser2['default'].getUser()
    };
  }
});

exports['default'] = EntryFeed;
module.exports = exports['default'];

},{"../../../../shared/react/mixins/connectStore":260,"../../mixins/component":222,"../../stores/currentUser":237,"./Feed/Meta":86,"./Meta/Meta":87,"./comments/comments":119,"./content/content":121,"./mixins/entry":130,"babel-runtime/helpers/interop-require-default":278}],86:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MetaMetaAuthor = require('../Meta/MetaAuthor');

var _MetaMetaAuthor2 = _interopRequireDefault(_MetaMetaAuthor);

var EntryFeedMeta = React.createClass({
  displayName: "EntryFeedMeta",

  propTypes: {
    author: React.PropTypes.object.isRequired
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "post__meta" },
      React.createElement(_MetaMetaAuthor2["default"], { author: this.props.author })
    );
  }
});

exports["default"] = EntryFeedMeta;
module.exports = exports["default"];

},{"../Meta/MetaAuthor":89,"babel-runtime/helpers/interop-require-default":278}],87:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MetaVoting = require('./MetaVoting');

var _MetaVoting2 = _interopRequireDefault(_MetaVoting);

var _MetaActions = require('./MetaActions');

var _MetaActions2 = _interopRequireDefault(_MetaActions);

var _MetaComments = require('./MetaComments');

var _MetaComments2 = _interopRequireDefault(_MetaComments);

var _MetaDate = require('./MetaDate');

var _MetaDate2 = _interopRequireDefault(_MetaDate);

var EntryMeta = (function () {
  function EntryMeta() {
    _classCallCheck(this, EntryMeta);
  }

  _createClass(EntryMeta, [{
    key: 'renderVoting',
    value: function renderVoting() {
      var _props$entry = this.props.entry;
      var id = _props$entry.id;
      var is_voteable = _props$entry.is_voteable;
      var rating = _props$entry.rating;

      if (is_voteable) {
        return _react2['default'].createElement(_MetaVoting2['default'], { entryId: id, rating: rating });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var commentsCount = _props.commentsCount;
      var entry = _props.entry;
      var onDelete = _props.onDelete;
      var onMetaCommentsClick = _props.onMetaCommentsClick;

      return _react2['default'].createElement(
        'div',
        { className: 'post__meta' },
        _react2['default'].createElement(_MetaActions2['default'], {
          entry: entry,
          onDelete: onDelete
        }),
        this.renderVoting(),
        entry.is_private && _react2['default'].createElement('div', { className: 'meta-private' }),
        _react2['default'].createElement(_MetaComments2['default'], {
          commentsCount: commentsCount,
          onClick: onMetaCommentsClick
        }),
        _react2['default'].createElement(_MetaDate2['default'], {
          date: entry.created_at,
          entryUrl: entry.entry_url
        })
      );
    }
  }]);

  return EntryMeta;
})();

EntryMeta.propTypes = {
  entry: _react.PropTypes.object.isRequired,
  commentsCount: _react.PropTypes.number.isRequired,
  onDelete: _react.PropTypes.func,
  onMetaCommentsClick: _react.PropTypes.func.isRequired
};

exports['default'] = EntryMeta;
module.exports = exports['default'];

},{"./MetaActions":88,"./MetaComments":90,"./MetaDate":91,"./MetaVoting":92,"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/interop-require-default":278,"react":"react"}],88:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _mixinsClickOutside = require('../../../mixins/clickOutside');

var _mixinsClickOutside2 = _interopRequireDefault(_mixinsClickOutside);

var _actionsButtonsButton = require('./actions/buttons/button');

var _actionsButtonsButton2 = _interopRequireDefault(_actionsButtonsButton);

var _actionsDropdownMenu = require('./actions/dropdownMenu');

var _actionsDropdownMenu2 = _interopRequireDefault(_actionsDropdownMenu);

var OPEN_STATE = 'open',
    CLOSE_STATE = 'close';

var EntryMetaActions = React.createClass({
  displayName: 'EntryMetaActions',

  mixins: [_mixinsClickOutside2['default']],

  propTypes: {
    entry: React.PropTypes.object.isRequired,
    onDelete: React.PropTypes.func
  },

  getInitialState: function getInitialState() {
    return {
      currentState: CLOSE_STATE
    };
  },

  render: function render() {
    var actionsClasses = (0, _classnames2['default'])('meta-actions', {
      '__open': this.isOpenState()
    });

    return React.createElement(
      'div',
      { className: actionsClasses },
      React.createElement(_actionsButtonsButton2['default'], { onClick: this.toggleOpenState }),
      React.createElement(_actionsDropdownMenu2['default'], {
        entry: this.props.entry,
        onDelete: this.props.onDelete,
        visible: this.isOpenState()
      })
    );
  },

  isOpenState: function isOpenState() {
    return this.state.currentState == OPEN_STATE;
  },

  activateCloseState: function activateCloseState() {
    this.setState({ currentState: CLOSE_STATE });
  },

  activateOpenState: function activateOpenState() {
    this.setState({ currentState: OPEN_STATE });
  },

  toggleOpenState: function toggleOpenState() {
    this.isOpenState() ? this.activateCloseState() : this.activateOpenState();
  }
});

exports['default'] = EntryMetaActions;
module.exports = exports['default'];

},{"../../../mixins/clickOutside":221,"./actions/buttons/button":93,"./actions/dropdownMenu":94,"babel-runtime/helpers/interop-require-default":278,"classnames":332}],89:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commonAvatarUser = require('../../common/avatar/user');

var _commonAvatarUser2 = _interopRequireDefault(_commonAvatarUser);

var EntryMetaAuthor = React.createClass({
  displayName: "EntryMetaAuthor",

  propTypes: {
    author: React.PropTypes.object.isRequired
  },

  render: function render() {
    return React.createElement(
      "a",
      { href: this.props.author.tlog_url, className: "meta-author" },
      React.createElement(
        "span",
        { className: "meta-author__avatar" },
        React.createElement(_commonAvatarUser2["default"], { user: this.props.author, size: 28 })
      ),
      React.createElement(
        "span",
        { className: "meta-author__name" },
        "@",
        this.props.author.slug
      )
    );
  }
});

exports["default"] = EntryMetaAuthor;
module.exports = exports["default"];

},{"../../common/avatar/user":76,"babel-runtime/helpers/interop-require-default":278}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var EntryMetaComments = React.createClass({
  displayName: "EntryMetaComments",

  propTypes: {
    commentsCount: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "meta-comments", onClick: this.handleClick },
      this.props.commentsCount
    );
  },

  handleClick: function handleClick() {
    this.props.onClick();
  }
});

exports["default"] = EntryMetaComments;
module.exports = exports["default"];

},{}],91:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var EntryMetaDate = React.createClass({
  displayName: 'EntryMetaDate',

  propTypes: {
    date: React.PropTypes.string.isRequired,
    entryUrl: React.PropTypes.string.isRequired
  },

  render: function render() {
    return React.createElement(
      'a',
      { href: this.props.entryUrl, className: 'meta-date' },
      this.getFormattedDate()
    );
  },

  getFormattedDate: function getFormattedDate() {
    var now = moment(),
        entryDate = moment(this.props.date),
        date = undefined;

    if (now.diff(entryDate, 'days') < 1) {
      date = entryDate.calendar();
    } else {
      if (now.year() != entryDate.year()) {
        date = entryDate.format('D MMMM YYYY');
      } else {
        date = entryDate.format('D MMMM');
      }
    }

    return date;
  }
});

exports['default'] = EntryMetaDate;
module.exports = exports['default'];

},{}],92:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _actionsViewEntry = require('../../../actions/view/entry');

var _actionsViewEntry2 = _interopRequireDefault(_actionsViewEntry);

var _mixinsComponent = require('../../../mixins/component');

var _mixinsComponent2 = _interopRequireDefault(_mixinsComponent);

var EntryMetaVoting = React.createClass({
  displayName: 'EntryMetaVoting',

  mixins: [_mixinsComponent2['default']],

  propTypes: {
    rating: React.PropTypes.object.isRequired,
    entryId: React.PropTypes.number.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      canVote: this.props.rating.is_voteable,
      voted: this.props.rating.is_voted,
      votes: this.props.rating.votes
    };
  },

  render: function render() {
    var votingClasses = (0, _classnames2['default'])('meta-voting', {
      'voted': this.isVoted(),
      'votable': this.isVoteable(),
      'unvotable': !this.isVoteable()
    });

    return React.createElement(
      'div',
      { className: votingClasses, onClick: this.handleClick },
      this.state.votes
    );
  },

  isVoted: function isVoted() {
    return this.state.voted;
  },

  isVoteable: function isVoteable() {
    return this.state.canVote;
  },

  vote: function vote() {
    var _this = this;

    _actionsViewEntry2['default'].vote(this.props.entryId).then(function (rating) {
      return _this.safeUpdateState({
        canVote: rating.is_voteable,
        voted: rating.is_voted,
        votes: rating.votes
      });
    });
  },

  handleClick: function handleClick() {
    if (this.isVoted() || !this.isVoteable()) {
      return;
    }
    this.vote();
  }
});

exports['default'] = EntryMetaVoting;
module.exports = exports['default'];

},{"../../../actions/view/entry":10,"../../../mixins/component":222,"babel-runtime/helpers/interop-require-default":278,"classnames":332}],93:[function(require,module,exports){
var EntryMetaActions_Button, PropTypes;

PropTypes = React.PropTypes;

EntryMetaActions_Button = React.createClass({
  displayName: 'EntryMetaActions_Button',
  propTypes: {
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("button", {
      "className": "meta-actions__button",
      "onClick": this.props.onClick
    }, React.createElement("i", {
      "className": "icon icon--dots"
    }));
  }
});

module.exports = EntryMetaActions_Button;


},{}],94:[function(require,module,exports){
var DropdownMenuMixin, EntryMetaActions_DropdownMenu, EntryMetaActions_DropdownMenu_DeleteItem, EntryMetaActions_DropdownMenu_EditItem, EntryMetaActions_DropdownMenu_FavoriteItem, EntryMetaActions_DropdownMenu_LinkItem, EntryMetaActions_DropdownMenu_ReportItem, EntryMetaActions_DropdownMenu_WatchItem, PropTypes, classnames;

classnames = require('classnames');

DropdownMenuMixin = require('../../../../mixins/dropdownMenu');

EntryMetaActions_DropdownMenu_LinkItem = require('./dropdownMenu/items/link');

EntryMetaActions_DropdownMenu_EditItem = require('./dropdownMenu/items/edit');

EntryMetaActions_DropdownMenu_FavoriteItem = require('./dropdownMenu/items/favorite');

EntryMetaActions_DropdownMenu_WatchItem = require('./dropdownMenu/items/watch');

EntryMetaActions_DropdownMenu_DeleteItem = require('./dropdownMenu/items/delete');

EntryMetaActions_DropdownMenu_ReportItem = require('./dropdownMenu/items/report');

PropTypes = React.PropTypes;

EntryMetaActions_DropdownMenu = React.createClass({
  displayName: 'EntryMetaActions_DropdownMenu',
  mixins: [DropdownMenuMixin],
  propTypes: {
    entry: PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    visible: PropTypes.bool.isRequired
  },
  render: function() {
    var popupClasses;
    popupClasses = classnames('meta-actions__dropdown-popup', {
      '__top': this.state.top,
      '__right': this.state.right
    });
    return React.createElement("div", {
      "className": popupClasses
    }, this.renderPopupList());
  },
  renderPopupList: function() {
    var deleteItem, editItem, favoriteItem, linkItem, reportItem, watchItem;
    linkItem = React.createElement(EntryMetaActions_DropdownMenu_LinkItem, {
      "entryUrl": this.props.entry.entry_url,
      "key": "link"
    });
    if (this.props.entry.can_edit) {
      editItem = React.createElement(EntryMetaActions_DropdownMenu_EditItem, {
        "editUrl": Routes.entry_edit_url(this.props.entry.author.slug, this.props.entry.id),
        "key": "edit"
      });
    }
    if (this.props.entry.can_favorite) {
      favoriteItem = React.createElement(EntryMetaActions_DropdownMenu_FavoriteItem, {
        "entryId": this.props.entry.id,
        "favorited": this.props.entry.is_favorited,
        "key": "favorite"
      });
    }
    if (this.props.entry.can_watch) {
      watchItem = React.createElement(EntryMetaActions_DropdownMenu_WatchItem, {
        "entryId": this.props.entry.id,
        "watching": this.props.entry.is_watching,
        "key": "watch"
      });
    }
    if (this.props.entry.can_report) {
      reportItem = React.createElement(EntryMetaActions_DropdownMenu_ReportItem, {
        "entryId": this.props.entry.id,
        "key": "report"
      });
    }
    if (this.props.entry.can_delete) {
      deleteItem = React.createElement(EntryMetaActions_DropdownMenu_DeleteItem, {
        "entryId": this.props.entry.id,
        "onDelete": this.props.onDelete,
        "key": "delete"
      });
    }
    return React.createElement("ul", {
      "className": "meta-actions__dropdown-popup-list"
    }, [editItem, linkItem, favoriteItem, watchItem, reportItem, deleteItem]);
  }
});

module.exports = EntryMetaActions_DropdownMenu;


},{"../../../../mixins/dropdownMenu":223,"./dropdownMenu/items/delete":95,"./dropdownMenu/items/edit":96,"./dropdownMenu/items/favorite":97,"./dropdownMenu/items/link":98,"./dropdownMenu/items/report":99,"./dropdownMenu/items/watch":100,"classnames":332}],95:[function(require,module,exports){
var EntryMetaActions_DropdownMenu_DeleteItem, EntryViewActions, PropTypes;

EntryViewActions = require('../../../../../../actions/view/entry');

PropTypes = React.PropTypes;

EntryMetaActions_DropdownMenu_DeleteItem = React.createClass({
  displayName: 'EntryMetaActions_DropdownMenu_DeleteItem',
  propTypes: {
    entryId: PropTypes.number.isRequired,
    onDelete: PropTypes.func
  },
  render: function() {
    return React.createElement("li", {
      "className": "meta-actions__dropdown-popup-item"
    }, React.createElement("a", {
      "className": "meta-actions__dropdown-popup-link",
      "onClick": this.handleClick
    }, React.createElement("i", {
      "className": "icon icon--basket"
    }), React.createElement("span", null, i18n.t('entry.delete_item'))));
  },
  "delete": function() {
    return EntryViewActions["delete"](this.props.entryId).then(onDelete);
  },
  handleClick: function() {
    if (confirm(i18n.t('entry.delete_confirm'))) {
      return this["delete"]();
    }
  }
});

module.exports = EntryMetaActions_DropdownMenu_DeleteItem;


},{"../../../../../../actions/view/entry":10}],96:[function(require,module,exports){
var EntryMetaActions_DropdownMenu_EditItem, PropTypes;

PropTypes = React.PropTypes;

EntryMetaActions_DropdownMenu_EditItem = React.createClass({
  displayName: 'EntryMetaActions_DropdownMenu_EditItem',
  propTypes: {
    editUrl: PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement("li", {
      "className": "meta-actions__dropdown-popup-item"
    }, React.createElement("a", {
      "href": this.props.editUrl,
      "className": "meta-actions__dropdown-popup-link"
    }, React.createElement("i", {
      "className": "icon icon--pencil"
    }), React.createElement("span", null, i18n.t('entry.edit_item'))));
  }
});

module.exports = EntryMetaActions_DropdownMenu_EditItem;


},{}],97:[function(require,module,exports){
var EntryMetaActions_DropdownMenu_FavoriteItem, EntryViewActions, PropTypes, classnames;

classnames = require('classnames');

EntryViewActions = require('../../../../../../actions/view/entry');

PropTypes = React.PropTypes;

EntryMetaActions_DropdownMenu_FavoriteItem = React.createClass({
  displayName: 'EntryMetaActions_DropdownMenu_FavoriteItem',
  propTypes: {
    favorited: PropTypes.bool.isRequired,
    entryId: PropTypes.number.isRequired
  },
  getInitialState: function() {
    return {
      favorited: this.props.favorited
    };
  },
  render: function() {
    var iconClasses;
    iconClasses = classnames('icon', 'icon--star', {
      'icon--star-fill': this.isFavorited()
    });
    return React.createElement("li", {
      "className": "meta-actions__dropdown-popup-item"
    }, React.createElement("a", {
      "className": "meta-actions__dropdown-popup-link",
      "onClick": this.handleClick
    }, React.createElement("i", {
      "className": iconClasses
    }), React.createElement("span", null, this.getTitle())));
  },
  isFavorited: function() {
    return this.state.favorited;
  },
  getTitle: function() {
    if (this.isFavorited()) {
      return i18n.t('entry.remove_from_favorites_item');
    } else {
      return i18n.t('entry.add_to_favorites_item');
    }
  },
  addToFavorites: function() {
    return EntryViewActions.addToFavorites(this.props.entryId).then((function(_this) {
      return function() {
        return _this.setState({
          favorited: true
        });
      };
    })(this));
  },
  removeFromFavorites: function() {
    return EntryViewActions.removeFromFavorites(this.props.entryId).then((function(_this) {
      return function() {
        return _this.setState({
          favorited: false
        });
      };
    })(this));
  },
  handleClick: function() {
    if (this.isFavorited()) {
      return this.removeFromFavorites();
    } else {
      return this.addToFavorites();
    }
  }
});

module.exports = EntryMetaActions_DropdownMenu_FavoriteItem;


},{"../../../../../../actions/view/entry":10,"classnames":332}],98:[function(require,module,exports){
var EntryMetaActions_DropdownMenu_LinkItem, PropTypes;

PropTypes = React.PropTypes;

EntryMetaActions_DropdownMenu_LinkItem = React.createClass({
  displayName: 'EntryMetaActions_DropdownMenu_LinkItem',
  propTypes: {
    entryUrl: PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement("li", {
      "className": "meta-actions__dropdown-popup-item"
    }, React.createElement("a", {
      "href": this.props.entryUrl,
      "className": "meta-actions__dropdown-popup-link"
    }, React.createElement("i", {
      "className": "icon icon--hyperlink"
    }), React.createElement("span", null, i18n.t('entry.link_item'))));
  }
});

module.exports = EntryMetaActions_DropdownMenu_LinkItem;


},{}],99:[function(require,module,exports){
var EntryMetaActions_DropdownMenu_ReportItem, EntryViewActions, PropTypes;

EntryViewActions = require('../../../../../../actions/view/entry');

PropTypes = React.PropTypes;

EntryMetaActions_DropdownMenu_ReportItem = React.createClass({
  displayName: 'EntryMetaActions_DropdownMenu_ReportItem',
  propTypes: {
    entryId: PropTypes.number.isRequired
  },
  render: function() {
    return React.createElement("li", {
      "className": "meta-actions__dropdown-popup-item"
    }, React.createElement("a", {
      "className": "meta-actions__dropdown-popup-link",
      "onClick": this.handleClick
    }, React.createElement("i", {
      "className": "icon icon--exclamation-mark"
    }), React.createElement("span", null, i18n.t('entry.report_item'))));
  },
  report: function() {
    return EntryViewActions.report(this.props.entryId);
  },
  handleClick: function() {
    if (confirm(i18n.t('entry.report_confirm'))) {
      return this.report();
    }
  }
});

module.exports = EntryMetaActions_DropdownMenu_ReportItem;


},{"../../../../../../actions/view/entry":10}],100:[function(require,module,exports){
var EntryMetaActions_DropdownMenu_WatchItem, EntryViewActions, PropTypes;

EntryViewActions = require('../../../../../../actions/view/entry');

PropTypes = React.PropTypes;

EntryMetaActions_DropdownMenu_WatchItem = React.createClass({
  displayName: 'EntryMetaActions_DropdownMenu_WatchItem',
  propTypes: {
    entryId: PropTypes.number.isRequired,
    watching: PropTypes.bool.isRequired
  },
  getInitialState: function() {
    return {
      watching: this.props.watching
    };
  },
  render: function() {
    return React.createElement("li", {
      "className": "meta-actions__dropdown-popup-item"
    }, React.createElement("a", {
      "className": "meta-actions__dropdown-popup-link",
      "onClick": this.handleClick
    }, React.createElement("i", {
      "className": "icon icon--comments-subscribe"
    }), React.createElement("span", null, this.getTitle())));
  },
  isWatching: function() {
    return this.state.watching;
  },
  getTitle: function() {
    if (this.isWatching()) {
      return i18n.t('entry.stop_watch_item');
    } else {
      return i18n.t('entry.start_watch_item');
    }
  },
  startWatch: function() {
    return EntryViewActions.startWatch(this.props.entryId).then((function(_this) {
      return function() {
        return _this.setState({
          watching: true
        });
      };
    })(this));
  },
  stopWatch: function() {
    return EntryViewActions.stopWatch(this.props.entryId).then((function(_this) {
      return function() {
        return _this.setState({
          watching: false
        });
      };
    })(this));
  },
  handleClick: function() {
    if (this.isWatching()) {
      return this.stopWatch();
    } else {
      return this.startWatch();
    }
  }
});

module.exports = EntryMetaActions_DropdownMenu_WatchItem;


},{"../../../../../../actions/view/entry":10}],101:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _MetaMeta = require('./Meta/Meta');

var _MetaMeta2 = _interopRequireDefault(_MetaMeta);

var _commentsComments = require('./comments/comments');

var _commentsComments2 = _interopRequireDefault(_commentsComments);

var _contentContent = require('./content/content');

var _contentContent2 = _interopRequireDefault(_contentContent);

var _storesCurrentUser = require('../../stores/currentUser');

var _storesCurrentUser2 = _interopRequireDefault(_storesCurrentUser);

var _sharedReactMixinsConnectStore = require('../../../../shared/react/mixins/connectStore');

var _sharedReactMixinsConnectStore2 = _interopRequireDefault(_sharedReactMixinsConnectStore);

var _mixinsComponent = require('../../mixins/component');

var _mixinsComponent2 = _interopRequireDefault(_mixinsComponent);

var _mixinsEntry = require('./mixins/entry');

var _mixinsEntry2 = _interopRequireDefault(_mixinsEntry);

var EntryTlog = React.createClass({
  displayName: 'EntryTlog',

  mixins: [(0, _sharedReactMixinsConnectStore2['default'])(_storesCurrentUser2['default']), _mixinsEntry2['default'], _mixinsComponent2['default']],

  propTypes: {
    entry: React.PropTypes.object.isRequired,
    loadPerTime: React.PropTypes.number,
    commentFormVisible: React.PropTypes.bool,
    onDelete: React.PropTypes.func,
    successDeleteUrl: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      commentFormVisible: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      commentFormVisible: this.props.commentFormVisible,
      formFocus: !this.props.commentFormVisible
    };
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: this.getEntryClasses() },
      React.createElement(_contentContent2['default'], { entry: this.props.entry }),
      React.createElement(_MetaMeta2['default'], {
        entry: this.props.entry,
        commentsCount: this.state.commentsCount,
        onDelete: this.onDelete.bind(this),
        onMetaCommentsClick: this.toggleCommentForm
      }),
      React.createElement(_commentsComments2['default'], {
        user: this.state.user,
        entry: this.props.entry,
        comments: this.state.comments,
        commentsCount: this.state.commentsCount,
        loading: this.isLoadingState(),
        loadPerTime: this.props.loadPerTime,
        formFocus: this.state.formFocus,
        formVisible: this.state.commentFormVisible,
        onCommentsLoadMore: this.loadMoreComments,
        onCommentCreate: this.createComment,
        onCommentEdit: this.editComment,
        onCommentDelete: this.deleteComment,
        onCommentReport: this.reportComment
      })
    );
  },

  toggleCommentForm: function toggleCommentForm() {
    var _state = this.state;
    var commentFormVisible = _state.commentFormVisible;
    var formFocus = _state.formFocus;

    this.setState({
      commentFormVisible: formFocus ? !commentFormVisible : true,
      formFocus: true
    });
  },

  getStateFromStore: function getStateFromStore() {
    return {
      user: _storesCurrentUser2['default'].getUser()
    };
  },

  onDelete: function onDelete() {
    var _props = this.props;
    var id = _props.entry.id;
    var onDelete = _props.onDelete;
    var successDeleteUrl = _props.successDeleteUrl;

    if (typeof onDelete === 'function') {
      onDelete(id);
    } else if (successDeleteUrl) {
      window.setTimeout(function () {
        return window.location.href = successDeleteUrl;
      }, 0);
    }
  }
});

exports['default'] = EntryTlog;
module.exports = exports['default'];

},{"../../../../shared/react/mixins/connectStore":260,"../../mixins/component":222,"../../stores/currentUser":237,"./Meta/Meta":87,"./comments/comments":119,"./content/content":121,"./mixins/entry":130,"babel-runtime/helpers/interop-require-default":278}],102:[function(require,module,exports){
var CommentsLoadMoreButton, PropTypes;

PropTypes = React.PropTypes;

CommentsLoadMoreButton = React.createClass({
  displayName: 'CommentsLoadMoreButton',
  propTypes: {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("span", {
      "className": "comments__more-link",
      "onClick": this.props.onClick
    }, this.props.title);
  }
});

module.exports = CommentsLoadMoreButton;


},{}],103:[function(require,module,exports){
var CommentForm, PropTypes, findDOMNode;

findDOMNode = React.findDOMNode, PropTypes = React.PropTypes;

CommentForm = React.createClass({
  displayName: 'CommentForm',
  propTypes: {
    text: PropTypes.string,
    buttonTitle: PropTypes.string.isRequired,
    formFocus: PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onSubmit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      disabled: false
    };
  },
  componentDidMount: function() {
    return this.formFocus();
  },
  componentDidUpdate: function() {
    return this.formFocus();
  },
  formFocus: function() {
    var textField;
    textField = findDOMNode(this.refs.textField);
    if (textField && this.props.formFocus) {
      return textField.focus();
    }
  },
  render: function() {
    return React.createElement("form", {
      "className": "comment-form"
    }, this.renderCancelButton(), React.createElement("button", {
      "className": "comment-form__submit",
      "onClick": this.handleSubmit
    }, this.props.buttonTitle), React.createElement("div", {
      "className": "comment-form__field"
    }, React.createElement("textarea", {
      "ref": "textField",
      "defaultValue": this.props.text,
      "placeholder": this.props.placeholder,
      "disabled": this.props.disabled,
      "className": "comment-form__field-textarea",
      "onKeyDown": this.handleTextareaKeydown
    })));
  },
  renderCancelButton: function() {
    if (this.props.onCancel != null) {
      return React.createElement("button", {
        "className": "comment-form__cancel",
        "onClick": this.handleCancel
      }, i18n.t('buttons.comment_edit_cancel'));
    }
  },
  clearForm: function() {
    return findDOMNode(this.refs.textField).value = '';
  },
  handleSubmit: function(e) {
    var value;
    e.preventDefault();
    value = findDOMNode(this.refs.textField).value.trim();
    if (!this.props.disabled) {
      return this.props.onSubmit(value);
    }
  },
  handleCancel: function(e) {
    e.preventDefault();
    return this.props.onCancel();
  }
});

module.exports = CommentForm;


},{}],104:[function(require,module,exports){
var CommentCreateForm, CommentForm, ComponentMixin, PropTypes;

CommentForm = require('../commentForm');

ComponentMixin = require('../../../../mixins/component');

PropTypes = React.PropTypes;

CommentCreateForm = React.createClass({
  displayName: 'CommentCreateForm',
  propTypes: {
    entryId: PropTypes.number.isRequired,
    formFocus: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    onCommentCreate: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement(CommentForm, {
      "ref": "commentForm",
      "formFocus": this.props.formFocus,
      "buttonTitle": i18n.t('buttons.comment_create'),
      "placeholder": i18n.t('placeholders.comment_create'),
      "disabled": this.props.loading,
      "onSubmit": this.createComment
    });
  },
  isValid: function(text) {
    return !!text.match(/./);
  },
  clearForm: function() {
    return this.refs.commentForm.clearForm();
  },
  createComment: function(text) {
    if (!this.isValid(text)) {
      return;
    }
    this.props.onCommentCreate(text);
    return this.clearForm();
  }
});

module.exports = CommentCreateForm;


},{"../../../../mixins/component":222,"../commentForm":103}],105:[function(require,module,exports){
var CommentEditForm, CommentForm, ComponentMixin, PropTypes;

CommentForm = require('../commentForm');

ComponentMixin = require('../../../../mixins/component');

PropTypes = React.PropTypes;

CommentEditForm = React.createClass({
  displayName: 'CommentEditForm',
  propTypes: {
    entryId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    onEditFinish: PropTypes.func.isRequired,
    onEditCancel: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement(CommentForm, {
      "ref": "commentForm",
      "text": this.props.comment.comment_html,
      "buttonTitle": i18n.t('buttons.comment_edit'),
      "placeholder": i18n.t('placeholders.comment_edit'),
      "onSubmit": this.editComment,
      "onCancel": this.props.onEditCancel
    });
  },
  isValid: function(text) {
    return !!text.match(/./) && this.props.comment.comment_html !== text;
  },
  clearForm: function() {
    return this.refs.commentForm.clearForm();
  },
  editComment: function(text) {
    if (!this.isValid(text)) {
      return this.props.onEditCancel();
    }
    this.props.onEditFinish(text);
    return this.clearForm();
  }
});

module.exports = CommentEditForm;


},{"../../../../mixins/component":222,"../commentForm":103}],106:[function(require,module,exports){
var CommentList, CommentManager, PropTypes;

CommentManager = require('./commentList/commentManager');

PropTypes = React.PropTypes;

CommentList = React.createClass({
  displayName: 'CommentList',
  propTypes: {
    entry: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    onCommentEdit: PropTypes.func.isRequired,
    onCommentDelete: PropTypes.func.isRequired,
    onCommentReport: PropTypes.func.isRequired
  },
  render: function() {
    var commentList;
    commentList = this.props.comments.map((function(_this) {
      return function(comment) {
        return React.createElement(CommentManager, {
          "entry": _this.props.entry,
          "comment": comment,
          "onCommentEdit": _this.props.onCommentEdit,
          "onCommentDelete": _this.props.onCommentDelete,
          "onCommentReport": _this.props.onCommentReport,
          "key": comment.id
        });
      };
    })(this));
    return React.createElement("div", {
      "className": "comments__list"
    }, commentList);
  }
});

module.exports = CommentList;


},{"./commentList/commentManager":118}],107:[function(require,module,exports){
var Comment, CommentActions, CommentDate, CommentText, CommentUser, PropTypes;

CommentUser = require('./comment/user');

CommentText = require('./comment/text');

CommentDate = require('./comment/date');

CommentActions = require('./comment/actions');

PropTypes = React.PropTypes;

Comment = React.createClass({
  displayName: 'Comment',
  propTypes: {
    entry: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    onEditStart: PropTypes.func.isRequired,
    onCommentDelete: PropTypes.func.isRequired,
    onCommentReport: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "comment"
    }, React.createElement("div", {
      "className": "comment__content"
    }, React.createElement(CommentUser, {
      "user": this.props.comment.user
    }), React.createElement(CommentText, {
      "text": this.props.comment.comment_html
    }), React.createElement(CommentDate, {
      "date": this.props.comment.created_at,
      "commentId": this.props.comment.id,
      "entryUrl": this.props.entry.entry_url
    }), React.createElement(CommentActions, React.__spread({}, this.props))));
  }
});

module.exports = Comment;


},{"./comment/actions":108,"./comment/date":115,"./comment/text":116,"./comment/user":117}],108:[function(require,module,exports){
var CLOSE_STATE, ClickOutsideMixin, CommentActions, CommentActionsButton, CommentActionsDropdownMenu, OPEN_STATE, PropTypes, UserAvatar, classnames;

classnames = require('classnames');

ClickOutsideMixin = require('../../../../../mixins/clickOutside');

CommentActionsButton = require('./actions/buttons/button');

CommentActionsDropdownMenu = require('./actions/dropdownMenu');

UserAvatar = require('../../../../common/avatar/user');

PropTypes = React.PropTypes;

OPEN_STATE = 'open';

CLOSE_STATE = 'close';

CommentActions = React.createClass({
  displayName: 'CommentActions',
  mixins: [ClickOutsideMixin],
  propTypes: {
    entry: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    onEditStart: PropTypes.func.isRequired,
    onCommentDelete: PropTypes.func.isRequired,
    onCommentReport: PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      currentState: CLOSE_STATE
    };
  },
  render: function() {
    var actionsClasses;
    actionsClasses = classnames('comment__actions', {
      '__open': this.isOpenState()
    });
    return React.createElement("div", {
      "className": actionsClasses
    }, React.createElement(CommentActionsButton, {
      "onClick": this.toggleOpenState
    }), React.createElement(CommentActionsDropdownMenu, React.__spread({}, this.props, {
      "visible": this.isOpenState()
    })));
  },
  isOpenState: function() {
    return this.state.currentState === OPEN_STATE;
  },
  activateCloseState: function() {
    return this.setState({
      currentState: CLOSE_STATE
    });
  },
  activateOpenState: function() {
    return this.setState({
      currentState: OPEN_STATE
    });
  },
  toggleOpenState: function() {
    if (this.isOpenState()) {
      return this.activateCloseState();
    } else {
      return this.activateOpenState();
    }
  }
});

module.exports = CommentActions;


},{"../../../../../mixins/clickOutside":221,"../../../../common/avatar/user":76,"./actions/buttons/button":109,"./actions/dropdownMenu":110,"classnames":332}],109:[function(require,module,exports){
var CommentActionsButton, PropTypes;

PropTypes = React.PropTypes;

CommentActionsButton = React.createClass({
  displayName: 'CommentActionsButton',
  propTypes: {
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("button", {
      "className": "comment__actions-button",
      "onClick": this.props.onClick
    }, React.createElement("i", {
      "className": "icon icon--dots"
    }));
  }
});

module.exports = CommentActionsButton;


},{}],110:[function(require,module,exports){
var CommentActionsDropdownMenu, CommentActionsDropdownMenuDeleteItem, CommentActionsDropdownMenuEditItem, CommentActionsDropdownMenuLinkItem, CommentActionsDropdownMenuReportItem, DropdownMenuMixin, PropTypes, classnames;

classnames = require('classnames');

DropdownMenuMixin = require('../../../../../../mixins/dropdownMenu');

CommentActionsDropdownMenuLinkItem = require('./dropdownMenu/items/link');

CommentActionsDropdownMenuEditItem = require('./dropdownMenu/items/edit');

CommentActionsDropdownMenuDeleteItem = require('./dropdownMenu/items/delete');

CommentActionsDropdownMenuReportItem = require('./dropdownMenu/items/report');

PropTypes = React.PropTypes;

CommentActionsDropdownMenu = React.createClass({
  displayName: 'CommentActionsDropdownMenu',
  mixins: [DropdownMenuMixin],
  propTypes: {
    entry: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    onEditStart: PropTypes.func.isRequired,
    onCommentDelete: PropTypes.func.isRequired,
    onCommentReport: PropTypes.func.isRequired
  },
  render: function() {
    var popupClasses;
    popupClasses = classnames('comment__dropdown-popup', {
      '__top': this.state.top,
      '__right': this.state.right
    });
    return React.createElement("div", {
      "className": popupClasses
    }, this.renderPopupList());
  },
  renderPopupList: function() {
    var deleteItem, editItem, linkItem, reportItem;
    linkItem = React.createElement(CommentActionsDropdownMenuLinkItem, {
      "commentId": this.props.comment.id,
      "entryUrl": this.props.entry.entry_url,
      "key": "link"
    });
    if (this.props.comment.can_report) {
      reportItem = React.createElement(CommentActionsDropdownMenuReportItem, {
        "commentId": this.props.comment.id,
        "onCommentReport": this.props.onCommentReport,
        "key": "report"
      });
    }
    if (this.props.comment.can_edit) {
      editItem = React.createElement(CommentActionsDropdownMenuEditItem, {
        "onEditStart": this.props.onEditStart,
        "key": "edit"
      });
    }
    if (this.props.comment.can_delete) {
      deleteItem = React.createElement(CommentActionsDropdownMenuDeleteItem, {
        "commentId": this.props.comment.id,
        "onCommentDelete": this.props.onCommentDelete,
        "key": "delete"
      });
    }
    return React.createElement("ul", {
      "className": "comment__dropdown-popup-list"
    }, [editItem, linkItem, reportItem, deleteItem]);
  }
});

module.exports = CommentActionsDropdownMenu;


},{"../../../../../../mixins/dropdownMenu":223,"./dropdownMenu/items/delete":111,"./dropdownMenu/items/edit":112,"./dropdownMenu/items/link":113,"./dropdownMenu/items/report":114,"classnames":332}],111:[function(require,module,exports){
var CommentActionsDropdownMenuDeleteItem, PropTypes;

PropTypes = React.PropTypes;

CommentActionsDropdownMenuDeleteItem = React.createClass({
  displayName: 'CommentActionsDropdownMenuDeleteItem',
  propTypes: {
    commentId: PropTypes.number.isRequired,
    onCommentDelete: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("li", {
      "className": "comment__dropdown-popup-item",
      "onClick": this.handleClick
    }, React.createElement("a", {
      "className": "comment__dropdown-popup-link"
    }, React.createElement("i", {
      "className": "icon icon--basket"
    }), React.createElement("span", null, i18n.t('comment.delete_item'))));
  },
  "delete": function() {
    return this.props.onCommentDelete(this.props.commentId);
  },
  handleClick: function() {
    if (confirm(i18n.t('comment.delete_confirm'))) {
      return this["delete"]();
    }
  }
});

module.exports = CommentActionsDropdownMenuDeleteItem;


},{}],112:[function(require,module,exports){
var CommentActionsDropdownMenuEditItem, PropTypes;

PropTypes = React.PropTypes;

CommentActionsDropdownMenuEditItem = React.createClass({
  displayName: 'CommentActionsDropdownMenuEditItem',
  propTypes: {
    onEditStart: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("li", {
      "className": "comment__dropdown-popup-item",
      "onClick": this.props.onEditStart
    }, React.createElement("a", {
      "className": "comment__dropdown-popup-link"
    }, React.createElement("i", {
      "className": "icon icon--pencil"
    }), React.createElement("span", null, i18n.t('comment.edit_item'))));
  }
});

module.exports = CommentActionsDropdownMenuEditItem;


},{}],113:[function(require,module,exports){
var CommentActionsDropdownMenuLinkItem, PropTypes;

PropTypes = React.PropTypes;

CommentActionsDropdownMenuLinkItem = React.createClass({
  displayName: 'CommentActionsDropdownMenuLinkItem',
  propTypes: {
    entryUrl: PropTypes.string.isRequired,
    commentId: PropTypes.number.isRequired
  },
  render: function() {
    return React.createElement("li", {
      "className": "comment__dropdown-popup-item"
    }, React.createElement("a", {
      "className": "comment__dropdown-popup-link",
      "href": this.getCommentUrl()
    }, React.createElement("i", {
      "className": "icon icon--hyperlink"
    }), React.createElement("span", null, i18n.t('comment.link_item'))));
  },
  getCommentUrl: function() {
    return this.props.entryUrl + '#comment-' + this.props.commentId;
  }
});

module.exports = CommentActionsDropdownMenuLinkItem;


},{}],114:[function(require,module,exports){
var CommentActionsDropdownMenuReportItem, PropTypes;

PropTypes = React.PropTypes;

CommentActionsDropdownMenuReportItem = React.createClass({
  displayName: 'CommentActionsDropdownMenuReportItem',
  propTypes: {
    commentId: PropTypes.number.isRequired,
    onCommentReport: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("li", {
      "className": "comment__dropdown-popup-item",
      "onClick": this.handleClick
    }, React.createElement("a", {
      "className": "comment__dropdown-popup-link"
    }, React.createElement("i", {
      "className": "icon icon--exclamation-mark"
    }), React.createElement("span", null, i18n.t('comment.report_item'))));
  },
  report: function() {
    return this.props.onCommentReport(this.props.commentId);
  },
  handleClick: function() {
    if (confirm(i18n.t('comment.report_confirm'))) {
      return this.report();
    }
  }
});

module.exports = CommentActionsDropdownMenuReportItem;


},{}],115:[function(require,module,exports){
var CommentDate, PropTypes;

PropTypes = React.PropTypes;

CommentDate = React.createClass({
  displayName: 'CommentDate',
  propTypes: {
    date: PropTypes.string.isRequired,
    entryUrl: PropTypes.string.isRequired,
    commentId: PropTypes.number.isRequired
  },
  render: function() {
    return React.createElement("a", {
      "href": this.getCommentUrl(),
      "className": "comment__date"
    }, this.getFormattedDate());
  },
  getCommentUrl: function() {
    return this.props.entryUrl + '#comment-' + this.props.commentId;
  },
  getFormattedDate: function() {
    var createdAt, now;
    now = moment();
    createdAt = moment(this.props.date);
    switch (false) {
      case !(now.diff(createdAt, 'seconds') < 5):
        return createdAt.subtract(5, 's').fromNow();
      case !(now.diff(createdAt, 'minutes') < 180):
        return createdAt.fromNow();
      case !(now.diff(createdAt, 'days') < 1):
        return createdAt.calendar();
      default:
        if (now.year() !== createdAt.year()) {
          return createdAt.format('D MMMM YYYY');
        } else {
          return createdAt.format('D MMMM');
        }
    }
  }
});

module.exports = CommentDate;


},{}],116:[function(require,module,exports){
var CommentText, PropTypes;

PropTypes = React.PropTypes;

CommentText = React.createClass({
  displayName: 'CommentText',
  propTypes: {
    text: PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement("span", {
      "className": "comment__text",
      "dangerouslySetInnerHTML": {
        __html: this.props.text || ''
      }
    });
  }
});

module.exports = CommentText;


},{}],117:[function(require,module,exports){
var CommentUser, PropTypes, UserAvatar;

UserAvatar = require('../../../../common/avatar/user');

PropTypes = React.PropTypes;

CommentUser = React.createClass({
  displayName: 'CommentUser',
  propTypes: {
    user: PropTypes.object.isRequired
  },
  render: function() {
    return React.createElement("a", {
      "href": this.props.user.tlog_url,
      "className": "comment__user",
      "target": "_blank",
      "title": this.props.user.slug
    }, React.createElement("span", {
      "className": "comment__avatar"
    }, React.createElement(UserAvatar, {
      "user": this.props.user,
      "size": 42.
    })), React.createElement("span", {
      "className": "comment__username"
    }, this.props.user.slug));
  }
});

module.exports = CommentUser;


},{"../../../../common/avatar/user":76}],118:[function(require,module,exports){
var Comment, CommentEditForm, CommentManager, ComponentMixin, EDIT_STATE, PropTypes, SHOW_STATE;

Comment = require('./comment');

CommentEditForm = require('../commentForm/edit');

ComponentMixin = require('../../../../mixins/component');

PropTypes = React.PropTypes;

SHOW_STATE = 'show';

EDIT_STATE = 'edit';

CommentManager = React.createClass({
  displayName: 'CommentManager',
  mixins: [ComponentMixin],
  propTypes: {
    comment: PropTypes.object.isRequired,
    entry: PropTypes.object.isRequired,
    onCommentEdit: PropTypes.func.isRequired,
    onCommentDelete: PropTypes.func.isRequired,
    onCommentReport: PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      currentState: SHOW_STATE
    };
  },
  render: function() {
    switch (this.state.currentState) {
      case SHOW_STATE:
        return React.createElement(Comment, React.__spread({}, this.props, {
          "onEditStart": this.activateEditState
        }));
      case EDIT_STATE:
        return React.createElement(CommentEditForm, {
          "comment": this.props.comment,
          "entryId": this.props.entry.id,
          "onEditFinish": this.handleEditFinish,
          "onEditCancel": this.activateShowState
        });
      default:
        return typeof console.warn === "function" ? console.warn('Unknown currentState of CommentManager component', this.state.currentState) : void 0;
    }
  },
  activateEditState: function() {
    return this.safeUpdateState({
      currentState: EDIT_STATE
    });
  },
  activateShowState: function() {
    return this.safeUpdateState({
      currentState: SHOW_STATE
    });
  },
  handleEditFinish: function(text) {
    var commentId;
    commentId = this.props.comment.id;
    this.props.onCommentEdit(commentId, text);
    return this.activateShowState();
  }
});

module.exports = CommentManager;


},{"../../../../mixins/component":222,"../commentForm/edit":105,"./comment":107}],119:[function(require,module,exports){
var CommentCreateForm, CommentList, CommentsLoadMore, EntryComments, PropTypes;

CommentList = require('./commentList');

CommentCreateForm = require('./commentForm/create');

CommentsLoadMore = require('./commentsLoadMore');

PropTypes = React.PropTypes;

EntryComments = React.createClass({
  displayName: 'EntryComments',
  propTypes: {
    user: PropTypes.object,
    entry: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    commentsCount: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    loadPerTime: PropTypes.number,
    formFocus: PropTypes.bool.isRequired,
    formVisible: PropTypes.bool.isRequired,
    onCommentsLoadMore: PropTypes.func.isRequired,
    onCommentCreate: PropTypes.func.isRequired,
    onCommentEdit: PropTypes.func.isRequired,
    onCommentDelete: PropTypes.func.isRequired,
    onCommentReport: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "post__comments"
    }, React.createElement("div", {
      "className": "comments"
    }, this.renderLoadMore(), this.renderCommentList(), this.renderCommentForm()));
  },
  renderLoadMore: function() {
    if (this.props.commentsCount > this.props.comments.length) {
      return React.createElement(CommentsLoadMore, {
        "totalCount": this.props.commentsCount,
        "loadedCount": this.props.comments.length,
        "loading": this.props.loading,
        "loadPerTime": this.props.loadPerTime,
        "onCommentsLoadMore": this.props.onCommentsLoadMore
      });
    }
  },
  renderCommentList: function() {
    if (this.props.comments.length) {
      return React.createElement(CommentList, {
        "comments": this.props.comments,
        "entry": this.props.entry,
        "onCommentEdit": this.props.onCommentEdit,
        "onCommentDelete": this.props.onCommentDelete,
        "onCommentReport": this.props.onCommentReport
      });
    }
  },
  renderCommentForm: function() {
    if ((this.props.user != null) && this.props.formVisible) {
      return React.createElement(CommentCreateForm, {
        "formFocus": this.props.formFocus,
        "entryId": this.props.entry.id,
        "loading": this.props.loading,
        "onCommentCreate": this.props.onCommentCreate
      });
    }
  }
});

module.exports = EntryComments;


},{"./commentForm/create":104,"./commentList":106,"./commentsLoadMore":120}],120:[function(require,module,exports){
var CommentsLoadMore, CommentsLoadMoreButton, PropTypes, Spinner;

Spinner = require('../../../../../shared/react/components/common/Spinner');

CommentsLoadMoreButton = require('./buttons/loadMore');

PropTypes = React.PropTypes;

CommentsLoadMore = React.createClass({
  displayName: 'CommentsLoadMore',
  propTypes: {
    totalCount: PropTypes.number.isRequired,
    loadedCount: PropTypes.number,
    loadPerTime: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    onCommentsLoadMore: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "comments__more"
    }, this.renderContent());
  },
  renderContent: function() {
    if (this.props.loading) {
      return React.createElement("div", {
        "className": "comments__loader"
      }, React.createElement(Spinner, {
        "size": 14.
      }));
    } else {
      return React.createElement(CommentsLoadMoreButton, {
        "title": this.getTitle(),
        "onClick": this.props.onCommentsLoadMore
      });
    }
  },
  getTitle: function() {
    var possibleCount, remainingCount;
    remainingCount = this.props.totalCount - this.props.loadedCount;
    possibleCount = this.props.loadedCount + this.props.loadPerTime;
    if (possibleCount < this.props.totalCount) {
      return i18n.t('buttons.comments_load_more', {
        count: this.props.loadPerTime
      });
    } else {
      return i18n.t('buttons.comments_load_more_remaining', {
        count: remainingCount
      });
    }
  }
});

module.exports = CommentsLoadMore;


},{"../../../../../shared/react/components/common/Spinner":250,"./buttons/loadMore":102}],121:[function(require,module,exports){
var EntryContent, IMAGE_TYPE, ImageEntryContent, PropTypes, QUOTE_TYPE, QuoteEntryContent, TEXT_TYPE, TextEntryContent, UnknownEntryContent, VIDEO_TYPE, VideoEntryContent;

TextEntryContent = require('./text/text');

ImageEntryContent = require('./image/image');

VideoEntryContent = require('./video/video');

QuoteEntryContent = require('./quote/quote');

UnknownEntryContent = require('./unknown/unknown');

PropTypes = React.PropTypes;

TEXT_TYPE = 'text';

IMAGE_TYPE = 'image';

VIDEO_TYPE = 'video';

QUOTE_TYPE = 'quote';

EntryContent = React.createClass({
  displayName: 'EntryContent',
  propTypes: {
    entry: PropTypes.object.isRequired
  },
  render: function() {
    switch (this.props.entry.type) {
      case TEXT_TYPE:
        return React.createElement(TextEntryContent, {
          "title": this.props.entry.title,
          "text": this.props.entry.text
        });
      case IMAGE_TYPE:
        return React.createElement(ImageEntryContent, {
          "title": this.props.entry.title,
          "imageUrl": this.props.entry.image_url,
          "imageAttachments": this.props.entry.image_attachments
        });
      case VIDEO_TYPE:
        return React.createElement(VideoEntryContent, {
          "iframely": this.props.entry.iframely
        });
      case QUOTE_TYPE:
        return React.createElement(QuoteEntryContent, {
          "text": this.props.entry.text,
          "source": this.props.entry.source
        });
      default:
        return React.createElement(UnknownEntryContent, {
          "title": this.props.entry.title
        });
    }
  }
});

module.exports = EntryContent;


},{"./image/image":123,"./quote/quote":124,"./text/text":126,"./unknown/unknown":128,"./video/video":129}],122:[function(require,module,exports){
var CollageManager, ImageEntryAttachments, PropTypes;

CollageManager = require('../../../../../../shared/react/components/common/collage/collageManager');

PropTypes = React.PropTypes;

ImageEntryAttachments = React.createClass({
  displayName: 'ImageEntryAttachments',
  propTypes: {
    imageAttachments: PropTypes.array.isRequired
  },
  render: function() {
    return React.createElement(CollageManager, {
      "images": this.getImages()
    });
  },
  getImages: function() {
    return this.props.imageAttachments.map(function(imageAttachment) {
      var image, newImage;
      image = imageAttachment.image;
      newImage = {
        width: image.geometry.width,
        height: image.geometry.height,
        payload: {
          id: imageAttachment.id,
          url: image.url,
          path: image.path,
          title: image.title
        }
      };
      return newImage;
    });
  }
});

module.exports = ImageEntryAttachments;


},{"../../../../../../shared/react/components/common/collage/collageManager":252}],123:[function(require,module,exports){
var ImageEntryAttachments, ImageEntryContent, PropTypes;

ImageEntryAttachments = require('./attachments');

PropTypes = React.PropTypes;

ImageEntryContent = React.createClass({
  displayName: 'ImageEntryContent',
  propTypes: {
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    imageAttachments: PropTypes.array.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "post__content"
    }, this.renderEntryImage(), React.createElement("p", {
      "dangerouslySetInnerHTML": {
        __html: this.props.title || ''
      }
    }));
  },
  renderEntryImage: function() {
    var content;
    content = (function() {
      switch (false) {
        case !this.props.imageAttachments:
          return React.createElement(ImageEntryAttachments, {
            "imageAttachments": this.props.imageAttachments
          });
        case !this.props.imageUrl:
          return React.createElement("img", {
            "src": this.props.imageUrl
          });
        default:
          return i18n.t('entry.empty_image');
      }
    }).call(this);
    return React.createElement("div", {
      "className": "media-image"
    }, content);
  }
});

module.exports = ImageEntryContent;


},{"./attachments":122}],124:[function(require,module,exports){
var PropTypes, QuoteEntryContent;

PropTypes = React.PropTypes;

QuoteEntryContent = React.createClass({
  displayName: 'QuoteEntryContent',
  propTypes: {
    text: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "post__content"
    }, React.createElement("blockquote", {
      "className": "blockquote"
    }, React.createElement("span", {
      "className": "laquo"
    }, "«"), React.createElement("span", null, this.props.text), React.createElement("span", {
      "className": "raquo"
    }, "»"), this.renderCaption()));
  },
  renderCaption: function() {
    if (this.props.source) {
      return React.createElement("div", {
        "className": "blockquote__caption"
      }, this.props.source);
    }
  }
});

module.exports = QuoteEntryContent;


},{}],125:[function(require,module,exports){
var PropTypes, TextEntryHeader;

PropTypes = React.PropTypes;

TextEntryHeader = React.createClass({
  displayName: 'TextEntryHeader',
  propTypes: {
    title: PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "post__header"
    }, React.createElement("h1", {
      "className": "post__title"
    }, this.props.title));
  }
});

module.exports = TextEntryHeader;


},{}],126:[function(require,module,exports){
var PropTypes, TextEntryContent, TextEntryHeader;

TextEntryHeader = require('./header');

PropTypes = React.PropTypes;

TextEntryContent = React.createClass({
  displayName: 'TextEntryContent',
  propTypes: {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement("div", null, React.createElement(TextEntryHeader, {
      "title": this.props.title
    }), React.createElement("div", {
      "className": "post__content",
      "dangerouslySetInnerHTML": {
        __html: this.props.text || ''
      }
    }));
  }
});

module.exports = TextEntryContent;


},{"./header":125}],127:[function(require,module,exports){
var PropTypes, UnknownEntryHeader;

PropTypes = React.PropTypes;

UnknownEntryHeader = React.createClass({
  displayName: 'UnknownEntryHeader',
  propTypes: {
    title: PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "post__header"
    }, React.createElement("h1", {
      "className": "post__title"
    }, this.props.title));
  }
});

module.exports = UnknownEntryHeader;


},{}],128:[function(require,module,exports){
var PropTypes, UnknownEntryContent, UnknownEntryHeader;

UnknownEntryHeader = require('./header');

PropTypes = React.PropTypes;

UnknownEntryContent = React.createClass({
  displayName: 'UnknownEntryContent',
  propTypes: {
    title: PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement("div", null, React.createElement(UnknownEntryHeader, {
      "title": this.props.title
    }), React.createElement("div", {
      "className": "post__content"
    }, React.createElement("p", null, i18n.t('entry.unknown_type'))));
  }
});

module.exports = UnknownEntryContent;


},{"./header":127}],129:[function(require,module,exports){
var PropTypes, VideoEntryContent;

PropTypes = React.PropTypes;

VideoEntryContent = React.createClass({
  displayName: 'VideoEntryContent',
  propTypes: {
    iframely: PropTypes.object
  },
  render: function() {
    return React.createElement("div", {
      "className": "post__content"
    }, React.createElement("div", {
      "className": "media-video"
    }, this.renderEmbedHtml()));
  },
  renderEmbedHtml: function() {
    var ref;
    if ((ref = this.props.iframely) != null ? ref.html : void 0) {
      return React.createElement("div", {
        "className": "media-video__embed",
        "dangerouslySetInnerHTML": {
          __html: this.props.iframely.html || ''
        }
      });
    } else {
      return React.createElement("div", {
        "className": "media-video__embed"
      }, i18n.t('entry.empty_video'));
    }
  }
});

module.exports = VideoEntryContent;


},{}],130:[function(require,module,exports){
'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _reactLibObjectAssign = require('react/lib/Object.assign');

var _reactLibObjectAssign2 = _interopRequireDefault(_reactLibObjectAssign);

var _actionsViewEntry = require('../../../actions/view/entry');

var _actionsViewEntry2 = _interopRequireDefault(_actionsViewEntry);

var LOAD_MORE_COMMENTS_LIMIT = 30,
    TEXT_TYPE = 'text',
    IMAGE_TYPE = 'image',
    VIDEO_TYPE = 'video',
    QUOTE_TYPE = 'quote';

var EntryMixin = {
  getDefaultProps: function getDefaultProps() {
    return {
      loadPerTime: LOAD_MORE_COMMENTS_LIMIT
    };
  },

  getInitialState: function getInitialState() {
    var comments = [],
        commentsCount = 0;

    if (this.props.entry.comments_info != null) {
      comments = this.props.entry.comments_info.comments;
      commentsCount = this.props.entry.comments_info.total_count;
    }

    return {
      comments: comments, commentsCount: commentsCount,
      loading: false
    };
  },

  isLoadingState: function isLoadingState() {
    return this.state.loading === true;
  },

  activateLoadingState: function activateLoadingState() {
    this.setState({ loading: true });
  },

  deactivateLoadingState: function deactivateLoadingState() {
    this.setState({ loading: false });
  },

  loadMoreComments: function loadMoreComments() {
    var _this = this;

    var entryID = this.props.entry.id,
        toCommentID = this.state.comments[0].id,
        limit = this.props.loadPerTime;

    this.activateLoadingState();

    _actionsViewEntry2['default'].loadComments(entryID, toCommentID, limit).then(function (commentsInfo) {
      var comments = commentsInfo.comments;
      var commentsCount = commentsInfo.total_count;

      _this.safeUpdateState({
        commentsCount: commentsCount,
        comments: comments.concat(_this.state.comments)
      });
    }).always(this.deactivateLoadingState);
  },

  createComment: function createComment(text) {
    var _this2 = this;

    var entryID = this.props.entry.id;

    _actionsViewEntry2['default'].createComment(entryID, text).then(function (comment) {
      var newComments = [].concat(_toConsumableArray(_this2.state.comments));
      newComments.push(comment);

      _this2.safeUpdateState({
        comments: newComments,
        commentsCount: _this2.state.commentsCount + 1
      });
    }).always(this.deactivateLoadingState);
  },

  editComment: function editComment(commentID, text) {
    var _this3 = this;

    var entryID = this.props.entry.id;

    _actionsViewEntry2['default'].editComment(entryID, commentID, text).then(function (comment) {
      for (var i = 0, len = _this3.state.comments.length; i < len; i++) {
        if (_this3.state.comments[i].id === comment.id) {
          (0, _reactLibObjectAssign2['default'])(_this3.state.comments[i], comment);
          break;
        }
      }
      _this3.forceUpdate();
    });
  },

  deleteComment: function deleteComment(commentID) {
    var _this4 = this;

    var entryID = this.props.entry.id;

    _actionsViewEntry2['default'].deleteComment(entryID, commentID).then(function () {
      var newComments = [].concat(_toConsumableArray(_this4.state.comments));

      for (var i = 0, len = _this4.state.comments.length; i < len; i++) {
        if (_this4.state.comments[i].id === commentID) {
          newComments.splice(i, 1);
          break;
        }
      }

      _this4.safeUpdateState({
        comments: newComments,
        commentsCount: _this4.state.commentsCount - 1
      });
    });
  },

  reportComment: function reportComment(commentID) {
    _actionsViewEntry2['default'].reportComment(commentID);
  },

  getEntryClasses: function getEntryClasses() {
    var typeClass = undefined;
    // Small hack, depends on layout
    switch (this.props.entry.type) {
      case TEXT_TYPE:
        typeClass = 'text';break;
      case IMAGE_TYPE:
        typeClass = 'image';break;
      case VIDEO_TYPE:
        typeClass = 'video';break;
      case QUOTE_TYPE:
        typeClass = 'quote';break;
      default:
        typeClass = 'text';
    }

    return 'post post--' + typeClass;
  }
};

exports['default'] = EntryMixin;
module.exports = exports['default'];

},{"../../../actions/view/entry":10,"babel-runtime/helpers/interop-require-default":278,"babel-runtime/helpers/to-consumable-array":280,"react/lib/Object.assign":339}],131:[function(require,module,exports){
var FeedLoadMoreButton, PropTypes;

PropTypes = React.PropTypes;

FeedLoadMoreButton = React.createClass({
  displayName: 'FeedLoadMoreButton',
  propTypes: {
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("button", {
      "className": "load-more-button",
      "onClick": this.props.onClick
    }, i18n.t('buttons.feed_load_more'));
  }
});

module.exports = FeedLoadMoreButton;


},{}],132:[function(require,module,exports){
var FeedEmptyPageMessage, MESSAGE;

MESSAGE = 'В ленте нет записей';

FeedEmptyPageMessage = React.createClass({
  displayName: 'FeedEmptyPageMessage',
  render: function() {
    return React.createElement("div", {
      "className": "post"
    }, React.createElement("div", {
      "className": "post__content"
    }, React.createElement("div", {
      "className": "post__header"
    }, React.createElement("h1", {
      "className": "post__title"
    }, MESSAGE))));
  }
});

module.exports = FeedEmptyPageMessage;


},{}],133:[function(require,module,exports){
var EntryFeed, Feed, FeedEmptyPageMessage, FeedLoadMore, PropTypes;

FeedEmptyPageMessage = require('./emptyPageMessage');

FeedLoadMore = require('./loadMore');

EntryFeed = require('../entry/Feed');

PropTypes = React.PropTypes;

Feed = React.createClass({
  displayName: 'Feed',
  propTypes: {
    entries: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    everythingLoaded: PropTypes.bool.isRequired,
    onLoadMore: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "posts"
    }, this.renderEntryList(), this.renderLoadMore());
  },
  renderEntryList: function() {
    if (this.props.entries.length) {
      return this.props.entries.map(function(entry) {
        return React.createElement(EntryFeed, {
          "entry": entry,
          "key": entry.id
        });
      });
    } else {
      return React.createElement(FeedEmptyPageMessage, null);
    }
  },
  renderLoadMore: function() {
    if (this.props.entries.length && !this.props.everythingLoaded) {
      return React.createElement(FeedLoadMore, {
        "loading": this.props.loading,
        "onClick": this.props.onLoadMore
      });
    }
  }
});

module.exports = Feed;


},{"../entry/Feed":85,"./emptyPageMessage":132,"./loadMore":137}],134:[function(require,module,exports){
var ComponentMixin, ConnectStoreMixin, Feed, FeedBest, FeedMixin, FeedStore, FeedViewActions, PropTypes;

FeedStore = require('../../stores/feed');

ComponentMixin = require('../../mixins/component');

ConnectStoreMixin = require('../../../../shared/react/mixins/connectStore');

FeedMixin = require('./mixins/feed');

FeedViewActions = require('../../actions/view/feed');

Feed = require('./feed');

PropTypes = React.PropTypes;

FeedBest = React.createClass({
  displayName: 'FeedBest',
  mixins: [ConnectStoreMixin(FeedStore), FeedMixin, ComponentMixin],
  propTypes: {
    limit: PropTypes.number
  },
  render: function() {
    return React.createElement(Feed, {
      "entries": this.state.entries,
      "loading": this.isLoadingState(),
      "everythingLoaded": this.state.everythingLoaded,
      "onLoadMore": this.loadMoreEntries
    });
  },
  loadMoreEntries: function() {
    var limit, sinceEntryId;
    sinceEntryId = this.state.entries[this.state.entries.length - 1].id;
    limit = this.props.limit;
    this.activateLoadingState();
    return FeedViewActions.loadBestEntries(sinceEntryId, limit).then(this.activateShowState).fail(this.activateErrorState);
  }
});

module.exports = FeedBest;


},{"../../../../shared/react/mixins/connectStore":260,"../../actions/view/feed":11,"../../mixins/component":222,"../../stores/feed":238,"./feed":133,"./mixins/feed":138}],135:[function(require,module,exports){
var ComponentMixin, ConnectStoreMixin, Feed, FeedFriends, FeedMixin, FeedStore, FeedViewActions, PropTypes;

FeedStore = require('../../stores/feed');

ComponentMixin = require('../../mixins/component');

ConnectStoreMixin = require('../../../../shared/react/mixins/connectStore');

FeedMixin = require('./mixins/feed');

FeedViewActions = require('../../actions/view/feed');

Feed = require('./feed');

PropTypes = React.PropTypes;

FeedFriends = React.createClass({
  displayName: 'FeedFriends',
  mixins: [ConnectStoreMixin(FeedStore), FeedMixin, ComponentMixin],
  propTypes: {
    limit: PropTypes.number
  },
  render: function() {
    return React.createElement(Feed, {
      "entries": this.state.entries,
      "loading": this.isLoadingState(),
      "everythingLoaded": this.state.everythingLoaded,
      "onLoadMore": this.loadMoreEntries
    });
  },
  loadMoreEntries: function() {
    var limit, sinceEntryId;
    sinceEntryId = this.state.entries[this.state.entries.length - 1].id;
    limit = this.props.limit;
    this.activateLoadingState();
    return FeedViewActions.loadFriendsEntries(sinceEntryId, limit).then(this.activateShowState).fail(this.activateErrorState);
  }
});

module.exports = FeedFriends;


},{"../../../../shared/react/mixins/connectStore":260,"../../actions/view/feed":11,"../../mixins/component":222,"../../stores/feed":238,"./feed":133,"./mixins/feed":138}],136:[function(require,module,exports){
var ComponentMixin, ConnectStoreMixin, Feed, FeedLive, FeedMixin, FeedStore, FeedViewActions, PropTypes;

FeedStore = require('../../stores/feed');

ComponentMixin = require('../../mixins/component');

ConnectStoreMixin = require('../../../../shared/react/mixins/connectStore');

FeedMixin = require('./mixins/feed');

FeedViewActions = require('../../actions/view/feed');

Feed = require('./feed');

PropTypes = React.PropTypes;

FeedLive = React.createClass({
  displayName: 'FeedLive',
  mixins: [ConnectStoreMixin(FeedStore), FeedMixin, ComponentMixin],
  propTypes: {
    limit: PropTypes.number
  },
  render: function() {
    return React.createElement(Feed, {
      "entries": this.state.entries,
      "loading": this.isLoadingState(),
      "everythingLoaded": this.state.everythingLoaded,
      "onLoadMore": this.loadMoreEntries
    });
  },
  loadMoreEntries: function() {
    var limit, sinceEntryId;
    sinceEntryId = this.state.entries[this.state.entries.length - 1].id;
    limit = this.props.limit;
    this.activateLoadingState();
    return FeedViewActions.loadLiveEntries(sinceEntryId, limit).then(this.activateShowState).fail(this.activateErrorState);
  }
});

module.exports = FeedLive;


},{"../../../../shared/react/mixins/connectStore":260,"../../actions/view/feed":11,"../../mixins/component":222,"../../stores/feed":238,"./feed":133,"./mixins/feed":138}],137:[function(require,module,exports){
var FeedLoadMore, FeedLoadMoreButton, PropTypes, Spinner;

Spinner = require('../../../../shared/react/components/common/Spinner');

FeedLoadMoreButton = require('./buttons/loadMore');

PropTypes = React.PropTypes;

FeedLoadMore = React.createClass({
  displayName: 'FeedLoadMore',
  propTypes: {
    loading: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "feed__more"
    }, this.renderContent());
  },
  renderContent: function() {
    if (this.props.loading) {
      return React.createElement("div", {
        "className": "loader"
      }, React.createElement(Spinner, {
        "size": 30.
      }));
    } else {
      return React.createElement(FeedLoadMoreButton, {
        "onClick": this.props.onClick
      });
    }
  }
});

module.exports = FeedLoadMore;


},{"../../../../shared/react/components/common/Spinner":250,"./buttons/loadMore":131}],138:[function(require,module,exports){
var ERROR_STATE, FeedMixin, FeedStore, LOADING_STATE, LOAD_MORE_ENTRIES_LIMIT, SHOW_STATE;

FeedStore = require('../../../stores/feed');

LOAD_MORE_ENTRIES_LIMIT = 10;

SHOW_STATE = 'show';

LOADING_STATE = 'load';

ERROR_STATE = 'error';

FeedMixin = {
  getDefaultProps: function() {
    return {
      limit: LOAD_MORE_ENTRIES_LIMIT
    };
  },
  getInitialState: function() {
    return {
      currentState: SHOW_STATE
    };
  },
  isLoadingState: function() {
    return this.state.currentState === LOADING_STATE;
  },
  activateShowState: function() {
    return this.safeUpdateState({
      currentState: SHOW_STATE
    });
  },
  activateLoadingState: function() {
    return this.safeUpdateState({
      currentState: LOADING_STATE
    });
  },
  activateErrorState: function() {
    return this.safeUpdateState({
      currentState: ERROR_STATE
    });
  },
  getStateFromStore: function() {
    return {
      entries: FeedStore.getEntries(),
      everythingLoaded: FeedStore.isEverythingLoaded()
    };
  }
};

module.exports = FeedMixin;


},{"../../../stores/feed":238}],139:[function(require,module,exports){
var HeroFeed, PropTypes;

PropTypes = React.PropTypes;

HeroFeed = React.createClass({
  displayName: 'HeroFeed',
  propTypes: {
    title: PropTypes.string.isRequired,
    backgroundUrl: PropTypes.string.isRequired,
    entriesCount: PropTypes.number
  },
  render: function() {
    return React.createElement("div", {
      "style": this.getHeroStyles(),
      "className": "hero hero--static"
    }, React.createElement("div", {
      "className": "hero__overlay"
    }), React.createElement("div", {
      "className": "hero__content"
    }, React.createElement("div", {
      "className": "hero__head"
    }, React.createElement("div", {
      "className": "hero__title"
    }, React.createElement("span", null, this.props.title)), this.props.entriesCount !== null && React.createElement("div", {
      "className": "hero__smalltext"
    }, React.createElement("span", null, i18n.t('hero.feed_entries_count', {
      count: this.props.entriesCount
    }))), this.props.children)));
  },
  getHeroStyles: function() {
    return {
      backgroundImage: "url('" + this.props.backgroundUrl + "')"
    };
  }
});

module.exports = HeroFeed;


},{}],140:[function(require,module,exports){
var HeroFeed, HeroFeedBest, PropTypes;

HeroFeed = require('./feed');

PropTypes = React.PropTypes;

HeroFeedBest = React.createClass({
  displayName: 'HeroFeedBest',
  propTypes: {
    backgroundUrl: PropTypes.string.isRequired,
    entriesCount: PropTypes.number.isRequired
  },
  render: function() {
    return React.createElement(HeroFeed, React.__spread({}, this.props, {
      "entriesCount": null,
      "title": i18n.t('feed.best')
    }));
  }
});

module.exports = HeroFeedBest;


},{"./feed":139}],141:[function(require,module,exports){
var HeroFeed, HeroFeedFriends, PropTypes;

HeroFeed = require('./feed');

PropTypes = React.PropTypes;

HeroFeedFriends = React.createClass({
  displayName: 'HeroFeedFriends',
  propTypes: {
    backgroundUrl: PropTypes.string.isRequired,
    entriesCount: PropTypes.number.isRequired
  },
  render: function() {
    return React.createElement(HeroFeed, React.__spread({}, this.props, {
      "title": i18n.t('feed.friends')
    }));
  }
});

module.exports = HeroFeedFriends;


},{"./feed":139}],142:[function(require,module,exports){
var HeroFeed, HeroFeedLive, PropTypes;

HeroFeed = require('./feed');

PropTypes = React.PropTypes;

HeroFeedLive = React.createClass({
  displayName: 'HeroFeedLive',
  propTypes: {
    backgroundUrl: PropTypes.string.isRequired,
    currentUser: PropTypes.object,
    entriesCount: PropTypes.number.isRequired
  },
  renderWriteButton: function() {
    var redirect;
    redirect = (function(_this) {
      return function() {
        return window.location.href = Routes.new_entry_url(_this.props.currentUser.slug);
      };
    })(this);
    return React.createElement("button", {
      "className": "button button--extra-small button--green",
      "onClick": redirect
    }, i18n.t('buttons.hero_live_create_entry'));
  },
  render: function() {
    return React.createElement(HeroFeed, React.__spread({}, this.props, {
      "title": i18n.t('feed.live')
    }), React.createElement("div", {
      "className": "hero__actions hero__actions--visible"
    }, this.props.currentUser && this.renderWriteButton()));
  }
});

module.exports = HeroFeedLive;


},{"./feed":139}],143:[function(require,module,exports){
var BrowserHelpers, CLOSE_STATE, ConnectStoreMixin, CurrentUserStore, HeroTlog, HeroTlogActions, HeroTlogAvatar, HeroTlogCloseButton, HeroTlogHead, HeroTlogStats, OPEN_STATE, PropTypes, _initialHeroHeight, _openHeroHeight, _screenOrientation;

CurrentUserStore = require('../../stores/currentUser');

ConnectStoreMixin = require('../../../../shared/react/mixins/connectStore');

BrowserHelpers = require('../../../../shared/helpers/browser');

HeroTlogAvatar = require('./tlog/avatar');

HeroTlogHead = require('./tlog/head');

HeroTlogActions = require('./tlog/actions');

HeroTlogStats = require('./tlog/stats');

HeroTlogCloseButton = require('./tlog/buttons/close');

PropTypes = React.PropTypes;

CLOSE_STATE = 'close';

OPEN_STATE = 'open';

_screenOrientation = null;

_initialHeroHeight = null;

_openHeroHeight = null;

HeroTlog = React.createClass({
  displayName: 'HeroTlog',
  mixins: [ConnectStoreMixin(CurrentUserStore)],
  propTypes: {
    tlog: PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      currentState: CLOSE_STATE
    };
  },
  componentDidMount: function() {
    _initialHeroHeight = this.getDOMNode().offsetHeight;
    return window.addEventListener('resize', this.onResize);
  },
  componentWillUnmount: function() {
    return window.removeEventListener('resize', this.onResize);
  },
  render: function() {
    return React.createElement("div", {
      "style": this.getHeroStyles(),
      "className": "hero"
    }, React.createElement(HeroTlogCloseButton, {
      "onClick": this.close
    }), React.createElement("div", {
      "className": "hero__overlay"
    }), React.createElement("div", {
      "className": "hero__gradient"
    }), React.createElement("div", {
      "className": "hero__content"
    }, React.createElement(HeroTlogAvatar, {
      "user": this.state.user,
      "author": this.props.tlog.author,
      "status": this.props.tlog.my_relationship,
      "onClick": this.handleAvatarClick
    }), React.createElement(HeroTlogHead, {
      "author": this.props.tlog.author
    }), React.createElement(HeroTlogActions, {
      "user": this.state.user,
      "author": this.props.tlog.author,
      "status": this.props.tlog.my_relationship
    })), React.createElement(HeroTlogStats, {
      "author": this.props.tlog.author,
      "stats": this.props.tlog.stats
    }));
  },
  isOpenState: function() {
    return this.state.currentState === OPEN_STATE;
  },
  activateOpenState: function() {
    return this.setState({
      currentState: OPEN_STATE
    });
  },
  activateCloseState: function() {
    return this.setState({
      currentState: CLOSE_STATE
    });
  },
  open: function() {
    var html;
    html = document.querySelector('html');
    html.classList.add('hero-enabled');
    _openHeroHeight = window.innerHeight;
    document.body.style.height = _openHeroHeight + 'px';
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return this.activateOpenState();
  },
  close: function() {
    var html;
    html = document.querySelector('html');
    html.classList.remove('hero-enabled');
    _screenOrientation = null;
    document.body.style.height = '';
    return this.activateCloseState();
  },
  getHeroStyles: function() {
    var backgroundUrl, height, ref;
    backgroundUrl = (ref = this.props.tlog.design) != null ? ref.background_url : void 0;
    height = this.isOpenState() ? _openHeroHeight : _initialHeroHeight;
    return {
      backgroundImage: "url('" + backgroundUrl + "')",
      height: height
    };
  },
  handleAvatarClick: function() {
    if (!this.isOpenState()) {
      return this.open();
    }
  },
  onResize: function() {
    var currentOrientation, html;
    html = document.querySelector('html');
    currentOrientation = BrowserHelpers.getCurrentOrientation();
    if (this.isOpenState() && _screenOrientation !== currentOrientation) {
      _screenOrientation = currentOrientation;
      _openHeroHeight = window.innerHeight;
      document.body.style.height = _openHeroHeight + 'px';
      return this.forceUpdate();
    }
  },
  getStateFromStore: function() {
    return {
      user: CurrentUserStore.getUser()
    };
  }
});

module.exports = HeroTlog;


},{"../../../../shared/helpers/browser":245,"../../../../shared/react/mixins/connectStore":260,"../../stores/currentUser":237,"./tlog/actions":144,"./tlog/avatar":154,"./tlog/buttons/close":155,"./tlog/head":156,"./tlog/stats":157}],144:[function(require,module,exports){
var HeroTlogActions, HeroTlogActions_CurrentUser, HeroTlogActions_User, PropTypes;

HeroTlogActions_User = require('./actions/user');

HeroTlogActions_CurrentUser = require('./actions/currentUser');

PropTypes = React.PropTypes;

HeroTlogActions = React.createClass({
  displayName: 'HeroTlogActions',
  propTypes: {
    user: PropTypes.object,
    author: PropTypes.object.isRequired,
    status: PropTypes.string
  },
  render: function() {
    if (!this.isLogged()) {
      return null;
    }
    if (this.isCurrentUser()) {
      return React.createElement(HeroTlogActions_CurrentUser, {
        "user": this.props.user
      });
    } else {
      return React.createElement(HeroTlogActions_User, {
        "user": this.props.author,
        "status": this.props.status
      });
    }
  },
  isLogged: function() {
    return this.props.user != null;
  },
  isCurrentUser: function() {
    var ref;
    return ((ref = this.props.user) != null ? ref.id : void 0) === this.props.author.id;
  }
});

module.exports = HeroTlogActions;


},{"./actions/currentUser":147,"./actions/user":153}],145:[function(require,module,exports){
var HeroTlogActions_SettingsButton, PropTypes;

PropTypes = React.PropTypes;

HeroTlogActions_SettingsButton = React.createClass({
  displayName: 'HeroTlogActions_SettingsButton',
  propTypes: {
    slug: PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement("button", {
      "className": "profile-settings-button",
      "onClick": this.handleClick
    }, React.createElement("i", {
      "className": "icon icon--cogwheel"
    }));
  },
  handleClick: function() {
    return window.location = Routes.userSettings(this.props.slug);
  }
});

module.exports = HeroTlogActions_SettingsButton;


},{}],146:[function(require,module,exports){
var HeroTlogActions_WriteMessageButton;

HeroTlogActions_WriteMessageButton = React.createClass({
  displayName: 'HeroTlogActions_WriteMessageButton',
  render: function() {
    return React.createElement("button", {
      "className": "write-message-button",
      "onClick": this.handleClick
    }, React.createElement("i", {
      "className": "icon icon--letter"
    }));
  },
  handleClick: function() {
    return alert('Ещё не работает');
  }
});

module.exports = HeroTlogActions_WriteMessageButton;


},{}],147:[function(require,module,exports){
var HeroTlogActions_CurrentUser, HeroTlogActions_SettingsButton, PropTypes;

HeroTlogActions_SettingsButton = require('./buttons/settings');

PropTypes = React.PropTypes;

HeroTlogActions_CurrentUser = React.createClass({
  displayName: 'HeroTlogActions_CurrentUser',
  propTypes: {
    user: PropTypes.object.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "hero__actions"
    }, React.createElement("button", {
      "className": "follow-button"
    }, i18n.t('buttons.hero_current_user')), React.createElement(HeroTlogActions_SettingsButton, {
      "slug": this.props.user.slug
    }));
  }
});

module.exports = HeroTlogActions_CurrentUser;


},{"./buttons/settings":145}],148:[function(require,module,exports){
var CLOSE_STATE, ClickOutsideMixin, HeroTlogActions_DropdownMenu, HeroTlogActions_DropdownMenu_Button, HeroTlogActions_DropdownMenu_Popup, OPEN_STATE, PropTypes, classnames;

classnames = require('classnames');

ClickOutsideMixin = require('../../../../mixins/clickOutside');

HeroTlogActions_DropdownMenu_Button = require('./dropdownMenu/buttons/button');

HeroTlogActions_DropdownMenu_Popup = require('./dropdownMenu/popup');

PropTypes = React.PropTypes;

CLOSE_STATE = 'close';

OPEN_STATE = 'open';

HeroTlogActions_DropdownMenu = React.createClass({
  displayName: 'HeroTlogActions_DropdownMenu',
  mixins: [ClickOutsideMixin],
  propTypes: {
    userId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      currentState: CLOSE_STATE
    };
  },
  render: function() {
    var menuClasses;
    menuClasses = classnames('hero__user-actions', {
      '__open': this.isOpenState()
    });
    return React.createElement("div", {
      "className": menuClasses
    }, React.createElement(HeroTlogActions_DropdownMenu_Button, {
      "onClick": this.toggleOpenState
    }), React.createElement(HeroTlogActions_DropdownMenu_Popup, {
      "arrangement": "top",
      "visible": this.isOpenState(),
      "userId": this.props.userId,
      "status": this.props.status,
      "onClose": this.activateCloseState
    }));
  },
  isOpenState: function() {
    return this.state.currentState === OPEN_STATE;
  },
  activateCloseState: function() {
    return this.setState({
      currentState: CLOSE_STATE
    });
  },
  activateOpenState: function() {
    return this.setState({
      currentState: OPEN_STATE
    });
  },
  toggleOpenState: function() {
    if (this.isOpenState()) {
      return this.activateCloseState();
    } else {
      return this.activateOpenState();
    }
  }
});

module.exports = HeroTlogActions_DropdownMenu;


},{"../../../../mixins/clickOutside":221,"./dropdownMenu/buttons/button":149,"./dropdownMenu/popup":152,"classnames":332}],149:[function(require,module,exports){
var HeroTlogActions_DropdownMenu_Button, PropTypes;

PropTypes = React.PropTypes;

HeroTlogActions_DropdownMenu_Button = React.createClass({
  displayName: 'HeroTlogActions_DropdownMenu_Button',
  propTypes: {
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("button", {
      "className": "action-menu-button",
      "onClick": this.props.onClick
    }, React.createElement("i", {
      "className": "icon icon--dots"
    }));
  }
});

module.exports = HeroTlogActions_DropdownMenu_Button;


},{}],150:[function(require,module,exports){
var HeroTlogActions_DropdownMenuIgnoreItem, PropTypes, RelationshipViewActions;

RelationshipViewActions = require('../../../../../../actions/view/relationship');

PropTypes = React.PropTypes;

HeroTlogActions_DropdownMenuIgnoreItem = React.createClass({
  displayName: 'HeroTlogActions_DropdownMenuIgnoreItem',
  propTypes: {
    userId: PropTypes.number.isRequired,
    onIgnore: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("li", {
      "className": "hero__dropdown-popup-item",
      "onClick": this.ignore
    }, React.createElement("a", {
      "className": "hero__dropdown-popup-link"
    }, React.createElement("i", {
      "className": "icon icon--not-allowed"
    }), React.createElement("span", null, i18n.t('hero.ignore_tlog_item'))));
  },
  ignore: function() {
    return RelationshipViewActions.ignore(this.props.userId).then(this.props.onIgnore);
  }
});

module.exports = HeroTlogActions_DropdownMenuIgnoreItem;


},{"../../../../../../actions/view/relationship":14}],151:[function(require,module,exports){
var HeroTlogActions_DropdownMenuReportItem, PropTypes, RelationshipViewActions;

RelationshipViewActions = require('../../../../../../actions/view/relationship');

PropTypes = React.PropTypes;

HeroTlogActions_DropdownMenuReportItem = React.createClass({
  displayName: 'HeroTlogActions_DropdownMenuReportItem',
  propTypes: {
    userId: PropTypes.number.isRequired,
    onReport: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("li", {
      "className": "hero__dropdown-popup-item",
      "onClick": this.report
    }, React.createElement("a", {
      "className": "hero__dropdown-popup-link"
    }, React.createElement("i", {
      "className": "icon icon--exclamation-mark"
    }), React.createElement("span", null, i18n.t('hero.report_tlog_item'))));
  },
  report: function() {
    return RelationshipViewActions.report(this.props.userId).always(this.props.onReport);
  }
});

module.exports = HeroTlogActions_DropdownMenuReportItem;


},{"../../../../../../actions/view/relationship":14}],152:[function(require,module,exports){
var ConnectStoreMixin, DropdownMenuMixin, HeroTlogActions_DropdownMenuIgnoreItem, HeroTlogActions_DropdownMenuReportItem, HeroTlogActions_DropdownMenu_Popup, IGNORED_STATUS, PropTypes, RelationshipsStore, classnames;

classnames = require('classnames');

RelationshipsStore = require('../../../../../stores/relationships');

ConnectStoreMixin = require('../../../../../../../shared/react/mixins/connectStore');

DropdownMenuMixin = require('../../../../../mixins/dropdownMenu');

HeroTlogActions_DropdownMenuIgnoreItem = require('./items/ignore');

HeroTlogActions_DropdownMenuReportItem = require('./items/report');

PropTypes = React.PropTypes;

IGNORED_STATUS = 'ignored';

HeroTlogActions_DropdownMenu_Popup = React.createClass({
  displayName: 'HeroTlogActions_DropdownMenu_Popup',
  mixins: [ConnectStoreMixin(RelationshipsStore), DropdownMenuMixin],
  propTypes: {
    arrangement: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
  },
  getDefaultProps: function() {
    return {
      arrangement: 'bottom'
    };
  },
  render: function() {
    var popupClasses;
    popupClasses = classnames('hero__dropdown-popup __' + this.props.arrangement, {
      '__top': this.state.top,
      '__right': this.state.right
    });
    return React.createElement("div", {
      "className": popupClasses
    }, this._renderPopupList());
  },
  _renderPopupList: function() {
    var ignoreItem;
    if (this.state.status !== IGNORED_STATUS) {
      ignoreItem = React.createElement(HeroTlogActions_DropdownMenuIgnoreItem, {
        "userId": this.props.userId,
        "onIgnore": this.props.onClose
      });
    }
    return React.createElement("ul", {
      "className": "hero__dropdown-popup-list"
    }, ignoreItem, React.createElement(HeroTlogActions_DropdownMenuReportItem, {
      "userId": this.props.userId,
      "onReport": this.props.onClose
    }));
  },
  getStateFromStore: function() {
    return {
      status: RelationshipsStore.getStatus(this.props.userId) || this.props.status
    };
  }
});

module.exports = HeroTlogActions_DropdownMenu_Popup;


},{"../../../../../../../shared/react/mixins/connectStore":260,"../../../../../mixins/dropdownMenu":223,"../../../../../stores/relationships":242,"./items/ignore":150,"./items/report":151,"classnames":332}],153:[function(require,module,exports){
var FollowButton, HeroTlogActions_DropdownMenu, HeroTlogActions_User, HeroTlogActions_WriteMessageButton, PropTypes;

FollowButton = require('../../../buttons/relationship/follow');

HeroTlogActions_WriteMessageButton = require('./buttons/writeMessage');

HeroTlogActions_DropdownMenu = require('./dropdownMenu');

PropTypes = React.PropTypes;

HeroTlogActions_User = React.createClass({
  displayName: 'HeroTlogActions_User',
  propTypes: {
    user: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "hero__actions"
    }, React.createElement(FollowButton, {
      "user": this.props.user,
      "status": this.props.status
    }), React.createElement(HeroTlogActions_WriteMessageButton, {
      "user": this.props.user
    }), React.createElement(HeroTlogActions_DropdownMenu, {
      "userId": this.props.user.id,
      "status": this.props.status
    }));
  }
});

module.exports = HeroTlogActions_User;


},{"../../../buttons/relationship/follow":73,"./buttons/writeMessage":146,"./dropdownMenu":148}],154:[function(require,module,exports){
var FollowStatus, HERO_AVATAR_SIZE, HeroTlogAvatar, PropTypes, UserAvatar;

UserAvatar = require('../../common/avatar/user');

FollowStatus = require('../../common/followStatus/followStatus');

PropTypes = React.PropTypes;

HERO_AVATAR_SIZE = 220;

HeroTlogAvatar = React.createClass({
  displayName: 'HeroTlogAvatar',
  propTypes: {
    user: PropTypes.object,
    author: PropTypes.object.isRequired,
    status: PropTypes.string,
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "hero__avatar",
      "onClick": this.props.onClick
    }, this.renderFollowStatus(), React.createElement(UserAvatar, {
      "user": this.props.author,
      "size": HERO_AVATAR_SIZE
    }));
  },
  renderFollowStatus: function() {
    if (!(this.isCurrentUser() || !this.isLogged())) {
      return React.createElement(FollowStatus, {
        "userId": this.props.author.id,
        "status": this.props.status
      });
    }
  },
  isLogged: function() {
    return this.props.user != null;
  },
  isCurrentUser: function() {
    var ref;
    return ((ref = this.props.user) != null ? ref.id : void 0) === this.props.author.id;
  }
});

module.exports = HeroTlogAvatar;


},{"../../common/avatar/user":76,"../../common/followStatus/followStatus":77}],155:[function(require,module,exports){
var HeroTlogCloseButton, PropTypes;

PropTypes = React.PropTypes;

HeroTlogCloseButton = React.createClass({
  displayName: 'HeroTlogCloseButton',
  propTypes: {
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "hero__close",
      "onClick": this.props.onClick
    }, React.createElement("i", {
      "className": "icon icon--cross"
    }));
  }
});

module.exports = HeroTlogCloseButton;


},{}],156:[function(require,module,exports){
var HeroTlogHead, PropTypes;

PropTypes = React.PropTypes;

HeroTlogHead = React.createClass({
  displayName: 'HeroTlogHead',
  propTypes: {
    author: PropTypes.object.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "hero__head"
    }, React.createElement("div", {
      "className": "hero__title"
    }, React.createElement("span", null, React.createElement("a", {
      "href": this.props.author.tlog_url
    }, this.props.author.slug))), React.createElement("div", {
      "className": "hero__text"
    }, React.createElement("span", {
      "dangerouslySetInnerHTML": {
        __html: this.props.author.title || ''
      }
    })));
  }
});

module.exports = HeroTlogHead;


},{}],157:[function(require,module,exports){
var HeroTlogStats, HeroTlogStatsItem, PropTypes;

HeroTlogStatsItem = require('./stats/item');

PropTypes = React.PropTypes;

HeroTlogStats = React.createClass({
  displayName: 'HeroTlogStats',
  propTypes: {
    stats: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "hero__stats"
    }, this.renderStatsList());
  },
  renderStatsList: function() {
    var days, entries, followers, followings, url;
    if (this.props.stats.entries_count != null) {
      if (!this.isTlogPrivate()) {
        url = this.props.author.tlog_url;
      }
      entries = React.createElement(HeroTlogStatsItem, {
        "href": url,
        "count": this.props.stats.entries_count,
        "title": this.getTitle('entries'),
        "key": "entries"
      });
    }
    if (this.props.stats.followings_count != null) {
      followings = React.createElement(HeroTlogStatsItem, {
        "count": this.props.stats.followings_count,
        "title": this.getTitle('followings'),
        "key": "followings"
      });
    }
    if (this.props.stats.followers_count != null) {
      followers = React.createElement(HeroTlogStatsItem, {
        "count": this.props.stats.followers_count,
        "title": this.getTitle('followers'),
        "key": "followers"
      });
    }
    if (this.props.stats.days_count != null) {
      days = React.createElement(HeroTlogStatsItem, {
        "count": this.props.stats.days_count,
        "title": this.getTitle('days'),
        "key": "days"
      });
    }
    return React.createElement("div", {
      "className": "hero__stats-list"
    }, [entries, followings, followers, days]);
  },
  isTlogPrivate: function() {
    return this.props.author.is_privacy;
  },
  getTitle: function(type) {
    switch (type) {
      case 'entries':
        return i18n.t('hero.stats_entries_count', {
          count: this.props.stats.entries_count
        });
      case 'followings':
        return i18n.t('hero.stats_followings_count', {
          count: this.props.stats.followings_count
        });
      case 'followers':
        return i18n.t('hero.stats_followers_count', {
          count: this.props.stats.followers_count
        });
      case 'days':
        return i18n.t('hero.stats_days_count', {
          count: this.props.stats.days_count
        });
      default:
        return console.warn('Unknown type of stats of HeroTlogStats component', type);
    }
  }
});

module.exports = HeroTlogStats;


},{"./stats/item":158}],158:[function(require,module,exports){
var HeroTlogStatsItem, NumberHelpers, PropTypes, classnames;

classnames = require('classnames');

NumberHelpers = require('../../../../../../shared/helpers/number');

PropTypes = React.PropTypes;

HeroTlogStatsItem = React.createClass({
  displayName: 'HeroTlogStatsItem',
  propTypes: {
    count: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
    onClick: PropTypes.func
  },
  render: function() {
    var itemClasses;
    itemClasses = classnames('hero__stats-item', {
      'hero__stats-item-handler': this.props.onClick
    });
    return React.createElement("div", {
      "className": itemClasses,
      "onClick": this.handleClick
    }, this.renderItem());
  },
  renderItem: function() {
    var count;
    count = NumberHelpers.reduceNumber(this.props.count);
    if (this.props.href) {
      return React.createElement("a", {
        "href": this.props.href,
        "title": this.props.count + ' ' + this.props.title,
        "className": "hero__stats-link"
      }, React.createElement("strong", {
        "className": "hero__stats-value"
      }, count), React.createElement("span", null, this.props.title));
    } else {
      return React.createElement("span", null, React.createElement("strong", {
        "className": "hero__stats-value"
      }, count), React.createElement("span", null, this.props.title));
    }
  },
  handleClick: function(e) {
    if (this.props.onClick) {
      e.preventDefault();
      return this.props.onClick();
    }
  }
});

module.exports = HeroTlogStatsItem;


},{"../../../../../../shared/helpers/number":246,"classnames":332}],159:[function(require,module,exports){
var CreateConversationButton, PropTypes;

PropTypes = React.PropTypes;

CreateConversationButton = React.createClass({
  displayName: 'CreateConversationButton',
  propTypes: {
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("button", {
      "className": "messages__button",
      "onClick": this.handleClick
    }, i18n.t('buttons.messenger_create_conversation'));
  },
  handleClick: function(e) {
    e.preventDefault();
    return this.props.onClick();
  }
});

module.exports = CreateConversationButton;


},{}],160:[function(require,module,exports){
var MessengerHeader, PropTypes;

PropTypes = React.PropTypes;

MessengerHeader = React.createClass({
  displayName: 'MessengerHeader',
  propTypes: {
    title: PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "messages__header"
    }, React.createElement("h3", {
      "className": "messages__title"
    }, this.props.title));
  }
});

module.exports = MessengerHeader;


},{}],161:[function(require,module,exports){
var ConnectStoreMixin, ConversationHeader, ConversationMessageForm, ConversationMessages, ConversationStore, MessengerConversation, PropTypes;

ConversationStore = require('../../stores/conversation');

ConnectStoreMixin = require('../../../../shared/react/mixins/connectStore');

ConversationHeader = require('./conversation/header');

ConversationMessages = require('./conversation/messages');

ConversationMessageForm = require('./conversation/messageForm');

PropTypes = React.PropTypes;

MessengerConversation = React.createClass({
  displayName: 'MessengerConversation',
  mixins: [ConnectStoreMixin(ConversationStore)],
  render: function() {
    var backgroundUrl, conversationStyles;
    backgroundUrl = this.state.conversation.recipient.design.background_url;
    conversationStyles = {
      backgroundImage: 'url("' + backgroundUrl + '")'
    };
    return React.createElement("div", {
      "className": "messages__section messages__section--thread"
    }, React.createElement(ConversationHeader, {
      "slug": this.state.conversation.recipient.slug
    }), React.createElement("div", {
      "className": "messages__body",
      "style": conversationStyles
    }, React.createElement("div", {
      "className": "messages__thread-overlay"
    }), React.createElement(ConversationMessages, null)), React.createElement("div", {
      "className": "messages__footer"
    }, React.createElement(ConversationMessageForm, {
      "convID": this.state.conversation.id,
      "canTalk": this.state.conversation.can_talk
    })));
  },
  getStateFromStore: function() {
    return {
      conversation: ConversationStore.getCurrent()
    };
  }
});

module.exports = MessengerConversation;


},{"../../../../shared/react/mixins/connectStore":260,"../../stores/conversation":236,"./conversation/header":162,"./conversation/messageForm":163,"./conversation/messages":165}],162:[function(require,module,exports){
var ConversationHeader, MessengerHeader, PropTypes;

MessengerHeader = require('../common/header');

PropTypes = React.PropTypes;

ConversationHeader = React.createClass({
  displayName: 'ConversationHeader',
  propTypes: {
    slug: PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement(MessengerHeader, {
      "title": i18n.t('messenger.conversation_header', {
        userSlug: this.props.slug
      })
    });
  }
});

module.exports = ConversationHeader;


},{"../common/header":160}],163:[function(require,module,exports){
var ConversationMessageForm, ConversationMessageFormField, MessengerViewActions, NotifyController, PropTypes;

NotifyController = require('../../../controllers/notify');

MessengerViewActions = require('../../../actions/view/messenger');

ConversationMessageFormField = require('./messageForm/field');

PropTypes = React.PropTypes;

ConversationMessageForm = React.createClass({
  displayName: 'ConversationMessageForm',
  propTypes: {
    convID: PropTypes.number.isRequired,
    canTalk: PropTypes.bool.isRequired
  },
  render: function() {
    return React.createElement("form", {
      "className": "message-form"
    }, React.createElement("button", {
      "className": "message-form__submit",
      "onClick": this.handleClick
    }, i18n.t('buttons.messenger_create_message')), React.createElement(ConversationMessageFormField, {
      "ref": "formField",
      "disabled": !this.props.canTalk,
      "onSubmit": this.createMessage
    }));
  },
  isValid: function() {
    var messageText;
    messageText = this.refs.formField.getValue();
    switch (false) {
      case !!this.props.canTalk:
        NotifyController.notifyError(i18n.t('messages.messenger_cant_talk_error'));
        return false;
      case messageText.length !== 0:
        NotifyController.notifyError(i18n.t('messages.messenger_empty_message_error'));
        return false;
      default:
        return true;
    }
  },
  clearForm: function() {
    return this.refs.formField.clear();
  },
  createMessage: function() {
    var messageText;
    if (this.isValid()) {
      messageText = this.refs.formField.getValue();
      MessengerViewActions.createMessage(this.props.convID, messageText);
      return this.clearForm();
    }
  },
  handleClick: function(e) {
    e.preventDefault();
    return this.createMessage();
  }
});

module.exports = ConversationMessageForm;


},{"../../../actions/view/messenger":12,"../../../controllers/notify":218,"./messageForm/field":164}],164:[function(require,module,exports){
var ConversationMessageFormField, PropTypes, _;

_ = require('lodash');

PropTypes = React.PropTypes;

ConversationMessageFormField = React.createClass({
  displayName: 'ConversationMessageFormField',
  propTypes: {
    disabled: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "message-form__field"
    }, React.createElement("textarea", {
      "ref": "textarea",
      "disabled": this.props.disabled,
      "placeholder": this.getPlaceholder(),
      "className": "message-form__field-textarea",
      "onKeyDown": this.handleKeyDown
    }));
  },
  isEmpty: function() {
    return this.getValue().length === 0;
  },
  clear: function() {
    return this.refs.textarea.getDOMNode().value = '';
  },
  getValue: function() {
    return _.trim(this.refs.textarea.getDOMNode().value);
  },
  getPlaceholder: function() {
    if (this.props.disabled) {
      return i18n.t('placeholders.messenger_cant_talk');
    } else {
      return i18n.t('placeholders.messenger_create_message');
    }
  },
  handleKeyDown: function(e) {
    var isSystemKey;
    isSystemKey = function(e) {
      return e.shiftKey || e.ctrlKey || e.altKey || e.metaKey;
    };
    if (e.key === 'Enter' && this.isEmpty()) {
      return e.preventDefault();
    } else if (e.key === 'Enter' && !isSystemKey(e)) {
      e.preventDefault();
      return this.props.onSubmit();
    }
  }
});

module.exports = ConversationMessageFormField;


},{"lodash":"lodash"}],165:[function(require,module,exports){
var ComponentMixin, ConnectStoreMixin, ConversationMessages, ConversationStore, ERROR_STATE, LOADED_STATE, LOADING_MORE_STATE, LOADING_STATE, MessageList, MessageStore, MessengerViewActions, Spinner;

MessageStore = require('../../../stores/message');

ConversationStore = require('../../../stores/conversation');

MessengerViewActions = require('../../../actions/view/messenger');

ConnectStoreMixin = require('../../../../../shared/react/mixins/connectStore');

ComponentMixin = require('../../../mixins/component');

Spinner = require('../../../../../shared/react/components/common/Spinner');

MessageList = require('./messages/list');

LOADED_STATE = 'loaded';

LOADING_STATE = 'loading';

LOADING_MORE_STATE = 'loadingMore';

ERROR_STATE = 'error';

ConversationMessages = React.createClass({
  displayName: 'ConversationMessages',
  mixins: [ConnectStoreMixin(MessageStore), ComponentMixin],
  getInitialState: function() {
    return {
      currentState: LOADING_STATE,
      allHistoryLoaded: false
    };
  },
  componentDidMount: function() {
    var currentConvID;
    currentConvID = ConversationStore.getCurrentID();
    return MessengerViewActions.loadMessages(currentConvID).then(this.activateLoadedState).fail(this.activateErrorState);
  },
  componentWillUpdate: function() {
    var currentConvID, unreadIDs;
    currentConvID = ConversationStore.getCurrentID();
    unreadIDs = MessageStore.getUnreadIDs(currentConvID);
    if (unreadIDs.length) {
      return MessengerViewActions.readMessages(currentConvID, unreadIDs);
    }
  },
  render: function() {
    var canLoad;
    if (this.isLoadedState() || this.hasMessages()) {
      canLoad = !this.isLoadingMoreState() && !this.state.allHistoryLoaded;
      return React.createElement(MessageList, {
        "items": this.state.messages,
        "canLoad": canLoad,
        "onLoadMore": this.loadMore
      });
    } else if (this.isLoadingState()) {
      return React.createElement("div", {
        "className": "messages__scroll"
      }, React.createElement("p", {
        "className": "messages__text messages__text--center"
      }, React.createElement(Spinner, {
        "size": 24.
      })));
    } else {
      return React.createElement("div", {
        "className": "messages__scroll"
      }, React.createElement("p", {
        "className": "messages__text messages__text--center"
      }, i18n.t('messenger.messages_loading_error')));
    }
  },
  isLoadedState: function() {
    return this.state.currentState === LOADED_STATE;
  },
  isLoadingState: function() {
    return this.state.currentState === LOADING_STATE;
  },
  isLoadingMoreState: function() {
    return this.state.currentState === LOADING_MORE_STATE;
  },
  hasMessages: function() {
    return !!this.state.messages.length;
  },
  activateLoadedState: function() {
    return this.safeUpdateState({
      currentState: LOADED_STATE
    });
  },
  activateLoadingMoreState: function() {
    return this.safeUpdateState({
      currentState: LOADING_MORE_STATE
    });
  },
  activateErrorState: function() {
    return this.safeUpdateState({
      currentState: ERROR_STATE
    });
  },
  loadMore: function() {
    this.activateLoadingMoreState();
    return MessengerViewActions.loadMoreMessages(ConversationStore.getCurrentID(), this.state.messages[0].id).then((function(_this) {
      return function(response) {
        if (response.messages.length === 0) {
          return _this.safeUpdateState({
            allHistoryLoaded: true,
            currentState: LOADED_STATE
          });
        } else {
          return _this.activateLoadedState();
        }
      };
    })(this));
  },
  getStateFromStore: function() {
    return {
      messages: MessageStore.getAllForCurrentThread()
    };
  }
});

module.exports = ConversationMessages;


},{"../../../../../shared/react/components/common/Spinner":250,"../../../../../shared/react/mixins/connectStore":260,"../../../actions/view/messenger":12,"../../../mixins/component":222,"../../../stores/conversation":236,"../../../stores/message":239,"./messages/list":166}],166:[function(require,module,exports){
var MessageList, MessageListEmpty, MessageListItemManager, PropTypes, _;

_ = require('lodash');

MessageListEmpty = require('./list/empty');

MessageListItemManager = require('./list/itemManager');

PropTypes = React.PropTypes;

MessageList = React.createClass({
  displayName: 'MessageList',
  propTypes: {
    items: PropTypes.array.isRequired,
    canLoad: PropTypes.bool.isRequired,
    onLoadMore: PropTypes.func.isRequired
  },
  componentDidMount: function() {
    if (!this.isEmpty()) {
      this.saveScrollPosition();
      return this.scrollToBottom();
    }
  },
  componentWillUpdate: function(nextProps) {
    var ref, ref1;
    if (((ref = this.props.items[0]) != null ? ref.uuid : void 0) !== ((ref1 = nextProps.items[0]) != null ? ref1.uuid : void 0)) {
      return this.saveScrollPosition();
    }
  },
  componentDidUpdate: function(prevProps) {
    var ref, ref1;
    if (((ref = prevProps.items[0]) != null ? ref.uuid : void 0) !== ((ref1 = this.props.items[0]) != null ? ref1.uuid : void 0)) {
      return this.restoreScrollPosition();
    } else if (prevProps.items.length !== this.props.items.length) {
      return this.scrollToBottom();
    }
  },
  render: function() {
    if (this.isEmpty()) {
      return React.createElement(MessageListEmpty, null);
    } else {
      return this.renderListItems();
    }
  },
  renderListItems: function() {
    var listItems;
    listItems = _.map(this.props.items, function(item) {
      return React.createElement(MessageListItemManager, {
        "item": item,
        "key": item.id + "-" + item.uuid
      });
    });
    return React.createElement("div", {
      "ref": "scroller",
      "className": "messages__scroll",
      "onScroll": this.handleScroll
    }, React.createElement("div", {
      "className": "messages__list"
    }, React.createElement("div", {
      "className": "messages__list-cell"
    }, listItems)));
  },
  isEmpty: function() {
    return this.props.items.length === 0;
  },
  saveScrollPosition: function() {
    var scroller;
    if (this.refs.scroller == null) {
      return;
    }
    scroller = this.refs.scroller.getDOMNode();
    return this.savedScrollPosition = scroller.scrollHeight - scroller.scrollTop;
  },
  restoreScrollPosition: function() {
    var scroller;
    scroller = this.refs.scroller.getDOMNode();
    return scroller.scrollTop = scroller.scrollHeight - this.savedScrollPosition;
  },
  scrollToBottom: function() {
    var scroller;
    scroller = this.refs.scroller.getDOMNode();
    return scroller.scrollTop = scroller.scrollHeight;
  },
  handleScroll: function() {
    var scroller;
    scroller = this.refs.scroller.getDOMNode();
    if (this.props.canLoad) {
      if (scroller.scrollTop < this.savedScrollPosition * .3) {
        return this.props.onLoadMore();
      }
    }
  }
});

module.exports = MessageList;


},{"./list/empty":167,"./list/itemManager":169,"lodash":"lodash"}],167:[function(require,module,exports){
var MessageListEmpty;

MessageListEmpty = React.createClass({
  displayName: 'MessageListEmpty',
  render: function() {
    return React.createElement("div", {
      "className": "messages__scroll"
    }, React.createElement("p", {
      "className": "messages__text messages__text--center"
    }, i18n.t('messenger.messages_empty_list')));
  }
});

module.exports = MessageListEmpty;


},{}],168:[function(require,module,exports){
var ERROR_STATE, Image, MessageListItem, PropTypes, READ_STATE, SENDING_STATE, SENT_STATE, UserAvatar, classnames;

classnames = require('classnames');

UserAvatar = require('../../../../common/avatar/user');

Image = require('../../../../../../../shared/react/components/common/Image');

PropTypes = React.PropTypes;

ERROR_STATE = 'error';

SENT_STATE = 'sent';

READ_STATE = 'read';

SENDING_STATE = 'sending';

MessageListItem = React.createClass({
  displayName: 'MessageListItem',
  propTypes: {
    item: PropTypes.object.isRequired,
    itemInfo: PropTypes.object.isRequired,
    deliveryStatus: PropTypes.string.isRequired,
    onResendMessage: PropTypes.func.isRequired
  },
  render: function() {
    var itemClasses;
    itemClasses = classnames('message', {
      'message--to': this.isIncoming(),
      'message--from': this.isOutgoing(),
      'message--error': this.isErrorStatus()
    });
    return React.createElement("div", {
      "className": itemClasses,
      "onClick": this.handleClick
    }, React.createElement("div", {
      "className": "message__user-avatar"
    }, React.createElement(UserAvatar, {
      "user": this.props.itemInfo.user,
      "size": 42.
    })), React.createElement("div", {
      "className": "message__bubble"
    }, this.renderSlug(), React.createElement("span", {
      "className": "message__text",
      "dangerouslySetInnerHTML": {
        __html: this.props.item.content_html || ''
      }
    }), React.createElement("div", {
      "className": "message__img-container"
    }, this.renderAttachments())), React.createElement("div", {
      "className": "message__meta"
    }, this.renderMessageDate(), this.renderDeliveryStatus()));
  },
  renderSlug: function() {
    if (this.isIncoming()) {
      return React.createElement("span", {
        "className": "message__user-name"
      }, React.createElement("a", {
        "href": this.props.itemInfo.user.tlog_url,
        "target": "_blank"
      }, this.props.itemInfo.user.slug));
    } else {
      return React.createElement("span", {
        "className": "message__user-name"
      }, this.props.itemInfo.user.slug);
    }
  },
  renderAttachments: function() {
    if (this.props.item.attachments && this.props.item.attachments.length) {
      return this.props.item.attachments.map(function(img) {
        return React.createElement("div", {
          "className": "message__img"
        }, React.createElement("a", {
          "href": img.url,
          "target": "_blank"
        }, React.createElement(Image, {
          "image": img,
          "isRawUrl": true
        })));
      });
    } else {
      return null;
    }
  },
  renderMessageDate: function() {
    var date;
    if (this.props.item.created_at) {
      date = moment(this.props.item.created_at).format('D MMMM HH:mm');
      return React.createElement("span", {
        "className": "message__date"
      }, date);
    }
  },
  renderDeliveryStatus: function() {
    var statusClass;
    if (this.isOutgoing()) {
      statusClass = (function() {
        switch (this.props.deliveryStatus) {
          case SENT_STATE:
            return 'icon--tick';
          case READ_STATE:
            return 'icon--double-tick';
          case ERROR_STATE:
            return 'icon--refresh';
          default:
            return '';
        }
      }).call(this);
      return React.createElement("span", {
        "className": "message__delivery-status"
      }, React.createElement("i", {
        "className": "icon " + statusClass
      }));
    }
  },
  isErrorStatus: function() {
    return this.props.deliveryStatus === ERROR_STATE;
  },
  isOutgoing: function() {
    return this.props.itemInfo.type === 'outgoing';
  },
  isIncoming: function() {
    return this.props.itemInfo.type === 'incoming';
  },
  handleClick: function() {
    if (this.isErrorStatus()) {
      return this.props.onResendMessage();
    }
  }
});

module.exports = MessageListItem;


},{"../../../../../../../shared/react/components/common/Image":249,"../../../../common/avatar/user":76,"classnames":332}],169:[function(require,module,exports){
var ERROR_STATE, MessageListItem, MessageListItemManager, MessageStore, MessengerViewActions, PropTypes, READ_STATE, SENDING_STATE, SENT_STATE;

MessageStore = require('../../../../../stores/message');

MessengerViewActions = require('../../../../../actions/view/messenger');

MessageListItem = require('./item');

PropTypes = React.PropTypes;

ERROR_STATE = 'error';

SENT_STATE = 'sent';

READ_STATE = 'read';

SENDING_STATE = 'sending';

MessageListItemManager = React.createClass({
  displayName: 'MessageListItemManager',
  propTypes: {
    item: PropTypes.object.isRequired
  },
  getInitialState: function() {
    return this.getStateFromProps(this.props);
  },
  componentWillReceiveProps: function(nextProps) {
    return this.setState(this.getStateFromProps(nextProps));
  },
  render: function() {
    return React.createElement(MessageListItem, {
      "item": this.props.item,
      "itemInfo": this.state.itemInfo,
      "deliveryStatus": this.state.currentState,
      "onResendMessage": this.resendMessage
    });
  },
  activateSendingState: function() {
    return this.setState({
      currentState: SENDING_STATE
    });
  },
  resendMessage: function() {
    var content_html, conversation_id, ref, uuid;
    ref = this.props.item, conversation_id = ref.conversation_id, content_html = ref.content_html, uuid = ref.uuid;
    this.activateSendingState();
    return MessengerViewActions.recreateMessage(conversation_id, content_html, uuid);
  },
  getStateFromProps: function(props) {
    var currentState;
    if (props.item.sendingError) {
      currentState = ERROR_STATE;
    } else if (props.item.id) {
      currentState = props.item.read_at === null ? SENT_STATE : READ_STATE;
    } else {
      currentState = SENDING_STATE;
    }
    return {
      currentState: currentState,
      itemInfo: MessageStore.getInfo(props.item, props.item.conversation_id)
    };
  }
});

module.exports = MessageListItemManager;


},{"../../../../../actions/view/messenger":12,"../../../../../stores/message":239,"./item":168}],170:[function(require,module,exports){
var ConnectStoreMixin, ConversationList, ConversationStore, ConversationsHeader, CreateConversationButton, MessengerConversations, PropTypes;

ConversationStore = require('../../stores/conversation');

ConnectStoreMixin = require('../../../../shared/react/mixins/connectStore');

ConversationsHeader = require('./conversations/header');

ConversationList = require('./conversations/list');

CreateConversationButton = require('./buttons/createConversation');

PropTypes = React.PropTypes;

MessengerConversations = React.createClass({
  displayName: 'MessengerConversations',
  mixins: [ConnectStoreMixin(ConversationStore)],
  propTypes: {
    onConversationClick: PropTypes.func.isRequired,
    onCreateButtonClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "messages__section messages__section--dialogs"
    }, React.createElement(ConversationsHeader, null), React.createElement("div", {
      "className": "messages__body"
    }, React.createElement(ConversationList, {
      "items": this.state.conversations,
      "onItemClick": this.props.onConversationClick
    })), React.createElement("div", {
      "className": "messages__footer"
    }, React.createElement(CreateConversationButton, {
      "onClick": this.props.onCreateButtonClick
    })));
  },
  getStateFromStore: function() {
    return {
      conversations: ConversationStore.getAllChrono()
    };
  }
});

module.exports = MessengerConversations;


},{"../../../../shared/react/mixins/connectStore":260,"../../stores/conversation":236,"./buttons/createConversation":159,"./conversations/header":171,"./conversations/list":172}],171:[function(require,module,exports){
var ConversationsHeader, MessengerHeader;

MessengerHeader = require('../common/header');

ConversationsHeader = React.createClass({
  displayName: 'ConversationsHeader',
  render: function() {
    return React.createElement(MessengerHeader, {
      "title": i18n.t('messenger.conversations_header')
    });
  }
});

module.exports = ConversationsHeader;


},{"../common/header":160}],172:[function(require,module,exports){
var ConversationList, ConversationListEmpty, ConversationListItem, PropTypes, _;

_ = require('lodash');

ConversationListItem = require('./list/item');

ConversationListEmpty = require('./list/empty');

PropTypes = React.PropTypes;

ConversationList = React.createClass({
  displayName: 'ConversationList',
  propTypes: {
    items: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired
  },
  render: function() {
    if (this.isEmpty()) {
      return React.createElement(ConversationListEmpty, null);
    } else {
      return this.renderListItems();
    }
  },
  renderListItems: function() {
    var listItems;
    listItems = _.map(this.props.items, (function(_this) {
      return function(item) {
        return React.createElement(ConversationListItem, {
          "item": item,
          "onClick": _this.props.onItemClick,
          "key": item.id
        });
      };
    })(this));
    return React.createElement("div", {
      "className": "messages__scroll"
    }, React.createElement("div", {
      "className": "messages__dialogs"
    }, listItems));
  },
  isEmpty: function() {
    return this.props.items.length === 0;
  }
});

module.exports = ConversationList;


},{"./list/empty":173,"./list/item":174,"lodash":"lodash"}],173:[function(require,module,exports){
var ConversationListEmpty;

ConversationListEmpty = React.createClass({
  displayName: 'ConversationListEmpty',
  render: function() {
    return React.createElement("div", {
      "className": "messages__scroll"
    }, React.createElement("p", {
      "className": "messages__text messages__text--center"
    }, i18n.t('messenger.conversations_empty_list')));
  }
});

module.exports = ConversationListEmpty;


},{}],174:[function(require,module,exports){
var ConversationListItem, PropTypes, UserAvatar, classnames;

classnames = require('classnames');

UserAvatar = require('../../../common/avatar/user');

PropTypes = React.PropTypes;

ConversationListItem = React.createClass({
  displayName: 'ConversationListItem',
  propTypes: {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    var itemClasses;
    itemClasses = classnames('messages__dialog', {
      '__read': !this.hasUnreadMessages()
    });
    return React.createElement("div", {
      "className": itemClasses,
      "onClick": this.handleClick
    }, React.createElement("div", {
      "className": "messages__user-avatar"
    }, React.createElement(UserAvatar, {
      "user": this.props.item.recipient,
      "size": 42.
    })), React.createElement("div", {
      "className": "messages__dialog-text"
    }, React.createElement("span", {
      "className": "messages__user-name"
    }, this.props.item.recipient.slug), this.renderLastMessageText()), this.renderCounter(), this.renderDate());
  },
  renderLastMessageText: function() {
    var ref, text;
    text = (ref = this.props.item.last_message) != null ? ref.content_html : void 0;
    return React.createElement("span", {
      "dangerouslySetInnerHTML": {
        __html: text || ''
      }
    });
  },
  renderDate: function() {
    var date;
    date = this.props.item.last_message != null ? this.lastMessageCreatedAt() : this.lastConversationCreatedAt();
    return React.createElement("span", {
      "className": "messages__date"
    }, date);
  },
  renderCounter: function() {
    switch (false) {
      case !this.hasUnreadMessages():
        return React.createElement("div", {
          "className": "unread-messages__counter"
        }, this.props.item.unread_messages_count);
      case !this.hasUnreceivedMessages():
        return React.createElement("div", {
          "className": "unreceived-messages__counter"
        });
      default:
        return null;
    }
  },
  hasUnreadMessages: function() {
    return this.props.item.unread_messages_count > 0;
  },
  hasUnreceivedMessages: function() {
    return this.props.item.unreceived_messages_count > 0;
  },
  lastMessageCreatedAt: function() {
    return moment(this.props.item.last_message.created_at).format('D MMMM HH:mm');
  },
  lastConversationCreatedAt: function() {
    return moment(this.props.item.created_at).format('D MMMM HH:mm');
  },
  handleClick: function() {
    return this.props.onClick(this.props.item.id);
  }
});

module.exports = ConversationListItem;


},{"../../../common/avatar/user":76,"classnames":332}],175:[function(require,module,exports){
var CreateConversationHeader, MessengerChooser, MessengerCreateConversation, PropTypes;

CreateConversationHeader = require('./createConversation/header');

MessengerChooser = require('./createConversation/chooser');

PropTypes = React.PropTypes;

MessengerCreateConversation = React.createClass({
  displayName: 'MessengerCreateConversation',
  propTypes: {
    onCreate: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "messages__section messages__section--recipients"
    }, React.createElement(CreateConversationHeader, null), React.createElement("div", {
      "className": "messages__body"
    }, React.createElement(MessengerChooser, {
      "onItemSelect": this.props.onCreate
    })));
  }
});

module.exports = MessengerCreateConversation;


},{"./createConversation/chooser":176,"./createConversation/header":181}],176:[function(require,module,exports){
var ComponentMixin, LOADED_STATE, LOADING_STATE, MessengerChooser, MessengerChooserField, MessengerChooserList, PropTypes, Spinner, UsersViewActions, classnames;

classnames = require('classnames');

UsersViewActions = require('../../../actions/view/users');

ComponentMixin = require('../../../mixins/component');

Spinner = require('../../../../../shared/react/components/common/Spinner');

MessengerChooserField = require('./chooser/field');

MessengerChooserList = require('./chooser/list');

PropTypes = React.PropTypes;

LOADING_STATE = 'loading';

LOADED_STATE = 'loaded';

MessengerChooser = React.createClass({
  displayName: 'MessengerChooser',
  mixins: [ComponentMixin],
  propTypes: {
    onItemSelect: PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      query: '',
      predictions: [],
      currentState: null
    };
  },
  render: function() {
    var chooserClasses;
    chooserClasses = classnames('messages__chooser', {
      '__open': this.hasQuery()
    });
    return React.createElement("div", {
      "className": "messages__scroll"
    }, React.createElement("div", {
      "className": chooserClasses
    }, React.createElement("div", {
      "className": "messages__chooser-box"
    }, React.createElement(MessengerChooserField, {
      "value": this.state.query,
      "onChange": this.handleFieldChange
    }), this.renderChooserList()), React.createElement("div", {
      "className": "messages__chooser-hint"
    }, i18n.t('messenger.chooser_hint'))));
  },
  renderChooserList: function() {
    if (this.hasQuery()) {
      return React.createElement(MessengerChooserList, {
        "items": this.state.predictions,
        "loading": this.isLoadingState(),
        "onItemSelect": this.props.onItemSelect
      });
    }
  },
  isLoadedState: function() {
    return this.state.currentState === LOADED_STATE;
  },
  isLoadingState: function() {
    return this.state.currentState === LOADING_STATE;
  },
  hasQuery: function() {
    return this.state.query.length > 0;
  },
  activateLoadedState: function() {
    return this.safeUpdateState({
      currentState: LOADED_STATE
    });
  },
  activateLoadingState: function() {
    return this.safeUpdateState({
      currentState: LOADING_STATE
    });
  },
  loadPredictions: function(query) {
    this.activateLoadingState();
    return UsersViewActions.predict(query).then((function(_this) {
      return function(predictions) {
        return _this.safeUpdateState({
          predictions: predictions,
          currentState: LOADED_STATE
        });
      };
    })(this));
  },
  handleFieldChange: function(query) {
    if (query.length) {
      this.setState({
        query: query
      });
      return this.loadPredictions(query);
    } else {
      return this.setState(this.getInitialState());
    }
  }
});

module.exports = MessengerChooser;


},{"../../../../../shared/react/components/common/Spinner":250,"../../../actions/view/users":16,"../../../mixins/component":222,"./chooser/field":177,"./chooser/list":178,"classnames":332}],177:[function(require,module,exports){
var MessengerChooserField, PropTypes, _;

_ = require('lodash');

PropTypes = React.PropTypes;

MessengerChooserField = React.createClass({
  displayName: 'MessengerChooserField',
  propTypes: {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  },
  getDefaultProps: function() {
    return {
      value: ''
    };
  },
  render: function() {
    return React.createElement("input", {
      "type": "text",
      "value": this.props.value,
      "className": "messages__chooser-input",
      "onChange": this.handleChange
    });
  },
  handleChange: function(e) {
    var value;
    value = _.trim(e.target.value);
    return this.props.onChange(value);
  }
});

module.exports = MessengerChooserField;


},{"lodash":"lodash"}],178:[function(require,module,exports){
var MessengerChooserList, MessengerChooserListEmpty, MessengerChooserListItem, PropTypes, _;

_ = require('lodash');

MessengerChooserListEmpty = require('./list/empty');

MessengerChooserListItem = require('./list/item');

PropTypes = React.PropTypes;

MessengerChooserList = React.createClass({
  displayName: 'MessengerChooserList',
  propTypes: {
    items: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onItemSelect: PropTypes.func.isRequired
  },
  render: function() {
    if (this.isEmpty()) {
      return React.createElement(MessengerChooserListEmpty, null);
    } else {
      return this.renderListItems();
    }
  },
  renderListItems: function() {
    var listItems;
    listItems = _.map(this.props.items, (function(_this) {
      return function(item) {
        return React.createElement(MessengerChooserListItem, {
          "item": item,
          "onSelect": _this.props.onItemSelect,
          "key": item.id
        });
      };
    })(this));
    return React.createElement("div", {
      "className": "messages__chooser-dropdown"
    }, React.createElement("ul", {
      "className": "messages__chooser-results"
    }, listItems));
  },
  isEmpty: function() {
    return this.props.items.length === 0;
  }
});

module.exports = MessengerChooserList;


},{"./list/empty":179,"./list/item":180,"lodash":"lodash"}],179:[function(require,module,exports){
var MessengerChooserListEmpty;

MessengerChooserListEmpty = React.createClass({
  displayName: 'MessengerChooserListEmpty',
  render: function() {
    return React.createElement("div", {
      "className": "messages__chooser-dropdown"
    }, React.createElement("div", {
      "className": "messages__chooser-empty"
    }, i18n.t('messenger.recipients_empty_list')));
  }
});

module.exports = MessengerChooserListEmpty;


},{}],180:[function(require,module,exports){
var MessengerChooserListItem, PropTypes, UserAvatar;

UserAvatar = require('../../../../common/avatar/user');

PropTypes = React.PropTypes;

MessengerChooserListItem = React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("li", {
      "className": "messages__chooser-result",
      "onClick": this.handleClick
    }, React.createElement("div", {
      "className": "messages__person"
    }, React.createElement("div", {
      "className": "messages__person-avatar"
    }, React.createElement(UserAvatar, {
      "user": this.props.item,
      "size": 42.
    })), React.createElement("div", {
      "className": "messages__person-name"
    }, this.props.item.name)));
  },
  handleClick: function() {
    return this.props.onSelect(this.props.item.id);
  }
});

module.exports = MessengerChooserListItem;


},{"../../../../common/avatar/user":76}],181:[function(require,module,exports){
var CreateConversationHeader, MessengerHeader;

MessengerHeader = require('../common/header');

CreateConversationHeader = React.createClass({
  displayName: 'CreateConversationHeader',
  render: function() {
    return React.createElement(MessengerHeader, {
      "title": i18n.t('messenger.create_conversation_header')
    });
  }
});

module.exports = CreateConversationHeader;


},{"../common/header":160}],182:[function(require,module,exports){
var CONVERSATION_LIST_STATE, CONVERSATION_STATE, CREATE_CONVERSATION_STATE, ComponentMixin, ConnectStoreMixin, ConversationStore, Messenger, MessengerConversation, MessengerConversations, MessengerCreateConversation, MessengerMixin, PropTypes;

ConversationStore = require('../../stores/conversation');

ConnectStoreMixin = require('../../../../shared/react/mixins/connectStore');

ComponentMixin = require('../../mixins/component');

MessengerMixin = require('./mixins/messenger');

MessengerConversation = require('./conversation');

MessengerConversations = require('./conversations');

MessengerCreateConversation = require('./createConversation');

PropTypes = React.PropTypes;

CONVERSATION_STATE = 'conversation';

CONVERSATION_LIST_STATE = 'conversationList';

CREATE_CONVERSATION_STATE = 'createConversation';

Messenger = React.createClass({
  displayName: 'Messenger',
  mixins: [MessengerMixin, ComponentMixin],
  propTypes: {
    state: PropTypes.string
  },
  getDefaultProps: function() {
    return {
      state: CONVERSATION_LIST_STATE
    };
  },
  getInitialState: function() {
    return {
      currentState: this.props.state
    };
  },
  render: function() {
    var content;
    content = (function() {
      switch (this.state.currentState) {
        case CONVERSATION_STATE:
          return React.createElement(MessengerConversation, null);
        case CONVERSATION_LIST_STATE:
          return React.createElement(MessengerConversations, {
            "onConversationClick": this.openConversation,
            "onCreateButtonClick": this.activateCreateState
          });
        case CREATE_CONVERSATION_STATE:
          return React.createElement(MessengerCreateConversation, {
            "onCreate": this.createConversation
          });
        default:
          return console.warn('Unknown currentState of Messenger component', this.state.currentState);
      }
    }).call(this);
    return React.createElement("div", {
      "className": "messages messages--fixed"
    }, content);
  },
  activateCreateState: function() {
    return this.safeUpdateState({
      currentState: CREATE_CONVERSATION_STATE
    });
  },
  activateConversationState: function() {
    return this.safeUpdateState({
      currentState: CONVERSATION_STATE
    });
  },
  activateConversationListState: function() {
    return this.safeUpdateState({
      currentState: CONVERSATION_LIST_STATE
    });
  }
});

module.exports = Messenger;


},{"../../../../shared/react/mixins/connectStore":260,"../../mixins/component":222,"../../stores/conversation":236,"./conversation":161,"./conversations":170,"./createConversation":175,"./mixins/messenger":183}],183:[function(require,module,exports){
var MessengerMixin, MessengerViewActions;

MessengerViewActions = require('../../../actions/view/messenger');

MessengerMixin = {
  createConversation: function(id) {
    return MessengerViewActions.createConversation(id).then(this.activateConversationState);
  },
  openConversation: function(id) {
    MessengerViewActions.openConversation(id);
    return this.activateConversationState();
  }
};

module.exports = MessengerMixin;


},{"../../../actions/view/messenger":12}],184:[function(require,module,exports){
var NotificationsLoadMoreButton, PropTypes;

PropTypes = React.PropTypes;

NotificationsLoadMoreButton = React.createClass({
  displayName: 'NotificationsLoadMoreButton',
  propTypes: {
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("button", {
      "className": "load-more-button",
      "onClick": this.handleClick
    }, i18n.t('buttons.notifications_load_more'));
  },
  handleClick: function(e) {
    e.preventDefault();
    return this.props.onClick();
  }
});

module.exports = NotificationsLoadMoreButton;


},{}],185:[function(require,module,exports){
var NotificationsMarkButton, PropTypes;

PropTypes = React.PropTypes;

NotificationsMarkButton = React.createClass({
  displayName: 'NotificationsMarkButton',
  propTypes: {
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("button", {
      "className": "notifications__mark-button",
      "onClick": this.handleClick
    }, i18n.t('buttons.notifications_mark_all_as_read'));
  },
  handleClick: function() {
    return this.props.onClick();
  }
});

module.exports = NotificationsMarkButton;


},{}],186:[function(require,module,exports){
var NotificationsHeader;

NotificationsHeader = React.createClass({
  displayName: 'NotificationsHeader',
  render: function() {
    return React.createElement("div", {
      "className": "notifications__header"
    }, React.createElement("h3", {
      "className": "notifications__title"
    }, i18n.t('notifications.header')));
  }
});

module.exports = NotificationsHeader;


},{}],187:[function(require,module,exports){
var NotificationList, NotificationListEmpty, NotificationListItem, PropTypes, _;

_ = require('lodash');

NotificationListItem = require('./list/item');

NotificationListEmpty = require('./list/empty');

PropTypes = React.PropTypes;

NotificationList = React.createClass({
  displayName: 'NotificationList',
  propTypes: {
    items: PropTypes.array.isRequired,
    onItemRead: PropTypes.func.isRequired
  },
  render: function() {
    if (this.isEmpty()) {
      return React.createElement(NotificationListEmpty, null);
    } else {
      return this.renderListItems();
    }
  },
  renderListItems: function() {
    var listItems;
    listItems = _.map(this.props.items, (function(_this) {
      return function(item) {
        return React.createElement(NotificationListItem, {
          "item": item,
          "onRead": _this.props.onItemRead,
          "key": item.id
        });
      };
    })(this));
    return React.createElement("ul", {
      "className": "notifications__list"
    }, listItems);
  },
  isEmpty: function() {
    return this.props.items.length === 0;
  }
});

module.exports = NotificationList;


},{"./list/empty":188,"./list/item":189,"lodash":"lodash"}],188:[function(require,module,exports){
var NotificationsListEmpty;

NotificationsListEmpty = React.createClass({
  render: function() {
    return React.createElement("p", {
      "className": "notifications__text notifications__text--center"
    }, i18n.t('notifications.empty_list'));
  }
});

module.exports = NotificationsListEmpty;


},{}],189:[function(require,module,exports){
var Image, NotificationListItem, PropTypes, UserAvatar, classnames;

classnames = require('classnames');

UserAvatar = require('../../common/avatar/user');

Image = require('../../common/image/image');

PropTypes = React.PropTypes;

NotificationListItem = React.createClass({
  displayName: 'NotificationListItem',
  propTypes: {
    item: PropTypes.object.isRequired,
    onRead: PropTypes.func.isRequired
  },
  render: function() {
    var itemClasses;
    itemClasses = classnames('notification', {
      '__unread': this.isUnread()
    });
    return React.createElement("li", {
      "className": itemClasses,
      "onClick": this.handleClick
    }, React.createElement("a", {
      "href": this.props.item.entity_url,
      "target": "_blank",
      "className": "notification__link"
    }, React.createElement("div", {
      "className": "notification__inner"
    }, React.createElement("div", {
      "className": "notification__read-state"
    }), React.createElement("div", {
      "className": "notification__user-avatar"
    }, React.createElement(UserAvatar, {
      "user": this.props.item.sender,
      "size": 42.
    })), this.renderNotificationImage(), React.createElement("div", {
      "className": "notification__desc"
    }, React.createElement("span", {
      "className": "notification__spacer"
    }), React.createElement("span", {
      "className": "notification__content"
    }, React.createElement("span", {
      "className": "notification__user"
    }, this.props.item.sender.slug), React.createElement("span", {
      "className": "notification__action-text"
    }, " ", this.props.item.action_text, ": "), React.createElement("span", {
      "className": "notification__text"
    }, this.props.item.text))))));
  },
  renderNotificationImage: function() {
    if (this.props.item.image != null) {
      return React.createElement(Image, {
        "image": this.props.item.image,
        "maxWidth": 70.,
        "className": "notification__image"
      });
    }
  },
  isUnread: function() {
    return this.props.item.read_at === null;
  },
  handleClick: function() {
    if (this.isUnread()) {
      return this.props.onRead(this.props.item.id);
    }
  }
});

module.exports = NotificationListItem;


},{"../../common/avatar/user":76,"../../common/image/image":78,"classnames":332}],190:[function(require,module,exports){
var NotificationsLoadMore, NotificationsLoadMoreButton, PropTypes, Spinner;

Spinner = require('../../../../shared/react/components/common/Spinner');

NotificationsLoadMoreButton = require('./buttons/loadMore');

PropTypes = React.PropTypes;

NotificationsLoadMore = React.createClass({
  displayName: 'NotificationsLoadMore',
  propTypes: {
    loading: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    if (this.props.loading) {
      return React.createElement("div", {
        "className": "loader"
      }, React.createElement(Spinner, {
        "size": 30.
      }));
    } else {
      return React.createElement(NotificationsLoadMoreButton, {
        "onClick": this.props.onClick
      });
    }
  }
});

module.exports = NotificationsLoadMore;


},{"../../../../shared/react/components/common/Spinner":250,"./buttons/loadMore":184}],191:[function(require,module,exports){
var ERROR_STATE, LOADING_STATE, LOAD_MORE_LIMIT, NotificationsMixin, NotificationsViewActions, SHOW_STATE, _;

_ = require('lodash');

NotificationsViewActions = require('../../../actions/view/notifications');

LOAD_MORE_LIMIT = 20;

SHOW_STATE = 'show';

LOADING_STATE = 'load';

ERROR_STATE = 'error';

NotificationsMixin = {
  getDefaultProps: function() {
    return {
      limit: LOAD_MORE_LIMIT
    };
  },
  hasUnreadNotifications: function() {
    var unreadItems;
    unreadItems = _.filter(this.state.notifications, function(item) {
      return item.read_at === null;
    });
    return !!unreadItems.length;
  },
  isLoadingState: function() {
    return this.state.currentState === LOADING_STATE;
  },
  activateShowState: function() {
    return this.safeUpdateState({
      currentState: SHOW_STATE
    });
  },
  activateLoadingState: function() {
    return this.safeUpdateState({
      currentState: LOADING_STATE
    });
  },
  activateErrorState: function() {
    return this.safeUpdateState({
      currentState: ERROR_STATE
    });
  },
  markAsRead: function(id) {
    return NotificationsViewActions.read(id);
  },
  markAllAsRead: function() {
    return NotificationsViewActions.readAll();
  },
  loadMore: function() {
    var limit, sinceId;
    sinceId = this.state.notifications[this.state.notifications.length - 1].id;
    limit = this.props.limit;
    this.activateLoadingState();
    return NotificationsViewActions.loadMore(sinceId, limit).always(this.activateShowState);
  }
};

module.exports = NotificationsMixin;


},{"../../../actions/view/notifications":13,"lodash":"lodash"}],192:[function(require,module,exports){
var ComponentMixin, ConnectStoreMixin, NotificationList, NotificationStore, Notifications, NotificationsHeader, NotificationsLoadMore, NotificationsMarkButton, NotificationsMixin;

NotificationStore = require('../../stores/notification');

ConnectStoreMixin = require('../../../../shared/react/mixins/connectStore');

ComponentMixin = require('../../mixins/component');

NotificationsMixin = require('./mixins/notifications');

NotificationsMarkButton = require('./buttons/mark');

NotificationsHeader = require('./header');

NotificationList = require('./list');

NotificationsLoadMore = require('./loadMore');

Notifications = React.createClass({
  displayName: 'Notifications',
  mixins: [ConnectStoreMixin(NotificationStore), NotificationsMixin, ComponentMixin],
  render: function() {
    return React.createElement("div", {
      "className": "notifications notifications--fixed"
    }, React.createElement(NotificationsHeader, null), React.createElement("div", {
      "className": "notifications__body"
    }, this.renderActions(), React.createElement("div", {
      "className": "notifications__content"
    }, React.createElement(NotificationList, {
      "items": this.state.notifications,
      "onItemRead": this.markAsRead
    })), this.renderLoadMore()));
  },
  renderActions: function() {
    if (this.hasUnreadNotifications()) {
      return React.createElement("div", {
        "className": "notifications__actions"
      }, React.createElement(NotificationsMarkButton, {
        "onClick": this.markAllAsRead
      }));
    }
  },
  renderLoadMore: function() {
    if (this.state.notifications.length && !this.state.everythingLoaded) {
      return React.createElement(NotificationsLoadMore, {
        "loading": this.isLoadingState(),
        "onClick": this.loadMore
      });
    }
  },
  getStateFromStore: function() {
    return {
      notifications: NotificationStore.getAllChrono(),
      everythingLoaded: NotificationStore.isEverythingLoaded()
    };
  }
});

module.exports = Notifications;


},{"../../../../shared/react/mixins/connectStore":260,"../../mixins/component":222,"../../stores/notification":241,"./buttons/mark":185,"./header":186,"./list":187,"./loadMore":190,"./mixins/notifications":191}],193:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sharedRoutesRoutes = require('../../../../shared/routes/routes');

var _sharedRoutesRoutes2 = _interopRequireDefault(_sharedRoutesRoutes);

var _sharedReactProjectTypes = require('../../../../shared/react/ProjectTypes');

var ProjectTypes = _interopRequireWildcard(_sharedReactProjectTypes);

var _itemsPrev = require('./items/prev');

var _itemsPrev2 = _interopRequireDefault(_itemsPrev);

var _itemsNext = require('./items/next');

var _itemsNext2 = _interopRequireDefault(_itemsNext);

var TlogPagination = (function () {
  function TlogPagination() {
    _classCallCheck(this, TlogPagination);
  }

  _createClass(TlogPagination, [{
    key: 'renderPaginationItems',
    value: function renderPaginationItems() {
      var _props = this.props;
      var _props$pagination = _props.pagination;
      var currentPage = _props$pagination.currentPage;
      var totalPagesCount = _props$pagination.totalPagesCount;
      var type = _props$pagination.type;
      var slug = _props.slug;

      var paginationItems = [];

      switch (false) {
        case !(currentPage == 0 && totalPagesCount == 0):
          break;
        case !(currentPage == 1 && totalPagesCount > 1):
          paginationItems.push(_react2['default'].createElement(_itemsPrev2['default'], {
            href: _sharedRoutesRoutes2['default'].tlogPagination(slug, type, currentPage + 1),
            key: 'prev',
            single: true
          }));
          break;
        case !(totalPagesCount > currentPage > 1):
          paginationItems.push(_react2['default'].createElement(_itemsPrev2['default'], {
            href: _sharedRoutesRoutes2['default'].tlogPagination(slug, type, currentPage + 1),
            key: 'prev'
          }));
          paginationItems.push(_react2['default'].createElement(_itemsNext2['default'], {
            href: _sharedRoutesRoutes2['default'].tlogPagination(slug, type, currentPage - 1),
            key: 'next'
          }));
          break;
        case !(currentPage > totalPagesCount):
          paginationItems.push(_react2['default'].createElement(_itemsNext2['default'], {
            href: _sharedRoutesRoutes2['default'].tlogPagination(slug, type, totalPagesCount),
            key: 'next',
            single: true
          }));
          break;
        case !(currentPage == totalPagesCount && currentPage != 1):
          paginationItems.push(_react2['default'].createElement(_itemsNext2['default'], {
            href: _sharedRoutesRoutes2['default'].tlogPagination(slug, type, currentPage - 1),
            key: 'next',
            single: true
          }));
          break;
      }

      return paginationItems;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'pagination' },
        this.renderPaginationItems()
      );
    }
  }]);

  return TlogPagination;
})();

TlogPagination.propTypes = {
  pagination: ProjectTypes.pagination.isRequired,
  slug: _react.PropTypes.string.isRequired
};

module.exports = TlogPagination;

},{"../../../../shared/react/ProjectTypes":247,"../../../../shared/routes/routes":265,"./items/next":196,"./items/prev":197,"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/interop-require-default":278,"babel-runtime/helpers/interop-require-wildcard":279,"react":"react"}],194:[function(require,module,exports){
var DaylogPagination, PaginationNext, PaginationPrev, PropTypes;

PaginationPrev = require('./items/prev');

PaginationNext = require('./items/next');

PropTypes = React.PropTypes;

DaylogPagination = React.createClass({
  displayName: 'DaylogPagination',
  propTypes: {
    slug: PropTypes.string.isRequired,
    prevDay: PropTypes.string,
    nextDay: PropTypes.string
  },
  render: function() {
    return React.createElement("div", {
      "className": "pagination"
    }, this.renderPaginationItems());
  },
  renderPaginationItems: function() {
    var nextDay, paginationItems, prevDay, ref, slug;
    ref = this.props, prevDay = ref.prevDay, nextDay = ref.nextDay, slug = ref.slug;
    paginationItems = [];
    if (prevDay != null) {
      paginationItems.push(React.createElement(PaginationPrev, {
        "href": Routes.daylogPagination(this.props.slug, prevDay),
        "single": nextDay == null,
        "key": "prev"
      }));
    }
    if (nextDay != null) {
      paginationItems.push(React.createElement(PaginationNext, {
        "href": Routes.daylogPagination(this.props.slug, nextDay),
        "single": prevDay == null,
        "key": "next"
      }));
    }
    return paginationItems;
  }
});

module.exports = DaylogPagination;


},{"./items/next":196,"./items/prev":197}],195:[function(require,module,exports){
var EntryPagination, PropTypes;

PropTypes = React.PropTypes;

EntryPagination = React.createClass({
  displayName: 'EntryPagination',
  propTypes: {
    tlogUrl: PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "pagination"
    }, React.createElement("a", {
      "className": "pagination__item",
      "href": this.props.tlogUrl
    }, i18n.t('pagination.all_entries')));
  }
});

module.exports = EntryPagination;


},{}],196:[function(require,module,exports){
var PaginationNext, PropTypes, classnames;

classnames = require('classnames');

PropTypes = React.PropTypes;

PaginationNext = React.createClass({
  displayName: 'PaginationNext',
  propTypes: {
    href: PropTypes.string.isRequired,
    single: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      single: false
    };
  },
  render: function() {
    var nextClasses;
    nextClasses = classnames('pagination__item', {
      'pagination__item--next': !this.props.single
    });
    return React.createElement("a", {
      "className": nextClasses,
      "href": this.props.href
    }, i18n.t('pagination.next'));
  }
});

module.exports = PaginationNext;


},{"classnames":332}],197:[function(require,module,exports){
var PaginationPrev, PropTypes, classnames;

classnames = require('classnames');

PropTypes = React.PropTypes;

PaginationPrev = React.createClass({
  displayName: 'PaginationPrev',
  propTypes: {
    href: PropTypes.string.isRequired,
    single: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      single: false
    };
  },
  render: function() {
    var prevClasses;
    prevClasses = classnames('pagination__item', {
      'pagination__item--prev': !this.props.single
    });
    return React.createElement("a", {
      "className": prevClasses,
      "href": this.props.href
    }, i18n.t('pagination.prev'));
  }
});

module.exports = PaginationPrev;


},{"classnames":332}],198:[function(require,module,exports){
var PropTypes, ToolbarItem, classnames;

classnames = require('classnames');

PropTypes = React.PropTypes;

ToolbarItem = React.createClass({
  displayName: 'ToolbarItem',
  propTypes: {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    badgeCount: PropTypes.number,
    badgeClassName: PropTypes.string,
    onSelect: PropTypes.func
  },
  getDefaultProps: function() {
    return {
      active: false,
      disabled: false
    };
  },
  render: function() {
    var toolbarItemClasses;
    toolbarItemClasses = classnames('toolbar__popup-item', {
      '__active': this.props.active,
      '__disabled': this.props.disabled
    });
    return React.createElement("li", {
      "className": toolbarItemClasses
    }, React.createElement("a", {
      "href": this.props.href,
      "className": "toolbar__popup-link",
      "onClick": this.handleClick
    }, React.createElement("i", {
      "className": 'icon ' + this.props.icon
    }), this.props.title, " ", this.renderBadge()));
  },
  renderBadge: function() {
    if (this.props.badgeCount) {
      return React.createElement("span", {
        "className": this.props.badgeClassName
      }, this.props.badgeCount);
    }
  },
  handleClick: function(e) {
    if (!this.props.href && !this.props.disabled) {
      e.preventDefault();
      return this.props.onSelect();
    }
  }
});

module.exports = ToolbarItem;


},{"classnames":332}],199:[function(require,module,exports){
var FeedToolbar, FeedToolbarList, PropTypes, ToolbarMixin, classnames;

classnames = require('classnames');

FeedToolbarList = require('./feed/list');

ToolbarMixin = require('./mixins/toolbar');

PropTypes = React.PropTypes;

FeedToolbar = React.createClass({
  displayName: 'FeedToolbar',
  mixins: [ToolbarMixin],
  propTypes: {
    user: PropTypes.object
  },
  render: function() {
    var toolbarClasses;
    toolbarClasses = classnames('toolbar__popup', {
      '__visible': this.isOpenState()
    });
    return React.createElement("nav", {
      "className": "toolbar toolbar--feed"
    }, React.createElement("div", {
      "className": "toolbar__toggle",
      "onClick": this.toggleOpenState
    }, React.createElement("i", {
      "className": "icon icon--ribbon"
    })), React.createElement("div", {
      "className": toolbarClasses
    }, React.createElement(FeedToolbarList, {
      "user": this.props.user
    })));
  },
  toggleOpenState: function() {
    var html;
    html = document.querySelector('html');
    if (html.classList.contains('user-toolbar-open')) {
      html.classList.remove('user-toolbar-open');
    }
    html.classList.toggle('feed-toolbar-open');
    if (this.isOpenState()) {
      return this.activateCloseState();
    } else {
      return this.activateOpenState();
    }
  }
});

module.exports = FeedToolbar;


},{"./feed/list":200,"./mixins/toolbar":202,"classnames":332}],200:[function(require,module,exports){
var FeedToolbarList, PropTypes, ToolbarItem;

ToolbarItem = require('../_item');

PropTypes = React.PropTypes;

FeedToolbarList = React.createClass({
  displayName: 'FeedToolbarList',
  propTypes: {
    user: PropTypes.object
  },
  render: function() {
    return React.createElement("ul", {
      "className": "toolbar__popup-list"
    }, this.props.user !== null && React.createElement(ToolbarItem, {
      "title": i18n.t('feed.friends'),
      "href": Routes.friends_feed_path(),
      "icon": "icon--friends",
      "key": "friends"
    }), React.createElement(ToolbarItem, {
      "title": i18n.t('feed.live'),
      "href": Routes.live_feed_path(),
      "icon": "icon--wave",
      "key": "live"
    }), React.createElement(ToolbarItem, {
      "title": i18n.t('feed.best'),
      "href": Routes.best_feed_path(),
      "icon": "icon--fire",
      "key": "best"
    }), React.createElement(ToolbarItem, {
      "title": i18n.t('feed.people'),
      "href": Routes.people_path(),
      "icon": "icon--people",
      "key": "people"
    }), React.createElement(ToolbarItem, {
      "title": i18n.t('feed.anonymous'),
      "href": Routes.anonymous_feed_path(),
      "icon": "icon--anonymous",
      "key": "anonymous"
    }));
  }
});

module.exports = FeedToolbarList;


},{"../_item":198}],201:[function(require,module,exports){
var ConnectStoreMixin, CurrentUserStore, FeedToolbar, FeedToolbarManager;

CurrentUserStore = require('../../stores/currentUser');

ConnectStoreMixin = require('../../../../shared/react/mixins/connectStore');

FeedToolbar = require('./feed');

FeedToolbarManager = React.createClass({
  displayName: 'FeedToolbarManager',
  mixins: [ConnectStoreMixin(CurrentUserStore)],
  render: function() {
    return React.createElement(FeedToolbar, {
      "user": this.state.user
    });
  },
  getStateFromStore: function() {
    return {
      user: CurrentUserStore.getUser()
    };
  }
});

module.exports = FeedToolbarManager;


},{"../../../../shared/react/mixins/connectStore":260,"../../stores/currentUser":237,"./feed":199}],202:[function(require,module,exports){
var CLOSE_STATE, OPEN_STATE, ToolbarMixin;

CLOSE_STATE = 'close';

OPEN_STATE = 'open';

ToolbarMixin = {
  getInitialState: function() {
    return {
      currentState: CLOSE_STATE
    };
  },
  isOpenState: function() {
    return this.state.currentState === OPEN_STATE;
  },
  activateCloseState: function() {
    return this.setState({
      currentState: CLOSE_STATE
    });
  },
  activateOpenState: function() {
    return this.setState({
      currentState: OPEN_STATE
    });
  }
};

module.exports = ToolbarMixin;


},{}],203:[function(require,module,exports){
var PropTypes, ToolbarMixin, UserToolbar, UserToolbarList, UserToolbarListAdditional, UserToolbarToggle, classnames;

classnames = require('classnames');

UserToolbarToggle = require('./user/toggle');

UserToolbarList = require('./user/list');

UserToolbarListAdditional = require('./user/listAdditional');

ToolbarMixin = require('./mixins/toolbar');

PropTypes = React.PropTypes;

UserToolbar = React.createClass({
  displayName: 'UserToolbar',
  mixins: [ToolbarMixin],
  propTypes: {
    user: PropTypes.object,
    unreadConversationsCount: PropTypes.number.isRequired,
    unreadNotificationsCount: PropTypes.number.isRequired
  },
  render: function() {
    var toolbarClasses;
    toolbarClasses = classnames('toolbar__popup', 'toolbar__popup--complex', {
      '__visible': this.isOpenState()
    });
    return React.createElement("nav", {
      "className": "toolbar toolbar--user"
    }, React.createElement(UserToolbarToggle, {
      "hasConversations": !!this.props.unreadConversationsCount,
      "hasNotifications": !!this.props.unreadNotificationsCount,
      "onClick": this.toggleOpenState
    }), React.createElement("div", {
      "className": toolbarClasses
    }, React.createElement(UserToolbarList, {
      "user": this.props.user,
      "unreadConversationsCount": this.props.unreadConversationsCount,
      "unreadNotificationsCount": this.props.unreadNotificationsCount
    }), React.createElement(UserToolbarListAdditional, null)));
  },
  toggleOpenState: function() {
    var html;
    html = document.querySelector('html');
    if (html.classList.contains('feed-toolbar-open')) {
      html.classList.remove('feed-toolbar-open');
    }
    html.classList.toggle('user-toolbar-open');
    if (this.isOpenState()) {
      return this.activateCloseState();
    } else {
      return this.activateOpenState();
    }
  }
});

module.exports = UserToolbar;


},{"./mixins/toolbar":202,"./user/list":204,"./user/listAdditional":205,"./user/toggle":207,"classnames":332}],204:[function(require,module,exports){
var PropTypes, ToolbarItem, UserToolbarList, UserToolbarListMixin;

ToolbarItem = require('../_item');

UserToolbarListMixin = require('./mixins/list');

PropTypes = React.PropTypes;

UserToolbarList = React.createClass({
  displayName: 'UserToolbarList',
  mixins: [UserToolbarListMixin],
  propTypes: {
    user: PropTypes.object,
    unreadConversationsCount: PropTypes.number.isRequired,
    unreadNotificationsCount: PropTypes.number.isRequired
  },
  render: function() {
    return React.createElement("ul", {
      "className": "toolbar__popup-list"
    }, React.createElement(ToolbarItem, {
      "title": i18n.t('user_toolbar.new_entry_item'),
      "href": Routes.new_entry_url(this.props.user.slug),
      "icon": "icon--plus"
    }), React.createElement(ToolbarItem, {
      "title": i18n.t('user_toolbar.my_diary_item'),
      "href": Routes.my_tlog_url(this.props.user.slug),
      "icon": "icon--diary"
    }), React.createElement(ToolbarItem, {
      "title": i18n.t('user_toolbar.profile_item'),
      "icon": "icon--profile",
      "href": Routes.userProfile(this.props.user.slug)
    }), React.createElement(ToolbarItem, {
      "title": i18n.t('user_toolbar.favorites_item'),
      "href": Routes.favorites_url(this.props.user.slug),
      "icon": "icon--star"
    }), React.createElement(ToolbarItem, {
      "title": i18n.t('user_toolbar.new_anonymous_item'),
      "href": Routes.new_anonymous_entry_url(this.props.user.slug),
      "icon": "icon--anonymous"
    }), React.createElement(ToolbarItem, {
      "title": i18n.t('user_toolbar.privates_item'),
      "href": Routes.private_entries_url(this.props.user.slug),
      "icon": "icon--lock"
    }), React.createElement(ToolbarItem, {
      "title": i18n.t('user_toolbar.messages_item'),
      "href": Routes.messagesUrl(this.props.user.slug),
      "badgeCount": this.props.unreadConversationsCount,
      "badgeClassName": "messages-badge",
      "icon": "icon--messages"
    }), React.createElement(ToolbarItem, {
      "title": i18n.t('user_toolbar.notifications_item'),
      "href": Routes.notificationsUrl(this.props.user.slug),
      "badgeCount": this.props.unreadNotificationsCount,
      "badgeClassName": "notifications-badge",
      "icon": "icon--bell"
    }), React.createElement(ToolbarItem, {
      "title": i18n.t('user_toolbar.friends_item'),
      "icon": "icon--friends",
      "onSelect": this.showFriends
    }), React.createElement(ToolbarItem, {
      "title": i18n.t('user_toolbar.design_item'),
      "icon": "icon--drawing",
      "href": Routes.userDesignSettings(this.props.user.slug)
    }), React.createElement(ToolbarItem, {
      "title": i18n.t('user_toolbar.settings_item'),
      "icon": "icon--cogwheel",
      "href": Routes.userSettings(this.props.user.slug)
    }), React.createElement(ToolbarItem, {
      "title": i18n.t('user_toolbar.logout_item'),
      "href": Routes.logout_path(this.props.user.slug),
      "icon": "icon--logout"
    }));
  }
});

module.exports = UserToolbarList;


},{"../_item":198,"./mixins/list":206}],205:[function(require,module,exports){
var UserToolbarListAdditional;

UserToolbarListAdditional = React.createClass({
  render: function() {
    return React.createElement("ul", {
      "className": "toolbar__popup-list toolbar__popup-list--additional"
    }, React.createElement("li", {
      "className": "toolbar__popup-item"
    }, React.createElement("a", {
      "href": "?m=false",
      "className": "toolbar__popup-link"
    }, i18n.t('user_toolbar.switch_to_desktop_item'))));
  }
});

module.exports = UserToolbarListAdditional;


},{}],206:[function(require,module,exports){
var UserToolbarListMixin;

UserToolbarListMixin = {
  showFriends: function(panelName, userId) {
    return alert('Ещё не работает');
  },
  showMessages: function() {
    return alert('Ещё не работает');
  }
};

module.exports = UserToolbarListMixin;


},{}],207:[function(require,module,exports){
var PropTypes, UserToolbarToggle;

PropTypes = React.PropTypes;

UserToolbarToggle = React.createClass({
  displayName: 'UserToolbarToggle',
  propTypes: {
    hasConversations: PropTypes.bool.isRequired,
    hasNotifications: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "toolbar__toggle",
      "onClick": this.handleClick
    }, this.renderIndicators(), React.createElement("i", {
      "className": "icon icon--menu"
    }));
  },
  renderIndicators: function() {
    var indicators;
    indicators = [];
    if (this.props.hasConversations) {
      indicators.push(React.createElement("i", {
        "className": "toolbar__indicator toolbar__indicator--messages",
        "key": "conversations"
      }));
    }
    if (this.props.hasNotifications) {
      indicators.push(React.createElement("i", {
        "className": "toolbar__indicator toolbar__indicator--notifications",
        "key": "notifications"
      }));
    }
    return React.createElement("span", {
      "className": "toolbar__indicators"
    }, indicators);
  },
  handleClick: function() {
    return this.props.onClick();
  }
});

module.exports = UserToolbarToggle;


},{}],208:[function(require,module,exports){
var ConnectStoreMixin, CurrentUserStore, MessagingStatusStore, UserToolbar, UserToolbarManager;

CurrentUserStore = require('../../stores/currentUser');

MessagingStatusStore = require('../../stores/messagingStatus');

ConnectStoreMixin = require('../../../../shared/react/mixins/connectStore');

UserToolbar = require('./user');

UserToolbarManager = React.createClass({
  displayName: 'UserToolbarManager',
  mixins: [ConnectStoreMixin([CurrentUserStore, MessagingStatusStore])],
  render: function() {
    if (this.state.logged) {
      return React.createElement(UserToolbar, {
        "user": this.state.user,
        "unreadConversationsCount": this.state.unreadConversationsCount,
        "unreadNotificationsCount": this.state.unreadNotificationsCount
      });
    } else {
      return null;
    }
  },
  getStateFromStore: function() {
    return {
      user: CurrentUserStore.getUser(),
      logged: CurrentUserStore.isLogged(),
      unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount(),
      unreadNotificationsCount: MessagingStatusStore.getUnreadNotificationsCount()
    };
  }
});

module.exports = UserToolbarManager;


},{"../../../../shared/react/mixins/connectStore":260,"../../stores/currentUser":237,"../../stores/messagingStatus":240,"./user":203}],209:[function(require,module,exports){
var ApiConstants, keyMirror;

keyMirror = require('react/lib/keyMirror');

ApiConstants = keyMirror({
  FOLLOW_USER: null,
  UNFOLLOW_USER: null,
  CANCEL_USER: null,
  IGNORE_USER: null,
  REPORT_USER: null,
  ADD_TO_FAVORITES: null,
  REMOVE_FROM_FAVORITES: null,
  START_WATCH: null,
  STOP_WATCH: null,
  REPORT: null,
  DELETE: null,
  VOTE: null,
  LOAD_COMMENTS: null,
  DELETE_COMMENT: null,
  REPORT_COMMENT: null,
  CREATE_COMMENT: null,
  EDIT_COMMENT: null,
  LOAD_FEED_ENTRIES: null,
  LOAD_TLOG_ENTRIES: null,
  SIGN_IN: null,
  SIGN_UP: null,
  RECOVER: null,
  UPDATE_CURRENT_USER: null,
  CANCEL_EMAIL_CONFIRMATION: null,
  UPDATE_CURRENT_USER_AVATAR: null,
  USERS_PREDICT: null,
  LOAD_NOTIFICATIONS: null,
  READ_NOTIFICATIONS: null,
  LOAD_MESSAGES: null,
  CREATE_MESSAGE: null,
  READ_MESSAGES: null,
  READY_TO_MESSAGING: null
});

module.exports = ApiConstants;


},{"react/lib/keyMirror":341}],210:[function(require,module,exports){
var ApiConstants, CurrentUserConstants, EntryConstants, FeedConstants, MessagingConstants, MessengerConstants, NotificationsConstants, RelationshipConstants;

ApiConstants = require('./api');

EntryConstants = require('./entry');

FeedConstants = require('./feed');

RelationshipConstants = require('./relationship');

CurrentUserConstants = require('./currentUser');

NotificationsConstants = require('./notifications');

MessengerConstants = require('./messenger');

MessagingConstants = require('./messaging');

module.exports = {
  api: ApiConstants,
  entry: EntryConstants,
  feed: FeedConstants,
  relationship: RelationshipConstants,
  currentUser: CurrentUserConstants,
  notifications: NotificationsConstants,
  messenger: MessengerConstants,
  messaging: MessagingConstants
};


},{"./api":209,"./currentUser":211,"./entry":212,"./feed":213,"./messaging":214,"./messenger":215,"./notifications":216,"./relationship":217}],211:[function(require,module,exports){
var CurrentUserConstants, keyMirror;

keyMirror = require('react/lib/keyMirror');

CurrentUserConstants = keyMirror({
  UPDATE: null,
  CANCEL_EMAIL_CONFIRMATION: null,
  UPDATE_AVATAR: null
});

module.exports = CurrentUserConstants;


},{"react/lib/keyMirror":341}],212:[function(require,module,exports){
var EntryConstants, keyMirror;

keyMirror = require('react/lib/keyMirror');

EntryConstants = keyMirror({
  INITIALIZE_COMMENTS: null,
  LOAD_COMMENTS: null,
  DELETE_COMMENT: null,
  CREATE_COMMENT: null,
  EDIT_COMMENT: null
});

module.exports = EntryConstants;


},{"react/lib/keyMirror":341}],213:[function(require,module,exports){
var FeedConstants, keyMirror;

keyMirror = require('react/lib/keyMirror');

FeedConstants = keyMirror({
  INITIALIZE_FEED: null,
  LOAD_ENTRIES: null
});

module.exports = FeedConstants;


},{"react/lib/keyMirror":341}],214:[function(require,module,exports){
var MessagingConstants;

MessagingConstants = {
  CONNECT_SUCCESS: 'pusher:subscription_succeeded',
  CONNECT_FAIL: 'pusher:subscription_error',
  UPDATE_STATUS: 'status',
  UPDATE_CONVERSATION: 'update_conversation',
  PUSH_MESSAGE: 'push_message',
  UPDATE_MESSAGES: 'update_messages',
  PUSH_NOTIFICATION: 'push_notification',
  UPDATE_NOTIFICATIONS: 'update_notifications',
  RECONNECT: 'reconnected'
};

module.exports = MessagingConstants;


},{}],215:[function(require,module,exports){
var MessengerConstants, keyMirror;

keyMirror = require('react/lib/keyMirror');

MessengerConstants = keyMirror({
  CREATE_CONVERSATION: null,
  LOAD_MESSAGES: null,
  READ_MESSAGES: null,
  OPEN_CONVERSATION: null,
  CREATE_LOCAL_MESSAGE: null,
  CREATE_REMOTE_MESSAGE: null,
  CREATE_REMOTE_MESSAGE_FAIL: null
});

module.exports = MessengerConstants;


},{"react/lib/keyMirror":341}],216:[function(require,module,exports){
var NotificationsConstants, keyMirror;

keyMirror = require('react/lib/keyMirror');

NotificationsConstants = keyMirror({
  READ: null,
  READ_ALL: null
});

module.exports = NotificationsConstants;


},{"react/lib/keyMirror":341}],217:[function(require,module,exports){
var RelationshipConstants, keyMirror;

keyMirror = require('react/lib/keyMirror');

RelationshipConstants = keyMirror({
  UPDATE_RELATIONSHIP: null
});

module.exports = RelationshipConstants;


},{"react/lib/keyMirror":341}],218:[function(require,module,exports){
var Notify, NotifyController, _pendingNotification, closeNotification, getContainer, isPageLoadingCanceled;

Notify = require('../components/alerts/notify');

_pendingNotification = null;

getContainer = function() {
  var container;
  container = document.querySelector('[notify-container]');
  if (container == null) {
    container = document.createElement('div');
    container.setAttribute('notify-container', '');
    document.body.appendChild(container);
  }
  return container;
};

closeNotification = function() {
  var container;
  container = getContainer();
  React.unmountComponentAtNode(container);
  return _pendingNotification = null;
};

isPageLoadingCanceled = function(xhr) {
  return xhr.status === 0;
};

NotifyController = {
  notify: function(type, text, timeout) {
    var container, notification;
    if (timeout == null) {
      timeout = 3000;
    }
    container = getContainer();
    closeNotification();
    notification = React.render(React.createElement(Notify, {
      "type": type,
      "text": text,
      "timeout": timeout,
      "onClose": closeNotification
    }), container);
    return _pendingNotification = notification;
  },
  notifySuccess: function(text, timeout) {
    if (timeout == null) {
      timeout = 3000;
    }
    return this.notify('success', text, timeout);
  },
  notifyError: function(text, timeout) {
    if (timeout == null) {
      timeout = 3000;
    }
    return this.notify('error', text, timeout);
  },
  errorResponse: function(xhr, timeout) {
    var json, message;
    if (timeout == null) {
      timeout = 3000;
    }
    if (xhr._aborted === true) {
      return;
    }
    if (xhr.responseText) {
      json = JSON.parse(xhr.responseText);
      message = (function() {
        switch (false) {
          case !json.message:
            return json.message;
          case !json.long_message:
            return json.long_message;
          case !json.error:
            return json.error;
        }
      })();
    } else {
      message = "Ошибка сети: " + xhr.statusText;
    }
    if (!isPageLoadingCanceled(xhr)) {
      return this.notify('error', message, timeout);
    }
  }
};

module.exports = NotifyController;


},{"../components/alerts/notify":51}],219:[function(require,module,exports){
var ScreenController, _oldPageName, getContainer, restorePageName, switchPageName;

_oldPageName = null;

getContainer = function() {
  var container;
  container = document.querySelector('[screen-container]');
  if (container == null) {
    container = document.createElement('div');
    container.setAttribute('screen-container', '');
    container.style.height = '100%';
    document.body.appendChild(container);
  }
  return container;
};

switchPageName = function(pageName) {
  var oldClassName;
  oldClassName = document.documentElement.className;
  if (_oldPageName === null) {
    _oldPageName = oldClassName.match(/.*-page/);
  }
  return document.documentElement.className = oldClassName.replace(/.*-page/, pageName);
};

restorePageName = function() {
  var oldClassName;
  oldClassName = document.documentElement.className;
  document.documentElement.className = oldClassName.replace(/.*-page/, _oldPageName);
  return _oldPageName = null;
};

ScreenController = {
  show: function(Component, props, pageName) {
    var appContainer, container;
    props.fixed = true;
    container = getContainer();
    appContainer = document.getElementById('App');
    appContainer.style.display = 'none';
    switchPageName(pageName);
    return React.render(React.createElement(Component, React.__spread({}, props)), container);
  },
  close: function() {
    var appContainer, container;
    container = getContainer();
    appContainer = document.getElementById('App');
    appContainer.style.display = '';
    restorePageName();
    return setTimeout((function() {
      return React.unmountComponentAtNode(container);
    }), 0);
  }
};

module.exports = ScreenController;


},{}],220:[function(require,module,exports){
var AppDispatcher, Dispatcher, assign;

assign = require('react/lib/Object.assign');

Dispatcher = require('flux').Dispatcher;

AppDispatcher = assign(new Dispatcher(), {
  handleViewAction: function(action) {
    return this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },
  handleServerAction: function(action) {
    return this.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });
  }
});

module.exports = AppDispatcher;


},{"flux":333,"react/lib/Object.assign":339}],221:[function(require,module,exports){
var ClickOutsideMixin, closest;

closest = function(el, target) {
  while (target.parentNode) {
    if (target === el) {
      return true;
    }
    target = target.parentNode;
  }
  return false;
};

ClickOutsideMixin = {
  componentDidMount: function() {
    return document.addEventListener('click', this.onDocumentClick);
  },
  componentWillUnmount: function() {
    return document.removeEventListener('click', this.onDocumentClick);
  },
  onDocumentClick: function(e) {
    var isClickInside;
    if (!this.isOpenState()) {
      return;
    }
    isClickInside = closest(this.getDOMNode(), e.target);
    if (!isClickInside) {
      return this.activateCloseState();
    }
  }
};

module.exports = ClickOutsideMixin;


},{}],222:[function(require,module,exports){
var ComponentMixin;

ComponentMixin = {
  safeUpdate: function(func) {
    if (!this._isUnmounted()) {
      return func();
    }
  },
  safeUpdateState: function(newStates) {
    if (!this._isUnmounted()) {
      return this.setState(newStates);
    }
  },
  _isUnmounted: function() {
    return this._compositeLifeCycleState === 'UNMOUNTING' || this._compositeLifeCycleState === 'UNMOUNTED' || this._lifeCycleState === 'UNMOUNTING' || this._lifeCycleState === 'UNMOUNTED';
  }
};

module.exports = ComponentMixin;


},{}],223:[function(require,module,exports){
var DropdownMenuMixin, REVERSE_MARGIN, getSize, getViewportWH;

REVERSE_MARGIN = 5;

getSize = function(elem) {
  return [elem.offsetWidth, elem.offsetHeight];
};

getViewportWH = function() {
  var d, e, g, w, x, y;
  w = window;
  d = document;
  e = d.documentElement;
  g = d.getElementsByTagName('body')[0];
  x = w.innerWidth || e.clientWidth || g.clientWidth;
  y = w.innerHeight || e.clientHeight || g.clientHeight;
  return [x, y];
};

DropdownMenuMixin = {
  getInitialState: function() {
    return {
      top: false,
      right: false
    };
  },
  componentWillReceiveProps: function(nextProps) {
    var isNotEnoughBottomSpace, isNotEnoughRightSpace, menu, menuOffsets, viewportWH;
    if (this.props.visible !== nextProps.visible) {
      menu = this.getDOMNode();
      menuOffsets = menu.getBoundingClientRect();
      viewportWH = getViewportWH();
      isNotEnoughBottomSpace = (function(_this) {
        return function() {
          var menuOffsetTop, menuSize, viewportHeight;
          menuSize = getSize(menu);
          menuOffsetTop = menuOffsets.top;
          viewportHeight = viewportWH[1];
          if (viewportHeight - REVERSE_MARGIN < menuOffsetTop + menuSize[1]) {
            return true;
          } else {
            return false;
          }
        };
      })(this);
      isNotEnoughRightSpace = (function(_this) {
        return function() {
          var menuOffsetRight, viewportWidth;
          menuOffsetRight = menuOffsets.right;
          viewportWidth = viewportWH[0];
          if (viewportWidth - REVERSE_MARGIN < menuOffsetRight) {
            return true;
          } else {
            return false;
          }
        };
      })(this);
      return this.setState({
        top: isNotEnoughBottomSpace(),
        right: isNotEnoughRightSpace()
      });
    }
  }
};

module.exports = DropdownMenuMixin;


},{}],224:[function(require,module,exports){
var Auth, AuthPage, PageMixin, PropTypes;

PageMixin = require('./mixins/page');

Auth = require('../components/auth/auth');

PropTypes = React.PropTypes;

AuthPage = React.createClass({
  displayName: 'AuthPage',
  mixins: [PageMixin],
  render: function() {
    return React.createElement("div", {
      "className": "layout"
    }, React.createElement("div", {
      "className": "layout__body"
    }, React.createElement(Auth, {
      "fixed": true
    })));
  }
});

module.exports = AuthPage;


},{"../components/auth/auth":52,"./mixins/page":231}],225:[function(require,module,exports){
var AuthButtonManager, AuthManager, CurrentUserStore, EntryPage, EntryPagination, EntryTlog, FeedToolbarManager, HeroTlog, PageMixin, PropTypes, UserToolbarManager;

CurrentUserStore = require('../stores/currentUser');

PageMixin = require('./mixins/page');

FeedToolbarManager = require('../components/toolbars/feedManager');

UserToolbarManager = require('../components/toolbars/userManager');

HeroTlog = require('../components/hero/tlog');

EntryTlog = require('../components/entry/Tlog');

EntryPagination = require('../components/pagination/entry');

AuthManager = require('../components/auth/authManager');

AuthButtonManager = require('../components/buttons/auth/authManager');

PropTypes = React.PropTypes;

EntryPage = React.createClass({
  displayName: 'EntryPage',
  mixins: [PageMixin],
  propTypes: {
    currentUser: PropTypes.object,
    tlog: PropTypes.object.isRequired,
    entry: PropTypes.object.isRequired
  },
  componentWillMount: function() {
    return CurrentUserStore.initialize(this.props.currentUser);
  },
  render: function() {
    return React.createElement("div", null, React.createElement(FeedToolbarManager, null), React.createElement(UserToolbarManager, null), React.createElement(AuthButtonManager, null), React.createElement("div", {
      "className": "layout"
    }, React.createElement("div", {
      "className": "layout__header"
    }, React.createElement(HeroTlog, {
      "tlog": this.props.tlog
    })), React.createElement("div", {
      "className": "layout__body"
    }, React.createElement(EntryTlog, {
      "commentFormVisible": true,
      "entry": this.props.entry
    }), React.createElement(EntryPagination, {
      "tlogUrl": this.props.tlog.tlog_url
    }))), React.createElement(AuthManager, null));
  }
});

module.exports = EntryPage;


},{"../components/auth/authManager":56,"../components/buttons/auth/authManager":72,"../components/entry/Tlog":101,"../components/hero/tlog":143,"../components/pagination/entry":195,"../components/toolbars/feedManager":201,"../components/toolbars/userManager":208,"../stores/currentUser":237,"./mixins/page":231}],226:[function(require,module,exports){
var AuthButtonManager, AuthManager, CurrentUserStore, FeedBest, FeedBestPage, FeedStore, FeedToolbarManager, HeroFeedBest, PageMixin, PropTypes, UserToolbarManager;

CurrentUserStore = require('../stores/currentUser');

FeedStore = require('../stores/feed');

PageMixin = require('./mixins/page');

FeedToolbarManager = require('../components/toolbars/feedManager');

UserToolbarManager = require('../components/toolbars/userManager');

HeroFeedBest = require('../components/hero/feedBest');

FeedBest = require('../components/feed/feedBest');

AuthManager = require('../components/auth/authManager');

AuthButtonManager = require('../components/buttons/auth/authManager');

PropTypes = React.PropTypes;

FeedBestPage = React.createClass({
  displayName: 'FeedBestPage',
  mixins: [PageMixin],
  propTypes: {
    currentUser: PropTypes.object,
    entries: PropTypes.array.isRequired,
    feed: PropTypes.object.isRequired
  },
  componentWillMount: function() {
    CurrentUserStore.initialize(this.props.currentUser);
    return FeedStore.initialize(this.props.entries);
  },
  render: function() {
    return React.createElement("div", null, React.createElement(FeedToolbarManager, null), React.createElement(UserToolbarManager, null), React.createElement(AuthButtonManager, null), React.createElement("div", {
      "className": "layout"
    }, React.createElement("div", {
      "className": "layout__header"
    }, React.createElement(HeroFeedBest, {
      "backgroundUrl": this.props.feed.backgroundUrl,
      "entriesCount": this.props.feed.entriesCount
    })), React.createElement("div", {
      "className": "layout__body"
    }, React.createElement(FeedBest, {
      "entries": this.props.entries
    }))), React.createElement(AuthManager, null));
  }
});

module.exports = FeedBestPage;


},{"../components/auth/authManager":56,"../components/buttons/auth/authManager":72,"../components/feed/feedBest":134,"../components/hero/feedBest":140,"../components/toolbars/feedManager":201,"../components/toolbars/userManager":208,"../stores/currentUser":237,"../stores/feed":238,"./mixins/page":231}],227:[function(require,module,exports){
var AuthButtonManager, AuthManager, CurrentUserStore, FeedFriends, FeedFriendsPage, FeedStore, FeedToolbarManager, HeroFeedFriends, PageMixin, PropTypes, UserToolbarManager;

CurrentUserStore = require('../stores/currentUser');

FeedStore = require('../stores/feed');

PageMixin = require('./mixins/page');

FeedToolbarManager = require('../components/toolbars/feedManager');

UserToolbarManager = require('../components/toolbars/userManager');

HeroFeedFriends = require('../components/hero/feedFriends');

FeedFriends = require('../components/feed/feedFriends');

AuthManager = require('../components/auth/authManager');

AuthButtonManager = require('../components/buttons/auth/authManager');

PropTypes = React.PropTypes;

FeedFriendsPage = React.createClass({
  displayName: 'FeedFriendsPage',
  mixins: [PageMixin],
  propTypes: {
    currentUser: PropTypes.object,
    entries: PropTypes.array.isRequired,
    feed: PropTypes.object.isRequired
  },
  componentWillMount: function() {
    CurrentUserStore.initialize(this.props.currentUser);
    return FeedStore.initialize(this.props.entries);
  },
  render: function() {
    return React.createElement("div", null, React.createElement(FeedToolbarManager, null), React.createElement(UserToolbarManager, null), React.createElement(AuthButtonManager, null), React.createElement("div", {
      "className": "layout"
    }, React.createElement("div", {
      "className": "layout__header"
    }, React.createElement(HeroFeedFriends, {
      "backgroundUrl": this.props.feed.backgroundUrl,
      "entriesCount": this.props.feed.entriesCount
    })), React.createElement("div", {
      "className": "layout__body"
    }, React.createElement(FeedFriends, {
      "entries": this.props.entries
    }))), React.createElement(AuthManager, null));
  }
});

module.exports = FeedFriendsPage;


},{"../components/auth/authManager":56,"../components/buttons/auth/authManager":72,"../components/feed/feedFriends":135,"../components/hero/feedFriends":141,"../components/toolbars/feedManager":201,"../components/toolbars/userManager":208,"../stores/currentUser":237,"../stores/feed":238,"./mixins/page":231}],228:[function(require,module,exports){
var AuthButtonManager, AuthManager, CurrentUserStore, FeedLive, FeedLivePage, FeedStore, FeedToolbarManager, HeroFeedLive, PageMixin, PropTypes, UserToolbarManager;

CurrentUserStore = require('../stores/currentUser');

FeedStore = require('../stores/feed');

PageMixin = require('./mixins/page');

FeedToolbarManager = require('../components/toolbars/feedManager');

UserToolbarManager = require('../components/toolbars/userManager');

HeroFeedLive = require('../components/hero/feedLive');

FeedLive = require('../components/feed/feedLive');

AuthManager = require('../components/auth/authManager');

AuthButtonManager = require('../components/buttons/auth/authManager');

PropTypes = React.PropTypes;

FeedLivePage = React.createClass({
  displayName: 'FeedLivePage',
  mixins: [PageMixin],
  propTypes: {
    currentUser: PropTypes.object,
    entries: PropTypes.array.isRequired,
    feed: PropTypes.object.isRequired
  },
  componentWillMount: function() {
    CurrentUserStore.initialize(this.props.currentUser);
    return FeedStore.initialize(this.props.entries);
  },
  render: function() {
    return React.createElement("div", null, React.createElement(FeedToolbarManager, null), React.createElement(UserToolbarManager, null), React.createElement(AuthButtonManager, null), React.createElement("div", {
      "className": "layout"
    }, React.createElement("div", {
      "className": "layout__header"
    }, React.createElement(HeroFeedLive, {
      "backgroundUrl": this.props.feed.backgroundUrl,
      "currentUser": this.props.currentUser,
      "entriesCount": this.props.feed.entriesCount
    })), React.createElement("div", {
      "className": "layout__body"
    }, React.createElement(FeedLive, null))), React.createElement(AuthManager, null));
  }
});

module.exports = FeedLivePage;


},{"../components/auth/authManager":56,"../components/buttons/auth/authManager":72,"../components/feed/feedLive":136,"../components/hero/feedLive":142,"../components/toolbars/feedManager":201,"../components/toolbars/userManager":208,"../stores/currentUser":237,"../stores/feed":238,"./mixins/page":231}],229:[function(require,module,exports){
var ConversationStore, CurrentUserStore, FeedToolbarManager, Messenger, MessengerPage, PageMixin, PropTypes, UserToolbarManager;

CurrentUserStore = require('../stores/currentUser');

ConversationStore = require('../stores/conversation');

PageMixin = require('./mixins/page');

FeedToolbarManager = require('../components/toolbars/feedManager');

UserToolbarManager = require('../components/toolbars/userManager');

Messenger = require('../components/messenger/messenger');

PropTypes = React.PropTypes;

MessengerPage = React.createClass({
  displayName: 'MessengerPage',
  mixins: [PageMixin],
  propTypes: {
    currentUser: PropTypes.object.isRequired,
    conversationsInfo: PropTypes.shape({
      items: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired
    }).isRequired
  },
  componentWillMount: function() {
    CurrentUserStore.initialize(this.props.currentUser);
    return ConversationStore.initPlural(this.props.conversationsInfo.items);
  },
  render: function() {
    return React.createElement("div", null, React.createElement(FeedToolbarManager, null), React.createElement(UserToolbarManager, null), React.createElement("div", {
      "className": "layout"
    }, React.createElement("div", {
      "className": "layout__body"
    }, React.createElement(Messenger, null))));
  }
});

module.exports = MessengerPage;


},{"../components/messenger/messenger":182,"../components/toolbars/feedManager":201,"../components/toolbars/userManager":208,"../stores/conversation":236,"../stores/currentUser":237,"./mixins/page":231}],230:[function(require,module,exports){
var ConversationStore, CurrentUserStore, FeedToolbarManager, MessageStore, Messenger, MessengerThreadPage, PageMixin, PropTypes, UserToolbarManager;

CurrentUserStore = require('../stores/currentUser');

ConversationStore = require('../stores/conversation');

MessageStore = require('../stores/message');

PageMixin = require('./mixins/page');

FeedToolbarManager = require('../components/toolbars/feedManager');

UserToolbarManager = require('../components/toolbars/userManager');

Messenger = require('../components/messenger/messenger');

PropTypes = React.PropTypes;

MessengerThreadPage = React.createClass({
  displayName: 'MessengerThreadPage',
  mixins: [PageMixin],
  propTypes: {
    currentUser: PropTypes.object.isRequired,
    conversation: PropTypes.object.isRequired,
    messagesInfo: PropTypes.shape({
      items: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired
    }).isRequired
  },
  componentWillMount: function() {
    CurrentUserStore.initialize(this.props.currentUser);
    ConversationStore.initSingular(this.props.conversation);
    return MessageStore.initialize(this.props.messagesInfo.items);
  },
  render: function() {
    return React.createElement("div", null, React.createElement(FeedToolbarManager, null), React.createElement(UserToolbarManager, null), React.createElement("div", {
      "className": "layout"
    }, React.createElement("div", {
      "className": "layout__body"
    }, React.createElement(Messenger, {
      "state": "conversation"
    }))));
  }
});

module.exports = MessengerThreadPage;


},{"../components/messenger/messenger":182,"../components/toolbars/feedManager":201,"../components/toolbars/userManager":208,"../stores/conversation":236,"../stores/currentUser":237,"../stores/message":239,"./mixins/page":231}],231:[function(require,module,exports){
var PageMixin, PropTypes;

PropTypes = React.PropTypes;

PageMixin = {
  propTypes: {
    locale: PropTypes.string.isRequired
  },
  componentWillMount: function() {
    if (this.props.locale !== i18n.lng()) {
      i18n.setLng(this.props.locale);
    }
    return moment.locale(this.props.locale);
  }
};

module.exports = PageMixin;


},{}],232:[function(require,module,exports){
var CurrentUserStore, FeedToolbarManager, NotificationStore, Notifications, NotificationsPage, PageMixin, PropTypes, UserToolbarManager;

CurrentUserStore = require('../stores/currentUser');

NotificationStore = require('../stores/notification');

PageMixin = require('./mixins/page');

FeedToolbarManager = require('../components/toolbars/feedManager');

UserToolbarManager = require('../components/toolbars/userManager');

Notifications = require('../components/notifications/notifications');

PropTypes = React.PropTypes;

NotificationsPage = React.createClass({
  displayName: 'NotificationsPage',
  mixins: [PageMixin],
  propTypes: {
    currentUser: PropTypes.object.isRequired,
    notifications: PropTypes.array.isRequired
  },
  componentWillMount: function() {
    CurrentUserStore.initialize(this.props.currentUser);
    return NotificationStore.initialize(this.props.notifications);
  },
  render: function() {
    return React.createElement("div", null, React.createElement(FeedToolbarManager, null), React.createElement(UserToolbarManager, null), React.createElement("div", {
      "className": "layout"
    }, React.createElement("div", {
      "className": "layout__body"
    }, React.createElement(Notifications, null))));
  }
});

module.exports = NotificationsPage;


},{"../components/notifications/notifications":192,"../components/toolbars/feedManager":201,"../components/toolbars/userManager":208,"../stores/currentUser":237,"../stores/notification":241,"./mixins/page":231}],233:[function(require,module,exports){
var AuthButtonManager, AuthManager, CurrentUserStore, Daylog, DaylogPagination, FeedToolbarManager, HeroTlog, PageMixin, PropTypes, TlogDaylogPage, UserToolbarManager;

CurrentUserStore = require('../stores/currentUser');

PageMixin = require('./mixins/page');

FeedToolbarManager = require('../components/toolbars/feedManager');

UserToolbarManager = require('../components/toolbars/userManager');

HeroTlog = require('../components/hero/tlog');

Daylog = require('../components/Daylog/Daylog');

DaylogPagination = require('../components/pagination/daylog');

AuthManager = require('../components/auth/authManager');

AuthButtonManager = require('../components/buttons/auth/authManager');

PropTypes = React.PropTypes;

TlogDaylogPage = React.createClass({
  displayName: 'TlogDaylogPage',
  mixins: [PageMixin],
  propTypes: {
    currentUser: PropTypes.object,
    tlog: PropTypes.object.isRequired,
    entries: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired
  },
  componentWillMount: function() {
    return CurrentUserStore.initialize(this.props.currentUser);
  },
  render: function() {
    return React.createElement("div", null, React.createElement(FeedToolbarManager, null), React.createElement(UserToolbarManager, null), React.createElement(AuthButtonManager, null), React.createElement("div", {
      "className": "layout"
    }, React.createElement("div", {
      "className": "layout__header"
    }, React.createElement(HeroTlog, {
      "tlog": this.props.tlog
    })), React.createElement("div", {
      "className": "layout__body"
    }, React.createElement(Daylog, {
      "tlog": this.props.tlog,
      "entries": this.props.entries
    }), React.createElement(DaylogPagination, {
      "slug": this.props.tlog.author.slug,
      "prevDay": this.props.pagination.prevDay,
      "nextDay": this.props.pagination.nextDay
    }))), React.createElement(AuthManager, null));
  }
});

module.exports = TlogDaylogPage;


},{"../components/Daylog/Daylog":19,"../components/auth/authManager":56,"../components/buttons/auth/authManager":72,"../components/hero/tlog":143,"../components/pagination/daylog":194,"../components/toolbars/feedManager":201,"../components/toolbars/userManager":208,"../stores/currentUser":237,"./mixins/page":231}],234:[function(require,module,exports){
var Api, AppDispatcher, Constants, MessagingService, NotifyController,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Constants = require('../constants/constants');

NotifyController = require('../controllers/notify');

AppDispatcher = require('../dispatcher/dispatcher');

Api = require('../api/api');

MessagingService = (function(superClass) {
  extend(MessagingService, superClass);

  MessagingService.prototype.userID = null;

  MessagingService.prototype.userToken = null;

  MessagingService.prototype.pusher = null;

  MessagingService.prototype.channel = null;

  function MessagingService(userID, userToken) {
    this.onConnectionSuccess = bind(this.onConnectionSuccess, this);
    var pusherOptions;
    this.userID = userID;
    this.userToken = userToken;
    pusherOptions = {
      authEndpoint: ApiRoutes.pusher_auth_url(),
      pong_timeout: 6000,
      unavailable_timeout: 2000,
      auth: {
        headers: {
          'X-User-Token': this.userToken
        }
      }
    };
    this.pusher = new Pusher(gon.pusher.key, pusherOptions);
    this.makeSubscriptions();
  }

  MessagingService.prototype.makeSubscriptions = function() {
    this.channel = this.pusher.subscribe("private-" + this.userID + "-messaging");
    this.channel.bind(Constants.messaging.CONNECT_SUCCESS, this.onConnectionSuccess);
    this.channel.bind(Constants.messaging.CONNECT_FAIL, this.onConnectionFail);
    this.channel.bind(Constants.messaging.UPDATE_STATUS, this.onUpdateStatus);
    this.channel.bind(Constants.messaging.UPDATE_CONVERSATION, this.onUpdateConversation);
    this.channel.bind(Constants.messaging.PUSH_MESSAGE, this.onPushMessage);
    this.channel.bind(Constants.messaging.UPDATE_MESSAGES, this.onUpdateMessages);
    this.channel.bind(Constants.messaging.PUSH_NOTIFICATION, this.onPushNotification);
    return this.channel.bind(Constants.messaging.UPDATE_NOTIFICATIONS, this.onUpdateNotifications);
  };

  MessagingService.prototype.onConnectionSuccess = function() {
    return Api.messaging.ready(this.pusher.connection.socket_id).then(function() {
      return console.log('Welcome to the Matrix, Neo');
    });
  };

  MessagingService.prototype.onConnectionFail = function() {
    return NotifyController.notifyError(i18n.t('messages.messenger_connection_error'));
  };

  MessagingService.prototype.onUpdateStatus = function(status) {
    return AppDispatcher.handleServerAction({
      type: Constants.messaging.UPDATE_STATUS,
      status: status
    });
  };

  MessagingService.prototype.onUpdateConversation = function(conversation) {
    return AppDispatcher.handleServerAction({
      type: Constants.messaging.UPDATE_CONVERSATION,
      conversation: conversation
    });
  };

  MessagingService.prototype.onPushMessage = function(message) {
    return AppDispatcher.handleServerAction({
      type: Constants.messaging.PUSH_MESSAGE,
      message: message
    });
  };

  MessagingService.prototype.onUpdateMessages = function(data) {
    return AppDispatcher.handleServerAction({
      type: Constants.messaging.UPDATE_MESSAGES,
      messages: data.messages
    });
  };

  MessagingService.prototype.onPushNotification = function(notification) {
    return AppDispatcher.handleServerAction({
      type: Constants.messaging.PUSH_NOTIFICATION,
      notification: notification
    });
  };

  MessagingService.prototype.onUpdateNotifications = function(data) {
    return AppDispatcher.handleServerAction({
      type: Constants.messaging.UPDATE_NOTIFICATIONS,
      notifications: data.notifications
    });
  };

  return MessagingService;

})(EventEmitter);

module.exports = MessagingService;


},{"../api/api":17,"../constants/constants":210,"../controllers/notify":218,"../dispatcher/dispatcher":220}],235:[function(require,module,exports){
var BaseStore, CHANGE_EVENT,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CHANGE_EVENT = 'change';

BaseStore = (function(superClass) {
  extend(BaseStore, superClass);

  function BaseStore() {
    return BaseStore.__super__.constructor.apply(this, arguments);
  }

  BaseStore.prototype.emitChange = function() {
    return this.emit(CHANGE_EVENT);
  };

  BaseStore.prototype.addChangeListener = function(cb) {
    return this.on(CHANGE_EVENT, cb);
  };

  BaseStore.prototype.removeChangeListener = function(cb) {
    return this.off(CHANGE_EVENT, cb);
  };

  return BaseStore;

})(EventEmitter);

module.exports = BaseStore;


},{}],236:[function(require,module,exports){
var AppDispatcher, BaseStore, Constants, ConversationStore, _, _conversations, _currentID, assign;

_ = require('lodash');

assign = require('react/lib/Object.assign');

BaseStore = require('./_base');

Constants = require('../constants/constants');

AppDispatcher = require('../dispatcher/dispatcher');

_currentID = null;

_conversations = {};

ConversationStore = assign(new BaseStore(), {
  initSingular: function(conversation) {
    _conversations = {};
    _currentID = conversation.id;
    return _conversations[conversation.id] = conversation;
  },
  initPlural: function(conversations) {
    _conversations = {};
    return _.forEach(conversations, function(item) {
      return _conversations[item.id] = item;
    });
  },
  get: function(id) {
    return _conversations[id];
  },
  getAll: function() {
    return _conversations;
  },
  setCurrentID: function(id) {
    _currentID = id;
    return this.emitChange();
  },
  getAllChrono: function() {
    var orderedConversations;
    orderedConversations = [];
    _.forEach(_conversations, function(item) {
      if (item.last_message != null) {
        return orderedConversations.push(item);
      }
    });
    orderedConversations = _.sortBy(orderedConversations, function(item) {
      var ref;
      return -((ref = item.last_message) != null ? ref.id : void 0);
    });
    return orderedConversations;
  },
  getCurrentID: function() {
    return _currentID;
  },
  getCurrent: function() {
    return this.get(this.getCurrentID());
  }
});

module.exports = ConversationStore;

ConversationStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action;
  action = payload.action;
  switch (action.type) {
    case Constants.messenger.CREATE_CONVERSATION:
      _currentID = action.conversation.id;
      _conversations[action.conversation.id] = action.conversation;
      return ConversationStore.emitChange();
    case Constants.messenger.OPEN_CONVERSATION:
      _currentID = action.convID;
      return ConversationStore.emitChange();
    case Constants.messaging.UPDATE_CONVERSATION:
      _conversations[action.conversation.id] = action.conversation;
      return ConversationStore.emitChange();
  }
});


},{"../constants/constants":210,"../dispatcher/dispatcher":220,"./_base":235,"lodash":"lodash","react/lib/Object.assign":339}],237:[function(require,module,exports){
var AppDispatcher, BaseStore, Constants, CurrentUserStore, _currentUser, assign, extendByMockData;

assign = require('react/lib/Object.assign');

BaseStore = require('./_base');

Constants = require('../constants/constants');

AppDispatcher = require('../dispatcher/dispatcher');

_currentUser = null;

extendByMockData = function(user) {
  if ((typeof AppStorage !== "undefined" && AppStorage !== null ? AppStorage.getItem('userLogged') : void 0) === 'true') {
    if (AppStorage.getItem('userToken')) {
      user.api_key.access_token = AppStorage.getItem('userToken');
    }
    if (AppStorage.getItem('userId')) {
      user.id = parseInt(AppStorage.getItem('userId'));
    }
  }
  return user;
};

CurrentUserStore = assign(new BaseStore(), {
  initialize: function(user) {
    if (user != null) {
      user = extendByMockData(user);
      _currentUser = user;
      return typeof console.debug === "function" ? console.debug('Залогинен пользователь:', user.slug) : void 0;
    } else {
      _currentUser = null;
      return typeof console.debug === "function" ? console.debug('Без пользователя') : void 0;
    }
  },
  isLogged: function() {
    return _currentUser != null;
  },
  getUser: function() {
    return _currentUser;
  },
  getAccessToken: function() {
    return _currentUser != null ? _currentUser.api_key.access_token : void 0;
  },
  update: function(user) {
    return assign(_currentUser, user);
  }
});

module.exports = CurrentUserStore;

CurrentUserStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action;
  action = payload.action;
  switch (action.type) {
    case Constants.currentUser.UPDATE:
      CurrentUserStore.update(action.user);
      return CurrentUserStore.emitChange();
    case Constants.currentUser.CANCEL_EMAIL_CONFIRMATION:
      CurrentUserStore.update({
        confirmation_email: null
      });
      return CurrentUserStore.emitChange();
    case Constants.currentUser.UPDATE_AVATAR:
      CurrentUserStore.update({
        userpic: action.userpic
      });
      return CurrentUserStore.emitChange();
  }
});


},{"../constants/constants":210,"../dispatcher/dispatcher":220,"./_base":235,"react/lib/Object.assign":339}],238:[function(require,module,exports){
var AppDispatcher, BaseStore, Constants, FeedStore, _entries, _everythingLoaded, assign, pushEntries;

assign = require('react/lib/Object.assign');

BaseStore = require('./_base');

Constants = require('../constants/constants');

AppDispatcher = require('../dispatcher/dispatcher');

_entries = [];

_everythingLoaded = false;

pushEntries = function(entries) {
  return _entries = _entries.concat(entries);
};

FeedStore = assign(new BaseStore(), {
  initialize: function(entries) {
    _entries = entries;
    return _everythingLoaded = false;
  },
  getEntries: function() {
    return _entries;
  },
  isEverythingLoaded: function() {
    return _everythingLoaded;
  }
});

module.exports = FeedStore;

FeedStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action;
  action = payload.action;
  switch (action.type) {
    case Constants.feed.LOAD_ENTRIES:
      if (action.entries.length) {
        pushEntries(action.entries);
      } else {
        _everythingLoaded = true;
      }
      return FeedStore.emitChange();
  }
});


},{"../constants/constants":210,"../dispatcher/dispatcher":220,"./_base":235,"react/lib/Object.assign":339}],239:[function(require,module,exports){
var AppDispatcher, BaseStore, Constants, ConversationStore, CurrentUserStore, MessageStore, _, _localMessages, _messages, addLocalMessage, addRemoteMessage, assign;

_ = require('lodash');

assign = require('react/lib/Object.assign');

BaseStore = require('./_base');

ConversationStore = require('./conversation');

CurrentUserStore = require('./currentUser');

Constants = require('../constants/constants');

AppDispatcher = require('../dispatcher/dispatcher');

_messages = {};

_localMessages = {};

addLocalMessage = function(convID, messageText, messageFiles, uuid) {
  var conversation, currentUser, localMessage, recipient;
  conversation = ConversationStore.get(convID);
  currentUser = CurrentUserStore.getUser();
  recipient = conversation.recipient;
  localMessage = {
    content: messageText,
    content_html: _.escape(messageText),
    files: messageFiles,
    created_at: new Date().toISOString(),
    conversation_id: convID,
    recipient_id: recipient.id,
    user_id: currentUser.id,
    sendingError: false,
    uuid: uuid
  };
  return _localMessages[uuid] = localMessage;
};

addRemoteMessage = function(message) {
  _messages[message.id] = message;
  return delete _localMessages[message.uuid];
};

MessageStore = assign(new BaseStore(), {
  initialize: function(messages) {
    _messages = {};
    return _.forEach(messages, function(item) {
      return _messages[item.id] = item;
    });
  },
  get: function(id) {
    return _messages[id];
  },
  getAll: function() {
    return _messages;
  },
  getAllForThread: function(conversationID) {
    var convMessages;
    convMessages = [];
    _.forEach(_messages, function(item) {
      if (item.conversation_id === conversationID) {
        return convMessages.push(item);
      }
    });
    _.forEach(_localMessages, function(item) {
      if (item.conversation_id === conversationID) {
        return convMessages.push(item);
      }
    });
    convMessages = _.sortBy(convMessages, function(item) {
      return new Date(item.created_at).getTime();
    });
    return convMessages;
  },
  getAllForCurrentThread: function() {
    return this.getAllForThread(ConversationStore.getCurrentID());
  },
  getUnreadIDs: function(convID) {
    var conversation, messages, recipient, unreadIDs;
    conversation = ConversationStore.get(convID);
    messages = this.getAllForThread(convID);
    recipient = conversation.recipient;
    unreadIDs = [];
    _.forEach(messages, function(item) {
      if (item.read_at === null && recipient.id !== item.recipient_id) {
        return unreadIDs.push(item.id);
      }
    });
    return unreadIDs;
  },
  getInfo: function(message, convID) {
    var conversation, currentUser, messageInfo, recipient;
    conversation = ConversationStore.get(convID);
    currentUser = CurrentUserStore.getUser();
    recipient = conversation.recipient;
    if (recipient.id === message.recipient_id) {
      messageInfo = {
        type: 'outgoing',
        user: currentUser
      };
    } else {
      messageInfo = {
        type: 'incoming',
        user: recipient
      };
    }
    return messageInfo;
  }
});

module.exports = MessageStore;

MessageStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action, convID, messageText, ref, uuid;
  action = payload.action;
  switch (action.type) {
    case Constants.messenger.LOAD_MESSAGES:
      _.forEach(action.messages, function(item) {
        return _messages[item.id] = item;
      });
      return MessageStore.emitChange();
    case Constants.messenger.CREATE_LOCAL_MESSAGE:
      convID = action.convID, messageText = action.messageText, uuid = action.uuid;
      addLocalMessage(convID, messageText, uuid);
      return MessageStore.emitChange();
    case Constants.messenger.CREATE_REMOTE_MESSAGE:
      addRemoteMessage(action.message);
      return MessageStore.emitChange();
    case Constants.messenger.CREATE_REMOTE_MESSAGE_FAIL:
      if ((ref = _localMessages[action.uuid]) != null) {
        ref.sendingError = true;
      }
      return MessageStore.emitChange();
    case Constants.messenger.READ_MESSAGES:
      _.forEach(action.ids, function(id) {
        var message;
        message = _messages[id];
        if (message != null) {
          return message.read_at = new Date().toISOString();
        }
      });
      return MessageStore.emitChange();
    case Constants.messaging.PUSH_MESSAGE:
      addRemoteMessage(action.message);
      return MessageStore.emitChange();
    case Constants.messaging.UPDATE_MESSAGES:
      _.forEach(action.messages, function(item) {
        return _.extend(_messages[item.id], item);
      });
      return MessageStore.emitChange();
  }
});


},{"../constants/constants":210,"../dispatcher/dispatcher":220,"./_base":235,"./conversation":236,"./currentUser":237,"lodash":"lodash","react/lib/Object.assign":339}],240:[function(require,module,exports){
var AppDispatcher, BaseStore, Constants, MessagingStatusStore, _, _messagingStatus, assign;

_ = require('lodash');

assign = require('react/lib/Object.assign');

BaseStore = require('./_base');

Constants = require('../constants/constants');

AppDispatcher = require('../dispatcher/dispatcher');

_messagingStatus = {
  activeConversationsCount: 0,
  unreadConversationsCount: 0,
  unreadNotificationsCount: 0
};

MessagingStatusStore = assign(new BaseStore(), {
  getUnreadConversationsCount: function() {
    return _messagingStatus.unreadConversationsCount;
  },
  getActiveConversationsCount: function() {
    return _messagingStatus.activeConversationsCount;
  },
  getUnreadNotificationsCount: function() {
    return _messagingStatus.unreadNotificationsCount;
  }
});

module.exports = MessagingStatusStore;

MessagingStatusStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action;
  action = payload.action;
  switch (action.type) {
    case Constants.messaging.UPDATE_STATUS:
      _messagingStatus = action.status;
      return MessagingStatusStore.emitChange();
  }
});


},{"../constants/constants":210,"../dispatcher/dispatcher":220,"./_base":235,"lodash":"lodash","react/lib/Object.assign":339}],241:[function(require,module,exports){
var AppDispatcher, BaseStore, Constants, NotificationStore, _, _everythingLoaded, _notifications, assign;

_ = require('lodash');

assign = require('react/lib/Object.assign');

BaseStore = require('./_base');

Constants = require('../constants/constants');

AppDispatcher = require('../dispatcher/dispatcher');

_notifications = {};

_everythingLoaded = false;

NotificationStore = assign(new BaseStore(), {
  initialize: function(notifications) {
    _notifications = {};
    return _.forEach(notifications, function(item) {
      return _notifications[item.id] = item;
    });
  },
  getAll: function() {
    return _notifications;
  },
  getAllChrono: function() {
    var notifications;
    notifications = [];
    _.forEach(_notifications, function(item) {
      return notifications.push(item);
    });
    notifications = _.sortBy(notifications, function(item) {
      return -item.id;
    });
    return notifications;
  },
  isEverythingLoaded: function() {
    return _everythingLoaded;
  }
});

module.exports = NotificationStore;

NotificationStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action;
  action = payload.action;
  switch (action.type) {
    case Constants.notifications.LOAD:
      if (action.notifications.length) {
        _.forEach(action.notifications, function(item) {
          return _notifications[item.id] = item;
        });
      } else {
        _everythingLoaded = true;
      }
      return NotificationStore.emitChange();
    case Constants.notifications.READ:
      _.extend(_notifications[action.notification.id], action.notification);
      return NotificationStore.emitChange();
    case Constants.notifications.READ_ALL:
      _.forEach(action.notifications, function(item) {
        return _.extend(_notifications[item.id], item);
      });
      return NotificationStore.emitChange();
    case Constants.messaging.PUSH_NOTIFICATION:
      _notifications[action.notification.id] = action.notification;
      return NotificationStore.emitChange();
    case Constants.messaging.UPDATE_NOTIFICATIONS:
      _.forEach(action.notifications, function(item) {
        return _.extend(_notifications[item.id], item);
      });
      return NotificationStore.emitChange();
  }
});


},{"../constants/constants":210,"../dispatcher/dispatcher":220,"./_base":235,"lodash":"lodash","react/lib/Object.assign":339}],242:[function(require,module,exports){
var AppDispatcher, BaseStore, Constants, RelationshipsStore, _relationships, assign, updateStatus;

assign = require('react/lib/Object.assign');

BaseStore = require('./_base');

Constants = require('../constants/constants');

AppDispatcher = require('../dispatcher/dispatcher');

_relationships = {};

updateStatus = function(arg) {
  var status, userId;
  userId = arg.userId, status = arg.status;
  return _relationships[userId] = status;
};

RelationshipsStore = assign(new BaseStore(), {
  getStatus: function(userId) {
    return _relationships[userId];
  }
});

module.exports = RelationshipsStore;

RelationshipsStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action, relationship, userId;
  action = payload.action;
  switch (action.type) {
    case Constants.relationship.UPDATE_RELATIONSHIP:
      userId = action.userId, relationship = action.relationship;
      updateStatus({
        userId: userId,
        status: relationship.state
      });
      return RelationshipsStore.emitChange();
  }
});


},{"../constants/constants":210,"../dispatcher/dispatcher":220,"./_base":235,"react/lib/Object.assign":339}],243:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var gon = {
  version: 'static-development',
  env: 'static-development',
  host: AppStorage.getItem('host') || 'http://taaasty.com/',
  api_host: AppStorage.getItem('api_host') || 'http://taaasty.com/api/',
  localesPath: '../locales',
  localesVersion: '1.0.0',
  locale: 'en',
  // taaasty development app
  pusher: {
    key: '40dbf1d864d4b366b5e6'
  },
  user: {
    "id": parseInt(AppStorage.getItem('userId')) || 232992,
    "locale": "ru",
    "name": "sergeylaptev",
    "slug": "sergeylaptev",
    "title": "",
    "is_female": false,
    "is_daylog": false,
    "tlog_url": "http://taaasty.com/~sergeylaptev",
    "created_at": "2014-06-18T14:27:22.000+04:00",
    "updated_at": "2015-04-25T02:09:59.000+03:00",
    "is_premium": true,
    "has_design_bundle": true,
    "total_entries_count": 63,
    "private_entries_count": 55,
    "public_entries_count": 8,
    "saw_guide": true,
    "saw_guide_design": false,
    "is_privacy": true,
    "confirmation_email": null,
    "email": "sergeylaptev@gmail.com",
    "is_confirmed": false,
    "available_notifications": true,
    "authentications": [{
      "id": 5,
      "provider": "vkontakte",
      "uid": "17202124",
      "name": "Сергей Лаптев",
      "sex": null,
      "image": "https://pp.vk.me/c618020/v6180202/50e6/UtWWgge-iQc.jpg",
      "url": "http://vk.com/serlaptev"
    }],
    "api_key": {
      "access_token": AppStorage.getItem('userToken') || "dasd;lkCKJ123",
      "user_id": 232992,
      "expires_at": "2015-01-04T18:07:07.000+03:00"
    },
    "design": {
      "headerFont": "nautilus",
      "headerSize": "middle",
      "headerColor": "#efa114",
      "backgroundColor": "#6c7a89",
      "backgroundImageUrl": "http://taaasty.com/assets/bgs/99/0f/2565_original.jpeg",
      "backgroundId": 2565,
      "backgroundImageEnabled": true,
      "backgroundAlignment": "justify",
      "feedBackgroundColor": "#6c7a89",
      "feedFont": "ptsans",
      "feedFontColor": "#c6c9cc",
      "feedOpacity": 0.95,
      "version": 1,
      "headColor": "white",
      "feedColor": "white",
      "fontType": "sans",
      "background_url": "http://taaasty.com/assets/bgs/99/0f/2565_original.jpeg"
    },
    "userpic": {
      "original_url": "http://taaasty.com/assets/userpic/6d/ec/232992_original.jpeg",
      "large_url": "http://taaasty.com/assets/userpic/6d/ec/232992_large.jpeg",
      "thumb128_url": "http://taaasty.com/assets/userpic/6d/ec/232992_thumb128.jpeg",
      "thumb64_url": "http://taaasty.com/assets/userpic/6d/ec/232992_thumb64.jpeg",
      "thumbor_path": "userpic/6d/ec/232992_original.jpeg",
      "symbol": "s",
      "kind": "user",
      "default_colors": {
        "background": "#b5c31e",
        "name": "#ffffff"
      }
    },
    "features": {
      "search": true,
      "notification": false
    }
  }
};

exports['default'] = gon;
module.exports = exports['default'];

},{}],244:[function(require,module,exports){
(function (global){
global.$ = global.jQuery = require('jquery');

global.React = require('react');

global.EventEmitter = require('eventEmitter');

global.Pusher = require('pusher');

global.moment = require('moment');


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"eventEmitter":"eventEmitter","jquery":"jquery","moment":337,"pusher":"pusher","react":"react"}],245:[function(require,module,exports){
var BrowserHelpers;

BrowserHelpers = {
  whichTransitionEvent: function() {
    var el, t, transitions;
    el = document.createElement('fakeelement');
    transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };
    for (t in transitions) {
      if (el.style[t] != null) {
        return transitions[t];
      }
    }
  },
  isSupportsOrientationChangeEvent: function() {
    return typeof window.orientation === 'number';
  },
  getCurrentOrientation: function() {
    var orientation;
    if (this.isSupportsOrientationChangeEvent()) {
      switch (window.orientation) {
        case 0:
        case 180:
          return 'Portrait';
        case -90:
        case 90:
          return 'Landscape';
      }
    } else {
      orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
      switch (false) {
        case !/portrait/.test(orientation):
          return 'Portrait';
        case !/landscape/.test(orientation):
          return 'Landscape';
      }
    }
  },
  createObjectURL: function(file) {
    if (window.URL && window.URL.createObjectURL) {
      return window.URL.createObjectURL(file);
    } else if (window.webkitURL) {
      return window.webkitURL.createObjectURL(file);
    } else {
      return null;
    }
  },
  revokeObjectURL: function(str) {
    if (window.URL && window.URL.revokeObjectURL) {
      return window.URL.revokeObjectURL(str);
    } else if (window.webkitURL) {
      return window.webkitURL.revokeObjectURL(str);
    } else {
      return null;
    }
  }
};

module.exports = BrowserHelpers;


},{}],246:[function(require,module,exports){
var NumberHelpers;

NumberHelpers = {
  formatNumber: function(rawNumber, round, delimiter) {
    var number;
    if (delimiter == null) {
      delimiter = ' ';
    }
    number = parseInt(rawNumber);
    if (round != null) {
      number = Math.ceil(number / round) * round;
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
  },
  reduceNumber: function(rawNumber, delimiter) {
    var number;
    if (delimiter == null) {
      delimiter = ' ';
    }
    number = parseInt(rawNumber);
    if (number > 1000) {
      number = Math.floor(number / 1000) + 'k+';
    }
    return number;
  }
};

module.exports = NumberHelpers;


},{}],247:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var any = _react.PropTypes.any;
var bool = _react.PropTypes.bool;
var number = _react.PropTypes.number;
var object = _react.PropTypes.object;
var oneOf = _react.PropTypes.oneOf;
var shape = _react.PropTypes.shape;
var string = _react.PropTypes.string;
var tlog = shape({
  id: number.isRequired,
  name: string.isRequired,
  slug: string.isRequired,
  design: object.isRequired,
  is_privacy: bool.isRequired,
  public_tlog_entries_count: number.isRequired,
  can_edit: bool,
  can_write: bool
});

exports.tlog = tlog;
var flow = tlog;

exports.flow = flow;
var pagination = shape({
  type: string.isRequired,
  currentPage: number.isRequired,
  totalPagesCount: number.isRequired
});

exports.pagination = pagination;
// TODO: specify required fields and type of position field
var relationship = shape({
  id: number,
  position: any,
  reader_id: number,
  state: string,
  user_id: number
});

exports.relationship = relationship;
var gender = oneOf(['f', 'm']);

var userpicData = shape({
  kind: string.isRequired,
  original_url: string,
  symbol: string
});

var heroUser = shape({
  gender: gender,
  created_at: string.isRequired,
  features: shape({
    flows: bool.isRequired,
    notification: bool.isRequired,
    search: bool.isRequired
  }),
  has_design_bundle: bool.isRequired,
  id: number.isRequired,
  is_daylog: bool.isRequired,
  is_female: bool.isRequired,
  is_flow: bool.isRequired,
  is_premium: bool.isRequired,
  is_privacy: bool.isRequired,
  locale: string.isRequired,
  name: string.isRequired,
  private_entries_count: number.isRequired,
  public_entries_count: number.isRequired,
  slug: string.isRequired,
  tag: string.isRequired,
  title: string,
  tlog_url: string.isRequired,
  total_entries_count: number.isRequired,
  updated_at: string.isRequired,
  userpic: _extends({
    default_colors: shape({
      background: string,
      name: string
    })
  }, userpicData, {
    large_url: string,
    thumb128_url: string,
    thumb64_url: string,
    thumbor_path: string.isRequired
  })
});

exports.heroUser = heroUser;
var tlogData = shape({
  id: number.isRequired,
  tag: string.isRequired,
  url: string.isRequired,
  userpic: userpicData.isRequired
});

exports.tlogData = tlogData;
var tlogEntry = shape({
  author: tlogData.isRequired,
  can_delete: bool,
  can_edit: bool,
  can_favorite: bool,
  can_moderate: bool,
  can_report: bool,
  can_vote: bool,
  can_watch: bool,
  comments_count: number.isRequired,
  id: number.isRequired,
  is_favorited: bool,
  is_voteable: bool,
  is_watching: bool,
  preview_image: shape({
    geometry: shape({
      height: number.isRequired,
      width: number.isRequired
    }),
    url: string.isRequired
  }).isRequired,
  rating: object.isRequired,
  title_truncated: string.isRequired,
  tlog: tlogData.isRequired,
  type: string.isRequired,
  url: string.isRequired
});
exports.tlogEntry = tlogEntry;

},{"babel-runtime/helpers/extends":275,"react":"react"}],248:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Spinner = require('./Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var FitSpinner = (function () {
  function FitSpinner() {
    _classCallCheck(this, FitSpinner);
  }

  _createClass(FitSpinner, [{
    key: 'fitSize',
    value: function fitSize(size) {
      var knownSizes = [8, 14, 24, 30, 70];
      var lesserSizes = knownSizes.filter(function (s) {
        return s <= size - 4;
      }); // -4px for padding

      return lesserSizes[lesserSizes.length - 1];
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(_Spinner2['default'], { size: this.fitSize(this.props.size) });
    }
  }]);

  return FitSpinner;
})();

FitSpinner.propTypes = {
  size: _react.PropTypes.number
};

exports['default'] = FitSpinner;
module.exports = exports['default'];

},{"./Spinner":250,"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/interop-require-default":278,"react":"react"}],249:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImageloader = require('react-imageloader');

var _reactImageloader2 = _interopRequireDefault(_reactImageloader);

var _FitSpinner = require('./FitSpinner');

var _FitSpinner2 = _interopRequireDefault(_FitSpinner);

var Image = (function () {
  function Image() {
    _classCallCheck(this, Image);
  }

  _createClass(Image, [{
    key: 'renderPreloader',
    value: function renderPreloader() {
      var style = this.getSize();
      var width = style.width;
      var height = style.height;

      // 28 - 4 = 24 maximum spinner size for loader
      return _react2['default'].createElement(
        'div',
        { className: 'image-loader-spinner', style: style },
        _react2['default'].createElement(_FitSpinner2['default'], { size: Math.min(height, width, 28) })
      );
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      var _props = this.props;
      var geometry = _props.image.geometry;
      var maxWidth = _props.maxWidth;
      var maxHeight = _props.maxHeight;

      return Image.getSize(_extends({}, geometry, {
        maxWidth: maxWidth,
        maxHeight: maxHeight
      }));
    }
  }, {
    key: 'getUrl',
    value: function getUrl() {
      var size = this.getSize();
      return ThumborService.newImageUrl(this.props.image.url, size);
    }
  }, {
    key: 'getRetinaUrl',
    value: function getRetinaUrl() {
      var size = this.getSize();
      return ThumborService.newRetinaImageUrl(this.props.image.url, size);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var className = _props2.className;
      var url = _props2.image.url;
      var isRawUrl = _props2.isRawUrl;

      var style = this.getSize();
      var imgProps = {
        className: className,
        style: style,
        srcSet: isRawUrl ? void 0 : this.getRetinaUrl()
      };

      return _react2['default'].createElement(_reactImageloader2['default'], {
        imgProps: imgProps,
        preloader: this.renderPreloader.bind(this),
        src: isRawUrl ? url : this.getUrl(),
        style: style
      });
    }
  }]);

  return Image;
})();

Image.propTypes = {
  className: _react.PropTypes.string,
  image: _react.PropTypes.shape({
    geometry: _react.PropTypes.object,
    url: _react.PropTypes.string.isRequired
  }).isRequired,
  isRawUrl: _react.PropTypes.bool,
  maxHeight: _react.PropTypes.number,
  maxWidth: _react.PropTypes.number
};

Image.getSize = function getSize(_ref) {
  var width = _ref.width;
  var height = _ref.height;
  var maxWidth = _ref.maxWidth;
  var maxHeight = _ref.maxHeight;

  if (width && height) {
    if (maxWidth || maxHeight) {
      var tMaxWidth = maxWidth || maxHeight;
      var tMaxHeight = maxHeight || maxWidth;

      var calcWidth = undefined,
          calcHeight = undefined,
          ratio = undefined;

      if (width > tMaxWidth) {
        ratio = tMaxWidth / width;
        calcWidth = tMaxWidth;
        calcHeight = height * ratio;
      } else if (height > tMaxHeight) {
        ratio = tMaxHeight / height;
        calcHeight = tMaxHeight;
        calcWidth = width * ratio;
      } else {
        calcWidth = width;
        calcHeight = height;
      }

      return {
        width: parseInt(calcWidth, 10),
        height: parseInt(calcHeight, 10)
      };
    } else {
      return {
        width: width,
        height: height
      };
    }
  } else {
    return {
      width: maxWidth || null,
      height: maxHeight || null
    };
  }
};

exports['default'] = Image;
module.exports = exports['default'];

},{"./FitSpinner":248,"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/extends":275,"babel-runtime/helpers/interop-require-default":278,"react":"react","react-imageloader":338}],250:[function(require,module,exports){
"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/** 
Известные размеры:
 - 8x8
 - 14x14
 - 24x24
 - 30x30
 - 70x70
*/

var propTypes = {
  size: _react.PropTypes.number
};

var defaultProps = {
  size: 8
};

var Spinner = (function () {
  function Spinner() {
    _classCallCheck(this, Spinner);
  }

  _createClass(Spinner, [{
    key: "getSize",
    value: function getSize(size) {
      return size + "x" + size;
    }
  }, {
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "span",
        { className: "spinner spinner--" + this.getSize(this.props.size) },
        _react2["default"].createElement("span", { className: "spinner__icon" })
      );
    }
  }]);

  return Spinner;
})();

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

exports["default"] = Spinner;
module.exports = exports["default"];

},{"babel-runtime/helpers/class-call-check":273,"babel-runtime/helpers/create-class":274,"babel-runtime/helpers/interop-require-default":278,"react":"react"}],251:[function(require,module,exports){
var Collage, CollageMixin, CollageRow, PropTypes;

CollageMixin = require('./mixins/collage');

CollageRow = require('./row');

PropTypes = React.PropTypes;

Collage = React.createClass({
  displayName: 'Collage',
  mixins: [CollageMixin],
  propTypes: {
    images: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    minRowHeight: PropTypes.number.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "collage"
    }, this.renderItems());
  },
  renderItems: function() {
    var images, rows;
    images = this.props.images;
    switch (false) {
      case images.length !== 0:
        return [];
      case images.length !== 1:
        rows = this.makeRows(images);
        return React.createElement(CollageRow, {
          "row": rows[0]
        });
      case !(images.length >= 2):
        rows = this.makeRows(images);
        return rows.map(function(row, i) {
          return React.createElement(CollageRow, {
            "row": row,
            "key": i
          });
        });
      default:
        return [];
    }
  }
});

module.exports = Collage;


},{"./mixins/collage":253,"./row":254}],252:[function(require,module,exports){
var Collage, CollageManager, MARGIN, MIN_ROW_HEIGHT, PropTypes;

Collage = require('./collage');

PropTypes = React.PropTypes;

MARGIN = 0;

MIN_ROW_HEIGHT = 150;

CollageManager = React.createClass({
  displayName: 'CollageManager',
  propTypes: {
    images: PropTypes.array.isRequired,
    width: PropTypes.number,
    margin: PropTypes.number,
    minRowHeight: PropTypes.number,
    recalculation: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      margin: MARGIN,
      minRowHeight: MIN_ROW_HEIGHT
    };
  },
  getInitialState: function() {
    return {
      width: this.props.width || null
    };
  },
  componentDidMount: function() {
    if (!this.props.width) {
      this.updateWidthState();
    }
    if (this.props.recalculation) {
      return window.addEventListener('resize', this.updateWidthState);
    }
  },
  componentWillUnmount: function() {
    if (this.props.recalculation) {
      return window.removeEventListener('resize', this.updateWidthState);
    }
  },
  render: function() {
    if (this.hasWidth()) {
      return React.createElement(Collage, React.__spread({}, this.props, {
        "width": this.state.width
      }));
    } else {
      return React.createElement("span", null);
    }
  },
  hasWidth: function() {
    return this.state.width != null;
  },
  updateWidthState: function() {
    var parentWidth;
    parentWidth = this.getDOMNode().parentNode.offsetWidth;
    return this.setState({
      width: parentWidth + this.props.margin * 2
    });
  }
});

module.exports = CollageManager;


},{"./collage":251}],253:[function(require,module,exports){
var CollageMixin, assign;

assign = require('react/lib/Object.assign');

CollageMixin = {
  makeRows: function(images) {
    var newImages, rowIndex, rowWidth, rows;
    rows = [];
    rowIndex = 0;
    rowWidth = 0;
    newImages = JSON.parse(JSON.stringify(images));
    this.calculateImagesRatio(newImages);
    newImages.forEach((function(_this) {
      return function(image, i) {
        assign(image, {
          width: _this.getItemNewWidth(image, _this.props.minRowHeight),
          height: _this.props.minRowHeight,
          margin: _this.props.margin
        });
        if (i === 0 || rowWidth + image.width < _this.props.width) {
          if (rows[rowIndex] == null) {
            rows[rowIndex] = [];
          }
          rows[rowIndex].push(image);
          rowWidth += image.width + image.margin * 2;
        } else {
          _this.stretchRow(rows[rowIndex], rowWidth);
          rows[rowIndex + 1] = [image];
          rowWidth = image.width + image.margin * 2;
          rowIndex++;
        }
        if (i === newImages.length - 1) {
          return _this.stretchRow(rows[rowIndex], rowWidth);
        }
      };
    })(this));
    return rows;
  },
  stretchRow: function(row, rowWidth) {
    var lastElement, requiredHeight, resultWidth, rowHeight;
    rowHeight = row[0].height + row[0].margin * 2;
    requiredHeight = Math.round(rowHeight / rowWidth * this.props.width);
    resultWidth = 0;
    lastElement = row[row.length - 1];
    row.forEach((function(_this) {
      return function(image, i) {
        assign(image, {
          width: _this.getItemNewWidth(image, requiredHeight - _this.props.margin * 2),
          height: requiredHeight - _this.props.margin * 2
        });
        return resultWidth += image.width + image.margin * 2;
      };
    })(this));
    return lastElement.width = lastElement.width + lastElement.margin * 2 + (this.props.width - resultWidth) - this.props.margin * 2;
  },
  getItemNewWidth: function(item, newHeight) {
    return Math.round(newHeight * item.ratio);
  },
  calculateImagesRatio: function(images) {
    return images.forEach(function(image) {
      return image.ratio = image.width / image.height;
    });
  }
};

module.exports = CollageMixin;


},{"react/lib/Object.assign":339}],254:[function(require,module,exports){
var CollageRow, CollageRowItem, PropTypes;

CollageRowItem = require('./row/item');

PropTypes = React.PropTypes;

CollageRow = React.createClass({
  displayName: 'CollageRow',
  propTypes: {
    row: PropTypes.array.isRequired
  },
  render: function() {
    return React.createElement("div", {
      "className": "collage__row"
    }, this.renderRowItems());
  },
  renderRowItems: function() {
    return this.props.row.map(function(image) {
      return React.createElement(CollageRowItem, {
        "width": image.width,
        "height": image.height,
        "imagePath": image.payload.path,
        "imageUrl": image.payload.url,
        "key": image.payload.id
      });
    });
  }
});

module.exports = CollageRow;


},{"./row/item":255}],255:[function(require,module,exports){
var CollageRowItem, FitSpinner, ImageLoader, LazyLoad, PropTypes;

LazyLoad = require('react-lazy-load');

ImageLoader = require('react-imageloader');

FitSpinner = require('../../FitSpinner');

PropTypes = React.PropTypes;

CollageRowItem = React.createClass({
  displayName: 'CollageRowItem',
  propTypes: {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.number,
    imageUrl: PropTypes.string.isRequired,
    imagePath: PropTypes.string
  },
  getInitialState: function() {
    return {
      width: this.props.width,
      height: this.props.height
    };
  },
  renderPreloader: function() {
    var height, ref, width;
    ref = this.props, width = ref.width, height = ref.height;
    return React.createElement("div", {
      "className": "collage__item-spinner",
      "style": this.getImageStyles()
    }, React.createElement(FitSpinner, {
      "size": Math.min(width, height, 28)
    }));
  },
  render: function() {
    var imgProps;
    imgProps = {
      srcSet: this.getRetinaUrl(),
      style: this.getImageStyles()
    };
    return React.createElement("div", {
      "style": this.getContainerStyles(),
      "className": "collage__item"
    }, React.createElement(LazyLoad, {
      "height": this.props.height,
      "threshold": parseInt(window.innerHeight, 10)
    }, React.createElement(ImageLoader, {
      "imgProps": imgProps,
      "preloader": this.renderPreloader,
      "src": this.getUrl()
    })));
  },
  getContainerStyles: function() {
    var height, margin, ref, width;
    ref = this.props, width = ref.width, height = ref.height, margin = ref.margin;
    return {
      width: width,
      height: height,
      margin: margin
    };
  },
  getImageStyles: function() {
    var height, ref, width;
    ref = this.props, width = ref.width, height = ref.height;
    return {
      width: width,
      height: height
    };
  },
  getUrl: function() {
    var height, ref, width;
    ref = this.state, width = ref.width, height = ref.height;
    if (this.props.imageUrl && this.props.imagePath) {
      return ThumborService.imageUrl({
        url: this.props.imageUrl,
        path: this.props.imagePath,
        size: width + 'x' + height
      });
    } else {
      return this.props.imageUrl;
    }
  },
  getRetinaUrl: function() {
    var height, ref, width;
    ref = this.state, width = ref.width, height = ref.height;
    if (this.props.imageUrl && this.props.imagePath) {
      return ThumborService.retinaImageUrl({
        url: this.props.imageUrl,
        path: this.props.imagePath,
        size: {
          width: width,
          height: height
        }
      });
    } else {
      return this.props.imageUrl;
    }
  }
});

module.exports = CollageRowItem;


},{"../../FitSpinner":248,"react-imageloader":338,"react-lazy-load":"react-lazy-load"}],256:[function(require,module,exports){
"use strict";

var _extends = require("babel-runtime/helpers/extends")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var EmailField = React.createClass({
  displayName: "EmailField",

  render: function render() {
    return React.createElement(_Field2["default"], _extends({}, this.props, { type: "email" }));
  }
});

exports["default"] = EmailField;
module.exports = exports["default"];

},{"./Field":257,"babel-runtime/helpers/extends":275,"babel-runtime/helpers/interop-require-default":278}],257:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _bowser = require('bowser');

var _bowser2 = _interopRequireDefault(_bowser);

// These browsers trigger change event on autofill (http://stackoverflow.com/a/11710295)
// Anyway Safari doesn't trigger change event at all
var MINIMAL_BROWSER_VERSION = {
  'Chrome': 9,
  'Firefox': 5,
  'Safari': Infinity,
  'iPhone': Infinity,
  'iPad': Infinity,
  'Opera': 15,
  'Internet Explorer': 9
};

var Field = React.createClass({
  displayName: 'Field',

  propTypes: {
    defaultValue: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      defaultValue: ''
    };
  },

  componentDidMount: function componentDidMount() {
    if (!this.canBrowserTriggerChangeEvent()) {
      this.value = this.props.defaultValue;
      this.intervalID = setInterval(this.checkAndTriggerChangeEvent, 1000);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (!this.canBrowserTriggerChangeEvent()) {
      clearInterval(this.intervalID);
    }
  },

  render: function render() {
    return React.createElement('input', _extends({}, this.props, { onChange: this.handleChange }));
  },

  canBrowserTriggerChangeEvent: function canBrowserTriggerChangeEvent() {
    var name = _bowser2['default'].browser.name,
        version = parseFloat(_bowser2['default'].browser.version);

    return version < MINIMAL_BROWSER_VERSION[name] ? false : true;
  },

  checkAndTriggerChangeEvent: function checkAndTriggerChangeEvent() {
    var currentValue = this.getDOMNode().value;

    if (this.value != currentValue) {
      this.value = currentValue;
      this.props.onChange(currentValue);
    }
  },

  handleChange: function handleChange() {
    var currentValue = this.getDOMNode().value;
    if (!this.canBrowserTriggerChangeEvent()) this.value = currentValue;
    this.props.onChange(currentValue);
  }
});

exports['default'] = Field;
module.exports = exports['default'];

},{"babel-runtime/helpers/extends":275,"babel-runtime/helpers/interop-require-default":278,"bowser":330}],258:[function(require,module,exports){
"use strict";

var _extends = require("babel-runtime/helpers/extends")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var PasswordField = React.createClass({
  displayName: "PasswordField",

  render: function render() {
    return React.createElement(_Field2["default"], _extends({}, this.props, { type: "password" }));
  }
});

exports["default"] = PasswordField;
module.exports = exports["default"];

},{"./Field":257,"babel-runtime/helpers/extends":275,"babel-runtime/helpers/interop-require-default":278}],259:[function(require,module,exports){
"use strict";

var _extends = require("babel-runtime/helpers/extends")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var TextField = React.createClass({
  displayName: "TextField",

  render: function render() {
    return React.createElement(_Field2["default"], _extends({}, this.props, { type: "text" }));
  }
});

exports["default"] = TextField;
module.exports = exports["default"];

},{"./Field":257,"babel-runtime/helpers/extends":275,"babel-runtime/helpers/interop-require-default":278}],260:[function(require,module,exports){
var ConnectStoreMixin, _;

_ = require('lodash');

ConnectStoreMixin = function(listenableStore) {
  return {
    getInitialState: function() {
      return this.getStateFromStore();
    },
    componentWillMount: function() {
      if (_.isArray(listenableStore)) {
        return _.forEach(listenableStore, (function(_this) {
          return function(store) {
            return store.addChangeListener(_this.onStoreChange);
          };
        })(this));
      } else {
        return listenableStore.addChangeListener(this.onStoreChange);
      }
    },
    componentWillUnmount: function() {
      if (_.isArray(listenableStore)) {
        return _.forEach(listenableStore, (function(_this) {
          return function(store) {
            return store.removeChangeListener(_this.onStoreChange);
          };
        })(this));
      } else {
        return listenableStore.removeChangeListener(this.onStoreChange);
      }
    },
    onStoreChange: function() {
      return this.setState(this.getStateFromStore());
    }
  };
};

module.exports = ConnectStoreMixin;


},{"lodash":"lodash"}],261:[function(require,module,exports){
/*global gon */
'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
function prepareUrl(url) {
  return (/^\/\/\S*$/.test(url) ? 'http:' + url : url
  );
}

function filters() {
  var additional = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  var common = []; //['no_upscale()'];
  var fx = [].concat(common, _toConsumableArray(additional));
  return fx.length ? '/filters:' + fx.join(':') : '';
}

var ThumborService = {
  thumborWithUrl: gon.thumbor_http_loader ? gon.thumbor_http_loader.server_url : null,
  thumborWithPath: gon.thumbor ? gon.thumbor.server_url : null,

  newImageUrl: function newImageUrl(url, size, filtersArr) {
    url = prepareUrl(url);
    var width = size.width || '',
        height = size.height || '';

    return this.thumborWithUrl ? this.thumborWithUrl + '/unsafe/' + width + 'x' + height + filters(filtersArr) + '/' + url : url;
  },

  newRetinaImageUrl: function newRetinaImageUrl(url, size, filtersArr) {
    url = prepareUrl(url);
    var width = size.width ? size.width * 2 : '',
        height = size.height ? size.height * 2 : '';

    return this.thumborWithUrl ? this.thumborWithUrl + '/unsafe/' + width + 'x' + height + filters(filtersArr) + '/' + url + ' 2x' : url;
  },

  imageUrl: function imageUrl(_ref) {
    var url = _ref.url;
    var path = _ref.path;
    var size = _ref.size;

    return this.thumborWithPath ? this.thumborWithPath + '/unsafe/' + size + filters() + '/' + path : url;
  },

  retinaImageUrl: function retinaImageUrl(_ref2) {
    var url = _ref2.url;
    var path = _ref2.path;
    var size = _ref2.size;

    url = prepareUrl(url);
    var width = size.width ? size.width * 2 : '',
        height = size.height ? size.height * 2 : '';

    return this.thumborWithPath ? this.thumborWithPath + '/unsafe/' + width + 'x' + height + filters() + '/' + path + ' 2x' : url;
  }
};

exports['default'] = ThumborService;
module.exports = exports['default'];

},{"babel-runtime/helpers/to-consumable-array":280}],262:[function(require,module,exports){
var UuidService;

UuidService = {
  generate: function() {
    var s4;
    s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    return (s4() + s4()) + "-" + (s4()) + "-" + (s4()) + "-" + (s4()) + "-" + (s4() + s4() + s4());
  }
};

module.exports = UuidService;


},{}],263:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var AppStorage = null;

// Refer to https://gist.github.com/remy/350433
try {
  // Test webstorage existence.
  if (!window.localStorage) throw "exception";
  localStorage.setItem('storage_test', 1);
  localStorage.removeItem('storage_test');
} catch (e) {
  (function () {
    var Storage = function Storage(type) {
      function createCookie(name, value, days) {
        var date, expires;

        if (days) {
          date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          expires = "; expires=" + date.toGMTString();
        } else {
          expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
      }

      function readCookie(name) {
        var nameEQ = name + "=",
            ca = document.cookie.split(';'),
            i,
            c;

        for (i = 0; i < ca.length; i++) {
          c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);2480;
          }

          if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
          }
        }
        return null;
      }

      function setData(data) {
        // Convert data into JSON and encode to accommodate for special characters.
        data = encodeURIComponent(JSON.stringify(data));
        // Create cookie.
        if (type == 'session') {
          createCookie(getSessionName(), data, 365);
        } else {
          createCookie('localStorage', data, 365);
        }
      }

      function clearData() {
        if (type == 'session') {
          createCookie(getSessionName(), '', 365);
        } else {
          createCookie('localStorage', '', 365);
        }
      }

      function getData() {
        // Get cookie data.
        var data = type == 'session' ? readCookie(getSessionName()) : readCookie('localStorage');
        // If we have some data decode, parse and return it.
        return data ? JSON.parse(decodeURIComponent(data)) : {};
      }

      function getSessionName() {
        // If there is no name for this window, set one.
        // To ensure it's unquie use the current timestamp.
        if (!window.name) {
          window.name = new Date().getTime();
        }
        return 'sessionStorage' + window.name;
      }

      // Initialise if there's already data.
      var data = getData();

      return {
        length: 0,
        clear: function clear() {
          data = {};
          this.length = 0;
          clearData();
        },
        getItem: function getItem(key) {
          return data[key] === undefined ? null : data[key];
        },
        key: function key(i) {
          // not perfect, but works
          var ctr = 0;
          for (var k in data) {
            if (ctr == i) return k;else ctr++;
          }
          return null;
        },
        removeItem: function removeItem(key) {
          delete data[key];
          this.length--;
          setData(data);
        },
        setItem: function setItem(key, value) {
          data[key] = value + ''; // forces the value to a string
          this.length++;
          setData(data);
        }
      };
    };

    AppStorage = new Storage('local');
  })();
}

// Проблем с localStorage нет, значит AppStorage просто будет ссылаться на localStorage
if (AppStorage == null) AppStorage = window.localStorage;

exports['default'] = AppStorage;
module.exports = exports['default'];

},{}],264:[function(require,module,exports){
var ApiRoutes;

ApiRoutes = {
  omniauth_url: function(provider) {
    return gon.host + '/auth/' + provider;
  },
  iframely_url: function() {
    return gon.api_host + '/v1/embeding/iframely.json';
  },
  pusher_auth_url: function() {
    return gon.api_host + '/v1/messenger/auth';
  },
  calendar_url: function(tlogId) {
    return gon.api_host + '/v1/tlog/' + tlogId + '/calendar';
  },
  votes_url: function(entryId) {
    return gon.api_host + '/v1/entries/' + entryId + '/votes';
  },
  reposts_url: function() {
    return gon.api_host + '/v1/reposts';
  },
  embed_url: function() {
    return gon.api_host + '/v1/embed';
  },
  design_settings_url: function(slug) {
    return gon.api_host + '/v1/design_settings/' + slug;
  },
  design_settings_cover_url: function(slug) {
    return gon.api_host + '/v1/design_settings/' + slug + '/cover';
  },
  signin_url: function() {
    return gon.api_host + '/v1/sessions';
  },
  onboarding: function() {
    return gon.api_host + "/v1/onboarding";
  },
  signup_url: function() {
    return gon.api_host + '/v1/users';
  },
  update_profile_url: function() {
    return gon.api_host + '/v1/users';
  },
  recovery_url: function() {
    return gon.api_host + '/v1/users/password/recovery';
  },
  request_confirm_url: function() {
    return gon.api_host + '/v1/users/confirmation';
  },
  userpic_url: function() {
    return gon.api_host + '/v1/users/userpic';
  },
  users_predict: function() {
    return gon.api_host + '/v1/users/predict';
  },
  fb_crosspost_url: function() {
    return gon.api_host + "/v1/facebook/crossposting";
  },
  twitter_crosspost_url: function() {
    return gon.api_host + "/v1/twitter/crossposting";
  },
  create_entry_url: function(type) {
    return gon.api_host + '/v1/entries/' + type;
  },
  update_entry_url: function(entryId, entryType) {
    return gon.api_host + '/v1/entries/' + entryType + '/' + entryId;
  },
  update_images_url: function(entryId) {
    return gon.api_host + '/v1/entries/image/' + entryId + '/images';
  },
  entry_url: function(entryId) {
    return gon.api_host + '/v1/entries/' + entryId;
  },
  favorites_url: function() {
    return gon.api_host + '/v1/favorites';
  },
  watching_url: function() {
    return gon.api_host + '/v1/watching';
  },
  report_url: function(entryId) {
    return gon.api_host + '/v1/entries/' + entryId + '/report';
  },
  relationships_summary_url: function() {
    return gon.api_host + '/v1/relationships/summary';
  },
  relationships_to_url: function(state) {
    return gon.api_host + '/v1/relationships/to/' + state;
  },
  relationships_by_url: function(state) {
    return gon.api_host + '/v1/relationships/by/' + state;
  },
  relationships_by_id_url: function(tlogId) {
    return gon.api_host + '/v1/relationships/by/' + tlogId;
  },
  unfollow_from_yourself_url: function(tlogId) {
    return gon.api_host + '/v1/relationships/by/tlog/' + tlogId;
  },
  relationships_by_tlog_approve_url: function(tlogId) {
    return gon.api_host + '/v1/relationships/by/tlog/' + tlogId + '/approve';
  },
  relationships_by_tlog_disapprove_url: function(tlogId) {
    return gon.api_host + '/v1/relationships/by/tlog/' + tlogId + '/disapprove';
  },
  tlogRelationshipsBy: function(objectID, state) {
    return gon.api_host + '/v1/tlog_relationships/' + objectID + '/by/' + state;
  },
  tlogRelationshipsTo: function(objectID, state) {
    return gon.api_host + '/v1/tlog_relationships/' + objectID + '/to/' + state;
  },
  tlogRelationshipsByApprove: function(objectID, subjectID) {
    return gon.api_host + '/v1/tlog_relationships/' + objectID + '/by/tlog/' + subjectID + '/approve';
  },
  tlogRelationshipsByDisapprove: function(objectID, subjectID) {
    return gon.api_host + '/v1/tlog_relationships/' + objectID + '/by/tlog/' + subjectID + '/disapprove';
  },
  tlogRelationshipsToTlog: function(objectID, subjectID, state) {
    return gon.api_host + '/v1/tlog_relationships/' + objectID + '/to/tlog/' + subjectID + '/' + state;
  },
  tlogRelationshipsByTlog: function(objectID, subjectID) {
    return gon.api_host + '/v1/tlog_relationships/' + objectID + '/by/tlog/' + subjectID;
  },
  tlogEntries: function(tlogId) {
    return gon.api_host + '/v1/tlog/' + tlogId + '/entries';
  },
  tlogEntriesTlogs: function(tlogId) {
    return gon.api_host + '/v1/tlog/' + tlogId + '/entries/tlogs';
  },
  tlogEntriesBricks: function(tlogId) {
    return gon.api_host + '/v1/tlog/' + tlogId + '/enrties/bricks';
  },
  tlog_followers: function(tlogId) {
    return gon.api_host + '/v1/tlog/' + tlogId + '/followers';
  },
  tlog_followings: function(tlogId) {
    return gon.api_host + '/v1/tlog/' + tlogId + '/followings';
  },
  tlog_tags: function(tlogId) {
    return gon.api_host + '/v1/tlog/' + tlogId + '/tags';
  },
  tlog_report: function(tlogId) {
    return gon.api_host + '/v1/tlog/' + tlogId + '/report';
  },
  get_my_relationship_url: function(tlogId) {
    return gon.api_host + '/v1/relationships/to/tlog/' + tlogId;
  },
  comments_url: function(entryId) {
    return gon.api_host + '/v1/comments';
  },
  comments_edit_delete_url: function(commentId) {
    return gon.api_host + '/v1/comments/' + commentId;
  },
  comments_report_url: function(commentId) {
    return gon.api_host + '/v1/comments/' + commentId + '/report';
  },
  change_my_relationship_url: function(tlogId, state) {
    return gon.api_host + '/v1/relationships/to/tlog/' + tlogId + '/' + state;
  },
  messenger_ready_url: function() {
    return gon.api_host + '/v1/messenger/ready';
  },
  messengerConversationsByUserId: function(userId) {
    return gon.api_host + '/v1/messenger/conversations/by_user_id/' + userId;
  },
  messenger_new_message_url: function(conversationId) {
    return gon.api_host + '/v1/messenger/conversations/by_id/' + conversationId + '/messages';
  },
  messenger_load_messages_url: function(conversationId) {
    return gon.api_host + '/v1/messenger/conversations/by_id/' + conversationId + '/messages';
  },
  messenger_read_messages_url: function(conversationId) {
    return gon.api_host + '/v1/messenger/conversations/by_id/' + conversationId + '/messages/read';
  },
  notificationsUrl: function() {
    return gon.api_host + '/v1/messenger/notifications';
  },
  notificationsReadAllUrl: function() {
    return gon.api_host + '/v1/messenger/notifications/read';
  },
  notifications_read_url: function(id) {
    return gon.api_host + '/v1/messenger/notifications/' + id + '/read';
  },
  suggestions_vkontakte: function() {
    return gon.api_host + '/v1/relationships/suggestions/vkontakte';
  },
  suggestions_facebook: function() {
    return gon.api_host + '/v1/relationships/suggestions/facebook';
  },
  feedLive: function() {
    return gon.api_host + '/v1/feeds/live';
  },
  feedBest: function() {
    return gon.api_host + '/v1/feeds/best';
  },
  feedFriends: function() {
    return gon.api_host + '/v1/my_feeds/friends';
  },
  feedAnonymous: function() {
    return gon.api_host + '/v1/feeds/anonymous';
  },
  imageAttachments: function() {
    return gon.api_host + '/v1/image_attachments';
  },
  imageAttachmentsWithID: function(attachmentID) {
    return gon.api_host + '/v1/image_attachments/' + attachmentID;
  },
  backgrounds: function() {
    return gon.api_host + '/v1/backgrounds';
  },
  flows: function() {
    return gon.api_host + '/v1/flows';
  },
  flowsMine: function() {
    return gon.api_host + '/v1/flows/my';
  },
  flowsAvailable: function() {
    return gon.api_host + '/v1/flows/available';
  },
  flow: function(flowID) {
    return gon.api_host + '/v1/flows/' + flowID;
  },
  flowStaffs: function(flowID) {
    return gon.api_host + '/v1/flows/' + flowID + '/staffs';
  }
};

module.exports = ApiRoutes;


},{}],265:[function(require,module,exports){
var Routes;

Routes = {
  locale: function() {
    var localesPath, localesVersion, vParam;
    localesPath = gon.localesPath, localesVersion = gon.localesVersion;
    vParam = localesVersion != null ? '?v=' + localesVersion : '';
    return localesPath + '/__lng__.json' + vParam;
  },
  logout_path: function() {
    return '/logout';
  },
  tlog_favorite_entries_path: function(slug) {
    return '/~' + slug + '/favorites';
  },
  friends_feed_path: function() {
    return '/friends';
  },
  live_feed_path: function() {
    return '/live';
  },
  live_anonymous_feed_path: function() {
    return '/live/anonymous';
  },
  live_flows_feed_path: function() {
    return '/live/flows';
  },
  best_feed_path: function() {
    return '/best';
  },
  anonymous_feed_path: function() {
    return '/anonymous';
  },
  people_path: function() {
    return '/people';
  },
  new_entry_url: function(userSlug, type) {
    return "/~" + userSlug + "/new" + (type ? "#" + type : "");
  },
  new_anonymous_entry_url: function(userSlug) {
    return '/~' + userSlug + '/anonymous/new';
  },
  my_tlog_url: function(userSlug) {
    return '/~' + userSlug;
  },
  favorites_url: function(userSlug) {
    return '/~' + userSlug + '/favorites';
  },
  private_entries_url: function(userSlug) {
    return '/~' + userSlug + '/privates';
  },
  entry_edit_url: function(userSlug, entryId) {
    return '/~' + userSlug + '/edit' + '/' + entryId;
  },
  messagesUrl: function(userSlug) {
    return '/~' + userSlug + '/conversations';
  },
  notificationsUrl: function(userSlug) {
    return '/~' + userSlug + '/notifications';
  },
  userProfile: function(userSlug) {
    return '/~' + userSlug + '/profile';
  },
  userSettings: function(userSlug) {
    return '/~' + userSlug + '/settings';
  },
  userDesignSettings: function(userSlug) {
    return '/~' + userSlug + '/design_settings';
  },
  userTag: function(userSlug, tag) {
    return '/~' + userSlug + '/tags/' + tag;
  },
  tlogPagination: function(userSlug, type, page) {
    var pageParam, typeFragment;
    if (type == null) {
      type = 'tlog';
    }
    if (page == null) {
      page = 1;
    }
    pageParam = page === 1 ? '' : "?page=" + page;
    typeFragment = (function() {
      switch (type) {
        case 'tlog':
        case 'flow':
          return '';
        case 'private':
          return 'privates';
        case 'favorite':
          return 'favorites';
      }
    })();
    return "/~" + userSlug + "/" + typeFragment + pageParam;
  },
  daylogPagination: function(userSlug, page) {
    return '/~' + userSlug + '/' + page;
  },
  orders: function() {
    return '/orders';
  },
  ordersNew: function(_entryID, _type) {
    var entryID, type;
    entryID = window.encodeURIComponent(_entryID);
    type = window.encodeURIComponent(_type);
    return "/orders/new?entry_id=" + entryID + "&type=" + type;
  },
  flows: function() {
    return '/flows';
  },
  editEntry: function(userTag, entryID) {
    return '/' + userTag + '/edit/' + entryID;
  }
};

module.exports = Routes;


},{}],266:[function(require,module,exports){
/**
 * Protect window.console method calls, e.g. console is not defined on IE
 * unless dev tools are open, and IE doesn't define console.debug
 * 
 * Chrome 41.0.2272.118: debug,error,info,log,warn,dir,dirxml,table,trace,assert,count,markTimeline,profile,profileEnd,time,timeEnd,timeStamp,timeline,timelineEnd,group,groupCollapsed,groupEnd,clear
 * Firefox 37.0.1: log,info,warn,error,exception,debug,table,trace,dir,group,groupCollapsed,groupEnd,time,timeEnd,profile,profileEnd,assert,count
 * Internet Explorer 11: select,log,info,warn,error,debug,assert,time,timeEnd,timeStamp,group,groupCollapsed,groupEnd,trace,clear,dir,dirxml,count,countReset,cd
 * Safari 6.2.4: debug,error,log,info,warn,clear,dir,dirxml,table,trace,assert,count,profile,profileEnd,time,timeEnd,timeStamp,group,groupCollapsed,groupEnd
 * Opera 28.0.1750.48: debug,error,info,log,warn,dir,dirxml,table,trace,assert,count,markTimeline,profile,profileEnd,time,timeEnd,timeStamp,timeline,timelineEnd,group,groupCollapsed,groupEnd,clear
 */
(function() {
  // Union of Chrome, Firefox, IE, Opera, and Safari console methods
  var methods = ["assert", "assert", "cd", "clear", "count", "countReset",
    "debug", "dir", "dirxml", "dirxml", "dirxml", "error", "error", "exception",
    "group", "group", "groupCollapsed", "groupCollapsed", "groupEnd", "info",
    "info", "log", "log", "markTimeline", "profile", "profileEnd", "profileEnd",
    "select", "table", "table", "time", "time", "timeEnd", "timeEnd", "timeEnd",
    "timeEnd", "timeEnd", "timeStamp", "timeline", "timelineEnd", "trace",
    "trace", "trace", "trace", "trace", "warn"];
  var length = methods.length;
  var console = (window.console = window.console || {});
  var method;
  var noop = function() {};
  while (length--) {
    method = methods[length];
    // define undefined methods as noops to prevent errors
    if (!console[method])
      console[method] = noop;
  }
})();
},{}],267:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":281}],268:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":282}],269:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":283}],270:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":284}],271:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":285}],272:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":286}],273:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],274:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":270}],275:[function(require,module,exports){
"use strict";

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

exports["default"] = _Object$assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/assign":268}],276:[function(require,module,exports){
"use strict";

var _Object$getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor")["default"];

exports["default"] = function get(_x, _x2, _x3) {
  var _again = true;

  _function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;
    _again = false;
    if (object === null) object = Function.prototype;

    var desc = _Object$getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        _x = parent;
        _x2 = property;
        _x3 = receiver;
        _again = true;
        desc = parent = undefined;
        continue _function;
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  }
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/get-own-property-descriptor":271}],277:[function(require,module,exports){
"use strict";

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Object$setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of")["default"];

exports["default"] = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/create":269,"babel-runtime/core-js/object/set-prototype-of":272}],278:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],279:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
};

exports.__esModule = true;
},{}],280:[function(require,module,exports){
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

exports["default"] = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return _Array$from(arr);
  }
};

exports.__esModule = true;
},{"babel-runtime/core-js/array/from":267}],281:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/$.core').Array.from;
},{"../../modules/$.core":291,"../../modules/es6.array.from":325,"../../modules/es6.string.iterator":329}],282:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$.core').Object.assign;
},{"../../modules/$.core":291,"../../modules/es6.object.assign":326}],283:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function create(P, D){
  return $.create(P, D);
};
},{"../../modules/$":308}],284:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":308}],285:[function(require,module,exports){
var $ = require('../../modules/$');
require('../../modules/es6.object.get-own-property-descriptor');
module.exports = function getOwnPropertyDescriptor(it, key){
  return $.getDesc(it, key);
};
},{"../../modules/$":308,"../../modules/es6.object.get-own-property-descriptor":327}],286:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/$.core').Object.setPrototypeOf;
},{"../../modules/$.core":291,"../../modules/es6.object.set-prototype-of":328}],287:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],288:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":302}],289:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":290,"./$.wks":323}],290:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],291:[function(require,module,exports){
var core = module.exports = {version: '1.2.5'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],292:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":287}],293:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , PROTOTYPE = 'prototype';
var ctx = function(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
};
var $def = function(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , isProto  = type & $def.P
    , target   = isGlobal ? global : type & $def.S
        ? global[name] : (global[name] || {})[PROTOTYPE]
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    if(isGlobal && typeof target[key] != 'function')exp = source[key];
    // bind timers to global for call from export context
    else if(type & $def.B && own)exp = ctx(out, global);
    // wrap global constructors for prevent change them in library
    else if(type & $def.W && target[key] == out)!function(C){
      exp = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      exp[PROTOTYPE] = C[PROTOTYPE];
    }(out);
    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export
    exports[key] = exp;
    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
module.exports = $def;
},{"./$.core":291,"./$.global":297}],294:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],295:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":296}],296:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],297:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],298:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],299:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":308,"./$.descriptors":295,"./$.property-desc":312}],300:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":290}],301:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./$.iterators')
  , ITERATOR   = require('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return (Iterators.Array || ArrayProto[ITERATOR]) === it;
};
},{"./$.iterators":307,"./$.wks":323}],302:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],303:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":288}],304:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , descriptor     = require('./$.property-desc')
  , setToStringTag = require('./$.set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":308,"./$.hide":299,"./$.property-desc":312,"./$.set-to-string-tag":315,"./$.wks":323}],305:[function(require,module,exports){
'use strict';
var LIBRARY         = require('./$.library')
  , $def            = require('./$.def')
  , $redef          = require('./$.redef')
  , hide            = require('./$.hide')
  , has             = require('./$.has')
  , SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , Iterators       = require('./$.iterators')
  , $iterCreate     = require('./$.iter-create')
  , setToStringTag  = require('./$.set-to-string-tag')
  , getProto        = require('./$').getProto
  , BUGGY           = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR     = '@@iterator'
  , KEYS            = 'keys'
  , VALUES          = 'values';
var returnThis = function(){ return this; };
module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG      = NAME + ' Iterator'
    , proto    = Base.prototype
    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , _default = _native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if(_native){
    var IteratorPrototype = getProto(_default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
  }
  // Define iterator
  if((!LIBRARY || FORCE) && (BUGGY || !(SYMBOL_ITERATOR in proto))){
    hide(proto, SYMBOL_ITERATOR, _default);
  }
  // Plug for library
  Iterators[NAME] = _default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEFAULT == VALUES ? _default : getMethod(VALUES),
      keys:    IS_SET            ? _default : getMethod(KEYS),
      entries: DEFAULT != VALUES ? _default : getMethod('entries')
    };
    if(FORCE)for(key in methods){
      if(!(key in proto))$redef(proto, key, methods[key]);
    } else $def($def.P + $def.F * BUGGY, NAME, methods);
  }
  return methods;
};
},{"./$":308,"./$.def":293,"./$.has":298,"./$.hide":299,"./$.iter-create":304,"./$.iterators":307,"./$.library":309,"./$.redef":313,"./$.set-to-string-tag":315,"./$.wks":323}],306:[function(require,module,exports){
var ITERATOR     = require('./$.wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":323}],307:[function(require,module,exports){
module.exports = {};
},{}],308:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],309:[function(require,module,exports){
module.exports = true;
},{}],310:[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":308,"./$.fails":296,"./$.iobject":300,"./$.to-object":321}],311:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $def  = require('./$.def')
  , core  = require('./$.core')
  , fails = require('./$.fails');
module.exports = function(KEY, exec){
  var $def = require('./$.def')
    , fn   = (core.Object || {})[KEY] || Object[KEY]
    , exp  = {};
  exp[KEY] = exec(fn);
  $def($def.S + $def.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":291,"./$.def":293,"./$.fails":296}],312:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],313:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":299}],314:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":308,"./$.an-object":288,"./$.ctx":292,"./$.is-object":302}],315:[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":308,"./$.has":298,"./$.wks":323}],316:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":297}],317:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l
      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":294,"./$.to-integer":318}],318:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],319:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":294,"./$.iobject":300}],320:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":318}],321:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":294}],322:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],323:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":297,"./$.shared":316,"./$.uid":322}],324:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":289,"./$.core":291,"./$.iterators":307,"./$.wks":323}],325:[function(require,module,exports){
'use strict';
var ctx         = require('./$.ctx')
  , $def        = require('./$.def')
  , toObject    = require('./$.to-object')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
$def($def.S + $def.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , $$      = arguments
      , $$len   = $$.length
      , mapfn   = $$len > 1 ? $$[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});

},{"./$.ctx":292,"./$.def":293,"./$.is-array-iter":301,"./$.iter-call":303,"./$.iter-detect":306,"./$.to-length":320,"./$.to-object":321,"./core.get-iterator-method":324}],326:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $def = require('./$.def');

$def($def.S + $def.F, 'Object', {assign: require('./$.object-assign')});
},{"./$.def":293,"./$.object-assign":310}],327:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./$.to-iobject');

require('./$.object-sap')('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./$.object-sap":311,"./$.to-iobject":319}],328:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $def = require('./$.def');
$def($def.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.def":293,"./$.set-proto":314}],329:[function(require,module,exports){
'use strict';
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":305,"./$.string-at":317}],330:[function(require,module,exports){
/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2014
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports['browser'] = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , result

    if (/opera|opr/i.test(ua)) {
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/windows phone/i.test(ua)) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    }
    else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (/sailfish/i.test(ua)) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (/silk/i.test(ua)) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
      , version: versionIdentifier
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/(web|hpw)os/i.test(ua)) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/tizen/i.test(ua)) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/safari/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      , version: versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      result.name = result.name || "Webkit"
      result.webkit = t
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.msedge && (android || result.silk)) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
      result.tablet = t
    } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

},{}],331:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],332:[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

function classNames() {
	var classes = '';
	var arg;

	for (var i = 0; i < arguments.length; i++) {
		arg = arguments[i];
		if (!arg) {
			continue;
		}

		if ('string' === typeof arg || 'number' === typeof arg) {
			classes += ' ' + arg;
		} else if (Object.prototype.toString.call(arg) === '[object Array]') {
			classes += ' ' + classNames.apply(null, arg);
		} else if ('object' === typeof arg) {
			for (var key in arg) {
				if (!arg.hasOwnProperty(key) || !arg[key]) {
					continue;
				}
				classes += ' ' + key;
			}
		}
	}
	return classes.substr(1);
}

// safely export classNames for node / browserify
if (typeof module !== 'undefined' && module.exports) {
	module.exports = classNames;
}

// safely export classNames for RequireJS
if (typeof define !== 'undefined' && define.amd) {
	define('classnames', [], function() {
		return classNames;
	});
}

},{}],333:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher');

},{"./lib/Dispatcher":334}],334:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * 
 * @preventMunge
 */

'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var invariant = require('fbjs/lib/invariant');

var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *         case 'city-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */

  Dispatcher.prototype.register = function register(callback) {
    var id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   */

  Dispatcher.prototype.unregister = function unregister(id) {
    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
    delete this._callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */

  Dispatcher.prototype.waitFor = function waitFor(ids) {
    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this._isPending[id]) {
        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
        continue;
      }
      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
      this._invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   */

  Dispatcher.prototype.dispatch = function dispatch(payload) {
    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
    this._startDispatching(payload);
    try {
      for (var id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   */

  Dispatcher.prototype.isDispatching = function isDispatching() {
    return this._isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */

  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
    for (var id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
    delete this._pendingPayload;
    this._isDispatching = false;
  };

  return Dispatcher;
})();

module.exports = Dispatcher;
}).call(this,require('_process'))
},{"_process":331,"fbjs/lib/invariant":335}],335:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;
}).call(this,require('_process'))
},{"_process":331}],336:[function(require,module,exports){
//! moment.js locale configuration
//! locale : russian (ru)
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elensúle : https://github.com/Oire

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';


    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
            'hh': 'час_часа_часов',
            'dd': 'день_дня_дней',
            'MM': 'месяц_месяца_месяцев',
            'yy': 'год_года_лет'
        };
        if (key === 'm') {
            return withoutSuffix ? 'минута' : 'минуту';
        }
        else {
            return number + ' ' + plural(format[key], +number);
        }
    }
    function monthsCaseReplace(m, format) {
        var months = {
            'nominative': 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
            'accusative': 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_')
        },
        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
            'accusative' :
            'nominative';
        return months[nounCase][m.month()];
    }
    function monthsShortCaseReplace(m, format) {
        var monthsShort = {
            'nominative': 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
            'accusative': 'янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек'.split('_')
        },
        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
            'accusative' :
            'nominative';
        return monthsShort[nounCase][m.month()];
    }
    function weekdaysCaseReplace(m, format) {
        var weekdays = {
            'nominative': 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
            'accusative': 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_')
        },
        nounCase = (/\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/).test(format) ?
            'accusative' :
            'nominative';
        return weekdays[nounCase][m.day()];
    }

    var ru = moment.defineLocale('ru', {
        months : monthsCaseReplace,
        monthsShort : monthsShortCaseReplace,
        weekdays : weekdaysCaseReplace,
        weekdaysShort : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
        weekdaysMin : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
        monthsParse : [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[й|я]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i],
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY г.',
            LLL : 'D MMMM YYYY г., HH:mm',
            LLLL : 'dddd, D MMMM YYYY г., HH:mm'
        },
        calendar : {
            sameDay: '[Сегодня в] LT',
            nextDay: '[Завтра в] LT',
            lastDay: '[Вчера в] LT',
            nextWeek: function () {
                return this.day() === 2 ? '[Во] dddd [в] LT' : '[В] dddd [в] LT';
            },
            lastWeek: function (now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                    case 0:
                        return '[В прошлое] dddd [в] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[В прошлый] dddd [в] LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[В прошлую] dddd [в] LT';
                    }
                } else {
                    if (this.day() === 2) {
                        return '[Во] dddd [в] LT';
                    } else {
                        return '[В] dddd [в] LT';
                    }
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'через %s',
            past : '%s назад',
            s : 'несколько секунд',
            m : relativeTimeWithPlural,
            mm : relativeTimeWithPlural,
            h : 'час',
            hh : relativeTimeWithPlural,
            d : 'день',
            dd : relativeTimeWithPlural,
            M : 'месяц',
            MM : relativeTimeWithPlural,
            y : 'год',
            yy : relativeTimeWithPlural
        },
        meridiemParse: /ночи|утра|дня|вечера/i,
        isPM : function (input) {
            return /^(дня|вечера)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ночи';
            } else if (hour < 12) {
                return 'утра';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечера';
            }
        },
        ordinalParse: /\d{1,2}-(й|го|я)/,
        ordinal: function (number, period) {
            switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
                return number + '-й';
            case 'D':
                return number + '-го';
            case 'w':
            case 'W':
                return number + '-я';
            default:
                return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ru;

}));
},{"../moment":337}],337:[function(require,module,exports){
//! moment.js
//! version : 2.10.6
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (typeof from._isAMomentObject !== 'undefined') {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== 'undefined') {
            to._i = from._i;
        }
        if (typeof from._f !== 'undefined') {
            to._f = from._f;
        }
        if (typeof from._l !== 'undefined') {
            to._l = from._l;
        }
        if (typeof from._strict !== 'undefined') {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== 'undefined') {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== 'undefined') {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== 'undefined') {
            to._offset = from._offset;
        }
        if (typeof from._pf !== 'undefined') {
            to._pf = getParsingFlags(from);
        }
        if (typeof from._locale !== 'undefined') {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== 'undefined') {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function Locale() {
    }

    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && typeof module !== 'undefined' &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (typeof values === 'undefined') {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, values) {
        if (values !== null) {
            values.abbr = name;
            locales[name] = locales[name] || new Locale();
            locales[name].set(values);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function get_set__set (mom, unit, value) {
        return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;

    var regexes = {};

    function isFunction (sth) {
        // https://github.com/moment/moment/issues/2325
        return typeof sth === 'function' &&
            Object.prototype.toString.call(sth) === '[object Function]';
    }


    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  matchWord);
    addRegexToken('MMMM', matchWord);

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m) {
        return this._months[m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m) {
        return this._monthsShort[m.month()];
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (firstTime) {
                warn(msg + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;

    var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
        ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
        ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d{2}/],
        ['YYYY-DDD', /\d{4}-\d{3}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
        ['HH:mm', /(T| )\d\d:\d\d/],
        ['HH', /(T| )\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = from_string__isoRegex.exec(string);

        if (match) {
            getParsingFlags(config).iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    config._f = isoDates[i][0];
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    // match[6] should be 'T' or space
                    config._f += (match[6] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (string.match(matchOffset)) {
                config._f += 'Z';
            }
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', false);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, 'd');
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var week1Jan = 6 + firstDayOfWeek - firstDayOfWeekOfYear, janX = createUTCDate(year, 0, 1 + week1Jan), d = janX.getUTCDay(), dayOfYear;
        if (d < firstDayOfWeek) {
            d += 7;
        }

        weekday = weekday != null ? 1 * weekday : firstDayOfWeek;

        dayOfYear = 1 + week1Jan + 7 * (week - 1) - d + weekday;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()];
        }
        return [now.getFullYear(), now.getMonth(), now.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
                config._a[HOUR] <= 12 &&
                config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = [i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond];

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date();
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
         'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
         function () {
             var other = local__createLocal.apply(null, arguments);
             return other < this ? this : other;
         }
     );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            return other > this ? this : other;
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchOffset);
    addRegexToken('ZZ', matchOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(string) {
        var matches = ((string || '').match(matchOffset) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(+res._d + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(input);
            }
            if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (typeof this._isDSTShifted !== 'undefined') {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return !this._isUTC;
    }

    function isUtcOffset () {
        return this._isUTC;
    }

    function isUtc () {
        return this._isUTC && this._offset === 0;
    }

    var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    var create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = create__isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                d : parseIso(match[4], sign),
                h : parseIso(match[5], sign),
                m : parseIso(match[6], sign),
                s : parseIso(match[7], sign),
                w : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
        return this.format(formats && formats[format] || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var inputMs;
        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
        if (units === 'millisecond') {
            input = isMoment(input) ? input : local__createLocal(input);
            return +this > +input;
        } else {
            inputMs = isMoment(input) ? +input : +local__createLocal(input);
            return inputMs < +this.clone().startOf(units);
        }
    }

    function isBefore (input, units) {
        var inputMs;
        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
        if (units === 'millisecond') {
            input = isMoment(input) ? input : local__createLocal(input);
            return +this < +input;
        } else {
            inputMs = isMoment(input) ? +input : +local__createLocal(input);
            return +this.clone().endOf(units) < inputMs;
        }
    }

    function isBetween (from, to, units) {
        return this.isAfter(from, units) && this.isBefore(to, units);
    }

    function isSame (input, units) {
        var inputMs;
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            input = isMoment(input) ? input : local__createLocal(input);
            return +this === +input;
        } else {
            inputMs = +local__createLocal(input);
            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
        }
    }

    function diff (input, units, asFloat) {
        var that = cloneWithOffset(input, this),
            zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4,
            delta, output;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        return -(wholeMonthDiff + adjust);
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if ('function' === typeof Date.prototype.toISOString) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }
        return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }
        return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }
        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return +this._d - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(+this / 1000);
    }

    function toDate () {
        return this._offset ? new Date(+this) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // HELPERS

    function weeksInYear(year, dow, doy) {
        return weekOfYear(local__createLocal([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    // MOMENTS

    function getSetWeekYear (input) {
        var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
        return input == null ? year : this.add((input - year), 'y');
    }

    function getSetISOWeekYear (input) {
        var year = weekOfYear(this, 1, 4).year;
        return input == null ? year : this.add((input - year), 'y');
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    addFormatToken('Q', 0, 0, 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   matchWord);
    addRegexToken('ddd',  matchWord);
    addRegexToken('dddd', matchWord);

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config) {
        var weekday = config._locale.weekdaysParse(input);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m) {
        return this._weekdays[m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function localeWeekdaysParse (weekdayName) {
        var i, mom, regex;

        this._weekdaysParse = this._weekdaysParse || [];

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            if (!this._weekdaysParse[i]) {
                mom = local__createLocal([2000, 1]).day(i);
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, function () {
        return this.hours() % 12 || 12;
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add          = add_subtract__add;
    momentPrototype__proto.calendar     = moment_calendar__calendar;
    momentPrototype__proto.clone        = clone;
    momentPrototype__proto.diff         = diff;
    momentPrototype__proto.endOf        = endOf;
    momentPrototype__proto.format       = format;
    momentPrototype__proto.from         = from;
    momentPrototype__proto.fromNow      = fromNow;
    momentPrototype__proto.to           = to;
    momentPrototype__proto.toNow        = toNow;
    momentPrototype__proto.get          = getSet;
    momentPrototype__proto.invalidAt    = invalidAt;
    momentPrototype__proto.isAfter      = isAfter;
    momentPrototype__proto.isBefore     = isBefore;
    momentPrototype__proto.isBetween    = isBetween;
    momentPrototype__proto.isSame       = isSame;
    momentPrototype__proto.isValid      = moment_valid__isValid;
    momentPrototype__proto.lang         = lang;
    momentPrototype__proto.locale       = locale;
    momentPrototype__proto.localeData   = localeData;
    momentPrototype__proto.max          = prototypeMax;
    momentPrototype__proto.min          = prototypeMin;
    momentPrototype__proto.parsingFlags = parsingFlags;
    momentPrototype__proto.set          = getSet;
    momentPrototype__proto.startOf      = startOf;
    momentPrototype__proto.subtract     = add_subtract__subtract;
    momentPrototype__proto.toArray      = toArray;
    momentPrototype__proto.toObject     = toObject;
    momentPrototype__proto.toDate       = toDate;
    momentPrototype__proto.toISOString  = moment_format__toISOString;
    momentPrototype__proto.toJSON       = moment_format__toISOString;
    momentPrototype__proto.toString     = toString;
    momentPrototype__proto.unix         = unix;
    momentPrototype__proto.valueOf      = to_type__valueOf;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return typeof output === 'function' ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (typeof output === 'function') ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (typeof prop === 'function') {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months       =        localeMonths;
    prototype__proto._months      = defaultLocaleMonths;
    prototype__proto.monthsShort  =        localeMonthsShort;
    prototype__proto._monthsShort = defaultLocaleMonthsShort;
    prototype__proto.monthsParse  =        localeMonthsParse;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function list (format, index, field, count, setter) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, setter);
        }

        var i;
        var out = [];
        for (i = 0; i < count; i++) {
            out[i] = lists__get(format, i, field, setter);
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return list(format, index, 'months', 12, 'month');
    }

    function lists__listMonthsShort (format, index) {
        return list(format, index, 'monthsShort', 12, 'month');
    }

    function lists__listWeekdays (format, index) {
        return list(format, index, 'weekdays', 7, 'day');
    }

    function lists__listWeekdaysShort (format, index) {
        return list(format, index, 'weekdaysShort', 7, 'day');
    }

    function lists__listWeekdaysMin (format, index) {
        return list(format, index, 'weekdaysMin', 7, 'day');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes === 1          && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   === 1          && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    === 1          && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  === 1          && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   === 1          && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.10.6';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
},{}],338:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var PropTypes = _react2['default'].PropTypes;
var span = _react2['default'].DOM.span;

var Status = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed'
};

var ImageLoader = (function (_React$Component) {
  function ImageLoader(props) {
    _classCallCheck(this, ImageLoader);

    _get(Object.getPrototypeOf(ImageLoader.prototype), 'constructor', this).call(this, props);
    this.state = { status: props.src ? Status.LOADING : Status.PENDING };
  }

  _inherits(ImageLoader, _React$Component);

  _createClass(ImageLoader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.status === Status.LOADING) {
        this.createLoader();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.src !== nextProps.src) {
        this.setState({
          status: nextProps.src ? Status.LOADING : Status.PENDING
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.status === Status.LOADING && !this.img) {
        this.createLoader();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroyLoader();
    }
  }, {
    key: 'getClassName',
    value: function getClassName() {
      var className = 'imageloader ' + this.state.status;
      if (this.props.className) className = '' + className + ' ' + this.props.className;
      return className;
    }
  }, {
    key: 'createLoader',
    value: function createLoader() {
      this.destroyLoader(); // We can only have one loader at a time.

      this.img = new Image();
      this.img.onload = this.handleLoad.bind(this);
      this.img.onerror = this.handleError.bind(this);
      this.img.src = this.props.src;
    }
  }, {
    key: 'destroyLoader',
    value: function destroyLoader() {
      if (this.img) {
        this.img.onload = null;
        this.img.onerror = null;
        this.img = null;
      }
    }
  }, {
    key: 'handleLoad',
    value: function handleLoad(event) {
      this.destroyLoader();
      this.setState({ status: Status.LOADED });

      if (this.props.onLoad) this.props.onLoad(event);
    }
  }, {
    key: 'handleError',
    value: function handleError(error) {
      this.destroyLoader();
      this.setState({ status: Status.FAILED });

      if (this.props.onError) this.props.onError(error);
    }
  }, {
    key: 'renderImg',
    value: function renderImg() {
      var _props2 = this.props;
      var src = _props2.src;
      var imgProps = _props2.imgProps;

      var props = { src: src };

      for (var k in imgProps) {
        if (imgProps.hasOwnProperty(k)) {
          props[k] = imgProps[k];
        }
      }

      return _react2['default'].createElement('img', props);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props;

      var wrapperProps = {
        className: this.getClassName()
      };

      if (this.props.style) {
        wrapperProps.style = this.props.style;
      }

      var wrapperArgs = [wrapperProps];

      switch (this.state.status) {
        case Status.LOADED:
          wrapperArgs.push(this.renderImg());
          break;

        case Status.FAILED:
          if (this.props.children) wrapperArgs.push(this.props.children);
          break;

        default:
          if (this.props.preloader) wrapperArgs.push(this.props.preloader());
          break;
      }

      return (_props = this.props).wrapper.apply(_props, wrapperArgs);
    }
  }], [{
    key: 'propTypes',
    value: {
      wrapper: PropTypes.func,
      className: PropTypes.string,
      style: PropTypes.object,
      preloader: PropTypes.func,
      src: PropTypes.string,
      onLoad: PropTypes.func,
      onError: PropTypes.func,
      imgProps: PropTypes.object
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      wrapper: span
    },
    enumerable: true
  }]);

  return ImageLoader;
})(_react2['default'].Component);

exports['default'] = ImageLoader;
module.exports = exports['default'];
},{"react":"react"}],339:[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Object.assign
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

'use strict';

function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
}

module.exports = assign;

},{}],340:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if ("production" !== process.env.NODE_ENV) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))
},{"_process":331}],341:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyMirror
 * @typechecks static-only
 */

'use strict';

var invariant = require("./invariant");

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function(obj) {
  var ret = {};
  var key;
  ("production" !== process.env.NODE_ENV ? invariant(
    obj instanceof Object && !Array.isArray(obj),
    'keyMirror(...): Argument must be an object.'
  ) : invariant(obj instanceof Object && !Array.isArray(obj)));
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;

}).call(this,require('_process'))
},{"./invariant":340,"_process":331}]},{},[1]);
