interface ErrorMessageProps{message:string}

function ErrorMessage({ message }:ErrorMessageProps){
  return <p>{message}</p>;
}

export default ErrorMessage;