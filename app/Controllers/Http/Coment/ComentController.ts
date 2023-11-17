import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ComentService from "App/Services/Coment/ComentService";
import CreateComentValidator from "App/Validators/Coment/CreateComentValidator";
import UpdateComentValidator from "App/Validators/Coment/UpdateComentValidator";
import { ValidationException } from "@ioc:Adonis/Core/Validator";

export default class ComentController {
  service = new ComentService();
  FETCHED_ATTRIBUTE = [
    // attribute
    "content",
    "articel_id",
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
      await request.validate(CreateComentValidator);
      const data = request.only(this.FETCHED_ATTRIBUTE);
      data["user_id"] = auth.user?.id;
      const result = await this.service.store(data);
      return response.api(result, "Coment created!", 201);
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
        return response.api(null, `Coment with id: ${params.id} not found`);
      }
      return response.api(result);
    } catch (error) {
      return response.error(error.message);
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      await request.validate(UpdateComentValidator);
      const data = request.only(this.FETCHED_ATTRIBUTE);
      const result = await this.service.update(params.id, data);
      if (!result) {
        return response.api(null, `Coment with id: ${params.id} not found`);
      }
      return response.api(result, "Coment updated!");
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
        return response.api(null, `Coment with id: ${params.id} not found`);
      }
      return response.api(null, "Coment deleted!");
    } catch (error) {
      return response.error(error.message);
    }
  }

  public async destroyAll({ response }: HttpContextContract) {
    try {
      await this.service.deleteAll();
      return response.api(null, "All Coment deleted!");
    } catch (error) {
      return response.error(error.message);
    }
  }
}
