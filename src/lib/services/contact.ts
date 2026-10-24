import { ContactPayload } from "../validators/contact";
import connectDB from "../db";
import Message from "../models/message";
import ContactNotification from "@/components/emails/ContactNotification";
import ContactAutoReply from "@/components/emails/ContactAutoReply";
import { render } from "@react-email/components";
import { transporter } from "../mailer";


export const sendMessage = async (data: ContactPayload): Promise<boolean> => {
    await connectDB();
    await Message.create(data)

    const [notificationHtml, autoReplyHtml] = await Promise.all([
        render(ContactNotification(data)),
        render(ContactAutoReply({ name: data.name })),
    ])

    await Promise.allSettled([
        transporter.sendMail({
            from: `Portfolio Contact <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL,
            replyTo: data.email,
            subject: `New message from ${data.name}`,
            html: notificationHtml,
        }),
        transporter.sendMail({
            from: `Murali Dharan <${process.env.SMTP_USER}>`,
            to: data.email,
            replyTo: data.email,
            subject: "Thanks for reaching out!",
            html: autoReplyHtml,
        }),
    ])

    return true;
}