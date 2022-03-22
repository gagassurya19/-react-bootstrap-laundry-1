// dashboard => utk dasar template biar tampilannya sama semua / layout aja di bagian page content

import React from "react";
// import Navbar from "../../components/elements/Navbar/Navbar";
import { Link } from "react-router-dom";

export default function LayoutSide() {
  return (
    <div class="container">
      <div class="row align-items-start">
        <div class="col bg-warning min-vh-100">One of three columns</div>
        <div class="col bg-primary min-vh-100">One of three columns</div>
      </div>
    </div>
  );
}
