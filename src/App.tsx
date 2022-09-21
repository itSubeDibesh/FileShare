import { FormEvent, useEffect, useState } from "react";
import { createUser, TAllMessagesResponse, TUser } from "./services";
import { MessageList, QRCard, QRCodeText, SetUpForm } from "./ui";

const App = () => {
  const [userDetails, setUserDetails] = useState<TUser>({
    uuid: localStorage.getItem("DEVICE_UUID"),
    name: localStorage.getItem("USER_NAME")
  })
  const [name, setUserName] = useState("")
  const [QRText, setQRText] = useState<QRCodeText>(undefined)

  const [messageResponse, setMessageResponse] = useState<TAllMessagesResponse>();

  // Form handler
  const handelSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name.length !== 0) {
      const response = await createUser({ name })
      if (response.success) {
        if (!userDetails.uuid && !userDetails.name) {
          const { uuid, name } = response.data;
          setUserDetails({ uuid, name })
          localStorage.setItem("DEVICE_UUID", uuid)
          localStorage.setItem("USER_NAME", name)
          setQRText(uuid)
        }
      }
      else alert(response.data)
    }
  }

  useEffect(() => {
    if (userDetails.uuid) setQRText(userDetails.uuid)
    else setQRText(undefined)
  }, [userDetails.uuid])

  return (
    <div className="relative">
      <div className="grid gap-4">
        {userDetails.uuid &&
          <div className="mt-10">
            <QRCard Details={userDetails} />
          </div>
        }
        {userDetails.uuid ?
          <MessageList allMessages={messageResponse} shared_by={userDetails.uuid} />
          : <SetUpForm userName={name} setUserName={setUserName} handelSubmit={handelSubmit} />
        }
      </div>
    </div>
  );
}

export default App;
