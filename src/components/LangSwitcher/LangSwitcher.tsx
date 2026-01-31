import { translations } from '@/assets/langs';
import { Button } from '@/components/ui';
import { setLanguage } from '@/stores/preference/setters';
import usePreference from '@/stores/preference/store';
import { useMemo } from 'react';

function LangSwitcher() {
  const language = usePreference(state => state.language);

  const [nextLangCode, nextLangName] = useMemo(() => {
    const keys = Object.keys(translations) as (keyof typeof translations)[];
    const nextIndex = (keys.indexOf(language) + 1) % keys.length;
    const nextCode = keys[nextIndex];

    return [nextCode, translations[nextCode].name] as const;
  }, [language]);

  return <Button title={nextLangName} onPress={() => setLanguage(nextLangCode)} />;
}

export default LangSwitcher;
