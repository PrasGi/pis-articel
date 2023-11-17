import BaseRepository from "App/Base/Repositories/BaseRepository";
import Coment from "App/Models/Coment/Coment";

export default class ComentRepository extends BaseRepository {
  constructor() {
    super(Coment)
  }
}
    