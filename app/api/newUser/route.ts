"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  const { data, type }: any = await req.json();
  if (type === "user.created") {
    try {
      console.log("running prisma");
      const user = await prisma.user.create({
        data: {
          id: data.id,
          last_name: data.last_name,
          first_name: data.first_name,
          email: data.email_addresses[0].email_address,
        } as any,
      });

      return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  } else {
    try {
      console.log("running prisma");
      const user = await prisma.user.update({
        where: { id: data.id },
        data: {
          id: data.id,
          last_name: data.last_name,
          first_name: data.first_name,
          email: data.email_addresses[0].email_address,
        } as any,
      });

      return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }
}
