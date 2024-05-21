function logout() {
  fetch("/logout")
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url; // Redirect to login page after logout
      }
    })
    .catch((error) => console.error("Error logging out:", error));
}
