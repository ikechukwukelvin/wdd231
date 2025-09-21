 // Timestamp
    document.getElementById("timestamp").value = new Date().toISOString();

    // Modal handlers
    function openModal(id) {
      document.getElementById(id).style.display = "block";
    }
    function closeModal(id) {
      document.getElementById(id).style.display = "none";
    }

    // Animation on load
    window.addEventListener("load", () => {
      document.querySelectorAll(".animate").forEach((card, index) => {
        card.style.opacity = 0;
        setTimeout(() => {
          card.style.transition = "opacity 1s ease";
          card.style.opacity = 1;
        }, index * 400);
      });
    });
    
const params = new URLSearchParams(window.location.search);
    document.getElementById("firstName").textContent = params.get("firstName");
    document.getElementById("lastName").textContent = params.get("lastName");
    document.getElementById("email").textContent = params.get("email");
    document.getElementById("phone").textContent = params.get("phone");
    document.getElementById("organization").textContent = params.get("organization");
    document.getElementById("timestamp").textContent = params.get("timestamp");