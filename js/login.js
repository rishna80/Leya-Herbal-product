/**
 * Sri Herbal Care - Login Page JavaScript
 * Local Storage authentication for admin
 */

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

document.addEventListener('DOMContentLoaded', () => {
  // Redirect if already logged in
  if (SHC.Auth.isLoggedIn()) {
    window.location.href = 'dashboard.html';
    return;
  }

  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');
  const forgotLink = document.getElementById('forgot-password');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = form.querySelector('#username').value.trim();
      const password = form.querySelector('#password').value;

      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        SHC.Auth.login();
        window.location.href = 'dashboard.html';
      } else {
        if (errorEl) {
          errorEl.textContent = 'Invalid username or password. Please try again.';
          errorEl.classList.add('show');
        }
        form.querySelector('#password').value = '';
      }
    });

    // Clear error on input
    form.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        if (errorEl) errorEl.classList.remove('show');
      });
    });
  }

  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      SHC.showPopup(
        'Forgot Password?',
        'Please contact the system administrator to reset your password. Default credentials: admin / admin123'
      );
    });
  }
});
