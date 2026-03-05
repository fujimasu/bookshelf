import React from 'react';

export function Badge({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                background: active ? "#2C4A52" : "#E8E4DC", color: active ? "#F5F0E8" : "#5A5347",
                fontFamily: "var(--font-noto-sans)", fontSize: 13, fontWeight: 500,
                transition: "all 0.2s",
            }}
        >
            {children}
        </button>
    );
}

export function VisibilityBadge({ isPublic }: { isPublic: boolean }) {
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600,
            background: isPublic ? "#E6F0F2" : "#F3EDE4",
            color: isPublic ? "#2C6E7A" : "#8A7A63",
            border: `1px solid ${isPublic ? "#C4DDE2" : "#DDD4C4"}`,
        }}>
            <span style={{ fontSize: 12 }}>{isPublic ? "🌐" : "🔒"}</span>
            {isPublic ? "公開" : "非公開"}
        </span>
    );
}
