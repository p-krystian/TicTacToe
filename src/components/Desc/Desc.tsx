import { Text, View } from '@/components/ui';

function Desc() {
  return (
    <View>
      <Text>{'Tic Tac Toe'}</Text>

      <Text>
        {
          'Probably the most hardcore strategy game you have ever dealt with. Fasten your seatbelt and hold on tight!'
        }
      </Text>
      <Text>
        {
          "In this installment, you have a chance to face the bot, i.e. a combination of ones and zeros that are already in your computer's RAM!"
        }
      </Text>
      <Text>{'I think you know the rules. Good luck!'}</Text>
      <Text>
        {
          'PS. The author is not responsible for damages resulting from uncontrolled emotional reactions caused by frustration after unsuccessful ending of the game.'
        }
      </Text>
    </View>
  );
}

export default Desc;
