(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        //request unsplash api
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
          headers: {Authorization: 'Client-ID f67a8795a3292c3f18aeef5ee0d2ee1d30dacd1a5c4a8c4d9a1ebb44747deb02'}
        })
        .then(response => response.json())
        .then(addImage)
        .catch(err => requestError(err,'image'));

        //request nytimes api
        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=621088bb1a4542b290e00f8ab164e6e5`)
        .then(response => response.json())
        .then(addArticles)
        .catch(err => requestError(err,'articles'));

        function addImage(data){
          let htmlContent = '';

          if (data && data.results && data.results[0]) {
            const firstImage = data.results[0];
            htmlContent = `<figure>
              <img src = '${firstImage.urls.regular}' alt = '${searchedForText}'>
              <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>`
          } else {
            htmlContent = `<div class = 'error-no-image'>No images available</div>`;
          }

          responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }


        function addArticles (data) {
          let htmlContent = '';

          if (data.response && data.response.docs && data.response.docs.length > 1) {
            htmlContent = '<ul>' + data.response.docs.map(article => `
              <li class = 'article'>
                <h2><a href = '${article.web_url}'>${article.headline.main}</a></h2>
                <p>${article.snippet}
              </li>`
            ).join('') + '</ul>';
          } else {
            htmlContent = `<div class = 'error-no-article'>No articles available</div>`;
          }

          responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }

        function requestError(e, part) {
          console.log(e);
          responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        }

    });
})();
