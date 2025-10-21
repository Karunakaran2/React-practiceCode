import React, { useEffect, useState } from "react";

const ContactForm = ({ onsave, selectedContact }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
  });

  useEffect(() => {
    if (selectedContact) setFormData(selectedContact);
  }, [selectedContact]);

  const formSubmit = (e) => {
    e.preventDefault();
    onsave(formData);
    setFormData({ name: "", email: "", mobileNo: "" });
  };

  const formOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-5 w-50">
      <h1>{selectedContact ? "Update Contact Form" : "Add Contact Form"}</h1>

      <div className="card card-body rounded-3">
        <form onSubmit={formSubmit} className="d-flex flex-column gap-2">
          <label htmlFor="">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={formOnChange}
          />
          <label htmlFor="">Email ID</label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter Mail Id"
            value={formData.email}
            onChange={formOnChange}
          />
          <label htmlFor="">Mobile No</label>
          <input
            className="form-control"
            type="number"
            name="mobileNo"
            placeholder="Enter Mobile No"
            value={formData.mobileNo}
            onChange={formOnChange}
          />
          <button type="submit" className="btn btn-primary">
            {" "}
            {selectedContact ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
