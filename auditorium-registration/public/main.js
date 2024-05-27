document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
  
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formProps)
      });
  
      const result = await response.text();
      alert(result);
    } catch (error) {
      alert('Error submitting the form');
    }
  });
  