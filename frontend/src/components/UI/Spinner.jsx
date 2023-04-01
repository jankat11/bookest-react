import { Spinner } from "react-bootstrap"

const LoadingSpinner = ({variant, size}) => {
  return (
    <Spinner className="loadingSpinner" animation="grow" variant={variant} size={size} />
  )
}
export default LoadingSpinner