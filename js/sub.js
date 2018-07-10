class MovieDetail {
    constructor () {
        this.state = {
            apiKey:'03244c916053ec8db051d6b477e36c1b',
            language:'en',
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
    getQuery() {
        const query = window.location.search.replace('?','').split("&");
        const queryObj = {}
        query.forEach((value) => {
            const [ queryKey, queryValue] = value.split('=')
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
        const {movieId,apiKey,language} = this.state
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`)
        .then((res) => { return res.json() }) 
        .then((res) => {
            const {title,poster_path,genres,overview,vote_average,} = res

            $('#header').find('h1').html(title)
            $('.movie_info_wrap').find('.tubmnaill').css('background-image','url(https://image.tmdb.org/t/p/w500/'+poster_path+')')
            
            let genres_html ='';
            genres.forEach((value) => {
                genres_html += `<li>${value.name}</li>`
            })

            $('.genre').html(genres_html)
            $('.story').text(overview)

            $('.graph_wrap').find('.graph').css('width',(vote_average)*10+'%')
            $('.score').text((vote_average)*10)

        })
        .catch((err) => { // 에러처리
            console.error(err)
        }) 
    }

    getCastData() {
        const {movieId,apiKey} = this.state
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`)   
        .then((res) => { return res.json() })
        .then((res) => {
            const cast = res.cast
            let html =''
            cast.forEach((value,index) => {
                if(index<4){
                    const { profile_path,name,character } = value
                    html+= `<li>
                                <div class="cast_img" style="background-image: url(https://image.tmdb.org/t/p/w500/${profile_path})"></div>
                                <div>
                                    <p class="cast_name">${name}</p>
                                    <p class="character">${character}</p>
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
        const {movieId,apiKey} = this.state
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`)  
        .then((res) => { return res.json() })
        .then((res) => {
            const img = res.backdrops
            let html =''
            img.forEach((value) => {
                const { file_path } = value
                    html+= `<li style="background-image: url(https://image.tmdb.org/t/p/w500/${file_path})"></li>`
            })

            $('.photo_slider').html(html)
            this.photoSlider()
        })
        .catch((err) => { // 에러처리
            console.error(err)
        }) 
    }

    getSimilarData() {
        const {movieId,apiKey,language} = this.state
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=${language}`)  
        .then((res) => { return res.json() })
        .then((res) => {
            const similar = res.results
            let html =''
            similar.forEach((value,index) => {
                if(index<4){
                    const { backdrop_path, id,title } = value
                    html+= `<div class="movie_list" style="background-image: url(https://image.tmdb.org/t/p/w500/${backdrop_path})">
                                <a href="./sub.html?movieId=${id}">
                                    <span class="dim">
                                        <p>${title}</p>
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

