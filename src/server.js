require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Op } = require("sequelize");
const { sequelize, Aluno, Professor, Curso, Matricula } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

const models = {
  alunos: Aluno,
  professores: Professor,
  cursos: Curso,
  matriculas: Matricula,
};
const include = {
  matriculas: [
    { model: Aluno, as: "aluno", attributes: ["id", "nome", "email"] },
    { model: Curso, as: "curso", attributes: ["id", "nome"] },
  ],
  cursos: [
    { model: Professor, as: "professor", attributes: ["id", "nome", "email"] },
  ],
};

app.get("/api/health", (req, res) =>
  res.json({ ok: true, service: "educatech-api" }),
);

app.get("/api/:resource", async (req, res, next) => {
  try {
    const Model = models[req.params.resource];
    if (!Model)
      return res.status(404).json({ error: "Recurso não encontrado" });
    const options = { order: [["id", "ASC"]] };
    if (include[req.params.resource])
      options.include = include[req.params.resource];
    if (
      req.query.search &&
      ["alunos", "professores", "cursos"].includes(req.params.resource)
    ) {
      options.where = { nome: { [Op.like]: `%${req.query.search}%` } };
    }
    res.json(await Model.findAll(options));
  } catch (error) {
    next(error);
  }
});

app.post("/api/:resource", async (req, res, next) => {
  try {
    const Model = models[req.params.resource];
    if (!Model)
      return res.status(404).json({ error: "Recurso não encontrado" });
    const record = await Model.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
});

app.put("/api/:resource/:id", async (req, res, next) => {
  try {
    const Model = models[req.params.resource];
    if (!Model)
      return res.status(404).json({ error: "Recurso não encontrado" });
    const record = await Model.findByPk(req.params.id);
    if (!record)
      return res.status(404).json({ error: "Registro não encontrado" });
    await record.update(req.body);
    res.json(record);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/:resource/:id", async (req, res, next) => {
  try {
    const Model = models[req.params.resource];
    if (!Model)
      return res.status(404).json({ error: "Recurso não encontrado" });
    const deleted = await Model.destroy({ where: { id: req.params.id } });
    if (!deleted)
      return res.status(404).json({ error: "Registro não encontrado" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    return res
      .status(400)
      .json({ error: error.errors.map((item) => item.message).join(", ") });
  }
  console.error(error);
  res.status(500).json({ error: "Erro interno do servidor" });
});

if (require.main === module) {
  sequelize
    .authenticate()
    .then(() =>
      app.listen(process.env.PORT || 3000, () =>
        console.log(`API em http://localhost:${process.env.PORT || 3000}`),
      ),
    )
    .catch((error) => {
      console.error("Não foi possível conectar ao banco:", error.message);
      process.exitCode = 1;
    });
}

module.exports = app;
