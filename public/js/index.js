var app = new Vue({
  el: '#app', 
  
  data: {
    title: 'Download some music!',
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
    },

    downloadSong: function (videoId, videoTitle) {
      var a = document.createElement("a"); 
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = 'http://localhost:3000/api/download/mp3/' + videoId + '/' + videoTitle;
      a.click();
    }
  }
});
