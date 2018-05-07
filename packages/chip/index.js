import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCChipFoundation} from '@material/chips';

import withRipple from '@material/react-ripple';

export class Chip extends React.Component {

  state = {
    classList: new Set(),
  };

  componentDidMount() {
    this.initializeFoundation();

    if (this.props.selected) {
      this.foundation_.setSelected(this.props.selected);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.foundation_.setSelected(nextProps.selected);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      this.handleWidthChange();
    }
  }

  initializeFoundation = () => {
    this.foundation_ = new MDCChipFoundation(this.adapter);
    this.foundation_.init();
  }

  get classes() {
    const {classList} = this.state;
    const {
      selected,
      filter,
      action,
      leadingIcon,
      trailingIcon,
      className,
    } = this.props;

    return classnames('mdc-chip', Array.from(classList), className, {
      'mdc-chip--selected': selected,
    });
  }

  get adapter() {
    return {
      addClass: (className) =>
          this.setState({classList: this.state.classList.add(className)}),
      removeClass: this.removeClassFromClassList,
    };
  }

  addClassToElement = (child, classToAdd) => {
    if (!child) return;
    const className = `${child.props.className} ${classToAdd}`;
    const props = Object.assign({}, child.props, {className});
    return React.cloneElement(child, props);
  };

  addTextClassToChildren = () => {
    return React.Children.map(this.props.children, (child) => {
      return this.addClassToElement(child, 'mdc-chip__text');
    });
  };

  render() {
    const {
      /* eslint-disable */
      selected,
      filter,
      action,
      leadingIcon,
      trailingIcon,
      /* eslint-enable */
      initRipple,
      ...otherProps
    } = this.props;

    const leadingClass = `mdc-chip__icon mdc-chip__icon--leading${selected ? '' : ' mdc-chip__icon--leading-hidden'}`;

    return (
        <div
          className={this.classes}
          ref={initRipple}
          {...otherProps}>
          {this.addClassToElement(leadingIcon, leadingClass)}
          {this.getCheckmark(filter)}
          {this.addTextClassToChildren()}
          {this.addClassToElement(trailingIcon, 'mdc-chip__icon mdc-chip__icon--trailing')}
        </div>
    );
  }

  getCheckmark(filter = false) {
    if (filter) {
      return (
          <div className='mdc-chip__checkmark'>
            <svg className='mdc-chip__checkmark-svg' viewBox='-2 -3 30 30'>
              <path className='mdc-chip__checkmark-path' fill='none'
                    stroke='black' d='M1.73,12.91 8.1,19.28 22.79,4.59' />
            </svg>
          </div>
      );
    }
  }
}

Chip.propTypes = {
  selected: PropTypes.bool,
  filter: PropTypes.bool,
  action: PropTypes.bool,
  leadingIcon: PropTypes.element,
  trailingIcon: PropTypes.element,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  initRipple: PropTypes.func,
};

Chip.defaultProps = {
  check: false,
  filter: false,
  action: false,
  leadingIcon: null,
  trailingIcon: null,
  className: '',
  initRipple: () => {},
};

export default withRipple(Chip);
