import React from "react";
// import { Switch, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

//call pagses
import Home from "./pages/Home";
import Paket from "./pages/Paket";
import User from "./pages/User";
import Outlet from "./pages/Outlet";
import Member from "./pages/Member";
import Transaksi from "./pages/Transaksi";
import Login from "./pages/Login";
// import Detail_transaksi from "./pages/Detail_transaksi";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/paket" element={<Paket />} />
      <Route path="/user" element={<User />} />
      <Route path="/outlet" element={<Outlet />} />
      <Route path="/member" element={<Member />} />
      <Route path="/transaksi" element={<Transaksi />} />
      {/* <Route path="/detail_transaksi" element={<Detail_transaksi />} /> */}
    </Routes>
  );
}
