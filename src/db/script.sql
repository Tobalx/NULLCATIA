-- Tabla: Territorios
CREATE TABLE territorios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla: Clanes
CREATE TABLE clanes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    territorio_id INT NOT NULL,
    FOREIGN KEY (territorio_id) REFERENCES territorios(id)
);

-- Tabla: Gatos
CREATE TABLE gatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INT,
    color VARCHAR(50),
    clan_id INT NOT NULL,
    FOREIGN KEY (clan_id) REFERENCES clanes(id)
);

-- Tabla: Pergaminos
CREATE TABLE pergaminos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_creacion DATE
);

-- Tabla: Lecturas (relación N:M entre gatos y pergaminos)
CREATE TABLE lecturas (
    gato_id INT NOT NULL,
    pergamino_id INT NOT NULL,
    fecha_lectura DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY (gato_id, pergamino_id),
    FOREIGN KEY (gato_id) REFERENCES gatos(id),
    FOREIGN KEY (pergamino_id) REFERENCES pergaminos(id)
);
