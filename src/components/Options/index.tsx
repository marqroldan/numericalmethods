import './styles.scss';
import React from 'react';

interface IOptions {
  label: string | number;
  value: string | number;
}

interface Props {
  options: IOptions[];
  selectedValue: string | number;
  onChange: Function;
}

interface State {
  expanded: boolean;
  selectedValue: string | number;
}

const unknownObj = {
  label: '?',
  value: '',
};

export default class Options extends React.PureComponent<Props, State> {
  state = {
    expanded: false,
    selectedValue: '',
  };

  updateVisual = () => {
    if (Array.isArray(this.props.options)) {
      if (!this.state.selectedValue && this.props.options[0].value) {
        this.selectItem(this.props.options[0])();
      }
    }
  };

  componentDidMount() {
    this.updateVisual();
  }

  toggle = () => {
    this.setState((state) => ({
      expanded: !state.expanded,
    }));
  };

  selectItem = (item: IOptions) => () => {
    this.setState(
      {
        selectedValue: item.value,
      },
      () => {
        if (this.props.onChange && typeof this.props.onChange === 'function') {
          this.props.onChange(item.value);
        }
      }
    );
  };

  renderItem = (item: IOptions, index: number) => {
    return (
      <div
        onClick={this.selectItem(item)}
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
