import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      console.log('DELETE_CONTACT', action.payload);
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload,
        ),
      };
    case 'ADD_CONTACT':
      console.log('ADD_CONTACT', action.payload);
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };
    case 'UPDATE_CONTACT':
      console.log('UPDATE_CONTACT', { action });
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact,
        ),
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: (action) => {
      console.log('DISPATCH', { action });
      this.setState((state) => {
        console.log('SET STATE', { action });

        return reducer(state, action);
      });
    },
  };

  async componentDidMount() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    this.setState({
      contacts: res.data,
    });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
