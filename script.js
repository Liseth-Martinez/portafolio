// USUARIO DE GITHUB
const usuario = "Liseth-Martinez";

// ELEMENTOS DE LA PÁGINA
const foto = document.getElementById("fotoPerfil");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const perfil = document.getElementById("perfilGitHub");
const contenedor = document.getElementById("contenedorRepos");

// CARGAR INFORMACIÓN DEL PERFIL
async function cargarPerfil() {

    const respuesta = await fetch(
        `https://api.github.com/users/${usuario}`
    );

    const datos = await respuesta.json();

    foto.src = datos.avatar_url;
    nombre.textContent = datos.name || datos.login;
    descripcion.textContent = datos.bio || "Estudiante y desarrollador.";
    
    perfil.href = datos.html_url;

    document.getElementById("enlaceFooter").href = datos.html_url;
}

// CARGAR REPOSITORIOS
async function cargarRepositorios() {

    const respuesta = await fetch(
        `https://api.github.com/users/${usuario}/repos?sort=updated&per_page=100`
    );

    const repositorios = await respuesta.json();

    contenedor.innerHTML = "";

    repositorios.forEach(repo => {

        const tarjeta = document.createElement("div");

        tarjeta.className = "tarjeta";

        tarjeta.innerHTML = `
            <h3><i class="fas fa-folder"></i> ${repo.name}</h3>

            <p>${repo.description || "Sin descripción disponible"}</p>

            <p><i class="fas fa-code"></i>
            ${repo.language || "No especificado"}</p>

            <button class="btnInfo">Más información</button>

            <br><br>

            <a href="${repo.html_url}" target="_blank">
                Ver repositorio <i class="fas fa-arrow-up-right-from-square"></i>
            </a>
        `;

        // VENTANA DE DIÁLOGO
        tarjeta.querySelector(".btnInfo").addEventListener("click", () => {

            document.getElementById("detalleProyecto").textContent =
                "Proyecto: " + repo.name +
                ". Descripción: " +
                (repo.description || "Sin descripción");

            document.getElementById("ventana").showModal();

        });

        contenedor.appendChild(tarjeta);

    });
}

// CERRAR VENTANA
document.getElementById("cerrarVentana").addEventListener("click", () => {
    document.getElementById("ventana").close();
});

// EJECUTAR FUNCIONES
cargarPerfil();
cargarRepositorios();
