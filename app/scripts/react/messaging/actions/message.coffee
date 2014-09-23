window.MessageActions = 

  newMessage: ({ conversationId, content, success, error, always }) ->
    messagingService.postMessage { conversationId, content, success, error, always }

  readMessage: (conversationId, messageId) ->
    messagingService.readMessage conversationId, messageId