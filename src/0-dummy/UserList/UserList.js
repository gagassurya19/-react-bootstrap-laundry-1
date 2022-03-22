import React from "react";

export default class UserList extends React.Component {
  render() {
    return (
      <>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{this.props.id_user}</th>
              <td>{this.props.nama}</td>
              <td>{this.props.username}</td>
              <td>{this.props.email}</td>
              <td>{this.props.role}</td>
              <td>{this.props.role}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
// INI KEDOBLE LIST HEADERNYA
