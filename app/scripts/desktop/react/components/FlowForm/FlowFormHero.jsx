import EditableField from '../common/EditableField';
import FlowFormUpload from './FlowFormUpload';

let FlowFormHero = React.createClass({
  propTypes: {
    flow: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      title: React.PropTypes.string,
      flowpic: React.PropTypes.object.isRequired
    }).isRequired,
    onNameChange: React.PropTypes.func.isRequired,
    onTitleChange: React.PropTypes.func.isRequired,
    onPicFileChange: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      backgroundImage: ThumborService.newImageUrl(this.props.flow.flowpic.original_url, {
        width: 586,
        height: 286
      })
    };
  },

  render() {
    let heroStyles = {
      backgroundImage: `url("${this.state.backgroundImage}")`
    };

    return (
      <div className="flow-form__hero" style={heroStyles}>
        <FlowFormUpload onUpload={this.handleUpload} />
        <div className="flow-form__hero-box">
          <div className="flow-form__hero-title">
            <EditableField
                defaultValue={this.props.flow.name}
                placeholder="#Название потока"
                returnFor="blur"
                onChange={this.props.onNameChange} />
          </div>
          <div className="flow-form__hero-text">
            <EditableField
                defaultValue={this.props.flow.title}
                placeholder="Краткое описание, не более 140 символов"
                returnFor="blur"
                onChange={this.props.onTitleChange} />
          </div>
        </div>
      </div>
    );
  },

  showPicFilePreview(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({backgroundImage: e.target.result});
    };
    reader.readAsDataURL(file);
  },

  handleUpload(file) {
    this.showPicFilePreview(file);
    this.props.onPicFileChange(file);
  }
});

export default FlowFormHero;