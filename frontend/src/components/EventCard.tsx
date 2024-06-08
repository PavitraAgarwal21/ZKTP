import React from 'react';
import { Event } from './CreateEvents'; // Adjust the import path if needed

type EventCardProps = {
    event: Event;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <div className="event-card">
            <p>Index: {event.index}</p>
            <p>Creator: {event.creator}</p>
            <p>Event Name: {event.event_name}</p>
            <p>Available Tickets: {event.availableTicket}</p>
            <p>Price: {event.price}</p>
        </div>
    );
};

export default EventCard;
