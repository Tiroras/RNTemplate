import React from 'react';
import { Image, ImageProps, Text, View } from 'react-native';

interface IProps {
    image: ImageProps;
    status: "Alive" | "Dead" | "unknown";
    name: string;
}

export const CharacterElement: React.FC<IProps> = (props) => {
    return (
        <View>
            <Image source={props.image}></Image>
            <View>
                <Text>{props.status}</Text>
                <Text>{props.name}</Text>
            </View>
        </View>
    )
}