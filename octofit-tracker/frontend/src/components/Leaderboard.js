import React, { useState, useEffect } from 'react';
import { RandomImage } from '../App';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
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

  const medals = ['🥇','🥈','🥉'];

  return (
    <div className="octo-page" style={{ position: 'relative', overflow: 'hidden' }}>
      <RandomImage />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="octo-page-header">
          <div className="octo-page-icon">🏅</div>
          <div>
            <h2 className="octo-page-title">Leaderboard</h2>
            <p className="octo-page-count">{entries.length} ranked player{entries.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {entries.length === 0 ? (
          <div className="octo-empty">
            <div className="octo-empty-icon">🏅</div>
            <p>No leaderboard entries yet.</p>
          </div>
        ) : (
          <div className="octo-data-grid">
            {entries.map((entry, i) => (
              <div className="octo-data-card" key={entry._id || i}>
                <div className="octo-rank-badge">
                  {medals[i] || `#${i + 1}`}
                </div>
                <p className="octo-data-card-label">Player</p>
                <p className="octo-data-card-value">{entry.user_name}</p>
                <p className="octo-data-card-label">Score</p>
                <p className="octo-data-card-value">
                  <span className="octo-badge">{entry.score} pts</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
