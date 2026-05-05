import { useState, useRef, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface BookingConfirm {
    booking_ref: string;
    service: string;
    scheduled_at: string;
    total_price: number;
    id: number;
}

interface Props {
    services: { id: number; name: string; price: number; duration_minutes: number }[];
    vehicles: { id: number; make: string; model: string; plate_no: string }[];
}

const QUICK_PROMPTS = [
    "Book a Basic Wash for tomorrow",
    "What services do you offer?",
    "Book Premium Wash for Saturday 2PM",
    "Book Deluxe Detail this Sunday",
];

export default function AiChatIndex({ services, vehicles }: Props) {
    const { props } = usePage();
    const bookingConfirmedRef = (props as any).flash?.booking_confirmed as string | undefined;

const getInitialMessages = (): Message[] => {
    if (bookingConfirmedRef) {
        return [{
            role: 'assistant',
            content: `🎉 Booking **${bookingConfirmedRef}** confirmed!\n\nAapki car wash successfully book hogayi! Check your email for details. 📧\n\nKuch aur book karna hai ya koi sawaal hai? 😊`,
        }];
    }

    const resumed = localStorage.getItem('sparkbot_resume');
    if (resumed) {
        localStorage.removeItem('sparkbot_resume');
        const parsed = JSON.parse(resumed);
        return [
            ...parsed,
            {
                role: 'assistant',
                content: `✅ Vehicle add ho gaya! Ab time slot batao:\n\n1️⃣ 9:00 AM\n2️⃣ 11:00 AM\n3️⃣ 2:00 PM\n4️⃣ 4:00 PM\n5️⃣ 6:00 PM`,
            }
        ];
    }

    return [{
        role: 'assistant',
        content: `👋 Hi! I'm **SparkBot**, your AI booking assistant!\n\nI can help you book a car wash in seconds — just tell me:\n- Which service you want\n- When you'd like it\n- Which car\n\nWhat can I do for you today? 🚗✨`,
    }];
};

    const [messages, setMessages]     = useState<Message[]>(getInitialMessages);
    const [input, setInput]           = useState('');
    const [loading, setLoading]       = useState(false);
    const [booking, setBooking]       = useState<BookingConfirm | null>(null);
    const bottomRef                   = useRef<HTMLDivElement>(null);
    const inputRef                    = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);
    useEffect(() => {
        if (messages.length > 1) {
            localStorage.setItem('sparkbot_messages', JSON.stringify(messages));
        }
    }, [messages]);

    const sendMessage = async (text?: string) => {
        const content = (text || input).trim();
        if (!content || loading) return;

        const newMessages: Message[] = [...messages, { role: 'user', content }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/ai-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] ?? '',
                },
                body: JSON.stringify({
                    messages: newMessages.map(m => ({ role: m.role, content: m.content })),
                }),
            });

            const data = await res.json();

            if (data.error) {
                setMessages(prev => [...prev, { role: 'assistant', content: '❌ ' + data.error }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
                if (data.booking) setBooking(data.booking);
            }
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: '❌ Connection error. Please try again.' }]);
        } finally {
            setLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatMessage = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#38bdf8;font-weight:600;text-decoration:underline;">$1</a>')
            .replace(/\n/g, '<br/>');
    };

    return (
        <AuthenticatedLayout header={
            <h2 style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '1.1rem',
                background: 'linear-gradient(130deg, #dbeafe, #38bdf8, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}>
                🚗 AI Booking Assistant
            </h2>
        }>
            <Head title="AI Booking Assistant" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');

                .chat-root {
                    font-family: 'Outfit', sans-serif;
                    min-height: calc(100vh - 65px);
                    background: #04070f;
                    display: flex;
                    flex-direction: column;
                    padding: 24px;
                    gap: 20px;
                }

                .chat-container {
                    max-width: 820px;
                    margin: 0 auto;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    flex: 1;
                }

                .chat-header {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 20px;
                    padding: 20px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    backdrop-filter: blur(20px);
                }

                .chat-messages {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 20px;
                    padding: 24px;
                    min-height: 420px;
                    max-height: 520px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    scroll-behavior: smooth;
                }
                .chat-messages::-webkit-scrollbar { width: 4px; }
                .chat-messages::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.2); border-radius: 2px; }

                .bubble-wrap {
                    display: flex;
                    gap: 10px;
                    align-items: flex-start;
                }
                .bubble-wrap.user { flex-direction: row-reverse; }

                .avatar {
                    width: 34px; height: 34px;
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 0.85rem; font-weight: 700;
                    flex-shrink: 0;
                }
                .avatar.bot { background: linear-gradient(135deg, #0ea5e9, #22d3ee); color: #000; }
                .avatar.user { background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.2); }

                .bubble {
                    max-width: 75%;
                    padding: 12px 16px;
                    border-radius: 18px;
                    font-size: 0.9rem;
                    line-height: 1.65;
                    color: #eef4ff;
                }
                .bubble.bot {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 4px 18px 18px 18px;
                }
                .bubble.user {
                    background: rgba(56,189,248,0.12);
                    border: 1px solid rgba(56,189,248,0.2);
                    border-radius: 18px 4px 18px 18px;
                    color: #bae6fd;
                }

                .typing { display: flex; gap: 5px; padding: 14px 16px; }
                .typing span {
                    width: 7px; height: 7px;
                    background: #38bdf8; border-radius: 50%;
                    animation: bounce 1.2s infinite;
                }
                .typing span:nth-child(2) { animation-delay: 0.2s; }
                .typing span:nth-child(3) { animation-delay: 0.4s; }
                @keyframes bounce {
                    0%,60%,100% { transform: translateY(0); opacity: 0.4; }
                    30% { transform: translateY(-8px); opacity: 1; }
                }

                .quick-prompts {
                    display: flex; gap: 8px; flex-wrap: wrap;
                }
                .qp-btn {
                    background: rgba(56,189,248,0.06);
                    border: 1px solid rgba(56,189,248,0.15);
                    color: #7dd3fc;
                    padding: 7px 14px; border-radius: 50px;
                    font-size: 0.78rem; font-weight: 500;
                    cursor: pointer; font-family: 'Outfit', sans-serif;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                .qp-btn:hover {
                    background: rgba(56,189,248,0.12);
                    border-color: rgba(56,189,248,0.3);
                    color: #38bdf8;
                }

                .chat-input-area {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 20px;
                    padding: 16px 18px;
                    display: flex;
                    gap: 12px;
                    align-items: flex-end;
                }
                .chat-input-area:focus-within {
                    border-color: rgba(56,189,248,0.3);
                    box-shadow: 0 0 0 3px rgba(56,189,248,0.06);
                }
                .chat-textarea {
                    flex: 1; background: transparent; border: none; outline: none;
                    color: #eef4ff; font-size: 0.925rem;
                    font-family: 'Outfit', sans-serif; resize: none;
                    max-height: 100px; line-height: 1.5;
                }
                .chat-textarea::placeholder { color: #4b5e72; }
                .send-btn {
                    width: 42px; height: 42px; border-radius: 50%;
                    background: linear-gradient(135deg, #0ea5e9, #22d3ee);
                    border: none; cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.1rem; flex-shrink: 0;
                    transition: transform 0.2s, opacity 0.2s;
                }
                .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
                .send-btn:not(:disabled):hover { transform: scale(1.08); }

                .booking-card {
                    background: linear-gradient(135deg, rgba(14,165,233,0.1), rgba(34,211,238,0.05));
                    border: 1px solid rgba(56,189,248,0.3);
                    border-radius: 20px;
                    padding: 24px;
                    animation: slideUp 0.4s ease;
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .info-card {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px;
                    padding: 18px;
                }
            `}</style>

            <div className="chat-root">
                <div className="chat-container">

                    {/* Header */}
                    <div className="chat-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #22d3ee)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                                🤖
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#eef4ff', fontFamily: "'Outfit', sans-serif" }}>SparkBot</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
                                    <span style={{ fontSize: '0.75rem', color: '#22c55e' }}>Online · Groq Llama-3</span>
                                </div>
                            </div>
                        </div>
                        <Link href="/bookings" style={{ fontSize: '0.82rem', color: '#38bdf8', textDecoration: 'none', border: '1px solid rgba(56,189,248,0.2)', padding: '7px 14px', borderRadius: 50 }}>
                            My Bookings →
                        </Link>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20, alignItems: 'start' }}>

                        {/* Chat area */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                            {/* Messages */}
                            <div className="chat-messages">
                                {messages.map((msg, i) => (
                                    <div key={i} className={`bubble-wrap ${msg.role === 'user' ? 'user' : ''}`}>
                                        <div className={`avatar ${msg.role === 'user' ? 'user' : 'bot'}`}>
                                            {msg.role === 'user' ? '👤' : '🤖'}
                                        </div>
                                        <div
                                            className={`bubble ${msg.role === 'user' ? 'user' : 'bot'}`}
                                            dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                                        />
                                    </div>
                                ))}

                                {loading && (
                                    <div className="bubble-wrap">
                                        <div className="avatar bot">🤖</div>
                                        <div className="bubble bot">
                                            <div className="typing">
                                                <span /><span /><span />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={bottomRef} />
                            </div>

                            {/* Quick prompts */}
                            <div className="quick-prompts">
                                {QUICK_PROMPTS.map((p) => (
                                    <button key={p} className="qp-btn" onClick={() => sendMessage(p)} disabled={loading}>
                                        {p}
                                    </button>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="chat-input-area">
                                <textarea
                                    ref={inputRef}
                                    className="chat-textarea"
                                    placeholder="Type your message... (Enter to send)"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKey}
                                    rows={1}
                                    disabled={loading}
                                />
                                <button className="send-btn" onClick={() => sendMessage()} disabled={loading || !input.trim()}>
                                    ➤
                                </button>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                            {/* Services */}
                            <div className="info-card">
                                <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: '#38bdf8', fontWeight: 700, marginBottom: 12, textTransform: 'uppercase' }}>Services</div>
                                {services.map((s) => (
                                    <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                        <div>
                                            <div style={{ fontSize: '0.82rem', color: '#eef4ff', fontWeight: 500 }}>{s.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#4b5e72' }}>{s.duration_minutes} min</div>
                                        </div>
                                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#22d3ee' }}>${s.price}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Vehicles */}
                            <div className="info-card">
                                <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: '#38bdf8', fontWeight: 700, marginBottom: 12, textTransform: 'uppercase' }}>Your Vehicles</div>
                                {vehicles.length === 0 ? (
                                    <div style={{ fontSize: '0.82rem', color: '#4b5e72' }}>
                                        No vehicles added.{' '}
                                        <Link href="/vehicles" style={{ color: '#38bdf8' }}>Add one →</Link>
                                    </div>
                                ) : vehicles.map((v) => (
                                    <div key={v.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                        <span style={{ fontSize: '1rem' }}>🚗</span>
                                        <div>
                                            <div style={{ fontSize: '0.82rem', color: '#eef4ff', fontWeight: 500 }}>{v.make} {v.model}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#4b5e72' }}>{v.plate_no}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Tips */}
                            <div className="info-card">
                                <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: '#38bdf8', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase' }}>Tips</div>
                                {[
                                    'Say the service name',
                                    'Mention day & time',
                                    'Specify your car',
                                ].map((tip) => (
                                    <div key={tip} style={{ display: 'flex', gap: 7, marginBottom: 7, fontSize: '0.78rem', color: '#8896aa' }}>
                                        <span style={{ color: '#22d3ee' }}>✓</span> {tip}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Confirmation Card */}
                    {booking && (
                        <div className="booking-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                                <span style={{ fontSize: '2rem' }}>🎉</span>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#eef4ff' }}>Booking Confirmed!</div>
                                    <div style={{ fontSize: '0.82rem', color: '#22c55e' }}>Check your email for details</div>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
                                {[
                                    { label: 'Booking Ref',  value: booking.booking_ref },
                                    { label: 'Service',      value: booking.service },
                                    { label: 'Scheduled',    value: booking.scheduled_at },
                                    { label: 'Total',        value: `$${booking.total_price}` },
                                ].map((item) => (
                                    <div key={item.label} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 10, padding: '10px 14px' }}>
                                        <div style={{ fontSize: '0.68rem', color: '#4b5e72', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{item.label}</div>
                                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#eef4ff' }}>{item.value}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: 10 }}>
                                <Link href={`/bookings/${booking.id}/checkout`} style={{ flex: 1, textAlign: 'center', background: 'linear-gradient(135deg, #0ea5e9, #22d3ee)', color: '#000', fontWeight: 700, padding: '11px', borderRadius: 12, textDecoration: 'none', fontSize: '0.88rem' }}>
                                    💳 Pay Now — ${booking.total_price}
                                </Link>
                                <Link href={`/bookings/${booking.id}`} style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.05)', color: '#eef4ff', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 500, padding: '11px', borderRadius: 12, textDecoration: 'none', fontSize: '0.88rem' }}>
                                    View Booking →
                                </Link>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}