import Joi from "joi";

const providedConstraints = {
  name: Joi.string().required().min(3).max(50).label("Name"),
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
