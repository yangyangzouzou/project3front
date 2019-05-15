import React, { Component } from "react";

class Conditions extends Component {
    state = {  }
    render() { 
        return ( 
<article class="message">
  <div class="message-header">
    <p>Say it loudly : "I am a pretty Person"</p>
    <button class="delete" aria-label="delete"></button>
  </div>
  <div class="message-body">
    There is one thing that I would like to let you agree <br/> <strong>You, yourself, are the prettiest person in this world. The Prince Charming is yourself! </strong>
  </div>
</article>

         );
    }
}
 
export default Conditions;