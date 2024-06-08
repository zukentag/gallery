import { connectDb } from "@/dbConfig/dbConfig";
import componentModel from "@/models/componentModel";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function GET(request: NextRequest) {
  try {
    console.log("-------------->reached");
    const componentsData = await componentModel.find({});
    return NextResponse.json({ data: componentsData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    return NextResponse.json({ data: reqBody }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
