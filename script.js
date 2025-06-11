// Main JavaScript file for LifeDrop website

// Global variables
let currentUser = null;
let currentTestimonialIndex = 0;
let currentAdminTab = 'donors';
let adminData = [];

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupNavigation();
    setupFirebaseAuth();
    setupContactForm();
    setupLoginModal();
    setupAdminPanel();
    generateBloodTypes();
    generateDonationCenters();
    generateTestimonials();
    setupTestimonialSlider();
    setCurrentYear();
}

// Navigation functionality
function setupNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle admin login link
            if (href === '#' && this.id === 'auth-link') {
                e.preventDefault();
                if (currentUser) {
                    showAdminPanel();
                } else {
                    showLoginModal();
                }
                return;
            }
            
            // Handle section links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Update navigation based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Firebase Authentication setup
function setupFirebaseAuth() {
    // Listen for authentication state changes
    auth.onAuthStateChanged(function(user) {
        currentUser = user;
        updateAuthUI();
    });
}

// Update UI based on authentication state
function updateAuthUI() {
    const authLink = document.getElementById('auth-link');
    
    if (currentUser) {
        authLink.textContent = 'Admin Panel';
        authLink.onclick = showAdminPanel;
    } else {
        authLink.textContent = 'Admin Login';
        authLink.onclick = showLoginModal;
    }
}

// Contact form functionality
function setupContactForm() {
    const form = document.getElementById('contact-form');
    const userTypeSelect = document.getElementById('userType');
    const receiverFields = document.getElementById('receiver-fields');
    const urgencyField = document.getElementById('urgency');
    const hospitalField = document.getElementById('hospital');

    // Show/hide receiver-specific fields
    userTypeSelect.addEventListener('change', function() {
        if (this.value === 'receiver') {
            receiverFields.style.display = 'block';
            urgencyField.required = true;
            hospitalField.required = true;
        } else {
            receiverFields.style.display = 'none';
            urgencyField.required = false;
            hospitalField.required = false;
        }
    });

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await submitContactForm();
    });
}

// Submit contact form to Firebase
async function submitContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitText = document.getElementById('submit-text');
    const messagesDiv = document.getElementById('form-messages');

    // Show loading state
    submitText.textContent = 'Submitting...';
    submitBtn.disabled = true;

    try {
        // Get form data
        const formData = new FormData(form);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Add timestamp
        data.submittedAt = firebase.firestore.Timestamp.now();

        // Determine collection based on user type
        const collection = data.userType === 'donor' ? 'donors' : 'receivers';

        // Save to Firebase
        await db.collection(collection).add(data);

        // Show success message
        showMessage('✅ Submission successful!', 'success');

        // Reset form
        form.reset();
        document.getElementById('receiver-fields').style.display = 'none';

    } catch (error) {
        console.error('Error submitting form:', error);
        showMessage('❌ Something went wrong. Please try again.', 'error');
    } finally {
        // Reset button state
        submitText.textContent = 'Submit';
        submitBtn.disabled = false;
    }
}

// Show message to user
function showMessage(message, type) {
    const messagesDiv = document.getElementById('form-messages');
    messagesDiv.innerHTML = `<div class="${type}-message">${message}</div>`;
    
    // Clear message after 5 seconds
    setTimeout(() => {
        messagesDiv.innerHTML = '';
    }, 5000);
}

// Login modal functionality
function setupLoginModal() {
    const modal = document.getElementById('login-modal');
    const closeBtn = modal.querySelector('.close-modal');
    const form = document.getElementById('login-form');

    // Close modal when clicking X or outside
    closeBtn.addEventListener('click', hideLoginModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideLoginModal();
        }
    });

    // Handle login form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await handleLogin();
    });
}

// Show login modal
function showLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
}

// Hide login modal
function hideLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('login-messages').innerHTML = '';
}

// Handle admin login
async function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const messagesDiv = document.getElementById('login-messages');

    try {
        await auth.signInWithEmailAndPassword(email, password);
        hideLoginModal();
        showAdminPanel();
    } catch (error) {
        console.error('Login error:', error);
        messagesDiv.innerHTML = '<div class="error-message">Invalid login. Please try again.</div>';
    }
}

// Admin panel functionality
function setupAdminPanel() {
    const donorsTab = document.getElementById('donors-tab');
    const receiversTab = document.getElementById('receivers-tab');
    const exportBtn = document.getElementById('export-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Tab switching
    donorsTab.addEventListener('click', () => switchAdminTab('donors'));
    receiversTab.addEventListener('click', () => switchAdminTab('receivers'));

    // Export functionality
    exportBtn.addEventListener('click', exportToCSV);

    // Logout functionality
    logoutBtn.addEventListener('click', handleLogout);
}

// Show admin panel
function showAdminPanel() {
    if (!currentUser) {
        showLoginModal();
        return;
    }
    
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    loadAdminData();
}

// Hide admin panel
function hideAdminPanel() {
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('admin-panel').style.display = 'none';
}

// Switch admin tab
function switchAdminTab(tab) {
    currentAdminTab = tab;
    
    // Update tab buttons
    document.getElementById('donors-tab').classList.toggle('active', tab === 'donors');
    document.getElementById('receivers-tab').classList.toggle('active', tab === 'receivers');
    
    // Load data for selected tab
    loadAdminData();
}

// Load admin data from Firebase
async function loadAdminData() {
    const loadingDiv = document.getElementById('admin-loading');
    const dataDiv = document.getElementById('admin-data');
    
    loadingDiv.style.display = 'block';
    dataDiv.innerHTML = '';
    
    try {
        const snapshot = await db.collection(currentAdminTab).get();
        adminData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        displayAdminData();
    } catch (error) {
        console.error('Error loading admin data:', error);
        dataDiv.innerHTML = '<div class="error-message">Error loading data</div>';
    } finally {
        loadingDiv.style.display = 'none';
    }
}

// Display admin data in table format
function displayAdminData() {
    const dataDiv = document.getElementById('admin-data');
    
    if (adminData.length === 0) {
        dataDiv.innerHTML = '<p>No data available</p>';
        return;
    }
    
    // Get all unique keys from the data
    const keys = [...new Set(adminData.flatMap(Object.keys))];
    
    // Create table
    let tableHTML = '<table class="admin-table"><thead><tr>';
    keys.forEach(key => {
        tableHTML += `<th>${formatColumnName(key)}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';
    
    // Add data rows
    adminData.forEach(item => {
        tableHTML += '<tr>';
        keys.forEach(key => {
            let value = item[key] || '';
            
            // Format timestamp values
            if (value && typeof value === 'object' && value.toDate) {
                value = value.toDate().toLocaleString();
            }
            
            tableHTML += `<td>${String(value)}</td>`;
        });
        tableHTML += '</tr>';
    });
    
    tableHTML += '</tbody></table>';
    dataDiv.innerHTML = tableHTML;
}

// Format column names for display
function formatColumnName(name) {
    return name
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .replace(/Id$/, 'ID');
}

// Export data to CSV
function exportToCSV() {
    if (adminData.length === 0) {
        alert('No data to export');
        return;
    }
    
    // Convert data to CSV format
    const keys = Object.keys(adminData[0]);
    let csvContent = keys.join(',') + '\n';
    
    adminData.forEach(item => {
        const row = keys.map(key => {
            let value = item[key] || '';
            
            // Format timestamp values
            if (value && typeof value === 'object' && value.toDate) {
                value = value.toDate().toISOString();
            }
            
            // Escape commas and quotes
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                value = '"' + value.replace(/"/g, '""') + '"';
            }
            
            return value;
        });
        csvContent += row.join(',') + '\n';
    });
    
    // Download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${currentAdminTab}_data.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Handle admin logout
async function handleLogout() {
    try {
        await auth.signOut();
        hideAdminPanel();
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Generate blood types section
function generateBloodTypes() {
    const container = document.getElementById('blood-types-grid');
    
    bloodTypes.forEach(bloodType => {
        const card = document.createElement('div');
        card.className = 'blood-type-card';
        
        card.innerHTML = `
            <div class="blood-type-title">${bloodType.type}</div>
            <p class="blood-type-description">${bloodType.description}</p>
            <div class="compatibility-section">
                <h4 class="compatibility-title">Can Donate To:</h4>
                <div class="compatibility-tags">
                    ${bloodType.canDonateTo.map(type => 
                        `<span class="compatibility-tag donate-tag">${type}</span>`
                    ).join('')}
                </div>
            </div>
            <div class="compatibility-section">
                <h4 class="compatibility-title">Can Receive From:</h4>
                <div class="compatibility-tags">
                    ${bloodType.canReceiveFrom.map(type => 
                        `<span class="compatibility-tag receive-tag">${type}</span>`
                    ).join('')}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Generate donation centers section
function generateDonationCenters() {
    const container = document.getElementById('centers-grid');
    
    donationCenters.forEach(center => {
        const card = document.createElement('div');
        card.className = 'center-card';
        
        card.innerHTML = `
            <h3 class="center-name">${center.name}</h3>
            <p class="center-info">${center.address}</p>
            <p class="center-info">${center.phone}</p>
            <p class="center-info">${center.hours}</p>
        `;
        
        container.appendChild(card);
    });
}

// Generate testimonials section
function generateTestimonials() {
    const slider = document.getElementById('testimonials-slider');
    const dots = document.getElementById('testimonials-dots');
    
    testimonials.forEach((testimonial, index) => {
        // Create testimonial slide
        const slide = document.createElement('div');
        slide.className = `testimonial-slide ${index === 0 ? 'active' : ''}`;
        
        slide.innerHTML = `
            <div class="testimonial-card">
                <div class="testimonial-header">
                    <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-image">
                    <div class="testimonial-info">
                        <h3 class="testimonial-name">${testimonial.name}</h3>
                        <p class="testimonial-donations">${testimonial.donatedTimes} time donor</p>
                    </div>
                </div>
                <blockquote class="testimonial-quote">"${testimonial.quote}"</blockquote>
            </div>
        `;
        
        slider.appendChild(slide);
        
        // Create dot for navigation
        const dot = document.createElement('button');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToTestimonial(index));
        dots.appendChild(dot);
    });
}

// Setup testimonial slider functionality
function setupTestimonialSlider() {
    // Auto-advance testimonials every 5 seconds
    setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(currentTestimonialIndex);
    }, 5000);
}

// Go to specific testimonial
function goToTestimonial(index) {
    currentTestimonialIndex = index;
    showTestimonial(index);
}

// Show specific testimonial
function showTestimonial(index) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Hide all slides and deactivate all dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide and activate current dot
    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
}

// Set current year in footer
function setCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// Utility function to handle errors
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    
    // Show user-friendly error message
    const message = error.message || 'An unexpected error occurred';
    alert(`Error: ${message}`);
}

// Initialize everything when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}