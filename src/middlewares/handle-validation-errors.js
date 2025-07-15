import { validationResult } from "express-validator";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: ReasonPhrases.BAD_REQUEST,
      errors: errors.array(),
    });
  }
  next();
};

export default handleValidationErrors;
