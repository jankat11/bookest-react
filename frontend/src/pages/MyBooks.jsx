import { useSelector, useDispatch } from "react-redux"
import { getBooks } from "../features/userBooksSlice/userBooksSlice"
import { useEffect } from "react"

const MyBooks = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBooks())
  }, [])


  return (
    <>My Books</>
  )
}
export default MyBooks