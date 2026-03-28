import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'

export default function Agents() {
  const { token } = useAuth()
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.getAgents(token)
      .then(setAgents)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [token])

  const filtered = agents.filter(a =>
    a.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.category?.toLowerCase().includes(search.toLowerCase()) ||
    a.mandate?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <div className="search-header">
        <h1 className="page-title">Inventory</h1>
        <p className="page-subtitle">{agents.length} agents in the marketplace</p>
      </div>

      <input
        type="text"
        className="search-input filter-input"
        placeholder="Filter by name, category or mandate..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {loading && <div className="loading-state"><div className="pulse-ring" /><p>Loading agents...</p></div>}
      {error && <div className="error-banner">{error}</div>}

      <div className="agents-grid">
        {filtered.map((agent, i) => (
          <div
            key={i}
            className={`agent-card ${selected?.id === agent.id ? 'selected' : ''}`}
            onClick={() => setSelected(selected?.id === agent.id ? null : agent)}
          >
            <div className="agent-card-header">
              <span className="agent-name">{agent.name}</span>
              <span className={`status-dot ${agent.is_active ? 'active' : 'inactive'}`} />
            </div>
            <span className="agent-category">{agent.category}</span>
            {selected?.id === agent.id && (
              <div className="agent-mandate">
                <p>{agent.mandate}</p>
                <code className="agent-uuid">{agent.id}</code>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
