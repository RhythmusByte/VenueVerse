document.getElementById("login-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const loginErrorElement = document.getElementById("login-error");
        if (!response.ok) {
          const result = await response.json();
          loginErrorElement.textContent = result.error;
        } else {
          loginErrorElement.textContent = "";
          window.location.href = "/mainpage/index.html";
        }
      } catch (error) {
        console.error("Error during login:", error);
        document.getElementById("login-error").textContent = "An unexpected error occurred.";
      }
    });
