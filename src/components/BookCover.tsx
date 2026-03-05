import React from 'react';
import Image from 'next/image';

export function BookCover({ title, index = 0, size = "md", thumbnail = "" }: { title: string, index?: number, size?: "sm" | "md" | "lg", thumbnail?: string }) {
    const palettes = [
        { bg: "#2C4A52", accent: "#E8A838", text: "#F5F0E8" },
        { bg: "#8B2F3A", accent: "#D4A574", text: "#F5F0E8" },
        { bg: "#3A5A40", accent: "#A3B18A", text: "#F5F0E8" },
        { bg: "#4A3728", accent: "#C4956A", text: "#F5F0E8" },
        { bg: "#2E3A59", accent: "#7B9ACC", text: "#F5F0E8" },
        { bg: "#5C374C", accent: "#CE8DA2", text: "#F5F0E8" },
    ];

    const p = palettes[index % palettes.length];
    const dims = size === "lg" ? { w: 180, h: 260 } : size === "sm" ? { w: 80, h: 115 } : { w: 120, h: 172 };

    if (thumbnail) {
        return (
            <div
                className="relative overflow-hidden flex-shrink-0 shadow-[2px_4px_12px_rgba(0,0,0,0.15)] rounded-sm bg-[#E8E4DC] flex items-center justify-center text-xs text-[#8A8477]"
                style={{ width: dims.w, height: dims.h }}
            >
                <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes={`${dims.w}px`}
                    unoptimized={true} // NDL API doesn't support complex Next.js image optimization reliably
                />
            </div>
        );
    }

    return (
        <div style={{
            width: dims.w, height: dims.h, background: p.bg, borderRadius: 4,
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            padding: 12, position: "relative", overflow: "hidden", flexShrink: 0,
            boxShadow: "2px 4px 12px rgba(0,0,0,0.15)",
        }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: p.accent }} />
            <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, height: 1, background: p.accent, opacity: 0.3 }} />
            <span style={{
                color: p.text, fontFamily: "var(--font-noto-serif)", fontWeight: 700,
                fontSize: size === "lg" ? 16 : size === "sm" ? 10 : 12,
                textAlign: "center", lineHeight: 1.5, letterSpacing: 1,
                writingMode: dims.h > 200 ? "vertical-rl" : "horizontal-tb",
            }}>{title}</span>
        </div>
    );
}
