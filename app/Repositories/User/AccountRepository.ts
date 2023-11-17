import BaseRepository from "App/Base/Repositories/BaseRepository";
import User from "App/Models/User";
import Account from "App/Models/User/Account";

export default class AccountRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email: string) {
    try {
      return await this.model.query().where("email", email).first();
    } catch (error) {
      throw error;
    }
  }
}
