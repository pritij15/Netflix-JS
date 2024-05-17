let cl = console.log;

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "a012f14ce9e09e300e2732059d02c2d9";
const trendingMovies = `${baseUrl}/trending/all/week?api_key=${apiKey}`

const trendingMovieSlider = document.getElementById("trendingMovieSlider");
// const makeApiCall = (apiUrl, methodName, msgBody = null)=>{
//   return fetch(apiUrl, {
//         body : msgBody,
//         method : methodName
//     })
//         .then(res => {
//             return res.json()
//         })
// }

//templating
const insertMainSliderItems = (arr) =>{

  let result = '';
  arr.forEach(movObj => {
    result += `
      <div class="item">
        <figure class="m-0 movieCard" id="${movObj.id}">
                <img src="https://image.tmdb.org/t/p/original/${movObj.poster_path}" 
                alt="Godzilla x Kong: The New Empire" 
                title="Godzilla x Kong: The New Empire">
          <figcaption class="caption d-flex justify-content-center flex-column pl-4">
              <h3 class="display-3">
                ${movObj.title}
              </h3>
                <em>
                ${movObj.overview}
                </em>
          </figcaption>    
        </figure>            
      </div>
    `
  });
  trendingMovieSlider.innerHTML = result;
}

const makeApiCall = async(apiUrl, methodName, msgBody = null)=>{
      let res = await fetch(apiUrl, {
        body : msgBody,
        method : methodName
      })
      return res.json()
    }


const getTrendingMovies = async() =>{
  let treandingData = await makeApiCall(trendingMovies, "GET")

  insertMainSliderItems(treandingData.results)

$('#trendingMovieSlider').owlCarousel({
  loop:true,
  margin:10,
  nav:true,
  navText : ['<i class="fas fa-angle-double-left"></i>','<i class="fas fa-angle-double-right"></i>'],
  responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:1,
          autoplay: true
      }
  }
})

}
getTrendingMovies();
