import {Box, FlatList, Image, Pressable, Spinner} from '@gluestack-ui/themed';
import {GestureResponderEvent} from 'react-native';
import useRegister from '../../hooks/useRegister';

interface IAvatarPressableProps {
  uri: string;
  onPress?: (e: GestureResponderEvent) => void;
  isSelected: boolean;
}

function AvatarPressable({uri, onPress, isSelected}: IAvatarPressableProps) {
  return (
    <Pressable
      m="$2"
      onPress={onPress}
      borderColor={isSelected ? '$green500' : 'transparent'}
      borderWidth={2}
      rounded="$full"
      $active={{opacity: 0.5}}>
      <Image role="img" alt="avatar" rounded="$full" source={{uri}} />
    </Pressable>
  );
}

export default function AvatarRegister() {
  const {
    selectedAvatar,
    freeAvatars,
    loadingFreeAvatars,
    handleSelectingAvatar,
  } = useRegister();
  return (
    <Box
      bg="rgba(82,82,82,0.5)"
      h="$56"
      w="$5/6"
      mt="$10"
      p="$4"
      rounded="$lg"
      alignItems="center">
      {loadingFreeAvatars ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Spinner size="large" color="$backgroundLight0" />
        </Box>
      ) : (
        <FlatList
          data={freeAvatars}
          keyExtractor={(item: any) => item.id}
          horizontal={false}
          numColumns={3}
          renderItem={({item}: {item: any}) => (
            <AvatarPressable
              uri={item.image_src}
              onPress={() => handleSelectingAvatar(item.id)}
              isSelected={selectedAvatar === item.id}
            />
          )}
        />
      )}
    </Box>
  );
}
