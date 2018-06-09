class Movie {
    constructor () {
        this.state = {
            apiKey:'03244c916053ec8db051d6b477e36c1b',
            language:'ko',
        }
    }
    rankSlider() {
        $('.rank_slider').slick({
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1,
            arrows: false,
        });

    }
    //main data
    popularData() {
        const that = this;
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=${this.state.language}`)
        .then(function (res) { return res.json() })
        .then(function (res) {
            const data = res.results;

            //slider list
            let html = '';
            data.map(function(value,index){
                html += `<div class="slider_list">
                            <div class="tubmnaill" style="background-image: url(https://image.tmdb.org/t/p/w500/${value.poster_path})";>
                                <span class="dim"></span>
                            </div>
                            <h2 class="title">${index+1}위 ${value.title}</h2>
                            <p class="date">${value.release_date.replace(/-/gi,".")} 개봉</p>
                            <div class="more_btn"><a href="./sub.html?${value.id}">MORE</a></div>
                        </div>`
            })

            $('.rank_slider').html(html)

            //slick slider 실행
            that.rankSlider()
        })
        .catch(function (err) { 
            console.error(err)
        })
    }
    //sub data
    movieData() {
        console.log(window.location.href)
        const movieId = window.location.href.split('?')[1]
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.state.apiKey}&language=${this.state.language}`)
        .then(function (res) { return res.json() }) // return 값을 다음 then으로 넘겨줌
        .then(function (res) {
            // window.href
            console.log(res)


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
movie.movieData();


$(document).ready(function(){
    $('.photo_slider').slick({});

});
