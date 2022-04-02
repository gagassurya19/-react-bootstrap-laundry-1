// inisiasi library default
import React from "react";
import { Modal } from "bootstrap"; //modal yg dipake ini

// inisiasi component
import Layout from "../../components/fragment/Layout";

// inisiasi hit api
import axios from "axios";
import { baseUrl, outlet_image_url } from "../../config";
export default class Outlet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // variable yg dibutuhkan
      outlets: [],
      id_outlet: 0,
      domisili_outlet: "",

      //utk auth
      token: "",
      // utk image
      image: null,
      uploadFile: true,

      // utk manage list
      action: "",

      // login statement
      // if(!localStorage.getItem("token")){
      //     window.location.href = "/login"
      // }
    };
  }

  // GET -> manggil data
  getOutlets() {
    let url = baseUrl + "/outlet";
    axios
      .get(url)
      .then((response) => {
        this.setState({ outlets: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            // this.props.history.push("/login");
          }
        } else {
          console.log(error);
        }
      });
    console.log(this.state.outlets);
  }

  // function tambah data
  addData() {
    //Memunculkan Modal
    this.modalOutlet = new Modal(document.getElementById("edit-modal"));
    this.modalOutlet.show();

    //Mengkosongkan input
    this.setState({
      id_outlet: 0,
      domisili_outlet: "",
      image: null,

      uploadFile: true, // aksi upload file
      action: "insert", // target aksi
    });
  }

  // function ubah data
  updateData(selecteditem) {
    //Memunculkan Modal
    this.modalOutlet = new Modal(document.getElementById("edit-modal"));
    this.modalOutlet.show();

    //mencari posisi index dari data member berdasarkan id_user pada array members
    let index = this.state.outlets.findIndex((outlet) => outlet.id_outlet === selecteditem);

    this.setState({
      id_outlet: this.state.outlets[index].id_outlet,
      domisili_outlet: this.state.outlets[index].domisili_outlet,
      image: this.state.outlets[index].image,

      // aksi uploadFile
      uploadFile: false,

      action: "update",
    });
  }

  // function ubah data == buat sendiri
  showData(id_outlet) {
    //Memunculkan Modal
    this.modalOutlet = new Modal(document.getElementById("show-modal"));
    this.modalOutlet.show();

    //mencari posisi index dari data member berdasarkan id_member pada array members
    let index = this.state.outlets.findIndex((outlet) => outlet.id_outlet === id_outlet);

    this.setState({
      id_outlet: this.state.outlets[index].id_outlet,
      domisili_outlet: this.state.outlets[index].domisili_outlet,
      image: this.state.outlets[index].image,

      action: "show",
    });
  }

  // function simpan data
  saveData(ev) {
    ev.preventDefault(); // untuk mencegah berjalannya aksi default dari form submit
    // section untuk upload foto memakai formData
    let formData = new FormData(); // Currently empty
    formData.append("id_outlet", this.state.id_outlet);
    formData.append("domisili_outlet", this.state.domisili_outlet);
    if (this.state.uploadFile) {
      formData.append("image", this.state.image);
    }
    //url endpoint
    let url = baseUrl + "/outlet";

    // cek aksi tambah atau ubah
    if (this.state.action === "insert") {
      // axios fecth data dari BE -> POST
      axios
        .post(url, formData)
        .then((response) => {
          // keluarkan respon
          window.alert(response.data.message);
          this.getOutlets();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === "update") {
      // axios fecth data dari BE -> PUT
      axios
        .put(url, formData)
        .then((response) => {
          // keluarkan respon
          window.alert(response.data.message);
          this.getOutlets();
        })
        .catch((error) => console.log(error));
    }
    this.modalOutlet.hide();
  }

  // function hapus data
  dropData(id_outlet) {
    //selecteditem utk show dan edit
    if (window.confirm("are you sure will delete this item?")) {
      let url = baseUrl + "/outlet/" + id_outlet;
      axios
        .delete(url)
        .then((response) => {
          window.alert(response.data.message);
          this.getOutlets();
        })
        .catch((error) => console.log(error));
    }
  }

  // function lifecycle
  componentDidMount() {
    this.getOutlets();
  }

  render() {
    return (
      <>
        <Layout>
          <div className="row">
            <h1 className="col">List Outlet ^3^</h1>{" "}
            <div className="col-3">
              <button className={`btn btn-success btn-sm mt-1 mx-2 `} onClick={() => this.addData()}>
                Tambah data
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="col-12 card shadow p-4 rounded-3 border-0">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Gambar</th>
                  <th scope="col">Name domisili_outlet</th>
                  <th scope="col">Transaksi</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.outlets.map((outlet, index) => (
                  <tr key={index}>
                    <td>0{outlet.id_outlet}</td>
                    {/* <td>0{outlet.id_member}</td> */}
                    {/* <td>0{outlet.id_user}</td> */}
                    <td>{outlet.image}</td>
                    <td>{outlet.domisili_outlet}</td>
                    <td>12 transaksi</td>
                    <td>
                      <button className={`btn btn-success btn-sm mt-1 mx-2 `} onClick={() => this.showData(outlet.id_outlet)}>
                        show
                      </button>
                      <button className={`btn btn-primary btn-sm mt-1 mx-2 `} onClick={() => this.updateData(outlet.id_outlet)}>
                        edit
                      </button>
                      <button className={`btn btn-danger btn-sm mt-1 mx-2 `} onClick={() => this.dropData(outlet.id_outlet)}>
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
                    <div class="text-center">
                      <img src={outlet_image_url + "/" + this.state.image} class="rounded" alt="gambar" height="100%" width="50%"></img>
                    </div>
                    {/* body form */}
                    ID outlet
                    <input type="text" className="form-control mb-1" value={this.state.id_outlet} disabled />
                    domisili_outlet
                    <input type="text" className="form-control mb-1" value={this.state.domisili_outlet} disabled />
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* MODAL TAMBAH == EDIT */}
          <div className="modal fade" id="edit-modal" tabindex="-1" aria-labelledby="edit-modal-label" aria-hidden="true">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                {/* modal-header */}
                <div class="modal-header">
                  <h5 class="modal-title">EDIT DATA</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {/*  modal-body */}
                <form onSubmit={(ev) => this.saveData(ev)}>
                  <div className="modal-body">
                    {/* UPLOAD IMAGE */}
                    <div class="text-center">
                      {this.state.action === "update" && this.state.uploadFile === false ? (
                        <button className="btn btn-sm btn-dark mb-1 btn-block" onClick={() => this.setState({ uploadFile: true })}>
                          Change Outlet Image
                        </button>
                      ) : (
                        <div>
                          Outlet Image
                          <input type="file" className="form-control mb-1" onChange={(ev) => this.setState({ image: ev.target.files[0] })} required />
                        </div>
                      )}
                    </div>
                    {/* body form */}
                    ID OUTLET
                    <input type="text" className="form-control mb-1" value={this.state.id_outlet} onChange={(ev) => this.setState({ id_outlet: ev.target.value })} disabled />
                    domisili_outlet
                    <input type="text" className="form-control mb-1" value={this.state.domisili_outlet} onChange={(ev) => this.setState({ domisili_outlet: ev.target.value })} required />
                  </div>
                  {/* modal-footer */}
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}
