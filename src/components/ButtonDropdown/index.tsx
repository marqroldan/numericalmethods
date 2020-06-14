import './styles.scss';
import React from 'react';
import DropdownArrow from '@Assets/svg/dropdownArrow';

type Value = string | number;

interface Props {
  value: Value;
  options: Value[];
  onChangeValue: Function;
  onClick: Function;
}

interface State {
  dropdownActive: boolean;
}

export default class ButtonDropdown extends React.PureComponent<Props, State> {
  state = {
    dropdownActive: false,
  };

  componentDidMount() {
    if (Array.isArray(this.props.options) && this.props.options.length) {
      this.selectItem(this.props.options[0], false)();
    }
  }

  toggleDropdown = () => {
    this.setState((state) => ({
      dropdownActive: !state.dropdownActive,
    }));
  };

  selectItem = (item: Value, shouldToggle = true) => () => {
    if (this.props.onChangeValue) {
      this.props.onChangeValue(item);
    }

    if (shouldToggle) {
      this.toggleDropdown();
    }
  };

  renderItem = (item: Value, index: number) => {
    return (
      <div
        className={'ButtonDropdownList__item'}
        key={`${index}_`}
        onClick={this.selectItem(item)}
      >
        {item}
      </div>
    );
  };

  render() {
    return (
      <div className={'ButtonDropdownContainer'}>
        <div className={'ButtonDropdown'}>
          <div className={'ButtonDropdown__methodName'}>
            {this.props.value || 'Select Method'}
          </div>
          <div
            className={'ButtonDropdown__arrow'}
            onClick={this.toggleDropdown}
          >
            <DropdownArrow />
          </div>
        </div>
        {this.state.dropdownActive &&
        Array.isArray(this.props.options) &&
        this.props.options.length ? (
          <div className={'ButtonDropdownListContainer'}>
            <div className={'ButtonDropdownList'}>
              {this.props.options.map(this.renderItem)}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
