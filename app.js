const searchBar = document.querySelector("#searchBar");
const list = document.querySelector("#list");
const loader = document.querySelector("#loader");
const noResults = document.querySelector("#noResults");

searchBar.addEventListener("input", searchShows);

function searchShows() {
  const query = searchBar.value.trim();

  if (query.length === 0) {
    clearResults();
    return;
  }

  toggleLoader(true);

  fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((data) => {
      toggleLoader(false);
      if (data.length === 0) {
        showNoResults();
      } else {
        displayResults(data);
      }
    })
    .catch((error) => {
      toggleLoader(false);
      console.error("Error", error);
    });
}

function toggleLoader(show) {
  if (show) {
    loader.style.display = "block";
  } else {
    loader.style.display = "none";
  }
}

function showNoResults() {
  noResults.style.display = "block";
  list.innerHTML = "";
}

function clearResults() {
  noResults.style.display = "none";
  list.innerHTML = "";
}

function displayResults(results) {
  list.innerHTML = "";
  results.forEach((result) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${result.show.name}</strong><br>
                           Average Rating: ${result.show.rating.average || "N/A"}<br>
                           Genre: ${result.show.genres.join(", ")}<br>
                           Summary: ${result.show.summary || "N/A"}`;
    list.appendChild(listItem);
  });
}