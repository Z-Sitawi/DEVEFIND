document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');

    // if (!token) {
    //     window.location.href = '/login.html';
    //     return;
    // }
    // Fetch and populate filters from filter.json
    fetch('/api/filters')
        .then(response => response.json())
        .then(data => {
            populateDropdown('country-filter', data.country);
            populateDropdown('gender-filter', data.gender);
            populateDropdown('language-filter', data.languages);
            populateDropdown('proficiency-filter', data.proficiency);
            populateDropdown('level-filter', data.level);
            populateDropdown('profession-filter', data.profession);
        })
        .catch(error => console.error('Error fetching filters:', error));

    // Toggle filter dropdown
    const filterToggle = document.getElementById('filter-toggle');
    const filterDropdown = document.getElementById('filter-dropdown');

    filterToggle.addEventListener('click', () => {
        filterDropdown.classList.toggle('show');
    });

    // Close filter form when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!filterDropdown.contains(e.target) && !filterToggle.contains(e.target)) {
            filterDropdown.classList.remove('show');
        }
    });

    // Handle pagination
    const profileContainer = document.getElementById('profile-container');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentIndex = 0;
    const cardsToShow = 6;

    const fetchProfiles = async () => {
      try {
          const response = await fetch('/api/developer/all', {
              headers: {
                  'X-Token': token,
              },
          });
          if (!response.ok) {
              throw new Error('Failed to fetch profiles');
          }
          const profiles = await response.json();
          displayProfiles(profiles.Developer);
      } catch (error) {
          console.error('Error fetching profiles:', error);
      }
  };

  const displayProfiles = (profiles) => {
    profileContainer.innerHTML = '';
  
    const profilesToDisplay = profiles.slice(currentIndex, currentIndex + cardsToShow);
    if (profilesToDisplay.length === 0) {
        profileContainer.innerHTML = `<h1 class="text-danger">No Profiles Found!</h1>`;   
    }
  
    profilesToDisplay.forEach(profile => {
        const profileCard = document.createElement('div');
        profileCard.className = 'profile-card';
        profileCard.innerHTML = `
            <img
                src="${profile.image || './images/png/user.png'}"
                alt="${profile.firstName} ${profile.lastName} avatar"
                width="100"
                height="100"
                class="card-avatar rounded-circle"
            />
            <div class="profile-info text-start">
                <h3 style="text-transform: capitalize;" class="text-center" >${profile.firstName} ${profile.lastName}</h3>
                <table>
                    <tr><th>Age: </th><td>${profile.age|| 'N/A'}</td></tr>
                    <tr><th>Gender: </th><td>${profile.gender|| 'N/A'}</td></tr>
                    <tr><th>Country: </th><td>${profile.country|| 'N/A'}</td></tr>
                    <tr><th>Profession: </th><td>${profile.profession|| 'N/A'}</td></tr>
                    <tr><th>Experince: </th><td>${profile.level|| 'N/A'}</td></tr>
                    <tr><th>Languages: </th><td> ${profile.languages.length || 'N/A'}</td></tr>
                </table>
                <div class="d-flex justify-content-end">
                    <button id="${profile._id}" onclick="seeDevProfile(this)" type="button" class="seeMoreBtn btn btn-primary px-2 py-1 mt-2">see more > </button>
                </div>
            </div>
        `;
        profileContainer.appendChild(profileCard);
    });
  
    // Update button states
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex + cardsToShow >= profiles.length;
  };
  
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= cardsToShow;
        fetchProfiles();
    }
  });
  
  nextButton.addEventListener('click', () => {
    currentIndex += cardsToShow;
    fetchProfiles();
  });
  
  

    // Display logged-in recruiter's info
    const fetchRecruiterData = async () => {
        try {
            const response = await fetch('/api/recruiter', {
                headers: {
                    'X-Token': token,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch recruiter data');
            }
            const recruiter = await response.json();
            document.getElementById('recruiter-name').textContent = `${recruiter.recruiter.firstName} ${recruiter.recruiter.lastName}`;
            document.getElementById('recruiter-email').textContent = recruiter.recruiter.email;
            document.querySelector('.card-avatar').src = recruiter.recruiter.image || '../static/user.png';
        } catch (error) {
            console.error('Error fetching recruiter data:', error);
        }
    };

    // Log Out
    const logOutBtn = document.querySelector('#logOutBtn');
    logOutBtn.addEventListener('click', async () => {
        
        try {
          const response = await fetch('/recruiter/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-token': token,
            },
          });
    
          if (response.ok) {
            const result = await response.json();
            alert(result.message);
            sessionStorage.removeItem('token');
            window.location.href = '/login.html';
          } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
          }
        } catch (error) {
          console.error('Login failed:', error);
        }
    });

    fetchRecruiterData();
    fetchProfiles();

    //! Filterning---------------------------------------
    const filterBtn = document.querySelector('#filterData');

    filterBtn.addEventListener('click', async () => {
        const country = document.querySelector('#country-filter').value;
        const gender = document.querySelector('#gender-filter').value;
        const age = document.querySelector('#age-filter').value;
        const language = document.querySelector('#language-filter').value;
        const proficiency = document.querySelector('#proficiency-filter').value;
        const level = document.querySelector('#level-filter').value;
        const profession = document.querySelector('#profession-filter').value;

        const filterObj = {country, gender, age, language, proficiency, level, profession};
        
        try {
            const response = await fetch('/api/developer/filterd', {
                method: 'POST',
                headers: {
                    'X-Token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filterObj),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch profiles');
            }
            const profiles = await response.json();
            document.getElementById('filter-dropdown').classList.remove('show');
            displayProfiles(profiles.Developer);
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
    });

});

// Function to populate dropdowns
function populateDropdown(elementId, options) {
    const selectElement = document.getElementById(elementId);
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.text = option;
        selectElement.appendChild(opt);
    });
}

/* eslint-disable no-unused-vars */


function seeDevProfile(obj) {
    const userId = obj.id;
    sessionStorage.setItem('DevId', userId);
    window.open('/profileView.html', '_blank');
}
