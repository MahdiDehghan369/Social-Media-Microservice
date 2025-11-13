const bodyValidator = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      next(err)
    }
  };
};

module.exports = bodyValidator;
