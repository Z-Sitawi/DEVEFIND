document.addEventListener('DOMContentLoaded', () => {
    const briefInfoForm = document.getElementById('brief-form');
    const educationForm = document.getElementById('education-form');
    const skillsForm = document.getElementById('skills-form');
    const workExpForm = document.getElementById('portfolio-form');
  
    const personalInfoBtn = document.getElementById('personal-info-btn');
    const educationBtn = document.getElementById('education-btn');
    const skillsBtn = document.getElementById('skills-btn');
    const workExpBtn = document.getElementById('work-exp-btn');
  
    const saveContinue1 = document.getElementById('save-continue-1');
    const saveContinue2 = document.getElementById('save-continue-2');
    const saveContinue3 = document.getElementById('save-continue-3');
    const saveContinue4 = document.getElementById('save-continue-4');
  
    function showForm(form) {
        briefInfoForm.style.display = 'none';
        educationForm.style.display = 'none';
        skillsForm.style.display = 'none';
        workExpForm.style.display = 'none';
        form.style.display = 'block';
    }
  
    personalInfoBtn.addEventListener('click', () => showForm(briefInfoForm));
    educationBtn.addEventListener('click', () => showForm(educationForm));
    skillsBtn.addEventListener('click', () => showForm(skillsForm));
    workExpBtn.addEventListener('click', () => showForm(workExpForm));
  
    saveContinue1.addEventListener('click', () => showForm(educationForm));
    saveContinue2.addEventListener('click', () => showForm(skillsForm));
    saveContinue3.addEventListener('click', () => showForm(workExpForm));
    saveContinue4.addEventListener('click', () => {
        alert('Profile completed successfully!');
        window.location.href = 'developerDash.html'; // Redirect to developerDash page
    });
  
    const addEducationBtn = document.getElementById('add-education');
    const addExperienceBtn = document.getElementById('add-experience');
    const addSkillButton = document.getElementById('add-skill-button');
    const skillsContainer = document.getElementById('skills-container');
    const educationContainer = document.getElementById('eduSection');
  
    addEducationBtn.addEventListener('click', () => {
        const newEducation = `
        <div id="education-section">
            <div class="form-group">
                <label for="school">Instituition</label>
                <input type="text" id="school" name="school" required>
            </div>
            <div class="form-group">
                <label for="degree">Degree</label>
                <input type="text" id="degree" name="degree" required>
            </div>
            <div class="form-group">
                <label for="field-of-study">Field of Study</label>
                <input type="text" id="field-of-study" name="field-of-study" required>
            </div>
            <div class="form-group">
                <label for="graduation-year">Graduation Date</label>
                <input type="date" id="graduation-year" name="graduation-year" required>
            </div>
        </div>`;
        educationContainer.insertAdjacentHTML('beforeend', newEducation);
    });
  
    addExperienceBtn.addEventListener('click', () => {
        const newExperience = `
            <div class="form-group">
                <label for="job-title">Job Title</label>
                <input type="text" name="job-title">
            </div>
            <div class="form-group">
                <label for="company">Company Name</label>
                <input type="text" name="company">
            </div>
            <div class="form-group">
                <label for="years-of-experience">Years of Experience</label>
                <input type="number" name="years-of-experience">
            </div>`;
        experienceSection.insertAdjacentHTML('beforeend', newExperience);
    });
  
    addSkillButton.addEventListener('click', () => {
        const skillCount = skillsContainer.children.length + 1;
        if (skillCount <= 6) {
            const newSkill = `<input type="text" id="skill-${skillCount}" name="skills[]" placeholder="Skill ${skillCount}" required>`;
            skillsContainer.insertAdjacentHTML('beforeend', newSkill);
        } else {
            alert('You can add up to 6 skills only.');
        }
    });
  });
