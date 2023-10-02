
const ChatBoxReciever = ({ avatar, message }: { avatar: string, message: string }) => {
    return (
        <div className="chat chat-start w-full">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={avatar} />
                </div>
            </div>
            <div className="chat-bubble chat-bubble-success text-white">{message}</div>
        </div>
    )
}

export default ChatBoxReciever