import React, { useState, useEffect } from 'react';
import { RandomImage } from '../App';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Users: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return (
    <div className="octo-page">
      <div className="octo-spinner-wrap"><div className="octo-spinner" /></div>
    </div>
  );

  if (error) return (
    <div className="octo-page">
      <div className="container">
        <div className="alert alert-danger mt-4">Error: {error}</div>
      </div>
    </div>
  );

  return (
    <div className="octo-page" style={{ position: 'relative', overflow: 'hidden' }}>
      <RandomImage />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="octo-page-header">
          <div className="octo-page-icon">👤</div>
          <div>
            <h2 className="octo-page-title">Users</h2>
            <p className="octo-page-count">{users.length} member{users.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="octo-empty">
            <div className="octo-empty-icon">👤</div>
            <p>No users found.</p>
          </div>
        ) : (
          <div className="octo-data-grid">
            {users.map((user, i) => (
              <div className="octo-data-card" key={user._id || i}>
                <p className="octo-data-card-label">Username</p>
                <p className="octo-data-card-value">{user.username}</p>
                <p className="octo-data-card-label">Email</p>
                <p className="octo-data-card-value">{user.email || '—'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
