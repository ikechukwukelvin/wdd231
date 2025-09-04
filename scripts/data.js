// Function to get current year and set it in the span element
function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;
}

// Function to get last modified date and set it in the paragraph element
function setLastModified() {
    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = "Last modified: " + lastModified;
}

// Call the functions to set current year and last modified date when the page loads
window.onload = function() {
    setCurrentYear();
    setLastModified();
};