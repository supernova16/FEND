/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        //unsplash api
        $.ajax({
          url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
          headers: { Authorization: 'Client-ID f67a8795a3292c3f18aeef5ee0d2ee1d30dacd1a5c4a8c4d9a1ebb44747deb02' }

        }).done(addImage)
        .fail(function(err) {
          requestError(err,'image');
        });

        function addImage(images) {
          let htmlContent = '';

          if (images && images.results && images.results[0]) {
            const firstImage = images.results[0];

            htmlContent = `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;
          } else {
            htmlContent = `<div class = 'error-no-image'>No images available</div>`;
          }

          responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        function requestError(e, part) {
          console.log(e);
          responseContainer.insertAdjacentHTML('beforeend', `<div class = 'error-no-${part}'>No ${part}s available</div>`);
}


        //nytimes figcaption
        $.ajax({
          url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=621088bb1a4542b290e00f8ab164e6e5`,

        }).done(addArticles)
        .fail(function(err) {
          requestError(err,'article');
        });

        function addArticles (articles) {
          let htmlContent = '';

          if (articles.response && articles.response.docs && articles.response.docs.length > 1) {
            htmlContent = '<ul>' + articles.response.docs.map(article => `
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

    });
})();
