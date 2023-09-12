import { MongoClient } from "mongodb";

const pass: any = process.env.MONGODB_PASSWORD;
const password = encodeURIComponent(pass);

export class Client {
  private static url: string = `mongodb+srv://vercel-admin-user:${password}@cluster0.e2i23xf.mongodb.net/?retryWrites=true&w=majority`;

  public static async connect() {
    const client = await MongoClient.connect(this.url);
    return client.db("pokego");
  }
}
