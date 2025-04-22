import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [signatures, setSignatures] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    city: '',
    state: ''
  });

  useEffect(() => {
    fetch('http://localhost:4000/signatures')
      .then(res => res.json())
      .then(data => setSignatures(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.placeholder.toLowerCase()]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
      city: form.city,
      state: form.state
    };

    fetch('http://localhost:4000/signatures', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        setSignatures([...signatures, data]); // Add new signature to state
        setForm({ name: '', email: '', city: '', state: '' }); // Reset form
      })
      .catch(err => console.error('Error:', err));
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
                The image you see on the right is a representation of our professor every morning,
                right before his much-needed coffee that helps thaw him out a bit.
                Imagine having to wake up at 4 or 5 AM in the dead of winter just to prepare for class.
                Technically, since the sun hasn't even risen yet, can we really call 4 AM "morning"?
                The frigid cold, combined with the mental fog of early hours, is an unfair battle both
                for students and faculty alike. No one should have to endure sub-zero temperatures just to
                attend an 8 AM lecture. Morning brain freeze inevitably leads to null pointer exceptions in
                our heads! For these reasons, we humbly request the administration to consider shifting CPTS
                489 to a more humane afternoon time slot.
              </p>
            </div>
            <div className="image">
            <img src="/images/s-l400-2.jpg" alt="Frozen Professor" />
            </div>
          </div>

          <div className="sign_up_box">
            <h1>Sign the Petition</h1>

            <form className="text_boxes" onSubmit={handleSubmit}>
              <div className="input_group">
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input_group">
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input_group">
                <input
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>
              <div className="input_group">
                <input
                  type="text"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                />
              </div>
              <div className="input_group">
                <button type="submit">Sign The Petition</button>
              </div>
            </form>
          </div>

          <h1 className="h1_sign">Signatures</h1>
          <div className="signatures">
            <table border="1">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {signatures.map((sig, index) => (
                  <tr key={index}>
                    <td>{sig.name}</td>
                    <td>{sig.city}</td>
                    <td>{sig.state}</td>
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
