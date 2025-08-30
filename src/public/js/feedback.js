/* src/public/js/feedback.js
   Handles the “Submit Feedback” form
----------------------------------------------------------------- */

console.log('feedback.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  // Works even if the script is included site-wide
  const form = document.querySelector('form[action="/api/feedback"]');
  if (!form) return;                       // not on the contact-us page

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form is being submitted…');

    const data = {
      name   : document.getElementById('name')    ?.value.trim(),
      email  : document.getElementById('email')   ?.value.trim(),
      subject: document.getElementById('subject') ?.value.trim(),
      message: document.getElementById('message') ?.value.trim(),
    };

    // basic front-end guard
    if (!data.name || !data.email || !data.subject || !data.message) {
      alert('All fields are required.');
      return;
    }

    try {
      const res = await fetch('/api/feedback', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(data)
      });

      if (res.ok) {
        alert('Thank you for your feedback!');
        form.reset();
      } else {
        const { message } = await res.json().catch(() => ({}));
        throw new Error(message || 'Server error');
      }
    } catch (err) {
      console.error(err);
      alert(`Failed to submit feedback: ${err.message}`);
    }
  });
});
