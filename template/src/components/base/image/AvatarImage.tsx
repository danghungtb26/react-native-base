import React from 'react'
import { Text, View } from 'react-native'

export interface IPropsAvatarImage {}

// sử dụng cho avtar dùng ảnh
// có thêm ảnh thumb nếu cần
const AvatarImage: (props: IPropsAvatarImage) => React.ReactNode = () => {
  return (
    <View>
      <Text>AvatarImage</Text>
    </View>
  )
}

export default AvatarImage
