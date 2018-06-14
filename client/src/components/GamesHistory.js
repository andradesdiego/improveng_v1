import React, { Component } from "react";
import { Accordion, Icon, Segment } from "semantic-ui-react";

export default class AccordionExampleFluid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 1
    };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          {this.props.info}
        </Accordion.Title>
        {this.props.quizzes.map((q, index) => {
          if (q.correct === "true") {
            return (
              <Accordion.Content key={index} active={activeIndex === 0}>
                <Segment key={index} color="green">
                  <p>{q.question}</p>
                  <p>{q.answer}</p>
                </Segment>
              </Accordion.Content>
            );
          } else {
            return (
              <Accordion.Content key={index} active={activeIndex === 0}>
                <Segment key={index} color="red">
                  <p>{q.question}</p>
                  <p>{q.answer}</p>
                </Segment>
              </Accordion.Content>
            );
          }
        })}
      </Accordion>
    );
  }
}
