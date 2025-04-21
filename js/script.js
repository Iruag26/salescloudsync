const apiURL = "http://localhost:5000/api/leads";

// Detect page and run logic accordingly
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.includes("index.html")) {
    const form = document.getElementById("leadForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const status = document.getElementById("status").value;
      const notes = document.getElementById("notes").value.trim();

      if (!name || !email) return alert("Name and email are required.");

      try {
        const res = await fetch(apiURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, status, notes })
        });

        const data = await res.json();
        alert("Lead added!");
        form.reset();
      } catch (err) {
        alert("Failed to add lead.");
      }
    });
  }

  if (path.includes("leads.html")) {
    fetch(apiURL)
      .then(res => res.json())
      .then(leads => {
        const tableBody = document.getElementById("leadTableBody");
        tableBody.innerHTML = leads.map(lead => `
          <tr>
            <td>${lead.name}</td>
            <td>${lead.email}</td>
            <td>${lead.status}</td>
            <td>${lead.notes}</td>
          </tr>
        `).join("");
      })
      .catch(() => alert("Failed to fetch leads."));
  }
});
