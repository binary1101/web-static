assign           = require 'react/lib/Object.assign'
EntryViewActions = require '../../../../actions/view/entry'

CommentsMixin =

  # getInitialState: ->
  #   isPostError:       false
  #   isLoadError:       false
  #   isLoadMoreError:   false
  #   isPostLoading:     false
  #   isLoadLoading:     false
  #   isLoadMoreLoading: false

  # componentDidMount: ->
  #   if fromId = @_getCommentIdFromHash()
  #     @loadCommentListFromCommentId fromId
  #   else if @_getFirstLoadLimit() > 0
  #     @loadCommentList()

  # loadCommentList: ->
  #   @setState isLoadError: false, isLoadLoading: true

  #   @createRequest
  #     url: ApiRoutes.comments_url()
  #     data: {
  #       entry_id: @props.entryId
  #       limit:    @_getFirstLoadLimit()
  #     }
  #     success: (data) =>
  #       @safeUpdate =>
  #         @setState {
  #           comments:    data.comments
  #           totalCount:  data.total_count
  #         }
  #         $(document).trigger 'domChanged'
  #     error: (data) =>
  #       @safeUpdateState isLoadError: true
  #       TastyNotifyController.errorResponse data
  #     complete: =>
  #       @safeUpdateState isLoadLoading: false

  # loadCommentListFromCommentId: (id) ->
  #   @setState isLoadError: false, isLoadLoading: true

  #   @createRequest
  #     url: ApiRoutes.comments_url()
  #     data: {
  #       entry_id:        @props.entryId
  #       from_comment_id: id - 1
  #       limit:           999
  #     }
  #     success: (data) =>
  #       @safeUpdate =>
  #         @setState {
  #           comments:        data.comments
  #           totalCount:      data.total_count
  #           sharedCommentId: id
  #         }
  #         $(document).trigger 'domChanged'
  #     error: (data) =>
  #       @safeUpdateState isLoadError: true
  #       TastyNotifyController.errorResponse data
  #     complete: =>
  #       @safeUpdateState isLoadLoading: false

  loadMoreComments: ->
    entryId     = @props.entry.id
    toCommentId = @state.comments[0].id
    limit       = @props.limit

    @activateLoadingState()

    EntryViewActions.loadComments entryId, toCommentId, limit
      .then (commentsInfo) =>
        @safeUpdate =>
          newComments = commentsInfo.comments.concat @state.comments

          @activateShowState()
          @setState
            comments:   newComments
            totalCount: commentsInfo.total_count
      .fail @activateErrorState

  removeComment: (comment) ->
    newComments = @state.comments[..]

    for newComment, i in newComments when newComment is comment
      newComments.splice i, 1
    
    @safeUpdateState
      comments: newComments
      totalCount: @state.totalCount - 1

  addComment: (comment) ->
    newComments = @state.comments.concat comment

    @safeUpdateState
      comments: newComments
      totalCount: @state.totalCount + 1

  editComment: (comment) ->
    newComments = @state.comments[..]

    for newComment in newComments when newComment.id is comment.id
      assign newComment, comment
      break

    @safeUpdateState(comments: newComments)

  # loadMoreComments: ->
  #   @setState isLoadMoreError: false, isLoadMoreLoading: true

  #   @createRequest
  #     url: ApiRoutes.comments_url()
  #     data:
  #       entry_id:      @props.entryId
  #       limit:         @props.limit
  #       to_comment_id: @state.comments[0].id
  #     success: (data) =>
  #       @safeUpdate =>
  #         newComments = data.comments.concat @state.comments

  #         @setState {
  #           comments:    newComments
  #           totalCount:  data.total_count
  #         }
  #         $(document).trigger 'domChanged'
  #     error: (data) =>
  #       @safeUpdateState isLoadMoreError: true
  #       TastyNotifyController.errorResponse data
  #     complete: =>
  #       @safeUpdateState isLoadMoreLoading: false

  # removeComment: (comment) ->
  #   newComments = _.without @state.comments, comment
  #   @setState comments: newComments, totalCount: @state.totalCount - 1

  # _getFirstLoadLimit: ->
  #   unless @props.isEntryPage
  #     if @props.totalCommentsCount > 5 then 3 else @props.totalCommentsCount
  #   else
  #     50

  # _getCommentIdFromHash: ->
  #   hash = window.location.hash
  #   parseInt hash.match(/^#comment-(\d+)/)?[1]

module.exports = CommentsMixin