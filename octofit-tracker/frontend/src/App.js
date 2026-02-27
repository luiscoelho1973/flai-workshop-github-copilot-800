import React from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const featureCards = [
  { initials: 'US', title: 'Users', description: 'Manage profiles and track progress.', path: '/users' },
  { initials: 'TM', title: 'Teams', description: 'Create squads and push each other forward.', path: '/teams' },
  { initials: 'AC', title: 'Activities', description: 'Log workouts and keep a daily rhythm.', path: '/activities' },
  { initials: 'WO', title: 'Workouts', description: 'Stay on plan with focused sessions.', path: '/workouts' },
  { initials: 'LB', title: 'Leaderboard', description: 'Climb the ranks and celebrate wins.', path: '/leaderboard' },
];

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero */}
      <div className="octo-hero">
        <div className="octo-hero-content">
          <p className="octo-hero-eyebrow">YOUR FITNESS COMMAND CENTER</p>
          <h1 className="octo-hero-title">
            Welcome to <span className="octo-accent">OctoFit</span> Tracker
          </h1>
          <p className="octo-hero-subtitle">
            Track your fitness activities, compete with your team, and stay motivated.
          </p>
          <div className="octo-hero-actions">
            <button className="btn octo-btn-primary" onClick={() => navigate('/users')}>
              Get Started
            </button>
            <button className="btn octo-btn-outline" onClick={() => navigate('/leaderboard')}>
              View Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="octo-cards-section">
        <div className="container">
          <p className="section-title">Explore the App</p>
          <p className="section-sub">Everything you need to stay active and competitive.</p>
          <div className="row g-4 justify-content-center">
            {featureCards.map((card) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-2" key={card.initials}>
                <div className="octo-card" onClick={() => navigate(card.path)} role="button">
                  <div className="octo-card-avatar">{card.initials}</div>
                  <h5 className="octo-card-title">{card.title}</h5>
                  <p className="octo-card-desc">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="octo-app">
      {/* Navbar */}
      <nav className="octo-navbar">
        <div className="container d-flex align-items-center justify-content-between">
          <NavLink className="octo-brand" to="/">OctoFit Tracker</NavLink>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octoNav"
            aria-controls="octoNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" style={{filter: 'invert(1)'}}></span>
          </button>
          <div className="collapse navbar-collapse" id="octoNav">
            <ul className="navbar-nav ms-auto">
              {[['/', 'Home'], ['/users', 'Users'], ['/teams', 'Teams'],
                ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'], ['/workouts', 'Workouts']
              ].map(([path, label]) => (
                <li className="nav-item" key={path}>
                  <NavLink
                    className={({ isActive }) =>
                      'octo-nav-link' + (isActive ? ' octo-nav-link--active' : '')
                    }
                    to={path}
                    end={path === '/'}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>

      <footer className="octo-footer">
        OctoFit Tracker &mdash; Mergington High School &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
