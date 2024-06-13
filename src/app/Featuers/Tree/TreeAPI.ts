import axios from "axios";
import { TreeInfo } from "../../../../type";
import axiosInstance from "@/lib/Baseurl";

export async function Plantsdetails(id: string): Promise<TreeInfo | null> {
  return new Promise<TreeInfo>(async (resolve, reject) => {
    try {
      const Data = await axiosInstance.get(`/api/Tree/TreeDetails/?id=` + id);

      if (Data.data) {
        resolve(Data.data);
        console.log(Data.data, "terre");
      }
    } catch (error) {
      reject(error);
    }
  });
}
