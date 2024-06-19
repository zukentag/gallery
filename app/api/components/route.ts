import { connectDb } from "@/dbConfig/dbConfig";
import Component from "@/models/componentModel";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function GET(request: NextRequest) {
  try {
    const componentData = await Component.find({}).lean();

    return NextResponse.json(componentData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      id,
      title,
      description,
      image,
      component,
      meta,
      code,
      sourceCode,
      language,
    } = reqBody;

    const componentFound = await Component.findOne({ id });

    if (componentFound) {
      return NextResponse.json(
        { error: "Component Alredy Exists" },
        { status: 400 }
      );
    }

    const newComponent = new Component({
      id,
      title,
      description,
      image,
      component,
      meta,
      code,
      sourceCode,
      language,
    });

    await newComponent.save();

    return NextResponse.json(reqBody, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
