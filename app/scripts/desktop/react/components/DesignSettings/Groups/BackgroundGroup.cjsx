DesignSettingsGroup        = require './Group'
DesignSettingsOption       = require '../Option/index'
DesignSettingsOptionState  = require '../Option/State'
DesignSettingsRadioList    = require '../common/RadioList'
DesignSettingsFileUpload   = require '../common/FileUpload'
{ PropTypes } = React

DesignSettingsBackgroundGroup = React.createClass
  displayName: 'DesignSettingsBackgroundGroup'

  propTypes:
    group: PropTypes.object.isRequired

  render: ->
    <DesignSettingsGroup title="Фон">
      <DesignSettingsOption
          name={ @props.group.color.optionName }
          title="Цвет">
        <DesignSettingsOptionState style={ @props.group.color.style } />
        <DesignSettingsRadioList
            style={ @props.group.color.style }
            stateName={ @props.group.color.stateName }
            items={ @props.group.color.items }
            className="ds-absolute-left ds-fadein-down" />
      </DesignSettingsOption>

      <DesignSettingsOption
          name={ @props.group.image.optionName }
          title="Картинка"
          free={ @props.group.image.free }>
        <DesignSettingsFileUpload
            stateName={ @props.group.color.stateName }
            value={ @props.group.image.value }
            enabled={ @props.group.image.enabled } />
      </DesignSettingsOption>

      <DesignSettingsOption
          name={ @props.group.alignment.optionName }
          title="Выравнивание"
          free={ @props.group.alignment.free }>
        <DesignSettingsRadioList
            style={ @props.group.alignment.style }
            stateName={ @props.group.alignment.stateName }              
            items={ @props.group.alignment.items }
            className="ds-absolute-left ds-fadein-down" />
      </DesignSettingsOption>
    </DesignSettingsGroup>

module.exports = DesignSettingsBackgroundGroup