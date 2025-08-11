import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import FormNote from "../components/FormNote";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(0);
  const [media_type, setMediaType] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('review', review);
    formData.append('score', score);
    formData.append('media_type', media_type);
    if (image) formData.append('image', image);

    const previousNote = notes.find((note) => note.title === title && note.media_type === media_type);
    if (!previousNote) {
      api
        .post("/api/notes/", formData, {
          headers: { 'Content-Type': 'multipart/form-data'}
        })
        .then((res) => {
          if (res.status === 201) alert("Note created!");
          else alert("Failed to make note.");
          getNotes();
        })
        .catch((err) => alert(err));
    }
    else {
      api
        .put(`/api/notes/update/${previousNote.id}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data'}
        })
        .then((res) => {
          if (res.status === 200) alert("Note updated!");
          else alert("Failed to update note.");
          getNotes();
        })
        .catch((err) => alert(err));
    }
  };

  const editNote = (note) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTitle(note.title);
    setMediaType(note.media_type);
    setScore(note.score.toString());
    setReview(note.review);
  };

  return (
    
      <div>
        <button className="logout-button" onClick={() => navigate("/logout")} >Logout</button>
        <FormNote
          review={review}
          setReview={setReview}
          title={title}
          setTitle={setTitle}
          score={score}
          setScore={setScore}
          media_type={media_type}
          setMediaType={setMediaType}
          image={image}
          setImage={setImage}
          onCreate={createNote}
        />
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} onEdit={editNote} key={note.id} />
        ))}
      </div>
  );
}

export default Home;