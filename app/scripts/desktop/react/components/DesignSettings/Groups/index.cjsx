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

  render: ->
    <div className="design-settings__groups">
      <Scroller className="scroller--design">
        <DesignSettingsHeaderGroup group={ @props.groups.header } />
        <DesignSettingsBackgroundGroup group={ @props.groups.background } />
        <DesignSettingsFeedGroup group={ @props.groups.feed } />
      </Scroller>
    </div>

module.exports = DesignSettingsGroups