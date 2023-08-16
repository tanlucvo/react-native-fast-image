"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const resizeMode = {
  contain: 'contain',
  cover: 'cover',
  stretch: 'stretch',
  center: 'center'
};
const priority = {
  low: 'low',
  normal: 'normal',
  high: 'high'
};
const cacheControl = {
  // Ignore headers, use uri as cache key, fetch only if not in cache.
  immutable: 'immutable',
  // Respect http headers, no aggressive caching.
  web: 'web',
  // Only load from cache.
  cacheOnly: 'cacheOnly'
};
const resolveDefaultSource = defaultSource => {
  if (!defaultSource) {
    return null;
  }
  if (_reactNative.Platform.OS === 'android') {
    // Android receives a URI string, and resolves into a Drawable using RN's methods.
    const resolved = _reactNative.Image.resolveAssetSource(defaultSource);
    if (resolved) {
      return resolved.uri;
    }
    return null;
  }
  // iOS or other number mapped assets
  // In iOS the number is passed, and bridged automatically into a UIImage
  return defaultSource;
};
function FastImageBase(_ref) {
  let {
    source,
    defaultSource,
    tintColor,
    onLoadStart,
    onProgress,
    onLoad,
    onError,
    onLoadEnd,
    style,
    fallback,
    children,
    // eslint-disable-next-line no-shadow
    resizeMode = 'cover',
    forwardedRef,
    ...props
  } = _ref;
  if (fallback) {
    const cleanedSource = {
      ...source
    };
    delete cleanedSource.cache;
    const resolvedSource = _reactNative.Image.resolveAssetSource(cleanedSource);
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.imageContainer, style],
      ref: forwardedRef
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, _extends({}, props, {
      style: [_reactNative.StyleSheet.absoluteFill, {
        tintColor
      }],
      source: resolvedSource,
      defaultSource: defaultSource,
      onLoadStart: onLoadStart,
      onProgress: onProgress,
      onLoad: onLoad,
      onError: onError,
      onLoadEnd: onLoadEnd,
      resizeMode: resizeMode
    })), children);
  }
  const resolvedSource = _reactNative.Image.resolveAssetSource(source);
  const resolvedDefaultSource = resolveDefaultSource(defaultSource);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.imageContainer, style],
    ref: forwardedRef
  }, /*#__PURE__*/_react.default.createElement(FastImageView, _extends({}, props, {
    tintColor: tintColor,
    style: _reactNative.StyleSheet.absoluteFill,
    source: resolvedSource,
    defaultSource: resolvedDefaultSource,
    onFastImageLoadStart: onLoadStart,
    onFastImageProgress: onProgress,
    onFastImageLoad: onLoad,
    onFastImageError: onError,
    onFastImageLoadEnd: onLoadEnd,
    resizeMode: resizeMode
  })), children);
}
const FastImageMemo = /*#__PURE__*/(0, _react.memo)(FastImageBase);
const FastImageComponent = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(FastImageMemo, _extends({
  forwardedRef: ref
}, props)));
FastImageComponent.displayName = 'FastImage';
const FastImage = FastImageComponent;
FastImage.resizeMode = resizeMode;
FastImage.cacheControl = cacheControl;
FastImage.priority = priority;
FastImage.preload = sources => _reactNative.NativeModules.FastImageView.preload(sources);
FastImage.clearMemoryCache = () => _reactNative.NativeModules.FastImageView.clearMemoryCache();
FastImage.clearDiskCache = () => _reactNative.NativeModules.FastImageView.clearDiskCache();
const styles = _reactNative.StyleSheet.create({
  imageContainer: {
    overflow: 'hidden'
  }
});

// Types of requireNativeComponent are not correct.
const FastImageView = (0, _reactNative.requireNativeComponent)('FastImageView', FastImage, {
  nativeOnly: {
    onFastImageLoadStart: true,
    onFastImageProgress: true,
    onFastImageLoad: true,
    onFastImageError: true,
    onFastImageLoadEnd: true
  }
});
var _default = FastImage;
exports.default = _default;
//# sourceMappingURL=index.js.map