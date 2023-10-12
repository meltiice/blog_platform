import classes from './error.module.scss'

const ErrorIndicator = (props) => {
  const { isError } = props;
  const text = isError && !isError.fetchError ? null : 'Something has gone terribly wrong';

  return (<div className={classes['error-indicator']}>
                                  <span>{ text }</span>
                                </div>)
};

export default ErrorIndicator;
