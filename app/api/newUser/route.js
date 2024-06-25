"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { data } = req.body;
      const {
        id,
        email_addresses,
        created_at,
        updated_at,
        primary_email_address_id,
        image_url,
        profile_image_url,
      } = data;

      const user = await prisma.user.create({
        data: {
          id,
          primaryEmail:
            email_addresses.find(
              (email) => email.id === primary_email_address_id
            )?.email_address || null,
          createdAt: new Date(created_at),
          updatedAt: new Date(updated_at),
          imageUrl: image_url,
          profileImageUrl: profile_image_url,
          emailAddresses: {
            create: email_addresses.map((email) => ({
              id: email.id,
              emailAddress: email.email_address,
              createdAt: new Date(email.created_at),
              updatedAt: new Date(email.updated_at),
              status: email.verification.status,
              strategy: email.verification.strategy,
            })),
          },
        },
      });

      res.status(201).json({ user });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
