import BaseService from "App/Base/Services/BaseService";
import ArticelRepository from "App/Repositories/Articel/ArticelRepository";

export default class ArticelService extends BaseService {
  constructor() {
    super(new ArticelRepository());
  }
}
