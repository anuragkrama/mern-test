import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    smokingStatus: "",
    // payloadType will be determined by the button clicked
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, payloadType) => {
    e.preventDefault();
    const data = { ...formData, payloadType };
    await axios.post("http://localhost:5000/api/payloads", data);
    navigate("/home");
  };

  return (
    <div>
      <h1>Payload Submittion Form</h1>
      <form>
        <div>
          <label>Name: </label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Date of Birth: </label>
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Smoking Status: </label>
          <select
            name="smokingStatus"
            value={formData.smokingStatus}
            onChange={handleChange}
          >
            <option value={""}>Select</option>
            <option value={"smoker"}>Smoker</option>
            <option value={"non-smoker"}>Non-Smoker</option>
          </select>
        </div>
        <div>
          <label>Choose Payload Type: </label>
          <div>
            <button onClick={(e) => handleSubmit(e, "Payload A")}>
              Payload A
            </button>
            <button onClick={(e) => handleSubmit(e, "Payload B")}>
              Payload B
            </button>
            <button onClick={(e) => handleSubmit(e, "Payload C")}>
              Payload C
            </button>
          </div>
        </div>
        {/* Optional: File upload field, cloud storage integration, containerization config placeholders */}
      </form>
    </div>
  );
}

export default Form;
