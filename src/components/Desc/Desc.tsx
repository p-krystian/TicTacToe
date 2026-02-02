import { Spacer, Text, View } from '@/components/ui';
import { useTranslation } from 'react-i18next';

function Desc() {
  const { t } = useTranslation();

  return (
    <View className="gap-3.5">
      <Text accessibilityRole="header" className="font-comicRelif text-4xl">
        {t('title')}
      </Text>

      <Text>{t('desc0')}</Text>
      <Text>{t('desc1')}</Text>
      <Text>{t('desc2')}</Text>

      <Spacer />

      <Text>{t('warning')}</Text>
    </View>
  );
}

export default Desc;
