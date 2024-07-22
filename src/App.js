import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isTabbleVisible, setIsTableVisible] = useState(false);

  function handleAddNote() {
    if (!title || !description) return;
    if (editNote) {
      setNotes((notes) =>
        notes.map((note) =>
          note.id === editNote.id ? { ...note, title, description } : note
        )
      );
      setEditNote(null);
    } else {
      const newNote = { id: Date.now(), title, description };
      setNotes((notes) => [...notes, newNote]);
    }
    setTitle("");
    setDescription("");
  }

  function handleDelete(id) {
    setNotes((notes) => notes.filter((note) => note.id !== id));
    setTitle("");
    setDescription("");
  }

  function handleEdit(note) {
    setEditNote(note);
    setTitle(note.title);
    setDescription(note.description);
  }

  function handleOnCreate() {
    setIsFormVisible(true);
  }

  function handleTableVisibility() {
    setIsTableVisible(true);
  }

  return (
    <div>
      <Header />
      <div className="container m-4">
        <div className="row">
          <div className="col-md-4">
            <CreateNote onCreateNote={handleOnCreate} />
            {isFormVisible && (
              <NoteForm
                onAddNote={handleAddNote}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                isEditing={editNote !== null}
                onTableVisiblility={handleTableVisibility}
              />
            )}
          </div>
          {isTabbleVisible && (
            <div className="col-md-8 mt-5">
              <Notes
                notes={notes}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <nav className="navbar navbar-dark p-4 header">
      <h2 className="text-light">📝ToDo List App📝</h2>
    </nav>
  );
}

function CreateNote({ onCreateNote }) {
  return (
    <button className="btn btn-primary mb-0" onClick={onCreateNote}>
      Add note
    </button>
  );
}

function NoteForm({
  onAddNote,
  title,
  setTitle,
  description,
  setDescription,
  isEditing,
  onTableVisiblility,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onAddNote();
  }

  return (
    <div className="mt-4 shadow p-4 bg-white rounded">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="noteTitle">Title</label>
          <input
            type="text"
            id="noteTitle"
            placeholder="Note title..."
            className="form-control mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="noteDescription">Description</label>
          <textarea
            id="noteDescription"
            className="form-control w-100 p-2 mb-4"
            placeholder="Note desc..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          className="btn btn-success"
          type="submit"
          onClick={onTableVisiblility}
        >
          {isEditing ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

function Notes({ notes, onDelete, onEdit }) {
  return (
    <div className="container-fluid mt-3">
      <table className="table table-bordered text-center">
        <thead className="bg-dark text-light">
          <tr>
            <th>No</th>
            <th>Note</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <NoteList
              note={note}
              key={note.id}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NoteList({ note, onDelete, onEdit }) {
  return (
    <tr>
      <td>{note.id}</td>
      <td>{note.title}</td>
      <td>{note.description}</td>
      <td>
        <button className="btn btn-link p-0 me-3" onClick={() => onEdit(note)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className="btn btn-link p-0"
          onClick={() => {
            onDelete(note.id);
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </td>
    </tr>
  );
}

function Footer() {
  const date = new Date().getFullYear();
  return (
    <div>
      <footer className="text-center footer">
        <p>&copy; Abdali khan {date}</p>
      </footer>
    </div>
  );
}
