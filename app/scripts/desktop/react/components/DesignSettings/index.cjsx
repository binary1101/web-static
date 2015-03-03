DesignSettingsMixin      = require './mixins/index'
DesignSettingsDropZone   = require './DropZone/index'
DesignSettingsGroups     = require './Groups/index'
DesignSettingsSaveButton = require './buttons/Save'

DesignSettings = React.createClass
  displayName: 'DesignSettings'
  mixins: [DesignSettingsMixin]

  render: ->
    <div className="design-settings">
      <DesignSettingsDropZone />
      <div className="design-settings__options">
        <DesignSettingsGroups groups={ @props.groups } />
        <DesignSettingsSaveButton />
      </div>
    </div>

module.exports = DesignSettings