const recommendBtn = document.getElementById('recommendBtn');
const recommendationsDiv = document.getElementById('recommendations');

recommendBtn.addEventListener('click', async () => {
    const genre = document.getElementById('genre').value;
    const mood = document.getElementById('mood').value;
    const language = document.getElementById('language').value;
    const region = document.getElementById('region').value;

    const apiKey = '6793902d2cc8a93ea1a7a06361730ccd'; // Replace with your actual API key
    let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&language=${language}&region=${region}`;

    if (mood === 'happy') {
        apiUrl += '&sort_by=popularity.desc';
    } else if (mood === 'sad') {
         apiUrl += '&sort_by=vote_average.asc';
    } else if (mood === 'exciting') {
        apiUrl += '&sort_by=vote_count.desc';
    } else if (mood === 'relaxing') {
         apiUrl += '&sort_by=vote_average.desc';
    } else if (mood === 'thrilling') {
         apiUrl += '&sort_by=popularity.desc&vote_count.desc';
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            recommendationsDiv.innerHTML = '<h2>Recommendations:</h2><ul>';
            data.results.forEach(movie => {
                recommendationsDiv.innerHTML += `<li>${movie.title}</li>`;
            });
            recommendationsDiv.innerHTML += '</ul>';
        } else {
            recommendationsDiv.innerHTML = '<p>No recommendations found.</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        recommendationsDiv.innerHTML = '<p>Failed to fetch recommendations.</p>';
    }
});
