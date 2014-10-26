window._                 = require 'underscore'
window.$ = window.jQuery = require 'jquery'
window.Backbone          = require 'backbone'
window.MouseTrap         = require 'mousetrap'
window.React             = require 'react'
window.Dispatcher        = require('flux').Dispatcher
window.moment            = require 'momentjs'
window.EventEmitter      = require 'eventEmitter'
window.bowser            = require 'bowser'
window.i18n              = require 'i18next'
window.Pusher            = require 'pusher'
window.Modernizr         = require 'Modernizr'
window.imagesLoaded      = require 'imagesloaded'

require 'baron'
require('momentjsRU')(window.moment)
require 'reactUjs'
require('react-mixin-manager')(window.React)
require 'i18next'
require 'bootstrap.tooltip'

# jQuery UI components
require 'jquery.ui.core'
require 'jquery.ui.widget'
require 'jquery.ui.mouse'
require 'jquery.ui.slider'
require 'jquery.ui.draggable'

# jQuery plugins
require 'jquery.autosize'
require 'jquery.autosize.input'
require 'jquery.collage'
require 'jquery.waypoints'
require 'jquery.fileupload'
require 'jquery.shapeshift'