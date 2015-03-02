{ PropTypes } = React

DesignSettingsRadio = React.createClass
  displayName: 'DesignSettingsRadio'

  propTypes:
    value:     PropTypes.string.isRequired
    text:      PropTypes.string.isRequired
    title:     PropTypes.string.isRequired
    stateName: PropTypes.string.isRequired
    free:      PropTypes.bool

  render: ->
    <span className={ 'form-radiobtn form-radiobtn--' + @props.value }>
      <input type="radio"
             name={ @props.stateName }
             value={ @props.value }
             id={ @props.stateName + '-' + @props.value }
             className="form-radiobtn__input" />
      <label htmlFor={ @props.stateName + '-' + @props.value }
             className="form-radiobtn__label">
        { @renderFreeLabel() }
        <span className="form-radiobtn__inner">
          <span className="form-radiobtn__text">
            { @props.text }
          </span>
        </span>
        { @renderColorPicker() }
      </label>
    </span>

  renderColorPicker: ->
    <ColorPicker /> if @props.value is 'custom'

  renderFreeLabel: ->
    <span className="free">free</span> if @props.free

module.exports = DesignSettingsRadio