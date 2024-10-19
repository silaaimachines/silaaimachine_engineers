/*=============== SHOW SIDEBAR ===============*/
const showSidebar = (toggleId, sidebarId, headerId, mainId) =>{
   const toggle = document.getElementById(toggleId),
         sidebar = document.getElementById(sidebarId),
         header = document.getElementById(headerId),
         main = document.getElementById(mainId)

   if(toggle && sidebar && header && main){
       toggle.addEventListener('click', ()=>{
           /* Show sidebar */
           sidebar.classList.toggle('show-sidebar')
           /* Add padding header */
           header.classList.toggle('left-pd')
           /* Add padding main */
           main.classList.toggle('left-pd')
       })
   }
}
showSidebar('header-toggle','sidebar', 'header', 'main')

/*=============== LINK ACTIVE ===============*/
const sidebarLink = document.querySelectorAll('.sidebar__list a')

function linkColor(){
    sidebarLink.forEach(l => l.classList.remove('active-link'))
    this.classList.add('active-link')
}

sidebarLink.forEach(l => l.addEventListener('click', linkColor))

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-fill'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-clear-fill' : 'ri-sun-fill'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-clear-fill' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/* JS Code by Marshal starts here */

// Function to show or hide the custom input field based on selection
function toggleCustomInput(selectElement, customInputId) {
    const customInput = document.getElementById(customInputId);
    customInput.style.display = selectElement.value === "Other" ? "block" : "none";
}

// Function to get user's current timestamp
function getCurrentUserTimestamp() {
    const now = new Date();
    // Format as YYYY-MM-DD HH:MM:SS
    const formattedDate = now.getFullYear() + '-' 
        + ('0' + (now.getMonth() + 1)).slice(-2) + '-' 
        + ('0' + now.getDate()).slice(-2) + ' ' 
        + ('0' + now.getHours()).slice(-2) + ':' 
        + ('0' + now.getMinutes()).slice(-2) + ':' 
        + ('0' + now.getSeconds()).slice(-2);
    
    document.getElementById('currentTimestamp').value = formattedDate;
}

// Set the timestamp just before form submission
window.onload = function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', getCurrentUserTimestamp);
};