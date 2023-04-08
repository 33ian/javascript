const comentarios = document.getElementById("comentarios")


fetch('https://jsonplaceholder.typicode.com/users')

    .then(response => response.json())

    .then(listaUsuarios => listaUsuarios.forEach(user => {
        comentarios.innerHTML += `
        <div class="vertical">
            <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg" alt="avatar" class="foto-perfil">
            <p> Username: ${user.username} </p> 
            <p> Nombre: ${user.name} </p>
            <p> ID de usuario: ${user.id} </p>
        </div>
        `
    }))