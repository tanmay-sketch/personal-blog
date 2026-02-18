import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const interBold = fetch(new URL("../../../../assets/fonts/Inter-Bold.ttf", import.meta.url)).then(res => res.arrayBuffer());

export async function GET(req: NextRequest) {
    try {
        const fontBold = await interBold;

        const { searchParams } = req.nextUrl;
        const title = searchParams.get("title");
        const description = searchParams.get("description");
        const date = searchParams.get("date");

        if (!title) {
            return new Response("Title is required", { status: 500 });
        }

        const heading = title.length > 70 ? `${title.substring(0, 70)}...` : title;
        const subtext = description
            ? description.length > 110
                ? `${description.substring(0, 110)}...`
                : description
            : null;
        const titleFontSize = heading.length > 45 ? 60 : 72;

        return new ImageResponse((
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    background: '#060B18',
                    position: 'relative',
                }}
            >
                {/* Background glow — top right */}
                <div style={{
                    position: 'absolute',
                    top: '-120px',
                    right: '-80px',
                    width: '580px',
                    height: '580px',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
                    display: 'flex',
                }} />

                {/* Background glow — bottom left */}
                <div style={{
                    position: 'absolute',
                    bottom: '-80px',
                    left: '-60px',
                    width: '420px',
                    height: '420px',
                    background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
                    display: 'flex',
                }} />

                {/* Left accent bar */}
                <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    width: '6px',
                    height: '100%',
                    background: 'linear-gradient(to bottom, #818CF8, #3B82F6)',
                    display: 'flex',
                }} />

                {/* Main content */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '68px 80px 68px 96px',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                    }}>
                        <svg
                            width="34"
                            height="34"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#818CF8"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 11a9 9 0 0 1 9 9" />
                            <path d="M4 4a16 16 0 0 1 16 16" />
                            <circle cx="5" cy="19" r="1" />
                        </svg>
                        <div style={{
                            display: 'flex',
                            fontSize: '26px',
                            fontWeight: 700,
                            color: '#94A3B8',
                            letterSpacing: '-0.01em',
                        }}>
                            Tanmay&apos;s Blog
                        </div>
                    </div>

                    {/* Title + description */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '22px',
                    }}>
                        <div style={{
                            display: 'flex',
                            fontSize: `${titleFontSize}px`,
                            fontWeight: 700,
                            color: '#FFFFFF',
                            lineHeight: 1.2,
                            letterSpacing: '-0.025em',
                            maxWidth: '95%',
                        }}>
                            {heading}
                        </div>
                        {subtext && (
                            <div style={{
                                display: 'flex',
                                fontSize: '28px',
                                fontWeight: 700,
                                color: '#64748B',
                                lineHeight: 1.45,
                                maxWidth: '88%',
                            }}>
                                {subtext}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            fontSize: '22px',
                            fontWeight: 700,
                            color: '#475569',
                        }}>
                            <span>Tanmay Grandhisiri</span>
                            {date && (
                                <>
                                    <span style={{ color: '#1E293B' }}>•</span>
                                    <span>{date}</span>
                                </>
                            )}
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'linear-gradient(to right, #9333EA, #6366F1)',
                            borderRadius: '50px',
                            padding: '14px 32px',
                            fontSize: '22px',
                            fontWeight: 700,
                            color: '#FFFFFF',
                            letterSpacing: '-0.01em',
                        }}>
                            Read Blog →
                        </div>
                    </div>
                </div>
            </div>
        ), {
            width: 1200,
            height: 630,
            fonts: [{
                name: "Inter",
                data: fontBold,
                style: "normal",
                weight: 700
            }]
        });

    } catch (error: unknown) {
        console.error("OG Image generation failed:", error instanceof Error ? error.message : String(error));
        return new Response("Failed to generate the image", { status: 500 });
    }
}
