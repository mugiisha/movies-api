import {
  FindOptions,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import List from "../database/models/List";

class ListsServices {
  public static async getUserLists(userId: number) {
    const allLists = await List.findAll({
      where: {
        userId,
      },
    });
    return allLists;
  }

  public static async querySingleList(
    options: FindOptions<InferAttributes<List, { omit: never }>>
  ): Promise<List | null> {
    const list = await List.findOne(options);
    return list;
  }

  public static async getSingleList(
    listId: number,
    options?: FindOptions<InferAttributes<List, { omit: never }>>
  ): Promise<List | null> {
    const list = await List.findByPk(listId, options);
    return list;
  }

  public static async addList(list: any): Promise<List> {
    const newList = await List.create(list);
    return newList;
  }

  public static async deleteList(id: number): Promise<any> {
    return await List.destroy({
      where: {
        id,
      },
    });
  }
}

export default ListsServices;
