import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Murali Dharan | Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const runtime = "nodejs";

export default async function Image() {
    const [regularFont, boldFont] = await Promise.all([
        readFile(
            join(process.cwd(), "src/app/fonts/JetBrainsMono-Regular.ttf")
        ),
        readFile(
            join(process.cwd(), "src/app/fonts/JetBrainsMono-Bold.ttf")
        ),
    ]);

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0a0a0f",
                    fontFamily: "JetBrains Mono",
                }}
            >
                <div
                    style={{
                        width: 1020,
                        display: "flex",
                        flexDirection: "column",
                        border: "2px solid #26262f",
                        borderRadius: 24,
                        background: "#111118",
                        boxShadow: "0 0 120px rgba(139, 92, 246, 0.25)",
                    }}
                >
                    {/* title bar */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "24px 32px",
                            borderBottom: "2px solid #26262f",
                        }}
                    >
                        <div style={{ width: 16, height: 16, borderRadius: 8, background: "#ef4444" }} />
                        <div style={{ width: 16, height: 16, borderRadius: 8, background: "#eab308" }} />
                        <div style={{ width: 16, height: 16, borderRadius: 8, background: "#22c55e" }} />
                    </div>

                    {/* body */}
                    <div style={{ display: "flex", flexDirection: "column", padding: "48px 56px" }}>
                        <div style={{ display: "flex", fontSize: 30, color: "#8b5cf6" }}>$ whoami</div>
                        <div style={{ display: "flex", fontSize: 88, fontWeight: 700, color: "#f2f2f5", marginTop: 20 }}>
                            Murali Dharan
                        </div>
                        <div style={{ display: "flex", fontSize: 38, color: "#a1a1aa", marginTop: 8 }}>
                            Full Stack Developer
                        </div>
                        <div style={{ display: "flex", fontSize: 28, color: "#71717a", marginTop: 40 }}>
                            JavaScript · TypeScript · Node.js · PHP 
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: "JetBrains Mono",
                    data: regularFont,
                    style: "normal",
                    weight: 400,
                },
                {
                    name: "JetBrains Mono",
                    data: boldFont,
                    style: "normal",
                    weight: 700,
                },
            ],
        }
    );
}