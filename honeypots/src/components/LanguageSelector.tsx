import React, { useEffect, useState } from 'react';
import { fetchLanguages } from '../api/languageAPI';
import LanguageButton from './LanguageButton';
import './LanguageSelector.css';

interface Language {
  code: string;
  label: string;
}

const LanguageSelector: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    const loadLanguages = async () => {
      const data = await fetchLanguages();
      setLanguages(data);
    };

    loadLanguages();
  }, []);

  return (
    <div className="language-selector">
      <h2>Select your Preferred Language</h2>
      <div className="languages-grid">
        {languages.map((lang) => (
          <LanguageButton
            key={lang.code}
            label={lang.label}
            onClick={() => console.log(`Selected: ${lang.label}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
