import React, { Component } from 'react';
import BookList from './BookList';
import AddBook from './form/AddBook';

class Display extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
        let elemToDeleteId = e.target.parentElement.parentElement.dataset.id;
        fetch(`http://localhost:8080/api/books/${elemToDeleteId}`, {
            method: 'DELETE',

        })
            .then(response => response.json())
            .then(data => this.props.setAppState({ data }))
    }

    render() {
        return (
            <div>
                {!this.props.appState.hasError ?
                    <React.Fragment>
                        <AddBook {...this.props}></AddBook>
                        <BookList {...this.props} handleDelete={this.handleDelete}></BookList>
                    </React.Fragment> :
                    <h1 style={{ 'color': 'red' }}>Error</h1>
                }
            </div >
        );
    }
}

export default Display;