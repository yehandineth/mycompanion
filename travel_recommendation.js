function resetresults() {
    document.getElementsByClassName("search-input")[0].value = "";
    document.getElementById('searchCondition').style['display'] =  'none';

}

function showresults() {
    document.getElementById('searchCondition').style['display'] =  'inline-block';
    searchBar();
}
function validateinput(text) {
    if (['beach', 'beachs', 'beaches', 'beachside', 'beachside', 'beachy', 'beachy', 'beachfront', 'beachfronts', 'beachfronting', 'beachfronted', 'beachfronted'].includes(text)) {
        return 'beaches';
    } else if (['country','countries', 'countrys', 'countryside', 'countrysides', 'countryland', 'countrylands', 'countrylanded', 'countrylanding', 'countrylandings'].includes(text)) {
        return 'countries';
    } else if (['temple', 'temples', 'templed', 'templing', 'templeds', 'templed', 'templeing', 'templeings'].includes(text)) {
        return 'temples';
    } else {
        return 0;
    }
}

function searchBar() {
    let input = document.getElementsByClassName("search-input")[0].value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    input = validateinput(input);
    if (input === 0) {
        alert('Invalid input. Please try again');
        resetresults();
        return 
    }
    fetch('./travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        resultDiv.innerHTML = input;
        data[input].forEach(place => {
            resultDiv.innerHTML += `<h2>${place.name}</h2>`;
        })
        // const condition = data.conditions.find(item => item.name.toLowerCase() === input);
        // console.log('looks good');
        // if (condition) {
        //   const symptoms = condition.symptoms.join(', ');
        //   const prevention = condition.prevention.join(', ');
        //   const treatment = condition.treatment;

        //   resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
        //   resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

        //   resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
        //   resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
        //   resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
        // } else {
        //   resultDiv.innerHTML = 'Condition not found.';
        // }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
}

document.getElementById('btn1').addEventListener('click', showresults);
document.getElementById('btn2').addEventListener('click', resetresults);