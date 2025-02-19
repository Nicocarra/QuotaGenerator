import { setPage } from '../App.js';

export function renderUserDashboard() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <header>
      <h1>User Dashboard</h1>
      <nav>
        <button id="logoutBtn">Logout</button>
      </nav>
    </header>
    <main>
      <section>
        <h2>Welcome!</h2>
        <p>Ready to create a quote? Click below.</p>
        <button id="createQuoteBtn">Create New Quote</button>
      </section>
    </main>
    <footer>
      <p>&copy; 2023 Quota Generator</p>
    </footer>
  `;

  document.getElementById('logoutBtn').addEventListener('click', () => {
    setPage('landing');
  });
  document.getElementById('createQuoteBtn').addEventListener('click', () => {
    setPage('quote');
  });
}