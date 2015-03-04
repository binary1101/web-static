_                   = require 'lodash'
DesignSettingsRadio = require './Radio'
{ PropTypes } = React

DesignSettingsRadioList = React.createClass
  displayName: 'DesignSettingsRadioList'

  propTypes:
    style:     PropTypes.string.isRequired
    stateName: PropTypes.string.isRequired
    items:     PropTypes.array.isRequired
    className: PropTypes.string
    onChange:  PropTypes.func.isRequired

  render: ->
    listClasses = ['form-radiogroup', 'form-radiogroup--' + @props.style, @props.className].join ' '
    listItems = _.map @props.items, (item) =>
      <DesignSettingsRadio {...item}
          stateName={ @props.stateName }
          onChange={ @props.onChange }
          key={ item.value } />

    return <span className={ listClasses }>
             { listItems}
           </span>

module.exports = DesignSettingsRadioList