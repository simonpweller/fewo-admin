import React from 'react';
import axios from 'axios';
import BookingsTable from '../components/BookingsTable';
import GlobalContext from '../contexts/global-context';
import { Link, withRouter } from 'react-router-dom';

class Dashboard extends React.Component {

  async componentDidMount() {
    if (!this.context.bookings.fetched) {
      try {
        const res = await axios.get('/bookings');
        this.context.bookings.setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  }

  confirmBooking = async (id) => {
    try {
      const res = await axios.put(`/bookings/${id}`, {
        confirmed: new Date(),
      });
      this.context.bookings.updateBooking(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  deleteBooking = async (id) => {
    try {
      await axios.delete(`/bookings/${id}`);
      this.context.bookings.removeBooking(id);
    } catch (err) {
      console.error(err);
    }
  }

  editBooking = (id) => {
    this.props.history.push(`/buchung/${id}`)
  }

  render() {
    return (
      <>
        <h2>Buchungen</h2>
        <BookingsTable
          bookings={this.context.bookings.bookings}
          onConfirm={this.confirmBooking}
          onDelete={this.deleteBooking}
          onEdit={this.editBooking}
        />
        <Link to="/buchung" className="btn btn-success">
          <i className="fas fa-plus mr-2"></i>
          Neue Buchung anlegen
        </Link>
      </>
    );
  }
}

const WrappedDashboard = withRouter(Dashboard);
WrappedDashboard.WrappedComponent.contextType = GlobalContext;

export default WrappedDashboard;