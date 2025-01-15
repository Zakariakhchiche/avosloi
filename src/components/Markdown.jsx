import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Markdown = ({ children }) => {
  if (!children) return null;
  
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown>
        {children}
      </ReactMarkdown>
    </div>
  );
};

Markdown.propTypes = {
  children: PropTypes.string,
};

export default Markdown;
