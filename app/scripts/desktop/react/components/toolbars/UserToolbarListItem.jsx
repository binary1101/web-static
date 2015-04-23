import classnames from 'classnames';

let UserToolbarListItem = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    url: React.PropTypes.string,
    badgeCount: React.PropTypes.number,
    badgeClassName: React.PropTypes.string,
    stayOpen: React.PropTypes.bool,
    onClick: React.PropTypes.func
  },

  getInitialState() {
    return {
      opened: false
    };
  },

  componentDidMount() {
    $(this.refs.link.getDOMNode()).tooltip({
      title: this.props.title,
      placement: 'right',
      container: '.toolbar--main'
    });
  },

  componentWillReceiveProps(nextProps) {
    if (!nextProps.stayOpen && this.state.opened) {
      this.setState({opened: false});
    }
  },

  componentWillUnmount() {
    $(this.refs.link.getDOMNode()).tooltip('destroy');
  },

  render() {
    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {opened: this.state.opened});
    });

    let itemClasses = classnames('toolbar__nav-item', {
      '__opened': this.state.opened
    });

    return (
      <li className={itemClasses}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
        <a ref="link"
           href={this.props.url}
           className="toolbar__nav-link"
           onClick={this.handleClick}>
          <i className={`icon ${this.props.icon}`} />
          <span className="toolbar__nav-text">
            {this.props.title}
          </span>
          {this.renderBadge()}
        </a>
        {children}
      </li>
    );
  },

  renderBadge() {
    if (this.props.badgeCount) {
      return (
        <span className={this.props.badgeClassName}>
          {this.props.badgeCount}
        </span>
      );
    }
  },

  handleMouseEnter() {
    if (this.props.children) {
      this.setState({opened: true});
    }
  },

  handleMouseLeave() {
    if (!this.props.stayOpen) {
      this.setState({opened: false});
    }
  },

  handleClick(e) {
    if (typeof this.props.onClick === 'function') {
      e.preventDefault();
      this.props.onClick();
    }
  }
});

export default UserToolbarListItem;