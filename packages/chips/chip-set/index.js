import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {MDCChipSetFoundation} from '@material/chips';

import Chip from '../chip';

export default class ChipSet extends Component {

  foundation_ = null;

  constructor(props) {
    super(props);
    this.maxId = 0;
    this.state = {
      classList: new Set(),
      chips: this.props.chips.map((chip) => {
        return {
          label: chip.label,
          class: chip.class,
          id: this.maxId++
        }
      })
    };
  }

  componentDidMount() {
    this.foundation_ = new MDCChipSetFoundation(this.adapter);
    this.foundation_.init();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  /**
  * getters
  */

  get classes() {
    const {classList} = this.state;
    const {className, choice, filter} = this.props;
    return classnames('mdc-chip-set', Array.from(classList), className, {
      'mdc-chip-set--choice': choice,
      'mdc-chip-set--filter': filter,
    });
  }

  get adapter() {
    return {
      hasClass: (className) => this.classes.split(' ').includes(className),
    };
  }

  renderInputChip(chip) {
    return (
      <Chip key={chip.id} chip={chip} className={chip.class}/>
    );
  }

  render() {
    return (
      <div className={this.classes}>
        {this.state.chips.map(this.renderInputChip.bind(this))}
      </div>
    );
  }
}

// Chip.propTypes = {
//   className: PropTypes.string,
//   label: PropTypes.string.isRequired,
//   selected: PropTypes.bool,
//   initRipple: PropTypes.func,
// };

// Chip.defaultProps = {
//   className: '',
//   selected: false,
//   initRipple: () => {},
// };