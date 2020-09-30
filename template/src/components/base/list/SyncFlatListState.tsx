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

export interface IPropsSyncFlatListState {}

export interface IStatesSyncFlatListState {
  refresh: boolean
  data: any[]
  page?: {
    current: number
    max: number
  }
  loading?: boolean
  error?: string | null | undefined | boolean
}

class SyncFlatListState<
  P extends IPropsSyncFlatListState,
  S extends IStatesSyncFlatListState
> extends Component<P, Pick<S, keyof IStatesSyncFlatListState>> {
  isGetData: boolean = false

  constructor(props: P) {
    super(props)
    this.state = {
      refresh: false,
      loading: true,
      error: false,
      data: [],
      page: {
        current: 1,
        max: 10,
      },
    }
  }

  onGetData = (page: number, oldData: any[], ...arg: any[]) => {
    console.log('onGetData -> arg', arg)
    console.log('SyncFlatListState -> onGetData -> oldData', oldData)
    console.log('SyncFlatListState -> onGetData -> page', page)
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
    const { data, page } = this.state
    if (!Array.isArray(data) || !page || page.current >= page.max) return

    this.onGetData(page.current + 1, data)
  }

  renderFooter = () => {
    const { page, data } = this.state
    if (!page || !Array.isArray(data) || data.length <= 0) return null

    if (page?.current >= page?.max) return null
    const { colors = {} } = this.context
    return (
      <View style={styles.centerRow}>
        <ActivityIndicator color={colors.primary} />
      </View>
    )
  }

  renderItem: ({ item }: { item: any }) => React.ReactElement | null = ({ item }) => {
    return <Text>{item.id}</Text>
  }

  renderList = () => {
    const { refresh, data } = this.state

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
    const { loading, error, data } = this.state
    if (loading) return this.renderLoading()

    if (error && data.length <= 0) return this.renderError()

    return this.renderList()
  }

  render() {
    return this.renderContent()
  }
}

export default SyncFlatListState

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
