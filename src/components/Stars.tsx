import React from 'react';

export function Stars({ rating, size = 16 }: { rating: number, size?: number }) {
    return (
        <span style={{ display: "inline-flex", gap: 1 }}>
            {[1, 2, 3, 4, 5].map(i => (
                <span
                    key={i}
                    style={{
                        color: i <= Math.round(rating) ? "#E8A838" : "#D5D1C8",
                        fontSize: size,
                        lineHeight: 1
                    }}
                >
                    ★
                </span>
            ))}
        </span>
    );
}
