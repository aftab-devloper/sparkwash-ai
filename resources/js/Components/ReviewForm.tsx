import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function ReviewForm({ bookingId }: { bookingId: number }) {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

    const submit = () => {
        if (rating === 0) return;
        setSubmitting(true);
        router.post(`/bookings/${bookingId}/review`,
            { rating, comment },
            { onFinish: () => setSubmitting(false) }
        );
    };

    return (
        <div className="mt-3 space-y-3 rounded-lg border border-dashed border-gray-300 p-4">
            <p className="text-sm font-medium text-gray-700">⭐ Leave a Review</p>

            {/* Stars */}
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        className="text-3xl focus:outline-none transition-transform hover:scale-110"
                    >
                        <span className={
                            star <= (hovered || rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                        }>★</span>
                    </button>
                ))}
                {rating > 0 && (
                    <span className="ml-2 text-sm font-medium text-gray-600">
                        {labels[rating]}
                    </span>
                )}
            </div>

            {/* Comment */}
            <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Share your experience... (optional)"
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={submit}
                disabled={rating === 0 || submitting}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white
                           hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50
                           transition-colors"
            >
                {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
        </div>
    );
}