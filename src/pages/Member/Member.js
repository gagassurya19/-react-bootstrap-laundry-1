// inisiasi library default
import React from "react";
import { Modal } from "bootstrap"; //modal yg dipake ini
// import { event } from "jquery";
// import { FaBeerIcon } from "@react-icons/all-files/fa/FaBeer";

// inisiasi component
import Layout from "../../components/fragment/Layout";
// inisiasi hit api
import axios from "axios";
import { baseUrl, member_image_url, url } from "../../config";

export default class Member extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // variable yg dibutuhkan
      members: [],
      id_member: "",
      nama: "",
      alamat: "",
      telp: "",

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
  getMembers() {
    let url = baseUrl + "/member";
    axios
      .get(url)
      .then((response) => {
        this.setState({ members: response.data.data });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.state.members);
  }

  // function tambah data
  addData() {
    //Memunculkan Modal
    this.modalMember = new Modal(document.getElementById("edit-modal"));
    this.modalMember.show();

    //Mengkosongkan input
    this.setState({
      id_member: 0,
      nama: "",
      alamat: "",
      jenis_kelamin: "",
      telp: 0,
      image: null,

      uploadFile: true, // aksi upload file
      action: "insert", // target aksi
    });
  }

  // function ubah data
  updateData(selecteditem) {
    //Memunculkan Modal
    this.modalMember = new Modal(document.getElementById("edit-modal"));
    this.modalMember.show();

    //mencari posisi index dari data member berdasarkan id_user pada array members
    let index = this.state.members.findIndex((member) => member.id_member === selecteditem);

    this.setState({
      id_member: this.state.members[index].id_member,
      nama: this.state.members[index].nama,
      alamat: this.state.members[index].alamat,
      jenis_kelamin: this.state.members[index].jenis_kelamin,
      telp: this.state.members[index].telp,
      image: this.state.members[index].image,

      // aksi uploadFile
      uploadFile: false,

      action: "update",
    });
  }

  // function ubah data == buat sendiri
  showData(id_member) {
    //Memunculkan Modal
    this.modalMember = new Modal(document.getElementById("show-modal"));
    this.modalMember.show();

    //mencari posisi index dari data member berdasarkan id_member pada array members
    let index = this.state.members.findIndex((member) => member.id_member === id_member);

    this.setState({
      id_member: this.state.members[index].id_member,
      nama: this.state.members[index].nama,
      alamat: this.state.members[index].alamat,
      jenis_kelamin: this.state.members[index].jenis_kelamin,
      telp: this.state.members[index].telp,
      image: this.state.members[index].image,

      action: "show",
    });
  }
  // GET -> manggil data
  // showData() {
  //   let url = baseUrl + "/member";
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       this.setState({ members: response.data.data });
  //       console.log(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   console.log(this.state.members);
  // }

  // function simpan data
  saveData(ev) {
    ev.preventDefault(); // untuk mencegah berjalannya aksi default dari form submit
    // section untuk upload foto memakai formData
    let formData = new FormData(); // Currently empty
    formData.append("id_member", this.state.id_member);
    formData.append("nama", this.state.nama);
    formData.append("alamat", this.state.alamat);
    formData.append("jenis_kelamin", this.state.jenis_kelamin);
    formData.append("telp", this.state.telp);
    if (this.state.uploadFile) {
      formData.append("image", this.state.image);
    }

    // formData.forEach((value, key) => {
    //   console.log("key %s: value %s", key, value);
    // });

    //url endpoint
    let url = baseUrl + "/member";

    // cek aksi tambah atau ubah
    if (this.state.action === "insert") {
      // axios fecth data dari BE -> POST
      axios
        .post(url, formData)
        .then((response) => {
          // keluarkan respon
          // window.alert(response.data.message);
          this.getMembers();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === "update") {
      // axios fecth data dari BE -> PUT
      axios
        .put(url, formData)
        .then((response) => {
          // keluarkan respon
          // window.alert(response.data.message);
          this.getMembers();
        })
        .catch((error) => console.log(error));
    }
    this.modalMember.hide();
  }

  // function hapus data
  dropData(id_member) {
    // console.log(id_member);
    //selecteditem utk show dan edit
    if (window.confirm("are you sure will delete this item?")) {
      let url = baseUrl + "/member/" + id_member;
      // let data = {
      //   id_member: id_member,
      // };
      // console.log(data);
      axios
        .delete(url)
        .then((response) => {
          // window.alert(response.data.message);
          this.getMembers();
        })
        .catch((error) => console.log(error));
    }
  }

  // function utk role
  showAddButton() {
    // if (this.state.role === "Admin" || this.state.role === "Kasir") {
    return (
      <button class="btn btn-primary me-md-2 my-3" type="button" onClick={() => this.addData()}>
        Tambah Member
      </button>
    );
    // }
  }

  // function lifecycle
  componentDidMount() {
    this.getMembers();
  }

  render() {
    return (
      <>
        <Layout>
          <div className="row">
            <h1 className="col">ini MEMBER</h1>{" "}
            <div className="col-3">
              <button className={`btn btn-success btn-sm mt-1 mx-2 `} onClick={() => this.addData()}>
                Tambah data
              </button>
            </div>
          </div>
          <div className="col-12 card shadow p-4 rounded-3 border-0">
            {/* <div className="d-flex align-items-center mb-2 justify-content-between bg-warning"><button className={`btn btn-primary btn-sm mt-1 mx-2 `}><i class="fa-solid fa-pen-to-square"></i>edit</button> yaya</div> */}
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">alamat</th>
                  <th scope="col">jenis_kelamin</th>
                  <th scope="col">Telp</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.members.map((member, index) => (
                  <tr key={index}>
                    <td>0{member.id_member}</td>
                    <td>{member.nama}</td>
                    <td>{member.alamat}</td>
                    <td>{member.jenis_kelamin}</td>
                    <td>{member.telp}</td>
                    <td>
                      <button className={`btn btn-success btn-sm mt-1 mx-2 `} onClick={() => this.showData(member.id_member)}>
                        show
                      </button>
                      <button className={`btn btn-primary btn-sm mt-1 mx-2 `} onClick={() => this.updateData(member.id_member)}>
                        edit
                      </button>
                      <button className={`btn btn-danger btn-sm mt-1 mx-2 `} onClick={() => this.dropData(member.id_member)}>
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
                    ID Member
                    <input type="text" className="form-control mb-1" value={this.state.id_member} disabled />
                    Member Name
                    <input type="text" className="form-control mb-1" value={this.state.nama} disabled />
                    jenis_kelamin Name
                    <input type="text" className="form-control mb-1" value={this.state.jenis_kelamin} disabled />
                    Member alamat
                    <input type="text" className="form-control mb-1" value={this.state.alamat} disabled />
                    Member telp
                    <input type="text" className="form-control mb-1" value={this.state.telp} disabled />
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
                    ID Member
                    <input type="text" className="form-control mb-1" value={this.state.id_member} onChange={(ev) => this.setState({ id_member: ev.target.value })} disabled />
                    Member Name
                    <input type="text" className="form-control mb-1" value={this.state.nama} onChange={(ev) => this.setState({ nama: ev.target.value })} required />
                    jenis_kelamin
                    {/* <input type="text" className="form-control mb-1" value={this.state.nama} onChange={(ev) => this.setState({ nama: ev.target.value })} required /> */}
                    <select class="form-select" aria-label="Default select example" value={this.state.jenis_kelamin} onChange={(ev) => this.setState({ jenis_kelamin: ev.target.value })} required>
                      <option selected>jenis_kelamin</option>
                      <option value="P">Perempuan</option>
                      <option value="L">Laki laki</option>
                    </select>
                    Member alamat
                    <input type="text" className="form-control mb-1" value={this.state.alamat} onChange={(ev) => this.setState({ alamat: ev.target.value })} required />
                    Member telp
                    <input type="text" className="form-control mb-1" value={this.state.telp} onChange={(ev) => this.setState({ telp: ev.target.value })} required />
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
