import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

import styles from "./style";
export default class DataView extends Component {
  static defaultProps = {
    getData(i) {
      //console.log(`dataIndex:${i}`);
      const nextDataSource = [];
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(nextDataSource);
        }, 1000);
      });
    },
    //是否下拉加载更多
    isPulldownLoadMore: true,
    //是否上拉刷新
    isPullupRefresh: true,
    dataSource: [],
    ItemSeparatorComponent() {
      return <View />;
    },
    renderItem(item) {
      return <Text>{item}</Text>;
    },
    //允许触发下拉加载的时间间隔
    pulldownLoadMoreInterval: 500
  };
  static propTypes = {
    getData: PropTypes.func,
    dataSource: PropTypes.array,
    isPulldownLoadMore: PropTypes.bool,
    isPullupRefresh: PropTypes.bool,
    ItemSeparatorComponent: PropTypes.func,
    renderItem: PropTypes.func,
    pulldownLoadMoreInterval: PropTypes.number
  };
  state = {
    dataSource: [],
    //刷新数据中？
    refreshing: false,
    //下拉获取数据中?
    isLoadingMore: false,
    //数据是否加载完毕
    loaded: false
  };
  componentWillMount = async () => {
    const { dataSource } = this.props;
    if (dataSource && dataSource.length) {
      this.setState({
        dataSource
      });
    } else {
      this.setState({ refreshing: true });
      const dataSource = await this.getData();
      this.setState({
        dataSource,
        refreshing: false
      });
    }
  };
  store = {
    currentDataIndex: 1,
    loaded: false
  };
  //上次触发下拉刷新的时间
  prevCalledPulldownLoadMoreTimes = Date.now();
  /**
   *   this.props.getData的包装器 传入当前成功获取数据的索引 用以实现分页功能
   **/
  getData() {
    const { getData } = this.props;
    const { refreshing } = this.state;
    const { currentDataIndex, loaded } = this.store;
    return getData(currentDataIndex)
      .then(dataSource => {
        this.store.currentDataIndex += 1;
        if (dataSource.length === 0 && !loaded) {
          this.setState({ loaded: true });
        }
        if (loaded && dataSource.length) {
          this.setState({ loaded: false });
        }
        return dataSource;
      })
      .catch(e => {
        //在刷新失败时返回上一次数据
        if (refreshing) {
          return this.state.dataSource;
        } else {
          return [];
        }
      });
  }
  onRefresh = () => {
    const { isLoadingMore } = this.state;
    if (!isLoadingMore) {
      this.setState({ refreshing: true }, async () => {
        //重置数据索引
        this.store.currentDataIndex = 1;
        const dataSource = await this.getData();
        this.setState({
          dataSource,
          refreshing: false,
          loaded: false
        });
      });
    }
  };
  triggerRefresh = () => {
    const { isLoadingMore } = this.state;
    if (!isLoadingMore) {
      this.setState({ refreshing: true }, async () => {
        //重置数据索引
        this.store.currentDataIndex = 1;
        const dataSource = await this.getData();
        this.setState({
          dataSource,
          refreshing: false,
          loaded: false
        });
      });
    }
  };
  pulldownLoadMore = () => {
    const {
      isLoadingMore,
      refreshing,
      dataSource: prevDataSource,
      loaded
    } = this.state;
    const { isPulldownLoadMore } = this.props;
    //当 不在刷新 加载更多 允许加载更多 未加载完毕 时
    if (!isLoadingMore && !refreshing && isPulldownLoadMore && !loaded) {
      this.setState({ isLoadingMore: true }, async () => {
        const nextDataSource = await this.getData();
        this.setState({
          dataSource: [].concat(prevDataSource, nextDataSource),
          isLoadingMore: false
        });
      });
    }
  };
  triggerPulldownLoadMore = () => {
    const {
      isLoadingMore,
      refreshing,
      dataSource: prevDataSource,
      loaded
    } = this.state;
    const { isPulldownLoadMore } = this.props;
    //当 不在刷新 加载更多 允许加载更多 未加载完毕 时
    if (!isLoadingMore && !refreshing && isPulldownLoadMore && !loaded) {
      this.setState({ isLoadingMore: true }, async () => {
        const nextDataSource = await this.getData();
        this.setState({
          dataSource: [].concat(prevDataSource, nextDataSource),
          isLoadingMore: false
        });
      });
    }
  };
  compatibilityPullDown = event => {
    const { pulldownLoadMoreInterval } = this.props;

    const y = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    const now = Date.now();

    if (now - this.prevCalledPulldownLoadMoreTimes > pulldownLoadMoreInterval) {
      console.log(y, height, contentHeight);
      //在y轴偏移度加上高度等于内容的高度并且y轴偏移值为正值时
      //？在android下并不会像ios有默认的缓动区域 所以并不能产生 在y轴偏移度加上高度大于内容的高度 的情况
      //>= 大于适用于ios ===适用于android
      if (y + height >= contentHeight && y > 0) {
        this.prevCalledPulldownLoadMoreTimes = now;
        this.pulldownLoadMore();
      }
    }
  };
  renderFooter = () => {
    const { isLoadingMore, loaded, dataSource, refreshing } = this.state;
    let footerContent;
    switch (true) {
      case isLoadingMore:
        footerContent = [
          <ActivityIndicator
            color="#333"
            size="small"
            key="ActivityIndicator"
          />,
          <Text key="label" style={[styles.text, { marginLeft: 6 }]}>
            正在加载数据中...
          </Text>
        ];
        break;
      //在loaded时 数据不为空时显示footer组件 否则显示FlatList组件中的ListEmptyComponent
      case loaded && dataSource.length !== 0:
        footerContent = <Text style={styles.text}>没有更多了哦</Text>;
        break;
      case loaded && dataSource.length === 0:
        footerContent = null;
        break;
      case refreshing && dataSource.length === 0:
        footerContent = null;
        break;
      default:
        footerContent = <Text style={styles.text}>下拉加载更多</Text>;
    }

    return <View style={styles.footerWrapper}>{footerContent}</View>;
  };
  render() {
    const { refreshing, dataSource } = this.state;
    const {
      ItemSeparatorComponent,
      renderItem,
      isPulldownLoadMore,
      isPullupRefresh
    } = this.props;
    const hint = [];
    isPulldownLoadMore && hint.push("下拉");
    isPullupRefresh && hint.push("上拉");
    return (
      <View style={styles.container}>
        <FlatList
          data={dataSource}
          style={{ flex: 1 }}
          onRefresh={this.onRefresh}
          refreshing={refreshing}
          keyExtractor={(row, i) => i}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={({ item }) => {
            if (refreshing) {
              return (
                <View style={styles.ListEmptyComponent}>
                  <Text style={styles.ListEmptyComponentText}>
                    获取数据中...
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={styles.ListEmptyComponent}>
                  <Text style={styles.ListEmptyComponentText}>
                    没有数据哦{hint.length
                      ? `尝试${hint.join("或者")}试试吧~`
                      : "!"}
                  </Text>
                </View>
              );
            }
          }}
          ListFooterComponent={this.renderFooter()}
          onScrollBeginDrag={this.compatibilityPullDown}
          scrollEventThrottle={100}
        />
      </View>
    );
  }
}
