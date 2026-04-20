window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      for (const movie of movies) {
        const articleElement = document.createElement("article");
        articleElement.id = movie.imdbID;

        const titleElement = document.createElement("h1");
        titleElement.textContent = movie.Title;
        articleElement.append(titleElement);

        const imageElement = document.createElement("img");
        imageElement.src = movie.Poster;
        imageElement.alt = movie.Title;
        articleElement.append(imageElement);

        const metaElement = document.createElement("p");
        metaElement.textContent =
          "Released: " +
          movie.Released +
          " | Runtime: " +
          movie.Runtime +
          " min | IMDb: " +
          movie.imdbRating;
        articleElement.append(metaElement);

        const genresElement = document.createElement("p");
        for (const genre of movie.Genres) {
          const genreElement = document.createElement("span");
          genreElement.className = "genre";
          genreElement.textContent = genre;
          genresElement.append(genreElement);
        }
        articleElement.append(genresElement);

        const plotElement = document.createElement("p");
        plotElement.textContent = movie.Plot;
        articleElement.append(plotElement);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function () {
          location.href = "edit.html?imdbID=" + movie.imdbID;
        };
        articleElement.append(editButton);

        bodyElement.append(articleElement);
      }

    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
