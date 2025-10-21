import React, { useEffect, useRef, useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactMain = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    fetchContacts();
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, []);

  const fetchContacts = async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();

    try {
      const response = await api.get("/contacts", {
        signal: controllerRef.current.signal,
      });
      setContacts(response.data);
    } catch (error) {
      if (error.name === "CanceledError") return;
      toast.error("Failed to fetch contacts");
    }
  };

  const handleSave = async (contact) => {
    try {
      if (contact.id) {
        await api.put(`/contacts/${contact.id}`, contact);
        toast.success("Contact Updated");
      } else {
        const ids = contacts.map((c) => Number(c.id));
        const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

        const newContact = { ...contact, id: nextId };
        await api.post("/contacts", newContact);
        toast.success("Contact Added!");
      }

      setSelectedContact(null);
      fetchContacts();
    } catch (error) {
      toast.error("Failed to save contact");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      toast.info("Contact Deleted");
      fetchContacts();
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };
  return (
    <div>
      <ContactForm onsave={handleSave} selectedContact={selectedContact} />
      <hr />
      <ContactList
        onDelete={handleDelete}
        onEdit={setSelectedContact}
        contacts={contacts}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default ContactMain;
