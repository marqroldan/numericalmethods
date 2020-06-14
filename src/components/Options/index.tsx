import './styles.scss';
import React from 'react';

interface Props {
  options: {
    [key: string]: any;
  }[];
  selectedValue: string | number;
  onChange: Function;
}

interface State {
  expanded: boolean;
  selectedItem: {
    [key: string]: any;
  };
  selectedValue: string | number;
}

const unknownObj = {
  label: '?',
  value: '',
};

export default class Options extends React.PureComponent<Props, State> {
  state = {
    expanded: false,
    selectedItem: { ...unknownObj },
    selectedValue: '',
  };

  updateVisual = () => {};

  componentDidMount() {}

  toggle = () => {
    this.setState((state) => ({
      expanded: !state.expanded,
    }));
  };

  selectItem = (value) => () => {
    this.setState(
      {
        selectedValue: value,
      },
      () => {
        if (this.props.onChange && typeof this.props.onChange === 'function') {
          this.props.onChange(value);
        }
      }
    );
  };

  renderItem = (item, index) => {
    return (
      <div
        onClick={this.selectItem(item.value)}
        className={
          item.value === this.state.selectedValue
            ? 'Options__item Options__item--selected'
            : 'Options__item'
        }
        key={`${index}_`}
      >
        {item.label}
      </div>
    );
  };

  render() {
    const className = this.state.expanded
      ? 'Options Options--expanded'
      : 'Options';

    const selectedItem =
      this.props.options.find(
        (option) => option.value === this.state.selectedValue
      ) || unknownObj;
    return (
      <div className={className} onClick={this.toggle}>
        {this.state.expanded
          ? Array.isArray(this.props.options)
            ? this.props.options.map(this.renderItem)
            : 'Invalid options'
          : selectedItem.label}
      </div>
    );
  }
}
