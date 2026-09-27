import { param, validationResult } from "express-validator"

const idValidation = [

    param("id").isMongoId().withMessage("Id is not valid"),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).send({
                errors: errors.array()
            })
        }
        next()
    }
]
export default idValidation