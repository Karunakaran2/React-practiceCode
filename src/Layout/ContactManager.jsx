import React, { useEffect, useState } from "react";
import api, {
  addContact,
  deleteContact,
  getContacts,
  updateContact,
} from "../services/api";
import ContactModal from "../Layout/ContactModal";
import { toast, ToastContainer } from "react-toastify";

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const fetchContacts = async () => {
    try {
      const response = await getContacts();
      setContacts(response.data);
      setFiltered(response.data);
    } catch (error) {
      toast.error("Error fetching contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSave = async (contact) => {
    try {
      if (contact.id) {
        await updateContact(contact.id, contact);
        toast.success("Contact updated!");
      } else {
        await addContact(contact);
        toast.success("Contact Added Successfully");
      }
      fetchContacts();
    } catch (error) {
      toast.error("Failed to Save Contact");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are You Sure")) return;
    try {
      await deleteContact(id);
      toast.info("Contact deleted");
      fetchContacts();
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFiltered(
      contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(value) ||
          c.email.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div>
      <h1>Contact Manager App</h1>

      <div className="d-flex align-items-center justify-content-between">
        <div className="col-lg-10">
          <input
            type="search"
            value={search}
            placeholder="Search"
            className="form-control"
            onChange={handleSearch}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            setShowModal(true);
            setSelectedContact(null);
          }}
        >
          Add Contact
        </button>
      </div>

      <div>
        <table className="table table-bordered table-hover mt-5">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Name</th>
              <th>Email ID</th>
              <th>Mobile No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td>No Data Found</td>
              </tr>
            ) : (
              filtered.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.mobileNo}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDelete(contact.id)}
                    >
                      {" "}
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ContactModal
        handleClose={() => setShowModal(false)}
        show={showModal}
        onSave={handleSave}
        selectedContact={selectedContact}
      />
      <ToastContainer position="top-right" />
    </div>
  );
};

export default ContactManager;
