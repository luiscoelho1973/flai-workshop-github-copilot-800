import React from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import rImg from './R.png';
import './App.css';

/* R.png floating decoration */
export function RandomImage() {
  const style = React.useMemo(() => ({
    width:   `${55 + Math.floor(Math.random() * 70)}px`,
    top:     `${10 + Math.floor(Math.random() * 75)}%`,
    left:    `${5  + Math.floor(Math.random() * 80)}%`,
    opacity: 0.08 + Math.random() * 0.1,
    '--rr':  `${Math.floor(Math.random() * 30) - 15}deg`,
    animationDelay: `${Math.random() * 4}s`,
  }), []);
  return <img src={rImg} alt="" className="rpng-float" style={style} aria-hidden="true" />;
}

const navItems = [
  { path: '/',            label: 'Dashboard',   icon: '⚡' },
  { path: '/users',       label: 'Users',        icon: '👤' },
  { path: '/teams',       label: 'Teams',        icon: '🏆' },
  { path: '/activities',  label: 'Activities',   icon: '⚡' },
  { path: '/leaderboard', label: 'Leaderboard',  icon: '🥇' },
  { path: '/workouts',    label: 'Workouts',     icon: '💪' },
];

const featureCards = [
  { initials: 'US', title: 'Users',       description: 'Manage profiles and track member progress.',     path: '/users'       },
  { initials: 'TM', title: 'Teams',       description: 'Create squads and push each other forward.',     path: '/teams'       },
  { initials: 'AC', title: 'Activities',  description: 'Log workouts and keep a daily rhythm.',          path: '/activities'  },
  { initials: 'WO', title: 'Workouts',    description: 'Stay on plan with focused sessions.',            path: '/workouts'    },
  { initials: 'LB', title: 'Leaderboard', description: 'Climb the ranks and celebrate wins.',           path: '/leaderboard' },
];

function Sidebar() {
  return (
    <aside className="octo-sidebar">
      <div className="octo-sidebar-header">
        <NavLink className="octo-brand" to="/">
          <div className="octo-brand-icon">🏋️</div>
          <span className="octo-brand-name">OctoFit</span>
        </NavLink>
      </div>

      <nav className="octo-sidebar-nav">
        <p className="octo-sidebar-label">Menu</p>
        {navItems.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              'octo-nav-link' + (isActive ? ' octo-nav-link--active' : '')
            }
          >
            <span className="nav-icon">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="octo-sidebar-footer">
        Mergington High School<br />© {new Date().getFullYear()}
      </div>
    </aside>
  );
}

function TopBar() {
  const loc = useLocation();
  const active = navItems.find(n => n.path === loc.pathname) || navItems[0];
  return (
    <div className="octo-topbar">
      <span className="octo-topbar-title">
        <span>{active.icon}</span> {active.label}
      </span>
      <div className="octo-topbar-right">
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Live</span>
        <div className="octo-status-dot" />
      </div>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="octo-hero">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <RandomImage />
        <RandomImage />
        <div className="octo-hero-content">
          <p className="octo-hero-eyebrow">✦ Fitness Command Center</p>
          <h1 className="octo-hero-title">
            Welcome to<br /><span className="octo-accent">OctoFit Tracker</span>
          </h1>
          <p className="octo-hero-subtitle">
            Track activities, compete with your team, and dominate the leaderboard.
          </p>
          <div className="octo-hero-actions">
            <button className="btn octo-btn-primary" onClick={() => navigate('/users')}>
              Get Started →
            </button>
            <button className="btn octo-btn-outline" onClick={() => navigate('/leaderboard')}>
              View Leaderboard
            </button>
          </div>
          <div className="hero-stats">
            {featureCards.map(c => (
              <div className="hero-stat" key={c.path} onClick={() => navigate(c.path)} style={{ cursor: 'pointer' }}>
                <div className="hero-stat-val">{c.initials}</div>
                <div className="hero-stat-lbl">{c.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="octo-cards-section">
        <p className="section-title">Explore</p>
        <p className="section-sub">Everything you need to stay active and competitive.</p>
        <div className="row g-3">
          {featureCards.map(card => (
            <div className="col-12 col-sm-6 col-lg-4" key={card.initials}>
              <div className="octo-card" onClick={() => navigate(card.path)} role="button">
                <div className="octo-card-avatar">{card.initials}</div>
                <h5 className="octo-card-title">{card.title}</h5>
                <p className="octo-card-desc">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="octo-app">
      <Sidebar />
      <div className="octo-main">
        <TopBar />
        <Routes>
          <Route path="/"            element={<HomePage />}   />
          <Route path="/users"       element={<Users />}      />
          <Route path="/teams"       element={<Teams />}      />
          <Route path="/activities"  element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />}/>
          <Route path="/workouts"    element={<Workouts />}   />
        </Routes>
        <footer className="octo-footer">
          OctoFit Tracker — Mergington High School © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

export default App;
