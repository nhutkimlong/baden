import { Compass, Utensils, Ticket, Feather } from 'lucide-react';
import { Attraction, Suggestion, Event, Review, FoodPlace, FoodItem } from './types';

export const SAMPLE_SUGGESTIONS: Suggestion[] = [
  { id: 'plan', title: 'Lên lịch trình AI', description: 'Tạo kế hoạch tham quan cá nhân hóa', icon: Feather, action: { page: 'plan' } },
  { id: 'discover', title: 'Khám phá địa điểm', description: 'Tìm các điểm đến tâm linh, giải trí', icon: Compass, action: { page: 'discover' } },
  { id: 'food', title: 'Ăn gì ngon?', description: 'Các món đặc sản và nhà hàng địa phương', icon: Utensils, action: { page: 'food' } },
  { id: 'booking', title: 'Đặt vé cáp treo', description: 'Mua vé nhanh chóng, không cần xếp hàng', icon: Ticket, action: { page: 'booking' } },
];

export const SAMPLE_EVENTS: Event[] = [
    {
        id: 'event1',
        title: 'Lễ hội Vía Bà Linh Sơn Thánh Mẫu',
        date: 'Diễn ra từ mùng 4 đến mùng 6 tháng 5 âm lịch',
        image: 'https://picsum.photos/seed/event1/800/400',
    }
];

export const SAMPLE_ATTRACTIONS: Attraction[] = [
    {
        id: '1',
        name: 'Chùa Bà Đen',
        type: 'spiritual',
        rating: 4.8,
        reviews: 1250,
        image: 'https://picsum.photos/seed/chua-ba-den/800/600',
        images: ['https://picsum.photos/seed/chua-ba-den1/800/600', 'https://picsum.photos/seed/chua-ba-den2/800/600', 'https://picsum.photos/seed/chua-ba-den3/800/600'],
        description: 'Ngôi chùa cổ kính và linh thiêng nhất tại Núi Bà Đen, là nơi du khách thập phương đến cầu an, chiêm bái. Chùa có kiến trúc độc đáo và lịch sử lâu đời.',
        location: { lat: 11.3734, lng: 106.1668 }
    },
    {
        id: '2',
        name: 'Tượng Phật Bà Tây Bổ Đà Sơn',
        type: 'spiritual',
        rating: 4.9,
        reviews: 2100,
        image: 'https://picsum.photos/seed/tuong-phat-ba/800/600',
        images: ['https://picsum.photos/seed/tuong-phat-ba1/800/600', 'https://picsum.photos/seed/tuong-phat-ba2/800/600'],
        description: 'Tượng Phật Bà bằng đồng cao nhất châu Á tọa lạc trên đỉnh núi, là một công trình kiến trúc kỳ vĩ và là biểu tượng tâm linh của khu vực.',
        location: { lat: 11.3789, lng: 106.1682 }
    },
    {
        id: '3',
        name: 'Nhà ga cáp treo Vân Sơn',
        type: 'entertainment',
        rating: 4.5,
        reviews: 850,
        image: 'https://picsum.photos/seed/sun-world/800/600',
        images: ['https://picsum.photos/seed/sun-world1/800/600'],
        description: 'Nhà ga cáp treo lớn nhất thế giới, với kiến trúc ấn tượng và nhiều dịch vụ tiện ích cho du khách.',
        location: { lat: 11.3695, lng: 106.1621 }
    },
    {
        id: '4',
        name: 'Ma Thiên Lãnh',
        type: 'nature',
        rating: 4.6,
        reviews: 420,
        image: 'https://picsum.photos/seed/ma-thien-lanh/800/600',
        images: ['https://picsum.photos/seed/ma-thien-lanh1/800/600'],
        description: 'Cung đường trekking đầy thử thách nhưng bù lại là khung cảnh thiên nhiên hoang sơ, hùng vĩ và không khí trong lành, mát mẻ.',
        location: { lat: 11.3850, lng: 106.1590 }
    }
];

export const SAMPLE_REVIEWS: Review[] = [
    {
        id: 'r1',
        attractionId: '1',
        author: 'Nguyễn Văn A',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        rating: 5,
        date: '20/07/2024',
        comment: 'Nơi này rất linh thiêng và đẹp. Cảnh quan hùng vĩ, không khí trong lành. Sẽ quay lại vào dịp gần nhất.'
    },
    {
        id: 'r2',
        attractionId: '1',
        author: 'Trần Thị B',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
        rating: 4,
        date: '18/07/2024',
        comment: 'Chùa rất đẹp, tuy nhiên cuối tuần hơi đông. Nên đi vào ngày thường để có trải nghiệm tốt hơn.'
    },
    {
        id: 'r3',
        attractionId: '2',
        author: 'Lê Văn C',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
        rating: 5,
        date: '21/07/2024',
        comment: 'Tượng Phật Bà thật sự rất ấn tượng, một công trình vĩ đại. Đứng từ đây có thể ngắm toàn cảnh rất đẹp.'
    }
];

export const SAMPLE_FOOD_PLACES: FoodPlace[] = [
    {
        id: 'fp1',
        name: 'Nhà Hàng Vân Sơn',
        cuisine: 'Buffet, Món Việt',
        rating: 4.5,
        reviewsCount: 340,
        image: 'https://picsum.photos/seed/van-son/800/600',
    },
    {
        id: 'fp2',
        name: 'Ẩm thực chay Hoa Đăng',
        cuisine: 'Món chay',
        rating: 4.7,
        reviewsCount: 210,
        image: 'https://picsum.photos/seed/hoa-dang/800/600',
    }
];

export const SAMPLE_FOOD: FoodItem[] = [
    {
        id: 'f1',
        name: 'Bánh tráng phơi sương',
        description: 'Đặc sản Tây Ninh không thể bỏ qua',
        price: '50.000 VNĐ',
        image: 'https://picsum.photos/seed/banh-trang/400/400',
    },
    {
        id: 'f2',
        name: 'Ốc xu Núi Bà',
        description: 'Loài ốc hiếm chỉ có ở vùng núi này',
        price: '120.000 VNĐ',
        image: 'https://picsum.photos/seed/oc-xu/400/400',
    },
     {
        id: 'f3',
        name: 'Thằn lằn núi',
        description: 'Món ăn độc đáo, giàu dinh dưỡng',
        price: '150.000 VNĐ',
        image: 'https://picsum.photos/seed/than-lan/400/400',
    }
];
