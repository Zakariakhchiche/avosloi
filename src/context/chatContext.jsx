import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * ChatContext is a context object that is used to share collection of messages
 * between components
 */
export const ChatContext = createContext();

/**
 * ChatContextProvider is a functional component that serves as a provider for the ChatContext.
 * It provides the ChatContext to the components within its subtree.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} A ChatContext.Provider element.
 */
export const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  // Sauvegarder les messages dans le localStorage
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const addMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      setMessages, 
      addMessage,
      clearMessages
    }}>
      {children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
