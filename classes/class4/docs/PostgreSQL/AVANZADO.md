# Guía de una base de datos de usuarios en PostgreSQL

Esta es una guía avanzada para crear y utilizar una base de datos de usuarios en PostgreSQL. En la tabla siguiente se describen las columnas de la tabla `usuario` y algunos ejemplos de consultas SQL para realizar operaciones comunes.

 
## Consultas SELECT avanzadas

Listar todos los productos de la base de datos en orden alfabético por su nombre.

`````sql
SELECT * FROM producto ORDER BY nombre;
`````

Listar los productos más baratos primero.

`````sql
SELECT * FROM producto ORDER BY precio DESC;
`````

Realizar paginación en la lista de productos utilizando la función LIMIT de PostgreSQL y estableciendo el tamaño de página en 10.

`````sql
SELECT * FROM producto OFFSET 0 LIMIT 10;
`````

Filtrar los productos por una palabra clave en el nombre y listarlos en orden alfabético.

`````sql
SELECT * FROM producto WHERE nombre LIKE '%keyword%' ORDER BY nombre;
`````

Filtrar los productos por un rango de precios y listarlos por precio ascendente.

`````sql
SELECT * FROM producto WHERE precio BETWEEN 10 AND 50 ORDER BY precio ASC;

`````