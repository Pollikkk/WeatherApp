export function LoadingState() {
  return (
    <div className="loading-state">
      <p className="loading">Loading...</p>
      <div className="spinner" />
    </div>
  )
}

export function ErrorState() {
  return (
    <div className="error-state" data-testid="error">
      <p className="loading">Error in response</p>
    </div>
  )
}