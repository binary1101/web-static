Api              = require '../../api/api'
NotifyController = require '../../controllers/notify'

REPORT_SUCCESS_MESSAGE         = 'Жалоба на пост успешно отправлена'
DELETE_SUCCESS_MESSAGE         = 'Пост успешно удалён'
VOTE_SUCCESS_MESSAGE           = 'Голос за пост отдан'
COMMENT_DELETE_SUCCESS_MESSAGE = 'Комментарий успешно удалён'
COMMENT_REPORT_SUCCESS_MESSAGE = 'Жалоба на пост успешно отправлена'

EntryViewActions =

  addToFavorites: (entryId) ->
    Api.entry.addToFavorites entryId
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  removeFromFavorites: (entryId) ->
    Api.entry.removeFromFavorites entryId
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  startWatch: (entryId) ->
    Api.entry.startWatch entryId
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  stopWatch: (entryId) ->
    Api.entry.stopWatch entryId
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  report: (entryId) ->
    Api.entry.report entryId
      .then ->
        NotifyController.notifySuccess REPORT_SUCCESS_MESSAGE
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  delete: (entryId) ->
    Api.entry.delete entryId
      .then ->
        NotifyController.notifySuccess DELETE_SUCCESS_MESSAGE
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  vote: (entryId) ->
    Api.entry.vote entryId
      .then (rating) ->
        NotifyController.notifySuccess VOTE_SUCCESS_MESSAGE
        rating
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  loadComments: (entryId, toCommentId, limit) ->
    Api.entry.loadComments entryId, toCommentId, limit
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  deleteComment: (commentId) ->
    Api.entry.deleteComment commentId
      .then (response) ->
        NotifyController.notifySuccess COMMENT_DELETE_SUCCESS_MESSAGE
        response
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  reportComment: (commentId) ->
    Api.entry.reportComment commentId
      .then ->
        NotifyController.notifySuccess COMMENT_REPORT_SUCCESS_MESSAGE
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  createComment: (entryId, text) ->
    Api.entry.createComment entryId, text
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  editComment: (commentId, text) ->
    Api.entry.editComment commentId, text
      .fail (xhr) ->
        NotifyController.errorResponse xhr

module.exports = EntryViewActions