import BaseRepository from "App/Base/Repositories/BaseRepository";
import Articel from "App/Models/Articel/Articel";

export default class ArticelRepository extends BaseRepository {
  constructor() {
    super(Articel);
  }
}
