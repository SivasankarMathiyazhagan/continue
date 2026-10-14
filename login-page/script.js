document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const error = document.getElementById("error");

  if (!form.email.validity.valid) {
    error.textContent = "Please enter a valid email address.";
    return form.email.focus();
  }
  if (!form.password.validity.valid) {
    error.textContent = "Password must be at least 8 characters.";
    return form.password.focus();
  }
  error.textContent = "";
  // TODO: send credentials to your backend over HTTPS, e.g. fetch("/api/login", ...)
});
