_ = require 'lodash'
Constants = require '../constants/constants'

class LayoutStatesController
  layoutEl: null
  states:
    userToolbar:         'main-toolbar-open'
    headerFont:          'designtlog-headerfont'
    headerSize:          'designtlog-headersize'
    headerColor:         'designtlog-headercolor'
    backgroundColor:     'designtlog-bgcolor'
    backgroundImage:     'designtlog-bgimage-none'
    backgroundAlignment: 'designtlog-bgalignment'
    feedBackgroundColor: 'designtlog-feedbgcolor'
    feedFont:            'designtlog-feedfont'
    feedColor:           'designtlog-feedcolor'

  constructor: ({@dispatcher, layoutEl}) ->
    @layoutEl = layoutEl ? document.body
    @listenDispatcher()

  toggleState: (UIelement, value) ->
    stateName = @states[UIelement]
    # Используем add и remove вместо toggle, чтобы явно следовать внутренним стейтам
    # компонентов. Если у в лейауте был класс компонента, а из компонента пришло
    # что нужно его установить, то мы просто вызываем add, который ничего не испортит.
    # Если же будет toggle, то он уберёт класс компонента и будет рассинхрон.
    methodName = if value then 'add' else 'remove'

    @layoutEl.classList[methodName] stateName

  replaceState: (UIelement, value) ->
    stateName = @states[UIelement] # 'designtlog-headerfont'
    classes = @layoutEl.className.split(' ').filter (className) ->
      className.lastIndexOf(stateName, 0) != 0

    newClass = stateName + '-' + value
    classes.push newClass
    @layoutEl.className = _.trim classes.join(' ')

  listenDispatcher: ->
    @dispatcher.register (payload) =>
      action = payload.action

      switch action.type
        when Constants.userToolbar.INIT_VISIBILITY, Constants.userToolbar.TOGGLE_VISIBILITY
          @toggleState 'userToolbar', action.value

        when Constants.designSettings.SET_OPTION
          @replaceState action.optionName, action.value

        when Constants.designSettings.TOGGLE_BACKGROUND_VISIBILITY
          @toggleState 'backgroundImage', action.value

module.exports = LayoutStatesController