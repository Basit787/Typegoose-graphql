import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import bcrypt from "bcrypt";

@pre<User>("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
})
export class User {
  @prop({ type: String, required: true })
  public name!: string;

  @prop({ type: String, required: true, unique: true })
  public email!: string;

  @prop({ type: String, required: true })
  public password!: string;

  @prop({ type: String, enum: ["admin", "user"], default: "user" })
  public role?: string;
}

export const UserModel = getModelForClass(User);
