// Character count for feedback
const feedbackInput = document.querySelector('.feedback-input');
const charCount = document.querySelector('.character-count');
if (feedbackInput && charCount) {
    feedbackInput.addEventListener('input', function() {
        let len = feedbackInput.value.length;
        if (len > 200) {
            feedbackInput.value = feedbackInput.value.slice(0, 200);
            len = 200;
        }
        charCount.textContent = `${len}/200`;
    });
}

// Handle form submission
const form = document.getElementById('surveyForm');
const thankYou = document.getElementById('thankYou');
if (form && thankYou) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Optionally, collect data here and send to a backend or GitHub issue, etc.
        form.style.display = 'none';
        thankYou.style.display = 'block';
    });
}
