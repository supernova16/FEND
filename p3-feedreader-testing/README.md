# Test a RSS Feedreader with Jasmine

The goal of this project was to use Jasmine to test a given Feedreader web application.

## Test Suites

I modified `jasmine/spec/feeedreader.js` in order to test the following:

- RSS Feeds:

  - Test feeds are defined
  - Test feed URLs are defined and not empty
  - Test feed names are defined and not empty

- The Menu:

  - Test the menu element is hidden by default
  - Test menu icon appears on click, and hides when click again

- Initial RSS Entry:

  - Test at least one entry displays on load after async call

- RSS Entry Change:

  - Test RSS entry changes on menu select


## Online testing

You can click this url to view the testing online: https://supernova16.github.io/FEND/p3-feedreader-testing/.(Please allow browser to load unsafe script)

A successful test will display:

![](http://p0837nnqr.bkt.clouddn.com/UC20180408_204816.png)



## References

- [js判断输入字符串是否为空、空格、null总结](https://blog.csdn.net/youyou_yo/article/details/51506951)
- [订阅阅读器测试异步请求出现超时错误的解决方案](https://discussions.youdaxue.com/t/topic/53490/3)
