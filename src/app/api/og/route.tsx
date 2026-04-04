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
                    background: 'linear-gradient(160deg, #0E0E0E 0%, #111111 60%, #0A0A0A 100%)',
                    position: 'relative',
                }}
            >
                {/* Subtle top accent line */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '80px',
                    right: '80px',
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.4), transparent)',
                    display: 'flex',
                }} />

                {/* Main content */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '72px 80px',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}>
                        <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#6366F1',
                            display: 'flex',
                        }} />
                        <div style={{
                            display: 'flex',
                            fontSize: '22px',
                            fontWeight: 700,
                            color: '#3A3A3A',
                            letterSpacing: '0.02em',
                        }}>
                            TANMAY&apos;S BLOG
                        </div>
                    </div>

                    {/* Title + description */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}>
                        <div style={{
                            display: 'flex',
                            fontSize: `${titleFontSize}px`,
                            fontWeight: 700,
                            color: '#F0F0F0',
                            lineHeight: 1.15,
                            letterSpacing: '-0.03em',
                            maxWidth: '90%',
                        }}>
                            {heading}
                        </div>
                        {subtext && (
                            <div style={{
                                display: 'flex',
                                fontSize: '26px',
                                fontWeight: 700,
                                color: '#444444',
                                lineHeight: 1.5,
                                maxWidth: '82%',
                            }}>
                                {subtext}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#2E2E2E',
                    }}>
                        <span>Tanmay Grandhisiri</span>
                        {date && (
                            <>
                                <span style={{ color: '#1E1E1E' }}>·</span>
                                <span>{date}</span>
                            </>
                        )}
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
