"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server'

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  if (req.method === "POST") {
    try {
      const { data }: any = req.body;
      const {
        id,
        email_addresses,
        first_name,
        last_name,
        primary_email_address_id,
      } = data;

      const user = await prisma.user.create({
        data: {
          id,
          last_name: last_name,
          first_name: first_name,
          email:
            email_addresses.find(
              (email: any) => email.id === primary_email_address_id
            )?.email_address || null,
        } as any,
      });

      return NextResponse.json({ user }, {status: 201});
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json({ error: "Internal Server Error" }, {status: 500});
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return NextResponse.json({status: 405});
  }
}
