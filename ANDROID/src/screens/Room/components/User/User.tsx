import {Box, Image, Text} from '@gluestack-ui/themed';
import Avatar from '../../../../components/Avatar/Avatar';

interface IUserProps {
  avatar_id: number;
  username: string;
}

export default function User({avatar_id = 0, username = ''}: IUserProps) {
  return (
    <Box
      w="$full"
      borderWidth="$1"
      borderColor="rgba(255,255,255,0.5)"
      rounded="$md"
      flexDirection="row"
      alignItems="center"
      p="$3">
      <Avatar imgH="$10" imgW="$10" boxH="$10" boxW="$10" id={avatar_id} />
      <Text color="$textLight0" fontWeight="600" numberOfLines={1} pl="$2">
        {username}
      </Text>
    </Box>
  );
}
