import jsonwebtoken from "jsonwebtoken";
export default function getdatafromtoken(req: any) {
  try {
    const token = req.cookies.get("token")?.value || "";

    const decodedToken: any = jsonwebtoken.verify(
      token,
      process.env.SECRET_KEY!
    );

    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
