import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    date_published: "",
    ongoing: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newBook = { ...form };

    await fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      title: "",
      author: "",
      date_published: "",
      ongoing: "",
    });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Book</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={form.author}
            onChange={(e) => updateForm({ author: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date_published">Date Published</label>
          <input
            type="text"
            className="form-control"
            id="date_published"
            value={form.date_published}
            onChange={(e) => updateForm({ date_published: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ongoing">Ongoing?</label>
          <input
            type="text"
            className="form-control"
            id="ongoing"
            value={form.ongoing}
            onChange={(e) => updateForm({ ongoing: e.target.value })}
          />
        </div>

        <div className="form-group" style={{ marginTop: "10px" }}>
          <input
            type="submit"
            value="Create Book"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
