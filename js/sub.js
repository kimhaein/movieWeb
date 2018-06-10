class MovieDetail {
    constructor () {
        this.state = {
            apiKey:'03244c916053ec8db051d6b477e36c1b',
            language:'ko',
        }
    }
    photoSlider() {
        $('.photo_slider').slick({});
    }
    //sub data
    getMovieData() {
        const that = this;
        const movieId = window.location.href.split('?')[1]
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.state.apiKey}&language=${this.state.language}`)
        .then(function (res) { return res.json() }) 
        .then(function (res) {

            $('#header').find('h1').html(res.title)
            $('.movie_info_wrap').find('.tubmnaill').css('background-image','url(https://image.tmdb.org/t/p/w500/'+res.poster_path+')')
            
            let genres ='';
            res.genres.map(function(value){
                genres += `<li>${value.name}</li>`
            })
            $('.genre').html(genres)
            $('.story').text(res.overview)

            $('.graph_wrap').find('.graph').css('width',(res.vote_average)*10+'%')
            $('.score').text((res.vote_average)*10)

            this.photoSlider()

            return fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${that.state.apiKey}`) 

        })
        .then(function(res){ return res.json() })
        .then(function (res) {
            const cast = res.cast
            let html =''
            cast.map(function(value,index){
                if(index<4){
                    html+= `<li>
                                <div class="cast_img" style="background-image: url(https://image.tmdb.org/t/p/w500/${value.profile_path})"></div>
                                <div>
                                    <p class="cast_name">${value.name}</p>
                                    <p class="character">${value.character}</p>
                                </div>
                            </li>`
                }
            })
            $('.cast_wrap').html(html)
            console.log(cast)
        })
        .catch(function (err) { // 에러처리
            console.error(err)
        })
	}

}

const movieDetail = new MovieDetail();
movieDetail.getMovieData().bind(this);

