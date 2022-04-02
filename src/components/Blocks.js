import React  from "react";
import {FlatList, View, Text} from 'react-native';
import { Paper, Subtitle, BodyText, Caption } from "material-bread";
import colors from "../constants/colors";

const Block = ({item}) => {
    return(
        <View style={{padding:10, backgroundColor:'rgba(0, 0, 0, 0.12)', marginTop:10}}>
         <Text style={{color: '#304FFE'}}>{ '00' + item.attributes.index}</Text>
         <BodyText style={{colors: colors.text, paddingTop:10}}>{item.attributes.data}</BodyText>
        </View>
    )
}

export const Blocks = ({blockList}) => {
  return(
      <FlatList 
      data={blockList} 
      renderItem={({item}) => <Block item={item}/>}
      keyExtractor={(item, index) => index}
      />
  )
}