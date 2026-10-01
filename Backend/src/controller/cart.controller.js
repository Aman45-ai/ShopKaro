import cart from "../model/cart.model.js"
import product from "../model/product.model.js"


const addToCart = async (req, res) => {
    try {
        const { id } = req.params

        const productToAdd = await product.findById(id)
        if (productToAdd !== null) {
            const query = {
                user:req.userId,
                product:productToAdd._id
            }
            const productCheck = await cart.findOne(query)

            if (productCheck === null) {
                const newCartProduct = await cart.create({
                    product: productToAdd._id,
                    user: req.userId,
                    quantity:1
                })
                res.status(201).send({
                    newCartProduct,
                    message:"Product successfully added to cart"
                })
            } else {
                productCheck.quantity+=1
                await productCheck.save()
                res.status(200).send({
                    message:"Cart updated successfully"
                })
            }
        }else{
            return res.status(404).send({
                message:"Product not found"
            })
        }

    } catch (error) {
        res.status(500).send({
            error,
            message: "Error in adding the product to cart"
        })
    }

}

export default addToCart