import React from "react";
import { Grid, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <div id="footer">
    <Grid columns={4} divided>
      <Grid.Row>
        <Grid.Column>
          <div size="huge" attached="bottom">
            <p>
              <a href="">
                Diego Andrades<br />
                Full Stack Web Developer<br />
              </a>
            </p>
            <Link to="/about_me">
              <Button inverted color="grey">
                About me
              </Button>
            </Link>
          </div>
        </Grid.Column>
        <Grid.Column>
          <div size="huge" attached="bottom">
            <p>
              <a href="">
                IMPROV.ENG<br />
                Single Page Application<br />
              </a>
            </p>
            <Link to="/technologies">
              <Button inverted color="grey">
                About tech
              </Button>
            </Link>
          </div>
        </Grid.Column>

        <Grid.Column>
          <div size="huge" attached="bottom">
            <p>
              <a href="">LINKS</a>
            </p>
            <div className="socialWrapper">
              <a href="https://www.linkedin.com/in/andradesdiego/">
                <Icon name="linkedin" size="large" /> andradesdiego
              </a>
            </div>
            <div className="socialWrapper">
              <a href="https://github.com/andradesdiego">
                <Icon name="github" size="large" /> andradesdiego
              </a>
            </div>
          </div>
        </Grid.Column>
        <Grid.Column>
          <div size="huge" attached="bottom">
            <p>
              <a href="">
                PROUDLY DEVELOPED<br />
                with <Icon name="heart outline" /> to my family<br />
                with <Icon name="heart outline" />to all my team mates<br />
                with <Icon name="heart outline" />to Codespace<br />
                with <Icon name="heart outline" /> to all of you<br />
              </a>
            </p>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default Footer;
