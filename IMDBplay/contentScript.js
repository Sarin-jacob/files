// Function to fetch HTTP status code with CORS proxy
function fetchStatusCodeWithCorsProxy(targetUrl) {
  // const proxyUrl = 'https://api.allorigins.win/get?url=';
  // const proxyUrl = 'https://cors.bridged.cc/';
  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const proxyUrl = 'https://cors.jell0.online/';
  // const proxyUrl = 'http://jell0.online:8080';

  return fetch(proxyUrl + targetUrl)
    .then(response => {
      return response.status;
    })
    .catch(error => {
      console.error('Fetch error:', error);
      // You might want to return a specific value or throw an error here based on your needs
    });
}

// Function to extract IMDb ID from URL
function getIMDbID(url) {
  const match = url.match(/\/tt(\d+)\//);
  return match ? match[1] : null;
}

// Find the movie title element
const movieTitleElement = document.querySelector('[data-testid="hero__primary-text"]');
if (movieTitleElement) {
  const movieTitle = movieTitleElement.innerText;
  const imdbLink = window.location.href;

  // Extract IMDb ID from the URL
  const imdbID = getIMDbID(imdbLink);

  // Fetch the HTTP status code
  fetchStatusCodeWithCorsProxy(`https://vidsrc.to/embed/movie/tt${imdbID}`)
    .then(statusCode => {
      // Handle the status code here
      console.log('Status Code:', statusCode);

      // Create and append the icon next to the movie title
      const icon = document.createElement('img');
      
      // Check the response code
      if (statusCode === 404) {
        icon.src = 'https://raw.githubusercontent.com/Sarin-jacob/files/main/not.png';
      } else {
        icon.src = 'https://raw.githubusercontent.com/Sarin-jacob/files/main/play.png';
      }

      // Set icon properties
      icon.style.cursor = 'pointer';
      icon.style.marginLeft = '5px';
      
      // Append the icon to the movie title element
      movieTitleElement.appendChild(icon);

      // Add click event listener to open the video player on icon click
      icon.addEventListener('click', (event) => {
        event.stopPropagation(); // Stop the event from bubbling up
        if (imdbID) {
          const videoURL = `https://vidsrc.to/embed/movie/tt${imdbID}`;
          window.open(videoURL, '_blank');
        }
      });

      // // Add click event listener to open the video player on movie title click
      // movieTitleElement.addEventListener('click', () => {
      //   if (imdbID) {
      //     const videoURL = `https://vidsrc.to/embed/movie/tt${imdbID}`;
      //     window.open(videoURL, '_blank');
      //   }
      // });
    });
}

