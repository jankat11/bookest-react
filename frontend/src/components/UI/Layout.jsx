import { Outlet } from "react-router-dom"
import Header from "../Header"
import { Container } from "react-bootstrap"


const Layout = () => {
  return (
    <>
    <Header />
    <main className="py-3">
      <Container>
        <Outlet />
      </Container>
    </main>    
  </>
  )
}
export default Layout