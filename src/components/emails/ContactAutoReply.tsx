// emails/ContactAutoReply.tsx
import {
    Html,
    Head,
    Body,
    Container,
    Text,
    Hr,
} from "@react-email/components";

interface Props {
    name: string;
}

export default function ContactAutoReply({ name }: Props) {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Text style={terminalLine}>
                        <span style={prompt}>$</span> ./send-message --status
                    </Text>
                    <Text style={outputLine}>
                        &gt; message received. response time: 24-48h
                    </Text>

                    {/* Divider */}
                    <Hr style={divider} />

                    {/* Main Message */}
                    <Text style={greeting}>Hey {name},</Text>
                    <Text style={message}>
                        Thanks for reaching out. I&apos;ve got your message and will get back to you soon.
                    </Text>

                    {/* Divider */}
                    <Hr style={divider} />

                    {/* Footer */}
                    <Text style={footer}>
                        — Murali Dharan
                    </Text>
                    <Text style={footerSmall}>
                        Full Stack Developer · Chennai, India
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

// Styles
const main = {
    fontFamily: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
    backgroundColor: "#0a0a0f",
    padding: "20px",
    margin: "0",
};

const container = {
    backgroundColor: "#111",
    padding: "32px",
    borderRadius: "8px",
    border: "1px solid #222",
    maxWidth: "500px",
    margin: "0 auto",
};

const terminalLine = {
    color: "#a78bfa",
    fontSize: "13px",
    margin: "0 0 4px 0",
};

const prompt = {
    color: "#888",
    marginRight: "8px",
};

const outputLine = {
    color: "#888",
    fontSize: "13px",
    margin: "0 0 16px 0",
};

const divider = {
    borderColor: "#222",
    margin: "16px 0",
};

const greeting = {
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
    margin: "0 0 8px 0",
};

const message = {
    color: "#ccc",
    fontSize: "13px",
    lineHeight: "1.6",
    margin: "0",
};

const footer = {
    color: "#eee",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0 0 4px 0",
};

const footerSmall = {
    color: "#666",
    fontSize: "11px",
    margin: "0",
};