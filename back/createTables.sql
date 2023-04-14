CREATE TABLE IF NOT EXISTS users(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20) NOT NULL,
	"email" VARCHAR(100) UNIQUE NOT NULL,
	"password" VARCHAR(120) NOT NULL
);

ALTER TABLE users
ADD COLUMN carrinho INTEGER ARRAY DEFAULT ARRAY[]::INTEGER[] NOT NULL;

ALTER TABLE users
ADD COLUMN admin BOOLEAN NOT NULL DEFAULT FALSE;

select * from users;

create table if not EXISTS products(
	"id" SERIAL primary key,
	"name" varchar(40) not null unique,
	"category" varchar(40) not null,
	"price" INT not null,
	"img" varchar(200) not null
)

select * from products;