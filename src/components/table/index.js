import React, { Component } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Text
} from "react-native";
import PropTypes from "prop-types";
import styles from "./style";

export default class Table extends Component {
  static defaultProps = {
    columns: [],
    //dataSource:[],
    style: {
      thead: {}
    },
    loadingText: "初始化数据中",
    getData() {
      const nextDataSource = [];
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(nextDataSource);
        }, 3000);
      });
    },
    isPullLoadMore: false,
    isRefresh: false,
    onItemPress() {}
  };
  static propTypes = {
    dataSource: PropTypes.array,
    columns: PropTypes.array,
    style: PropTypes.object,
    loadingText: PropTypes.string,
    isPullLoadMore: PropTypes.bool,
    isRefresh: PropTypes.bool,
    getData: PropTypes.func,
    onItemPress: PropTypes.func
  };

  constructor() {
    super();
    this.renderRowRule = {};
  }
  state = {
    dataSource: [],
    loading: true,
    hasData: true,
    //是否正在加载更多
    isLoadMore: false,
    //是否全部加载完毕
    loaded: false,
    refreshing: false,
    pageIndex: 1
  };
  componentWillMount() {
    let { pageIndex } = this.state;
    const { dataSource } = this.props;

    //如果存在数据源则不获取数据
    if (dataSource) {
      return this.setState({
        hasData: true,
        loading: false
        //dataSource
      });
    }
    return this.props
      .getData(pageIndex)
      .then(res => {
        if (res.length) {
          this.setState({
            hasData: true,
            loading: false,
            dataSource: res,
            pageIndex: ++pageIndex
          });
        } else {
          this.setState({
            hasData: false,
            loading: false
          });
        }
      })
      .catch(e => {
        this.setState({
          hasData: false,
          loading: false
        });
        //.fail(e);
      });
  }
  onRefresh = () => {
    const { isRefresh } = this.props;
    if (isRefresh) {
      this.setState({
        refreshing: true
      });
      this.props
        .getData(1)
        .then(res => {
          if (res.length) {
            this.setState({
              refreshing: false,
              dataSource: res
            });
          } else {
            this.setState({
              refreshing: false
            });
          }
        })
        .catch(e => {
          this.setState({
            refreshing: false
          });
        });
    }
  };
  handleEndReached = ({ distanceFromEnd }) => {
    const { isLoadMore, dataSource, loaded, hasData } = this.state;
    const { isPullLoadMore } = this.props;
    let { pageIndex } = this.state;
    const { getData } = this.props;
    if (
      !isLoadMore &&
      !loaded &&
      hasData &&
      isPullLoadMore &&
      distanceFromEnd !== this.distanceFromEnd
    ) {
      this.distanceFromEnd = distanceFromEnd;
      this.setState({
        isLoadMore: true
      });
      getData(pageIndex)
        .then(res => {
          const nextDataSource = dataSource.concat(res);
          if (res.length) {
            this.setState({
              isLoadMore: false,
              dataSource: nextDataSource,
              pageIndex: ++pageIndex
            });
          } else {
            this.setState({
              isLoadMore: false,
              loaded: false
            });
          }
        })
        .catch(e => {
          this.setState({
            isLoadMore: false,
            loaded: false
          });
          //Tip.fail(e);
        });
    }
  };

  renderFooter = () => {
    const { isLoadMore, loaded } = this.state;

    if (isLoadMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator style={{ marginRight: 10 }} />
          <Text style={[styles.footText]}>加载中...</Text>
        </View>
      );
    }
    if (!isLoadMore && loaded) {
      return (
        <View style={styles.footer}>
          <Text style={[styles.footText]}>没有更多了哟</Text>
        </View>
      );
    }
    return null;
  };

  renderHeader() {
    const { columns, style: customStyle } = this.props;
    return (
      <View style={[styles.headerContainer, customStyle.thead]}>
        {columns.map((column, i) => {
          const { title, dataIndex, render, style, tdStyle, thStyle } = column;
          this.renderRowRule[dataIndex] = {
            index: i,
            render,
            style,
            tdStyle
          };
          return (
            <View
              style={[styles.th, customStyle.th, style, thStyle]}
              key={dataIndex}
            >
              <Text style={[styles.thText, customStyle.thText]}>{title}</Text>
            </View>
          );
        })}
      </View>
    );
  }
  renderBorder() {
    return <View style={styles.border} />;
  }
  renderBodyRow = (row, rowIndex) => {
    const children = [],
      { renderRowRule } = this,
      defaultRenderTd = (row, value, columnsIndex, rowIndex, style) => {
        return <Text style={[styles.tdText, style]}>{value}</Text>;
      };
    const { onItemPress, style: customStyle } = this.props;
    for (const item in row) {
      if (!renderRowRule[item]) {
        continue;
      }
      const {
        index,
        render = defaultRenderTd,
        style,
        tdStyle,
        tdText
      } = renderRowRule[item];
      children[index] = (
        <View style={[styles.td, customStyle.td, style, tdStyle]} key={item}>
          {render(
            row,
            row[item],
            index,
            rowIndex,
            Object.assign({}, styles.tdText, tdText)
          )}
        </View>
      );
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          onItemPress(row);
        }}
      >
        <View style={styles.row}>{children}</View>
      </TouchableWithoutFeedback>
    );
  };

  renderBody() {
    const { style: customStyle } = this.props;
    const { dataSource, refreshing } = this.state;
    if (this.props.dataSource) {
      return (
        <View style={[styles.tbody, customStyle.tbody]}>
          <View>
            <FlatList
              data={this.props.dataSource || dataSource}
              keyExtractor={(row, i) => i}
              renderItem={({ item, index }) => this.renderBodyRow(item, index)}
              //ItemSeparatorComponent={this.renderBorder}
              ListEmptyComponent={({ item }) => (
                <View style={styles.noData}>
                  <Text style={styles.noDataText}>没有数据哦</Text>
                </View>
              )}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={[styles.tbody, customStyle.tbody]}>
        <View>
          <FlatList
            data={this.props.dataSource || dataSource}
            onRefresh={this.onRefresh}
            refreshing={refreshing}
            keyExtractor={(row, i) => i}
            renderItem={({ item, index }) => this.renderBodyRow(item, index)}
            //ItemSeparatorComponent={this.renderBorder}
            ListEmptyComponent={({ item }) => (
              <View style={styles.noData}>
                <Text style={styles.noDataText}>
                  没有数据哦,尝试下拉试试吧！
                </Text>
              </View>
            )}
            ListFooterComponent={this.renderFooter()}
            onEndReached={this.handleEndReached}
            onEndReachedThreshold={0}
          />
        </View>
      </View>
    );
  }
  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          {this.renderHeader()}
          <View style={styles.loading}>
            <ActivityIndicator animating={true} color="#ccc" size="small" />
            <Text style={styles.loadingText}>加载数据中...</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderBody()}
      </View>
    );
  }
}
