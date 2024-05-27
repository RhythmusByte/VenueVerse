document
        .getElementById("signup-form")
        .addEventListener("submit", async (event) => {
          event.preventDefault();
          const form = event.target;
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());

          const response = await fetch("/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();
          const signupErrorElement = document.getElementById("signup-error");
          if (response.status !== 201) {
            signupErrorElement.textContent = result.error;
          } else {
            signupErrorElement.textContent = "";
            window.location.href = "index.html";
          }
        });
