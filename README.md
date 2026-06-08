AutoRent

Aplicación web para alquiler de vehículos desarrollada con React, Spring Boot y MySQL/H2.

Tecnologías utilizadas

Frontend

- React
- React Router
- CSS

Backend

- Spring Boot
- Spring Data JPA
- Spring Security
- Hibernate
- Lombok

Base de datos

- MySQL / H2

---

Instalación y ejecución

Backend

1. Abrir el proyecto backend en IntelliJ IDEA.
2. Configurar la base de datos en "application.properties".
3. Ejecutar la clase principal:

BackendApplication

El servidor quedará disponible en:

 http://localhost:8080
 
---

Frontend

1. Abrir el proyecto frontend.

2. Instalar dependencias:

npm install

3. Ejecutar:

npm start

La aplicación quedará disponible en:

http://localhost:3000

---

Configuración de la base de datos

Configurar los siguientes parámetros en:

src/main/resources/application.properties

Ejemplo:

spring.datasource.url=jdbc:mysql://localhost:3306/autorent
spring.datasource.username=root
spring.datasource.password=tu_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

---

Funcionalidades implementadas

Usuarios

- Registro de usuarios.
- Inicio de sesión.
- Edición de perfil.
- Roles de administrador.

Productos (Vehículos)

- Listado de vehículos.
- Detalle de vehículo.
- Filtrado por categorías.
- Vehículos recomendados.
- Gestión de productos desde administración.

Reservas

- Crear reservas.
- Visualizar historial de reservas.
- Consulta de reservas por usuario.

Favoritos

- Agregar vehículos a favoritos.
- Eliminar favoritos.
- Listado de favoritos del usuario.

Valoraciones

- Visualización de reseñas y puntuaciones de vehículos.

Administración

- Alta de productos.
- Modificación de productos.
- Eliminación de productos.
- Gestión de categorías y características.

---

Endpoints principales

Usuarios

POST /users/register
POST /users/login
PUT /users/{id}
GET /users

Productos

GET /products
GET /products/{id}
POST /products
PUT /products/{id}
 DELETE /products/{id}

 Reservas

GET /reservations/{userId}
POST /reservations

Favoritos

GET /favorites
POST /favorites
DELETE /favorites/{id}

---

Cómo probar la aplicación

1. Registrar un usuario.
2. Iniciar sesión.
3. Explorar vehículos disponibles.
4. Agregar vehículos a favoritos.
5. Realizar una reserva.
6. Consultar el historial de reservas.
7. Acceder al panel de administración con un usuario administrador.


Mejoras implementadas

Durante la etapa de corrección y refactorización del proyecto se realizaron las siguientes mejoras:

Backend

- Implementación de DTOs para User, Product, Category y Feature.
- Validaciones utilizando Jakarta Validation ("@NotBlank", "@NotNull", "@Positive", "@Email", "@Size").
- Centralización del manejo de errores mediante "GlobalExceptionHandler".
- Cifrado de contraseñas utilizando BCrypt.
- Configuración de Spring Security.
- Configuración de CORS restringiendo los orígenes permitidos.
- Mejora en la estructura de servicios y controladores.

Frontend

- Validaciones en formularios administrativos.

Seguridad

- Protección de rutas sensibles.
- Control de acceso para funcionalidades de usuarios registrados.
- Preparación de la estructura para gestión de roles y permisos.


---

Autor

Proyecto desarrollado como trabajo final del curso Professional Developer.