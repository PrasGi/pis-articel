import BaseService from "App/Base/Services/BaseService";
import Hash from "@ioc:Adonis/Core/Hash";
import UserRepository from "App/Repositories/User/UserRepository";

export default class UserService extends BaseService {
  constructor() {
    super(new UserRepository());
  }

  async store(data: any) {
    try {
      if (data.pwd) {
        data.password = await Hash.make(data.password);
      }
      return await this.repository.store(data);
    } catch (error) {
      throw error;
    }
  }
}
