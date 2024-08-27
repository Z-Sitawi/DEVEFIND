document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    // fetch the developers's data
    const fetchDeveloperData = async () => {
        try {
            const response = await fetch('/api/developer', {
                headers: {
                    'X-Token': token,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch developer data');
            }
            const developer = await response.json();
            document.querySelector('#edit-first-name').value = developer.Developer.firstName;
            document.querySelector('#edit-last-name').value = developer.Developer.lastName;
            document.querySelector('#edit-age').value = developer.Developer.age;
            document.querySelector('#edit-backup-email').value = developer.Developer.backupEmail || "";
            document.querySelector('#edit-phone').value = developer.Developer.phone || "";
            document.querySelector('#profilePicture').src = developer.Developer.image || "";
  
            if (developer.Developer.image === "./images/png/user.png") {
                document.querySelector('#remove-profile-picture').setAttribute("disabled", "disabled");
            }
        } catch (error) {
            console.error('Error fetching developer data:', error);
        }
    };
    await fetchDeveloperData();

    // Handle form submission
    document.getElementById('edit-profile-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const firstName = formData.get('edit-first-name');
        const lastName = formData.get('edit-last-name');
        const backupEmail = formData.get('edit-backup-email');
        const phone = formData.get('edit-phone');
        const password = formData.get('edit-password');
        const confirmPassword = formData.get('edit-confirm-password');
        const newData = {firstName, lastName, backupEmail, phone, password, confirmPassword};

        try {
            const response = await fetch('/api/developer', {
                method: 'PUT',
                headers: {
                    'X-Token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Profile updated successfully!');
                window.location.reload();
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    });

    // Handle close button
    document.getElementById('close-form-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to discard changes?')) {
            window.location.href = 'developerDash.html';
        }
    });

    // Handle profile picture removal
    document.getElementById('remove-profile-picture').addEventListener('click', async () => {
        try {
            const response = await fetch('/api/developer/image/remove', {
                method: 'PUT',
                headers: {
                    'X-Token': token,
                },
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                location.reload();
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error removing profile picture:', error);
        }
    });

    // Handle profile picture update
    document.querySelector('#edit-profile-picture').addEventListener('change', async (e) => {
        const pic = document.querySelector('#edit-profile-picture').value;
        const btnUpdate = document.querySelector('#update-profile-picture');
        if (pic) {
            btnUpdate.removeAttribute('disabled');

            btnUpdate.addEventListener('click', async () => {
                const file = e.target.files[0];
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    try {
                        const response = await fetch('/api/developer/image/update', {
                            method: 'PUT',
                            headers: {'X-Token': token},
                            body: formData,
                        });
                        const result = await response.json();
                        if (response.ok) {
                            alert(result.message);
                            document.querySelector('#profilePicture').src = result.image;
                        } else {
                            alert(`Error: ${result.error}`);
                        }
                    } catch (error) {
                        console.error('Error uploading profile picture:', error);
                    }
                }
            });
        }
        else {
            btnUpdate.setAttribute('disabled', 'disabled');
        }
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
});
