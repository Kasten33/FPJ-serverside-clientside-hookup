import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    date_published: "",
    ongoing: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  // test line.

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:3000/books/${id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      title: form.title,
      author: form.author,
      date_published: form.date_published,
      ongoing: form.ongoing,
    };

    // This will send a post request to update the data in the database.
    const bookId = params.id.toString();
    await fetch(`http://localhost:3000/books/${bookId}`, {
      method: "PATCH",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Book</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={form.author}
            onChange={(e) => updateForm({ author: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date_published">Date Published: </label>
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

        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
