import { Order } from "../models/orderModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const addOrderItems = asyncHandler(
 async (req, res) => {
  const {
   orderItems,
   shippingAddress,
   itemsPrice,
   shippingPrice,
   taxPrice,
   totalPrice,
  } = req.body;

  if (orderItems && orderItems.length !== 0 && req.user) {
   const order = new Order({
    orderItems: orderItems.map((item) => ({
     name: item.name,
     qty: item.qty,
     image: item.image,
     price: item.price,
     product: item._id,
     _id: undefined,
    })),
    user: req.user._id,
    shippingAddress: { ...shippingAddress },
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
   });
   const createdOrder = await order.save();
   res.status(201).json(createdOrder);
  } else {
   res.status(400);
   throw new Error("No order items");
  }
 }
);

export const getUserOrders = asyncHandler(
 async (req, res) => {
  const orders = await Order.find({ user: req.user?._id });
  res.status(201).json(orders);
 }
);

export const getOrderById = asyncHandler(
 async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
   "user",
   "name email"
  );
  if (order) {
   res.status(200).json(order);
  } else {
   res.status(404);
   throw new Error("Order not found");
  }
 }
);

export const updateOrderToDelivered = asyncHandler(
 async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
   order.isDelivered = true;
   order.deliveredAt = new Date(Date.now());
   const updatedOrder = await order.save();
   res.status(200).json(updatedOrder);
  } else {
   res.status(404);
   throw new Error("Order not found");
  }
 }
);

export const getAllOrders = asyncHandler(
 async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 3;
  const count = await Order.countDocuments();

  const orders = await Order.find({})
   .populate("user", "id name")
   .limit(pageSize)
   .skip(pageSize * (page - 1));
  res.status(200).json({ orders, page, pages: Math.ceil(count / pageSize) });
 }
);

