###* @jsx React.DOM ###
#
window.PersonsPopup_PanelMixin =

  propTypes:
    isActive:    React.PropTypes.bool.isRequired
    onLoad:      React.PropTypes.func.isRequired
    total_count: React.PropTypes.number

  getInitialState: ->
    isError:       false
    isLoading:     false

  componentDidMount: ->
    @$scroller = $ @refs.scroller.getDOMNode()

    @scroller = @$scroller.baron
      scroller: ".js-scroller-pane"
      bar:      ".js-scroller-bar"
      track:    ".js-scroller-track"
      barOnCls: "scroller--tracked"
      pause:    0

    # TODO Специально вызывается два раза, один раз иногда не срабатывает
    @$scroller.trigger("sizeChange").trigger('sizeChange')

    @getPanelData()

  componentDidUpdate: ->
    @scroller.update()
    @$scroller.trigger("sizeChange").trigger('sizeChange')

  render: ->
    panelClasses = React.addons.classSet 'tabs-panel': true, 'state--hidden': !@props.isActive

    if @props.relationships?.length > 0
      itemClass = @itemClass
      relationships = @props.relationships.map (relationship, i) =>
        itemClass relationship: relationship, key: i, onRequestEnd: @removeRelationshipByIndex

      panelContent = `<ul className="persons">{ relationships }</ul>`
    else
      if @state.isError
        message = `<div className="popup__text">Ошибка загрузки.</div>`
      else if @state.isLoading
        message = `<div className="popup__text">Загружаю..</div>`
      else
        message = `<div className="popup__text">Список пуст.</div>`
      panelContent = `<div className="valign"><div className="valign__middle">{ message }</div></div>`

    if @props.relationships?.length < @props.total_count
      panelContent = `<div>{ panelContent }<LoadMoreButton onClick={ this.loadMoreData } /></div>`

    return `<div className={ panelClasses }>
              <div className="scroller scroller--persons" ref="scroller">
                <div className="scroller__pane js-scroller-pane">
                  { panelContent }
                </div>
                <div className="scroller__track js-scroller-track">
                  <div className="scroller__bar js-scroller-bar"></div>
                </div>
              </div>
            </div>`

  getPanelData: (sincePosition) ->
    console.error 'getPanelData when xhr' if @xhr?
    @incrementActivities()
    @setState isError: false, isLoading: true
    req = @createRequest
      url: @relationUrl()
      data:
        since_position: sincePosition
      success: (data) =>
        @safeUpdateState => @props.onLoad('add', total_count: data.total_count, items: data.relationships)
      error:   (data) =>
        @safeUpdateState => @setState isError: true
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isLoading: false
        @decrementActivities()

  loadMoreData: ->
    return if @state.isLoading
    lastLoadedPosition = @props.relationships[ @props.relationships.length - 1].position
    @getPanelData lastLoadedPosition

  removeRelationshipByIndex: (index) ->
    newRelationships = @props.relationships.slice()
    newRelationships.splice index, 1
    @props.onLoad('update', total_count: @props.total_count - 1, items: newRelationships)

# TODO Use react-mixin-manager
_.extend window.PersonsPopup_PanelMixin, window.RequesterMixin