import React, { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

interface ScrambleTextProps {
  targetText: string;
  duration?: number;
  className?: string;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  targetText,
  duration = 750,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState(targetText);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.max(15, Math.floor(duration / 30));
    let animationInterval: ReturnType<typeof setInterval>;

    const runScramble = () => {
      frame++;
      const progress = frame / totalFrames;

      const scrambled = targetText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          // Characters lock into place from left to right as progress increases
          const charThreshold = index / targetText.length;
          if (progress > charThreshold + 0.25 || progress >= 1) {
            return char;
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplayText(scrambled);

      if (frame >= totalFrames) {
        clearInterval(animationInterval);
        setDisplayText(targetText);
      }
    };

    animationInterval = setInterval(runScramble, 30);

    return () => {
      clearInterval(animationInterval);
    };
  }, [targetText, duration]);

  return <span className={className}>{displayText}</span>;
};
