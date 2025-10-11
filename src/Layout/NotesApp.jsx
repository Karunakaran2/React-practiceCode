import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

const NotesApp = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#000");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const isFirstRender = useRef(true);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNotes = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("All fields are required");
      return;
    }

    if (editId) {
      setNotes(
        notes.map((note) =>
          note.id === editId
            ? {
                ...note,
                title,
                description,
                color,
                createdAt: new Date().toLocaleString(),
              }
            : note
        )
      );
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        description,
        color,
        createdAt: new Date().toLocaleString(),
      };
      setNotes([...notes, newNote]);
      console.log(newNote);
    }

    setTitle("");
    setDescription("");
    setColor("#000");
  };

  const onDelete = (id) => {
    const newNotes = notes.filter((n) => n.id !== id);
    setNotes(newNotes);
  };
  const onEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setDescription(note.description);
    setColor(note.color);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="container py-4 w-50">
      <h1 className="text-center fw-bold mb-4">📝 Notes Keeper App</h1>

      <div className="card shadow p-3 mb-4">
        <h4>{editId ? "Edit Note" : "Add Note"}</h4>
        <Form>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              as="textarea"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex align-items-center gap-3 mb-3">
            <label>Pick color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ width: "50px", height: "30px", border: "none" }}
            />
          </div>

          <Button variant="primary" onClick={addNotes}>
            {editId ? "Update Note" : "Add Note"}
          </Button>
        </Form>
      </div>

      <div className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search notes by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredNotes.length === 0 ? (
          <p className="text-center text-muted">No notes found</p>
        ) : (
          filteredNotes.map((note) => (
            <div className="col-md-6 mb-3" key={note.id}>
              <div
                className="card shadow-sm p-3"
                style={{
                  backgroundColor: note.color,
                  borderRadius: "10px",
                }}
              >
                <h5 className="fw-bold">{note.title}</h5>
                <p>{note.description}</p>
                <small className="text-muted">{note.createdAt}</small>

                <div className="mt-2 d-flex justify-content-end gap-2">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => onEdit(note)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(note.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesApp;
