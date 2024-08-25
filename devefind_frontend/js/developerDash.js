document.addEventListener('DOMContentLoaded', function() {
  // checks if login is valid evry 6 hours if not redirect the user to login
  const token = sessionStorage.getItem('token');
  setInterval(async () => {
    const isLogedin = await validateToken(token, 'dev');
    if (!isLogedin) {
      window.location.href = '/login.html';
      return;
    }
  }, 1000 * 60 * 60 * 6);
  
  // Fetch developer data and populate the dashboard

  // Form submissions and modal interactions
/*   document.getElementById('profileForm').addEventListener('submit', updateProfile);
  document.getElementById('educationForm').addEventListener('submit', updateEducation);
  document.getElementById('portfolioForm').addEventListener('submit', updatePortfolio); */

  // Populate the form fields when the "Edit Profile" button is clicked
  document.querySelector('[data-target="#editProfileModal"]').addEventListener('click', populateProfileForm);

  // get and display the developer's data
  function fetchDeveloperData() {
    fetch('/api/developer', {
      method: 'GET',
      headers: {
        'X-Token': token,
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.Developer) {
        populateProfile(data.Developer);
        populateEducation(data.Developer.education);
        /* populatePortfolio(data.Developer.portfolio);
        populateCertificates(data.Developer.certificates); */
      } else {
        alert('Error fetching developer data');
      }
    })
    .catch(error => console.error('There was a problem with the fetch operation:', error));
  }

document.querySelectorAll('.arrow').forEach(arrow => {
  arrow.addEventListener('click', () => {

      // Get the closest parent container or section
      const toggleSection = arrow.closest('.card');
      const btnContainer = arrow.nextElementSibling;

      // Find the associated card-body within this section
      const cardBody = toggleSection.querySelector('.card-body');

      // Check if card-body has the expanded class
      if (cardBody.classList.contains('expanded')) {
          // Collapse the card body
          cardBody.classList.remove('expanded');
          arrow.innerHTML = "&#11015;";
          if (btnContainer.querySelector('.edit'))
            btnContainer.querySelector('.edit').classList.remove('d-none');
          btnContainer.querySelector('.save').classList.add('d-none');
            if (cardBody.firstElementChild.tagName === "FIELDSET") {
              const FIELDSETs = cardBody.querySelectorAll("FIELDSET textarea");
              FIELDSETs.forEach(obj => obj.setAttribute('disabled', 'disabled'));             
            }
            if (cardBody.firstElementChild.tagName === "TABLE") {
              btnContainer.querySelector('.save').classList.add('d-none');         
              btnContainer.querySelector('.add').classList.add('d-none');         
            }


      } else {
          // Expand the card body
          cardBody.classList.add('expanded');
          arrow.innerHTML = "&#11014;";
          if (btnContainer.querySelector('.edit'))
            btnContainer.querySelector('.edit').classList.remove('d-none');
          if (cardBody.firstElementChild.tagName === "TABLE") {
            btnContainer.querySelector('.save').classList.remove('d-none');
            btnContainer.querySelector('.add').classList.remove('d-none');
             
          }
      }
  });
});

  // Log Out
  const logOutBtn = document.querySelector('#logOutBtn');
  logOutBtn.addEventListener('click', async () => {
      
      try {
        const response = await fetch('/developer/logout', {
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

  // Edit Summary
  document.querySelector('#editSummaryBtn').addEventListener('click', ()  => {
    const headlineArea = document.querySelector("#devHeadline");
    const descriptionArea = document.querySelector("#devDescription");
    const saveEditsBtn = document.querySelector('#saveSummaryBtn');

    headlineArea.removeAttribute('disabled');
    descriptionArea.removeAttribute('disabled');
    saveEditsBtn.classList.remove('d-none');

    saveEditsBtn.addEventListener('click', async () => {
      headlineArea.setAttribute('disabled', 'disabled');
      descriptionArea.setAttribute('disabled', 'disabled');
      saveEditsBtn.classList.add('d-none');
      const headlineTxt = headlineArea.value;
      const descriptionTxt = descriptionArea.value;
      const summary = {headline: headlineTxt, description: descriptionTxt};
      try {
        const response = await fetch('api/developer/summary', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-token': token,
          },
          body: JSON.stringify({summary})
        });
        const result = await response.json();

        if (response.ok) {
          alert(result.message);
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    });
  });

  /************************** Education *********************************/
  // add
  document.querySelector("#addEduBtn").addEventListener('click', () => {
    const dataContainer = document.querySelector('#eduDataContainer');
    const eduContent = dataContainer.innerHTML;
    const row = `<tr>
                  <td><textarea placeholder="Txt..."></textarea></td>
                  <td><textarea placeholder="Txt..."></textarea></td>
                  <td><textarea placeholder="Txt..."></textarea></td>
                  <td><input type="date"></td>
                  <td class="d-flex flex-column p-1  m-0 btnConatiner">
                    <button title="edit" type="button" class="btn p-0" onclick="editEdurow(this)">&#128394;&#65039;</button>
                    <button title="delete" type="button" onclick="delEdurow(this)" class="btn p-0 text-danger">&#128465;</button>
                  </td>
                </tr>`;
    dataContainer.innerHTML = eduContent+row;
  });

  // save
  document.querySelector("#saveEduBtn").addEventListener('click', async () => {
    const dataContainer = document.querySelectorAll('#eduDataContainer tr');
    const eduInfo = {education: []};
    dataContainer.forEach(row => {
      let rowData = [];
      row.querySelectorAll('td textarea, td input').forEach(obj => {
        rowData.push(obj.value);
      });
      eduInfo.education.push({institution: rowData[0] || "", degree: rowData[1] || "", fieldOfStudy: rowData[2] || "", graduationDate: rowData[3] || ""});


    });

    try {
      const response = await fetch('/api/developer/edu', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-token': token,
        },
        body: JSON.stringify(eduInfo)
      });
      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        dataContainer.forEach(row => {
          row.querySelectorAll('td textarea, td input').forEach(obj => {
            obj.setAttribute('disabled', 'disabled');
          }); 
        });

      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error(error);
    }

  });

  // delete

  /***************************** End Education ************************************/

  /** Area to call functions **/
  fetchDeveloperData();
  /***************************/
});


function populateProfile(developer) {
  // Profile Section
  document.getElementById('profile-image').src = developer.image;
  document.getElementById('dev-name').textContent = `${developer.firstName} ${developer.lastName}`;
  document.getElementById('dev-country').textContent = developer.country;
  document.getElementById('dev-profession').textContent = developer.profession;

  // Contact Info
  document.getElementById('dev-age').textContent = developer.age;
  document.getElementById('dev-gender').textContent = developer.gender;
  document.getElementById('dev-email').textContent = developer.email;
  document.getElementById('dev-backup-email').textContent = developer.backupEmail || "Not set";
  document.getElementById('dev-phone').textContent = developer.phone || "Not set";

  // Language Info
  const languageList = document.getElementById('dev-languages');
  languageList.innerHTML = '';
  developer.languages.forEach(lang => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `${lang.language} (${lang.proficiency})`;
    languageList.appendChild(li);
  });

  // Summary Section
  document.getElementById('devHeadline').value = developer.summary.headline || "Not set";
  document.getElementById('devDescription').value = developer.summary.description || "Not set";

  // Social Media Links
  /* document.getElementById('github-link').href = developer.socials.github || '#';
  document.getElementById('linkedin-link').href = developer.socials.linkedIn || '#';
  document.getElementById('facebook-link').href = developer.socials.facebook || '#';
  document.getElementById('blogs-link').href = developer.socials.blogs || '#';
  document.getElementById('website-link').href = developer.socials.website || '#'; */
}

function populateProfileForm() {
  const token = localStorage.getItem('authToken');
  fetch('/api/developer', {
    method: 'GET',
    headers: {
      'X-Token': token,
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.Developer) {
      document.getElementById('firstName').value = data.Developer.firstName;
      document.getElementById('lastName').value = data.Developer.lastName;
      document.getElementById('age').value = data.Developer.age;
      document.getElementById('gender').value = data.Developer.gender;
      document.getElementById('country').value = data.Developer.country;
      document.getElementById('profession').value = data.Developer.profession;
      document.getElementById('email').value = data.Developer.email;
      document.getElementById('phone').value = data.Developer.phone;
      document.getElementById('languages').value = data.Developer.languages.map(lang => `${lang.name}-${lang.level}`).join(', ');
      document.getElementById('headline').value = data.Developer.summary.headline;
      document.getElementById('description').value = data.Developer.summary.description;
    } else {
      alert('Error fetching developer data for form population');
    }
  })
  .catch(error => console.error('There was a problem with the fetch operation:', error));
}

/* function updateProfile(event) {
  event.preventDefault();
  const token = localStorage.getItem('authToken');

  const profileData = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    age: document.getElementById('age').value,
    gender: document.getElementById('gender').value,
    country: document.getElementById('country').value,
    profession: document.getElementById('profession').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    languages: document.getElementById('languages').value.split(',').map(lang => {
      const [name, level] = lang.split('-');
      return { name: name.trim(), level: level.trim() };
    }),
    summary: {
      headline: document.getElementById('headline').value,
      description: document.getElementById('description').value
    }
  };

  fetch('/api/developer', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': token,
    },
    body: JSON.stringify(profileData),
  })
  .then(response => response.json())
  .then(data => {
    if (data.Developer) {
      populateProfile(data.Developer);
      document.querySelector('#editProfileModal').modal('hide');
    } else {
      alert('Error updating profile');
    }
  })
  .catch(error => console.error('There was a problem with the fetch operation:', error));
} */

function populateEducation(educationList) {
  const educationContainer = document.getElementById('eduDataContainer');
  educationContainer.innerHTML = '';
  educationList.forEach(edu => {
    const dateObj = new Date(edu.graduationDate);
    const formatDate = dateObj.toISOString().substring(0, 10);
    const row = `<tr>
                  <td><textarea disabled placeholder="Txt...">${edu.institution}</textarea></td>
                  <td><textarea disabled placeholder="Txt...">${edu.degree}</textarea></td>
                  <td><textarea disabled placeholder="Txt...">${edu.fieldOfStudy}</textarea></td>
                  <td><input disabled type="date" value="${formatDate}"></td>
                  <td class="d-flex flex-column p-1  m-0 btnConatiner">
                    <button title="edit" type="button" class="btn p-0" onclick="editEdurow(this)">&#128394;&#65039;</button>
                    <button title="delete" type="button" onclick="delEdurow(this)" class="btn p-0 text-danger">&#128465;</button>
                  </td>
                </tr>`;
    
    educationContainer.innerHTML += row;
  });
}

/* function updateEducation(event) {
  event.preventDefault();
  const token = localStorage.getItem('authToken');

  const educationData = {
    degree: document.getElementById('degree').value,
    fieldOfStudy: document.getElementById('fieldOfStudy').value,
    institution: document.getElementById('institution').value
  };

  fetch('/api/developer/education', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': token,
    },
    body: JSON.stringify(educationData),
  })
  .then(response => response.json())
  .then(data => {
    if (data.Developer) {
      populateEducation(data.Developer.education);
      document.querySelector('#editEducationModal').modal('hide');
    } else {
      alert('Error updating education');
    }
  })
  .catch(error => console.error('There was a problem with the fetch operation:', error));
} */

/* function populatePortfolio(portfolioList) {
  const portfolioContainer = document.getElementById('portfolio-list');
  portfolioContainer.innerHTML = ''; // Clear existing items
  if (portfolioList.length === 0) {
    portfolioContainer.innerHTML = '<p>No portfolio items added.</p>';
  } else {
    portfolioList.forEach(port => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = `${port.projectTitle} - ${port.description}`;
      portfolioContainer.appendChild(li);
    });
  }
} */

/* function updatePortfolio(event) {
  event.preventDefault();
  const token = localStorage.getItem('authToken');

  const portfolioData = {
    projectTitle: document.getElementById('projectTitle').value,
    description: document.getElementById('description').value
  };

  fetch('/api/developer/portfolio', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': token,
    },
    body: JSON.stringify(portfolioData),
  })
  .then(response => response.json())
  .then(data => {
    if (data.Developer) {
      populatePortfolio(data.Developer.portfolio);
      document.querySelector('#editPortfolioModal').modal('hide');
    } else {
      alert('Error updating portfolio');
    }
  })
  .catch(error => console.error('There was a problem with the fetch operation:', error));
} */

/* function populateSkills(skillsList) {
  const skillsContainer = document.getElementById('skills-section');
  skillsContainer.innerHTML = ''; // Clear existing items
  skillsList.forEach(skill => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = skill;
    skillsContainer.appendChild(li);
  });
} */

/* function populateCertificates(certificatesList) {
  const certificatesContainer = document.getElementById('certificates-section');
  certificatesContainer.innerHTML = ''; // Clear existing items
  certificatesList.forEach(cert => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = cert;
    certificatesContainer.appendChild(li);
  });
} */


async function validateToken(token, type) {
  try {
    const response = fetch('/api/validate/token', {
      method: 'GET',
      headers: {
        'X-Token': token,
        'Type': type,
      }
    });

    if (!response.ok) return false;
    else return true;
  } catch (error) {
    console.error(error.message);
  }  
}

function delEdurow(obj) {
  const answer = confirm('Delete This Item?');
  if (answer)
    obj.parentNode.parentNode.remove();
    document.querySelector('#saveEduBtn').click();

}

function editEdurow(obj) {
  const answer = confirm('Edit This Item?');
  if (answer){
    const cels = obj.parentNode.parentNode.querySelectorAll('td textarea, td input');
    cels.forEach(cel => {cel.removeAttribute('disabled');});
  }
}
