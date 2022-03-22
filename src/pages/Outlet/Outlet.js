// inisiasi library default
import React from "react";
import { Modal } from "bootstrap"; //modal yg dipake ini

// inisiasi component
import Layout from "../../components/fragment/Layout";
import Card from "../../components/element/Card";

// inisiasi hit api
import axios from "axios";
import { baseUrl, member_image_url, url } from "../../config";
export default class Outlet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // variable yg dibutuhkan
      outlets: [],
      id_outlet: "",
      tempat: "",

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
        this.setState({ outlets: response.data.data });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
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
      id_oulet: 0,
      tempat: "",
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
    let index = this.state.outlets.findIndex((outlet) => outlet.id_oulet === selecteditem);

    this.setState({
      id_outlet: this.state.outlets[index].id_outlet,
      tempat: this.state.outlets[index].tempat,
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
      tempat: this.state.outlets[index].tempat,
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
    formData.append("tempat", this.state.tempat);
    if (this.state.uploadFile) {
      formData.append("image", this.state.image);
    }

    // formData.forEach((value, key) => {
    //   console.log("key %s: value %s", key, value);
    // });

    //url endpoint
    let url = baseUrl + "/outlet";

    // cek aksi tambah atau ubah
    if (this.state.action === "insert") {
      // axios fecth data dari BE -> POST
      axios
        .post(url, formData)
        .then((response) => {
          // keluarkan respon
          // window.alert(response.data.message);
          this.getOutlets();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === "update") {
      // axios fecth data dari BE -> PUT
      axios
        .put(url, formData)
        .then((response) => {
          // keluarkan respon
          // window.alert(response.data.message);
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
      // let data = {
      //   id_member: id_member,
      // };
      // console.log(data);
      axios
        .delete(url)
        .then((response) => {
          // window.alert(response.data.message);
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
            <h1 className="col">ini OUTLET</h1>{" "}
            <div className="col-3">
              <button className={`btn btn-success btn-sm mt-1 mx-2 `} onClick={() => this.addData()}>
                Tambah data
              </button>
            </div>
          </div>

          {/* CARD 2 */}
          {/* <div className="col-lg 4 col-md-6 col-sm-12 mt-2">
            {this.state.outlets.map((outlet, index) => (
              <div className="card" key={index}>
                <img src={outlet.image} class="rounded" alt="gambar" height="100%" width="50%"></img>

                <div className="card-body">
                  <h5 className="card-title">{outlet.tempat}</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                  <div className="row">
                    <button className={`btn btn-success btn-sm mt-1 mx-2 `} onClick={() => this.showData(outlet.id_outlet)}>
                      show
                    </button>
                    <button className={`btn btn-primary btn-sm mt-1 mx-2 `} onClick={() => this.updateData(outlet.id_outlet)}>
                      edit
                    </button>
                    <button className={`btn btn-danger btn-sm mt-1 mx-2 `} onClick={() => this.dropData(outlet.id_outlet)}>
                      delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          {/* TABLE */}
          <div className="col-12 card shadow p-4 rounded-3 border-0">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Gambar</th>
                  <th scope="col">Name Tempat</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.outlets.map((outlet, index) => (
                  <tr key={index}>
                    <td>0{outlet.id_oulet}</td>
                    {/* <td>{outlet.image}</td> */}
                    <td>{url + "/" + outlet.image}</td>
                    <td>{outlet.tempat}</td>
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
                      {/* <img src={this.image} class="rounded"></img> */}
                      <img src={url + this.state.image} class="rounded" alt="gambar" height="100%" width="50%"></img>
                      {console.log(url + this.state.image)}
                    </div>
                    {/* body form */}
                    ID outlet
                    <input type="text" className="form-control mb-1" value={this.state.id_outlet} disabled />
                    Tempat Outlet
                    <input type="text" className="form-control mb-1" value={this.state.tempat} disabled />
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
                      <div>
                        Member Image
                        <input type="file" className="form-control mb-1" onChange={(ev) => this.setState({ image: ev.target.files[0] })} required />
                      </div>
                      {/* )} */}
                    </div>
                    {/* body form */}
                    ID OUTLET
                    <input type="text" className="form-control mb-1" value={this.state.id_outlet} onChange={(ev) => this.setState({ id_outlet: ev.target.value })} disabled />
                    Tempat Name
                    <input type="text" className="form-control mb-1" value={this.state.tempat} onChange={(ev) => this.setState({ tempat: ev.target.value })} required />
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
