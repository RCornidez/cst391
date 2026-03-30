import { useEffect, useRef, useState } from 'react';
import './Typewriter.css';

interface TypewriterProps {
  words: string[];
}

export default function Typewriter({ words }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const wordIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function tick() {
      const word = words[wordIndex.current];

      if (isDeleting.current) {
        charIndex.current--;
      } else {
        charIndex.current++;
      }

      setDisplayed(word.slice(0, charIndex.current));

      let delay = isDeleting.current ? 75 : 110;

      if (!isDeleting.current && charIndex.current === word.length) {
        delay = 1800;
        isDeleting.current = true;
      } else if (isDeleting.current && charIndex.current === 0) {
        isDeleting.current = false;
        wordIndex.current = (wordIndex.current + 1) % words.length;
        delay = 350;
      }

      timeout.current = setTimeout(tick, delay);
    }

    timeout.current = setTimeout(tick, 110);
    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [words]);

  return (
    <span className="typewriter">
      {displayed}<span className="cursor">|</span>
    </span>
  );
}
