import { useRouteError } from "react-router-dom"
import AlertMessage from "./UI/Alert"
import { useEffect, useState } from "react"


const ErrorBookList = () => {
  const [message, setMessage] = useState({})
  const error = useRouteError()

  useEffect(() => {
    if(error.response.status === 404) {
      setMessage({title: "Not Found!", message: "Could not find resource or page"})
    } else {
      setMessage({title: "An error occured!", message: "Something went wrong!"})
    }
  }, [])

  

  return (
    <AlertMessage variant={"danger"} message={message.message} title={message.title}/>
  )
}
export default ErrorBookList