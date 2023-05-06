## Schema (PostgreSQL v15)

    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      stock INTEGER NOT NULL
    );
    
    INSERT INTO products (name, description, price, stock)
    VALUES ('iPhone 9', 'iPhone 9 64GB', 899, 10),
    ('Microsoft Surface Laptop 4','Surface Laptop 4 2-in-1',2500,0),
    ('iPhone 14','iPhone 14 512GB',1400,35);

---

### Query #1
List all products

    SELECT * FROM products;

| id  | name                       | description             | price   | stock |
| --- | -------------------------- | ----------------------- | ------- | ----- |
| 1   | iPhone 9                   | iPhone 9 64GB           | 899.00  | 10    |
| 2   | Microsoft Surface Laptop 4 | Surface Laptop 4 2-in-1 | 2500.00 | 0     |
| 3   | iPhone 14                  | iPhone 14 512GB         | 1400.00 | 35    |

---
### Query #2
List one product by name

    SELECT * FROM products WHERE name like '%Surface%';

| id  | name                       | description             | price   | stock |
| --- | -------------------------- | ----------------------- | ------- | ----- |
| 2   | Microsoft Surface Laptop 4 | Surface Laptop 4 2-in-1 | 2500.00 | 0     |

---
### Query #3
List one product by id

    SELECT * FROM products WHERE id = 3;

| id  | name      | description     | price   | stock |
| --- | --------- | --------------- | ------- | ----- |
| 3   | iPhone 14 | iPhone 14 512GB | 1400.00 | 35    |

---
### Query #4
Update one product

    UPDATE products SET price = 1000 WHERE name = 'iPhone 9';

There are no results to be displayed.

    SELECT * FROM products;

| id  | name                       | description             | price   | stock |
| --- | -------------------------- | ----------------------- | ------- | ----- |
| 2   | Microsoft Surface Laptop 4 | Surface Laptop 4 2-in-1 | 2500.00 | 0     |
| 3   | iPhone 14                  | iPhone 14 512GB         | 1400.00 | 35    |
| 1   | iPhone 9                   | iPhone 9 64GB           | 1000.00 | 10    |

---
### Query #5
Delete one product

    DELETE FROM products WHERE name = 'iPhone 14';

There are no results to be displayed.

    SELECT * FROM products;

| id  | name                       | description             | price   | stock |
| --- | -------------------------- | ----------------------- | ------- | ----- |
| 2   | Microsoft Surface Laptop 4 | Surface Laptop 4 2-in-1 | 2500.00 | 0     |
| 1   | iPhone 9                   | iPhone 9 64GB           | 1000.00 | 10    |

---

[View on DB Fiddle](https://www.db-fiddle.com/)