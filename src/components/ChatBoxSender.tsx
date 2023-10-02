
const ChatBoxSender = ({ avatar, message }: { avatar: string, message: string }) => {
    return (
        <div className='chat chat-end w-full'>
            <div className="chat-bubble text-white">{message}</div>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={avatar} />
                </div>
            </div>
        </div>
    )
}

export default ChatBoxSender