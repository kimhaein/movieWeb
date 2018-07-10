class Movie {
    constructor () {
        this.state = {
            apiKey:'03244c916053ec8db051d6b477e36c1b',
            language:'en',
            slider : true
        }
    }
    init() { 
        this.getPopularData(this.state.slider)  
     }
    rankSlider() {
        $('.rank_slider').slick({
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1,
            arrows: false,
            responsive: [
                {
                  breakpoint: 321,
                  settings: {
                    centerPadding: '30px',
                  }
                },
                {
                    breakpoint: 376,
                    settings: {
                      centerPadding: '20px',
                    }
                  },
            ]
        });
    }
    //main data
    getPopularData(slider) {
        const {apiKey,language} = this.state
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}`)
        .then((res) => { return res.json() })
        .then((res) => {
            const data = res.results;
            //slider list
            let html = '';
            data.forEach((value,index) => {
                const { id,poster_path,title,release_date } = value
                html += `<div class="slider_list">
                            <a href="./sub.html?movieId=${id}&lang=ko">
                                <div class="tubmnaill" style="background-image: url(https://image.tmdb.org/t/p/w500/${poster_path})";>
                                    <span class="dim"></span>
                                </div>
                                <h2 class="title">${index+1}위 ${title}</h2>
                                <p class="date">${release_date.replace(/-/gi,".")} 개봉</p>
                                <div class="more_btn">MORE</div>
                            </a>
                        </div>`
            })
            $('.rank_slider').html(html)
            //slick slider 실행
            this.rankSlider(slider)

        })
        .catch((err) => { 
            console.error(err)
        })
    }

}

const movie = new Movie();
movie.init();

