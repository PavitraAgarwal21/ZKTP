import React from 'react';
import './NotificationBar.css'; // Assuming you will add some basic styling

type NotificationBarProps = {
    message: string;
    onClose: () => void;
};
const NotificationBar: React.FC<NotificationBarProps> = ({ message, onClose }) => {
    return (
        <div className="notification-bar">
            <span>{message}</span>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default NotificationBar;
