(function () {
  "use strict";

  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  const loginView = document.getElementById("loginView");
  const successView = document.getElementById("successView");
  const successEmail = document.getElementById("successEmail");
  const logoutBtn = document.getElementById("logoutBtn");

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(input, errorEl, message) {
    if (message) {
      input.classList.add("input-error");
      errorEl.textContent = message;
    } else {
      input.classList.remove("input-error");
      errorEl.textContent = "";
    }
  }

  function validate() {
    let valid = true;
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email) {
      setError(emailInput, emailError, "Email is required.");
      valid = false;
    } else if (!EMAIL_RE.test(email)) {
      setError(emailInput, emailError, "Enter a valid email address.");
      valid = false;
    } else {
      setError(emailInput, emailError, "");
    }

    if (!password) {
      setError(passwordInput, passwordError, "Password is required.");
      valid = false;
    } else if (password.length < 6) {
      setError(passwordInput, passwordError, "Password must be at least 6 characters.");
      valid = false;
    } else {
      setError(passwordInput, passwordError, "");
    }

    return { valid, email };
  }

  emailInput.addEventListener("input", () => {
    if (emailInput.classList.contains("input-error")) {
      validate();
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.classList.contains("input-error")) {
      validate();
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const result = validate();
    if (!result.valid) return;

    loginView.classList.add("hidden");
    successView.classList.remove("hidden");
    successView.setAttribute("aria-hidden", "false");
    successEmail.textContent = "Signed in as " + result.email;
    passwordInput.value = "";
  });

  logoutBtn.addEventListener("click", function () {
    successView.classList.add("hidden");
    successView.setAttribute("aria-hidden", "true");
    loginView.classList.remove("hidden");
    emailInput.value = "";
    emailInput.focus();
  });
})();
