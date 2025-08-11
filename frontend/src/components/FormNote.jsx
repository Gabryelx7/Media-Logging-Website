const FormNote = ({
  review, setReview,
  title, setTitle,
  score, setScore,
  media_type, setMediaType,
  image, setImage,
  onCreate
}) => {
  return (
    <div>
      <div>
        <h2 style={{textAlign: "center"}}>Create a Log</h2>
      </div>
      
      <form onSubmit={onCreate} style={{backgroundColor: "#456"}}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", marginBottom: "16px" }}>
          <div
            style={{
              width: "150px",
              height: "150px",
              border: "2px dotted #aaa",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
              position: "relative"
            }}
          >
            {image ? (
              <img
                src={typeof image === "string" ? image : URL.createObjectURL(image)}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ color: "#aaa", textAlign: "center" }}>Add Image</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: 0,
                left: 0,
                top: 0,
                cursor: "pointer"
              }}
              title=""
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="title">Title:</label>
            <br />
            <input
              type="text"
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", marginBottom: "12px" }}
            />
            <label htmlFor="rating">Rating:</label>
            <br />
            <div style={{ fontSize: "2rem", cursor: "pointer", marginBottom: "12px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{ color: star <= score ? "#FFD700" : "#ccc", fontSize: "3rem"}}
                  onClick={() => setScore(star)}
                  data-testid={`star-${star}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
        <label htmlFor="media-type" >Media Type:</label>
        <br />
        <div style={{ display: "flex", gap: "10px", marginTop: "10px", marginBottom: "10px", width: "100%" }}>
          {[
            { type: "Movie", emoji: "🎬" },
            { type: "Book", emoji: "📚" },
            { type: "Album", emoji: "💿" }
          ].map(({ type, emoji }) => (
            <button
              key={type}
              type="button"
              onClick={() => setMediaType(type)}
              style={{
                flex: 1,
                padding: "12px 0",
                borderRadius: "5px",
                border: media_type === type ? "2px solid #007bff" : "1px solid #ccc",
                background: media_type === type ? "#e6f0ff" : "#fff",
                color: media_type === type ? "#007bff" : "#333",
                fontWeight: media_type === type ? "bold" : "normal",
                cursor: "pointer",
                fontSize: "1.2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>{emoji}</span>
              {type}
            </button>
          ))}
        </div>
        <br />
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
    </div>
  )
}

export default FormNote;
