import { Link } from "react-router"

export default function Layout() {
  return (
    <>
      <div className="container mt-4">
        <Link to="/login">登入</Link>
      </div>
    </>
  )
}