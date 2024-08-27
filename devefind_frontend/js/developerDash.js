document.addEventListener('DOMContentLoaded', async function() {
  // checks if login is valid evry 6 hours if not redirect the user to login
  const token = sessionStorage.getItem('token');
  setInterval(async () => {
    const isLogedin = await validateToken(token, 'dev');
    if (!isLogedin) {
      sessionStorage.removeItem("token");
      window.location.href = '/login.html';
      return;
    }
  }, 1000 * 60 * 60 * 6);

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
        populateLinks(data.Developer.links);
        /* populatePortfolio(data.Developer.portfolio);
        populateCertificates(data.Developer.certificates); */
      } else {
        redirectToLogin();
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
          if (btnContainer.querySelector('.edit'))
            btnContainer.querySelector('.edit').classList.add('d-none');
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

  /***************************** End Education ************************************/

  //!/************** Socials **************/!\\
  document.querySelector('#editSocialsBtn').addEventListener('click', ()=> {
    document.querySelector('#saveSocialsBtn').classList.remove('d-none');
    const githubLinkInput = document.getElementById('githubLink');
    const linkedinLinkInput = document.getElementById('linkedinLink');
    const facebookLinkInput = document.getElementById('facebookLink');
    const blogLinkInput = document.getElementById('blogLink');
    const websiteLinkInput = document.getElementById('websiteLink');
    const links = [githubLinkInput, linkedinLinkInput, facebookLinkInput, blogLinkInput, websiteLinkInput];
    links.forEach(link => link.removeAttribute('disabled'));

    document.querySelector('#saveSocialsBtn').addEventListener('click', async () => {
      const linksVal = links.map(link => link.value);
      const jsonLinks = [{gitHub: linksVal[0]}, {linkedin: linksVal[1]}, {facebook: linksVal[2]}, {blog: linksVal[3]}, {personalWebsite: linksVal[4]}];
      try {
        const response = await fetch('/api/developer/socials', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-token': token,
          },
          body: JSON.stringify({links: jsonLinks})
        });
        const result = await response.json();
  
        if (response.ok) {
          alert(result.message);
          links.forEach(link => link.setAttribute('disabled', 'disabled'));
          document.querySelector('#saveSocialsBtn').classList.add('d-none');

        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error(error);
      }
    });


  });

  //!/***************************** End Socials ************************************/

  /****************** Language ******************/
  
  document.querySelector('#editLanguages').addEventListener('click', async () => {
    // delete laguages 
    const cancelBtn = document.querySelector('#cancelBtn');
    const formLang = document.querySelector("#langForm");
    document.querySelector('#editLanguages').setAttribute('disabled', 'disabled');
    cancelBtn.classList.remove('d-none');
    formLang.classList.remove('d-none');

    try {
      const response = await fetch('/api/filters');

      const result = await response.json();

      if (response.ok) {
        // git current languades
        const userLang = [];
        document.querySelectorAll('#dev-languages li').forEach(e => userLang.push(e.textContent.split(' ')[0]));

        // language
        const laguagesList = result.languages;
        const allowedlLaguagesList = laguagesList.filter(e => !userLang.includes(e));
        let languageContent = '';
        allowedlLaguagesList.forEach(ele => languageContent += `<option value="${ele}">${ele}</option>`);
        formLang.querySelector('#languages').innerHTML += languageContent;

        // proficiency
        const proficiencyList = result.proficiency;
        let proficienciesContent = '';
        proficiencyList.forEach(ele => proficienciesContent += `<option value="${ele}">${ele}</option>`);
        formLang.querySelector('#proficiencies').innerHTML += proficienciesContent;

        // save Languages
        formLang.addEventListener('submit', async (e) => {
          e.preventDefault();
          const formData = new FormData(formLang);
          const data = {
            language: formData.get('language'),
            proficiency: formData.get('proficiency'),
          };
          if (data.language && data.proficiency)
            document.querySelector('#dev-languages').innerHTML += `<li class="list-group-item">
          <input type="checkbox" class="langCheckBox" onclick="showDel()"><span>${data.language} (${data.proficiency})</span></li>`;
          const allLanguages = {languages: []};
          document.querySelectorAll('#dev-languages li span').forEach(e => {
            allLanguages.languages.push({language: e.textContent.split(' ')[0], proficiency: e.textContent.split(' ')[1].match(/\(([^)]+)\)/)[1]});
          });

          try {
            const response = await fetch('/api/developer/language', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'X-Token': token,
              },
              body: JSON.stringify(allLanguages)
            });

            const res = await response.json();
            if (response.ok) {
              alert(res.message);
              formLang.classList.add('d-none');
              cancelBtn.classList.add('d-none');
              document.querySelector('#editLanguages').removeAttribute('disabled');
            }
            else {
              alert(res.error);
            }

          } catch (error) {
            console.log(error);
          }
        });

      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error(error);
    }

    cancelBtn.addEventListener('click', () => {
      cancelBtn.classList.add('d-none');
      formLang.classList.add('d-none');
      document.querySelector('#editLanguages').removeAttribute('disabled');

    });
  });

  /************************* End Language *****************************/

 // Experience
  document.querySelector("#addExpBtn").addEventListener('click', () => {
    const dataContainer = document.querySelector('#expDataContainer');
    const expContent = dataContainer.innerHTML;
    const row = `<tr>
                  <td><textarea placeholder="Company..."></textarea></td>
                  <td><textarea placeholder="Position..."></textarea></td>
                  <td><input type="date"></td>
                  <td><input type="date"></td>
                  <td><textarea placeholder="Description..."></textarea></td>
                  <td class="d-flex flex-column p-1 m-0 btnContainer">
                    <button title="edit" type="button" class="btn p-0" onclick="editExprow(this)">&#128394;&#65039;</button>
                    <button title="delete" type="button" onclick="delExprow(this)" class="btn p-0 text-danger">&#128465;</button>
                  </td>
                </tr>`;
    dataContainer.innerHTML = expContent + row;
  });
  
  document.querySelector("#saveExpBtn").addEventListener('click', async () => {
    const dataContainer = document.querySelectorAll('#expDataContainer tr');
    const expInfo = { experience: [] };
  
    dataContainer.forEach(row => {
      let rowData = [];
      row.querySelectorAll('td textarea, td input').forEach(obj => {
        rowData.push(obj.value);
      });
      expInfo.experience.push({
        company: rowData[0] || "",
        position: rowData[1] || "",
        startDate: rowData[2] || "",
        endDate: rowData[3] || "",
        description: rowData[4] || ""
      });
    });
  
    try {
      const response = await fetch('/api/developer/experience', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-token': token,
        },
        body: JSON.stringify(expInfo)
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

  // End of Experience


  // portfolio

  document.querySelector("#addPortfolioBtn").addEventListener('click', () => {
    const dataContainer = document.querySelector('#portfolioDataContainer');
    const portfolioContent = dataContainer.innerHTML;
    const row = `<tr>
                  <td><textarea placeholder="Project Title..."></textarea></td>
                  <td><textarea placeholder="Project URL..."></textarea></td>
                  <td><textarea placeholder="Description..."></textarea></td>
                  <td class="d-flex flex-column p-1 m-0 btnContainer">
                    <button title="edit" type="button" class="btn p-0" onclick="editPortfoliorow(this)">&#128394;&#65039;</button>
                    <button title="delete" type="button" onclick="delPortfoliorow(this)" class="btn p-0 text-danger">&#128465;</button>
                  </td>
                </tr>`;
    dataContainer.innerHTML = portfolioContent + row;
  });

  document.querySelector("#savePortfolioBtn").addEventListener('click', async () => {
    const dataContainer = document.querySelectorAll('#portfolioDataContainer tr');
    const portfolioInfo = { portfolio: [] };
  
    dataContainer.forEach(row => {
      let rowData = [];
      row.querySelectorAll('td textarea').forEach(obj => {
        rowData.push(obj.value);
      });
      portfolioInfo.portfolio.push({
        title: rowData[0] || "",
        url: rowData[1] || "",
        description: rowData[2] || ""
      });
    });
  
    try {
      const response = await fetch('/api/developer/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-token': token,
        },
        body: JSON.stringify(portfolioInfo)
      });
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message);
        dataContainer.forEach(row => {
          row.querySelectorAll('td textarea').forEach(obj => {
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

  // End of portfolio


  //  Certificate
  document.querySelector("#addCertBtn").addEventListener('click', () => {
    const dataContainer = document.querySelector('#certDataContainer');
    const certContent = dataContainer.innerHTML;
    const row = `<tr>
                  <td><textarea placeholder="Certificate Name..."></textarea></td>
                  <td><textarea placeholder="Institution..."></textarea></td>
                  <td><input type="date"></td>
                  <td class="d-flex flex-column p-1 m-0 btnContainer">
                    <button title="edit" type="button" class="btn p-0" onclick="editCertrow(this)">&#128394;&#65039;</button>
                    <button title="delete" type="button" onclick="delCertrow(this)" class="btn p-0 text-danger">&#128465;</button>
                  </td>
                </tr>`;
    dataContainer.innerHTML = certContent + row;
  });

  document.querySelector("#saveCertBtn").addEventListener('click', async () => {
    const dataContainer = document.querySelectorAll('#certDataContainer tr');
    const certInfo = { certificates: [] };
  
    dataContainer.forEach(row => {
      let rowData = [];
      row.querySelectorAll('td textarea, td input').forEach(obj => {
        rowData.push(obj.value);
      });
      certInfo.certificates.push({
        name: rowData[0] || "",
        institution: rowData[1] || "",
        date: rowData[2] || ""
      });
    });
  
    try {
      const response = await fetch('/api/developer/certificates', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-token': token,
        },
        body: JSON.stringify(certInfo)
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

   // End of Certificate

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
    li.innerHTML = `<input type="checkbox" class="langCheckBox" onclick="showDel()"><span>${lang.language} (${lang.proficiency})</span> `;
    languageList.appendChild(li);
  });

  // Summary Section
  document.getElementById('devHeadline').value = developer.summary.headline || "Not set";
  document.getElementById('devDescription').value = developer.summary.description || "Not set";

}

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

function populateLinks(linksObj) {
    document.getElementById('githubLink').value = linksObj[0].gitHub;
    document.getElementById('linkedinLink').value = linksObj[1].linkedin;
    document.getElementById('facebookLink').value = linksObj[2].facebook;
    document.getElementById('blogLink').value = linksObj[3].blog;
    document.getElementById('websiteLink').value = linksObj[4].personalWebsite;
}

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

/* eslint-disable no-unused-vars */

function delEdurow(obj) {
  const answer = confirm('Delete This Item?');
  if (answer) {
    obj.parentNode.parentNode.remove();
    document.querySelector('#saveEduBtn').click();
  }
}

function editEdurow(obj) {
  const answer = confirm('Edit This Item?');
  if (answer){
    const cels = obj.parentNode.parentNode.querySelectorAll('td textarea, td input');
    cels.forEach(cel => {cel.removeAttribute('disabled');});
  }
}

function redirectToLogin() {
  window.location.href = '/login.html';
  return;
}

function showDel(){
  const checkboxes = document.querySelectorAll('.langCheckBox');
  const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
  if (!isChecked){
    document.getElementById('trashLang').classList.add('d-none');
  }
  else {
    document.getElementById('trashLang').classList.remove('d-none');
  }
}

async function deletLanguages () {
  const checkboxes = document.querySelectorAll('.langCheckBox:checked');
  checkboxes.forEach(checkboxe => {
    checkboxe.parentElement.remove();
  });
  showDel();
  const allLanguages = {languages: []};
  document.querySelectorAll('#dev-languages li span').forEach(e => {
    allLanguages.languages.push({language: e.textContent.split(' ')[0], proficiency: e.textContent.split(' ')[1].match(/\(([^)]+)\)/)[1]});
  });

  try {
        const response = await fetch('/api/developer/language', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Token': sessionStorage.getItem('token'),
          },
          body: JSON.stringify(allLanguages)
        });
        const res = await response.json();
        if (response.ok) {
          alert(res.message);
        }
        else {
          alert(res.error);
        }
      } catch (error) {
        console.log(error);
      }
}
