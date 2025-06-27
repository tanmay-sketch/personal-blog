import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const interBold = fetch(new URL("../../../../assets/fonts/Inter-Bold.ttf", import.meta.url)).then(res => res.arrayBuffer());

export async function GET(req: NextRequest) {
    try {
        const fontBold = await interBold;

        const { searchParams } = req.nextUrl;
        const title = searchParams.get("title");

        if (!title) {
            return new Response("Title is required", { status: 500 });
        }

        const heading = title.length > 140 ? `${title.substring(0,140)}...` : title;

        return new ImageResponse((
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    background: 'linear-gradient(to bottom right, #030711, #0F1629)',
                    padding: '80px',
                    position: 'relative',
                }}
            >
                {/* Decorative element */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle at center, #1E293B 0%, transparent 70%)',
                    opacity: '0.1',
                    borderRadius: '50%',
                    transform: 'translate(30%, -30%)',
                }} />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '40px',
                    width: '100%',
                    position: 'relative',
                    zIndex: '1',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <svg 
                            width="40"
                            height="40"
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="#64748B"
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            style={{ marginRight: '24px' }}
                        >
                            <path d="M4 11a9 9 0 0 1 9 9" />
                            <path d="M4 4a16 16 0 0 1 16 16" />
                            <circle cx="5" cy="19" r="1" />
                        </svg>
                        <div
                            style={{
                                display: 'flex',
                                fontSize: '32px',
                                fontWeight: 700,
                                color: '#64748B',
                            }}
                        >
                            Tanmay&apos;s Blog
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            fontSize: '72px',
                            fontWeight: 700,
                            color: '#FFFFFF',
                            lineHeight: 1.2,
                            whiteSpace: 'pre-wrap',
                            maxWidth: '90%',
                            textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        {heading}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            fontSize: '32px',
                            fontWeight: 700,
                            color: '#64748B',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Data Science • Machine Learning • AI • Sports
                    </div>
                </div>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '16px',
                    fontSize: '24px',
                    color: '#64748B',
                    position: 'relative',
                    zIndex: '1',
                }}>
                    www.tanmaygrandhisiri.com
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