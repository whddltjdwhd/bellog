import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("Received Webhook Body:", JSON.stringify(body, null, 2));
    // Handle Notion's URL verification challenge
    if (body.type === "url_verification") {
      return NextResponse.json({ challenge: body.challenge });
    }
    // Handle revalidation requests
    const secret = request.nextUrl.searchParams.get("secret");
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const pageId = body.entity.id;
    console.log("Notion Page ID from Webhook:", pageId);
    // Assuming the webhook payload from Notion indicates a change,
    // we revalidate the 'posts' path.
    revalidatePath("/", "page");
    revalidatePath("/posts", "page");
    revalidatePath(`/posts/${pageId}`, "page");

    return NextResponse.json("Revalidation triggered");
  } catch (error) {
    console.error("Error in revalidate route:", error);
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 }
    );
  }
}
