import { Router } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const categoryAlreadyExists = categoriesRepository.findByName(name);
    if(categoryAlreadyExists){
        return response.status(403).json({
            message: "Essa categoria já foi cadastrada no sistema"
        })
    }

    categoriesRepository.create({name, description});

    return response.status(201).send();
})

categoriesRoutes.get("/", (request, response) => {
    return response.send(categoriesRepository.list())
})

export { categoriesRoutes };