import { getPayload } from "payload";
import { seedMdxProduct } from "@/endpoints/seed-mdx-product";
import config from "@payload-config";

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config });

  try {
    await seedMdxProduct(payload);
    return Response.json({ success: true });
  } catch (e) {
    payload.logger.error({ err: e, message: "Error seeding data" });
    return new Response("Error seeding data.", { status: 500 });
  }
}
