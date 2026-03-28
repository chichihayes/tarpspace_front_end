import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'

export default function History() {
  const { token } = useAuth()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getLogs(token)
      .then(setLogs)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [token])

  return (
    <div className="page">
      <div className="search-header">
        <h1 className="page-title">Search History</h1>
        <p className="page-subtitle">All your past searches</p>
      </div>

      {loading && <div className="loading-state"><div className="pulse-ring" /><p>Loading history...</p></div>}
      {error && <div className="error-banner">{error}</div>}

      {!loading && logs.length === 0 && (
        <div className="empty-state">
          <p>No searches yet. Go find your first match.</p>
        </div>
      )}

      <div className="history-list">
        {logs.map((log, i) => (
          <div key={i} className="history-item">
            <div className="history-query">"{log.query}"</div>
            <div className="history-meta">
              <span>{log.result_count} results</span>
              <span>{log.latency_ms}ms</span>
              <span>{new Date(log.created_at).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
