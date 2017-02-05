import React from 'react';
import Title from './Title'
import Box from './Box'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div>
                    <Title/>
                    <Box type="Donuts" src="../../imgs/donut.svg" items={[{type:"Chocolate", amount: 23}, {type:"Chocolate", amount: 23}, {type:"Chocolate", amount: 23}]}/>
                    <Box type="Timbits" src="../../imgs/timbit.svg" items={[{type:"Chocolate", amount: 23}, {type:"Chocolate", amount: 23}, {type:"Chocolate", amount: 23}]}/>
                    <Box type="Muffins" src="../../imgs/muffin.svg" items={[{type:"Chocolate", amount: 23}, {type:"Chocolate", amount: 23}, {type:"Chocolate", amount: 23}]}/>
                    <Box type="Cookies" src="../../imgs/food.svg" items={[{type:"Chocolate", amount: 23}, {type:"Chocolate", amount: 23}, {type:"Chocolate", amount: 23}]}/>
                    <Box type="Pastries" src="../../imgs/croissant.svg" items={[{type:"Chocolate", amount: 23}, {type:"Chocolate", amount: 23}, {type:"Chocolate", amount: 23}]}/>
                    <Box type="Bagels" src="../../imgs/bagel.svg" items={[{type:"Chocolate", amount: 23}, {type:"Chocolate", amount: 23}, {type:"Chocolate", amount: 23}]}/>
                </div>
            </MuiThemeProvider>
        );
    }
}
