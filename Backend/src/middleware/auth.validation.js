import { body, validationResult } from "express-validator"

const handleValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({
            errors: errors.array()
        })
    }
    next()
}

const validateRegister = [
    body("name").notEmpty().withMessage("Name is required!"),
    body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
    body("email").notEmpty().withMessage("Email is required!"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage("Password must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 special character"),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords didn't match!")
        }
        return true
    }),
    handleValidation
]

const validateLogin = [
    body("email").notEmpty().withMessage("Email is required!"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required!"),
    handleValidation
]

export default { validateRegister, validateLogin }