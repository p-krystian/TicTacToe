import { Button } from '@/components/ui';
import { toggleTheme } from '@/stores/preference/setters';
import { useTranslation } from 'react-i18next';

function ThemeSwitcher() {
  const { t } = useTranslation();

  return <Button title={t('changeTheme')} onPress={toggleTheme} />;
}

export default ThemeSwitcher;
