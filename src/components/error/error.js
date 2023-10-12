import classes from './error.module.scss'

const ErrorIndicator = () => {
  const text = 'Something has gone terribly wrong';

  return (<div className={classes['error-indicator']}>
                                  <span>{ text }</span>
                                </div>)
};

export default ErrorIndicator;
