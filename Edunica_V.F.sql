create database edunica
use edunica
go

select * from usuarios


create table usuarios
(
id_usuario int primary key identity(1,1) not null,
nombre varchar(150) not null, --Nombres y apellidos completos--
correo varchar(150) unique not null,
rol varchar(50) not null check (lower(rol) in ('docente', 'estudiante', 'comunidad')), --No admite otros roles que no esten declarados--
fecha_registro datetime2 not null --creacion de la cuenta--
);

--insert into usuarios(nombre,correo,rol,fecha_registro)
--values('Alex Jeremy Araica Mendoza','axel.araica22@gmail.com','Estudiante',GETDATE())	--Getdate, toma los datos automaticamente--

create table relatos
(
id_relato int primary key identity(1,1) not null,
titulo varchar(150) not null, --nombre de relato--
descripcion text null, --Breve sipnosis--
tipo_contenido nvarchar(50) not null check (lower(tipo_contenido) in ('texto', 'imagen', 'audio','video')),	--formato especifico del relato--
url_contenido varchar(300) not null,
fecha_public datetime2,
id_usuario int not null,
id_ubicacion int not null,
foreign key(id_usuario) references usuarios(id_usuario),
foreign key(id_ubicacion) references ubicaciones(id_ubicacion),
);

create table ubicaciones
(
id_ubicacion int primary key identity(1,1) not null,
nombre varchar(100) not null,
tipo varchar (50)  not null check (lower(tipo) in ('barrio', 'municipio', 'comunidad')),
--No utilizar comas ni comillas al ingresar latitud y longitud--
latitud decimal(10,8), 
longitud decimal(11,8)
);

create table eventos_culturales
(
id_evento int primary key identity(1,1) not null,
nombre_evento varchar(150) not null,
descripcion text not null,
fecha_inicio date not null,
fecha_fin date not null,
id_ubicacion int not null,
foreign key(id_ubicacion) references ubicaciones(id_ubicacion),
);

create table saberes_populares
(
id_saber int primary key identity(1,1) not null,
titulo varchar(150) not null,
descripcion text not null,
categoria  nvarchar (50)  not null check (lower(categoria) in ('receta', 'constumbre', 'remedio','oficio','creencia','juego')),
fuente nvarchar (150) not null,
id_usuario int not null,--autor--
foreign key(id_usuario) references usuarios(id_usuario),-- hace referencia al  autor--
)

create table juegos_didacticos
(
id_juego int primary key identity (1,1) not null,
nombre nvarchar(150) not null,
descripcion text not null,--instrucciones o tipo de contenido--
--Identificar el enfoque cultural, histórico o pedagógico del juego.--
tema nvarchar(50) not null check (lower(tema) in ('identidad', 'valores', 'soberania','historia')),
dificultad varchar(50) not null check (lower(dificultad) in ('facil', 'media', 'dificil'))
);

create table participaciones_juego
(
id_participacion int primary key identity(1,1) not null,
id_usuario int not null,--participantes--
foreign key(id_usuario) references usuarios(id_usuario),
id_juego int not null,--juego realizado--
foreign key(id_juego) references juegos_didacticos(id_juego),
fecha datetime2 not null,
puntuja int not null,--Puntos obtenidos--
);

create table comentarios
(
id_comentario int primary key identity(1,1) not null,
contenido text not null,
fecha datetime2,--publicacion--
id_usuario int not null,--autor del comenterio--
foreign key(id_usuario) references usuarios(id_usuario),-- hace referencia al  autor del comentario--
--relato,saber,evento--
tipo_objeto nvarchar(50) not null check (lower(tipo_objeto) in ('Relato', 'saber', 'evento')),
id_objeto int not null,
);

create table multimedia_extra
(
id_archivo int primary key identity(1,1) not null,
tipo nvarchar(50) not null  check (lower(tipo) in ('imagen', 'audio', 'video','documento')),
--- Siempre encerrá el URL entre comillas simples '...' al insertarlo--
url_archivo nvarchar(300),
id_relato int not null, 
id_saber int not null
);

create table categorias_culturales
(
id_categoria int primary key identity(1,1) not null,
nombre nvarchar(100) not null,
descripcion text not null
);


alter table relatos
add id_categoria int not null,
foreign key (id_categoria) references categorias_culturales(id_categoria);

alter table saberes_populares
add id_categoria int not null,
foreign key (id_categoria) references categorias_culturales(id_categoria);

alter table eventos_culturales
add id_categoria int not null,

foreign key (id_categoria) references categorias_culturales(id_categoria);

ALTER TABLE multimedia_extra
ADD FOREIGN KEY (id_relato) REFERENCES relatos(id_relato);
