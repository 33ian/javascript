let listaJuegos = [
    {id: 1, nombre: "Red Dead Redemption 2", precio: 11299, anio: 2019, url:"https://image.api.playstation.com/gs2-sec/appkgo/prod/CUSA08519_00/12/i_3da1cf7c41dc7652f9b639e1680d96436773658668c7dc3930c441291095713b/i/icon0.png"},
    {id: 2, nombre: "Sea of Thieves", precio: 3999, anio: 2020, url: "https://www.somosxbox.com/wp-content/uploads/2016/06/sea-of-thieves-cover.jpg"},
    {id: 3, nombre: "Cyberpunk 2077", precio: 3999, anio: 2020, url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Cyberpunk_2077_box_art.jpg/220px-Cyberpunk_2077_box_art.jpg"},
    {id: 4, nombre: "Dark Souls 3", precio: 8599, anio: 2016, url: "https://as.com/meristation/imagenes/2020/04/07/game_cover/136602131586253551.jpg"},
    {id: 5, nombre: "Hades", precio: 1750, anio: 2020, url: "https://tierragamer.com/wp-content/uploads/2022/12/Hadestierragamer.jpg"},
]

const arrEnFormatoJSON = JSON.stringify(listaJuegos)

localStorage.setItem("listaJuegos", arrEnFormatoJSON)

let obtenerListaJSON = localStorage.getItem("listaJuegos")


if(obtenerListaJSON){
    listaJuegos = JSON.parse(obtenerListaJSON)

}else{
    listaJuegos = []
}
