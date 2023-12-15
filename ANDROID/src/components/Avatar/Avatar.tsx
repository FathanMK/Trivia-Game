import {Box, Image, Spinner} from '@gluestack-ui/themed';
import {useQuery} from '@tanstack/react-query';
import axiosLaravel from '../../config/axiosLaravel';

interface IAvatarProps {
  id?: number;
  size?: any;
  boxH?: any;
  boxW?: any;
  imgH?: any;
  imgW?: any;
}

export default function Avatar({
  id,
  size,
  boxH,
  boxW,
  imgH,
  imgW,
}: IAvatarProps) {
  const {data: avatarData, isLoading} = useQuery({
    queryKey: ['avatar', id],
    queryFn: async () => {
      if (id === 0) {
        return {
          image_src:
            'https://res.cloudinary.com/dts5hyzdq/image/upload/v1698223958/vfygy9mtsax2i7zehkyl.jpg',
        };
      }
      const res = await axiosLaravel.get(`/avatar/${id}`);
      const {data} = res.data;
      return data;
    },
  });
  return (
    <Box borderWidth={2} borderColor="$backgroundLight0" rounded="$full">
      {isLoading ? (
        <Box h={boxH} w={boxW} alignItems="center" justifyContent="center">
          <Spinner size="small" color="$backgroundLight0" />
        </Box>
      ) : (
        <Image
          size={size}
          h={imgH}
          w={imgW}
          role="img"
          alt="avatar"
          rounded="$full"
          source={{
            uri: avatarData.image_src,
          }}
        />
      )}
    </Box>
  );
}
