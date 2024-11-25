'use strict';


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


// Define array for portfolio projects
const projects = [
  {
    title: "Udemy Clone with API integration",
    category: "web development",
    imgSrc: "./assets/images/project1-udemy.png",
    overview: "This project is a Udemy clone built with Vue 3, implementing core functionalities of the original Udemy platform while also introducing additional features. It provides a seamless experience for both students and administrators, including course purchases, article publishing, and more.",
    liveLink: "https://udemy-clone-woad.vercel.app/dashboard",
    githubLink: "https://github.com/AzeemAkhtar1/udemy-clone",
    features: [
      "Student Dashboard: Students can log in to browse and purchase courses.",
      "Admin Dashboard: Admins can approve student purchases and publish articles.",
      "Dynamic Pages: Each course and article has its own dynamic page for better user engagement.",
      "Article Comments: Users can comment on articles to foster discussion.",
      "Shopping Cart: A dedicated cart page for managing course purchases.",
      "Rich Text Editor: Integrated Quill editor for article creation and editing.",
      "2FA Security: Users can enable 2-Factor Authentication (2FA) for enhanced security. Admins can view and manage 2FA settings for all users.",
    ],
  },
  {
    title: "Daraz Ecommerce Store Clone with Payment Integration",
    category: "web development",
    imgSrc: "./assets/images/project2-daraz.png",
    overview: "This project is a functional clone of the popular e-commerce platform Daraz, featuring seamless payment integration. It allows users to browse through a variety of products, filter and search for specific items, and securely complete their purchases.",
    liveLink: "https://daraz-ecommerce-store.vercel.app/",
    githubLink: "https://github.com/AzeemAkhtar1/Daraz-Ecommerce-Store",
    features: [
      "Responsive Design: Optimized for seamless viewing on all devices.",
      "Secure Payments: Safe and reliable transactions through secure payment gateways.",
      "User Authentication: Secure login and access control for user accounts.",
      "Advanced Search: Efficient product search and filtering capabilities.",
      "Admin Dashboard: Intuitive tool for managing orders and other administrative tasks."
    ],
  },
  {
    title: "Appliances Online Clone - Replicating an E-commerce Platform",
    category: "web development",
    imgSrc: "./assets/images/project3-appliancesonline.png",
    overview: "This project is a comprehensive clone of the renowned Appliances Online e-commerce platform. It showcases my ability to replicate a complex and feature-rich website, including its design, functionality, and user experience.",
    liveLink: "https://appliances-online-clone.vercel.app/",
    githubLink: "https://github.com/AzeemAkhtar1/appliances-online-clone",
    features: [
      "Accurate Design Replication: Precisely recreated the original website's layout, color scheme, and visual elements.",
      "Responsive Design: Optimized the design to adapt seamlessly to different screen sizes, from desktop to mobile.",
      "Interactive Elements: Implemented interactive elements like hover effects, dropdown menus, and smooth transitions.",
      "User-Friendly Navigation: Ensured easy navigation through intuitive menus and clear call-to-action buttons.",
    ],
  },
];


// Populate project details on projectDetails.html
function displayProjectDetails() {
  const params = new URLSearchParams(window.location.search);
  const projectTitle = params.get('title');

  const project = projects.find(p => p.title === projectTitle);

  if (project) {
    document.getElementById("projectTitle").textContent = project.title;
    document.getElementById("projectImage").src = project.imgSrc;
    document.getElementById("projectImage").alt = project.title;
    document.getElementById("projectOverview").textContent = project.overview;
    document.getElementById("liveLink").href = project.liveLink;
    document.getElementById("githubLink").href = project.githubLink;
    // Add features list
    const projectFeatures = document.querySelector(".project-features");
    projectFeatures.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
  }
}

// Call this function only on the project details page
if (window.location.pathname.includes("project-details.html")) {
  displayProjectDetails();
}

// Modify existing project list generation code in `index.html` to include links to `projectDetails.html` with title query
const projectContainer = document.querySelector(".project-list");
projectContainer.innerHTML = projects.map(project => `
  <li class="project-item active" data-filter-item data-category="${project.category}">
    <a href="project-details.html?title=${encodeURIComponent(project.title)}">
      <figure class="project-img">
        <div class="project-item-icon-box">
          <ion-icon name="eye-outline"></ion-icon>
        </div>
        <img src="${project.imgSrc}" alt="${project.title}">
      </figure>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-category">${project.category}</p>
    </a>
  </li>
`).join('');


// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
