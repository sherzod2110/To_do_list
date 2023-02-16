import { useEffect, useState } from "react";
import "./app.css";

function App() {
  const [data, setData] = useState([]);
  const [del, setDel] = useState([]);
  const [upda, setupda] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9090/todo/get`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [data]);

  const createTodo = (e) => {
    e.preventDefault();
    const { text } = e.target;
    fetch(`http://localhost:9090/todo/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text.value,
      }),
    });
    text.value = "";
  };

  const deleteFn = (id) => {
    fetch(`http://localhost:9090/todo/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setDel(data));
  };

  const [text, setTitle] = useState(data.text);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const updateFn = (id) => {
    event.preventDefault();
    fetch(`http://localhost:9090/todo/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: val.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => setupda(data));
  };

  return (
    <>
      <div className="container-xl mx-auto p-0 m-0 m-3">
        <div
          className="w-75 rounded-5 p-3 mx-auto scrol"
          style={{
            height: "600px",
            boxShadow: "4px 4px 49px -5px rgba(34, 60, 80, 0.2)",
          }}
        >
          <div
            className="position-fixed mx-auto start-0 end-0 top-0 bg-white rounded-4"
            style={{
              width: "990px",
              boxShadow: "4px 4px 49px -5px rgba(34, 60, 80, 0.2)",
            }}
          >
            <h1 className="text-center">Todo List</h1>
            <form onSubmit={(e) => createTodo(e)}>
              <input
                className="form-control w-100 border-0 p-3 mt-3"
                style={{
                  boxShadow: "4px 4px 49px -5px rgba(34, 60, 80, 0.2)",
                }}
                type="text"
                name="text"
                placeholder="Text ..."
                autoComplete="off"
              />
            </form>
          </div>

          <table className="table table-striped scrol mt-3">
            <thead>
              <tr className="text-center">
                <th>Count</th>
                <th>Text</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.data?.map((e, i) => (
                <tr key={i} className="text-center">
                  <td> {i + 1} </td>
                  <td> {e.text} </td>
                  <td>
                    <div
                      className="modal fade"
                      id="exampleModalToggle"
                      aria-hidden="true"
                      aria-labelledby="exampleModalToggleLabel"
                      tabIndex="-1"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalToggleLabel"
                            >
                              Update 👇
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={() => updateFn(e?.id)}>
                              <input
                              key={i}
                                className="form-control"
                                defaultValue={e.text}
                                type="text"
                                name="text"
                                placeholder="Update ..."
                                onChange={handleTitleChange}
                              />
                            </form>
                          </div>
                          <div className="modal-footer">
                            {/* <button
                              className="btn btn-primary"
                              data-bs-target="#exampleModalToggle2"
                              data-bs-toggle="modal"
                            >
                              Send
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModalToggle2"
                      aria-hidden="true"
                      aria-labelledby="exampleModalToggleLabel2"
                      tabIndex="-1"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalToggleLabel2"
                            >
                              Modal 2
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            Hide this modal and show the first with the button
                            below.
                          </div>
                          <div className="modal-footer">
                            <button
                              className="btn btn-primary"
                              data-bs-target="#exampleModalToggle"
                              data-bs-toggle="modal"
                            >
                              Back to first
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      href="#exampleModalToggle"
                      role="button" ////////////////////////////
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteFn(e?.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default App;
