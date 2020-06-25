import React, { Component } from 'react';

export default class Test extends Component {
  state = {
    title: '',
    body: '',
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          title: data.title,
          body: data.body,
        }),
      );
    console.log('Did Mount');
  }

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1>
          {title} <br /> <br /> {body}
        </h1>
      </div>
    );
  }
}
