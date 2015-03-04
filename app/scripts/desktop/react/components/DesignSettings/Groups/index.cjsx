Scroller                      = require '../../common/scroller/scroller'
DesignSettingsHeaderGroup     = require './HeaderGroup'
DesignSettingsBackgroundGroup = require './BackgroundGroup'
DesignSettingsFeedGroup       = require './FeedGroup'
{ PropTypes } = React

DesignSettingsGroups = React.createClass
  displayName: 'DesignSettingsGroups'

  propTypes:
    groups: PropTypes.shape(
      header: PropTypes.object.isRequired
    ).isRequired
    onOptionChange: PropTypes.func.isRequired
    onBackgroundVisibilityChange: PropTypes.func.isRequired

  render: ->
    <div className="design-settings__groups">
      <Scroller className="scroller--design">
        <DesignSettingsHeaderGroup
            group={ @props.groups.header }
            onOptionChange={ @props.onOptionChange } />
        <DesignSettingsBackgroundGroup
            group={ @props.groups.background }
            onOptionChange={ @props.onOptionChange }
            onBackgroundVisibilityChange={ @props.onBackgroundVisibilityChange } />
        <DesignSettingsFeedGroup
            group={ @props.groups.feed }
            onOptionChange={ @props.onOptionChange } />
      </Scroller>
    </div>

  handleOptionChange: (optionName, value) ->
    console.log optionName, value

module.exports = DesignSettingsGroups