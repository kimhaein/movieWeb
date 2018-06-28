class MovieDetail {
    constructor () {
        this.state = {
            apiKey:'03244c916053ec8db051d6b477e36c1b',
            language:'ko',
            movieId:''
        }
    }
    init() {
       this.getQuery()
       this.getMovieData()  
       this.getCastData()  
       this.getImgData()  
       this.getSimilarData()
    }
    getQuery(){
        const query = window.location.search.replace('?','').split("&");
        const queryObj = {}
        query.foreach((value) => {
            const queryKey = value.split('=')[0]
            const queryValue = value.split('=')[1]
            queryObj[queryKey] = queryValue
        })
        
        this.state.movieId = queryObj.movieId
    }
    photoSlider() {
        $('.photo_slider').slick({
            arrows: true,
        });
    }
    //sub data
    getMovieData() {
        // console.log(this.state.queryObj)
        fetch(`https://api.themoviedb.org/3/movie/${this.state.movieId}?api_key=${this.state.apiKey}&language=${this.state.language}`)
        .then((res) => { return res.json() }) 
        .then((res) => {

            $('#header').find('h1').html(res.title)
            $('.movie_info_wrap').find('.tubmnaill').css('background-image','url(https://image.tmdb.org/t/p/w500/'+res.poster_path+')')
            
            let genres ='';
            res.genres.foreach((value)=>{
                genres += `<li>${value.name}</li>`
            })

            $('.genre').html(genres)
            $('.story').text(res.overview)

            $('.graph_wrap').find('.graph').css('width',(res.vote_average)*10+'%')
            $('.score').text((res.vote_average)*10)

        })
        .catch((err) => { // 에러처리
            console.error(err)
        }) 
    }

    getCastData() {
        fetch(`https://api.themoviedb.org/3/movie/${this.state.movieId}/credits?api_key=${this.state.apiKey}`)   
        .then((res) => { return res.json() })
        .then((res) => {
            const cast = res.cast
            let html =''
            cast.foreach((value,index) => {
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
        .catch((err) => { // 에러처리
            console.error(err)
        }) 
    }

    getImgData() {
        fetch(`https://api.themoviedb.org/3/movie/${this.state.movieId}/images?api_key=${this.state.apiKey}`)  
        .then((res) => { return res.json() })
        .then((res) => {
            const img = res.backdrops
            let html =''
            img.foreach((value) => {
                    html+= `<li style="background-image: url(https://image.tmdb.org/t/p/w500/${value.file_path})"></li>`
            })

            $('.photo_slider').html(html)
            this.photoSlider()
        })
        .catch((err) => { // 에러처리
            console.error(err)
        }) 
    }

    getSimilarData() {
        fetch(`https://api.themoviedb.org/3/movie/${this.state.movieId}/similar?api_key=${this.state.apiKey}&language=${this.state.language}`)  
        .then((res) => { return res.json() })
        .then((res) => {
            const similar = res.results
            let html =''
            similar.foreach((value,index) => {
                if(index<4){
                    html+= `<div class="movie_list" style="background-image: url(https://image.tmdb.org/t/p/w500/${value.backdrop_path})">
                                <a href="./sub.html?movieId=${value.id}">
                                    <span class="dim">
                                        <p>${value.title}</p>
                                    </span>
                                </a>
                            </div>`
                }
            })

            $('.recommend_movie').html(html)
        })
        .catch((err) => { // 에러처리
            console.error(err)
        }) 
    }

}

const movieDetail = new MovieDetail();
movieDetail.init();

