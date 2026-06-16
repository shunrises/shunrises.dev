import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export interface RevealTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const RevealText: React.FC<RevealTextProps> = ({
  text,
  className = "",
  style = {},
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const split = SplitText.create(rootRef.current.querySelector("p"), {
      type: "chars",
      charsClass: "inline-block will-change-transform",
    });

    gsap.from(split.chars, {
      opacity: 0,
      y: 8,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.015,
    });

    return () => {
      split.revert();
    };
  }, []);

  const lines = text.split("\n");

  return (
    <div ref={rootRef} className={`${className}`} style={style}>
      <p>
        {lines.map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default RevealText;
