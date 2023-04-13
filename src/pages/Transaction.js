import React, { useEffect } from "react";
import "react-bootstrap";
import Table from "react-bootstrap/Table";

import Data from "../data/Data.json";
function Transaction() {
  useEffect(() => {}, []);
  return (
    <>
      <div style={{ background: "black", height: "100vh" }}>
        <div className="container">
          <h3 className="text-white py-4">Incoming Transaction</h3>
          <Table striped hover>
            <thead>
              <tr style={{ background: "#1F1F1F", color: "red" }}>
                <th>No</th>
                <th>Users</th>
                <th>Bukti Transfer</th>
                <th>Remaining Active</th>
                <th>Status User</th>
                <th>Status Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((item) => {
                return (
                  <tr style={{ background: "#2B2B2B" }}>
                    <td style={{ height: "70px" }} className="text-white">
                      {item.id}
                    </td>
                    <td className="text-white">{item.name}</td>
                    <td className="text-white">{item.image}</td>
                    <td className="text-white">{item.Day}</td>
                    <td style={{ color: "green" }}>Active</td>
                    <td style={{ color: "green" }}>Approve</td>
                    <td>
                      <div class="btn-group">
                        <button
                          type="button"
                          class="btn btn-success dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          <i class="fa fa-caret-up"></i>
                        </button>
                        <ul class="dropdown-menu bg-info">
                          <li>
                            <button class="dropdown-item" href="#">
                              Approve
                            </button>
                          </li>
                          <li>
                            <button class="dropdown-item" href="#">
                              Cancel
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
export default Transaction;
