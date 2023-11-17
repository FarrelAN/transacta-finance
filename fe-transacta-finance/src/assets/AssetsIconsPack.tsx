import React from 'react';
import {Image, ImageProps, ImageSourcePropType, StyleSheet} from 'react-native';
import {IconPack, IconProvider} from '@ui-kitten/components';
import {SvgProps} from 'react-native-svg';
import {Icons} from './icons';

const createIcon = (source: ImageSourcePropType): IconProvider<ImageProps> => {
  return {
    toReactElement: props => (
      <Image
        style={styles.icon}
        {...props}
        source={source}
        resizeMode="cover"
      />
    ),
  };
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const AssetsIconsPack: IconPack<ImageProps | SvgProps> = {
  name: 'assets',
  icons: {
    'arrow-left': createIcon(Icons['arrow-left']),
    'arrow-right': createIcon(Icons['arrow-right']),
    cardholder: createIcon(Icons['cardholder']),
    'arrow-down': createIcon(Icons['arrow-down']),
    'arrow-up': createIcon(Icons['arrow-up']),
    'arrows-out-simple': createIcon(Icons['arrows-out-simple']),
    'caret-double-left': createIcon(Icons['caret-double-left']),
    'caret-double-right': createIcon(Icons['caret-double-right']),
    'caret-down': createIcon(Icons['caret-down']),
    'caret-up': createIcon(Icons['caret-up']),
    'caret-left': createIcon(Icons['caret-left']),
    'caret-right': createIcon(Icons['caret-right']),
    eye: createIcon(Icons.eye),
    'eye-slash': createIcon(Icons['eye-slash']),
    'star-activated': createIcon(Icons['star-activated']),
    'star-inactive': createIcon(Icons['star-inactive']),
    'like': createIcon(Icons['like']),
    'more': createIcon(Icons['more']),
    'home': createIcon(Icons['home']),
    'home_fill': createIcon(Icons['home_fill']),
    'chart': createIcon(Icons['chart']),
    'chart_fill': createIcon(Icons['chart_fill']),
    'person': createIcon(Icons['person']),
    'person_fill': createIcon(Icons['person_fill']),
    'wallet': createIcon(Icons['wallet']),
    'wallet_fill': createIcon(Icons['wallet_fill']),
    income: createIcon(Icons['income']),
    outcome: createIcon(Icons['outcome']),
    bell: createIcon(Icons['bell']),
    netflix: createIcon(Icons['netflix']),
    turkcell: createIcon(Icons['turkcell']),
    qr: createIcon(Icons['qr']),
    document: createIcon(Icons['document']),
    wallet_send: createIcon(Icons['wallet_send']),
    menu: createIcon(Icons['menu']),
    box: createIcon(Icons['box']),
    filter: createIcon(Icons['filter']),
    save_money: createIcon(Icons['save_money']),
    bank: createIcon(Icons['bank']),
    transfer: createIcon(Icons['transfer']),
  },
};
export default AssetsIconsPack;
