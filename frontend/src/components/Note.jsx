import "../styles/Note.css"

const Note = ({ note, onDelete, onEdit }) => {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
  const mediaTypeClass = `note-media-type-${note.media_type.toLowerCase()}`;

  const renderStars = (score) => {
    const stars = Math.round(Number(score));
    return (
      <span>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{ color: star <= stars ? "#FFD700" : "#ccc", fontSize: "2rem" }}
          >
            ★
          </span>
        ))}
      </span>
    );
  };

  const mediaEmoji = {
    Movie: "🎬",
    Book: "📚",
    Album: "💿"
  }[note.media_type] || "";

  return (
    <div className="note-card">
      <div className="note-main">
        {note.image && (
          <img
            src={note.image}
            alt="Note"
            className="note-image"
          />
        )}
        <div className="note-info">
          <div className="note-title-row">
            <span className="note-title">{note.title}</span>
          </div>
          <div className="note-meta-row">
            <span className="note-media-type" title={note.media_type}>
              {mediaEmoji} {note.media_type}
            </span>
          </div>
          <div className="note-meta-row">
            <span className="note-rating">{renderStars(note.score)}</span>
          </div>
        </div>
      </div>
      <div className="note-bottom">
        <p className="note-review">{note.review}</p>
        <div className="note-bottom-row">
          <span className="note-date">{formattedDate}</span>
          <div>
            <button className="edit-button" onClick={() => onEdit(note)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;