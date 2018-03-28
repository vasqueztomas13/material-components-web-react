import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../../../packages/top-app-bar';
import LoremIpsumContent from './LoremIpsumContent';
import NavIcon from './NavIcon';
import {MDCTemporaryDrawer} from '@material/drawer/temporary/index';

import '../../../packages/top-app-bar/index.scss';
import './index.scss';

class Drawer extends React.Component {
  componentDidMount() {
    this.drawer = new MDCTemporaryDrawer(this.drawerEl);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.drawer.open = nextProps.isOpen;
    }
  }

  render() {
    return (
        <aside className="mdc-drawer mdc-drawer--temporary" ref={(element) => {
          this.drawerEl = element;
        }}>
          <nav className="mdc-drawer__drawer">
            <header className="mdc-drawer__header">
              <div
                  className="mdc-drawer__header-content mdc-theme--text-primary-on-primary mdc-theme--primary-bg">

              </div>
            </header>
            <nav className="mdc-drawer__content mdc-list-group">
              <div className="mdc-list">
                <a href="/" className="mdc-list-item ">
                  <i className="material-icons mdc-list-item__graphic"
                     aria-hidden="true">&#xE5C4;</i>Back
                </a>
                <a className="mdc-list-item" href="#">
                  <i className="material-icons mdc-list-item__graphic"
                     aria-hidden="true">star</i>Star
                </a>
                <a className="mdc-list-item" href="#">
                  <i className="material-icons mdc-list-item__graphic"
                     aria-hidden="true">send</i>Sent Mail
                </a>
                <a className="mdc-list-item" href="#">
                  <i className="material-icons mdc-list-item__graphic"
                     aria-hidden="true">drafts</i>Drafts
                </a>
              </div>

              <hr className="mdc-list-divider"/>

              <div className="mdc-list">
                <a className="mdc-list-item" href="#">
                  <i className="material-icons mdc-list-item__graphic"
                     aria-hidden="true">email</i>All Mail
                </a>
                <a className="mdc-list-item" href="#">
                  <i className="material-icons mdc-list-item__graphic"
                     aria-hidden="true">delete</i>Trash
                </a>
                <a className="mdc-list-item" href="#">
                  <i className="material-icons mdc-list-item__graphic"
                     aria-hidden="true">report</i>Spam
                </a>
              </div>
            </nav>
          </nav>
        </aside>
    );
  }
}

class AppBarDrawer extends React.Component {
  state = {
    isOpen: false,
  };
  render() {
    return (
        <div>
          <TopAppBar
              alwaysCollapsed
              className={this.state.isOpen ? 'expand-top-bar' : ''}
              navIcon={<NavIcon action={() => {this.setState({ isOpen: !this.state.isOpen })}}/>}
          />
          <Drawer isOpen={this.state.isOpen} />

        </div>
    );
  }
}

ReactDOM.render((
  <div>
    <AppBarDrawer />
    <LoremIpsumContent />
  </div>
), document.getElementById('app'));



/**


 */