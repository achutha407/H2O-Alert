document.getElementById("feedbackForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let feedback = document.getElementById("feedback").value;

    if (name && email && feedback) {
        let feedbackData = {
            name: name,
            email: email,
            feedback: feedback,
            timestamp: new Date().toLocaleString()
        };

        // Store in Local Storage
        let allFeedback = JSON.parse(localStorage.getItem("feedbackList")) || [];
        allFeedback.push(feedbackData);
        localStorage.setItem("feedbackList", JSON.stringify(allFeedback));

        // Show Confirmation Message
        document.getElementById("confirmationMessage").innerText = "Thank you for your feedback! ✅";
        
        // Clear form
        document.getElementById("feedbackForm").reset();
    }
});
