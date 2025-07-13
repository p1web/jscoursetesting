document.getElementById('searchButton').addEventListener('click', function () {
  const keyword = document.getElementById('searchInput').value.toLowerCase();

  fetch('travel_recommendation_api.json') // Update this to your actual path or API URL
    .then(response => response.json())
    .then(data => {

      const matches = [];

      // Search in countries and cities
      data.countries.forEach(country => {
        const countryName = country.name.toLowerCase();

        // If country matches keyword
        if (countryName.includes(keyword)) {
          country.cities.forEach(city => {
            matches.push({
              name: city.name,
              type: 'City in ' + country.name,
              imageUrl: city.imageUrl,
              description: city.description
            });
          });
        } else {
          // Search inside cities
          country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(keyword)) {
              matches.push({
                name: city.name,
                type: 'City in ' + country.name,
                imageUrl: city.imageUrl,
                description: city.description
              });
            }
          });
        }
      });
      

      // Search in temples
      data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(keyword)) {
          matches.push({
            name: temple.name,
            type: 'Temple',
            imageUrl: temple.imageUrl,
            description: temple.description
          });
        }
      });

      // Search in beaches
      data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(keyword)) {
          matches.push({
            name: beach.name,
            type: 'Beach',
            imageUrl: beach.imageUrl,
            description: beach.description
          });
        }
      });

      displayResults(matches);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

function displayResults(results) {
  const container = document.getElementById('results');
  container.innerHTML = '';

  if (results.length === 0) {
    container.innerHTML = '<p>No matching results found.</p>';
    return;
  }

  results.forEach(item => {
    const div = document.createElement('div');
    div.style.marginBottom = '20px';
    div.innerHTML = `
      <h3>${item.name} (${item.type})</h3>
      <img src="${item.imageUrl}" alt="${item.name}" width="300" />
      <p>${item.description}</p>
    `;
    container.appendChild(div);
  });
}
