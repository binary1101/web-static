window.ReactUjs = (->
  CLASS_NAME_ATTR = 'data-react-class'
  PROPS_ATTR      = 'data-react-props'

  findReactDOMNodes = ->
    SELECTOR = '[' + CLASS_NAME_ATTR + ']'
    $(SELECTOR)

  mountReactComponents = ->
    nodes = findReactDOMNodes()
    i = 0

    while i < nodes.length
      node = nodes[i]
      className = node.getAttribute CLASS_NAME_ATTR

      component = window[className] || eval.call(window, className)
      if component?
        propsJson = node.getAttribute PROPS_ATTR
        props     = propsJson && JSON.parse(propsJson)
        React.renderComponent component(props), node
      ++i

  unmountReactComponents = ->
    nodes = findReactDOMNodes()
    i = 0

    while i < nodes.length
      React.unmountComponentAtNode nodes[i]
      ++i

  initEvents = ->
    $(mountReactComponents)
    $(document).on 'page:change', mountReactComponents
    $(window).unload(unmountReactComponents)

  return {
    initEvents: initEvents
  }
)()

module.exports = ReactUjs