MessengerHeader = require '../MessengerHeader'

ConversationsHeader = React.createClass
  displayName: 'ConversationsHeader'

  render: ->
    <MessengerHeader title={ i18n.t('messenger.conversations_header') } />

module.exports = ConversationsHeader