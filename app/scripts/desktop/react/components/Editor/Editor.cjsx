NormalizedEntry = require '../../entities/normalizedEntry'
EditorLayout = require './Layout/Layout'
EditorActions = require './Actions/Actions'
EditorTypeSwitcher = require './TypeSwitcher/TypeSwitcher'
{ PropTypes } = React

Editor = React.createClass
  displayName: 'Editor'

  propTypes:
    entry: PropTypes.instanceOf(NormalizedEntry).isRequired
    entryType: PropTypes.string.isRequired
    entryPrivacy: PropTypes.string.isRequired
    tlogType: PropTypes.string.isRequired
    backUrl: PropTypes.string
    canChangeType: PropTypes.bool.isRequired

  getInitialState: ->
    #TODO: Брать состояние загрузки из EditorStore
    loading: false

  render: ->
    <EditorLayout
        backUrl={ @props.backUrl }
        loading={ @state.loading }>
      <EditorActions
          entryPrivacy={ @props.entryPrivacy }
          tlogType={ @props.tlogType }
          loading={ @state.loading } />
      <EditorTypeSwitcher
          entryType={ @props.entryType }
          canChangeType={ @props.canChangeType }
          loading={ @state.loading } />
    </EditorLayout>

module.exports = Editor