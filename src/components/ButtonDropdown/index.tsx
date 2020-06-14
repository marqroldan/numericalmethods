import './styles.scss';
import React from 'react';
import DropdownArrow from '@Assets/svg/dropdownArrow';

export default class ButtonDropdown extends React.PureComponent {
  render() {
    return (
      <div className={'ButtonDropdown'}>
        <div className={'ButtonDropdown__methodName'}>Test</div>
        <div className={'ButtonDropdown__arrow'}>
          <DropdownArrow />
        </div>
      </div>
    );
  }
}
