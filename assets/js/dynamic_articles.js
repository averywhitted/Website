document.addEventListener("DOMContentLoaded", fetchArticles);

async function fetchArticles() {
  // Replace with your Google Sheets API URL
  const sheetUrl =
    "https://sheets.googleapis.com/v4/spreadsheets/YOUR_SHEET_ID/values/YOUR_SHEET_NAME?key=YOUR_API_KEY";

  try {
    const response = await fetch(sheetUrl);
    const data = await response.json();
    const articles = data.values; // Assuming 'values' contains rows of articles

    let postsSection = document.querySelector(".posts");
    postsSection.innerHTML = "";

    articles.forEach((article) => {
      // Extract data: assuming columns are [Title, Date, Image URL, Blurb, Article Link]
      const [title, date, image, article, link] = article;

      // Create an article element dynamically
      const articleElement = `
        <article>
          <header>
            <span class="date">${date}</span>
            <h2><a href="${link}">${title}</a></h2>
          </header>
          <a href="${link}" class="image fit"><img src="${image}" alt="" /></a>
          <p>${article}</p>
          <ul class="actions special">
            <li><a href="${link}" class="button">Full Story</a></li>
          </ul>
        </article>
      `;

      // Append the new article to the posts section
      postsSection.innerHTML += articleElement;
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}
