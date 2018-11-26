import React from 'react';
import { format } from 'date-fns';

export default ({ bookings, onConfirm, onDelete, onEdit }) => (
  <table className="table table-striped table-responsive">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Zeitraum</th>
        <th scope="col">Name</th>
        <th scope="col">Kontakt</th>
        <th scope="col">Anmerkungen</th>
        <th scope="col">Eintrag</th>
        <th scope="col">Bearbeiten</th>
      </tr>
    </thead>
    <tbody>
      {bookings.map(booking => (
        <tr key={booking._id}>
          <td className="align-middle">{booking.accommodation === 'house' ? <i className="fas fa-home"></i> : <i className="far fa-building"></i>}</td>
          <td className="align-middle">{format(booking.arrivalDate, 'DD.MM.YY')} - {format(booking.departureDate, 'DD.MM.YY')}</td>
          <td className="align-middle">{booking.guest && booking.guest.firstName} {booking.guest && booking.guest.lastName}</td>
          <td className="align-middle">
            {booking.guest && booking.guest.phone}
            <br />
            {booking.guest && booking.guest.email}
          </td>
          <td className="align-middle">{booking.comments}</td>
          <td className="align-middle">{format(booking.createdAt, 'DD.MM.YY HH:MM')}</td>
          <td className="text-center align-middle">
            <button className="btn btn-sm btn-primary mx-1" onClick={() => onEdit(booking._id)}>
              <i className="fas fa-edit"></i>
            </button>

            {!booking.confirmed &&
              <button className="btn btn-sm btn-success mx-1" onClick={() => onConfirm(booking._id)}>
                <i className="fas fa-check" />
              </button>
            }

            <button className="btn btn-sm btn-danger mx-1" onClick={() => onDelete(booking._id)}>
              <i className="fas fa-trash-alt" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)