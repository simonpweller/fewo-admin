import React from 'react';
import axios from 'axios';

// initialize token and set up axios headers
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
axios.defaults.baseURL = 'http://localhost:8081'

const GlobalContext = React.createContext();

export class GlobalProvider extends React.Component {
  state = {
    user: {
      hasAuth: token !== null,
      setToken: token => {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.setState({
          user: {
            ...this.state.user,
            hasAuth: true,
          },
        });
      },
      clearToken: () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        this.setState({
          user: {
            ...this.state.user,
            hasAuth: false,
          },
          bookings: {
            ...this.state.bookings,
            bookings: [],
            fetched: false,
          },
        });
      }
    },
    bookings: {
      fetched: false,
      bookings: [],
      setBookings: (bookings) => {
        this.setState({
          bookings: {
            ...this.state.bookings,
            bookings,
            fetched: true,
          },
        });
      },
      updateBooking: (updatedBooking) => {
        const bookings = [...this.state.bookings.bookings];
        const bookingIndex = bookings.findIndex(booking => booking._id === updatedBooking._id);
        bookings[bookingIndex] = updatedBooking;
        this.setState({
          bookings: {
            ...this.state.bookings,
            bookings,
          }
        })
      },
      removeBooking: (id) => {
        const bookings = [...this.state.bookings.bookings].filter(booking => booking._id !== id);
        this.setState({
          bookings: {
            ...this.state.bookings,
            bookings,
          }
        });
      },
    }
  }
  render() {
    return (
      <GlobalContext.Provider value={this.state}>
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
}

export default GlobalContext;