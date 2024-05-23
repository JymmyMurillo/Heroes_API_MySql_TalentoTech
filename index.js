const express = require("express");
const app = express();
const port = 3000;
const database = require("./database");

// Datos de héroes con imágenes
/* const heroes = [
    { id: 1, name: 'Superman', image: 'https://example.com/superman.jpg' },
    { id: 2, name: 'Batman', image: 'https://example.com/batman.jpg' },
    { id: 3, name: 'Wonder Woman', image: 'https://example.com/wonderwoman.jpg' },
    { id: 4, name: 'Flash', image: 'https://example.com/flash.jpg' },
    { id: 5, name: 'Aquaman', image: 'https://example.com/aquaman.jpg' }
]; */

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Middleware para parsear JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Héroes");
});

// Obtener todos los héroes
app.get("/heroes", async(req, res) => {
    const connection = await database.getConnection();
    const result = await connection.query("SELECT * from heroes_list");
    res.json(result);
});

// Obtener un héroe por ID
app.get("/heroes/:id", (req, res) => {
  const hero = heroes.find((h) => h.id === parseInt(req.params.id));
  if (!hero) return res.status(404).send("El héroe no fue encontrado");
  res.json(hero);
});

// Crear un nuevo héroe
app.post("/heroes", (req, res) => {
  const newHero = {
    id: heroes.length + 1,
    name: req.body.name,
    image: req.body.image,
  };
  heroes.push(newHero);
  res.status(201).json(newHero);
});

// Actualizar un héroe existente
app.put("/heroes/:id", (req, res) => {
  const hero = heroes.find((h) => h.id === parseInt(req.params.id));
  if (!hero) return res.status(404).send("El héroe no fue encontrado");

  hero.name = req.body.name;
  hero.image = req.body.image;
  res.json(hero);
});

// Eliminar un héroe
app.delete("/heroes/:id", (req, res) => {
  const heroIndex = heroes.findIndex((h) => h.id === parseInt(req.params.id));
  if (heroIndex === -1)
    return res.status(404).send("El héroe no fue encontrado");

  const deletedHero = heroes.splice(heroIndex, 1);
  res.json(deletedHero);
});
