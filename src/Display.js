import React, { Component } from 'react';
import Book from './entities/Book';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: ''
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
    }

    render() {
        return (
            <div>
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
                {
                    this.props.appState.data && this.props.appState.data.map(
                        (item, idx) => (<div key={idx}>
                            {item.id} : {item.title} - {item.author}
                        </div>)
                    )
                }
            </div >
        );
    }
}

export default Display;