// inisiasi library default
import React from "react";

// inisiasi component
import Layout from "../../components/fragment/Layout";
import CountCard from "../../components/element/Countcard/Countcard";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      // call variable
    };
  }
  render() {
    return (
      <>
        <Layout>
          <h1>ini HOME</h1>
          <div className="row">
            <CountCard
              name="Ditanggapi"
              bg="info"
              // value={statistic.data.responded}
              value="23"
            />
            <CountCard
              name="Ditanggapi"
              bg="info"
              // value={statistic.data.responded}
            />
            <CountCard
              name="Ditanggapi"
              bg="info"
              // value={statistic.data.responded}
            />
            <CountCard
              name="Ditanggapi"
              bg="info"
              // value={statistic.data.responded}
            />
          </div>
        </Layout>
      </>
    );
  }
}
