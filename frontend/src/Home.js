import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [payloads, setPayloads] = useState([]);

  useEffect(() => {
    fetchPayloads();
  }, []);

  const fetchPayloads = async () => {
    const res = await axios.get("http://localhost:5000/api/payloads");
    setPayloads(res.data);
  };

  return (
    <div>
      <h1>Landing Page</h1>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/form">
          <button>Submit New Payload</button>
        </Link>
      </div>
      <h2>Submitted Payloads</h2>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Payload Type</th>
            <th>Result</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payloads.map((payload) => (
            <tr key={payload._id}>
              <td>
                <Link to={`/report/${payload._id}`}>{payload.name}</Link>
              </td>
              <td>{payload.payloadType}</td>
              <td>{payload.result || "Processing..."}</td>
              <td>{new Date(payload.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
