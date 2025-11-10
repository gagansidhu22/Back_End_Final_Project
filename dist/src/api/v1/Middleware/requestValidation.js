"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema, property = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};
exports.validateRequest = validateRequest;
