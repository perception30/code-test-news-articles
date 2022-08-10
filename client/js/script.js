// CONSTANTS
const API = "https://h2bvqmupci.us-east-1.awsapprunner.com";
const COLLECTIONS_ENDPOINT = "/collections";

// when DOM is ready, fetch collections and render them
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // fetch collections
    const collections = await fetchData(`${API}${COLLECTIONS_ENDPOINT}`);

    // render collections
    renderContent(collections);
  } catch (error) {
    console.log(`Error fetching collections: ${error?.message}`, error);
  }
});

// fetch data from API
async function fetchData(url) {
  const res = await fetch(url);
  return await res.json();
}

// DOM elements selectors
function getContentSections() {
  return {
    main: document.getElementsByTagName("main")[0],
    secondary: document.getElementById("secondary"),
    content1: document.getElementById("content1"),
    content2: document.getElementById("content2"),
  };
}

// fetch articles for specified collection id
async function fetchArticles(collectionid) {
  try {
    const url = `${API}${COLLECTIONS_ENDPOINT}/${collectionid}`;
    const articles = await fetchData(url);
    return articles;
  } catch (error) {
    console.log(`Error fetching articles: ${error?.message}`, error);
  }
}

function renderContent(collections) {
  const contents = getContentSections();

  collections.forEach(async (collection) => {
    const { collectionid } = collection;

    // fetch articles for collectionid
    const fetchedArticles = await fetchArticles(collectionid);

    fetchedArticles.forEach((article) => {
      const newsType = article.newsType;

      // create article element
      const articleElement = document.createElement("div");
      articleElement.innerHTML = `
        <img src="${article.imageurl}" alt="${article.title}">
        <h2>${article.title}</h2>
        
        ${
          article.intro
            ? `<p>
         ${
           article.hightedWords
             ? `<span class="highlight"> ${article.hightedWords}</span>`
             : ``
         }  
${article.intro}</p>`
            : ""
        }      
      `;
      // add article element to DOM element
      contents[newsType].appendChild(articleElement);
    });
  });
}
