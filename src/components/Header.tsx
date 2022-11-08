import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HStack, Icon, Image, useTheme, View } from 'native-base';
import { TouchableOpacity } from 'react-native';

interface Props {
  showBackButton?: boolean;
}

export function Header({ showBackButton }: Props) {
  const { colors } = useTheme();
  const { goBack } = useNavigation();

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      py={4}
      px={6}
      position="absolute"
      top={4}
      left={0}
      right={0}
      zIndex={1000}
    >
      {showBackButton ? (
        <TouchableOpacity onPress={goBack}>
          <Icon
            as={<Ionicons name="arrow-back" />}
            color={colors.gray[50]}
            size={6}
          />
        </TouchableOpacity>
      ) : (
        <Icon as={<Ionicons name="menu" />} color={colors.gray[50]} size={6} />
      )}
      <View flexDir="row" alignItems="center">
        <View mr={4} position="relative">
          <View
            h={2}
            w={2}
            borderRadius={4}
            bgColor="blue.700"
            position="absolute"
            left={1}
            top={1}
            zIndex={10}
          />
          <Icon
            as={<Ionicons name="notifications-outline" />}
            color={colors.gray[50]}
            size={6}
          />
        </View>
        <Image
          source={{ uri: 'https://github.com/augustomarcelo.png' }}
          width={8}
          height={8}
          alt="Avatar image"
          borderRadius={999}
        />
      </View>
    </HStack>
  );
}
