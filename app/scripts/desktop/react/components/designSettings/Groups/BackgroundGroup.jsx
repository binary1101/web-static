import DesignSettingsGroup from './Group';
import DesignSettingsOption from '../option/index';
import DesignSettingsOptionState from '../option/state';
import DesignSettingsOptionUpload from '../option/Upload';
import DesignSettingsRadioList from '../common/radioList';

let DesignSettingsBackgroundGroup = React.createClass({
  propTypes: {
    backgroundColor: React.PropTypes.string.isRequired,
    backgroundImageUrl: React.PropTypes.string.isRequired,
    backgroundImageEnabled: React.PropTypes.bool.isRequired,
    backgroundAlignment: React.PropTypes.string.isRequired,
    backgroundColorItems: React.PropTypes.array.isRequired,
    backgroundAlignmentItems: React.PropTypes.array.isRequired,
    onBgImageChange: React.PropTypes.func.isRequired,
    onOptionChange: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <DesignSettingsGroup title="Фон">
        <DesignSettingsOption title="Цвет" name="bgcolor">
          <DesignSettingsOptionState style="circlebtn" />
          <DesignSettingsRadioList
              style="circlebtns"
              optionName="backgroundColor"
              value={this.props.backgroundColor}
              items={this.props.backgroundColorItems}
              className="ds-absolute-left ds-fadein-down"
              onChange={this.props.onOptionChange.bind(null, 'backgroundColor')} />
        </DesignSettingsOption>

        <DesignSettingsOption title="Картинка" name="bgimage">
          <DesignSettingsOptionUpload
              optionName="backgroundImage"
              backgroundImageUrl={this.props.backgroundImageUrl}
              backgroundImageEnabled={this.props.backgroundImageEnabled}
              onBgImageChange={this.props.onBgImageChange}
              onImageVisibilityChange={this.props.onOptionChange.bind(null, 'backgroundImageEnabled')} />
        </DesignSettingsOption>

        <DesignSettingsOption title="Выравнивание" name="bgalignment">
          <DesignSettingsRadioList
              style="dotted"
              optionName="backgroundAlignment"
              value={this.props.backgroundAlignment}
              items={this.props.backgroundAlignmentItems}
              className="ds-absolute-left ds-fadein-down"
              onChange={this.props.onOptionChange.bind(null, 'backgroundAlignment')} />
        </DesignSettingsOption>
      </DesignSettingsGroup>
    );
  }
});

export default DesignSettingsBackgroundGroup;