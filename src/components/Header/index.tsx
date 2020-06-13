import './styles.scss';
import React from 'react';

export default class Header extends React.PureComponent {
    render() {
        return (
            <header className={'headerMain'} >
                hi!
                {this.props.children}
            </header>
        )
    }
}

