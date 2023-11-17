import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from '@ui-kitten/components';
import {MyTextProps, TextSizeCategory} from 'types/component-types';

export default memo(
  ({
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    marginVertical,
    marginHorizontal,
    opacity,
    uppercase,
    lowercase,
    capitalize,
    none,
    left,
    lineHeight,
    right,
    center,
    underline,
    onPress,
    italic,
    category = 'body',
    status = 'basic',
    children,
    maxWidth,
    style,
    fontWeight,
    ...rest
  }: MyTextProps) => {
    let textAlign: 'left' | 'center' | 'right' | 'auto' | 'justify' | 'left';

    left
      ? (textAlign = 'left')
      : right
      ? (textAlign = 'right')
      : center
      ? (textAlign = 'center')
      : (textAlign = 'left');

    let textTransform: 'uppercase' | 'lowercase' | 'capitalize' | 'none';

    uppercase
      ? (textTransform = 'uppercase')
      : lowercase
      ? (textTransform = 'lowercase')
      : capitalize
      ? (textTransform = 'capitalize')
      : none
      ? (textTransform = 'none')
      : (textTransform = 'none');

    let textDecorationLine:
      | 'none'
      | 'underline'
      | 'line-through'
      | 'underline line-through';
    underline
      ? (textDecorationLine = 'underline')
      : (textDecorationLine = 'none');

    let fontStyle: 'normal' | 'italic';
    italic ? (fontStyle = 'italic') : (fontStyle = 'normal');

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={!onPress ? 1 : 0.54}>
        <Text
          category={category}
          status={status}
          style={[
            {
              marginLeft: marginLeft,
              margin: margin,
              marginRight: marginRight,
              marginTop: marginTop,
              marginBottom: marginBottom,
              marginVertical: marginVertical,
              marginHorizontal: marginHorizontal,
              opacity: opacity,
              textAlign: textAlign,
              maxWidth: maxWidth,
              lineHeight: lineHeight || getLineHeight(category),
              textTransform: textTransform,
              textDecorationLine: textDecorationLine,
              fontStyle: fontStyle,
              fontWeight: fontWeight,
            },
            style,
          ]}
          {...rest}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  },
);

const getLineHeight = (category: TextSizeCategory): number => {
  switch (category) {
    case 'header':
      return 48;
    case 't1':
      return 40;
    case 't2':
      return 36;
    case 't3':
      return 32;
    case 't4':
      return 28;
    case 't5':
      return 24;
    case 'body':
      return 20;
    case 'subhead':
      return 20;
    case 'c1':
      return 18;
    case 'c2':
      return 16;
    case 'note':
      return 16;
    default:
      return 24;
  }
};
