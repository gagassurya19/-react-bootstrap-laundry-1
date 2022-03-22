import React from "react";

export default class ListTable extends React.Component {
  render() {
    return (
      <>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {this.props.users.map((item, index) => (
              <tr key={item.id_user}>
                <td>{item.nama}</td>
                <td>Rp {item.username}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.action}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="4" className="text-danger text-bold">
                <h4>Total</h4>
              </td>
              <td className="text-right text-danger text-bold">{/* <h4>Rp {this.getAmount(this.props.products)}</h4> */}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
// INI MALAH PUTIH SEMUA
