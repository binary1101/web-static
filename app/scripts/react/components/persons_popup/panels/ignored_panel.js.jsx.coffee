###* @jsx React.DOM ###

window.PersonsPopup_IgnoredPanel = React.createClass
  mixins: ['PersonsPopup_PanelMixin']

  relationUrl: -> ApiRoutes.relationships_to_url 'ignored'
  itemClass: PersonsPopup_IgnoredRelationship

  getStateFromStore: ->
    relationships: RelationshipsStore.getIgnored()