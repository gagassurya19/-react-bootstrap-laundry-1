// inisiasi library default
import React from "react";

// inisiasi component

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      // call variable
    };
  }
  render() {
    return (
      <div className="container mt-5 align-center">
        <div class="card bg-warning">
          <h1 class="h3 mb-3 fw-normal text-center">ini LOGIN</h1>

          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input type="password" class="form-control" id="exampleInputPassword1"></input>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Role
              </label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Select Your Role</option>
                <option value="admin">Admin</option>
                <option value="kasir">Kasir</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
              <label class="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
