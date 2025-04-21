// client/src/App.js
import React, { useState, useEffect } from 'react';
import '../public';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    state: ''
  });

  const [users, setUsers] = useState([]);

  // Fetch users on page load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('An error occurred while fetching the users');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id.replace('your_', '')]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { name, email, city, state } = formData;
    if (!name || !email || !city || !state) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: name, Email: email, City: city, State: state })
      });

      const data = await response.json();

      if (response.ok) {
        alert('You have successfully signed the petition!');
        fetchUsers();
        setFormData({ name: '', email: '', city: '', state: '' });
      } else {
        alert('Error signing petition: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing the petition');
    }
  };

  return (
    <div>
      <div className="Header">
        <div className="navbar">
          <p>Home</p>
          <p>About</p>
          <p>Categories</p>
          <p>Contact</p>
        </div>
      </div>

      <div className="Content_box">
        <div className="box">
          <div className="content_header">
            <h1>Move CPTS 489 to Afternoon in Winter!</h1>
          </div>

          <div className="content_wrapper">
            <div className="content_info">
              <p>
                The image you see on the right is a representation of our professor every morning, right before his much-needed coffee that helps thaw him out a bit.
                Imagine having to wake up at 4 or 5 AM in the dead of winter just to prepare for class...
              </p>
            </div>
            <div className="image">
              <img src="/Users/matthewwong/Desktop/Web-Dev-/petition/petition/public/s-l400-2.jpg/" alt="Frozen professor" />
            </div>
          </div>

          <div className="sign_up_box">
            <h1>Sign the Petition</h1>
            <div className="text_boxes">
              {['name', 'email', 'city', 'state'].map((field) => (
                <div className="input_group" key={field}>
                  <input
                    type="text"
                    id={`your_${field}`}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="input_group">
                <button type="button" onClick={handleSubmit}>
                  Sign The Petition
                </button>
              </div>
            </div>
          </div>

          <h1 className="h1_sign">Signatures</h1>
          <div className="signatures">
            <table border="1" id="signatures_table">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>City</td>
                  <td>State</td>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.Name}</td>
                    <td>{user.City}</td>
                    <td>{user.State}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
