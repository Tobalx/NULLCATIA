INSERT INTO territorios (nombre) VALUES 
('Bosques Binarios'),
('Ríos de Paquetes'),
('Montañas de Índices'),
('Praderas de Pila'),
('Archipiélago de APIs'),
('Cuevas de Caché'),
('Océanos de Objetos'),
('Llanuras de Logs'),
('Valles de Versiones'),
('Nubes de Datos');

INSERT INTO clanes (nombre, territorio_id) VALUES
('Clan Socketpaw', 1),
('Clan Cachewhisker', 2),
('Clan Middleware', 3),
('Clan Whisperpaw', 4),
('Clan Schemaforge', 5),
('Clan Testclaw', 6),
('Clan Rollback', 7),
('Clan Docstring', 8),
('Clan Templatetail', 9),
('Clan Styleshade', 10);

INSERT INTO gatos (nombre, edad, color, clan_id) VALUES
('Felix Socketpaw', 3, 'Gris', 1),
('Serafina Cachewhisker', 4, 'Blanco', 2),
('Captain Middleware', 5, 'Negro', 3),
('Ajax Whisperpaw', 2, 'Naranja', 4),
('Nova Schemaforge', 3, 'Beige', 5),
('Echo Testclaw', 4, 'Azul', 6),
('Orion Rollback', 6, 'Marrón', 7),
('Vega Docstring', 3, 'Plateado', 8),
('Sparkle Templatetail', 5, 'Calicó', 9),
('Luna Styleshade', 4, 'Negro y Blanco', 10);

INSERT INTO pergaminos (titulo, contenido, fecha_creacion) VALUES
('El Conjuro de los Sockets Eternos', 'Guía para mantener el pool activo sin ahogar procesos.', '2025-06-01'),
('Recetas para la Caché Perfecta', 'Algoritmos LRU en memoria felina.', '2025-06-02'),
('Rutas Sagradas del Middleware', 'Filtrado mágico para rutas protegidas.', '2025-06-03'),
('Susurros Asíncronos', 'Cómo invocar fetch y Axios sin mutear la cola.', '2025-06-04'),
('Forja de Esquemas', 'Buenas prácticas de normalización tabular.', '2025-06-05'),
('Garras de Prueba', 'Verificación ancestral con Jest y Supertest.', '2025-06-06'),
('Rituales de Rollback', 'Deshacer fallas sin dejar rastros.', '2025-06-07'),
('Crónicas de Swagger', 'La escritura de rutas en OpenAPI.', '2025-06-08'),
('Patrones de Layouts', 'Estrategias de vistas con parciales EJS.', '2025-06-09'),
('Sombras del Estilo', 'Guías CSS para reinos responsivos.', '2025-06-10');

INSERT INTO lecturas (gato_id, pergamino_id, fecha_lectura) VALUES
(1, 1, '2025-06-11'), -- Felix lee sobre sockets
(2, 2, '2025-06-11'), -- Serafina lee sobre caché
(3, 3, '2025-06-11'), -- Middleware estudia rutas
(4, 4, '2025-06-12'), -- Ajax practica fetch
(5, 5, '2025-06-12'), -- Nova forja esquemas
(6, 6, '2025-06-12'), -- Echo testea todo
(7, 7, '2025-06-13'), -- Orion controla transacciones
(8, 8, '2025-06-13'), -- Vega documenta
(9, 9, '2025-06-14'), -- Sparkle maqueta layouts
(10, 10, '2025-06-14'); -- Luna diseña estilo

