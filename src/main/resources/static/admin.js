
//para que solo pueda ver la pagina de usuarios y procesado de reservas el admin


fetch('/usuario_actual')
    .then(response => response.text())
    .then(email => {
        if (email === 'admin@gmail.com') {
            document.getElementById('admin').style.display = 'block';
            document.getElementById('admin2').style.display = 'block';

        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
