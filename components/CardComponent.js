import React from 'react'
import { Card} from 'react-native-paper';

const CardComponent = (props) => {
    return (
        <Card style={{...props.style}}>
    <Card.Content>
      {props.children}
    </Card.Content>
  </Card>
    )
}

export default CardComponent


