import product from '../model/product.model.js'
import fs from "fs/promises"

const createProduct = async (req, res) => {
    try {
        const { title, description, price } = req.body
        const image = req.file.path

        const newProduct = await product.create({
            image,
            title,
            description,
            price,
            owner: req.userId
        })

        res.status(201).send({
            newProduct,
            message: "Product created successfully"
        })
    } catch (error) {
        res.status(500).send("Error in creating the product!")
    }
}

const getProducts = async (req, res) => {
    try {
        const allProducts = await product.find()
        res.status(200).send({
            allProducts,
            message: "Products fetched successfully"
        })
    } catch (error) {
        res.status(500).send("Error in fetching the products!")
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params

        const singleProduct = await product.findById(id)

        if (singleProduct === null) {
            return res.status(404).send("Requested product not found!")
        }

        res.status(200).send({
            singleProduct,
            message: "Requested product fetched successfully"
        })
    } catch (error) {
        res.status(500).send("Error in fetching the requested product!")
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, price } = req.body

        const updateData = {
            title,
            description,
            price
        }

        if (req.file) {
            updateData.image = req.file.path
        }

        const updatedProduct = await product.findByIdAndUpdate(id, updateData, { returnDocument: 'after', runValidators: true })

        if (updatedProduct === null) {
            return res.status(404).send("Requested product not found!")
        }

        res.status(200).send({
            updatedProduct,
            message: "Requested product updated successfully"
        })

    } catch (error) {
        res.status(500).send("Error in updating the requested product!")
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const productToDelete = await product.findById(id)

        if (productToDelete === null) {
            return res.status(404).send("Requested product not found!")
        }

        if (productToDelete.image) {
            try {
                await fs.unlink(productToDelete.image)
            } catch (error) {
                if (error.code !== "ENOENT") {
                    throw error
                }
            }
        }
        const deletedProduct = await product.findByIdAndDelete(id)

        res.status(200).send({
            deletedProduct,
            message: "Requested product deleted successfully"
        })

    } catch (error) {
        res.status(500).send("Error in deleting the requested product!")
    }
}

export default { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct }