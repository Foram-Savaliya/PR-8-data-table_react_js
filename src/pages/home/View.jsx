import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const View = () => {
  const navigate = useNavigate();
  let data = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : []
  const [record, setRecord] = useState(data)
  const [mdelete, setMdelete] = useState([]);
  const [status, setStatus] = useState("")
  const [filRecord, setFilRecord] = useState([])
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("")

  const deleteUser = (id) => {
    let d = record.filter((val) => val.id != id);
    localStorage.setItem('users', JSON.stringify(d));
    setFilRecord(d)
    alert("record delete")
  }

  const handlechangedelete = (id, checked) => {
    let all = [...mdelete];
    if (checked) {
      all.push(id)
    } else {
      all = all.filter(val => val != id)
    }
    setMdelete(all)
  }
  const multipleDelete = () => {
    if (mdelete.length > 0) {
      let md = record.filter(val => !mdelete.includes(val.id));
      localStorage.setItem("users", JSON.stringify(md));
      setFilRecord(md)
    } else {
      alert("Select at least one user")
      return false

    }
  }

  useEffect(() => {
    let fil = [...record]
    if (status) {
      fil = fil.filter(val => val.status === status)
    }
    if (search) {
      fil = fil.filter(val => val.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (sort) {
      if (sort === "asc") {
        fil = fil.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
      } else {
        fil = fil.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)

      }
    }

    setFilRecord(fil)
  }, [status, search, sort])

  return (
    <>

      <div className="container-fluid mt-5 shadow p-5">

        <div className="row justify-content-center">
          <div className="col-lg-3 mb-5">
            <select className="form-control"
              onChange={(e) => setStatus(e.target.value)}
              value={status}>
              <option>Select Status</option>
              <option value="Active"> Active</option>
              <option value="Deactive"> Deactive</option>
            </select>
          </div>

          <div className="col-lg-3 mb-5">
            <input type="search" className="form-control" placeholder="Search here ...!"
              onChange={(e) => setSearch(e.target.value)} value={search}></input>
          </div>

          <div className="col-lg-3 mb-5">
            <select className="form-control"
              onChange={(e) => setSort(e.target.value)}
              value={sort} >

              <option value={"select"}>Select Sort</option>
              <option value={"asc"}>Asc</option>
              <option value={"dsc"}>Dsc</option>


            </select>
          </div>

          
        </div>

        <div className="row">
          <div className="col-lg-12 mx-auto">

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Join Date</th>
                  <th scope="col">Action</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {filRecord.map((val) => {
                  return (
                    <tr>
                      <td>{val.id}</td>
                      <td>{val.name}</td>
                      <td>{val.email}</td>
                      <td>{val.password}</td>
                      <td>{val.gender}</td>
                      <td>{val.date}</td>

                      <td>
                        <button
                          onClick={() => deleteUser(val.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                        &nbsp;
                        <button
                          onClick={() => navigate(`/edit`, { state: val })}
                          className="btn btn-primary btn-sm"
                        >
                          Edit
                        </button>
                      </td>

                      <td>
                        {
                          val.status == "Active" ? (
                            <button style={{ color: "green", border: 0, background: "none", fontWeight: 700 }}>{val.status}</button>
                          ) : (
                            <button style={{ color: "red", border: 0, background: "none", fontWeight: 700 }}>{val.status}</button>
                          )
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div align="center" className="mt-5">
              <Link to={`/add`} >
                <button className="btn btn-success btn-sm">Add</button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default View;
