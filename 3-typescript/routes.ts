import { Request, Response } from "express";
import CreateCourseService from "./createCourseService";

export function CreateCourse(request: Request, response: Response) {
    CreateCourseService.execute({
        name: "Nodejs",
        duration: 10,
        educator: "Gabriel"
    });

    return response.send();
}