import React, {Component} from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import Item from './Item'

export default class Box extends Component {
    render() {
        return (
            <Card>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    <CardTitle title={this.props.title}/>
                    <CardMedia><img src={this.props.src}/></CardMedia>
                    <CardText>
                    {this.props.items.map((item) => {
                        console.log(item)
                        return <Item type={item.type} amount={item.freq} />
                    })}
                </CardText>
                </div>
            </Card>

        )
    }
}
