import {Card, Col, Container, ProgressBar, Row, Spinner} from "react-bootstrap";

const WidgetCommonWait = () => {
  return (
    <>
      <ProgressBar animated now={100} label={"Loading"} variant={"secondary"}/>
    </>
  )
}

export default WidgetCommonWait;