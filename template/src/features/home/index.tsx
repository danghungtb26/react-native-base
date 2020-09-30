import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import {
  AppContext,
  Box,
  ButtonLinear,
  ButtonPost,
  Divide,
  InputBorderLinear,
  SearchInput,
  TextBase,
  TextLinear,
  TouchScale,
} from 'src/components'
import type { navigationCustomProps } from 'src/commons'
import HeaderLinear from 'src/components/custom/view/HeaderLinear'
import { ShareView, withTransitioner } from 'src/modules'
import routes from 'src/navigation/routes'

interface IProps extends navigationCustomProps {
  updateSharedView: (callback: () => void) => void
}

interface IState {}

class Index extends Component<IProps, IState> {
  context!: React.ContextType<typeof AppContext>

  constructor(props: IProps) {
    super(props)
    this.state = {}
  }

  onGoToDetail = () => {
    const { navigation, updateSharedView } = this.props
    updateSharedView(() => {
      navigation!.navigate(routes.Detail)
    })
  }

  render() {
    const { i18n, colors } = this.context
    return (
      <Box flex={1}>
        <HeaderLinear title="Home" />
        <ScrollView>
          <Box alignItems="flex-start" color="green">
            <TouchScale
              zoomScale={0.95}
              onPress={() => {
                // console.log('object')
              }}>
              <Box width={40} color="red">
                <TextBase>9091</TextBase>
              </Box>
            </TouchScale>
          </Box>
          <Box margin={30}>
            <SearchInput />
          </Box>
          <Box row>
            <ShareView name="red-box">
              <Box style={{ width: 75, height: 75, backgroundColor: 'red' }} />
            </ShareView>
            <ShareView name="red-box-2">
              <Box radius={40} style={{ width: 75, height: 75, backgroundColor: 'red' }} />
            </ShareView>
          </Box>

          <ShareView name="blue-text">
            <TextBase style={{ fontSize: 14 }}>Xin chao moi nguoi nhe</TextBase>
          </ShareView>
          <Box margin={30}>
            <InputBorderLinear borderWidth={1} />
          </Box>
          <Divide />
          <Box alignItems="flex-start">
            <ButtonPost radius={4} shadow={3} title="settings" margin={50} color="red" />
          </Box>
          <Box alignItems="flex-start">
            <ButtonLinear
              onPress={this.onGoToDetail}
              radius={4}
              shadow={2}
              zIndex={1}
              color={colors.h_ffffff}
              title="settings"
              margin={50}
            />
          </Box>
          <Box shadow={2} marginVertical={40} wrap="nowrap">
            <TextLinear
              // maskStyle={{ width: '100%', height: 200 }}
              // height={200}
              size={40}
              // shadow={3}
              color="#fff">
              {`Xin chao ca nha chao ca nha chao ca nha${i18n.t('xinchao')}`}
            </TextLinear>
          </Box>
          <TextBase color="#000">{`Xin chao ca nha chao ca nha chao ca nha${i18n.t(
            'xinchao'
          )}`}</TextBase>
        </ScrollView>
      </Box>
    )
  }
}

export default withTransitioner<IProps>(Index)

Index.contextType = AppContext
