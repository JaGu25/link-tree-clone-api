import { body } from "express-validator";

export const validateClick = [
    body("link_id")
    .notEmpty()
    .withMessage("link_id is required")
    .isInt({ gt: 0 })
    .withMessage("link_id must be a positive integer"),
];
