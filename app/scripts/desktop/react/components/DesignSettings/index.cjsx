DesignSettingsMixin = require './mixins/index'
DesignSettingsDropZone = require './DropZone/index'
DesignSettingsGroups = require './Groups/index'
DesignSettingsSaveButton = require './buttons/Save'
DesignSettingsActions = require '../../actions/designSettings'

DesignSettings = React.createClass
  displayName: 'DesignSettings'
  mixins: [DesignSettingsMixin]

  render: ->
    <div className="design-settings">
      <DesignSettingsDropZone />
      <div className="design-settings__options">
        <DesignSettingsGroups
            groups={ @props.groups }
            onOptionChange={ @emitOptionChange }
            onBackgroundVisibilityChange={ @emitBackgroundVisibilty } />
        <DesignSettingsSaveButton />
      </div>
    </div>

  emitOptionChange: (optionName, value) ->
    DesignSettingsActions.changeOptionValue optionName, value

  emitBackgroundVisibilty: (visibility) ->
    DesignSettingsActions.toggleBackgroundVisibility visibility

module.exports = DesignSettings