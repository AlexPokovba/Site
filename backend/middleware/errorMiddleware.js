export const notFound = (req, res, next) => {
 const error = new Error(`Not found - ${req.originalUrl}`);
 res.status(404);
 next(error);
};

export const errorHandler = (
 error,
 req,
 res,
 next
) => {
 let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
 let message = error.message;
 if (error.name === "CastError" && error.kind === "ObjectId") {
  message = `Resourse not found`;
  statusCode = 404;
 }
 res.status(statusCode).json({ message, stack: error.stack });
};
