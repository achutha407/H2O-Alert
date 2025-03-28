document.addEventListener("DOMContentLoaded", function () {
    let stories = document.querySelectorAll(".story");
    let dots = document.querySelectorAll(".dot");
    let index = 0;

    function showStory(n) {
        stories.forEach((story, i) => {
            story.style.display = i === n ? "block" : "none";
            dots[i].classList.toggle("active", i === n);
        });
    }

    function nextStory() {
        index = (index + 1) % stories.length;
        showStory(index);
    }

    setInterval(nextStory, 5000); // Auto-switch every 5 sec
    showStory(index);
});