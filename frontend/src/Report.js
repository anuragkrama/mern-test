import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Report() {
  const { id } = useParams();
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    fetchPayload();
  }, []);

  const fetchPayload = async () => {
    const res = await axios.get(`http://localhost:5000/api/payloads/${id}`);
    setPayload(res.data);
  };

  if (!payload) return <div>Loading...</div>;

  return (
    <div>
      <h1>Payload Report</h1>
      <p>
        <strong>Name: </strong>
        {payload.name}
      </p>
      <p>
        <strong>Date of Birth: </strong>
        {new Date(payload.dob).toLocaleDateString()}
      </p>
      <p>
        <strong>Smoking Status: </strong>
        {payload.smokingStatus}
      </p>
      <p>
        <strong>Payload Type: </strong>
        {payload.payloadType}
      </p>
      <p>
        <strong>Result: </strong>
        {payload.result || "Processing..."}
      </p>
      {/* Optional: Additional details or error handling for uncompleted payloads */}
    </div>
  );
}

export default Report;
