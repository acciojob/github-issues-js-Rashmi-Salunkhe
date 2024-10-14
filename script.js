//your code here
let currentPage = 1;

        function fetchIssues(pageNumber) {
            const url = `https://api.github.com/repositories/1296269/issues?page=${pageNumber}&per_page=5`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const issuesList = document.getElementById('issuesList');
                    issuesList.innerHTML = ''; // Clear previous issues

                    data.forEach(issue => {
                        const listItem = document.createElement('li');
                        listItem.textContent = issue.title;
                        issuesList.appendChild(listItem);
                    });
                })
                .catch(error => console.error('Error fetching issues:', error));
        }

        // Initial fetch on page load
        fetchIssues(currentPage);

        // Event listener for loading next page
        document.getElementById('load_next').addEventListener('click', () => {
            currentPage++;
            document.getElementById('pageHeading').textContent = `Page number ${currentPage}`;
            fetchIssues(currentPage);
        });

        // Event listener for loading previous page
        document.getElementById('load_prev').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                document.getElementById('pageHeading').textContent = `Page number ${currentPage}`;
                fetchIssues(currentPage);
            }
        });
