# Colors API

Breve descripción o introducción de tu aplicación.

## Tecnologías Utilizadas

- [Express](https://expressjs.com/) Utilizado como el framework principal para la construcción de la aplicación de backend. Express ofrece una estructura simple y efectiva para manejar solicitudes HTTP y definir rutas.
- [Sequelize](https://sequelize.org/) ORM de Node.js que facilita la interacción con una base de datos relacional, en este caso, MySQL. Permite la definición de modelos de datos y la realización de consultas de manera legible.
- [MySQL2](https://www.npmjs.com/package/mysql2) Controlador MySQL para Node.js, utilizado para establecer la conexión con la base de datos MySQL y realizar operaciones de consulta de manera eficiente.
- [Jest](https://jestjs.io/) Framework de pruebas utilizado para realizar pruebas unitarias exhaustivas en la aplicación. Jest ofrece una amplia gama de funciones para evaluar el comportamiento del código y garantizar su fiabilidad.
- [Supertest](https://www.npmjs.com/package/supertest) Biblioteca de pruebas que simplifica la realización de pruebas de extremo a extremo para la API HTTP de Node.js. Permite la simulación de solicitudes HTTP y la verificación de respuestas.
- [Dotenv](https://www.npmjs.com/package/dotenv)  Módulo para la gestión de variables de entorno. Se utiliza para la carga de variables de entorno desde un archivo .env, lo que garantiza una gestión eficiente de la configuración de la aplicación en diferentes entornos.
- y otras

## Instalación

1. Clona este repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Configura tus variables de entorno en un archivo `.env` en la raíz del proyecto.

## Ejecución del Proyecto

- Ejecuta `npm start` para iniciar el servidor en modo de desarrollo.
- Ejecuta `npm test` para ejecutar las pruebas.

## URL de Producción

_(Opcional)_ Inserta aquí la URL de producción si la aplicación está desplegada.

## Poblar la Base de Datos de Desarrollo

1. Asegúrate de que la base de datos esté configurada correctamente en tu entorno de desarrollo.
2. Ejecuta el siguiente comando para poblar la base de datos con datos de prueba: `npm run db:seed`
Esto generará datos de prueba predeterminados. También puedes especificar la cantidad de datos a generar ingresando un número después del comando, por ejemplo: `npm run db:seed 40`
Esto generará 40 registros en la base de datos.

