var URL = 'http://localhost:3000';

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
      axios.get('http://localhost:3000/api/search/' + this.search)
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
