import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "../User";
import Articel from "../Articel/Articel";

export default class Coment extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public content: string;

  @column()
  public UserId: number;

  @column()
  public ArticelId: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Articel)
  public articel: BelongsTo<typeof Articel>;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  static get table() {
    return "coments"; // table name
  }
}
