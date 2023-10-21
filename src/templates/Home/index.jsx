import { Component } from "react";
import './styles.css';

export class Home extends Component {
    state = {
        counter: 0
    }

    handleClick = () => {
        this.setState({counter: this.state.counter + 1});
    }


    render() {

          return (
            <div className="container">
                <h1>{this.state.counter}</h1>
                <button onClick={this.handleClick}>Increment</button>
                <p>It works and you found me!</p>
            </div>
          )
    }
}