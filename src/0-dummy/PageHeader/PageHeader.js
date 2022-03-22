// inisiasi library default
import React from "react";

// inisiasi component
// import Layout from "../../components/fragment/Layout";
import { FaBeer } from "react-icons/fa";

export default class PageHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      // call variable
    };
  }
  render() {
    return (
      <>
        <div className="card">
          <div className="bg-warning">
            <FaBeer />
            <h4>ini PAGE HEADER</h4>
            <p>sek ini skip dulu aja yak</p>
          </div>
        </div>
      </>
    );
  }
}
