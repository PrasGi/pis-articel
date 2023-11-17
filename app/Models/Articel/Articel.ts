import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Category from "../Category/Category";
import User from "../User";

export default class Articel extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public title: string;

  @column()
  public content: string;

  @column()
  public CategoryId: number;

  @column()
  public UserId: number;

  @belongsTo(() => Category, {
    foreignKey: "CategoryId",
  })
  public category: BelongsTo<typeof Category>;

  @belongsTo(() => User, {
    foreignKey: "UserId",
  })
  public user: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  static get table() {
    return "articels"; // table name
  }
}
