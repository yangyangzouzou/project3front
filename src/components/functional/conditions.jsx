import React, { Component } from "react";

class Conditions extends Component {
  state = {};
  render() {
    return (
      <article class="message">
        <div class="message-header">
          <p>Say it loudly : "I am a pretty Person"</p>
          <button class="delete" aria-label="delete" />
        </div>
        <div class="message-body">
          There is one thing that I would like to let you agree <br /> <br />
          <br />
          <strong class="subtitle is-2">
            You, yourself, are the prettiest person in this world. The Prince
            Charming is yourself! <br />{" "}
          </strong>
          <br />
          <br />
          <br />
          <strong>
            But wait, you still need to accept our{" "}
            <a href="/conditions">General Data Protection Regulation </a>
          </strong>
        </div>
        <div class="field is-grouped">
          <a href="/signup" class="button is-text">
            Back to Sign Up
          </a>
        </div>
      </article>
    );
  }
}

export default Conditions;
