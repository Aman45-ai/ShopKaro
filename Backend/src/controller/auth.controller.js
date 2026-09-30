import config from '../config/config.js'
import user from '../model/auth.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        const emailMatch = await user.findOne({ email })

        if (emailMatch !== null) {
            return res.status(409).send("Email already exists!")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await user.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        res.status(201).send({
            name,
            email,
            role,
            message: "Registration Successfull"
        })
    } catch (error) {
        console.log("Internal Server Error", error)
        res.status(500).send("Internal Server Error")
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const emailMatch = await user.findOne({
            email
        })

        let passwordMatch

        if (emailMatch !== null) {
            passwordMatch = await bcrypt.compare(password, emailMatch.password)
        } else {
            return res.status(404).send("User not registered!")
        }

        if (passwordMatch) {
            const accessToken = jwt.sign({ userId: emailMatch._id, role: emailMatch.role }, config.ACCESS_SECRET_KEY, { expiresIn: '15m' })
            const refreshToken = jwt.sign({ userId: emailMatch._id, role: emailMatch.role }, config.REFRESH_SECRET_KEY, { expiresIn: '7d' })

            emailMatch.refreshToken = refreshToken
            await emailMatch.save()

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            })

            res.status(200).send({
                message: "Login Successfull",
                role: emailMatch.role,
                accessToken
            })
        }
        else {
            res.status(401).send("Invalid Credentials")
        }
    } catch (error) {
        console.log("Internal Server Error", error)
        res.status(500).send("Internal Server Error")
    }
}

const newToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    try {
        const verification = jwt.verify(refreshToken, config.REFRESH_SECRET_KEY)
        const dbUser = await user.findById(verification.userId)
        if(dbUser === null || dbUser.refreshToken === null){
            return res.status(401).send("Client/Authentication failure")
        }
        else if (refreshToken === dbUser.refreshToken) {
            const generateAccessToken = jwt.sign({ userId: verification.userId }, config.ACCESS_SECRET_KEY, { expiresIn: '15m' })
            res.status(200).send({
                message: "New Access Token generated",
                accessToken: generateAccessToken
            })
        }else{
            res.status(401).send("Client/Authentication failure")
        }

    } catch (error) {
        console.log("Error in generating access token", error)
        res.status(401).send("Client/Authentication failure")
    }
}

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        const verification = jwt.verify(refreshToken, config.REFRESH_SECRET_KEY)
        const dbUser = await user.findById(verification.userId)

         if(dbUser === null || dbUser.refreshToken === null){
            return res.status(401).send("Client/Authentication failure")
        }

        dbUser.refreshToken = null
        await dbUser.save()

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })
        res.status(200).send("Logout Successfully")
    } catch (error) {
        res.status(401).send("Logout Failed")
    }
}

const me = async(req, res) => {
    const dbUser = await user.findById(req.userId)
    res.status(200).send({
        name:dbUser.name,
        email:dbUser.email
    })
}

export default { signup, login, newToken, logout, me }