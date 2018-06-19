class Movie {
    constructor () {
        this.state = {
            apiKey:'03244c916053ec8db051d6b477e36c1b',
            language:'ko',
        }
    }
    init() { 
        this.getPopularData()  
        // $(document).on("click",".lang span",()=>{
        //     this.changeLang()
        // });
     }
     changeLang () {
        this.state.language = 'en'
        this.getPopularData() 
    }
    rankSlider() {
        $('.rank_slider').not('.slick-initialized').slick({
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1,
            arrows: false,
        });
    }
    //main data
    getPopularData() {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=${this.state.language}`)
        .then((res) => { return res.json() })
        .then((res) => {
            const data = res.results;
            //slider list
            let html = '';
            data.map((value,index) => {
                html += `<div class="slider_list">
                            <div class="tubmnaill" style="background-image: url(https://image.tmdb.org/t/p/w500/${value.poster_path})";>
                                <span class="dim"></span>
                            </div>
                            <h2 class="title">${index+1}위 ${value.title}</h2>
                            <p class="date">${value.release_date.replace(/-/gi,".")} 개봉</p>
                            <div class="more_btn"><a href="./sub.html?${value.id}?">MORE</a></div>
                        </div>`
            })

            $('.rank_slider').html(html)

            //slick slider 실행
            this.rankSlider()
        })
        .catch((err) => { 
            console.error(err)
        })
    }

}

const movie = new Movie();
movie.init();

