import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb";
import { productCollectionName } from "./product.model";
import { Response } from "express";

const cartCollectionName = "cart";
const cartSchema = Joi.object({
  userId: Joi.string(),
  products: Joi.array().items(Joi.object()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
});

const validateSchema = async (data) => {
  try {
    return await cartSchema.validateAsync(data, {
      abortEarly: false
    });
  } catch (err) {}
};

const create = async (req?, res?: Response) => {
  try {
    const value = await validateSchema(req);
    //call mongodb
    //Check cart is already exist
    /*If cart is exits, we must get all cart to find userId same.
     * after that we need to check products is the same, if not we just push products in cart
     * if products is exits, we find products is the same, and we increase quantity of the product
     */
    let getAllCart = await getDB()
      .collection(cartCollectionName)
      .find({ userId: req.userId })
      .toArray();
    if (getAllCart[0]) {
      const { products } = getAllCart[0];
      req.products.forEach((newProduct) => {
        const index = products.findIndex(
          (oldProduct) => oldProduct.productId === newProduct.productId
        );
        if (index > -1) {
          products[index].quantity += newProduct.quantity;
        } else {
          products.push(newProduct);
        }
      });
      const result = { ...getAllCart[0], updateAt: Date.now() };
      const resultFinal = await getDB()
        .collection(cartCollectionName)
        .findOneAndUpdate(
          { _id: result._id },
          { $set: result },
          { returnDocument: "after" }
        );
      return resultFinal.value;
    } else {
      const result = await getDB()
        .collection(cartCollectionName)
        .insertOne(value);
      const resultFinal = await getDB()
        .collection(cartCollectionName)
        .findOne(result.insertedId);
      return resultFinal;
    }
    // if (getAllCart) {
    //   console.log(getAllCart)
    // } else {
    //   const result = await getDB()
    //     .collection(cartCollectionName)
    //     .insertOne(value);
    //   const resultFinal = await getDB()
    //     .collection(cartCollectionName)
    //     .findOne(result.insertedId);
    //   return resultFinal;
    // }
    //If not, cart will create normal
  } catch (error) {
    res.status(200).json({ message: "error create model" });
  }
};

const get = async (req?, res?: Response) => {
  try {
    //call mongodb
    const result = await getDB()
      .collection(cartCollectionName)
      .find({})
      .toArray();
    return result;
  } catch (error) {}
};

const getByUser = async (id) => {
  try {
    //call mongodb
    let result = await getDB()
      .collection(cartCollectionName)
      .find({ userId: id })
      .toArray();
    //Get products array to find productID
    const { products } = result[0];
    const productIds = products.map((item) => new ObjectId(item.productId));
    const newProduct = await getDB()
      .collection(productCollectionName)
      .find({ _id: { $in: productIds } })
      .toArray();
    let objArray = [];
    products.forEach((i) => {
      newProduct.forEach((j) => {
        if (String(i.productId) === String(j._id)) {
          objArray = [...objArray, { ...j, quantity: i.quantity }];
        }
      });
    });
    result = { ...result[0], products: objArray };
    return result;
  } catch (error) {}
};

const update = async (req?, id?: any) => {
  try {
    //call mongodb
    //Get cart of user from Cart Collection
    let getCart = await getDB()
      .collection(cartCollectionName)
      .find({ userId: id })
      .toArray();

    if (getCart[0]) {
      let { products } = getCart[0];
      const { productId, quantity } = req;
      const index = products.findIndex(
        (oldProduct) => oldProduct.productId === productId
      );
      if (index > -1) {
        console.log(quantity);
        if (quantity <= 0) {
          console.log("delete");
          products = products.filter((product) => {
            return product.productId !== productId;
          });
        } else {
          products[index].quantity = quantity;
        }
      } else {
        return new Error("Sản phẩm không tồn tại");
      }
      const result = { ...getCart[0], updateAt: Date.now(), products };
      const resultFinal = await getDB()
        .collection(cartCollectionName)
        .findOneAndUpdate(
          { _id: result._id },
          { $set: result },
          { returnDocument: "after" }
        );
      const resultFinalFinal = await getByUser(resultFinal.value.userId);
      return resultFinalFinal;
    }
  } catch (error) {}
};

export const cartModel = { get, getByUser, create, update };
