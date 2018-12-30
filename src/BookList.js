import React, { Component } from 'react';

class BookList extends Component {

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Title</td>
                        <td>Author</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.appState.data && this.props.appState.data.map(
                            (item, idx) => (
                                <tr key={idx}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td data-id={idx}>
                                        <div>
                                            <button onClick={this.props.handleDelete}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        );
    }
}

export default BookList;