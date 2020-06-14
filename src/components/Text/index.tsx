import React from 'react';

export default class Text extends React.PureComponent<React.HTMLAttributes<HTMLDivElement>> {
    render() {
        return (
            <span className={this.props.className}>
                {this.props.children}
            </span>
        );
    }
}