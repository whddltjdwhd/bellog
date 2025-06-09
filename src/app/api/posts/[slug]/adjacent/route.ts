import { getAdjacentPosts } from "@/lib/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const adjacentPosts = await getAdjacentPosts(slug);
    return NextResponse.json(adjacentPosts);
  } catch (error) {
    console.error("Error fetching adjacent posts:", error);
    return NextResponse.json({ prev: null, next: null }, { status: 500 });
  }
}
