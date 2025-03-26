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
