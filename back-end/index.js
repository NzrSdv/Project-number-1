import pool from "./db.js";
import express from "express";
import cors from "cors";
const app = express();
const PORT = 5000;

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/habits", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM habits_information");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

app.post("/createhabit", async (req, res) => {
  const {
    habit_id,
    habit_title,
    habit_description,
    habit_frequency,
    habit_created_at,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO habits_information (habit_id, habit_title,habit_description,habit_frequency,habit_created_at) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [
        habit_id,
        habit_title,
        habit_description,
        habit_frequency,
        habit_created_at,
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

app.delete("/deletebyid", async (req, res) => {
  const { id } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM habits_information WHERE habit_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount == 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res
      .status(200)
      .json({
        message: "Item deleted successfully.",
        deletedItem: result.rows[0],
      });
  } catch (error) {
    console.error("Deleting item error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(PORT, () =>
  console.log(`Server is running on the port http://localhost:${PORT}`)
);
