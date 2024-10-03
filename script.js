let currentPage = 1;
let issuesList = document.getElementById("issues-list");
let pageNumber = document.getElementById("page-number");
let loadNextBtn = document.getElementById("load_next");
let loadPrevBtn = document.getElementById("load_prev");

async function fetchAndDisplayIssues(page) {
    const url = `https://api.github.com/repositories/1296269/issues?page=${page}&per_page=5`;

    try {
        const response = await fetch(url);
        const issues = await response.json();

        // Clear the previous issues
        issuesList.innerHTML = "";

        // Display the current page number
        pageNumber.textContent = `Page ${page}`;

        // Check if there are issues and display them
        if (issues.length > 0) {
            issues.forEach(issue => {
                const li = document.createElement("li");
                li.textContent = issue.title;
                issuesList.appendChild(li);
            });

            // Enable the Next button if there are issues on this page
            loadNextBtn.disabled = false;
        } else {
            // If no issues are returned, disable the Next button
            issuesList.innerHTML = "<li>No more issues to display</li>";
            loadNextBtn.disabled = true;
        }

        // Enable or disable the Previous button based on the current page
        loadPrevBtn.disabled = page === 1;

    } catch (error) {
        console.error("Error fetching issues:", error);
        issuesList.innerHTML = "<li>Error loading issues</li>";
    }
}

// Load the initial page
fetchAndDisplayIssues(currentPage);

// Event listener for the "Next" button
loadNextBtn.addEventListener("click", () => {
    currentPage++;
    fetchAndDisplayIssues(currentPage);
});

// Event listener for the "Previous" button
loadPrevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchAndDisplayIssues(currentPage);
    }
});
