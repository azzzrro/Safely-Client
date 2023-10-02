import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';

const ChatInputField = ({ addMessage }: { addMessage: (message: string) => void }) => {
    const [message, setmessage] = useState("")

    const sendMessage = () => {
        addMessage(message)
        setmessage("")
    }
    return (
        <>
            <div className="md:flex items-center w-full">
                <div className="md:w-3/4 overflow-hidden">
                    <Input onChange={(e) => setmessage(e.target.value)} value={message} variant="static" placeholder="Type somthing..." crossOrigin={undefined} />
                </div>
                <div className="md:w-1/4 w-full md:mt-0 mt-3">
                    <Button
                        className="flex w-full justify-center items-center gap-2"
                        size="sm"
                        onClick={() => sendMessage()}
                        color="green">Send
                        <SendIcon className="text-white" style={{width:"auto",height:"15px"}} />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ChatInputField