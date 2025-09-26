import React from 'react';
import Header from '../components/Header';
import { SAMPLE_REVIEWS, SAMPLE_ATTRACTIONS } from '../constants';
import { Review, PageProps } from '../types';
import Rating from '../components/Rating';
import StarRatingInput from '../components/StarRatingInput';

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
    <div className="flex items-center mb-2">
      <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full mr-3" />
      <div>
        <p className="font-semibold">{review.author}</p>
        <p className="text-xs text-gray-500">{review.date}</p>
      </div>
      <div className="ml-auto">
        <Rating rating={review.rating} />
      </div>
    </div>
    <p className="text-sm text-gray-700 dark:text-gray-300">{review.comment}</p>
  </div>
);

const ReviewsPage: React.FC<PageProps> = ({ navigateTo, theme, toggleTheme, attractionId }) => {
  const attraction = SAMPLE_ATTRACTIONS.find(a => a.id === attractionId);
  const reviews = SAMPLE_REVIEWS.filter(r => r.attractionId === attractionId);

  if (!attraction) {
    return (
      <div>
        <Header title="Không tìm thấy" onBack={() => navigateTo({ page: 'discover' })} theme={theme} toggleTheme={toggleTheme} />
        <p className="p-4">Không tìm thấy địa điểm này.</p>
      </div>
    );
  }

  return (
    <div className="dark:bg-slate-900 min-h-full">
      <Header title={`Đánh giá: ${attraction.name}`} onBack={() => navigateTo({ page: 'detail', attractionId: attraction.id })} theme={theme} toggleTheme={toggleTheme} />
      <div className="p-4 space-y-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
            <h2 className="font-bold text-lg mb-2">Viết đánh giá của bạn</h2>
            <StarRatingInput />
            <textarea 
                className="w-full mt-2 p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600"
                placeholder="Chia sẻ trải nghiệm của bạn..."
                rows={3}
            />
            <button className="w-full bg-green-700 text-white font-bold py-2 rounded-lg mt-2">
                Gửi đánh giá
            </button>
        </div>

        <div>
            <h2 className="text-xl font-bold mb-3">Tất cả đánh giá ({reviews.length})</h2>
            <div className="space-y-3">
                {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
