let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

// Backend API URL
const API_URL = 'http://localhost:5000/api';

// Form switching
const showRegisterBtn = document.querySelector('#show-register');
const showLoginBtn = document.querySelector('#show-login');
const loginFormEl = document.querySelector('#login-form');
const registerFormEl = document.querySelector('#register-form');

showRegisterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormEl.style.display = 'none';
    registerFormEl.style.display = 'block';
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    registerFormEl.style.display = 'none';
    loginFormEl.style.display = 'block';
});

// Login form submission
loginFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('Login successful!');
            loginForm.classList.remove('active');
            updateUIForLoggedInUser(data.user);
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Error connecting to server. Please try again.');
    }
});

// Register form submission
registerFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.querySelector('#register-name').value;
    const email = document.querySelector('#register-email').value;
    const password = document.querySelector('#register-password').value;
    const confirmPassword = document.querySelector('#register-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful! Please login.');
            registerFormEl.style.display = 'none';
            loginFormEl.style.display = 'block';
            registerFormEl.reset();
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('Error connecting to server. Please try again.');
    }
});

// Update UI for logged in user
function updateUIForLoggedInUser(user) {
    // Update user icon or show user name
    const userIcon = document.querySelector('#login-btn');
    if (userIcon) {
        userIcon.classList.remove('fa-user');
        userIcon.classList.add('fa-user-check');
    }
}

// Check if user is already logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
        updateUIForLoggedInUser(JSON.parse(user));
    }
}

// Check auth on page load
checkAuth();

// Up to top button functionality
const upToTopBtn = document.querySelector('#up-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        upToTopBtn.classList.add('active');
    } else {
        upToTopBtn.classList.remove('active');
    }
});

window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');

    if (window.scrollY > 300) {
        upToTopBtn.classList.add('active');
    } else {
        upToTopBtn.classList.remove('active');
    }
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

// Search functionality - Backend API
const searchInput = document.querySelector('#search-bar');
let searchTimeout;

if (searchInput) {
    searchInput.addEventListener('keyup', async (e) => {
        const searchTerm = e.target.value.trim();

        // Debounce search to avoid too many API calls
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
            if (searchTerm.length >= 2) {
                await searchPackages(searchTerm);
                await searchServices(searchTerm);
                await searchGallery(searchTerm);
            } else {
                // Reset display if search is empty
                resetSearchResults();
            }
        }, 500);
    });
}

// Search packages from backend
async function searchPackages(searchTerm) {
    try {
        const response = await fetch(`${API_URL}/packages?search=${searchTerm}`);
        const data = await response.json();

        if (data.success && data.data.length > 0) {
            displayPackageResults(data.data);
        } else {
            hideAllPackages();
        }
    } catch (error) {
        console.error('Error searching packages:', error);
        // Fallback to frontend search if backend fails
        frontendSearch(searchTerm);
    }
}

// Display backend package results
function displayPackageResults(packages) {
    const packageBoxes = document.querySelectorAll('.packages .box');

    packageBoxes.forEach(box => {
        const packageName = box.querySelector('h3').textContent.toLowerCase();
        const isMatch = packages.some(pkg => 
            pkg.name.toLowerCase().includes(packageName.toLowerCase())
        );
        box.style.display = isMatch ? 'inline-block' : 'none';
    });
}

// Hide all packages
function hideAllPackages() {
    const packageBoxes = document.querySelectorAll('.packages .box');
    packageBoxes.forEach(box => {
        box.style.display = 'none';
    });
}

// Frontend search fallback
function frontendSearch(searchTerm) {
    const packages = document.querySelectorAll('.packages .box');
    const term = searchTerm.toLowerCase();

    packages.forEach(packageBox => {
        const packageName = packageBox.querySelector('h3').textContent.toLowerCase();
        const packageLocation = packageBox.querySelector('p').textContent.toLowerCase();

        if (packageName.includes(term) || packageLocation.includes(term)) {
            packageBox.style.display = 'inline-block';
        } else {
            packageBox.style.display = 'none';
        }
    });
}

// Search services
function searchServices(searchTerm) {
    const services = document.querySelectorAll('.services .box');
    const term = searchTerm.toLowerCase();

    services.forEach(serviceBox => {
        const serviceName = serviceBox.querySelector('h3').textContent.toLowerCase();
        const serviceDesc = serviceBox.querySelector('p').textContent.toLowerCase();

        if (serviceName.includes(term) || serviceDesc.includes(term)) {
            serviceBox.style.display = 'inline-block';
        } else {
            serviceBox.style.display = 'none';
        }
    });
}

// Search gallery
function searchGallery(searchTerm) {
    const galleryItems = document.querySelectorAll('.gallery .box');
    const term = searchTerm.toLowerCase();

    galleryItems.forEach(galleryBox => {
        const galleryName = galleryBox.querySelector('h3').textContent.toLowerCase();
        const galleryDesc = galleryBox.querySelector('p').textContent.toLowerCase();

        if (galleryName.includes(term) || galleryDesc.includes(term)) {
            galleryBox.style.display = 'inline-block';
        } else {
            galleryBox.style.display = 'none';
        }
    });
}

// Reset search results
function resetSearchResults() {
    const allBoxes = document.querySelectorAll('.box');
    allBoxes.forEach(box => {
        box.style.display = 'inline-block';
    });
}

formBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
}); 

videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop: true,
    autoplay:{
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints:{
        640:{
            slidesPerView: 1,
        },
        768:{
            slidesPerView: 2,
        },
        1024:{
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop: true,
    autoplay:{
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints:{
        450:{
            slidesPerView: 2,
        },
        768:{
            slidesPerView: 3,
        },
        991:{
            slidesPerView: 4,
        },
          1200:{
            slidesPerView: 5,
        },
    },
});