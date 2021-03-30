/* Add your Application JavaScript */
const app = Vue.createApp({
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
});

app.component('app-header', {
  name: 'AppHeader',
  template: `
      <header>
          <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <a class="navbar-brand" href="#">VueJS App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">News</a>
                </li>
              </ul>
            </div>
          </nav>
      </header>    
  `,
  data: function() {
    return {};
  }
});

app.component('news-list', {
  name: 'NewsList',
  template: `
    <div class="news">
      <h2 class='text-center'>News</h2>
      <ul class="news__list">
        <li v-for="article in articles" class="news__item">
          <div class='card'>
            <p class='title'>{{ article.title }}</p>
            <img v-bind:src=article.urlToImage alt="">
            <p>{{ article.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  `,
  created() {

    let apiKey = '';
    let self = this;

    fetch(`https://newsapi.org/v2/top-headlines?country=us`,
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })
    .then(response =>response.json())
    .then(data => {
      console.log(data);
      self.articles = data.articles;
    }).catch(error => {
      console.log(error);
    });
  },
  data(){
    return {
       articles: []
    }
  } 
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
      <footer>
          <div class="container">
              <p>Copyright &copy {{ year }} Flask Inc.</p>
          </div>
      </footer>
  `,
  data: function() {
      return {
          year: (new Date).getFullYear()
      }
  }
})

app.mount('#app');