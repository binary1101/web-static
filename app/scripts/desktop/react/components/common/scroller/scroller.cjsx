{ PropTypes } = React

Scroller = React.createClass
  displayName: 'Scroller'

  propTypes:
    children: PropTypes.oneOfType([
      PropTypes.element
      PropTypes.array
    ]).isRequired
    className: PropTypes.string

  componentDidMount: ->
    scroller = @getDOMNode()

    @scroller = $(scroller).baron
      scroller: '.scroller__pane'
      bar: '.scroller__bar'
      track: '.scroller__track'
      barOnCls: 'scroller--tracked'
      pause: 0

  componentWillUnmount: ->
    @scroller.dispose()
    @scroller = null

  render: ->
    scrollerClasses = ["scroller", "scroller--dark", @props.className].join ' '

    return <div className={ scrollerClasses }>
             <div className="scroller__pane">
               { @props.children }
             </div>
             <div className="scroller__track">
               <div className="scroller__bar" />
             </div>
           </div>

module.exports = Scroller