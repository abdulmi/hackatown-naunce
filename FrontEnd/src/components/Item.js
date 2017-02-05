import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

export default class Item extends Component {
    render() {
        return (
            <div style={{display: 'flex', flexWrap: 'wrap',}}>
                <Chip style={{margin: 4}}>
                    <Avatar size={32}>{this.props.amount}</Avatar>
                    {this.props.type}
                </Chip>
            </div>
        )
    }
}
