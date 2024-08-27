document.addEventListener('DOMContentLoaded', function() {
    const userId = sessionStorage.getItem('DevId');
    fetchDeveloperData(userId);
});

function fetchDeveloperData(userId) {
    const token = sessionStorage.getItem('token');
    fetch(`/api/developer/one/?id=${userId}`, {
        method: 'GET',
        headers: {
            'X-Token': token,
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.Developer) {
            populateProfileView(data.Developer);
            //!console.log(data.Developer);
        } else {
            alert('Error fetching developer data');
        }
    })
    .catch(error => console.error('There was a problem with the fetch operation:', error));
}

function populateProfileView(developer) {
    document.getElementById('profile-image').src = developer.image || './images/png/user.png';
    document.getElementById('dev-name').textContent = `${developer.firstName} ${developer.lastName}`;
    document.getElementById('dev-profession').textContent = developer.profession;
    document.getElementById('dev-level').textContent = developer.level || "";
    document.getElementById('dev-country').textContent = developer.country;
    document.getElementById('dev-age').textContent = developer.age;
    document.getElementById('dev-gender').textContent = developer.gender;
    document.getElementById('dev-email').textContent = developer.email;
    document.getElementById('dev-phone').textContent = developer.phone || "Not Provided";

    if (developer.links) {
        const socials = ['gitHub', 'linkedin', 'facebook', 'blog', 'personalWebsite'];
        for (let i = 0; i < 5; i++){
            if (developer.links[i][socials[i]]){
                document.getElementById(`${socials[i]}-link`).href = developer.links[i][socials[i]];
                document.getElementById(`${socials[i]}-link`).classList.remove('d-none');
            }
        }
    }
    
    document.getElementById('dev-headline').textContent = `${developer.summary.headline}` || '';
    document.getElementById('dev-description').textContent = `${developer.summary.description}` || '';

    populateList('language-list', developer.languages.map(lang => `${lang.language} (${lang.proficiency})`));
    populateList('education-list', developer.education.map(edu => `${edu.degree} in ${edu.fieldOfStudy} - ${edu.institution}`));
    populateList('portfolio-list', developer.portfolio.map(port => `${port.projectTitle} - ${port.description}`));
    populateList('certificates-list', developer.certifications);
}

function populateList(elementId, items) {
    const list = document.getElementById(elementId);
    list.innerHTML = ''; // Clear existing items
    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = item;
        list.appendChild(li);
    });

    document.getElementById('closetBtn').addEventListener('click', function() {
        window.close();
        // window.location.href = 'any-redirect-url-here if we want to';
    });
}
