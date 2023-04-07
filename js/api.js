const comentarios = document.getElementById("comentarios")


fetch('https://jsonplaceholder.typicode.com/comments')

    .then(response => response.json())

    .then(listaUsuarios => listaUsuarios.forEach(user => {
        comentarios.innerHTML += `
        
            <p>ID del comentario: ${user.id}</p>
            <p>Username: ${user.name}</p>
            <p>${user.body}</p>
        
        `
    }))