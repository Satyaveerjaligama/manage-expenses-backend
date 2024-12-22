export const validateBody =
  (schema: any) => async (req: any, res: any, next: any) => {
    try {
      await schema.validate(req.body, { abortEarly: true });
      next();
    } catch (err: any) {
      console.log(err);
      res.status(400).json({ message: err?.errors[0] });
    }
  };
