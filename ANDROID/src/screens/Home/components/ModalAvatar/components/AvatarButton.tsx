import {Pressable, Image} from '@gluestack-ui/themed';

interface IAvatarButton {
  id: number;
  onPress: () => void;
  image_src: string;
  selectedAvatar: number;
}

export default function AvatarButton({
  onPress,
  image_src,
  selectedAvatar,
  id,
}: IAvatarButton) {
  return (
    <Pressable
      m="$2"
      borderColor={selectedAvatar === id ? '$green500' : '$backgroundDark950'}
      borderWidth={1}
      rounded="$full"
      onPress={onPress}>
      <Image
        size="sm"
        role="img"
        alt="avatar"
        rounded="$full"
        source={{
          uri: image_src,
        }}
      />
    </Pressable>
  );
}
