import {
  FindOptions,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import User from "../database/models/user";

class UserService {
  public static async getAll() {
    const allUsers = await User.findAll();
    return allUsers;
  }

  public static async querySingleUser(
    options: FindOptions<InferAttributes<User, { omit: never }>>
  ): Promise<User | null> {
    const user = await User.findOne(options);
    return user;
  }

  public static async getSingleUser(
    UserId: number,
    options?: FindOptions<InferAttributes<User, { omit: never }>>
  ): Promise<User | null> {
    const user = await User.findByPk(UserId, options);
    return user;
  }

  public static async addUser(user: any): Promise<User> {
    const newUser = await User.create(user);
    return newUser;
  }

  public static async updateUser(
    id: number,
    options: Partial<InferCreationAttributes<User, { omit: never }>>
  ): Promise<any> {
    return await User.update(options, {
      where: { id },
    });
  }

  public static async deleteUser(id: number): Promise<any> {
    return await User.destroy({
      where: {
        id,
      },
    });
  }
}

export default UserService;
