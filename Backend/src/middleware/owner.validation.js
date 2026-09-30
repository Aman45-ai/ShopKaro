import product from '../model/product.model.js'

const ownerAuthorisation = async (req, res, next) => {
    const productData = await product.findById(req.params.id)
    if(productData.owner.equals(req.userId)){
        return next()
    }
    return res.status(403).send("Unauthorized Access")
}

export default ownerAuthorisation