# MedicTrace
## Sistema de trazabilidad y verificación de medicamentos mediante Blockchain

### 1. Descripción del proyecto

MedicTrace es un prototipo de aplicación web que utiliza tecnología Blockchain para registrar y consultar información básica de medicamentos. Su finalidad es demostrar cómo un contrato inteligente puede contribuir a mantener la integridad y trazabilidad de los registros.

El sistema almacena información como el código de caja, número de lote y fecha de vencimiento, permitiendo consultar posteriormente los datos registrados.

### 2. Objetivos

- Implementar un contrato inteligente utilizando Solidity.
- Registrar información de medicamentos en Blockchain.
- Consultar los registros mediante una interfaz web.
- Aplicar mecanismos de control de acceso para restringir el registro a una cuenta autorizada.
- Demostrar la interacción entre una aplicación web, MetaMask y la red Sepolia.

### 3. Tecnologías utilizadas

| Tecnología | Utilidad |
|---|---|
| Solidity | Desarrollo del contrato inteligente |
| Remix IDE | Compilación, pruebas y despliegue |
| Ethereum Sepolia | Red de pruebas Blockchain |
| MetaMask | Conexión y autorización de transacciones |
| HTML | Estructura de la interfaz |
| CSS | Diseño visual |
| JavaScript | Lógica e interacción con Blockchain |
| Ethers.js | Comunicación con el contrato inteligente |
| GitHub | Almacenamiento y control del código fuente |

### 4. Arquitectura del sistema

El funcionamiento general sigue este flujo:

1. El usuario ingresa a la interfaz web MedicTrace.
2. Conecta su billetera mediante MetaMask.
3. La aplicación utiliza Ethers.js para comunicarse con el contrato inteligente.
4. El contrato valida los permisos y los datos recibidos.
5. La información autorizada se almacena en la red Sepolia.
6. El usuario puede consultar los medicamentos registrados.

### 5. Funcionalidades principales

**Registro de medicamentos**

Permite registrar:
- Código de caja.
- Número de lote.
- Fecha de vencimiento.

**Consulta de medicamentos**

Permite buscar un medicamento mediante su código de caja y visualizar su información registrada.

**Control de acceso**

El contrato inteligente establece una cuenta administradora y una cuenta de laboratorio autorizada para realizar registros.

### 6. Contrato inteligente

- Nombre: `RegistroMedicamentos`
- Lenguaje: Solidity.
- Versión del compilador: 0.8.34.
- Red: Sepolia Testnet.
- Dirección del contrato: `0x7c42E097999B3FAd3E6A4b52786d308A72b95ab4`

Enlaces de verificación:

- [Sourcify](https://repo.sourcify.dev/11155111/0x7c42E097999B3FAd3E6A4b52786d308A72b95ab4/)
- [Blockscout](https://eth-sepolia.blockscout.com/address/0x7c42E097999B3FAd3E6A4b52786d308A72b95ab4?tab=contract)

### 7. Estructura del proyecto

```text
MedicTrace/
│
├── index.html
├── styles.css
├── app.js
├── RegistroMedicamentosABI.json
└── README.md
```

### 8. Pruebas realizadas

| Prueba | Resultado |
|---|---|
| Compilación del contrato inteligente | Exitosa |
| Despliegue en Sepolia | Exitoso |
| Registro de MED002 desde Remix | Exitoso |
| Consulta de MED002 desde Remix | Exitosa |
| Consulta desde la interfaz web | Exitosa |
| Registro de MED004 desde la interfaz web | Exitoso |
| Consulta de MED004 desde la interfaz web | Exitosa |
| Intento de registro con cuenta no autorizada en Remix VM | Rechazado |

La prueba de acceso no autorizado en Sepolia presentó una transacción fallida, pero no se confirmó de forma independiente el motivo exacto del rechazo. La validación del permiso se comprobó en Remix VM.

### 9. Ejecución del proyecto

1. Descargar o clonar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Iniciar un servidor local desde la terminal:

```bash
py -m http.server 5500
```

4. Abrir en el navegador:

```text
http://localhost:5500
```

5. Conectar MetaMask utilizando la red Sepolia.
6. Utilizar las opciones de registro y consulta.

### 10. Limitaciones

MedicTrace es un prototipo académico. No constituye un sistema oficial de certificación de medicamentos ni cuenta con integración con DIGEMID.

Actualmente registra y consulta información básica de medicamentos. No implementa el seguimiento completo de cada etapa de distribución, ni la gestión de múltiples laboratorios independientes.

### 11. Uso de inteligencia artificial

Durante el desarrollo del proyecto se utilizó ChatGPT como herramienta de apoyo para comprender conceptos de Solidity, revisar el contrato inteligente, resolver errores de implementación, elaborar la interfaz web y organizar la documentación.

La implementación, ejecución de pruebas, despliegue y revisión de resultados fueron realizados por el equipo del proyecto.

**Ejemplos de prompts utilizados:**

- ¿Cómo desarrollar un contrato inteligente en Solidity para registrar y consultar medicamentos?
- ¿Cómo implementar control de acceso para permitir que solamente una cuenta autorizada registre medicamentos?
- ¿Cómo conectar una interfaz HTML, CSS y JavaScript con un contrato inteligente mediante Ethers.js y MetaMask?
- ¿Cómo realizar pruebas de registro, consulta y control de acceso en Remix?
- ¿Cómo documentar un proyecto de trazabilidad de medicamentos basado en Blockchain?

La inteligencia artificial fue utilizada como herramienta de asistencia y no como sustituto de la revisión y validación del proyecto.

---

**Proyecto académico: MedicTrace**  
**Tema:** Uso de Blockchain para la Trazabilidad y Verificación de Medicamentos en el Perú.
