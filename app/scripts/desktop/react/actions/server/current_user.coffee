CurrentUserServerActions =

  updateUser: (user) ->
    CurrentUserDispatcher.handleServerAction
      type: 'userUpdated'
      user: user

  updateUserpic: (userpic) ->
    CurrentUserDispatcher.handleServerAction
      type: 'userpicUpdated'
      userpic: userpic

  cancelEmailConfirmation: ->
    CurrentUserDispatcher.handleServerAction
      type: 'confirmationEmailCanceled'

module.exports = CurrentUserServerActions