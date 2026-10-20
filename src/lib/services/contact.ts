import { Resend } from "resend";
import { ContactPayload } from "../validators/contact";
import connectDB from "../db";
import Message from "../models/message";
import ContactNotification from "@/components/emails/ContactNotification";
import ContactAutoReply from "@/components/emails/ContactAutoReply";

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendMessage = async (data: ContactPayload): Promise<boolean> => {
    await connectDB();
    await Message.create(data)

    await Promise.all([
        resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: "msmurali2005@gmail.com",
            replyTo: data.email,
            subject: `New message from ${data.name}`,
            react: ContactNotification({ name: data.name, email: data.email, message: data.message })
        }),
        resend.emails.send({
            from: "Murali Dharan <onboarding@resend.dev>",
            to: [data.email],
            replyTo: "msmurali2005@gmail.com",
            subject: "Thanks for reaching out!",
            react: ContactAutoReply({ name: data.name }),
        })
    ])

    return true;
}