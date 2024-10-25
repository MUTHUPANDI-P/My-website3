document.getElementById("fetch-news").addEventListener("click", fetchGNews);

function fetchGNews() {
    const apiKey = '40e7867decde73fb63a2b9e16cc82eaf'; // Replace with your GNews API key
    const query = document.getElementById("search-input").value;
    const country = document.getElementById("country-input").value;
    const timeRange = document.getElementById("time-range-input").value;
    const sentiment = document.getElementById("sentiment-input").value;
    const popularity = document.getElementById("popularity-input").value;
    const wordCount = document.getElementById("word-count-input").value;
    const breakingNews = document.getElementById("breaking-news-input").value;

    let url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&token=${apiKey}`;
    
    if (country) url += `&country=${country}`;
    if (timeRange) url += `&time_range=${timeRange}`;
    if (sentiment) url += `&sentiment=${sentiment}`;
    if (popularity) url += `&popularity=${popularity}`;
    if (wordCount) url += `&word_count=${wordCount}`;
    if (breakingNews) url += `&breaking_news=${breakingNews}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayNews(data.articles);
            document.getElementById("scroll-message").style.display = "block"; // Show scroll message
        })
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ""; // Clear previous news

    if (articles.length === 0) {
        newsContainer.innerHTML = "<p>No articles found.</p>";
        return;
    }

    articles.forEach(article => {
        const articleDiv = document.createElement("div");
        articleDiv.className = "news-article";

        articleDiv.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        
        newsContainer.appendChild(articleDiv);
    });
}
