
import { CustomAPIError } from "../errors/custom-api-error.js"

const errorHandler = (err, req, res, next) => {
  console.log("err", err);
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({'msg': err.message});
  }

  return res.status(404).json({'msg': 'Something went wrong. Please try again.'});
}


export default errorHandler;
