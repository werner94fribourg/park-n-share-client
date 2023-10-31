import { Typography } from '@mui/material';
import Button  from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import React, { Component } from 'react'; //

export default class RectangularButton extends Component {
     constructor(props) {
         super(props)
          this.state = {
              text: this.props.text
         }
        }
  render() {
    return (
      <div>
            <Button variant="contained" endIcon={<SendIcon />}>
            <Typography variant="h3">{this.props.text}</Typography>
            </Button>
      </div>
    )
  }
}
