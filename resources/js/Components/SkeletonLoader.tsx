export function SkeletonCard() {
    return (
        <div style={{
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            padding: "26px",
            animation: "skeleton-pulse 1.5s ease-in-out infinite",
        }}>
            <div style={{ height: 160, borderRadius: 12, background: "rgba(255,255,255,0.06)", marginBottom: 18 }} />
            <div style={{ height: 16, borderRadius: 8, background: "rgba(255,255,255,0.06)", marginBottom: 10, width: "60%" }} />
            <div style={{ height: 24, borderRadius: 8, background: "rgba(255,255,255,0.06)", marginBottom: 10, width: "40%" }} />
            <div style={{ height: 12, borderRadius: 8, background: "rgba(255,255,255,0.06)", marginBottom: 8, width: "80%" }} />
            <div style={{ height: 12, borderRadius: 8, background: "rgba(255,255,255,0.06)", marginBottom: 8, width: "70%" }} />
            <div style={{ height: 12, borderRadius: 8, background: "rgba(255,255,255,0.06)", marginBottom: 24, width: "75%" }} />
            <div style={{ height: 42, borderRadius: 12, background: "rgba(255,255,255,0.06)" }} />
            <style>{`
                @keyframes skeleton-pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
}

export function SkeletonRow() {
    return (
        <div style={{
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            animation: "skeleton-pulse 1.5s ease-in-out infinite",
        }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.06)", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
                <div style={{ height: 14, borderRadius: 8, background: "rgba(255,255,255,0.06)", marginBottom: 8, width: "40%" }} />
                <div style={{ height: 12, borderRadius: 8, background: "rgba(255,255,255,0.06)", width: "60%" }} />
            </div>
            <div style={{ width: 80, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.06)" }} />
        </div>
    );
}

export function SkeletonStats() {
    return (
        <div style={{
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            padding: "24px",
            animation: "skeleton-pulse 1.5s ease-in-out infinite",
        }}>
            <div style={{ height: 12, borderRadius: 8, background: "rgba(255,255,255,0.06)", marginBottom: 12, width: "50%" }} />
            <div style={{ height: 32, borderRadius: 8, background: "rgba(255,255,255,0.06)", width: "70%" }} />
        </div>
    );
}