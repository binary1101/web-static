_         = require 'lodash'
Constants = require '../constants/constants'
Popup     = require '../components/popupComponent/popup'

class PopupController
  containerAttribute: 'popup-container'

  constructor: ({@dispatcher}) ->
    @listenDispatcher()

  addContainer: (containerAttribute) ->
    container = document.querySelector "[#{containerAttribute}]"

    unless container?
      container = document.createElement 'div'
      container.setAttribute containerAttribute, ''
      document.body.appendChild container

    container

  removeContainer: (container) ->
    container.parentNode?.removeChild container

  open: (Component, props, containerAttribute = @containerAttribute) ->
    container = @addContainer containerAttribute

    React.render <Popup onClose={ @handleClose.bind(@, containerAttribute) }>
                   <Component {...props} />
                 </Popup>, container

  close: (containerAttribute = @containerAttribute) ->
    container = document.querySelector "[#{containerAttribute}]"

    React.unmountComponentAtNode container
    @removeContainer container

  listenDispatcher: ->
    @dispatcher.register (payload) =>
      action = payload.action

      switch action.type
        when Constants.popup.OPEN
          { component, props, containerAttribute } = action
          @open component, props, containerAttribute

  handleClose: (containerAttribute) ->
    @close containerAttribute

module.exports = PopupController