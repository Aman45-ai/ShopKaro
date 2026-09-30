
const sellerAuthorisation = async (req, res, next) => {
    if (req.role === "seller") {
        return next()
    }
    return res.status(403).send("Unauthorized Access")
}

export default sellerAuthorisation