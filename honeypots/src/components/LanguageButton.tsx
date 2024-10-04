import React from 'react';

interface LanguageButtonProps {
  label: string;
  onClick: () => void;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({ label, onClick }) => {
  return (
    <button className="language-btn" onClick={onClick}>
      {label}
    </button>
  );
};

export default LanguageButton;
