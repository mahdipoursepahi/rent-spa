import Joi from "joi";

const providedConstraints = {
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .max(250)
    .required()
    .label("Email"),
  password: Joi.string().min(5).max(255).required().label("Password"),
};

const schema = Joi.object(providedConstraints);

export { schema, providedConstraints };
