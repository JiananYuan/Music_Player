var app = new Vue({
    el: "#player",
    data: {
        query: '',
        musicList: [],
        musicUrl: '',
        musicCover: 'bg1.jpg',
        hotComments: [],
        isPlaying: false,
        isShow: false,
        mvUrl: '',
        rotateval: 0, // 旋转角度
        Interval: '', //定时器
        player: document.querySelector('.myaudio')
    },
    methods: {
        searchMusic: function() {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
            .then(
                function(response){
                    // console.log(response)
                    that.musicList = response.data.result.songs
                },
                function(err){

            })
        },
        playMusic: function(musicID) {
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id=" + musicID)
            .then(
                function(response){
                    // console.log(response)
                    that.musicUrl = response.data.data[0].url
                    // console.log(that.musicUrl)
                },
                function(err){

            });
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicID)
            .then(
                function(response){
                    that.musicCover = response.data.songs[0].al.picUrl;
                },
                function(err){

            });
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicID)
            .then(
                function(response){
                    that.hotComments = response.data.hotComments;
                },
                function(err){

            });
            
            this.rotate()
            //核心代码定时器
        },
        play: function() {
            this.isPlaying = true;
        },
        pause: function() {
            this.isPlaying = false;
        },
        playMV: function(mvid) {
            var that = this
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
            .then(
                function(response){
                    that.isShow = true;
                    that.mvUrl = response.data.data.url;
                },
                function(err){

            })
        },
        hide: function() {
            this.isShow = false;
            document.getElementById('mv').pause();
        },
        rotate: function() {
            var that = this;
            this.rotateval = 0;
            clearInterval();
            Interval=setInterval(function(){
                var img=document.getElementById('Singer');
                that.rotateval+=1;
                img.style.transform='rotate('+that.rotateval+'deg)'
                img.style.transition = '0.1s linear'
            },100)
        }
    }
})