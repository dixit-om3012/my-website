// Handle mobile navigation toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("nav-open");
    });

    // Close nav on link click (mobile)
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("nav-open");
      });
    });
  }

  // Set current year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Form validation
  const form = document.getElementById("applyForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const fields = [
        { id: "fullName", required: true },
        { id: "phone", required: true, type: "phone" },
        { id: "email", required: true, type: "email" },
        { id: "state", required: true, type: "select" },
        { id: "city", required: true },
        { id: "pincode", required: true, type: "pincode" },
        { id: "company", required: true, type: "select" },
        { id: "investmentRange", required: true, type: "select" }
      ];

      let isValid = true;

      const clearError = (fieldId) => {
        const input = document.getElementById(fieldId);
        const errorEl = document.querySelector(`[data-error-for="${fieldId}"]`);
        if (input) {
          input.classList.remove("error");
        }
        if (errorEl) {
          errorEl.textContent = "";
        }
      };

      const setError = (fieldId, message) => {
        const input = document.getElementById(fieldId);
        const errorEl = document.querySelector(`[data-error-for="${fieldId}"]`);
        if (input) {
          input.classList.add("error");
        }
        if (errorEl) {
          errorEl.textContent = message;
        }
        isValid = false;
      };

      // Clear previous errors
      fields.forEach((field) => clearError(field.id));

      // Validate fields
      fields.forEach((field) => {
        const input = document.getElementById(field.id);
        if (!input) return;

        const value = input.value.trim();

        if (field.required && !value) {
          setError(field.id, "This field is required.");
          return;
        }

        if (field.type === "email" && value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            setError(field.id, "Please enter a valid email address.");
          }
        }

        if (field.type === "phone" && value) {
          const phoneDigits = value.replace(/\D/g, "");
          if (phoneDigits.length !== 10) {
            setError(field.id, "Please enter a valid 10-digit phone number.");
          }
        }

        if (field.type === "pincode" && value) {
          const pincodeDigits = value.replace(/\D/g, "");
          if (pincodeDigits.length !== 6) {
            setError(field.id, "Please enter a valid 6-digit pincode.");
          }
        }

        if (field.type === "select" && value === "") {
          setError(field.id, "Please select an option.");
        }
      });

      if (!isValid) {
        return;
      }

      // If valid, show alert and reset form
      alert("Form submitted successfully");
      form.reset();
    });
  }
});

