const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, completed: true },
  { code: "WDD231", name: "Front-end Web Development I", credits: 3, completed: false },
  { code: "CSE121b", name: "JavaScript Language", credits: 3, completed: true },
  { code: "CSE110", name: "Intro to Problem Solving", credits: 2, completed: true },
  { code: "CIT111", name: "Intro to Databases", credits: 3, completed: false },
];

const container = document.getElementById("courses-container");
const creditDisplay = document.getElementById("creditTotal");

function displayCourses(filter = "all") {
  container.innerHTML = "";

  const filtered = filter === "all"
    ? courses
    : courses.filter(c => c.code.startsWith(filter));

  filtered.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    card.classList.add(course.completed ? "completed" : "incomplete");

    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
    `;

    container.appendChild(card);
  });

  const totalCredits = filtered.reduce((total, c) => total + c.credits, 0);
  creditDisplay.textContent = totalCredits;
}

document.querySelectorAll(".filter-buttons button").forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    displayCourses(filter);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  displayCourses();
});
