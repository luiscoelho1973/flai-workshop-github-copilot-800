import React, { useState, useEffect } from 'react';
import { RandomImage } from '../App';

const HOUSE_CLASSES = ['team-gryffindor', 'team-slytherin', 'team-ravenclaw', 'team-hufflepuff'];
const HOUSE_LABELS  = ['🦁 Gryffindor', '🐍 Slytherin', '🦅 Ravenclaw', '🦡 Hufflepuff'];

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
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
          <div className="octo-page-icon">🏆</div>
          <div>
            <h2 className="octo-page-title">Teams</h2>
            <p className="octo-page-count">{teams.length} team{teams.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {teams.length === 0 ? (
          <div className="octo-empty">
            <div className="octo-empty-icon">🏆</div>
            <p>No teams found.</p>
          </div>
        ) : (
          <div className="octo-data-grid">
            {teams.map((team, i) => {
              const houseClass = HOUSE_CLASSES[i % 4];
              const houseLabel = HOUSE_LABELS[i % 4];
              return (
              <div className={`octo-data-card ${houseClass}`} key={team._id || i}>
                <p className="octo-data-card-label">House</p>
                <p className="octo-data-card-value">{houseLabel}</p>
                <p className="octo-data-card-label">Team Name</p>
                <p className="octo-data-card-value">{team.name}</p>
                <p className="octo-data-card-label">Members</p>
                <p className="octo-data-card-value">
                  {Array.isArray(team.members)
                    ? team.members.map((m, mi) => (
                        <span className="octo-badge me-1" key={mi}>{m.user_name}</span>
                      ))
                    : <span className="octo-badge">{team.members || '—'}</span>
                  }
                </p>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
