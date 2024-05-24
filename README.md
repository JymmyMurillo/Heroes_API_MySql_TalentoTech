# API de Heroes

Esta es una API simple para gestionar una lista de heroes. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una base de datos.

## Requisitos

- Node.js (V14 o superior)
- nmp (V6 o superior)
- Una base de datos MySql

## Instalacion

1. Clona el repositorio:
```sh
git clone https://github.com/JymmyMurillo/Heroes_API_MySql_TalentoTech.git
```
2. Instalar dependencias:
```sh
npm install
```

3. Configura la base de datos:
- Crea una base de datos en MySQL.
- Ejecuta el siguiente script SQL para crear la tabla necesaria:

```sh
CREATE TABLE heroes_list (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL
);
```

4. Configura la conexión a la base de datos:

- Crea un archivo database.js en el directorio raíz del proyecto y añade la configuración de la base de datos:
javascript

```sh
const mysql = require("promise-mysql");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.host,
  database: process.env.database,
  user: process.env.user,
  password: process.env.password,
});

const getConnection = async () => await connection;

module.exports = {
  getConnection,
};

```
 5. Configura un nuevo archivo .env

 ```sh
 HOST=colocaElHostName
DATABASE=ColocaElNombreDeBaseDeDatos
USER=colocaNombreDeUsusario
PASSWORD=colocaContraseña

```

## Uso
1. Inicia el servidor:

```sh
npm run dev
```
2. La API estará disponible en http://localhost:3000.

## Endpoints
1. Obtener todos los héroes
- URL: /heroes
- Método: GET
- Descripción: Obtiene una lista de todos los héroes.
- Respuesta:
```sh
[
  {
    "id": 1,
    "name": "Superman",
    "image": "https://example.com/superman.jpg"
  },
  ...
]
```

2. Obtener un héroe por ID
- URL: /heroes/:id
- Método: GET
- Descripción: Obtiene un héroe específico por su ID.
- Respuesta:
```sh
{
  "id": 1,
  "name": "Superman",
  "image": "https://example.com/superman.jpg"
}
```
3. Crear un nuevo héroe
- URL: /heroes
- Método: POST
- Descripción: Crea un nuevo héroe.
- Cuerpo de la solicitud:
```sh
{
  "name": "Nombre del héroe",
  "image": "URL de la imagen del héroe"
}
```
- Respuesta:
```sh
{
  "id": 6,
  "name": "Nombre del héroe",
  "image": "URL de la imagen del héroe"
}
```
4. Actualizar un héroe existente
- URL: /heroes/:id
- Método: PUT
- Descripción: Actualiza los datos de un héroe existente.
- Cuerpo de la solicitud:
```sh
{
  "name": "Nuevo nombre del héroe",
  "image": "Nueva URL de la imagen del héroe"
}
```
- Respuesta:
```sh
{
  "id": 1,
  "name": "Nuevo nombre del héroe",
  "image": "Nueva URL de la imagen del héroe"
}
```
5. Eliminar un héroe
 - URL: /heroes/:id
 - Método: DELETE
 - Descripción: Elimina un héroe por su ID.
 - Respuesta:
```sh
{
  "message": "Héroe eliminado"
}
```


## Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.





