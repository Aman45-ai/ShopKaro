import { body,validationResult } from 'express-validator'

const updateProductValidaton = [
    body("title").notEmpty().withMessage("Title is required!"),
    body("title").isLength({min:3}).withMessage("Title must be of 3 characters!"),
    body("description").notEmpty().withMessage("Description is required!"),
    body("description").isLength({min:20}).withMessage("Description must be at least 20characters!"),
    body("price").notEmpty().withMessage("Price is required!"),
    body("price").isInt({ min: 1 }).withMessage("Price must be a positive integer"),

    (req, res, next) => {
        const errors = validationResult(req)

         if(!errors.isEmpty()){
            return res.status(400).send({
                errors:errors.array()
            })
        }
        next()
    }
] 

export default updateProductValidaton
