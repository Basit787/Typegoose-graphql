import bcrypt from "bcrypt";
import { signToken } from "../../lib/jwt.js";
import { UserModel } from "../../models/user.model.js";

type Payload = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const UserResolvers = {
  Query: {
    users: async () => await UserModel.find(),
    user: async (_: any, { id }: { id: string }) => await UserModel.findById(id),
    me: async (_: any, __: any, context: any) => {
      if (!context.user) throw new Error("Unauthorized");
      return await UserModel.findById((context.user as any).id);
    },
  },

  Mutation: {
    signup: async (_: any, { name, email, password, role }: Payload) => {
      const existing = await UserModel.findOne({ email });
      if (existing) throw new Error("User already exists");
      const user = new UserModel({ name, email, password, role });
      await user.save();
      const token = signToken({ id: user._id, email: user.email, role: user.role });
      return { token, user };
    },

    login: async (_: any, { email, password }: any) => {
      const user = await UserModel.findOne({ email });
      if (!user) throw new Error("Invalid credentials");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");
      const token = signToken({ id: user._id, email: user.email, role: user.role });
      return { token, user };
    },

    deleteUser: async (_: any, { id }: { id: string }, context: any) => {
      if (!context.user || (context.user as any).role !== "admin") throw new Error("Unauthorized");
      const res = await UserModel.findByIdAndDelete(id);
      return !!res;
    },
  },
};

export default UserResolvers;
