import BaseRepository from "App/Base/Repositories/BaseRepository";
import User from "App/Models/User";

export default class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async createNewAccount(name: string, email: string, password: string) {
    try {
      return await this.model.create({
        name,
        email,
        password: password,
      });
    } catch (error) {
      throw error;
    }
  }
}
