import { useSelector, useDispatch } from "react-redux"
import { getBooks } from "../features/userBooksSlice/userBooksSlice"
import { useEffect } from "react"


const MyBooks = () => {
  const dispatch = useDispatch()
  const {user : {token}} = useSelector(store => store.user)
  const {userBooks} = useSelector(store => store.userBooks)

  useEffect(() => {
    if (!userBooks)
    dispatch(getBooks({token,}))
  }, [])

  /* useEffect(() => {
    
  }, [userBooks]) */

  return (

    <>
    <h3>will be read</h3>
    {userBooks?.will_be_read?.map((book, i) => (
      <li key={i}>{book.title}</li>
    ))}
    <h3>has been read</h3>
    {userBooks?.has_been_read?.map((book, i) => (
      <li key={i}>{book.title}</li>
    ))}
    </>
  )
}
export default MyBooks