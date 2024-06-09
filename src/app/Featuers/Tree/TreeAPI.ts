import axios from "axios";
import { TreeInfo } from "../../../../type";

export async function Plantsdetails(id: string): Promise<TreeInfo | null> {
  return new Promise<TreeInfo>(async (resolve, reject) => {
    try {
      const Data = await axios.get(
        "http://localhost:3000/api/Tree/TreeDetails/?id=" + id
      );

      if (Data.data) {
        resolve(Data.data);
      }
    } catch (error) {
      reject(error);
    }
  });
}
