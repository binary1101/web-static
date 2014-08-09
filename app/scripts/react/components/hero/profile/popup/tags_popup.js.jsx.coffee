###* @jsx React.DOM ###

window.HeroProfileStats_TagsPopup = React.createClass
  mixins: ['ReactActivitiesUser', ReactUnmountMixin, RequesterMixin, ScrollerMixin]

  propTypes:
    tlogId:  React.PropTypes.number.isRequired
    onClose: React.PropTypes.func

  getInitialState: ->
    tags:      null
    isError:   false
    isLoading: false

  componentDidMount: -> @getStatsData()

  render: ->
    if @state.tags?.length > 0
      tags = @state.tags.map (tag, i) =>
        `<HeroProfileStats_TagItem tag={ tag } key={ i } />`

      tagList = `<section className="users">{ tags }</section>`
    else
      if @state.isError
        message = `<div className="popup__text">Ошибка загрузки.</div>`
      else if @state.isLoading
        message = `<div className="popup__text">Загружаю..</div>`
      else
        message = `<div className="popup__text">Список пуст.</div>`
      tagList = `<div className="valign"><div className="valign__middle">{ message }</div></div>`

    return `<div className="scroller scroller--tags" ref="scroller">
              <div className="scroller__pane js-scroller-pane">{ tagList }</div>
              <div className="scroller__track js-scroller-track">
                  <div className="scroller__bar js-scroller-bar"></div>
              </div>
            </div>`

  getStatsData: ->
    @incrementActivities()
    @setState isError: false, isLoading: true
    @createRequest
      url: Routes.api.tlog_tags(@props.tlogId)
      success: (data) =>
        @safeUpdateState => @setState tags: data
      error:   (data) =>
        @safeUpdateState => @setState isError: true
        TastyNotifyController.errorResponse data
      complete: =>
        @decrementActivities()
        @safeUpdateState => @setState isLoading: false