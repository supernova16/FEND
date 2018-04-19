(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    //const searchedForText = 'hippos';
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        //unsplash api
        const unsplashRequest = new XMLHttpRequest();

        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID f67a8795a3292c3f18aeef5ee0d2ee1d30dacd1a5c4a8c4d9a1ebb44747deb02');
        unsplashRequest.send();

        function addImage(){
          let htmlContent = '';
          const data = JSON.parse(this.responseText);

          console.log(data);

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

        //nytimes api
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=621088bb1a4542b290e00f8ab164e6e5`);
        articleRequest.send();

        function addArticles () {
          let htmlContent = '';
          const data = JSON.parse(this.responseText);
          console.log(data);

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
    });

})();
