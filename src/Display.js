import React, { Component } from 'react';
import Book from './entities/Book';
import BookList from './BookList';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let name = target.name;
        this.setState({
            [name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.title && this.state.author) {
            fetch('http://localhost:8080/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(new Book(this.state.title, this.state.author))
            })
                .then(response => response.json())
                .then(data => this.props.setAppState({ data }))
                .then(this.setState({
                    title: "",
                    author: ""
                })
                )
        } else {
            this.props.setAppState({
                hasError: true
            })
        }
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
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label htmlFor="author">Author</label>
                                <input type="text" value={this.state.author} onChange={this.handleChange} name="author" />
                            </div>
                            <div>
                                <label htmlFor="text">Title</label>
                                <input type="text" value={this.state.title} onChange={this.handleChange} name="title" />
                            </div>
                            <input type="submit" />
                        </form>
                        <BookList {...this.props} handleDelete={this.handleDelete}></BookList>
                    </React.Fragment> :
                    <h1 style={{ 'color': 'red' }}>Error</h1>
                }
            </div >
        );
    }
}

export default Display;