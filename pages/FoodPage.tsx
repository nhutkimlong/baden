import React from 'react';
import Header from '../components/Header';
import { SAMPLE_FOOD_PLACES, SAMPLE_FOOD } from '../constants';
import { FoodPlace, FoodItem, PageProps } from '../types';
import Rating from '../components/Rating';

const FoodPlaceCard: React.FC<{ place: FoodPlace }> = ({ place }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
        <img src={place.image} alt={place.name} className="w-full h-40 object-cover" />
        <div className="p-4">
            <h3 className="font-bold text-lg">{place.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{place.cuisine}</p>
            <div className="flex items-center mt-2">
                <Rating rating={place.rating} />
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({place.reviewsCount} đánh giá)</span>
            </div>
        </div>
    </div>
);

const FoodItemCard: React.FC<{ item: FoodItem }> = ({ item }) => (
    <div className="flex items-center bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
        <img src={item.image} alt={item.name} className="w-24 h-24 rounded-md object-cover"/>
        <div className="ml-4 flex-1">
            <h4 className="font-bold">{item.name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
            <p className="text-green-700 dark:text-green-400 font-semibold mt-2">{item.price}</p>
        </div>
    </div>
);

const FoodPage: React.FC<PageProps> = ({ navigateTo, theme, toggleTheme }) => {
    return (
        <div className="dark:bg-slate-900 min-h-full">
            <Header title="Ẩm thực" onBack={() => navigateTo({ page: 'home' })} theme={theme} toggleTheme={toggleTheme}/>
            <div className="p-4 space-y-6">
                <section>
                    <h2 className="text-xl font-bold mb-3">Nhà hàng nổi bật</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {SAMPLE_FOOD_PLACES.map(place => <FoodPlaceCard key={place.id} place={place} />)}
                    </div>
                </section>
                <section>
                    <h2 className="text-xl font-bold mb-3">Món ngon phải thử</h2>
                    <div className="space-y-3">
                        {SAMPLE_FOOD.map(item => <FoodItemCard key={item.id} item={item} />)}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default FoodPage;