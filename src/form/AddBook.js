import Book from './../entities/Book';

import React, { Component } from 'react';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            authorFirstName: '',
            authorLastName: '',
            authorPseudo: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        if (this.state.title && (this.state.authorFirstName || this.state.authorLastName)) {
            fetch('http://localhost:8080/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(new Book(this.state.title, this.state.authorFirstName, this.state.authorLastName, this.state.authorPseudo))
            })
                .then(response => response.json())
                .then(data => this.props.setAppState({ data }))
                .then(this.setState( // clean form
                    {
                        title: "",
                        authorFirstName: "",
                        authorLastName: "",
                        authorPseudo: ""
                    })
                )
        } else {
            this.props.setAppState({
                hasError: true
            })
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="author">Author name</label>
                        <input type="text" value={this.state.authorFirstName} onChange={this.handleChange} name="authorFirstName" />
                    </div>
                    <div>
                        <label htmlFor="authorLastName">Author lastname</label>
                        <input type="text" value={this.state.authorLastName} onChange={this.handleChange} name="authorLastName" />
                    </div>
                    <div>
                        <label htmlFor="author">Pseudo</label>
                        <input type="text" value={this.state.authorPseudo} onChange={this.handleChange} name="authorPseudo" />
                    </div>
                    <div>
                        <label htmlFor="text">Title</label>
                        <input type="text" value={this.state.title} onChange={this.handleChange} name="title" />
                    </div>
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default AddBook;