// inisiasi library default
import React from "react";
import { Modal } from "bootstrap";
// import { event } from "jquery";
// import { FaBeerIcon } from "@react-icons/all-files/fa/FaBeer";

// inisiasi component
import Layout from "../../components/fragment/Layout";
// import Table from "../../components/fragment/Table";
// inisiasi hit api
import axios from "axios";
import { baseUrl } from "../../config";

export default class Transaksi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // call variable
      transaksis: [],
      id_transaksi: "",
      id_member: "",
      tgl: "",
      batas_waktu: "",
      tgl_bayar: "",
      status: "",
      dibayar: "",
      id_user: "",
      id_outlet: "",

      //utk auth
      token: "",

      // utk manage list
      action: "",

      // login statement
      // if(!localStorage.getItem("token")){
      //     window.location.href = "/login"
      // }
    };
  }

  // GET -> manggil data
  getTransaksis() {
    let url = baseUrl + "/transaksi";
    axios
      .get(url)
      .then((response) => {
        this.setState({ transaksis: response.data.data });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.state.transaksis);
  }

  // function tambah data
  addData() {
    //Memunculkan Modal
    this.modalTransaksi = new Modal(document.getElementById("edit-modal"));
    this.modalTransaksi.show();

    //Mengosongkan input
    this.setState({
      id_transaksi: 0,
      id_member: 0,
      tgl: 0,
      batas_waktu: "",
      tgl_bayar: 0,
      status: "",
      dibayar: 0,
      id_user: 0,
      id_outlet: 0,

      uploadFile: true, // aksi upload file
      action: "insert", // target aksi
    });
  }

  // function ubah data
  updateData(selecteditem) {
    //Memunculkan Modal
    this.modalTransaksi = new Modal(document.getElementById("edit-modal"));
    this.modalTransaksi.show();

    //mencari posisi index dari data member berdasarkan id_member pada array members
    let index = this.state.transaksis.findIndex((transaksi) => transaksi.id_transaksi === selecteditem);

    this.setState({
      id_transaksi: this.state.transaksis[index].id_transaksi,
      id_member: this.state.transaksis[index].id_member,
      tgl: this.state.transaksis[index].tgl,
      batas_waktu: this.state.transaksis[index].batas_waktu,
      tgl_bayar: this.state.transaksis[index].tgl_bayar,
      id_user: this.state.transaksis[index].id_user,
      id_outlet: this.state.transaksis[index].id_outlet,

      action: "ubah",
    });
  }

  // function simpan data
  saveData(ev) {
    ev.preventDefault(); // untuk mencegah berjalannya aksi default dari form submit
    this.modalTransaksi.hide();

    if (this.state.action === "tambah") {
      let endpoint = baseUrl + "/transaksi";
      let newTransaksi = {
        id_transaksi: this.state.id_transaksi,
        id_member: this.state.id_member,
        tgl: this.state.tgl,
        batas_waktu: this.state.batas_waktu,
        tgl_bayar: this.state.tgl_bayar,
        status: this.state.status,
        dibayar: this.state.dibayar,
        id_user: this.state.id_user,
        id_outlet: this.state.id_outlet,
      };
      axios
        .post(endpoint, newTransaksi)
        .then((response) => {
          window.alert(response.data.message);
          this.getTransaksis();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === "ubah") {
      this.newTransaksi.hide();

      let endpoint = baseUrl + "/transaksi/" + this.state.id_transaksi;
      let data = {
        id_transaksi: this.state.id_transaksi,
        id_member: this.state.id_member,
        tgl: this.state.tgl,
        batas_waktu: this.state.batas_waktu,
        tgl_bayar: this.state.tgl_bayar,
        status: this.state.status,
        dibayar: this.state.dibayar,
        id_user: this.state.id_user,
        id_outlet: this.state.id_outlet,
      };
      axios
        .put(endpoint, data)
        .then((response) => {
          window.alert(response.data.message);
          this.getTransaksis();
        })
        .catch((error) => console.log(error));
    }
  }
  dropData(id_transaksi) {
    if (window.confirm("Apakah anda yakin menghapus data ini?")) {
      let url = baseUrl + "/transaksi/" + id_transaksi;
      axios
        .delete(url)
        .then((response) => {
          window.alert(response.data.message);
          this.getTransaksis();
        })
        .catch((error) => console.log(error));
    }
  }
  showAddButton() {
    // if (this.state.role === "Admin" || this.state.role === "Kasir") {
    return (
      <button class="btn btn-primary me-md-2 my-3" type="button" onClick={() => this.tambahData()}>
        Tambah Member
      </button>
    );
    // }
  }

  // // OPTIONS DROPDOWN
  // async getOptions() {
  //   const res = await axios.get(baseUrl + "/transaksis");
  //   const data = res.data;

  //   const options = data.map((d) => ({
  //     value: d.id,
  //     label: d.name,
  //   }));
  //   this.setState({ selectOptions: options });
  // }

  // handleChange(e) {
  //   this.setState({ id: e.value, name: e.label });
  // }

  // function lifecycle
  componentDidMount() {
    this.getTransaksis();
  }

  render() {
    return (
      <>
        <Layout>
          <div className="row">
            <h1 className="col">ini TRANSAKSI</h1>{" "}
            <div className="col-3 row flex">
              <button className={`btn btn-primary btn-sm mt-1 mx-2 `} onClick={() => this.showData()}>
                Cetak Laporan
              </button>
              <button className={`btn btn-success btn-sm mt-1 mx-2 `} onClick={() => this.addData()}>
                Tambah data
              </button>
            </div>
          </div>
          <div className="col-12 card shadow p-4 rounded-3 border-0">
            <div className="d-flex align-items-center mb-2 justify-content-between bg-warning">{/* <button className={`btn btn-primary btn-sm mt-1 mx-2 `}><i class="fa-solid fa-pen-to-square"></i>edit</button> */}</div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">id_paket</th>
                  <th scope="col">tgl</th>
                  <th scope="col">batas_waktu</th>
                  <th scope="col">tgl_bayar</th>
                  <th scope="col">status</th>
                  <th scope="col">dibayar</th>
                  <th scope="col">id_user</th>
                  <th scope="col">id_outlet</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.transaksis.map((transaksi, index) => (
                  <tr key={index}>
                    <td>0{transaksi.id_transaksi}</td>
                    <td>{transaksi.id_paket}</td>
                    <td>{transaksi.tgl}</td>
                    <td>{transaksi.batas_waktu}</td>
                    <td>{transaksi.tgl_bayar}</td>
                    <td>{transaksi.status}</td>
                    <td>{transaksi.dibayar}</td>
                    <td>{transaksi.id_user}</td>
                    <td>{transaksi.id_outlet}</td>

                    <td>
                      <button className={`btn btn-success btn-sm mt-1 mx-2 `} onClick={() => this.showData(transaksi.id_transaksi)}>
                        show
                      </button>
                      <button className={`btn btn-primary btn-sm mt-1 mx-2 `} onClick={() => this.updateData(transaksi.id_transaksi)}>
                        edit
                      </button>
                      <button className={`btn btn-danger btn-sm mt-1 mx-2 `} onClick={() => this.dropData(transaksi.id_transaksi)}>
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* ========================= MODAL SECTION ========================*/}
          {/* MODAL SHOW */}
          <div className="modal fade " id="show-modal" tabindex="-1" aria-labelledby="tambah-modal-label" aria-hidden="true">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                {/* modal-header */}
                <div class="modal-header">
                  <h5 class="modal-title">SHOW DATA</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {/*  modal-body */}
                <div className="modal-body">
                  <form>
                    {/* body form */}
                    ID Transaksi
                    <input type="text" className="form-control mb-1" value={this.state.id_transaksi} disabled />
                    ID Member
                    <input type="text" className="form-control mb-1" value={this.state.id_member} disabled />
                    tgl
                    <input type="text" className="form-control mb-1" value={this.state.tgl} disabled />
                    batas_waktu
                    <input type="text" className="form-control mb-1" value={this.state.batas_waktu} disabled />
                    tgl_bayar
                    <input type="text" className="form-control mb-1" value={this.state.tgl_bayar} disabled />
                    status
                    <input type="text" className="form-control mb-1" value={this.state.status} disabled />
                    dibayar
                    <input type="text" className="form-control mb-1" value={this.state.dibayar} disabled />
                    ID id_user
                    <input type="text" className="form-control mb-1" value={this.state.id_user} disabled />
                    ID id_outlet
                    <input type="text" className="form-control mb-1" value={this.state.id_outlet} disabled />
                  </form>
                </div>
                {/*  modal-footer */}
                {/* <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button className={`btn btn-primary btn-sm mt-1 mx-2 `} onClick={() => this.updateData(this.state.id_member)}>
                    edit
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          {/* MODAL TAMBAH == EDIT */}
          <div className="modal fade " id="edit-modal" tabindex="-1" aria-labelledby="tambah-modal-label" aria-hidden="true">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                {/* modal-header */}
                <div class="modal-header">
                  <h5 class="modal-title">EDIT DATA</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {/*  modal-body */}
                <div className="modal-body">
                  <form onSubmit={(ev) => this.saveData(ev)}>
                    {/* body form */}
                    ID Transaksi
                    <input type="text" className="form-control mb-1" value={this.state.id_transaksi} onChange={(ev) => this.setState({ id_transaksi: ev.target.value })} disabled />
                    ID Member
                    {/* INI OPTONS */}
                    <select class="form-select" aria-label="Default select example" value={this.state.getOptions} onChange={this.handleChange.bind(this)} required>
                      {/* getOptions == GET ID_MEMBER FROM API */}
                    </select>
                    tgl
                    <input type="text" className="form-control mb-1" value={this.state.tgl} onChange={(ev) => this.setState({ tgl: ev.target.value })} required />
                    batas_waktu
                    <input type="text" className="form-control mb-1" value={this.state.batas_waktu} onChange={(ev) => this.setState({ batas_waktu: ev.target.value })} required />
                    tgl_bayar
                    <input type="text" className="form-control mb-1" value={this.state.tgl_bayar} onChange={(ev) => this.setState({ tgl_bayar: ev.target.value })} required />
                    status
                    <input type="text" className="form-control mb-1" value={this.state.status} onChange={(ev) => this.setState({ status: ev.target.value })} required />
                    dibayar
                    <input type="text" className="form-control mb-1" value={this.state.dibayar} onChange={(ev) => this.setState({ dibayar: ev.target.value })} required />
                    ID id_user
                    <input type="text" className="form-control mb-1" value={this.state.id_user} onChange={(ev) => this.setState({ id_user: ev.target.value })} required />
                    ID id_outlet
                    <input type="text" className="form-control mb-1" value={this.state.id_outlet} onChange={(ev) => this.setState({ id_outlet: ev.target.value })} required />
                  </form>
                </div>
                {/*  modal-footer */}
                {/* <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button className={`btn btn-primary btn-sm mt-1 mx-2 `} onClick={() => this.updateData(this.state.id_member)}>
                    edit
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}
