const comentarios = document.getElementById("comentarios")


fetch('https://jsonplaceholder.typicode.com/users')

    .then(response => response.json())

    .then(listaUsuarios => listaUsuarios.forEach(user => {
        comentarios.innerHTML += `
        
            <p> Username: ${user.username}</p>
            <p> Nombre: ${user.name}</p>
            <p>ID de usuario: ${user.id}</p>
        
        `
    }))