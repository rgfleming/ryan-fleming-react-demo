import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { filterBy, orderBy } from '@progress/kendo-data-query';
import { ImageCell } from './ryan-kendo-components/ImageCell';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Ryan's First React App",
            error: null,
            isLoaded: false,
            data: [],
            skip: 0,
            take: 25,
            sort: [],
            allowUnsort: true,
            multiple: false,
            filter: undefined
        };
        this.pageChange = this.pageChange.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.filterChange = this.filterChange.bind(this);
    }

    pageChange(event) {
        this.setState({
            skip: event.page.skip,
            take: event.page.take
        });
    }

    sortChange(event) {
        this.setState({
            data: this.getSortedData(event.sort),
            sort: event.sort
        });
    }

    getSortedData(sort) {
        return orderBy(this.state.data, sort);
    }
    
    filterChange(event) {
        this.setState({
            data: this.getFilteredData(event.filter),
            filter: event.filter
        });
    }
    
    getFilteredData(filter) {
        const data = this.state.data.slice();
        return filterBy(data, filter);
    }
    
    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/photos")
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                data: result.slice()
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
            return (
                <div className="App">
                    <header className="App-header">
                        <h2 className="App-title">L<img src={logo} className="App-logo" alt="logo" width="31px;" height="31px;"/>ading...</h2>
                    </header>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" width="100px;" height="100px;"/>
                        <h1 className="App-title">{this.state.title}</h1>
                    </header>
                    <div className="container-fluid App-content">
                        <div className="row">
                            <div className="col"></div>
                            <div className="col">
                                <Grid data={data.slice(this.state.skip, this.state.take + this.state.skip)}
                                    skip={this.state.skip}
                                    take={this.state.take}
                                    total={data.length}
                                    pageable={true}
                                    onPageChange={this.pageChange}
                                    filterable={true}
                                    filter={this.state.filter}
                                    onFilterChange={this.filterChange}
                                    sortable={{allowUnsort:true, mode: 'single'}}
                                    sort={this.state.sort}
                                    onSortChange={this.sortChange}
                                    style={{height:'500px'}}
                                    className="table-condensed">
                                    <GridColumn field="albumId" title="Album" width="75px" filterable={false}/>
                                    <GridColumn field="title" title="Title" filterable={true} width="400px"/>
                                    <GridColumn field="url" title="URL" filterable={true} width="325px"/>
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