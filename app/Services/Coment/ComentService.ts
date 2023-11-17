import BaseService from "App/Base/Services/BaseService"
import ComentRepository from "App/Repositories/Coment/ComentRepository"

export default class ComentService extends BaseService {
  constructor() {
    super(new ComentRepository())
  }
}
    