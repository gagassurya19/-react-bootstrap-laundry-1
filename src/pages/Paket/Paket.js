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
import { baseUrl, member_image_url, url } from "../../config";

export default class Paket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // call variable
      pakets: [],
      id_paket: 0,
      jenis: "",
      harga: "",

      //utk auth
      token: "",
      // utk image
      image: null,
      uploadFile: true,

      // manage list
      action: "",

      // login statement
      // if(!localStorage.getItem("token")){
      //     window.location.href = "/login"
      // }
    };
  }

  // GET -> manggil data
  getPakets() {
    let url = baseUrl + "/paket";
    axios
      .get(url)
      .then((response) => {
        this.setState({ pakets: response.data.data });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.state.pakets);
  }

  // function tambah data
  addData() {
    //Memunculkan Modal
    this.modalPaket = new Modal(document.getElementById("edit-modal"));
    this.modalPaket.show();

    //Mengosongkan input
    this.setState({
      id_paket: 0,
      jenis: "",
      harga: "",
      image: null,

      uploadFile: true, // aksi upload file
      action: "insert", // target aksi
    });
  }

  // function ubah data
  updateData(selecteditem) {
    //Memunculkan Modal
    this.modalPaket = new Modal(document.getElementById("edit-modal"));
    this.modalPaket.show();

    //mencari posisi index dari data member berdasarkan id_member pada array members
    let index = this.state.pakets.findIndex((paket) => paket.id_paket === selecteditem);

    this.setState({
      id_paket: this.state.pakets[index].id_paket,
      jenis: this.state.pakets[index].jenis,
      harga: this.state.pakets[index].harga,
      image: this.state.pakets[index].image,

      // aksi uploadFile
      uploadFile: false,

      action: "update",
    });
  }

  // function ubah data == buat sendiri
  showData(id_paket) {
    //Memunculkan Modal
    this.modalPaket = new Modal(document.getElementById("show-modal"));
    this.modalPaket.show();

    //mencari posisi index dari data member berdasarkan id_member pada array members
    let index = this.state.pakets.findIndex((paket) => paket.id_paket === id_paket);

    this.setState({
      id_paket: this.state.pakets[index].id_paket,
      jenis: this.state.pakets[index].jenis,
      harga: this.state.pakets[index].harga,
      image: this.state.pakets[index].image,

      action: "show",
    });
  }

  // function simpan data
  saveData(ev) {
    ev.preventDefault(); // untuk mencegah berjalannya aksi default dari form submit
    // section untuk upload foto memakai formData
    let formData = new FormData(); // Currently empty
    formData.append("id_paket", this.state.id_paket);
    formData.append("jenis", this.state.jenis);
    formData.append("harga", this.state.harga);
    if (this.state.uploadFile) {
      formData.append("image", this.state.image);
    }

    // formData.forEach((value, key) => {
    //   console.log("key %s: value %s", key, value);
    // });

    //url endpoint
    let url = baseUrl + "/paket";

    // cek aksi tambah atau ubah
    if (this.state.action === "insert") {
      // axios fecth data dari BE -> POST
      axios
        .post(url, formData)
        .then((response) => {
          // keluarkan respon
          // window.alert(response.data.message);
          this.getPakets();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === "update") {
      // axios fecth data dari BE -> PUT
      axios
        .put(url, formData)
        .then((response) => {
          // keluarkan respon
          // window.alert(response.data.message);
          this.getPakets();
        })
        .catch((error) => console.log(error));
    }
    this.modalPaket.hide();
  }

  // function hapus data
  dropData(id_paket) {
    // console.log(id_member);
    //selecteditem utk show dan edit
    if (window.confirm("are you sure will delete this item?")) {
      let url = baseUrl + "/paket/" + id_paket;
      // let data = {
      //   id_member: id_member,
      // };
      // console.log(data);
      axios
        .delete(url)
        .then((response) => {
          // window.alert(response.data.message);
          this.getPakets();
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

  // function lifecycle
  componentDidMount() {
    this.getPakets();
  }

  render() {
    return (
      <>
        <Layout>
          <div className="row">
            <h1 className="col">ini PAKET</h1>{" "}
            <div className="col-3">
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
                  <th scope="col">Jenis</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.pakets.map((paket, index) => (
                  <tr key={index}>
                    <td>0{paket.id_paket}</td>
                    <td>{paket.jenis}</td>
                    <td>{paket.harga}</td>
                    {/* <td>{paket.image}</td> */}
                    <td>
                      <button className={`btn btn-success btn-sm mt-1 mx-2 `} onClick={() => this.showData(paket.id_paket)}>
                        show
                      </button>
                      <button className={`btn btn-primary btn-sm mt-1 mx-2 `} onClick={() => this.updateData(paket.id_paket)}>
                        edit
                      </button>
                      <button className={`btn btn-danger btn-sm mt-1 mx-2 `} onClick={() => this.dropData(paket.id_paket)}>
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
                      {/* <img src=`{${url}${user.image}}` className="rounded" alt="foto"></img> */}
                      {/* http://localhost:4000/image//member//image-1647321877120.PNG */}
                    </div>
                    {/* body form */}
                    ID Paket
                    <input type="text" className="form-control mb-1" value={this.state.id_paket} disabled />
                    Jenis
                    <input type="text" className="form-control mb-1" value={this.state.jenis} disabled />
                    harga
                    <input type="number" className="form-control mb-1" value={this.state.harga} disabled />
                  </form>
                </div>
                {/*  modal-footer */}
                {/* <div class="modal-footer">
                  <button type="button" class="btn btn-sec ondary" data-bs-dismiss="modal">
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
                    {/*  ADA REQUIRED */}
                    <div class="text-center">
                      {/* {this.state.action === "update" && this.state.uploadFile === false ? (
                        <button className="btn btn-sm btn-dark mb-1 btn-block" onClick={() => this.setState({ uploadFile: true })}>
                          Change Member Image *required
                        </button>
                      ) : ( */}
                      <div>
                        Member Image
                        {/* <img id="frame" src={url + this.state.image} className="img-fluid"></img> */}
                        <input type="file" className="form-control mb-1" onChange={(ev) => this.setState({ image: ev.target.files[0] })} required />
                      </div>
                      {/* )} */}
                    </div>
                    {/* body form */}
                    ID Paket
                    <input type="text" className="form-control mb-1" value={this.state.id_paket} onChange={(ev) => this.setState({ id_paket: ev.target.value })} disabled />
                    Jenis Paket
                    <input type="text" className="form-control mb-1" value={this.state.jenis} onChange={(ev) => this.setState({ jenis: ev.target.value })} required />
                    Harga
                    <input type="number" className="form-control mb-1" value={this.state.harga} onChange={(ev) => this.setState({ harga: ev.target.value })} required />
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
