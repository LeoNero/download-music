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
          console.log(response.data);
          Vue.set(this, 'songs', response.data);
        }.bind(this))
        .catch(err => {
          console.log(err);
          throw err;
        });
    },

    downloadSong: function (videoId, videoTitle) {
      axios
        .post('http://localhost:3000/api/download/mp3', {
          videoId: videoId,
          videoTitle: videoTitle
        })
       .then(function (response) {
          console.log(response);
       })
       .catch(function (err) {
          console.log(err);
          throw err;
       });
    }
  }
});
