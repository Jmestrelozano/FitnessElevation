import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IItemHeader} from '../../../interfaces/InterfacesComponents/InterfaceItemHeader';
import {styles} from './stylesheetItemHeader';

export const ItemsHeader = ({count, title}: IItemHeader) => {
  return (
    <View>
      <Text style={styles.titleCount}>{count}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
