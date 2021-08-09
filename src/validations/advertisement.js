import Joi from "joi";

const providedConstraints = {
  title: Joi.string().min(5).max(250).required().label("Title"),
  address: Joi.string().min(5).max(250).required().label("Address"),
  phoneNumber: Joi.string()
    .pattern(new RegExp("^(\\+98|0)?9\\d{9}$"))
    .required()
    .label("Phone Number"),
  coordinates: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }).required(),
};

const schema = Joi.object(providedConstraints);

export { schema, providedConstraints };
