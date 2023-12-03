import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Instruction from './Instruction';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showNavbar: true, showContent1: false };
  }

  toggleNavbar = () => {
    this.setState({ showNavbar: !this.state.showNavbar });
  }

  toggleContent1 = () => {
    this.setState({ showContent1: !this.state.showContent1 });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleNavbar}>Toggle Navbar</button>
        {this.state.showNavbar && <Navbar />}
        <button onClick={this.toggleContent1}>Toggle Content1</button>
        {this.state.showContent1 && <Content1 />}
      </div>
    );
  }
}

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: 'Some data' };
  }

  componentDidMount() {
    console.log('Navbar mounted');
  }

  componentDidUpdate() {
    console.log('Navbar updated');
  }

  componentWillUnmount() {
    console.log('Navbar will unmount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should Navbar update?');
    return true;
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}

class Content1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: 'Some other data' };
  }

  componentDidMount() {
    console.log('Content1 mounted');
  }

  componentDidUpdate() {
    console.log('Content1 updated');
  }

  componentWillUnmount() {
    console.log('Content1 will unmount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should Content1 update?');
    return true;
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Instruction />
        <Wrapper />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
