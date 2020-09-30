import React, { Component } from 'react'
import FastImage, { FastImageProps } from 'react-native-fast-image'
import { Box } from '../view'

interface IState {}

/**
 * component dùng để hiển thị các ảnh thumb
 * sử dụng cho các component load ảnh từ server
 * có ảnh thumb phía sau, icon error khi ko load được ảnh
 */
class Thumb extends Component<FastImageProps, IState> {
  constructor(props: FastImageProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Box>
        <FastImage {...this.props} />
      </Box>
    )
  }
}

export default Thumb
