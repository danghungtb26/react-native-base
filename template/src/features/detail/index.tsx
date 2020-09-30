import React, { Component } from 'react'
import { Text, View } from 'react-native'
import type { navigationCustomProps } from 'src/commons'
import { Box, TouchScale } from 'src/components'
import { ShareView, withTransitioner } from 'src/modules'

interface IProps extends navigationCustomProps {
  goBack: (callback: () => void) => void
}

interface IState {}

class Index extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {}
  }

  onGoBack: () => void = () => {
    const { navigation } = this.props
    console.log('Index -> onGoBack: -> this.props', this.props)
    // navigation!.goBack()
    const { goBack } = this.props
    goBack(() => {
      navigation!.goBack()
    })
  }

  render() {
    return (
      <Box flex={1} center padding={[12, 24, 12, 12]}>
        <ShareView name="red-box">
          <View style={{ width: 200, height: 200, backgroundColor: 'red' }} />
        </ShareView>

        {/* <ShareView name="blue-text"> */}
        <Text style={{ fontSize: 30 }}>Xin chao moi nguoi nhe</Text>
        {/* </ShareView> */}

        <Box marginTop={100}>
          <TouchScale onPress={this.onGoBack}>
            <ShareView name="red-box-2">
              <Box radius={100} style={{ width: 200, height: 200, backgroundColor: 'red' }} />
            </ShareView>
          </TouchScale>
        </Box>
      </Box>
    )
  }
}

export default withTransitioner<IProps>(Index, true)
