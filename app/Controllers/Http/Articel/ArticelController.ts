import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ArticelService from "App/Services/Articel/ArticelService";
import CreateArticelValidator from "App/Validators/Articel/CreateArticelValidator";
import UpdateArticelValidator from "App/Validators/Articel/UpdateArticelValidator";
import { ValidationException } from "@ioc:Adonis/Core/Validator";

export default class ArticelController {
  service = new ArticelService();
  FETCHED_ATTRIBUTE = [
    // attribute
    "title",
    "content",
    "category_id",
  ];

  public async index({ request, response }: HttpContextContract) {
    try {
      const options = request.parseParams(request.all());
      const result = await this.service.getAll(options);
      return response.api(result, "OK", 200, request);
    } catch (error) {
      return response.error(error.message);
    }
  }

  public async store({ auth, request, response }: HttpContextContract) {
    try {
      await request.validate(CreateArticelValidator);
      const data = request.only(this.FETCHED_ATTRIBUTE);
      data["user_id"] = auth.user?.id;
      const result = await this.service.store(data);
      return response.api(result, "Articel created!", 201);
    } catch (error) {
      if (error instanceof ValidationException) {
        const errorValidation: any = error;
        return response.error(
          errorValidation.message,
          errorValidation.messages.errors,
          422
        );
      }
      return response.error(error.message);
    }
  }

  public async show({ params, request, response }: HttpContextContract) {
    try {
      const options = request.parseParams(request.all());
      const result = await this.service.show(params.id, options);
      if (!result) {
        return response.api(null, `Articel with id: ${params.id} not found`);
      }
      return response.api(result);
    } catch (error) {
      return response.error(error.message);
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      await request.validate(UpdateArticelValidator);
      const data = request.only(this.FETCHED_ATTRIBUTE);
      const result = await this.service.update(params.id, data);
      if (!result) {
        return response.api(null, `Articel with id: ${params.id} not found`);
      }
      return response.api(result, "Articel updated!");
    } catch (error) {
      if (error instanceof ValidationException) {
        const errorValidation: any = error;
        return response.error(
          errorValidation.message,
          errorValidation.messages.errors,
          422
        );
      }
      return response.error(error.message);
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const result = await this.service.delete(params.id);
      if (!result) {
        return response.api(null, `Articel with id: ${params.id} not found`);
      }
      return response.api(null, "Articel deleted!");
    } catch (error) {
      return response.error(error.message);
    }
  }

  public async destroyAll({ response }: HttpContextContract) {
    try {
      await this.service.deleteAll();
      return response.api(null, "All Articel deleted!");
    } catch (error) {
      return response.error(error.message);
    }
  }
}
