import { set } from "lodash";
import React, { useState, useEffect } from "react";
import { Text } from "react-native";

interface TypingAnimationProps {
  text: string;
  responseReady: boolean;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  responseReady,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [shouldClear, setShouldClear] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayText((prevText) => {
        if (responseReady && shouldClear) {
          // Clear existing text and start typing animation for the response text
          setShouldClear(false);
          setIsTyping(true);
          setIndex(0);
          return "";
        } else if (responseReady || isTyping) {
          // Continue typing animation for the response text or existing text
          if (index < text.length) {
            setIndex((prevIndex) => prevIndex + 1);
            return prevText + text[index];
          } else {
            setIsTyping(false);
            return prevText;
          }
        } else if (text === "Waiting for AI response...") {
          // Existing reverse animation logic
          if (index > 0) {
            setIndex((prevIndex) => prevIndex - 1);
            return prevText.slice(0, -1);
          } else {
            setIsTyping(true);
            setIndex(0);
            return prevText;
          }
        } else {
          // Existing stop animation logic
          clearInterval(timer);
          return prevText;
        }
      });
    }, 30); // Adjust the speed of typing by changing this value

    return () => clearInterval(timer);
  }, [text, isTyping, index, responseReady, shouldClear]);

  // Trigger the clear when responseReady becomes true
  useEffect(() => {
    if (responseReady) {
      setShouldClear(true);
    }
  }, [responseReady]);

  return <Text>{displayText}</Text>;
};

export default TypingAnimation;
