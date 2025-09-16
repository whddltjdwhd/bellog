import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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
    console.log("Received revalidation request for page ID:", pageId);

    revalidatePath("/");
    revalidatePath("/posts");
    revalidatePath(`/posts/${pageId}`);

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.error("Error in revalidate route:", error);
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 }
    );
  }
}
