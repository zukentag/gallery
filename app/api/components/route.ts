import { connectDb } from "@/dbConfig/dbConfig";
import componentModel from "@/models/componentModel";

import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function GET(request: NextRequest) {
  try {
    console.log("-------------->reached");
    const componentsData = await componentModel.find({});
    return componentsData;
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
