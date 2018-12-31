import React, { Component } from 'react';

class AppState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            data: []
        }
        this.setAppState = this.setAppState.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/books")
            .then(res => res.json())
            .then(data => this.setAppState({ data }))
            .catch(() => {
                this.setAppState({
                    hasError: true
                })
            })
    }

    setAppState(newState, callback) {
        this.setState(newState, callback);
    }

    render() {
        return (
            <div className="AppState">
                {React.Children.map(this.props.children, child => {
                    return React.cloneElement(child, {
                        appState: this.state,
                        setAppState: this.setAppState,
                        handleSubmit: this.handleSubmit
                    })
                })}
            </div>
        );
    }
}

export default AppState;