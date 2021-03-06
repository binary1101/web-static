import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Image from './Image';

function Avatar(props) {
  function getAvatarClasses() {
    return classnames({
      'avatar': true,
      'anonymous_char': props.userpic.kind === 'anonymous',
    });
  }

  function renderImage() {
    const { name, userpic: { original_url: url }, size } = props;
    const image = {
      url,
      geometry: {
        width: size,
        height: size,
      },
    };

    return (
      <span className={getAvatarClasses()}>
        <Image
          alt={name}
          className="avatar__img"
          image={image}
        />
      </span>
    );
  }

  function renderSymbol() {
    const { default_colors: { background, name }, symbol } = props.userpic;
    const avatarStyles = {
      backgroundColor: background,
      color: name,
    };

    return (
      <span className={getAvatarClasses()} style={avatarStyles}>
        <span className="avatar__text">
          {symbol}
        </span>
      </span>
    );
  }

  return (props.userpic.original_url != null) ? renderImage() : renderSymbol();
}

Avatar.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number.isRequired,
  userpic: PropTypes.object.isRequired,
};

Avatar.defaultProps = {
  size: 220,
};

export default Avatar;
