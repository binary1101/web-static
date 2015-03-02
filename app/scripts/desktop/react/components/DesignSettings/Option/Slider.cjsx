{ PropTypes } = React

DesignSettingsOptionSlider = React.createClass
  displayName: 'DesignSettingsOptionSlider'

  propTypes:
    children: PropTypes.element.isRequired

  render: ->
    <div className="slider ds-fadein-down">
      <div className="slider__main">
        <div className="slider__list">
          <div className="slider__table">
            <div className="slider__table-cell">
              { @props.children }
            </div>
          </div>
        </div>
      </div>
    </div>

module.exports = DesignSettingsOptionSlider