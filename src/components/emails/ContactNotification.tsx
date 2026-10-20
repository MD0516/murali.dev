import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Hr,
  Section,
  Heading,
  Row,
  Column,
  Link,
} from "@react-email/components";

interface Props {
  name: string;
  email: string;
  message: string;
  date?: string;
}

export default function ContactNotification({ name, email, message, date }: Props) {
  const currentDate = date || new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={headerTitle}>New Contact Message</Text>
            <Text style={headerSubtitle}>{currentDate}</Text>
          </Section>

          {/* Divider */}
          <Hr style={divider} />

          {/* Sender Info */}
          <Section style={section}>
            <Heading style={sectionHeading}>Sender Information</Heading>
            <Row style={row}>
              <Column style={labelColumn}>
                <Text style={label}>Name</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{name}</Text>
              </Column>
            </Row>
            <Row style={row}>
              <Column style={labelColumn}>
                <Text style={label}>Email</Text>
              </Column>
              <Column style={valueColumn}>
                <Link href={`mailto:${email}`} style={emailLink}>
                  {email}
                </Link>
              </Column>
            </Row>
          </Section>

          {/* Divider */}
          <Hr style={divider} />

          {/* Message */}
          <Section style={section}>
            <Heading style={sectionHeading}>Message</Heading>
            <Text style={messageText}>{message}</Text>
          </Section>

          {/* Footer */}
          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              Sent from your portfolio website
            </Text>
            <Text style={footerTextSmall}>
              Reply to: {email}
            </Text>
          </Section>
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
  borderRadius: "12px",
  border: "1px solid #222",
  maxWidth: "600px",
  margin: "0 auto",
};

const header = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const headerTitle = {
  color: "#fff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 4px 0",
};

const headerSubtitle = {
  color: "#888",
  fontSize: "12px",
  margin: "0",
};

const divider = {
  borderColor: "#222",
  margin: "20px 0",
};

const section = {
  marginBottom: "24px",
};

const sectionHeading = {
  color: "#a78bfa",
  fontSize: "14px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "0 0 12px 0",
};

const row = {
  marginBottom: "8px",
};

const labelColumn = {
  width: "80px",
  paddingRight: "16px",
};

const label = {
  color: "#888",
  fontSize: "12px",
  margin: "0",
};

const valueColumn = {
  flex: 1,
};

const value = {
  color: "#eee",
  fontSize: "14px",
  margin: "0",
};

const emailLink = {
  color: "#a78bfa",
  fontSize: "14px",
  textDecoration: "none",
  margin: "0",
};

const messageText = {
  color: "#eee",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
  padding: "12px",
  backgroundColor: "#1a1a1a",
  borderRadius: "8px",
  borderLeft: "3px solid #a78bfa",
};

const footer = {
  textAlign: "center" as const,
  marginTop: "24px",
};

const footerText = {
  color: "#888",
  fontSize: "12px",
  margin: "4px 0",
};

const footerTextSmall = {
  color: "#666",
  fontSize: "10px",
  margin: "4px 0",
};