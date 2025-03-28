// Water Conservation Quotes
const quotes = [
    "Water is life, treat it right.",
    "Save water today, survive tomorrow.",
    "Every drop counts. Act now.",
    "Be wise, let’s not compromise our water."
];

function changeQuote() {
    const quoteElement = document.getElementById("quote");
    let randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.innerText = quotes[randomIndex];
}

setInterval(changeQuote, 3000);

// Slideshow
let slideIndex = 0;
function showSlides() {
    let slides = document.querySelectorAll(".slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000);
}

showSlides();


let slideIndex2 = 0;
const slides2 = document.querySelectorAll(".news-slide");
const captions = document.querySelectorAll(".news-caption");

function showSlides2() {
    slides2.forEach((slide) => {
        slide.style.opacity = "0"; // Hide all slides
        slide.style.transform = "translateX(100%)"; // Move off-screen
     

    });

    slides2[slideIndex2].style.opacity = "1"; // Show current slide
    slides2[slideIndex2].style.transform = "translateX(0)"; // Slide it in
    captions.forEach(caption => caption.style.opacity = "0");
    captions[slideIndex2].style.opacity = "1";


    slideIndex2 = (slideIndex2 + 1) % slides2.length; // Fix: Using slides2.length instead of slides.length
    setTimeout(showSlides2, 5000); // Change slide every 5 seconds
}

showSlides2(); // Start news slideshow



// Close Modal When Clicking Outside
window.onclick = function (event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};
window.onload = function () {
    document.getElementById('aboutModal').style.display = "none";
    document.getElementById('faqModal').style.display = "none";
};
function openModal(modalId) {
    let modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex"; // Change to flex for proper centering
    }
}

function closeModal(modalId) {
    let modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}
