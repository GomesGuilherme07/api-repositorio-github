import express from "express";
import repositorios from "./repositorioRoutes.js";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "Repositórios API"})
    })

    app.use(
        express.json(),
        repositorios,
    )
}

export default routes;