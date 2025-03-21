import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"

function Home() {
    const [notes, setNotes] = useState([]);
    const [review, setReview] = useState("");
    const [title, setTitle] = useState("");
    const [score, setScore] = useState("5");
    const [media_type, setMediaType] = useState("Movie");

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
        api
            .post("/api/notes/", { review, score, media_type, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="media-type">Media Type:</label>
                <br />
                <select id="media-type" name="media-type" required onChange={(e) => setMediaType(e.target.value)}>
                    <option value="Movie">Movie</option>
                    <option value="Book">Book</option>
                    <option value="Album">Album</option>
                </select>
                <br />
                <label htmlFor="score">Score:</label>
                <br />
                <input
                    type="number"
                    id="score"
                    name="score"
                    min="0"
                    max="100"
                    step="10"
                    required
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                />
                <label htmlFor="review">Review:</label>
                <br />
                <textarea
                    id="review"
                    name="review"
                    required
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
        </div>
    );
}

export default Home;