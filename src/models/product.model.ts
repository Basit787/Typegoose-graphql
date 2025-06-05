import { getModelForClass, prop } from "@typegoose/typegoose";

export class Product {
  @prop({ type: String, required: true })
  public productName!: string;

  @prop({ type: String })
  public description?: string;

  @prop({ type: Number, required: true })
  public price?: number;

  @prop({ type: Number, required: true })
  public stock?: number;
}

export const ProductModel = getModelForClass(Product);
