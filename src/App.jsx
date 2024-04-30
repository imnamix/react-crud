import React, { useState } from "react";

const TodoList = () => {
  // State to hold the todo items
  const [todos, setTodos] = useState([]);
  // State to hold input values
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [status, setStatus] = useState("active"); // Default status is active
  const [representative, setRepresentative] = useState("");
  // State to hold the selected status for filtering
  const [filterStatus, setFilterStatus] = useState("all"); // Default: show all todos
  // State to hold the ID of the todo being edited
  const [editId, setEditId] = useState(null);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      // If editId is not null, it means we're editing an existing todo
      // So we find the todo with editId and update it
      setTodos(todos.map(todo => {
        if (todo.id === editId) {
          return {
            id: editId,
            name: name,
            mobile: mobile,
            dob: dob,
            status: status,
            representative: representative,
          };
        } else {
          return todo;
        }
      }));
      // Reset editId
      setEditId(null);
    } else {
      // If editId is null, it means we're adding a new todo
      // Add the new todo item to the todos array
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          name: name,
          mobile: mobile,
          dob: dob,
          status: status,
          representative: representative,
        },
      ]);
    }
    // Reset input fields
    setName("");
    setMobile("");
    setDob("");
    setStatus("active"); // Reset status to active after submission
    setRepresentative("");
  };

  // Function to handle editing a todo
  const handleEdit = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      // Set values of input fields to the values of the todo being edited
      setName(todoToEdit.name);
      setMobile(todoToEdit.mobile);
      setDob(todoToEdit.dob);
      setStatus(todoToEdit.status);
      setRepresentative(todoToEdit.representative);
      // Set editId to the ID of the todo being edited
      setEditId(id);
    }
  };

  // Function to handle deleting a todo
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Function to handle filtering
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // Filter the todos based on selected status
  const filteredTodos = todos.filter(todo => filterStatus === 'all' || todo.status === filterStatus);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Todo List</h1>
      <table style={{ background: '#dbd7d7', width: '100%', padding: '15px', fontSize: '130%' }}>
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Mobile Number</th>
            <th className="px-4 py-2">Date of Birth</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Representative</th>
            <th className="px-4 py-2">Actions</th>
            <select
                id="filterStatus"
                value={filterStatus}
                onChange={handleFilterChange}
                className="border rounded p-2"
              >
                <option value="all">Filter</option>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="suspend">Suspend</option>
                <option value="failed">Failed</option>
              </select>
          </tr>
        </thead>
      
      </table>
      <form onSubmit={handleSubmit} className="mb-4 flex justify-center" style={{ alignItem: 'center', marginTop: '10px' }}>
        <div className="flex flex-wrap justify-center" style={{ alignItem: 'center' }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 rounded p-4 mb-2 mr-4"
            style={{ border: '2px solid #ccc', borderRadius: '0.25rem', padding: '0.8rem', marginBottom: '0.5rem', marginRight: '1.9rem', marginLeft: '0px' }}
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border-2 rounded p-2 mb-2 mr-4"
            style={{ border: '2px solid #ccc', borderRadius: '0.25rem', padding: '0.8rem', marginBottom: '0.5rem', marginRight: '4rem' }}
          />
          <input
            type="text"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="border rounded p-2 mb-2 mr-4"
            style={{ border: '2px solid #ccc', borderRadius: '0.25rem', padding: '0.8rem', marginBottom: '0.5rem', marginRight: '4rem' }}
          />
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded p-2 mb-2 mr-4"
            style={{ border: '2px solid #ccc', borderRadius: '0.25rem', padding: '0.8rem', marginBottom: '0.5rem', marginRight: '4rem' }}
          >
            <option value="active">Active</option>
            <option value="suspend">Suspend</option>
            <option value="failed">Failed</option>
          </select>
          <input
            type="text"
            placeholder="Representative"
            value={representative}
            onChange={(e) => setRepresentative(e.target.value)}
            className="border rounded p-2 mb-2 mr-4"
            style={{ border: '2px solid #ccc', borderRadius: '0.25rem', padding: '0.8rem', marginBottom: '0.5rem', marginRight: '2rem' }}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {editId !== null ? 'Edit Todo' : 'Add Todo'}
          </button>
        </div>
      </form>

      <table className="w-full" style={{ width: '100%', padding: '15px', fontSize: '130%', borderBottom: '1px solid black' }}>
        <tbody>
          {filteredTodos.map((todo) => (
            <tr key={todo.id}>
              <td className="border px-4 py-2">{todo.name}</td>
              <td className="border px-4 py-2">{todo.mobile}</td>
              <td className="border px-4 py-2">{todo.dob}</td>
              <td className="border px-4 py-2">{todo.status}</td>
              <td className="border px-4 py-2">{todo.representative}</td>
              <td className="border px-4 py-2">
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2" onClick={() => handleEdit(todo.id)}>Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleDelete(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
