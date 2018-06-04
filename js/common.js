class Movie {
    constructor () {
        this.state = {
            apiKey:'03244c916053ec8db051d6b477e36c1b',
            language:'ko'
        }
    }
    //main data
    popularData() {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=${this.state.language}`)
        .then(function (res) { return res.json() })
        .then(function (res) {
            console.log(res)
        })
        .catch(function (err) { // 에러처리
            console.error(err)
        })
    }
    //sub data
    movieData(movieId) {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.state.apiKey}&language=${this.state.language}`)
        .then(function (res) { return res.json() }) // return 값을 다음 then으로 넘겨줌
        .then(function (res) {
            console.log(res)
            return 123
        })
        .then(function(res){
            console.log(res)
        })
        .catch(function (err) { // 에러처리
            console.error(err)
        })
	}

}
const movie = new Movie();
movie.popularData();
movie.movieData(383498);

$(document).ready(function(){
    $('.rank_slider').slick({
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1,
        arrows: false,
    });

    $('.photo_slider').slick({});

});
