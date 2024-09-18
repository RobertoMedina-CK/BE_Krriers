
-- mysql
-- SELECT * FROM cajeros WHERE nombre=? AND password=?

create table cajeros (
    id int primary key auto_increment,
    nombre varchar(50) not null,
    password varchar(50) not null
);

-- create a user for cajeros
insert into cajeros (nombre, password) values ('admin', 'admin');

create table transportistas (
    id int primary key auto_increment,
    telefono varchar(50) not null,
    nombre varchar(50) not null,
    dot varchar(50) not null,
    margen varchar(50) not null
);

insert into transportistas (telefono, nombre, dot, margen) values ('1234567890', 'transportista1', 'dot1', 'margen1');
insert into transportistas (telefono, nombre, dot, margen) values ('+19564265280', 'Carlos Amic', '555', '10');


create table pedidos (
    id int primary key auto_increment,
    lot varchar(50)  null,
    nombre varchar(50)  null,
    telefono varchar(50)  null,
    buyer varchar(50)  null,
    pin varchar(50)  null,
    precio varchar(50)  null,
    anio varchar(50)  null,
    marca varchar(50)  null,
    modelo varchar(50)  null,
    deposito varchar(50)  null,
    subasta varchar(50)  null,
    fecha varchar(50)  null,
    direccion varchar(50)  null,
    color varchar(50)  null,
    notas varchar(50)  null,
    estado varchar(50)  null,
    nombrecarrier varchar(50)  null
);

insert into pedidos (lot,nombre,telefono,buyer,pin,precio,anio,marca,modelo,deposito,subasta,fecha,direccion,color,notas,estado) values ('lot1', 'nombre1', 'telefono1', 'buyer1', 'pin1', 'precio1', 'anio1', 'marca1', 'modelo1', 'deposito1', 'subasta1', 'fecha1', 'direccion1', 'color1', 'notas1', 'estado1');