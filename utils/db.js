"use server"

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createTicket(data){
    data.activity = {
        create: {
            change: "Created ticket"
        }
    };
    console.log("inserting....")
    const outcome = await prisma.tickets.create({
        data
    })
    console.log(outcome)
    return outcome;
}

export async function getMyTickets(){
    const outcome = await prisma.tickets.findMany()
    return outcome;
}

export async function getOneTicket(id){
    const outcome = await prisma.tickets.findUnique({where: {id: id}})
    return outcome;
}

export async function getActivity(id){
    const outcome = await prisma.activity.findMany({where: {ticket_id: id}})
    return outcome;
}