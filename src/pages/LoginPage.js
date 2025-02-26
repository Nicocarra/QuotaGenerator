import { setPage } from '../App.js';

export function renderLoginPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <header>
      <h1>Login</h1>
    </header>
    <main>
      <form id="loginForm">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit">Login</button>
        <button type="signup">Sign Up</button>

      </form>
    </main>
    <footer>
      <p>&copy; 2023 Quota Generator</p>
    </footer>
  `;

  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'user' && password === 'pass') {
      setPage('dashboard');
    } else {
      alert('Invalid credentials');
    }
  });
}