import React from "react";

interface EventItem {
  id: number;
  title: string;
  imageUrl: string;
  time: string;
}

const events: EventItem[] = [
  {
    id: 1,
    title: "PatriotHacks Judging",
    imageUrl:
      "https://patriothacks.org/wp-content/uploads/2024/08/Android-Large-1-3.png",
    time: "11:00 AM - 1:00 PM",
  },
  {
    id: 2,
    title: "PatriotHacks Awards",
    imageUrl: "https://www.instagram.com/p/DAWJZJnJ7cG/media?size=l",
    time: "2:00 PM - 3:00 PM",
  },
  {
    id: 3,
    title: "Microsoft Workshop",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBWjxuZx__a25hgj1JCqKkQF-6_UiqrUG7_g&s",
    time: "7:00 PM - 8:00 PM",
  },
  {
    id: 4,
    title: "Food Fair",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS900xoIDuiJYyFAfRHGFDRVVaZN9EI3Pgb4Q&s",
    time: "12:00 PM - 2:00 PM",
  },
];

const EventPage: React.FC = () => (
  <div className="w-full max-w-4xl mx-auto p-4 mt-[-150px]">
    <h1 className="text-[#ECB23A] text-4xl font-bold mb-6 text-center">
      Today's Events
    </h1>
    <div className="grid grid-cols-2 gap-6">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-48 object-scale-down"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-600">{event.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EventPage;
