import PropTypes from 'prop-types';
import classes from './article.module.scss'
import ArticleInfo from '../articleInfo';

const Article = (props) => {
   const { title, text, tagsList, author, likes, isLiked, slug } = props;
   return (
      <div className={classes.article}>
         <ArticleInfo
         title={title}
         text={text}
         tagsList={tagsList}
         author={author}
         likes={likes}
         isLiked={isLiked}
         slug={slug}
         />
      </div>
   )
}

Article.defaultProps = {
   title: '',
   text: '',
   tagsList: [],
   author: '',
   likes: 0,
   isLiked: false
 };
Article.propTypes = {
   title: PropTypes.string,
   text: PropTypes.string,
   tagsList: PropTypes.arrayOf(PropTypes.string),
   author: PropTypes.object,
   likes: PropTypes.number,
   isLiked: PropTypes.bool
 };

export default Article
