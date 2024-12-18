import { useState } from "react";
import { Note } from "@/types/utils";
import { Send } from 'lucide-react';

export const Notes = ({messages}: {messages: Note[]}) => {

    const [newMessage, setNewMessage] = useState('')

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Notes</h2>
            <div className="space-y-6">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isYou ? 'justify-end' : 'items-start'}`}>
                        {!message.isYou && (
                            <img
                                src={message.avatar}
                                alt={message.sender}
                                className="w-10 h-10 rounded-full mr-3"
                            />
                        )}
                        <div className={`flex flex-col ${message.isYou ? 'items-end' : ''}`}>
                            <div className="flex justify-between w-full gap-2 mb-1">
                                <span className="text-sm font-medium">{message.sender}</span>
                                <span className="text-sm text-gray-500">{message.timestamp}</span>
                            </div>
                            <div
                                className={`p-3 rounded-lg max-w-md ${message.isYou
                                    ? 'bg-[#3A3B55] text-white rounded-tr-none'
                                    : 'bg-gray-100 text-gray-900 rounded-tl-none'
                                    }`}
                            >
                                {message.message}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Type Here"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="p-2 text-gray-600 hover:text-gray-900">
                    <Send className="w-5 h-5 text-black font-extrabold" />
                </button>
            </div>
        </div>
    )
}