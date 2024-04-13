document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('.form');

    if(form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            console.log(form)
            const formData = new FormData(form); // Create a new FormData object
            const data = Object.fromEntries(formData); // Convert formData to an object
            const {from, departure, fromDate, toDate} = data;
            //console.log(from, departure, fromDate, toDate);
            
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            window.location.href = `/trip/details/?from=${from}&departure=${departure}&fromDate=${fromDate}&toDate=${toDate}`
        });
    } else {
        console.error('Form not found');
    }
});