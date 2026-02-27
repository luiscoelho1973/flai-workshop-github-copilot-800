import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log('Activities: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Activities: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
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
    <div className="octo-page">
      <div className="container">
        <div className="octo-page-header">
          <div className="octo-page-icon">⚡</div>
          <div>
            <h2 className="octo-page-title">Activities</h2>
            <p className="octo-page-count">{activities.length} recorded activit{activities.length !== 1 ? 'ies' : 'y'}</p>
          </div>
        </div>

        {activities.length === 0 ? (
          <div className="octo-empty">
            <div className="octo-empty-icon">⚡</div>
            <p>No activities logged yet.</p>
          </div>
        ) : (
          <div className="octo-data-grid">
            {activities.map((act, i) => (
              <div className="octo-data-card" key={act._id || i}>
                <p className="octo-data-card-label">User</p>
                <p className="octo-data-card-value">{act.user}</p>
                <p className="octo-data-card-label">Activity Type</p>
                <p className="octo-data-card-value">
                  <span className="octo-badge">{act.activity_type}</span>
                </p>
                <p className="octo-data-card-label">Duration</p>
                <p className="octo-data-card-value">{act.duration} min</p>
                <p className="octo-data-card-label">Date</p>
                <p className="octo-data-card-value">{act.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;
