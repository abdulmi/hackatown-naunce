import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

export default class Title extends Component {
    render() {
        return (
            <AppBar title={this.props.text}/>
        );
    }
}
