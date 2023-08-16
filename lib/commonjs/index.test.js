"use strict";

var _reactNative = require("react-native");
var _react = _interopRequireDefault(require("react"));
var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));
var _index = _interopRequireDefault(require("./index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const style = _reactNative.StyleSheet.create({
  image: {
    width: 44,
    height: 44
  }
});
describe('FastImage (iOS)', () => {
  beforeAll(() => {
    _reactNative.Platform.OS = 'ios';
    _reactNative.NativeModules.FastImageView = {
      preload: Function.prototype,
      clearMemoryCache: Function.prototype,
      clearDiskCache: Function.prototype
    };
  });
  it('renders', () => {
    const tree = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.default, {
      source: {
        uri: 'https://facebook.github.io/react/img/logo_og.png',
        headers: {
          token: 'someToken'
        },
        priority: _index.default.priority.high
      },
      style: style.image
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders a normal Image when not passed a uri', () => {
    const tree = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.default, {
      source: require('../ReactNativeFastImageExampleServer/pictures/jellyfish.gif'),
      style: style.image
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Image with fallback prop', () => {
    const tree = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.default, {
      source: require('../ReactNativeFastImageExampleServer/pictures/jellyfish.gif'),
      style: style.image,
      fallback: true
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders defaultSource', () => {
    const tree = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.default, {
      defaultSource: require('../ReactNativeFastImageExampleServer/pictures/jellyfish.gif'),
      style: style.image
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('runs static functions', () => {
    _index.default.preload([{
      uri: 'https://facebook.github.io/react/img/logo_og.png',
      headers: {
        token: 'someToken'
      },
      priority: _index.default.priority.high
    }]);
    _index.default.clearMemoryCache();
    _index.default.clearDiskCache();
  });
});
describe('FastImage (Android)', () => {
  beforeAll(() => {
    _reactNative.Platform.OS = 'android';
  });
  it('renders a normal defaultSource', () => {
    const tree = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.default, {
      defaultSource: require('../ReactNativeFastImageExampleServer/pictures/jellyfish.gif'),
      style: style.image
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders a normal defaultSource when fails to load source', () => {
    const tree = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.default, {
      defaultSource: require('../ReactNativeFastImageExampleServer/pictures/jellyfish.gif'),
      source: {
        uri: 'https://www.google.com/image_does_not_exist.png'
      },
      style: style.image
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders a non-existing defaultSource', () => {
    const tree = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.default, {
      defaultSource: 12345,
      style: style.image
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
//# sourceMappingURL=index.test.js.map