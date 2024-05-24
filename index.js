const express = require("express");
const app = express();
const port = 3000;
const database = require("./database");

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
app.get("/heroes", async (req, res) => {
  const connection = await database.getConnection();
  const result = await connection.query("SELECT * from heroes_list");
  res.json(result);
});

// Obtener un héroe por ID
app.get("/heroes/:id", async (req, res) => {
  try {
    const connection = await database.getConnection();
    const result = await connection.query(
      "SELECT * from heroes_list WHERE id = ?",
      req.params.id
    );
    if (result.length === 0)
      return res.status(404).send("El héroe no fue encontrado");
    res.json(result);
  } catch (error) {
    res.status(500).send("Error al buscar el heroe");
  }
});

// Crear un nuevo héroe
app.post("/heroes", async (req, res) => {
  const { name, image } = req.body;

  // validacion de campos
  if (
    !name ||
    !image ||
    typeof name !== "string" ||
    typeof image !== "string" ||
    name.trim() === "" ||
    image.trim() === ""
  ) {
    return res
      .status(400)
      .send(
        "El nombre y la imagen son campos obligatorios, no pueden ir vacios"
      );
  }

  try {
    const connection = await database.getConnection();
    const result = await connection.query(
      "INSERT INTO heroes_list (name, image) VALUES (?, ?)",
      [name, image]
    );
    const newHero = { name, image };
    res.status(201).json(newHero);
  } catch (error) {
    res.status(500).send("Error crear heroe");
  }
});

// Actualizar un héroe existente
app.put("/heroes/:id", async (req, res) => {
  const { name, image } = req.body;

  // validacion de campos
  if (
    !name ||
    !image ||
    typeof name !== "string" ||
    typeof image !== "string" ||
    name.trim() === "" ||
    image.trim() === ""
  ) {
    return res
      .status(400)
      .send(
        "El nombre y la imagen son campos obligatorios, no pueden ir vacios"
      );
  }

  try {
    const connection = await database.getConnection();
    const result = await connection.query("UPDATE heroes_list SET name = ?, image = ? WHERE id = ?", [name, image, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).send("El heroe no fue encontrado")
    const updatedHero = { id: req.params.id, name, image };
    res.status(201).json(updatedHero);
  } catch (error) {
    res.status(500).send("Error al actualizar heroe");
  }
});

// Eliminar un héroe
app.delete("/heroes/:id", async(req, res) => {
  try {
    const connection = await database.getConnection();
    const result = await connection.query("DELETE FROM heroes_list WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).send("El heroe no fue encontrado")
    res.status(201).json({ message: "Heroe eliminado"});
  } catch (error) {
    res.status(500).send("Error al actualizar heroe");
  }
});

