import { Request, Response } from "express";
import Product from "./product.model";

export const createProduct = async (req: Request, res: Response) => {
  let { name, price, user } = req.body;

  try {
    if (!(name && price)) {
      return res.status(500).json({
        success: false,
        message: "Invalid Values",
      });
    } else {
      let product = await Product.create({
        name,
        price,
        user,
      });
      if (product) {
        return res.status(200).json({
          success: true,
          message: "Product Created Success ",
          result: product,
        });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Falied to create product " });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Falied to create product ",error});
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  let { id, name, price, user } = req.body;

  try {
    let product = await Product.findOne({ where: { id, user } });

    if (product) {
      if (!(name && price)) {
        return res.status(500).json({
          success: false,
          message: "Invalid Values",
        });
      } else {
        let product = await Product.update(
          {
            name,
            price,
            user,
          },
          {
            where: { id },
            returning: true, // if you want the updated record back
          }
        );
        if (product) {
          return res.status(200).json({
            success: true,
            message: "Product update Success ",
            result: product,
          });
        } else {
          return res
            .status(500)
            .json({ success: false, message: "Product with id is not found "});
        }
      }
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Falied to update product " });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Falied to update product " });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  let { id, user } = req.body;

  try {
    let product = await Product.findOne({ where: { id, user } });

    if (product) {
      let deletedCount = await Product.destroy({
        where: { id },
      });

      if (deletedCount) {
        return res
          .status(200)
          .json({ success: true, message: "product Deleted" });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Falied to update product " });
      }
    } else {
      return res
        .status(500)
        .json({ success: false, message: "product Not Found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Falied to update product " });
  }
};

export const getProduct = async (req: Request, res: Response) => {

  try {
    let products = await Product.findAll({
      order: [["createdAt", "DESC"]], // Use 'ASC' for ascending order
    });

    return res
      .status(200)
      .json({ success: true, message: "Product", result: products });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Falied to fetch product " });
  }
};
