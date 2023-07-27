# Proyecto-IIC2513-1-grupo-32

2022-1

Integrantes:

- Agustín Urrutia
- Renato Van de Wyngard
- Martín Zúñiga

[Link a nuestro proyecto](https://grupo32-frontend.herokuapp.com/)

Y no sabemos si les interesa para algo, pero acá está el [link al backend](https://grupo32-backend.herokuapp.com/)

## Entrega 4

Se puede iniciar sesión tanto como usuario normal como usuario vendedor, además de poder crear ambos tipos de usuarios. A estos usuarios se les puede ver el perfil y otras acciones. Para iniciar sesión como usuario normal, el log está en el navbar; mientras que para los vendedores está en el footer. La opción está activa únicamente cuando no se ha iniciado sesión (no puedes tener la sesión de vendedor y comprador activas al ismo tiempo).

- Usuario no logueado:
  - Iniciar sesión como vendedor o comprador
  - Crear usuario
  - Ver publicaciones de restaurantes y sus platos
  - Ver comentarios a restaurantes
- Usuario comprador logueado:
  - Todo lo de usuario no logueado, más:
  - Editar perfil
  - Cerrar sesión
  - Crear, editar, eliminar comentario
  - Reservar una mesa para usar dentro de los proximos días
    - Solo si el vendedor tiene para disponer mesas
    - Puedes seleccionar el tamaño y la hora a reservar
    - Solo puedes reservar a partir del día siguiente y como máximo se puede hacer con una semana de anticipación
    - Las reservas hechas se encuentran en el perfil del usuario
- Usuario vendedor logueado:
  - Todo lo de usuario no logueado, más:
  - Editarperfil, ver perfil
  - Cerrar sesión
  - Crear, editar, eliminar platos

Usuario con el que funciona la aplicación para testear el login:
Usuario:

- mail: user1@test.cl
- contraseña: pass1

Vendedor:

- mail: laburga@uc.cl
- contraseña: pass1

## Configurar Servidor

La aplicación tiene un backend construido en Express.js, para el cual se deben realizar los siguientes pasos si se quiere correr:

1. En la carpeta backend-app deben crear el archivo `.env` que contiene el siguiente código:
   `PORT=8000`
   `DB_USERNAME={your postgres user}`
   `DB_PASSWORD={your postgres password}`
   `DB_DATABASE=web_db`
2. Deben iniciar PostgreSQL en la terminal: `sudo service postgresql start`
3. Deben instalar las dependencias usando el comando `yarn install` en la consola.
4. Para correr el servidor, deben usar el comando `yarn dev`. Si todo funciona bien, en la consola debería imprimirse: `Server listening on port 8000`
5. Creada o no la base de datos, recomendamos seguir el siguiente proceso para el uso de la bdd:
   1. npx sequelize-cli db:drop
   2. npx sequelize-cli db:create
   3. npx sequelize-cli db:migrate
   4. npx sequelize-cli db:seed:all

Otros:
_ Se está trabajando en el chat en vivo
_ La pestaña `nosotros` no tiene nada hasta el minuto
