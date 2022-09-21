import Centrifuge from "centrifuge";
import { FormEvent, useEffect, useState } from "react";
import { createUser, getMessages, setupCentrifuge, TMessageResponse, TUser } from "./services";
import { MessageList, QRCard, SetUpForm } from "./ui";
import { Logger } from "./utils";

const App = () => {
  const
    log = new Logger("App").log,
    [inputName, setInputName] = useState(""),
    [centrifuge, setCentrifuge] = useState<Centrifuge>(),
    [userDetails, setUserDetails] = useState<TUser>({
      uuid: localStorage.getItem("DEVICE_UUID"),
      name: localStorage.getItem("USER_NAME")
    })

  const [messageResponse, setMessageResponse] = useState<TMessageResponse[]>([]);

  // Handlers
  const
    handelSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (inputName.length !== 0) {
        const response = await createUser({ name: inputName })
        if (response.success) {
          if (!userDetails.uuid && !userDetails.name) {
            const { uuid, name } = response.data;
            setUserDetails({ uuid, name })
            localStorage.setItem("DEVICE_UUID", uuid)
            localStorage.setItem("USER_NAME", name)
          }
        }
        else alert(response.data)
      }
    },
    setUpApp = async () => {
      if (userDetails.uuid) {
        const response = await getMessages(userDetails.uuid);
        log("setUpApp, response:", response)
        if (response.success) {
          setMessageResponse(response.data)
        }
      }
    },
    setupSocket = async () => {
      const socket = await setupCentrifuge(`${userDetails.uuid}`);
      socket.on('connect', (ctx) => log(`Centrifuge Connected, Context:`, ctx))
      socket.on('disconnect', (ctx) => log(`Centrifuge Disconnected, Context:`, ctx))
      setCentrifuge(socket);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSocketAction = (data: TMessageResponse) => {
    log("handleSocketAction:", data)
    setMessageResponse((prev) => {
      return [...prev, data]
    })
  }

  // ON Load
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setUpApp(); setupSocket(); }, [])

  // Subscribing to Socked Events
  useEffect(() => {
    let centrifugeSub: Centrifuge.Subscription | undefined;
    log('Centrifuge subscription, UUID:', userDetails.uuid)
    if (userDetails.uuid)
      centrifugeSub = centrifuge?.subscribe(
        `${userDetails.uuid}`, (ctx) => {
          log('Centrifuge subscription, Context', ctx)
          // eslint-disable-next-line react-hooks/exhaustive-deps
          handleSocketAction(ctx.data.data)
        })
    return () => {
      log('Centrifuge removed subscription')
      centrifugeSub?.unsubscribe()
    }
  }, [centrifuge, userDetails.uuid, log])

  return (
    <div className="relative">
      <div className="grid gap-4">
        {userDetails.uuid &&
          <div className="mt-10">
            <QRCard Details={userDetails} />
          </div>
        }
        {userDetails.uuid ?
          <MessageList allMessages={messageResponse} shared_to={userDetails.uuid} shared_to_name={userDetails.name} />
          : <SetUpForm userName={inputName} setUserName={setInputName} handelSubmit={handelSubmit} />
        }
      </div>
    </div>
  );
}

export default App;
