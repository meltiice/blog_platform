import classes from './error.module.scss'

const ErrorIndicator = (props) => {
  const { error } = props;
  const text = Object.keys(error).length > 0 ? Object.entries(error) : 'Something has gone terribly wrong';
  return (<div className={classes['error-indicator']}>
    <span>{text}</span>
    <div className="err-pic"></div>
  </div>)
};

export default ErrorIndicator;
