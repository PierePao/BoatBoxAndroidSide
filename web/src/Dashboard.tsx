

import './Dashboard.css';
import OpenStreetMapContainer from './OpenStreetMapContainer';




const mockMessages = [
  { boatBoxId: 'BBX-002', time: '2025-07-13 21:45', location: '14.6000° N, 120.9850° E', status: 'OK' },
  { boatBoxId: 'BBX-001', time: '2025-07-13 22:00', location: '14.5995° N, 120.9842° E', status: 'OK' },
  { boatBoxId: 'BBX-001', time: '2025-07-13 21:55', location: '14.5990° N, 120.9840° E', status: 'OK' },
  { boatBoxId: 'BBX-001', time: '2025-07-13 21:50', location: '14.5985° N, 120.9838° E', status: 'OK' },
];



export default function Dashboard() {
  return (
    <div className="dashboard-layout" style={{ background: 'linear-gradient(135deg, #0a2342 0%, #19376d 100%)', height: '100vh', display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
      <aside className="sidebar" style={{ background: 'linear-gradient(180deg, #19376d 0%, #0a2342 100%)', color: '#fff', minWidth: '160px', maxWidth: '200px', width: '10vw', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <div className="sidebar-header" style={{ fontWeight: 'bold', fontSize: '1.7rem', color: '#fff', letterSpacing: '2px' }}>
          BoatBox
          <div style={{ fontWeight: 'normal', fontSize: '1rem', color: '#b3b8e0', marginTop: '0.2rem' }}>Municipality of What the Helly</div>
        </div>
        <nav className="sidebar-nav">
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li className="active" style={{ background: '#25406d', color: '#fff', borderRadius: '0.5rem', margin: '0.5rem 0', padding: '0.5rem 1rem', fontWeight: 'bold' }}>Dashboard</li>
            <li style={{ background: '#e0e7ef', color: '#25406d', borderRadius: '0.5rem', margin: '0.5rem 0', padding: '0.5rem 1rem' }}>Tracking</li>
            <li style={{ background: '#e0e7ef', color: '#25406d', borderRadius: '0.5rem', margin: '0.5rem 0', padding: '0.5rem 1rem' }}>Messages</li>
            <li style={{ background: '#e0e7ef', color: '#25406d', borderRadius: '0.5rem', margin: '0.5rem 0', padding: '0.5rem 1rem' }}>Settings</li>
          </ul>
        </nav>
        <div className="sidebar-footer" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}>
          <button style={{ background: '#25406d', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1rem', fontWeight: 'bold', cursor: 'pointer' }}>Help</button>
          <button style={{ background: '#0a2342', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1rem', fontWeight: 'bold', cursor: 'pointer' }}>Log Out</button>
        </div>
      </aside>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', minWidth: 0, height: '100vh', overflow: 'hidden', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
        <main className="main-content" style={{ background: '#fff', borderRadius: '1.5rem', margin: '0 0 0 2rem', padding: '2rem', boxShadow: '0 2px 16px #0001', flex: '0 1 950px', overflow: 'auto', maxHeight: '800px', minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', maxWidth: '950px', minWidth: '350px', alignSelf: 'center' }}>

          {/* ...existing dashboard content... */}
          <header className="main-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(25,55,109,0.95)', color: '#fff', borderRadius: '1rem', padding: '1.2rem 2rem', margin: '0 0 1.5rem 0', boxShadow: '0 2px 8px #0002', minHeight: '70px' }}>
            <h1 style={{ margin: 0, color: '#fff' }}>Boat Box </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input className="search-bar" placeholder="Search..." style={{ borderRadius: '0.5rem', border: '1px solid #25406d', padding: '0.5rem 1rem', fontSize: '1rem', outline: 'none', background: '#e0e7ef', color: '#25406d' }} />
              <div className="user-info" style={{ background: '#0a2342', color: '#fff', borderRadius: '0.5rem', padding: '0.5rem 1rem', fontWeight: 'bold' }}>Seafarer</div>
            </div>
          </header>
          <section className="stats-grid" style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
            <div className="stat-card" style={{ background: 'rgba(255,255,255,0.95)', color: '#19376d', borderRadius: '1rem', padding: '1.5rem', flex: 1, boxShadow: '0 2px 8px #0002' }}>
              <div className="stat-title" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Status</div>
              <div className="stat-value status-ok" style={{ color: '#25406d', fontWeight: 'bold', fontSize: '2rem' }}>OK</div>
              <div className="stat-desc">Device is online</div>
            </div>
            <div className="stat-card" style={{ background: 'rgba(255,255,255,0.95)', color: '#19376d', borderRadius: '1rem', padding: '1.5rem', flex: 1, boxShadow: '0 2px 8px #0002' }}>
              <div className="stat-title" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Last Location</div>
              <div className="stat-value" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>14.5995° N, 120.9842° E</div>
              <div className="stat-desc">Updated 2 mins ago</div>
            </div>
            <div className="stat-card" style={{ background: 'rgba(255,255,255,0.95)', color: '#19376d', borderRadius: '1rem', padding: '1.5rem', flex: 1, boxShadow: '0 2px 8px #0002' }}>
              <div className="stat-title" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Last Message</div>
              <div className="stat-value" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>2025-07-13 22:00</div>
              <div className="stat-desc">No issues reported</div>
            </div>
          </section>
          <section className="messages-section" style={{ background: 'rgba(255,255,255,0.97)', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 8px #0002', minHeight: '300px', height: 'auto' }}>
            <h2 style={{ color: '#19376d' }}>Recent Messages</h2>
            <table className="messages-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ color: '#19376d', textAlign: 'left', padding: '0.5rem' }}>BoatBox ID</th>
                  <th style={{ color: '#19376d', textAlign: 'left', padding: '0.5rem' }}>Time</th>
                  <th style={{ color: '#19376d', textAlign: 'left', padding: '0.5rem' }}>Location</th>
                  <th style={{ color: '#19376d', textAlign: 'left', padding: '0.5rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockMessages.map((msg, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: '0.5rem', color: '#19376d' }}>{msg.boatBoxId}</td>
                    <td style={{ padding: '0.5rem', color: '#19376d' }}>{msg.time}</td>
                    <td style={{ padding: '0.5rem', color: '#19376d' }}>{msg.location}</td>
                    <td style={{ padding: '0.5rem', color: msg.status === 'OK' ? '#27ae60' : '#e74c3c', fontWeight: 'bold' }}>{msg.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0, height: '100%' }}>
          <div className="map-container" style={{ height: '100%', width: '800px', background: '#e0e7ef', borderRadius: '1.5rem', boxShadow: '0 2px 16px #0001', overflow: 'hidden', display: 'flex', padding: 0, margin: 0 }}>
            <OpenStreetMapContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

