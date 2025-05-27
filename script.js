document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('surveyForm');
    const thankYou = document.getElementById('thankYou');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            confidence: document.querySelector('input[name="confidence"]:checked')?.value,
            satisfaction: document.querySelector('input[name="satisfaction"]:checked')?.value,
            feedback: document.querySelector('textarea[name="feedback"]').value
        };

        try {
            await submitToGitHub(formData);
            form.style.display = 'none';
            thankYou.style.display = 'block';
        } catch (error) {
            console.error('Error submitting survey:', error);
            alert('There was an error submitting your response. Please try again.');
        }
    });
});

async function submitToGitHub(formData) {
    const issue = {
        title: `Survey Response - ${new Date().toISOString()}`,
        body: `
### GitHub Understanding Rating
${formData.confidence}/5

### Session Satisfaction Rating
${formData.satisfaction}/5

### Additional Feedback
${formData.feedback || 'No feedback provided'}
        `
    };

    const response = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/issues`, {
        method: 'POST',
        headers: {
            'Authorization': `token ${GITHUB_CONFIG.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(issue)
    });

    if (!response.ok) {
        throw new Error('Failed to submit survey');
    }

    return response.json();
}

// Character count for feedback
const feedbackInput = document.querySelector('textarea[name="feedback"]');
const charCount = document.querySelector('.character-count');

feedbackInput.addEventListener('input', () => {
    const count = feedbackInput.value.length;
    charCount.textContent = `${count}/200`;
});
