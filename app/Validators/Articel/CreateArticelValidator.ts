import { schema, validator, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateArticelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api;

  public schema = schema.create({
    // your validation rules
    title: schema.string(),
    content: schema.string(),
    category_id: schema.number([
      rules.exists({ table: "categories", column: "id" }),
    ]),
  });
}
