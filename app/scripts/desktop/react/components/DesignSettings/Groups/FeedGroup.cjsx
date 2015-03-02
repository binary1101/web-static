DesignSettingsGroup        = require './Group'
DesignSettingsOption       = require '../Option/index'
DesignSettingsOptionState  = require '../Option/State'
DesignSettingsOptionSlider = require '../Option/Slider'
DesignSettingsRadioList    = require '../common/RadioList'
{ PropTypes } = React

DesignSettingsFeedGroup = React.createClass
  displayName: 'DesignSettingsFeedGroup'

  propTypes:
    group: PropTypes.object.isRequired

  render: ->
    <DesignSettingsGroup title="Лента">
      <DesignSettingsOption
          name={ @props.group.bgcolor.optionName }
          title="Цвет фона">
        <DesignSettingsOptionState style={ @props.group.bgcolor.itemStyle } />
        <DesignSettingsRadioList
            style={ @props.group.bgcolor.style }
            stateName={ @props.group.bgcolor.stateName }              
            items={ @props.group.bgcolor.items }
            className="ds-absolute-left ds-fadein-down" />
      </DesignSettingsOption>

      <DesignSettingsOption
          name={ @props.group.font.optionName }
          title="Шрифт текста">
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
    </DesignSettingsGroup>

module.exports = DesignSettingsFeedGroup