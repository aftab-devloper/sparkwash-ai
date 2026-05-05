import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
    plate_no: string;
    color: string;
}

interface Props {
    vehicles: Vehicle[];
}

export default function Index({ vehicles }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        make: '',
        model: '',
        year: '',
        plate_no: '',
        color: '',
    });

    
const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('vehicles.store'), {
        onSuccess: () => {
            reset();
            const saved = localStorage.getItem('sparkbot_messages');
            if (saved) {
                localStorage.setItem('sparkbot_resume', saved);
                setTimeout(() => {
                    window.location.href = '/ai-chat';
                }, 100);
            }
        },
    });
};

    const deleteVehicle = (id: number) => {
        if (confirm('Delete this vehicle?')) {
            router.delete(route('vehicles.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout header={
            <h2 style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700, fontSize: '1.1rem',
                background: 'linear-gradient(130deg, #dbeafe, #38bdf8, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}>
                🚗 My Vehicles
            </h2>
        }>
            <Head title="My Vehicles" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

                .veh-root {
                    min-height: calc(100vh - 65px);
                    background: #04070f;
                    padding: 40px 24px;
                    font-family: 'Outfit', sans-serif;
                    color: #eef4ff;
                }
                .veh-con { max-width: 1180px; margin: 0 auto; display: flex; flex-direction: column; gap: 28px; }

                .veh-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 20px; padding: 28px;
                }
                .veh-card-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 1rem; font-weight: 700;
                    color: #eef4ff; margin-bottom: 24px;
                    display: flex; align-items: center; gap: 8px;
                }

                /* Form */
                .veh-form { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .veh-field { display: flex; flex-direction: column; gap: 6px; }
                .veh-label { font-size: 0.78rem; font-weight: 600; color: #8896aa; letter-spacing: 0.04em; text-transform: uppercase; }
                .veh-input {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px; padding: 10px 14px;
                    color: #eef4ff; font-size: 0.9rem;
                    font-family: 'Outfit', sans-serif;
                    outline: none; transition: all 0.2s;
                }
                .veh-input::placeholder { color: #4b5e72; }
                .veh-input:focus {
                    border-color: rgba(56,189,248,0.4);
                    background: rgba(56,189,248,0.04);
                    box-shadow: 0 0 0 3px rgba(56,189,248,0.06);
                }
                .veh-error { font-size: 0.72rem; color: #ef4444; margin-top: 2px; }

                .veh-btn {
                    width: 100%; padding: 12px;
                    background: linear-gradient(135deg, #0ea5e9, #22d3ee);
                    border: none; border-radius: 12px;
                    color: #000; font-weight: 700;
                    font-family: 'Syne', sans-serif; font-size: 0.9rem;
                    cursor: pointer; transition: all 0.25s;
                    box-shadow: 0 0 24px rgba(56,189,248,0.2);
                }
                .veh-btn:hover { transform: translateY(-1px); box-shadow: 0 0 36px rgba(56,189,248,0.35); }
                .veh-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

                /* Vehicle cards */
                .veh-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
                .veh-item {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px; padding: 18px;
                    display: flex; align-items: center; gap: 14px;
                    transition: all 0.25s; position: relative;
                }
                .veh-item:hover {
                    border-color: rgba(56,189,248,0.2);
                    background: rgba(56,189,248,0.03);
                    transform: translateY(-2px);
                }
                .veh-item-icon {
                    width: 48px; height: 48px; border-radius: 14px;
                    background: rgba(56,189,248,0.1);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.4rem; flex-shrink: 0;
                }
                .veh-item-name {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700; font-size: 0.95rem; color: #eef4ff;
                }
                .veh-item-plate {
                    font-size: 0.78rem; color: #38bdf8;
                    margin-top: 2px; font-weight: 500;
                }
                .veh-item-color {
                    font-size: 0.72rem; color: #8896aa; margin-top: 2px;
                }
                .veh-delete {
                    position: absolute; top: 12px; right: 12px;
                    background: rgba(239,68,68,0.08);
                    border: 1px solid rgba(239,68,68,0.15);
                    border-radius: 8px; padding: 4px 8px;
                    color: #ef4444; font-size: 0.72rem;
                    cursor: pointer; transition: all 0.2s;
                    font-family: 'Outfit', sans-serif;
                }
                .veh-delete:hover { background: rgba(239,68,68,0.15); }

                .veh-empty {
                    text-align: center; padding: 40px;
                    color: #8896aa; font-size: 0.9rem;
                }

                @media (max-width: 640px) {
                    .veh-root { padding: 20px 16px; }
                    .veh-form { grid-template-columns: 1fr; }
                }
            `}</style>

            <div className="veh-root">
                <div className="veh-con">

                    {/* Add Form */}
                    <div className="veh-card">
                        <div className="veh-card-title">➕ Add New Vehicle</div>
                        <form onSubmit={submit}>
                            <div className="veh-form">
                                {[
                                    { label: 'Make',     key: 'make',     placeholder: 'Honda, Toyota...' },
                                    { label: 'Model',    key: 'model',    placeholder: 'Civic, Corolla...' },
                                    { label: 'Year',     key: 'year',     placeholder: '2024' },
                                    { label: 'Plate No', key: 'plate_no', placeholder: 'ABC-123' },
                                    { label: 'Color',    key: 'color',    placeholder: 'White, Black...' },
                                ].map((field) => (
                                    <div key={field.key} className="veh-field">
                                        <label className="veh-label">{field.label}</label>
                                        <input
                                            type={field.key === 'year' ? 'number' : 'text'}
                                            value={data[field.key as keyof typeof data]}
                                            onChange={e => setData(field.key as keyof typeof data, e.target.value)}
                                            className="veh-input"
                                            placeholder={field.placeholder}
                                        />
                                        {errors[field.key as keyof typeof errors] && (
                                            <span className="veh-error">{errors[field.key as keyof typeof errors]}</span>
                                        )}
                                    </div>
                                ))}

                                <div className="veh-field" style={{ justifyContent: 'flex-end' }}>
                                    <button type="submit" disabled={processing} className="veh-btn">
                                        {processing ? 'Adding...' : '+ Add Vehicle'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Vehicles List */}
                    <div className="veh-card">
                        <div className="veh-card-title">🚗 My Cars ({vehicles.length})</div>
                        {vehicles.length === 0 ? (
                            <div className="veh-empty">
                                No vehicles added yet — add your first car above! 🚗
                            </div>
                        ) : (
                            <div className="veh-grid">
                                {vehicles.map((v) => (
                                    <div key={v.id} className="veh-item">
                                        <div className="veh-item-icon">🚙</div>
                                        <div style={{ flex: 1 }}>
                                            <div className="veh-item-name">{v.year} {v.make} {v.model}</div>
                                            <div className="veh-item-plate">{v.plate_no}</div>
                                            {v.color && <div className="veh-item-color">🎨 {v.color}</div>}
                                        </div>
                                        <button
                                            className="veh-delete"
                                            onClick={() => deleteVehicle(v.id)}
                                        >
                                            🗑 Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}