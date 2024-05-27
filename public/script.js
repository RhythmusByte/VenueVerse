document.getElementById("signup-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const signupErrorElement = document.getElementById("signup-error");
        if (!response.ok) {
          const result = await response.json();
          signupErrorElement.textContent = result.error;
        } else {
          signupErrorElement.textContent = "";
          window.location.href = "index.html";
        }
      } catch (error) {
        console.error("Error during signup:", error);
        document.getElementById("signup-error").textContent = "An unexpected error occurred.";
      }
    });
