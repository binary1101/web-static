_  = require 'lodash'
cx = require 'react/lib/cx'
DesignSettingsSliderPrevButton = require './Slider/PrevButton'
DesignSettingsSliderNextButton = require './Slider/NextButton'
{ PropTypes } = React

DesignSettingsSlider = React.createClass
  displayName: 'DesignSettingsSlider'

  propTypes:
    children: PropTypes.element.isRequired

  getInitialState: ->
    inited: false
    leftLimit: true
    rightLimit: false
    leftOffset: 0

  componentDidMount: ->
    @setState(inited: true)

  render: ->
    sliderClasses = cx
      'slider ds-fadein-down': true
      '__inited': @state.inited
      '__leftlimit': @state.leftLimit
      '__rightlimit': @state.rightLimit

    return <div className={ sliderClasses }>
             <div ref="main"
                  className="slider__main">
               <div ref="list"
                    className="slider__list"
                    style={ @getListStyles() }>
                 <div className="slider__table">
                   <div className="slider__table-cell">
                     { @props.children }
                   </div>
                 </div>
               </div>
             </div>
             { @renderButtons() }
           </div>

  renderButtons: ->
    buttons = []
    prevButton = <DesignSettingsSliderPrevButton onClick={ @slidePrev } key="prev" />
    nextButton = <DesignSettingsSliderNextButton onClick={ @slideNext } key="next" />

    if @state.inited
      listWidth = @refs.list.getDOMNode().offsetWidth
      mainWidth = @refs.main.getDOMNode().offsetWidth

      if listWidth > mainWidth
        buttons = buttons.concat prevButton, nextButton

    buttons

  slidePrev: ->
    rightLimit = false
    leftLimit  = @state.leftLimit
    listWidth  = @refs.list.getDOMNode().offsetWidth
    mainWidth  = @refs.main.getDOMNode().offsetWidth
    leftOffset = Math.abs @state.leftOffset
    shift      = mainWidth - 40

    return if leftOffset == 0

    if leftOffset - shift <= 0
      leftOffset = 0
      leftLimit = true      
    else
      leftOffset = leftOffset - shift

    @setState {leftLimit, rightLimit, leftOffset: leftOffset * -1}

  slideNext: ->
    leftLimit  = false
    rightLimit = @state.rightLimit
    listWidth  = @refs.list.getDOMNode().offsetWidth
    mainWidth  = @refs.main.getDOMNode().offsetWidth
    leftOffset = Math.abs @state.leftOffset
    shift      = mainWidth - 40

    return if leftOffset + shift >= listWidth

    if leftOffset + shift >= listWidth - mainWidth
      rightLimit = true
      leftOffset = listWidth - mainWidth
    else
      leftOffset = leftOffset + shift

    @setState {leftLimit, rightLimit, leftOffset: leftOffset * -1}

  getListStyles: ->
    styles = {}
    supportedTransform = @getSupportedTransform()

    if supportedTransform
      styles[supportedTransform] = 'translateX(' + @state.leftOffset + 'px)'
    else
      styles.left = @state.leftOffset

    styles

  getSupportedTransform: ->
    # It will return either the name of the first supported prefix or false 
    # if none of the prefixes are supported
    prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split ' '
    div = document.createElement 'div'
    firstPrefix = _.find prefixes, (prefix) -> div.style[prefix]?

    return firstPrefix ? false

module.exports = DesignSettingsSlider

  # # Слайдер
  # # http://stackoverflow.com/questions/7212102/detect-with-javascript-or-jquery-if-css-transform-2d-is-available
  # getSupportedTransform = ->
  #   prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ')
  #   i = 0

  #   while i < prefixes.length
  #     return prefixes[i] if document.createElement('div').style[prefixes[i]] isnt `undefined`
  #     i++
  #   false

  # supportCSSTransform = getSupportedTransform()

  # $('.slider').each ->
  #   $slider = $(this)
  #   $main = $slider.find('.slider__main')
  #   $list = $slider.find('.slider__list')

  #   pos = 0

  #   return true if $list.width() < $main.width()

  #   btnPrev = $('<div />', {'class': 'slider__btn slider__btn--left'})
  #   btnNext = $('<div />', {'class': 'slider__btn slider__btn--right'})
  #   $slider
  #     .append(btnPrev, btnNext)
  #     .addClass '__inited __leftlimit'

  #   setPosition = (value) ->
  #     unless supportCSSTransform
  #       $list.css
  #         left: value
  #     else
  #       $list.css
  #         WebkitTransform: 'translateX(' + value + 'px)',
  #         MozTransform:    'translateX(' + value + 'px)',
  #         msTransform:     'translateX(' + value + 'px)',
  #         OTransform:      'translateX(' + value + 'px)',
  #         transform:       'translateX(' + value + 'px)'

  #   setPosition(0)

  #   btnNext.on 'click', ->
  #     shift = $main.width() - 40

  #     return true if pos + shift >= $list.width()

  #     if pos + shift >= $list.width() - $main.width()
  #       $slider.addClass '__rightlimit'

  #     if pos + shift >= $list.width() - $main.width()
  #       pos = $list.width() - $main.width()
  #     else
  #       pos = pos + shift

  #     $slider.removeClass '__leftlimit'
  #     setPosition(pos * -1)

  #   btnPrev.on 'click', ->
  #     shift = $main.width() - 40

  #     if pos == 0
  #       return true

  #     if pos - shift <= 0
  #       pos = 0
  #       $slider.addClass '__leftlimit'
  #     else
  #       pos = pos - shift

  #     $slider.removeClass '__rightlimit'
  #     setPosition(pos * -1)
