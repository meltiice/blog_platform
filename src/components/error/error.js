import classes from './error.module.scss'

const ErrorIndicator = () => (
  <div className={classes['error-indicator']}>
    <span className="boom">BOOOM! </span>
    <span>Something has gone terribly wrong</span>
    <span>(but i`m not gonna fix it)</span>
    <div className="err-pic"></div>
  </div>
);

export default ErrorIndicator;
