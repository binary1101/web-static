window.i18n            = require 'i18next'
ReactUjs               = require 'reactUjs'
PopupActions           = require './actions/popup'
AppDispatcher          = require './dispatchers/dispatcher'
GuideController        = require './controllers/guide'
LayoutStatesController = require './controllers/layoutStates'
PopupController        = require './controllers/popuup'

window.ReactApp =

  start: ({user, locale}) ->
    console.log 'ReactApp start'

    if user?
      CurrentUserDispatcher.setupUser user
      window.messagingService = new MessagingService
        user: CurrentUserStore.getUser()

    i18n.init
      lng: locale
      fallbackLng: 'ru'
      resGetPath: TastySettings.localesPath + '/__lng__.json'
    , ->
      console.log 'Locales loaded'
      ReactUjs.initialize()

      # Aviator.pushStateEnabled = false

      UserRouteTarget =
        profile:                 -> TastyEvents.emit TastyEvents.keys.command_hero_open()
        settings:                -> PopupActions.showSettings()
        design_settings:         -> PopupActions.showDesignSettings()
        showRequestedById: (req) -> PopupActions.showFriends('vkontakte', Number(req.params.id))
        showRequested:           -> PopupActions.showFriends('requested')
        showVkontakte:           -> PopupActions.showFriends('vkontakte')
        showFacebook:            -> PopupActions.showFriends('facebook')

      Aviator.setRoutes
        '/:user':
          target: UserRouteTarget
          '/profile': 'profile'
          '/settings': 'settings'
          '/design_settings': 'design_settings'
          '/friends':
            '/requested':
              '/': 'showRequested'
              '/:id': 'showRequestedById'
            '/vkontakte': 'showVkontakte'
            '/facebook': 'showFacebook'

      Aviator.dispatch()

    @layoutStatesController = new LayoutStatesController(dispatcher: AppDispatcher)
    @popupController = new PopupController(dispatcher: AppDispatcher)

    @shellbox = new ReactShellBox()
    @popup    = new ReactPopup()

    # Есть только у анонимов
    $('[invite-button]').click => @shellbox.show Auth

    # Тултип для шаринга
    $("[tooltip]").tooltip()

    # GuideController.start()