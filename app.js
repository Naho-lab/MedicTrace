
const DIRECCION_CONTRATO =
    "0x7c42E097999B3FAd3E6A4b52786d308A72b95ab4";

let contrato = null;
let proveedor = null;
let cuentaActual = null;

// ELEMENTOS HTML
const btnConectar = document.getElementById("btnConectar");
const estadoConexion = document.getElementById("estadoConexion");
const mensajeConexion = document.getElementById("mensajeConexion");

const formRegistro = document.getElementById("formRegistro");
const mensajeRegistro = document.getElementById("mensajeRegistro");

const formConsulta = document.getElementById("formConsulta");
const resultadoConsulta = document.getElementById("resultadoConsulta");

// CARGAR ABI
async function cargarABI() {
    const respuesta = await fetch("./RegistroMedicamentosABI.json");

    if (!respuesta.ok) {
        throw new Error("No se pudo cargar el archivo ABI.");
    }

    return await respuesta.json();
}

// CONECTAR CON BLOCKCHAIN
btnConectar.addEventListener("click", async () => {
    try {
        if (!window.ethereum) {
            throw new Error(
                "No se detectó una billetera Web3 en el navegador."
            );
        }

        mensajeConexion.textContent = "Conectando...";

        proveedor = new ethers.BrowserProvider(window.ethereum);

        const cuentas = await proveedor.send(
            "eth_requestAccounts",
            []
        );

        cuentaActual = cuentas[0];

        const ABI = await cargarABI();

        const firmante = await proveedor.getSigner();

        contrato = new ethers.Contract(
            DIRECCION_CONTRATO,
            ABI,
            firmante
        );

        estadoConexion.textContent = "● Billetera conectada";
        estadoConexion.style.background = "#e2f3e9";
        estadoConexion.style.color = "#468765";

        mensajeConexion.textContent =
            "Cuenta conectada: " + cuentaActual;

    } catch (error) {
        mensajeConexion.textContent =
            "No se pudo conectar: " + error.message;

        contrato = null;
    }
});

// REGISTRAR MEDICAMENTO
formRegistro.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!contrato) {
        mensajeRegistro.textContent =
            "Primero debes conectar tu billetera.";
        return;
    }

    try {
        const codigo = document
            .getElementById("codigoCaja").value.trim();

        const lote = document
            .getElementById("numeroLote").value.trim();

        const fecha = document
            .getElementById("fechaVencimiento").value;

        if (!codigo || !lote || !fecha) {
            throw new Error("Completa todos los campos.");
        }

        // Convertir fecha a timestamp Unix en segundos
        const partes = fecha.split("-").map(Number);

        const fechaUnix = Math.floor(
            Date.UTC(partes[0], partes[1] - 1, partes[2]) / 1000
        );

        if (fechaUnix <= Math.floor(Date.now() / 1000)) {
            throw new Error("La fecha debe ser futura.");
        }

        mensajeRegistro.textContent =
            "Enviando registro a Blockchain...";

        const transaccion = await contrato.registrarMedicamento(
            codigo,
            lote,
            fechaUnix
        );

        mensajeRegistro.textContent =
            "Esperando confirmación de la transacción...";

        await transaccion.wait();

        mensajeRegistro.textContent =
            "¡Medicamento registrado correctamente!";

        formRegistro.reset();

    } catch (error) {
        mensajeRegistro.textContent =
            "No se pudo registrar: " +
            (error.reason || error.shortMessage || error.message);
    }
});

// CONSULTAR MEDICAMENTO
formConsulta.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!contrato) {
        resultadoConsulta.textContent =
            "Primero debes conectar tu billetera.";
        return;
    }

    try {
        const codigo = document
            .getElementById("codigoConsulta").value.trim();

        if (!codigo) {
            throw new Error("Ingresa un código de medicamento.");
        }

        resultadoConsulta.textContent =
            "Consultando información...";

        const datos = await contrato.consultarMedicamento(codigo);

        const fecha = new Date(
            Number(datos[2]) * 1000
        ).toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "UTC"
        });

        resultadoConsulta.innerHTML = `
            <h4>Medicamento encontrado</h4>
            <p><strong>Código:</strong> ${escapeHTML(datos[0])}</p>
            <p><strong>Número de lote:</strong> ${escapeHTML(datos[1])}</p>
            <p><strong>Fecha de vencimiento:</strong> ${fecha}</p>
            <p><strong>Registrado:</strong> ${datos[3] ? "Sí" : "No"}</p>
        `;

    } catch (error) {
        resultadoConsulta.textContent =
            "No se pudo consultar: " +
            (error.reason || error.shortMessage || error.message);
    }
});

// PROTEGER LOS TEXTOS MOSTRADOS EN HTML
function escapeHTML(texto) {
    return String(texto).replace(/[&<>"']/g, caracter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caracter]);
}
