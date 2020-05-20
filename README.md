# DESAFIO BACKEND DIGITALHOUSE

En este proyecto, te damos una api de tareas **(no terminada)**, en la que te presentamos algunos desafíos.

Por favor lee detenidamente cada uno de los puntos, cualquier duda podes comunicarte con nuestro equipo.

Este test determinará seniority por tiempo y calidad.

## Comienzo

* Esta api debe tener 4 endpoints:
    1. Devuelve todas las tareas.
    2. Crea una tarea.
    3. Actualiza la propiedad **done** de una tarea.
    4. Hace un soft delete de una tarea.

* En la mayoría de los casos, pensar bien la estructura de un proyecto al inicio, facilita muchas cosas a futuro, te pedimos que tengas en cuenta esto, y puedas separar bien las responsabilidades en ciertas capas desacopladas.
* Te pedimos que apliques el concepto **REST** para desarrollar la api.
* Te damos el modelo de datos armado con sequelize pero hay un problema con la conexión a la base de datos **(sqlite)** (si no sabes usar sequelize podés hacer un cambio y usar lo que se ajuste a tu perfil).
* Por alguna razón, el body de los requests http no está llegando a la api. Encuentra la falla.
* Usa async/await para manejar las peticiones a la base de datos.
* Cuando usamos promesas necesitamos tener un buen handler de errores que pueda responder en distintas situaciones.
* Te pedimos que agregues seguridad básica con token. Usar jwt es un plus.
* En la mayoría de las ocasiones, preferimos tener nuestro código cubierto por algunos tests, podés usar mocha, chai, jest, sinon, entre otras librerías. Más coverage es un plus.
* Queremos conocer tu habilidad con docker, crea un Dockerfile que pueda levantar un container y dejar esta api corriendo con pm2. Usar docker-compose es un plus.
* Para saber tus conocimientos de git, te pedimos que lo subas a github, gitlab o el que sea de tu preferencia.

## Levantar el desafío por primera vez

```ssh
$ npm install
$ npm run sequelize db:migrate
$ npm start
```