//your code here
let currentPage = 1;

const issuesList = document.getElementById("issues-list");
const pageNumber = document.getElementById("page-number");
const loadNextBtn = document.getElementById("load_next");
const loadPrevBtn = document.getElementById("load_prev");

// Function to fetch and display issues for the given page
async function fetchAndDisplayIssues(page) {
    const url = `https://api.github.com/repositories/1296269/issues?page=${page}&per_page=5`;

    try {
        const response = await fetch(url);
        const issues = await response.json();

        // Clear the previous issues
        issuesList.innerHTML = "";

        // Display the current page number
        pageNumber.textContent = `Page ${page}`;

        // If there are issues, populate the list
        if (issues.length > 0) {
            issues.forEach(issue => {
                const li = document.createElement("li");
                li.textContent = issue.title;
                issuesList.appendChild(li);
            });
        } else {
            issuesList.innerHTML = "<li>No issues found</li>";
        }

        // Enable/Disable Previous button
        loadPrevBtn.disabled = page === 1;
    } catch (error) {
        console.error("Error fetching issues:", error);
        issuesList.innerHTML = "<li>Error loading issues</li>";
    }
}

// Load initial issues on page load
fetchAndDisplayIssues(currentPage);

// Event listener for Next button
loadNextBtn.addEventListener("click", () => {
    currentPage++;
    fetchAndDisplayIssues(currentPage);
});

// Event listener for Previous button
loadPrevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchAndDisplayIssues(currentPage);
    }
});
