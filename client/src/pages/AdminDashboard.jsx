import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Edit, 
  Plus, 
  LogOut, 
  MessageSquare, 
  Briefcase, 
  FolderGit2, 
  ArrowLeft,
  X
} from 'lucide-react';
import Cursor from '../components/Cursor';

export default function AdminDashboard() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [username, setUsername] = useState(localStorage.getItem('adminUsername') || '');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('messages');
  
  // Data lists
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  
  // Modals state
  const [projectModal, setProjectModal] = useState({ open: false, mode: 'create', data: null });
  const [experienceModal, setExperienceModal] = useState({ open: false, mode: 'create', data: null });
  
  // Forms state
  const [projectForm, setProjectForm] = useState({
    title: '',
    tags: '',
    category: '',
    description: '',
    link: '#',
    order: 0
  });
  
  const [experienceForm, setExperienceForm] = useState({
    companyId: '',
    period: '',
    company: '',
    role: '',
    teamInfo: '',
    location: '',
    description: '',
    achievements: '',
    order: 0
  });

  const navigate = useNavigate();

  // Load dashboard data if logged in
  useEffect(() => {
    if (!token) return;

    // Fetch messages
    fetch('/api/admin/messages', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) handleLogout();
        return res.json();
      })
      .then(data => Array.isArray(data) && setMessages(data))
      .catch(err => console.error(err));

    // Fetch projects
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setProjects(data))
      .catch(err => console.error(err));

    // Fetch experiences
    fetch('/api/experiences')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setExperiences(data))
      .catch(err => console.error(err));
  }, [token]);

  const handleLoginChange = (e) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    
    fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Invalid login credentials');
        return res.json();
      })
      .then(data => {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUsername', data.username);
        setToken(data.token);
        setUsername(data.username);
      })
      .catch(err => {
        setLoginError(err.message);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    setToken('');
    setUsername('');
  };

  /* ── MESSAGE CRUD ── */
  const deleteMessage = (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    
    fetch(`/api/admin/messages/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(() => {
        setMessages(prev => prev.filter(m => m._id !== id));
      })
      .catch(err => console.error(err));
  };

  /* ── PROJECT CRUD ── */
  const openProjectModal = (mode, data = null) => {
    if (mode === 'edit' && data) {
      setProjectForm({
        title: data.title,
        tags: data.tags.join(', '),
        category: data.category,
        description: data.description,
        link: data.link,
        order: data.order
      });
    } else {
      setProjectForm({
        title: '',
        tags: '',
        category: '',
        description: '',
        link: '#',
        order: projects.length + 1
      });
    }
    setProjectModal({ open: true, mode, data });
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...projectForm,
      tags: projectForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      order: Number(projectForm.order)
    };

    const url = projectModal.mode === 'create' 
      ? '/api/admin/projects' 
      : `/api/admin/projects/${projectModal.data._id}`;
      
    const method = projectModal.mode === 'create' ? 'POST' : 'PUT';

    fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to save project');
        return res.json();
      })
      .then(saved => {
        if (projectModal.mode === 'create') {
          setProjects(prev => [...prev, saved].sort((a, b) => a.order - b.order));
        } else {
          setProjects(prev => prev.map(p => p._id === saved._id ? saved : p).sort((a, b) => a.order - b.order));
        }
        setProjectModal({ open: false, mode: 'create', data: null });
      })
      .catch(err => alert(err.message));
  };

  const deleteProject = (id) => {
    if (!window.confirm('Delete this project?')) return;

    fetch(`/api/admin/projects/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(() => {
        setProjects(prev => prev.filter(p => p._id !== id));
      })
      .catch(err => console.error(err));
  };

  /* ── EXPERIENCE CRUD ── */
  const openExperienceModal = (mode, data = null) => {
    if (mode === 'edit' && data) {
      setExperienceForm({
        companyId: data.companyId,
        period: data.period,
        company: data.company,
        role: data.role,
        teamInfo: data.teamInfo,
        location: data.location,
        description: data.description,
        achievements: data.achievements.join('\n'),
        order: data.order
      });
    } else {
      setExperienceForm({
        companyId: '',
        period: '',
        company: '',
        role: '',
        teamInfo: '',
        location: '',
        description: '',
        achievements: '',
        order: experiences.length + 1
      });
    }
    setExperienceModal({ open: true, mode, data });
  };

  const handleExperienceSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...experienceForm,
      achievements: experienceForm.achievements.split('\n').map(a => a.trim()).filter(Boolean),
      order: Number(experienceForm.order)
    };

    const url = experienceModal.mode === 'create' 
      ? '/api/admin/experiences' 
      : `/api/admin/experiences/${experienceModal.data._id}`;
      
    const method = experienceModal.mode === 'create' ? 'POST' : 'PUT';

    fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to save experience');
        return res.json();
      })
      .then(saved => {
        if (experienceModal.mode === 'create') {
          setExperiences(prev => [...prev, saved].sort((a, b) => a.order - b.order));
        } else {
          setExperiences(prev => prev.map(exp => exp._id === saved._id ? saved : exp).sort((a, b) => a.order - b.order));
        }
        setExperienceModal({ open: false, mode: 'create', data: null });
      })
      .catch(err => alert(err.message));
  };

  const deleteExperience = (id) => {
    if (!window.confirm('Delete this experience timeline?')) return;

    fetch(`/api/admin/experiences/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(() => {
        setExperiences(prev => prev.filter(exp => exp._id !== id));
      })
      .catch(err => console.error(err));
  };

  // Render Login Card if unauthenticated
  if (!token) {
    return (
      <div className="admin-login-container">
        <Cursor />
        <div className="admin-login-card">
          <button 
            onClick={() => navigate('/')} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--muted)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontFamily: 'JetBrains Mono',
              fontSize: '11px',
              marginBottom: '20px',
              padding: '0'
            }}
          >
            <ArrowLeft size={14} /> Back to site
          </button>
          <h2>Admin Login</h2>
          <p>AUTHENTICATION REQUIRED</p>
          
          <form onSubmit={handleLoginSubmit} className="cform" style={{ gap: '16px' }}>
            <div className="fg">
              <label>Username</label>
              <input 
                type="text" 
                name="username" 
                value={loginData.username} 
                onChange={handleLoginChange} 
                placeholder="admin"
                required
              />
            </div>
            <div className="fg">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                value={loginData.password} 
                onChange={handleLoginChange} 
                placeholder="••••••••"
                required
              />
            </div>
            
            {loginError && (
              <p style={{ color: '#ff6b6b', fontFamily: 'JetBrains Mono', fontSize: '12px', margin: '4px 0 0' }}>
                {loginError}
              </p>
            )}
            
            <button type="submit" className="fsub" style={{ marginTop: '10px' }}>
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Cursor />
      
      {/* Admin Header */}
      <div className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate('/')} 
            className="admin-edit-btn"
            style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={14} /> View Site
          </button>
          <div className="admin-title">
            My<span>.</span>Console
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--muted)' }}>
            Logged in as <strong style={{ color: 'var(--accent)' }}>{username}</strong>
          </span>
          <button onClick={handleLogout} className="admin-logout-btn">
            <LogOut size={13} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Logout
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          <MessageSquare size={13} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> 
          Messages ({messages.length})
        </button>
        <button 
          className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <FolderGit2 size={13} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> 
          Projects ({projects.length})
        </button>
        <button 
          className={`admin-tab ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          <Briefcase size={13} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> 
          Experiences ({experiences.length})
        </button>
      </div>

      {/* Messages Tab Content */}
      {activeTab === 'messages' && (
        <div>
          <div className="admin-content-header">
            <h3>Contact Submissions</h3>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--muted)' }}>
              Most recent first
            </span>
          </div>
          
          {messages.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono' }}>
              No messages received yet.
            </div>
          ) : (
            messages.map(msg => (
              <div className="msg-card" key={msg._id}>
                <div className="msg-meta">
                  <span className="date">{new Date(msg.createdAt).toLocaleString()}</span>
                  <button 
                    onClick={() => deleteMessage(msg._id)} 
                    className="admin-delete-btn"
                    style={{ padding: '4px 8px' }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="msg-sender">
                  {msg.name} <span>&lt;{msg.email}&gt;</span>
                </div>
                {msg.subject && <div className="msg-sub">Subject: {msg.subject}</div>}
                <div className="msg-body">{msg.message}</div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Projects Tab Content */}
      {activeTab === 'projects' && (
        <div>
          <div className="admin-content-header">
            <h3>Manage Projects</h3>
            <button className="admin-add-btn" onClick={() => openProjectModal('create')}>
              <Plus size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Add Project
            </button>
          </div>
          
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Order</th>
                  <th>Title</th>
                  <th>Tags</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project._id}>
                    <td>{project.order}</td>
                    <td className="title">{project.title}</td>
                    <td>{project.tags.join(', ')}</td>
                    <td>{project.category || 'NORMAL'}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="admin-edit-btn" onClick={() => openProjectModal('edit', project)}>
                          <Edit size={12} /> Edit
                        </button>
                        <button className="admin-delete-btn" onClick={() => deleteProject(project._id)}>
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Experiences Tab Content */}
      {activeTab === 'experience' && (
        <div>
          <div className="admin-content-header">
            <h3>Manage Experiences</h3>
            <button className="admin-add-btn" onClick={() => openExperienceModal('create')}>
              <Plus size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Add Experience
            </button>
          </div>
          
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Order</th>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Period</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map(exp => (
                  <tr key={exp._id}>
                    <td>{exp.order}</td>
                    <td className="title">{exp.company}</td>
                    <td>{exp.role}</td>
                    <td>{exp.period}</td>
                    <td>{exp.location}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="admin-edit-btn" onClick={() => openExperienceModal('edit', exp)}>
                          <Edit size={12} /> Edit
                        </button>
                        <button className="admin-delete-btn" onClick={() => deleteExperience(exp._id)}>
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Project Creation/Edit Modal */}
      {projectModal.open && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3>{projectModal.mode === 'create' ? 'Add New Project' : 'Edit Project'}</h3>
              <button 
                onClick={() => setProjectModal({ open: false, mode: 'create', data: null })}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleProjectSubmit} className="cform">
              <div className="fg">
                <label>Project Title</label>
                <input 
                  type="text" 
                  value={projectForm.title}
                  onChange={e => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                  required 
                />
              </div>
              <div className="form-group-grid">
                <div className="fg">
                  <label>Category (e.g. FEATURED)</label>
                  <select 
                    value={projectForm.category}
                    onChange={e => setProjectForm(prev => ({ ...prev, category: e.target.value }))}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      padding: '13px 16px',
                      color: 'var(--text)',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '12.5px',
                      outline: 'none'
                    }}
                  >
                    <option value="NORMAL">NORMAL</option>
                    <option value="FEATURED">FEATURED</option>
                  </select>
                </div>
                <div className="fg">
                  <label>Order Index</label>
                  <input 
                    type="number" 
                    value={projectForm.order}
                    onChange={e => setProjectForm(prev => ({ ...prev, order: e.target.value }))}
                    required 
                  />
                </div>
              </div>
              <div className="fg">
                <label>Tags (Comma separated)</label>
                <input 
                  type="text" 
                  value={projectForm.tags}
                  onChange={e => setProjectForm(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="React, Next.js, Node.js"
                  required 
                />
              </div>
              <div className="fg">
                <label>Link</label>
                <input 
                  type="text" 
                  value={projectForm.link}
                  onChange={e => setProjectForm(prev => ({ ...prev, link: e.target.value }))}
                  required 
                />
              </div>
              <div className="fg">
                <label>Description</label>
                <textarea 
                  value={projectForm.description}
                  onChange={e => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                  required 
                  style={{ height: '120px' }}
                />
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="modal-cancel-btn"
                  onClick={() => setProjectModal({ open: false, mode: 'create', data: null })}
                >
                  Cancel
                </button>
                <button type="submit" className="fsub" style={{ width: 'auto', padding: '12px 30px' }}>
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Experience Creation/Edit Modal */}
      {experienceModal.open && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3>{experienceModal.mode === 'create' ? 'Add New Experience' : 'Edit Experience'}</h3>
              <button 
                onClick={() => setExperienceModal({ open: false, mode: 'create', data: null })}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleExperienceSubmit} className="cform">
              <div className="form-group-grid">
                <div className="fg">
                  <label>Company ID (e.g. vercel)</label>
                  <input 
                    type="text" 
                    value={experienceForm.companyId}
                    onChange={e => setExperienceForm(prev => ({ ...prev, companyId: e.target.value }))}
                    placeholder="lowercase-only"
                    required 
                    disabled={experienceModal.mode === 'edit'}
                  />
                </div>
                <div className="fg">
                  <label>Company Name</label>
                  <input 
                    type="text" 
                    value={experienceForm.company}
                    onChange={e => setExperienceForm(prev => ({ ...prev, company: e.target.value }))}
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group-grid">
                <div className="fg">
                  <label>Role</label>
                  <input 
                    type="text" 
                    value={experienceForm.role}
                    onChange={e => setExperienceForm(prev => ({ ...prev, role: e.target.value }))}
                    required 
                  />
                </div>
                <div className="fg">
                  <label>Period (e.g., 2022 — Present)</label>
                  <input 
                    type="text" 
                    value={experienceForm.period}
                    onChange={e => setExperienceForm(prev => ({ ...prev, period: e.target.value }))}
                    required 
                  />
                </div>
              </div>

              <div className="form-group-grid">
                <div className="fg">
                  <label>Team/Reporting details</label>
                  <input 
                    type="text" 
                    value={experienceForm.teamInfo}
                    onChange={e => setExperienceForm(prev => ({ ...prev, teamInfo: e.target.value }))}
                    placeholder="Team: 12 · Reports to VP"
                  />
                </div>
                <div className="fg">
                  <label>Location (e.g. London / Remote)</label>
                  <input 
                    type="text" 
                    value={experienceForm.location}
                    onChange={e => setExperienceForm(prev => ({ ...prev, location: e.target.value }))}
                    required 
                  />
                </div>
              </div>

              <div className="form-group-grid">
                <div className="fg">
                  <label>Order Index</label>
                  <input 
                    type="number" 
                    value={experienceForm.order}
                    onChange={e => setExperienceForm(prev => ({ ...prev, order: e.target.value }))}
                    required 
                  />
                </div>
              </div>

              <div className="fg">
                <label>Role Overview Description</label>
                <textarea 
                  value={experienceForm.description}
                  onChange={e => setExperienceForm(prev => ({ ...prev, description: e.target.value }))}
                  required 
                  style={{ height: '80px' }}
                />
              </div>

              <div className="fg">
                <label>Achievements (One per line)</label>
                <textarea 
                  value={experienceForm.achievements}
                  onChange={e => setExperienceForm(prev => ({ ...prev, achievements: e.target.value }))}
                  placeholder="Reduced cold start latency 60%&#10;Mentored 4 junior engineers"
                  required 
                  style={{ height: '120px' }}
                />
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="modal-cancel-btn"
                  onClick={() => setExperienceModal({ open: false, mode: 'create', data: null })}
                >
                  Cancel
                </button>
                <button type="submit" className="fsub" style={{ width: 'auto', padding: '12px 30px' }}>
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
