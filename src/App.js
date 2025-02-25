import { renderLandingPage } from './pages/LandingPage.js';
import { renderLoginPage } from './pages/LoginPage.js';
import { renderUserDashboard } from './pages/UserDashboard.js';
import { renderQuoteGenerator } from './pages/QuoteGenerator.js';

let currentPage = 'landing';

export function setPage(page) {
  currentPage = page;
  render();
}

export function render() {
  const app = document.getElementById('app');
  app.innerHTML = ''; // Clear current content
  switch (currentPage) {
    case 'landing':
      renderQuoteGenerator();
      break;
    case 'login':
      renderLoginPage();
      break;
    case 'dashboard':
      renderUserDashboard();
      break;
    case 'quote':
      renderQuoteGenerator();
      break;
    default:
      renderQuoteGenerator();
  }
}