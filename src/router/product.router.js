const router = require("express").Router();
const Products = require("../model/product.model");

router.get("/products", async (req, res) => {
    try {
        const products = await Products.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: products,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message,
        });
    }
});

router.get("/products/:product_id", async (req, res) => {
    try {
        const { product_id } = req.params;
        const product = await Products.findOne({ where: { product_id } });

        if (!product) {
            return res.status(404).json({
                ok: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            ok: true,
            body: product,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message,
        });
    }
});

router.post("/products", async (req, res) => {
    try {
        const { product_name, price, is_stock } = req.body;

        const createProduct = await Products.create({ product_name, price, is_stock });
        res.status(201).json({
            ok: true,
            message: "Created Product",
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            error: error.message,
        });
    }
});

router.put("/products/:product_id", async (req, res) => {
    try {
        const { product_id } = req.params;
        const { product_name, price, is_stock } = req.body;

        const updatedRows = await Products.update(
            { product_name, price, is_stock },
            { where: { product_id } }
        );

        if (updatedRows[0] === 0) {
            return res.status(404).json({
                ok: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            ok: true,
            message: "Updated Product",
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message,
        });
    }
});

router.delete("/products/:product_id", async (req, res) => {
    try {
        const { product_id } = req.params;

        const deletedRows = await Products.destroy({ where: { product_id } });

        if (deletedRows === 0) {
            return res.status(404).json({
                ok: false,
                message: "Product not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message,
        });
    }
});

module.exports = router;
