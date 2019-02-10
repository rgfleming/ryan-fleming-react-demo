import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { filterBy } from '@progress/kendo-data-query';
import { ImageCell } from './ryan-kendo-components/ImageCell';
import dropdownFilterCell from './telerik-kendo-components/dropdownFilterCell';
import 'bootstrap/dist/css/bootstrap.min.css';

const albums = [1,2,3];

class App extends Component {
    AlbumFilterCell;
    
    constructor(props) {
        super(props);
        this.state = {
            title: "Ryan's First React App",
            error: null,
            isLoaded: false,
            data: [],
            filter: undefined
        };
        this.filterChange = this.filterChange.bind(this);
        this.AlbumFilterCell = dropdownFilterCell(albums, 'All');
    }

    filterChange(event) {
        this.setState({
            data: this.getData(event.filter),
            filter: event.filter
        });
    }

    getData(filter) {
        const data = this.state.data.slice();
        return filterBy(data, filter);
    }
    
    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/photos")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    data: result
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
        const { error, isLoaded, data } = this.state;
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
                    <div className="container-fluid" style={{backgroundColor:'red'}}>
                        <div className="row">
                            <div className="col"></div>
                            <div className="col">
                                <Grid data={data}
                                    filterable={true}
                                    filter={this.state.filter}
                                    onFilterChange={this.filterChange}
                                    style={{height:'400px'}}>
                                    <GridColumn field="albumId" title="Album" filterCell={this.AlbumFilterCell} width="75px"/>
                                    <GridColumn field="title" title="Title" filterable={false} width="400px"/>
                                    <GridColumn field="url" title="URL" filterable={false} width="325px"/>
                                    <GridColumn 
                                        field="thumbnailUrl"
                                        title=" "
                                        filterable={false}
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