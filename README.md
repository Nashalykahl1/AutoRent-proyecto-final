AUTORENT 🚗

Descripción:

*AutoRent es una aplicación full stack desarrollada con React y Spring Boot para la gestión y reserva de vehículos.

*El proyecto permite:

*Registro e inicio de sesión de usuarios

*Gestión de productos (autos)

*Sistema de favoritos

*Sistema de reseñas

*Reservas

*Panel de administración

*Seguridad con Spring Security

*Contraseñas encriptadas con BCrypt

TECNOLOGÍAS UTILIZADAS:

Frontend

*React

*React Router

*CSS

*Fetch API

*LocalStorage

----

Backend

*Java 17

*Spring Boot

*Spring Data JPA

*Spring Security

*H2 Database

*Maven

*Lombok


CÓMO EJECUTAR EL PROYECTO:

Backend

1. Abrir la carpeta backend en IntelliJ IDEA o VS Code.

2. Verificar que Java 17 esté instalado.

3. Instalar dependencias Maven:
mvn clean install

4. Ejecutar la aplicación Spring Boot.

5. El backend correrá en:
http://localhost:8080


---

Frontend

1. Abrir la carpeta frontend.

2. Instalar dependencias:
npm install

3. Ejecutar React:
npm start

4. El frontend correrá en:
http://localhost:3000


BASE DE DATOS:

El proyecto utiliza H2 Database.

Consola H2
http://localhost:8080/h2-console

Configuración

JDBC URL:
jdbc:h2:file:./data/autosdb

User:
sa

Password:
(vacío)


FUNCIONALIDADES IMPLEMENTADAS:

Usuarios

Registro

Login

Actualización de usuario

Roles de administrador

Contraseñas encriptadas con BCrypt

Validaciones con @Valid



---

Productos

Listado de productos
Productos recomendados
Productos aleatorios
Crear producto
Editar producto
Eliminar producto
Relación JPA con categorías

---

Favoritos

Agregar favoritos
Eliminar favoritos
Persistencia en base de datos
Relación con usuario

---

Reseñas

Crear reseñas
Consultar reseñas por producto
Persistencia backend

---

Reservas

Crear reservas
Consultar reservas por usuario
Persistencia backend

---

Seguridad

El proyecto utiliza Spring Security.
Características
Protección de rutas
Endpoints configurados por permisos
Contraseñas encriptadas
Validaciones backend
DTOs para proteger información sensible
Manejo global de excepciones

---

Arquitectura

El backend está organizado utilizando arquitectura en capas:
Controller
Service
Repository
Model
DTO
Config
Exception

---

Endpoints principales

Usuarios
POST /users/register
POST /users/login
PUT /users/{id}

Productos
GET /products
GET /products/random
GET /products/recommended
POST /products
PUT /products/{id}
DELETE /products/{id}

Favoritos
GET /favorites/{userId}
POST /favorites
DELETE /favorites/{id}

Reviews
GET /reviews/{productId}
POST /reviews

Reservas
GET /reservations/{userId}
POST /reservations


