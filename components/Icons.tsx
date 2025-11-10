
import React from 'react';

export const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z"
      clipRule="evenodd"
    />
  </svg>
);

export const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.042.02c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.67-1.34l.042-.02z"
      clipRule="evenodd"
    />
    <path d="M12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" />
  </svg>
);

export const BackIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
      clipRule="evenodd"
    />
  </svg>
);

export const StopIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
    </svg>
);

export const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.035l2.47-2.47a.75.75 0 011.06 1.06l-2.47 2.47a5.25 5.25 0 01-7.424-7.424l4.5-4.5a5.25 5.25 0 017.424 7.424l-1.03 1.03a.75.75 0 01-1.06-1.06l1.03-1.03a3.75 3.75 0 000-5.304zm-7.424 14.302a3.75 3.75 0 005.304 0l4.5-4.5a3.75 3.75 0 00-1.035-6.035l-2.47 2.47a.75.75 0 01-1.06-1.06l2.47-2.47a5.25 5.25 0 017.424 7.424l-4.5 4.5a5.25 5.25 0 01-7.424-7.424l1.03-1.03a.75.75 0 111.06 1.06l-1.03 1.03a3.75 3.75 0 000 5.304z" clipRule="evenodd" />
    </svg>
);
