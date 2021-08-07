import React, { useState } from 'react';
import Joi from "joi";

export default function form(WrappedComponent, state, doSubmit, schema, providedConstraints) {
    return () => {
        const [data, setData] = useState(state);
        const [errors, setErrors] = useState({});

        function validate() {
            const { error } = schema.validate(data, { abortEarly: false })
            if (!error) return null;

            const errors = {};
            for (let item of error.details) {
                errors[item.path[0]] = item.message;
            }
            return errors ? errors : null;
        }

        function validateProperty(name, value) {
            const obj = { [name]: value };
            const propertySchema = Joi.object({ [name]: providedConstraints[name] });
            const { error } = propertySchema.validate(obj);
            return error ? error.details[0].message : null;
        };

        function handleChange({ currentTarget }) {
            const { name, value } = currentTarget;
            const errorMessage = validateProperty(name, value);
            setData(data => ({ ...data, [name]: value }));
            setErrors(errors => ({ ...errors, [name]: errorMessage }));
        }

        function handleSubmit(e) {
            e.preventDefault();
            const errors = validate(schema);
            setErrors(errors ? errors : {});
            if (errors) return;

            doSubmit(data);
        }

        return (
            <form onSubmit={handleSubmit}>
                <WrappedComponent data={data} errors={errors} handleChange={handleChange} />
            </form>
        )
    }
}