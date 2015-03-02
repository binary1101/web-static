DesignSettingsGroup        = require './Group'
DesignSettingsOption       = require '../Option/index'
DesignSettingsOptionState  = require '../Option/State'
DesignSettingsOptionSlider = require '../Option/Slider'
DesignSettingsRadioList    = require '../common/RadioList'
{ PropTypes } = React

DesignSettingsHeaderGroup = React.createClass
  displayName: 'DesignSettingsHeaderGroup'

  propTypes:
    group: PropTypes.object.isRequired

  render: ->
    <DesignSettingsGroup title="Заголовок">
      <DesignSettingsOption
          name={ @props.group.font.optionName }
          title="Шрифт">
        <DesignSettingsOptionState
            style={ @props.group.font.style }
            text="Aa" />
        <DesignSettingsOptionSlider>
          <DesignSettingsRadioList
              style={ @props.group.font.style }
              stateName={ @props.group.font.stateName }              
              items={ @props.group.font.items } />
        </DesignSettingsOptionSlider>
      </DesignSettingsOption>

      <DesignSettingsOption
          name={ @props.group.size.optionName }
          title="Размер">
        <DesignSettingsRadioList
            style={ @props.group.size.style }
            stateName={ @props.group.size.stateName }              
            items={ @props.group.size.items }
            className="ds-absolute-left ds-fadein-down" />
      </DesignSettingsOption>

      <DesignSettingsOption
          name={ @props.group.color.optionName }
          title="Цвет">
        <DesignSettingsOptionState style={ @props.group.color.itemStyle } />
        <DesignSettingsRadioList
            style={ @props.group.color.style }
            stateName={ @props.group.color.stateName }              
            items={ @props.group.color.items }
            className="ds-absolute-left ds-fadein-down" />
      </DesignSettingsOption>
    </DesignSettingsGroup>

module.exports = DesignSettingsHeaderGroup