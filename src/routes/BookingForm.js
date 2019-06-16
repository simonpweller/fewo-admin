import React from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Form, Field } from 'react-final-form';
import { Link, withRouter } from 'react-router-dom';
import GlobalContext from '../contexts/global-context';

class BookingForm extends React.Component {

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

  onSubmit = async (formValues) => {
    try {
      if (formValues._id) {
        const res = await axios.put(`/bookings/${formValues._id}`, formValues);
        this.context.bookings.updateBooking(res.data);
        this.props.history.push('/');
      } else {
        const res = await axios.post('/bookings', formValues);
        this.context.bookings.setBookings([...this.context.bookings.bookings, res.data]);
        this.props.history.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <>
        <h1>{this.props.match.params.bookingId ? 'Buchung bearbeiten' : 'Neue Buchung anlegen'}</h1>
        {this.renderForm()}
      </>
    )
  }

  renderForm() {
    const bookingId = this.props.match.params.bookingId;
    let booking = bookingId && this.context.bookings.bookings.find(booking => booking._id === bookingId);
    if (booking) {
      booking.booking.dates.from = format(booking.dates.from, 'YYYY-MM-DD');
      booking.dates.to = format(booking.dates.to, 'YYYY-MM-DD');
    }

    return (
      <Form
        initialValues={booking}
        onSubmit={this.onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-6 form-group">
                <label htmlFor="accommodation">Unterkunft</label>
                <Field
                  name="accommodation"
                  component="select"
                  className="form-control"
                >
                  <option />
                  <option value="house">Ferienhaus</option>
                  <option value="apartment">Ferienwohnung</option>
                </Field>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 form-group">
                <label htmlFor="guest.firstName">Vorname</label>
                <Field
                  name="guest.firstName"
                  component="input"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-sm-6 form-group">
                <label htmlFor="guest.lastName">Nachname</label>
                <Field
                  name="guest.lastName"
                  component="input"
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="guest.streetAddress">Straße und Hausnummer</label>
              <Field
                name="guest.streetAddress"
                component="input"
                type="text"
                className="form-control"
              />
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
                <label htmlFor="guest.zipCode">Postleitzahl</label>
                <Field
                  name="guest.zipCode"
                  component="input"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="guest.city">Stadt</label>
                <Field
                  name="guest.city"
                  component="input"
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
                <label htmlFor="dates.from">Anreisetag</label>
                <Field
                  name="dates.from"
                  component="input"
                  type="date"
                  className="form-control"
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="dates.to">Abreisetag</label>
                <Field
                  name="dates.to"
                  component="input"
                  type="date"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
                <label htmlFor="guest.phone">Telefonnummer</label>
                <Field
                  name="guest.phone"
                  component="input"
                  type="tel"
                  className="form-control"
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="guest.email">eMail-Adresse</label>
                <Field
                  name="guest.email"
                  component="input"
                  type="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="comments">Anmerkungen</label>
              <Field
                name="comments"
                component="textarea"
                className="form-control"
              />
            </div>

            <Link to="/" className="btn btn-danger mr-4">{bookingId ? 'Änderungen verwerfen' : 'Eingaben verwerfen'}</Link>
            <button type="submit" className="btn btn-success">{bookingId ? 'Änderungen speichern' : 'Buchung anlegen'}</button>
          </form>
        )}
      />
    )
  }
}

const WrappedBookingForm = withRouter(BookingForm);
WrappedBookingForm.WrappedComponent.contextType = GlobalContext;

export default WrappedBookingForm;