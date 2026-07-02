import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

const GENERIC_ERROR = "אירעה שגיאה, אנא נסה שוב מאוחר יותר"

// In-memory cache
let productCache = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 1000; // 1 minute

// Add product function
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        productCache = null; // invalidate cache when a product is added

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: GENERIC_ERROR })
    }
}

// List product function
const listProducts = async (req, res) => {
    try {
        if (productCache && Date.now() - cacheTime < CACHE_TTL) {
            return res.json({ success: true, products: productCache });
        }
        const products = await productModel.find({});
        productCache = products;
        cacheTime = Date.now();
        res.set('Cache-Control', 'public, max-age=60');
        res.json({ success: true, products })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: GENERIC_ERROR })
    }
}

// Remove product function
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        productCache = null; // invalidate cache when a product is removed
        res.json({ success: true, message: "Product Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: GENERIC_ERROR })
    }
}

// Single product info function
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: GENERIC_ERROR })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct }