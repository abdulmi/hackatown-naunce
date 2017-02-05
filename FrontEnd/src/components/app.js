import React, {Component} from 'react';
import Title from './Title';
import Box from './Box';
import request from 'request';
import Menu from '../../menu.json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unfiltered: []
        }
        this.grab();
    }
    httpGetAsync(url, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    }
    grab() {
        this.httpGetAsync(this.props.url, (res) => {
            res = JSON.parse(res)
            this.setState({"unfiltered":res["Items"]});
        })
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div>
                    <Title text="Tim Horton's Baked Goods Inventory"/>
                    {Object.keys(Menu).map((key) => {
                        var filtered = this.state.unfiltered.filter((item) => {
                            return (new RegExp(Menu[key].pattern)).test(item.type)
                        })
                        return <Box title={key} src={Menu[key].src} items={filtered}/>
                    })}
                </div>
            </MuiThemeProvider>
        );
    }
}
