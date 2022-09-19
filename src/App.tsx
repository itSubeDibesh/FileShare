import { useEffect, useState } from "react";
import { getMessages, TGetMessage } from "./services";
import { QRCard } from "./ui";
import { Store } from "./utils";
import { Icon } from "@iconify/react"

const App = () => {
  const UserId = Store.get("DEVICE_UUID") || "";
  const [message, setMessage] = useState<TGetMessage[]>([]);

  const setupFn = async () => {
    const data = await getMessages(UserId);
    console.log(data)
    setMessage(data);
  }

  useEffect(() => {
    setupFn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative">
      <div className="grid gap-4">
        <div className="mt-10">
          <QRCard />
        </div>
        <div className="h-full" >
          <div className="mr-10 ml-10" >
            <ul className="list-none">
              {message.map((item) => {
                return item.shared_by === UserId ?
                  <li className="text-right flex justify-end" key={item.id}>
                    {item.text}
                    <Icon icon="carbon:user-avatar-filled" className="ml-2 mr-2" color="lightblue" width={24} />
                  </li> : <li className="text-left flex justify-start" key={item.id}>
                    <Icon icon="carbon:user-avatar-filled" className="ml-2 mr-2" color="brown" width={24} />
                    {item.text}
                  </li>
              })}
            </ul>
          </div>
        </div>
        <div className="absolute w-full z-10">
          <div className="fixed inset-x-0 bottom-0 mr-5 ml-5 mb-2">
            <form onSubmit={e => e.preventDefault()}>
              <label htmlFor="chat" className="sr-only">Your message</label>
              <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg border-2">
                <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                  <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Upload image</span>
                </button>
                <textarea className="h-[50px] block resize-none mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your message..."></textarea>
                <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100">
                  <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                  <span className="sr-only">Send message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
