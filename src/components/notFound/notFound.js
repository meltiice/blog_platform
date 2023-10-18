import { Link } from "react-router-dom/cjs/react-router-dom.min"

import classes from "./notFound.module.scss"

const NotFound = () => (
   <div className={classes['no-article']}>
      <p>No such an Article</p>
      <p><Link to={`/articles/`}>Go back</Link></p>
   </div>
);

export default NotFound;
