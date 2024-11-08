const express=require('express');
const {Pool}=require('pg');
require('dotenv').config();

const app=express();
const port = process.env.PORT||3000;

const pool=new Pool({

    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

app.use(express.json());

//lista
app.get('/producto',async(req,res)=>{
    try{
        const result =await pool.query('SELECT*FROM productos');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});
//agregar
app.post('/productos', async (req, res) => {
    const { nombre, precio } = req.body;
    try {
      const result = await pool.query('INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *', [nombre, precio]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
//editar
  app.put('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    try {
      const result = await pool.query('UPDATE productos SET nombre = $1, precio = $2 WHERE id = $3 RETURNING *', [nombre, precio, id]);
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //eliminar
app.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM productos WHERE id = $1', [id]);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });