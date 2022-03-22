// inisiasi library default
import React from "react";

// inisiasi component
import Layout from "../components/fragment/Layout";
import Table from "../components/fragment/Table";
// inisiasi hit api
import axios from "axios";
import { baseUrl } from "../config";

export default class Member extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // call variable
      members: [],
      id_member: "",
      nama: "",
      alamat: "",
      jenis_kelamin: "",
      telp: "",
      token: "",
      image: "",
      uploadFile: true,

      // manage list
      action: "",
      isModalOpen: false,
    };
    // // login statement
    // if (localStorage.getItem("token")) {
    //   this.state.token = localStorage.getItem("token");
    // } else {
    //   window.location = "/login";
    // }
    // this.headerConfig.bind(this);

    // headerConfig = () => {
    //   let header = {
    //     headers: { Authorization: `Bearer ${this.state.token}` },
    //   };
    //   return header;
    // };

    // call table header
    this.column = [
      {
        heading: "Nama",
        value: (v) => v.nama,
      },
      {
        heading: "Alamat",
        value: (v) => v.alamat,
      },
      {
        heading: "Telp",
        value: (v) => v.telp,
      },
      // {
      //   heading: "Role",
      //   value: (v) => v.image,
      // },
      {
        heading: "Action",
        // value: (v) => renderAction(v.order),
      },
    ];
  }

  // function lifecycle
  componentDidMount() {
    this.getMember();
  }

  // function to do
  getMember = async () => {
    let url = baseUrl + "/member";
    await axios
      .get(url)
      .then((response) => {
        this.setState({ members: response.data.data });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.state.members);
  };

  render() {
    return (
      <>
        <Layout>
          <h1>ini MEMBER</h1>
          <div className="row">
            <div className="col-12 card shadow p-4 rounded-3 border-0">
              <div className="d-flex align-items-center mb-2 justify-content-between">{/* <h4 className="h4">{"Total : " + (response.meta ? response.meta.totalData : 0)}</h4> */}</div>
              <Table column={this.column} data={this.state.members} />
            </div>
          </div>
        </Layout>
      </>
    );
  }
}
