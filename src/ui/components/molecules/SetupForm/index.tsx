import { Icon } from "@iconify/react"
import { FormEvent } from "react"
import { InputTextField } from "../.."

type TSetUpForm = {
    userName: string,
    setUserName: React.Dispatch<React.SetStateAction<string>>,
    handelSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export const SetUpForm: React.FC<TSetUpForm> = ({ userName, setUserName, handelSubmit }) => {

    return <div className="grid justify-center mt-10">
        <form onSubmit={handelSubmit}>
            <div className="border-2 m-2 p-5 rounded-lg">
                <h3 className="text-center font-bold text-xl mb-2">Lets Get Started. 📱</h3>
                <div>
                    <InputTextField setStateValue={setUserName} stateValue={userName} />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 border focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-2.5 py-1 text-center inline-flex items-center" >
                        <Icon icon="bi:send-fill" className="m-2" />
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </div>
}