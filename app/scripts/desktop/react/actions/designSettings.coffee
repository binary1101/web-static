Constants     = require '../constants/constants'
AppDispatcher = require '../dispatchers/dispatcher'

DesignSettingsActions =

  changeOptionValue: (optionName, value) ->
    AppDispatcher.handleViewAction
      type: Constants.designSettings.SET_OPTION
      optionName: optionName
      value: value

  toggleBackgroundVisibility: (value) ->
    AppDispatcher.handleViewAction
      type: Constants.designSettings.TOGGLE_BACKGROUND_VISIBILITY
      value: value    

module.exports = DesignSettingsActions