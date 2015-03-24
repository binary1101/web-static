_ = require 'lodash'
classSet = require 'react/lib/cx'
EditorStore = require '../../../stores/editor'
EditorActionCreators = require '../../../actions/editor'
ConnectStoreMixin = require '../../../../../shared/react/mixins/connectStore'
EditorTextField = require '../fields/Text'
EditorMediaBox = require '../MediaBox/MediaBox'
EditorTypeImageWelcome = require './Image/Welcome'
EditorTypeImageUrlInsert = require './Image/UrlInsert'
EditorTypeImageLoaded = require './Image/Loaded'
{ PropTypes } = React

WELCOME_STATE = 'welcome'
INSERT_STATE = 'insert'
LOADED_STATE = 'loaded'

EditorTypeImage = React.createClass
  displayName: 'EditorTypeImage'
  mixins: [ConnectStoreMixin(EditorStore)]

  propTypes:
    entry: PropTypes.object.isRequired
    entryType: PropTypes.string.isRequired
    onFieldChange: PropTypes.func.isRequired

  getInitialState: ->
    currentState: @getInitialCurrentState()
    dragging: false

  render: ->
    editorClasses = classSet
      'post': true
      'post--image': true
      'post--edit': true
      'state--insert': @isInsertState()

    return <article className={ editorClasses }>
             <div className="post__content">
               <EditorMediaBox
                   entryType={ @props.entryType }
                   state={ @getMediaBoxState() }>
                 { @renderEditorScreen() }
               </EditorMediaBox>
               <EditorTextField
                   mode="rich"
                   text={ @state.title }
                   placeholder={ i18n.t('editor_description_placeholder') }
                   className="post__content"
                   onChange={ @props.onFieldChange.bind(null, 'title') } />
             </div>
           </article>

  renderEditorScreen: ->
    switch @state.currentState
      when WELCOME_STATE
        <EditorTypeImageWelcome
            onClickInsertState={ @activateInsertState }
            onSelectFiles={ @handleSelectFiles }
            onDragOver={ @draggingOn }
            onDragLeave={ @draggingOff }
            onDrop={ @draggingOff } />
      when INSERT_STATE
        <EditorTypeImageUrlInsert
            onInsertImageUrl={ @handleChangeImageUrl }
            onCancel={ @activateWelcomeState } />
      when LOADED_STATE
        <EditorTypeImageLoaded
            imageUrl={ @state.imageUrl }
            imageAttachments={ @state.imageAttachments }
            onDelete={ @handleDeleteLoadedImages } />
      else null

  isInsertState: -> @state.currentState is INSERT_STATE

  activateInsertState: -> @setState(currentState: INSERT_STATE)
  activateLoadedState: -> @setState(currentState: LOADED_STATE)
  activateWelcomeState: -> @setState(currentState: WELCOME_STATE)

  draggingOn: -> @setState(dragging: true)
  draggingOff: -> @setState(dragging: false)

  getMediaBoxState: ->
    switch
      when @state.dragging then 'drag-hover'
      when @isInsertState() then 'insert'
      when @state.imageAttachments.length || @state.imageUrl then 'loaded'
      else null

  getInitialCurrentState: ->
    if EditorStore.getEntryValue('imageUrl') or
       EditorStore.getEntryValue('imageAttachments')?.length
      LOADED_STATE
    else
      WELCOME_STATE

  handleDeleteLoadedImages: ->
    @props.onFieldChange 'imageUrl', null
    @props.onFieldChange 'imageAttachments', []
    @activateWelcomeState()

  handleChangeImageUrl: (imageUrl) ->
    image = new Image()

    image.onload = =>
      @props.onFieldChange 'imageUrl', imageUrl
      @activateLoadedState()
    image.onerror = =>
      TastyNotifyController.notifyError i18n.t 'editor_image_doesnt_exist', {imageUrl}

    image.src = imageUrl

  handleSelectFiles: (files) ->
    imageFiles = _.filter files, (file) ->
      file.type.match /(\.|\/)(gif|jpe?g|png)$/i

    unless imageFiles.length
      return TastyNotifyController.notifyError i18n.t 'editor_files_without_images'

    formData = new FormData()

    _.forEach imageFiles, (file) ->
      formData.append 'images[]', file

    EditorActionCreators.createImageAttachments formData
      .then (imageAttachments) =>
        @props.onFieldChange 'imageAttachments', imageAttachments

  getStateFromStore: ->
    title: EditorStore.getEntryValue 'title'
    imageUrl: EditorStore.getEntryValue 'imageUrl'
    imageAttachments: EditorStore.getEntryValue('imageAttachments') || []

module.exports = EditorTypeImage