class MovieDetail {
    constructor () {
        this.state = {
            apiKey:'03244c916053ec8db051d6b477e36c1b',
            language:'ko',
            movieId: window.location.href.split('?')[1]
        }
    }
    init() {
       this.getMovieData()  
       this.getCastData()  
       this.getImgData()  
       this.getSimilarData()
    }
    photoSlider() {
        $('.photo_slider').slick({});
    }
    //sub data
    getMovieData() {
        fetch(`https://api.themoviedb.org/3/movie/${this.state.movieId}?api_key=${this.state.apiKey}&language=${this.state.language}`)
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

        })
        .catch(function (err) { // 에러처리
            console.error(err)
        })
    }

    getCastData() {
        fetch(`https://api.themoviedb.org/3/movie/${this.state.movieId}/credits?api_key=${this.state.apiKey}`)   
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
        })
        .catch(function (err) { // 에러처리
            console.error(err)
        })
    }

    getImgData(){
        const that = this
        fetch(`https://api.themoviedb.org/3/movie/${this.state.movieId}/images?api_key=${this.state.apiKey}`)  
        .then(function(res){ return res.json() })
        .then(function (res) {
            const img = res.backdrops
            let html =''
            img.map(function(value){
                    html+= `<li style="background-image: url(https://image.tmdb.org/t/p/w500/${value.file_path})"></li>`
            })

            $('.photo_slider').html(html)
            that.photoSlider()
        })
        .catch(function (err) { // 에러처리
            console.error(err)
        }) 
    }

    getSimilarData(){
        fetch(`https://api.themoviedb.org/3/movie/${this.state.movieId}/similar?api_key=${this.state.apiKey}&language=${this.state.language}`)  
        .then(function(res){ return res.json() })
        .then(function (res) {
            console.log(res)
            const similar = res.results
            let html =''
            similar.map(function(value,index){
                if(index<4){
                    html+= `<div class="movie_list" style="background-image: url(https://image.tmdb.org/t/p/w500/${value.backdrop_path})">
                                <a href="./sub.html?${value.id}">
                                    <span class="dim">
                                        <p>${value.title}</p>
                                    </span>
                                </a>
                            </div>`
                }
            })

            $('.recommend_movie').html(html)
        })
        .catch(function (err) { // 에러처리
            console.error(err)
        }) 
    }

}

const movieDetail = new MovieDetail();
movieDetail.init();

