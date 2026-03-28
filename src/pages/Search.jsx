import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'

export default function Search() {
  const { token } = useAuth()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setResults(null)
    try {
      const data = await api.match(query, token)
      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const matches = results?.results?.filter(r => r.match) || []
  const notMatches = results?.results?.filter(r => r.match === false) || []

  return (
    <div className="page">
      <div className="search-header">
        <h1 className="page-title">Find Your Match</h1>
        <p className="page-subtitle">Describe what you need in plain English</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrap">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="e.g. I need a React developer for a fintech project..."
            className="search-input"
          />
          <button type="submit" className="btn-primary search-btn" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Search'}
          </button>
        </div>
      </form>

      {error && <div className="error-banner">{error}</div>}

      {loading && (
        <div className="loading-state">
          <div className="pulse-ring" />
          <p>Finding your best matches...</p>
        </div>
      )}

      {results && (
        <div className="results-wrap">
          <div className="results-meta">
            <span>Search ID: <code>{results.search_run_id?.slice(0, 8)}...</code></span>
            <span>Latency: <code>{results.latency_ms}ms</code></span>
          </div>

          {matches.length > 0 && (
            <div className="results-section">
              <h2 className="section-title match">
                <span className="dot green" />
                Matches ({matches.length})
              </h2>
              <div className="cards">
                {matches.map((r, i) => (
                  <div key={i} className="result-card match-card">
                    <div className="card-header">
                      <span className="agent-id">{r.id?.slice(0, 8)}</span>
                      <span className="score-badge">{(r.score * 100).toFixed(0)}% match</span>
                    </div>
                    <p className="card-reason">{r.reason}</p>
                    {r.caveat && (
                      <div className="card-caveat">
                        <span className="caveat-label">Note</span>
                        <span>{r.caveat}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {notMatches.length > 0 && (
            <div className="results-section">
              <h2 className="section-title no-match">
                <span className="dot red" />
                Not a Match ({notMatches.length})
              </h2>
              <div className="cards">
                {notMatches.map((r, i) => (
                  <div key={i} className="result-card no-match-card">
                    <div className="card-header">
                      <span className="agent-id">{r.id?.slice(0, 8)}</span>
                    </div>
                    <p className="card-reason">{r.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
