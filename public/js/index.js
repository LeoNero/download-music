var URL;

if (window.location.hostname === 'localhost') {
  URL = 'http://localhost';
} else {
  URL = 'http://downloadmusic.nerone.me';
}

var app = new Vue({
  el: '#app', 
  
  data: {
    title: 'Download some music!',
    url: URL,
    search: '',
    songs: []
  },

  methods: {
    searchMusic: function () {
      axios.get(this.url + '/api/search/' + this.search)
        .then(function (response) {
          Vue.set(this, 'songs', response.data);
        }.bind(this))
        .catch(err => {
          console.log(err);
          throw err;
        });
    }
  }
});
