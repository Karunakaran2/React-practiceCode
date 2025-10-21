import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ContactModal = ({ show, selectedContact, handleClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
  });

  useEffect(() => {
    if (selectedContact) setFormData(selectedContact);
    else setFormData({ name: "", email: "", mobileNo: "" });
  }, [selectedContact]);

  const formValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="justify-content-between">
        <Modal.Title>
          {selectedContact ? "Update Contact Form" : "Add Contact Form"}
        </Modal.Title>
        <button
          className="btn btn-sm btn-close"
          onClick={() => handleClose(false)}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={formValue}
              value={formData.name}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Mail ID</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Mail Id"
              name="email"
              value={formData.email}
              onChange={formValue}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Mobile No"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={formValue}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            {selectedContact ? "Update" : "Save"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;
