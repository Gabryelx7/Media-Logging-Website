import "../styles/Note.css"

function Note({ note, onDelete, onEdit }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")
  const mediaTypeClass = `note-media-type-${note.media_type.toLowerCase()}`;
  const getScoreColor = (score) => {
    if (score <= 40) return "#f50000";
    if (score <= 60) return "#f4cd0a";
    if (score <= 80) return "#00ff00";
    return "#009c00";
  }

  return (
    <div className="note-container">
      <p>
        <span className="note-score" style={{ "--bubble-color": getScoreColor(note.score) }}>{note.score}</span>
        <span className="note-title" >&ensp;{note.title}</span>
      </p>
      <p className={`note-media-type ${mediaTypeClass}`}>{note.media_type}</p>
      <p className="note-review">{note.review}</p>
      <p className="note-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
      <button className="edit-button" onClick={() => onEdit(note)}>
        Delete
      </button>
    </div>
  );
}

export default Note