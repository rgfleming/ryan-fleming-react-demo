import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

class ImageCell extends Component {
    render() {
        const imgSrc = this.props.dataItem[this.props.field];
        return (
            <td>
                <img src={imgSrc}></img>
            </td>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/photos")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">{this.state.title}</h1>
                </header>
                    <Grid data={items}>
                        <GridColumn field="albumId" title="Album No."/>
                        <GridColumn field="title" title="Title"/>
                        <GridColumn field="url" title="URL"/>
                        <GridColumn field="thumbnailUrl" 
                            title="Thumbnail URL"
                            cell={(item) => <ImageCell {...item}/>}
                            />
                    </Grid>
                </div>
            );
        }
    }
}


export default App;