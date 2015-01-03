CommentsMixin     = require './mixins/comments'
ComponentMixin    = require '../../../mixins/component'
CommentList       = require './comment_list'
CommentCreateForm = require './comment_form/create'
CommentsLoadMore  = require './load_more'
{ PropTypes } = React

LOAD_MORE_COMMENTS_LIMIT = 50
SHOW_STATE    = 'show'
LOADING_STATE = 'load'
ERROR_STATE   = 'error'

EntryComments = React.createClass
  displayName: 'EntryComments'
  mixins: [CommentsMixin, ComponentMixin]

  propTypes:
    entry:        PropTypes.object.isRequired
    commentsInfo: PropTypes.object.isRequired
    user:         PropTypes.object
    limit:        PropTypes.number

  getDefaultProps: ->
    limit: LOAD_MORE_COMMENTS_LIMIT

  getInitialState: ->
    currentState: SHOW_STATE
    comments:     @props.commentsInfo.comments
    totalCount:   @props.commentsInfo.total_count

  render: ->
    <div className="post__comments">
      <div className="comments">
        { @renderLoadMore() }
        { @renderCommentList() }
        { @renderCommentForm() }
      </div>
    </div>

  renderLoadMore: ->
    if @state.totalCount > @state.comments.length
      <CommentsLoadMore
          totalCount={ @state.totalCount }
          loadedCount={ @state.comments.length }
          limit={ @props.limit }
          loading={ @isLoadingState() }
          onClick={ @loadMoreComments } />

  renderCommentList: ->
    if @state.comments.length
      <CommentList
          comments={ @state.comments }
          entry={ @props.entry }
          onCommentDelete={ @removeComment }
          onCommentEdit={ @editComment } />

  renderCommentForm: ->
    if @props.user?
      <CommentCreateForm
          entryId={ @props.entry.id }
          onCommentAdd={ @addComment } />

  isLoadingState: -> @state.currentState is LOADING_STATE

  activateShowState:    -> @safeUpdateState(currentState: SHOW_STATE)
  activateLoadingState: -> @safeUpdateState(currentState: LOADING_STATE)
  activateErrorState:   -> @safeUpdateState(currentState: ERROR_STATE)

module.exports = EntryComments