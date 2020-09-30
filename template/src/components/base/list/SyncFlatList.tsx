import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  FlatListProps,
} from 'react-native'
import { sizes } from 'src/configs'
import { TextBase } from '../text'
// import { sizes, colors } from 'src/config'
// import { TextBase } from '../base'

export interface IPropsSyncFlatList {
  data?: any[]
  page?: {
    current: number
    max: number
  }
  loading?: boolean
  error?: string | null | undefined
}

export interface IStatesSyncFlatList {
  refresh: boolean
}

// interface SyncFlatList<P = {} | IPropsSyncFlatList, S = {} | IStatesSyncFlatList>
//   extends Component<P, S> {}

abstract class SyncFlatList<
  P extends IPropsSyncFlatList,
  S extends IStatesSyncFlatList,
  SS = { [x: string]: any }
> extends Component<P & IPropsSyncFlatList, Pick<S & IPropsSyncFlatList, 'refresh'>> {
  isGetData: boolean = false

  constructor(props: P) {
    super(props)
    this.state = {
      refresh: false,
    }
  }

  onGetData = (page: number, oldData: SS[], ...arg: any[]) => {
    console.log('onGetData -> arg', arg)

    console.log('SyncFlatList -> onGetData -> oldData', oldData)
    console.log('SyncFlatList -> onGetData -> page', page)
  }

  // khi load lại page
  onRefresh = () => {
    this.setState({ refresh: true }, () => {
      this.isGetData = false

      this.onGetData(1, [])
    })
  }

  getPropsList: () => FlatListProps<any> | {} = () => {
    return {}
  }

  onLoadMore = () => {
    const { data, page } = this.props
    if (!Array.isArray(data) || !page || page.current >= page.max) return

    this.onGetData(page.current + 1, data)
  }

  renderFooter = () => {
    const { page } = this.props
    if (!page) return null

    if (page?.current >= page?.max) return null
    const { colors = {} } = this.context
    return (
      <View style={styles.centerRow}>
        <ActivityIndicator color={colors.primary} />
      </View>
    )
  }

  renderItem = ({ item }: { item: any }) => {
    return <Text>{item.id}</Text>
  }

  renderList = () => {
    const { data } = this.props
    const { refresh } = this.state

    return (
      <FlatList
        contentContainerStyle={styles.contentStyle}
        data={data}
        keyExtractor={(item: any) => `${item.id}`}
        renderItem={this.renderItem}
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={this.onRefresh} />}
        onEndReachedThreshold={0.2}
        onEndReached={this.onLoadMore}
        {...this.getPropsList()}
      />
    )
  }

  renderLoading = () => {
    const { colors = {} } = this.context
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} />
      </View>
    )
  }

  renderError = () => {
    return (
      <View style={styles.center}>
        <TextBase>error</TextBase>
      </View>
    )
  }

  renderContent = () => {
    const { loading, error, data } = this.props
    if (loading) return this.renderLoading()

    if (error && (!data?.length || data?.length <= 0)) return this.renderError()

    return this.renderList()
  }

  render() {
    return this.renderContent()
  }
}

export default SyncFlatList

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentStyle: {
    flexGrow: 1,
    paddingHorizontal: sizes.padding,
  },

  centerRow: {
    alignItems: 'center',
    paddingVertical: sizes.padding / 2,
  },
})
