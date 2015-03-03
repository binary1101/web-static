{ PropTypes } = React

MINIMUM = 0
MAXIMUM = 1
STEP    = 0.01

DesignSettingsRange = React.createClass
  displayName: 'DesignSettingsRange'

  propTypes:
    value: PropTypes.number.isRequired
    from:  PropTypes.number
    to:    PropTypes.number
    step:  PropTypes.number

  getDefaultProps: ->
    from: MINIMUM
    to:   MAXIMUM
    step: STEP

  getInitialState: ->
    value: @props.value

  componentDidMount: ->
    range = @refs.range.getDOMNode()

    $(range).slider
      min: @props.from
      max: @props.to
      step: @props.step
      range: 'min'
      value: @props.value
      animate: true
      slide: @handleSlide
      change: @handleChange

  componentWillUnmount: ->
    range = @refs.range.getDOMNode()
    $(range).slider 'destroy'

  render: ->
    <span>
      <span ref="range"
            className="form-range ds-absolute-left ds-fadein-down">
        <input type="text"
               className="form-range__input" />
      </span>
      { @renderValue() }
    </span>

  renderValue: ->
    formattedValue = (@state.value * 100).toFixed() + '%'

    return <span className="form-range-value">
             { formattedValue }
           </span>

  handleSlide: (e, ui) ->
    @setState(value: ui.value)

module.exports = DesignSettingsRange