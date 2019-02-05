import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { ImageCell } from './ImageCell';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Ryan's First React App",
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
                        <img src={logo} className="App-logo" alt="logo" width="100px;" height="100px;"/>
                        <h1 className="App-title">{this.state.title}</h1>
                    </header>
                    <div className="container">
                        <div className="row">
                            <div className="col"></div>
                            <div className="col-8">
                                <Grid data={items} style={{ height: '400px' }}>
                                    <GridColumn field="albumId" title="Album No." width="50px"/>
                                    <GridColumn field="title" title="Title" width="400px"/>
                                    <GridColumn field="url" title="URL" width="300px"/>
                                    <GridColumn 
                                        field="thumbnailUrl" 
                                        title="Thumbnail URL"
                                        width="50px"
                                        cell={(item) => <ImageCell {...item} width="21px;" height="21px;"/>}
                                        />
                                </Grid>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}


export default App;