import { Icon } from "@iconify/react"
import { TAllMessagesResponse } from "../../../../services"

type TMessageList = {
    shared_by: string | undefined
    allMessages: TAllMessagesResponse | undefined
}

export const MessageList: React.FC<TMessageList> = ({
    shared_by,
    allMessages
}) => {
    return shared_by !== "" ? <div>
        <div className="mb-2 grid justify-center"><h1 className="text-xl font-bold">📁 Documents</h1></div>
        <div className="grid justify-center" >
            <ul className="list-none">
                {allMessages?.messages.map((item) => {
                    return item.shared_by === shared_by ?
                        <li className="flex p-1" key={item.id}>
                            <Icon icon="carbon:user-avatar-filled" className="ml-2 mr-2" color="lightblue" width={24} />
                            <span className="pr-2 font-semibold">{allMessages.users.shared_by.name} :</span>
                            {item.text}
                        </li> : <li className="flex p-1" key={item.id}>
                            <Icon icon="carbon:user-avatar-filled" className="ml-2 mr-2" color="brown" width={24} />
                            <span className="pr-2 font-semibold">{allMessages.users.shared_to.name} :</span>
                            {item.text}
                        </li>
                })}
            </ul>
        </div>
    </div> : null
}