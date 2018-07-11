import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import withRipple from '@material/react-ripple';

export class IconButton extends Component {
  render() {
    const {
      className,
      children,
      initRipple,
      unbounded, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    const classes = classnames('mdc-icon-button', className, {
      
    });

    return (
      <button
        className={classes}
        ref={initRipple}
        {...otherProps}
      >
        {children}
      </button>
    );
  }

  addClassesToElement(classes, element) {
    const propsWithClasses = {
      className: classnames(classes, element.props.className),
    };
    return React.cloneElement(element, propsWithClasses);
  }
}

Button.propTypes = {
  raised: PropTypes.bool,
  unelevated: PropTypes.bool,
  outlined: PropTypes.bool,
  disabled: PropTypes.bool,
  unbounded: PropTypes.bool,
  initRipple: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.string,
};

Button.defaultProps = {
  raised: false,
  unelevated: false,
  outlined: false,
  disabled: false,
  unbounded: false,
  initRipple: () => {},
  className: '',
  icon: null,
  children: '',
};

export default withRipple(Button);
