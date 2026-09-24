function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard">

      <nav className="dashboard-nav">

        <div className="dashboard-logo">
          Stream<span>Flix</span>
        </div>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>

      </nav>

      <main className="dashboard-content">

        <h1>
          Welcome, {user.name}!
        </h1>

        <p className="dashboard-email">
          You are successfully logged in with:
          <strong> {user.email}</strong>
        </p>

        <div className="welcome-card">

          <h2>Your Streaming Dashboard</h2>

          <p>
            Explore movies, series and entertainment
            from your personalized StreamFlix dashboard.
          </p>

          <div className="movie-grid">

            <div className="movie-card">
              <div className="movie-image movie-one">
                ▶
              </div>
              <h3>Featured Movie</h3>
              <p>Adventure</p>
            </div>

            <div className="movie-card">
              <div className="movie-image movie-two">
                ▶
              </div>
              <h3>Popular Series</h3>
              <p>Drama</p>
            </div>

            <div className="movie-card">
              <div className="movie-image movie-three">
                ▶
              </div>
              <h3>Trending Now</h3>
              <p>Action</p>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;