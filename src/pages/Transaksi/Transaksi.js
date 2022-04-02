// inisiasi library default
import React from "react";
import { Modal } from "bootstrap";

// inisiasi component
import Layout from "../../components/fragment/Layout";

// inisiasi hit api
import axios from "axios";
import { baseUrl } from "../../config";

// import react to pdf
// import Pdf from "react-to-pdf";

export default class Transaksi extends React.Component {
  // dataDummy = [
  //   {
  //     id: 1,
  //     invoice: "INV20190101",
  //     pickup: "10/10/2019",
  //     dropoff: "10/10/2019",
  //     payment: "Bank BCA",
  //     customer: "Budi",
  //     admin: "Admin",
  //     outlet: "Outlet Malang",
  //     package: "Paket 1",
  //     status: true,
  //   },
  //   {
  //     id: 2,
  //     invoice: "INV20190102",
  //     pickup: "10/10/2019",
  //     dropoff: "10/10/2019",
  //     payment: "Bank Mandiri",
  //     customer: "Andi",
  //     admin: "Pengurus",
  //     outlet: "Outlet Tulungagung",
  //     package: "Paket 2",
  //     status: false,
  //   },
  //   {
  //     id: 1,
  //     invoice: "INV20190101",
  //     pickup: "10/10/2019",
  //     dropoff: "10/10/2019",
  //     payment: "Bank BCA",
  //     customer: "Caca",
  //     admin: "Admin",
  //     outlet: "Outlet Malang",
  //     package: "Paket 1",
  //     status: true,
  //   },
  // ];

  constructor(props) {
    super(props);
    this.state = {
      // call variable
      transaksis: [],
      id_transaksi: 0,

      members: [],
      id_member: 0,

      users: [],
      id_user: 0,

      outlets: [],
      id_outlet: 0,

      tgl_nitip: "",
      tgl_ambil: "",

      pakets: [],
      id_paket: "",

      // details: [],
      // id_detail: "",

      qty_barang: 0,
      status_barang: "",
      status_pembayaran: "",

      //utk auth
      token: "",

      // utk manage list
      action: "",

      /* logika if-else --> untuk mengecek apakah user yg mengakses telah melakukan
           login sebagai admin atau belum
        */
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
        this.setState({ transaksis: response.data });
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
    console.log(this.state.transaksis);
  }
  // getMember -> untuk mengakses API get member
  getMember = () => {
    let url = baseUrl + "/member";
    axios
      .get(url)
      .then((response) => {
        this.setState({ members: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // getUser -> untuk mengakses API get user
  getUser = () => {
    let url = baseUrl + "/user";
    axios
      .get(url)
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // getPaket -> untuk mengakses API get paket
  getPaket = () => {
    let url = baseUrl + "/paket";
    axios
      .get(url)
      .then((response) => {
        this.setState({ pakets: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // getPaket -> untuk mengakses API get paket
  getOutlet = () => {
    let url = baseUrl + "/outlet";
    axios
      .get(url)
      .then((response) => {
        this.setState({ outlets: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // // getPaket -> untuk mengakses API get paket
  // getDetail = () => {
  //   let url = baseUrl + "/detail";
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       this.setState({ details: response.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // function tambah data
  addData() {
    //Memunculkan Modal
    this.modalTransaksi = new Modal(document.getElementById("edit-modal"));
    this.modalTransaksi.show();

    //Mengosongkan input
    this.setState({
      id_transaksi: 0,
      id_member: 0,
      id_user: 0,
      id_outlet: 0,
      tgl_nitip: "",
      tgl_ambil: "",
      status_barang: "",
      status_pembayaran: "",

      action: "insert", // target aksi
    });
  }

  // function UPDATE == PUT
  updateData(selecteditem) {
    //Memunculkan Modal
    this.modalTransaksi = new Modal(document.getElementById("edit-modal-1"));
    this.modalTransaksi.show();

    //mencari posisi index dari data member berdasarkan id_member pada array members
    let index = this.state.transaksis.findIndex((transaksi) => transaksi.id_transaksi === selecteditem);

    this.setState({
      id_transaksi: this.state.transaksis[index].id_transaksi,
      id_member: this.state.transaksis[index].id_member,
      id_user: this.state.transaksis[index].id_user,
      id_outlet: this.state.transaksis[index].id_outlet,
      tgl_nitip: this.state.transaksis[index].tgl_nitip,
      tgl_ambil: this.state.transaksis[index].tgl_ambil,
      status_barang: this.state.transaksis[index].status_barang,
      status_pembayaran: this.state.transaksis[index].status_pembayaran,

      action: "update",
    });
  }

  // function ubah data == buat sendiri
  showData(id_transaksi) {
    //Memunculkan Modal
    this.modalTransaksi = new Modal(document.getElementById("show-modal"));
    this.modalTransaksi.show();

    //mencari posisi index dari data member berdasarkan id_member pada array members
    let index = this.state.transaksis.findIndex((transaksi) => transaksi.id_transaksi === id_transaksi);

    this.setState({
      id_transaksi: this.state.transaksis[index].id_transaksi,
      id_member: this.state.transaksis[index].id_member,
      id_user: this.state.transaksis[index].id_user,
      id_outlet: this.state.transaksis[index].id_outlet,
      tgl_nitip: this.state.transaksis[index].tgl_nitip,
      tgl_ambil: this.state.transaksis[index].tgl_ambil,
      status_barang: this.state.transaksis[index].status_barang,
      status_pembayaran: this.state.transaksis[index].status_pembayaran,

      action: "show",
    });
  }

  // function SAVE
  saveData(ev) {
    ev.preventDefault(); // untuk mencegah berjalannya aksi default dari form submit

    let endpoint = baseUrl + "/transaksi";
    let newTransaksi = {
      id_transaksi: this.state.id_transaksi,
      id_member: this.state.id_member,
      id_user: this.state.id_user,
      id_outlet: this.state.id_outlet,
      tgl_nitip: this.state.tgl_nitip,
      tgl_ambil: this.state.tgl_ambil,
      status_barang: this.state.status_barang,
      status_pembayaran: this.state.status_pembayaran,
    };

    if (this.state.action === "insert") {
      axios
        .post(endpoint, newTransaksi)
        .then((response) => {
          window.alert(response.data.message);
          this.getTransaksis();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === "update") {
      axios
        .put(endpoint, newTransaksi)
        .then((response) => {
          window.alert(response.data.message);
          this.getTransaksis();
        })
        .catch((error) => console.log(error));
    }
    this.modalTransaksi.hide();
  }

  // function DELETE
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

  // untuk convert time
  convertTime(time) {
    let date = new Date(time);
    return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()} `;
    // return `${date.getFullYear()}/${Number(date.getMonth()) + 1} /${date.getDate()}`;
  }

  goToInvoice = (dataInvoice) => {
    window.location = `./components/element/${dataInvoice}`;
  };

  // untuk mengenerate laporan
  ref = React.createRef();

  // function lifecycle
  componentDidMount() {
    this.getTransaksis();
    this.getMember();
    this.getUser();
    this.getPaket();
    this.getOutlet();
    // this.getDetail();
  }

  render() {
    return (
      <>
        <Layout>
          <div className="row">
            <h1 className="col">List Transaksi ^o^</h1>{" "}
            <div className="col-3">
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
                  <th scope="col">nama_member</th>
                  <th scope="col">tgl_nitip</th>
                  <th scope="col">tgl_ambil</th>
                  <th scope="col">status_barang</th>
                  <th scope="col">status_pembayaran</th>
                  <th scope="col">nama_user</th>
                  <th scope="col">outlet</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.transaksis.map((transaksi, index) => (
                  <tr key={index}>
                    <td>0{transaksi.id_transaksi}</td>
                    <td>{transaksi.member.nama_member}</td>
                    <td>{this.convertTime(transaksi.tgl_nitip)}</td>
                    <td>{this.convertTime(transaksi.tgl_ambil)}</td>
                    {/* <td>{transaksi.tgl_nitip}</td>
                    <td>{transaksi.tgl_ambil}</td> */}
                    <td>{transaksi.status_barang}</td>
                    <td>{transaksi.status_pembayaran}</td>
                    <td>{transaksi.user.nama_user}</td>
                    <td>{transaksi.outlet.domisili_outlet}</td>
                    {/* <td>{transaksi.detail.qty_barang}</td> */}

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
                  <h5 class="modal-title">SHOW TRANSAKSI</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {/*  modal-body */}
                <div className="modal-body">
                  <h5 className="text-center">Data Transaksi</h5>
                  <form>
                    {/* body form */}
                    ID Transaksi
                    <input type="text" className="form-control mb-1" value={this.state.id_transaksi} disabled />
                    ID Member
                    <input type="text" className="form-control mb-1" value={this.state.id_member} disabled />
                    tgl_nitip
                    <input type="text" className="form-control mb-1" value={this.state.tgl_nitip} disabled />
                    tgl_ambil
                    <input type="text" className="form-control mb-1" value={this.state.tgl_ambil} disabled />
                    status_barang
                    <input type="text" className="form-control mb-1" value={this.state.status_barang} disabled />
                    status_pembayaran
                    <input type="text" className="form-control mb-1" value={this.state.status_pembayaran} disabled />
                    ID id_user
                    <input type="text" className="form-control mb-1" value={this.state.id_user} disabled />
                    ID id_outlet
                    <input type="text" className="form-control mb-1" value={this.state.id_outlet} disabled />
                  </form>
                  <br />
                  <h5 className="text-center">Data Detail Transaksi</h5>
                  ---
                  <br />
                  <button className="hover:underline inline-flex items-center text-sm font-medium text-blue-500 hover:opacity-75 " onClick={() => this.goToInvoice(this.state.id_transaksi)}>
                    {this.state.id_transaksi}
                  </button>
                  {/* INI START */}
                  {/* <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          No
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Invoice
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Option
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      {this.dataDummy.map((data, i) => (
                        <tr>
                          <td class="px-6 py-2 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{++i}</div>
                          </td>
                          <td class="px-6 py-2 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              <button className="hover:underline inline-flex items-center text-sm font-medium text-blue-500 hover:opacity-75 " onClick={() => this.goToInvoice(data.invoice)}>
                                {data.invoice}
                                <svg class="ml-0.5 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                                </svg>
                              </button>
                              <br />
                              {data.package}
                            </div>
                          </td>
                          <td class="px-6 py-2 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              Customer: {data.customer} <br />
                              Admin: {data.admin} <br />
                              Outlet: {data.outlet}
                            </div>
                          </td>
                          <td class="px-6 py-2 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              Pickup: {data.pickup} <br />
                              Dropoff: {data.dropoff}
                            </div>
                          </td>
                          <td class="px-6 py-2 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              <label class="inline-flex relative items-center w-full text-sm font-medium focus:z-10 focus:ring-2">
                                <svg class="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                </svg>
                                <span class="flex flex-col text-left pl-2">
                                  <span class="title-font font-medium text-gray-900">{data.payment}</span>
                                  <span class="text-gray-500 text-sm">{data.payment}</span>
                                </span>
                              </label>
                            </div>
                          </td>
                          <td class="px-6 py-2 whitespace-nowrap">
                            {data.status ? (
                              <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Selesai</span>
                            ) : (
                              <span class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">Proses</span>
                            )}
                          </td>
                          <td class="px-6 py-2 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              <div className="inline-flex relative items-center gap-2">
                                <button type="button" onClick={(ev) => this.deleteData(ev)}>
                                  <svg class="w-6 h-6 text-red-500 hover:text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fill-rule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                </button>
                                <button type="button" onClick={(ev) => this.editData(ev)}>
                                  <svg class="w-6 h-6 text-indigo-500 hover:text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                    <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table> */}
                  {/* INI END */}
                </div>
              </div>
            </div>
          </div>

          {/* MODAL TAMBAH*/}
          <div className="modal fade " id="edit-modal" tabindex="-1" aria-labelledby="tambah-modal-label" aria-hidden="true">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                {/* modal-header */}
                <div class="modal-header">
                  <h5 class="modal-title">SHOW TRANSAKSI</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {/*  modal-body */}
                <div className="modal-body">
                  <h5 className="text-center">Add Data Transaksi</h5>
                  <form onSubmit={(ev) => this.saveData(ev)}>
                    Nama Member
                    <select className="form-control mb-2" value={this.state.id_member} onChange={(ev) => this.setState({ id_member: ev.target.value })}>
                      <option selected>Pilih Nama</option>
                      {this.state.members.map((member) => (
                        <option value={member.id_member}>{member.nama_member}</option>
                      ))}
                    </select>
                    tgl_nitip
                    <input type="date" className="form-control mb-1" value={this.state.tgl_nitip} onChange={(ev) => this.setState({ tgl_nitip: ev.target.value })} />
                    tgl_ambil
                    <input type="date" className="form-control mb-1" value={this.state.tgl_ambil} onChange={(ev) => this.setState({ tgl_ambil: ev.target.value })} />
                    status_barang
                    <div className="form-group">
                      <select name="status_barang" id="status" className="form-control" onChange={(ev) => this.setState({ status_barang: ev.target.value })} value={this.state.status_barang}>
                        <option>--- Pilih Status Paket ---</option>
                        <option value="baru">Baru</option>
                        <option value="proses">Proses</option>
                        <option value="selesai">Selesai</option>
                        <option value="diambil">Diambil</option>
                      </select>
                    </div>
                    status_pembayaran
                    <div className="form-group">
                      <select name="status_pembayaran" id="bayar" className="form-control" onChange={(ev) => this.setState({ status_pembayaran: ev.target.value })} value={this.state.status_pembayaran}>
                        <option>--- Pilih Status Bayar ---</option>
                        <option value="hutang">Belum Bayar</option>
                        <option value="lunas">Sudah Bayar</option>
                      </select>
                    </div>
                    Nama User
                    <select className="form-control mb-2" value={this.state.id_user} onChange={(ev) => this.setState({ id_user: ev.target.value })}>
                      <option selected>Pilih Nama</option>
                      {this.state.users.map((user) => (
                        <option value={user.id_user}>{user.nama_user}</option>
                      ))}
                    </select>
                    Outlet
                    <select className="form-control mb-2" value={this.state.id_outlet} onChange={(ev) => this.setState({ id_outlet: ev.target.value })}>
                      <option selected>Pilih Outlet</option>
                      {this.state.outlets.map((outlet) => (
                        <option value={outlet.id_outlet}>{outlet.domisili_outlet}</option>
                      ))}
                    </select>
                    Jenis Paket
                    <select className="form-control mb-2" value={this.state.id_paket} onChange={(e) => this.setState({ id_paket: e.target.value })}>
                      <option value="">Pilih Paket</option>
                      {this.state.pakets.map((paket) => (
                        <option value={paket.id_paket}>{paket.jenis_paket}</option>
                      ))}
                    </select>
                    Jumlah (Qty)
                    <input type="number" className="form-control mb-2" value={this.state.qty} onChange={(e) => this.setState({ qty_barang: e.target.value })} />
                    <button type="submit" className="btn btn-success">
                      Simpan
                    </button>
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

          {/* MODAL EDIT */}
          <div className="modal fade " id="edit-modal-1" tabindex="-1" aria-labelledby="tambah-modal-label" aria-hidden="true">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                {/* modal-header */}
                <div class="modal-header">
                  <h5 class="modal-title">SHOW TRANSAKSI</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {/*  modal-body */}
                <div className="modal-body">
                  <h5 className="text-center">Edit Transaksi</h5>
                  <form onSubmit={(ev) => this.saveData(ev)}>
                    status_barang
                    <div className="form-group">
                      <select name="status" id="status" className="form-control" onChange={(ev) => this.setState({ status_barang: ev.target.value })} value={this.state.status_barang}>
                        <option>--- Pilih Status Paket ---</option>
                        <option value="baru">Baru</option>
                        <option value="proses">Proses</option>
                        <option value="selesai">Selesai</option>
                        <option value="diambil">Diambil</option>
                      </select>
                    </div>
                    status_pembayaran
                    <div className="form-group">
                      <select name="bayar" id="bayar" className="form-control" onChange={(ev) => this.setState({ status_pembayaran: ev.target.value })} value={this.state.status_pembayaran}>
                        <option>--- Pilih Status Bayar ---</option>
                        <option value="hutang">Belum Bayar</option>
                        <option value="lunas">Sudah Bayar</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-success mt-2">
                      Simpan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}
