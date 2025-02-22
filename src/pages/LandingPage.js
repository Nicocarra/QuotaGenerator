import { setPage } from '../App.js';

export function renderLandingPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <header>
      <h1>Quota Generator</h1>
      <nav>
        <button class="topMenu">Features</button>
        <button class="topMenu">Support</button>
        <button class="topMenu">Pricing</button>
        <button class="navButton">Login</button>
        <button class="navButton">Sign Up</button>
      </nav>
    </header>
    <main>
      <section class="hero">
        <h2>Fast Quotes for Busy Professionals</h2>
        <p>Create detailed quotes in minutes and impress your clients.</p>
        <button id="getStartedBtn">Get Started</button>
      </section>
      <section class="hero">
        <h2>Fast Quotes for Busy Professionals</h2>
        <p>Create detailed quotes in minutes and impress your clients.</p>
        <button id="getStartedBtn">Get Started</button>
      </section>
      <section class="hero">
        <h2>Fast Quotes for Busy Professionals</h2>
        <p>Create detailed quotes in minutes and impress your clients.</p>
        <button id="getStartedBtn">Get Started</button>
      </section>
    </main>
    <footer>
      <p>&copy; 2023 Quota Generator</p>
    </footer>
  `;

  document.getElementById('loginBtn').addEventListener('click', () => {
    setPage('login');
  });
  document.getElementById('signupBtn').addEventListener('click', () => {
    alert('Sign Up & Purchase coming soon!');
  });
  document.getElementById('getStartedBtn').addEventListener('click', () => {
    setPage('login');
  });
}