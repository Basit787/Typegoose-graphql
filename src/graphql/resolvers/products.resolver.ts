import { ProductModel } from "../../models/product.model.js";
import { UserModel } from "../../models/user.model.js";

type Payload = {
  productName: string;
  description: string;
  stock: number;
  price: number;
};

const ProductResolver = {
  Query: {
    products: async () => await ProductModel.find(),
    product: async (_: any, { id }: { id: string }) => await ProductModel.findById(id),
  },

  Mutation: {
    createProduct: async (_: any, { productName, description, price, stock }: Payload) => {
      const product = new ProductModel({ productName, description, price, stock });
      await product.save();
      return product;
    },

    deleteProduct: async (_: any, { id }: { id: string }, context: any) => {
      if (!context.user || context.user.role !== "admin") throw new Error("Unauthorized");
      const res = await ProductModel.findByIdAndDelete(id);
      return !!res;
    },
  },
};

export default ProductResolver;
