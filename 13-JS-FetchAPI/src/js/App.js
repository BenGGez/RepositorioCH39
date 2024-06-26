/*
//Sincronía, respeta la secuencia
function primerFuncion() {
    console.log("2");
}

function segundaFuncion(){
    console.log("1");
    console.log("3");
    primerFuncion();
}

segundaFuncion();

//Asincronía. Recibimos una función y podemos establecer tiempos de ejecución, para evitar el código secuencial. Este tiempo se establece mediante `setTimeout` que me permite indicar tiempo en milisegundos (1000ms = 1s)
const firstFunction = () => {
    setTimeout(() => {
        console.log(2);
    }, 2500);
}

const secondFunction = () => {
    setTimeout(() => {
        console.log(1);
    }, 5000);
    console.log(3);
    firstFunction();
}

secondFunction();
*/

//Trabajando con promesas mediante FetchAPI
const url = `https://jsonplaceholder.typicode.com/users`;

fetch(url)
    //La función de tipo callback se va a ejecutar siempre que la promesa se resuelva y se convierte en json decodificado
    .then(response => response.json())
    .then(response => {
        console.log(response); //Me trae toda la API (10 registros)
        console.log(response[0]); //Traer el usuario con id 1
        console.log(response[4].name); //Traer el name del usuario con id 5
    })
    .catch(error => console.error("¡No funcionó mi chavo", error)); //Si se rechaza me muestra este mensaje de error

//---- Manipulación del DOM para mostrar en el navegador (GET)
// 1. Guardar los elementos en constantes
const botonInfo = document.querySelector("#button--info");
const contenedorInfo = document.querySelector("#div--info");
// 2. Crear una variable de tipo null donde se va a guardar la info que vamos a traer de la API
let post = null;

// 3. Crear una función que tome la variable post y me permita manipular el DOM. Vamos a crear nodos y vamos a insertarlos en el ParentNode.
//De mi objeto en la API voy a traer las llaves `name, phone, email, username`
const mostrarDatos = (post) => {
    // 3.1 Crear nodos (h2, h3, p, p)
    const name = document.createElement("h2");
    const username = document.createElement("h3");
    const email = document.createElement("p");
    const phone = document.createElement("p");

    // 3.2 Meterles info (innerHTML de las key del objeto)
    name.innerHTML = post.name;
    username.innerHTML = post.username;
    email.innerHTML = post.email;
    phone. innerHTML = post.phone;

    // 3.3 Mostrarlos en navegador al insertarlos en su ParentNode
    contenedorInfo.appendChild(name);
    contenedorInfo.appendChild(username);
    contenedorInfo.appendChild(email);
    contenedorInfo.appendChild(phone);
};

// 4. Consumir API con fetch (método GET) y evento
botonInfo.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/users/8")
        .then(resp => resp.json())
        .then(resp => {
            //Guardo los datos obtenidos de la promesa en mi variable null
            post = resp;
            mostrarDatos(post);
        })
        .catch()
});

//--- Método POST con fetch API
const urlPost = "https://jsonplaceholder.typicode.com/posts";

fetch(urlPost, {
    //Indicamos que esta promesa es de tipo POST
    method: "POST",
    //Definir headers
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    //Definir el body que debe coincidir con mi API, para ello le paso un método stringify que me permite transformar el objeto en formato Json
    body: JSON.stringify({
        userId: 1986,
        id: 25365, //Es autoincrementable, entonces no se visualiza
        title: "un nuevo elemento en la API",
        body: "Estoy enviando un nuevo objeto de tipo JSON a la API de jsonplaceholder utilizando el método POST"
    })
})
    .then(res => res.json())
    .then(res => {
        console.log(res);
    })
    .catch(err => console.error(err))

//--- Programación asíncrona
// En asynch tenemos funciones de tipo async-await
const getUser = async () => {
    try {
        /* Para agregar un delay en mi promesa
        await new Promise(resolve => setTimeout(resolve, 3000));
        */
    
        //Promesa
        const response = await fetch("https://jsonplaceholder.typicode.com/users/8");
        const data = await response.json();
        console.log(data);
    }
    catch(error) {
        console.error("Error en la petición", error);
    }
};

getUser();