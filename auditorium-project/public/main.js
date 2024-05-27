document.addEventListener('DOMContentLoaded', async () => {
    try {
        const auditoriumName = 'Alba Arcade Auditorium'; // Specify the auditorium name here or dynamically fetch it
        const response = await axios.get(`http://localhost:3000/api/auditorium?name=${auditoriumName}`);
        const auditorium = response.data;

        document.title = auditorium.auditoriumName || 'Auditorium';
        document.getElementById('auditoriumName').textContent = auditorium.auditoriumName || 'Auditorium';
        document.getElementById('description').textContent = auditorium.description || 'No description available.';
        document.getElementById('location').textContent = auditorium.address || 'No location available.';
        document.getElementById('emailLink').textContent = auditorium.email || 'No email available.';
        document.getElementById('emailLink').href = `mailto:${auditorium.email}`;
        document.getElementById('mobile').textContent = auditorium.mobile || 'No mobile number available.';

        document.getElementById('image1').src = auditorium.image1 || 'default-image1.jpg';
        document.getElementById('image2').src = auditorium.image2 || 'default-image2.jpg';
        document.getElementById('image3').src = auditorium.image3 || 'default-image3.jpg';

        let slideIndex = 0;
        showSlides();

        function showSlides() {
            const slides = document.getElementsByClassName("mySlides");
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1; }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 3000); // Change image every 3 seconds
        }
    } catch (error) {
        console.error('Error fetching auditorium data:', error);
    }
});
