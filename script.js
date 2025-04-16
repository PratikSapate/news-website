const apiKey = '3f6ce8fc15284202b3a5aa3870adc140';
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function fetchRandomNews() {
    try {

        const proxyUrl = "https://api.allorigins.win/raw?url=";
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));


        const data = await response.json();
        return data.articles;

    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.error("Error fetching news by query", error);
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const proxyUrl = "https://api.allorigins.win/raw?url=";
        const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=20&apiKey=${apiKey}`;
        const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

        if (!response.ok) {
            throw new Error(`Failed to fetch news by query: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("News fetched for query:", query, data.articles);
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}
 

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
   
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || 'https://via.placeholder.com/600x400'; 
        img.alt = article.title;

        const title = document.createElement("h2");
        title.textContent = article.title;

        const description = document.createElement("p");
        description.textContent = article.description || "No description available."; 
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });

        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
    