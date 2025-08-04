import { Link } from "react-router-dom"

const OnePlayer = () => {
  return (
    <div className="flex-1">
      <div>
        <Link to="/normal"></Link>
        <Link to="/hard"></Link>
      </div>
    </div>
  )
}

export default OnePlayer