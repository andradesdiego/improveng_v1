import React, { Component } from "react";
import { Grid, Card, Icon, Image } from "semantic-ui-react";

export default class AboutMe extends Component {
  render() {
    return (
      <div id="aboutMe">
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={4}>
              <Card>
                <Image src="/images/diego.jpg" />
                <Card.Content>
                  <Card.Header>Diego Andrades</Card.Header>
                  <Card.Meta>
                    <span className="date">Full Stack Web Developer</span>
                  </Card.Meta>
                  <Card.Description>
                    Extensive experience in graphic and web design, SEO and SEM.
                    Passionate about technology and constantly learning.{" "}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Icon name="mail" size="large" />
                  <a href="mailto:andradesdiego@gmail.com">
                    andradesdiego@gmail.com
                  </a>
                  <br />
                  <Icon name="phone" size="large" />
                  <a href="tel:+34658785170">+34658785170</a>
                  <br />
                  <Icon name="linkedin" size="large" />
                  <a href="">andradesdiego</a>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={6}>
              <div className="aboutMeDetails">
                <h1 className="homeTitle">TRAINING</h1>
                <hr />
                <br />
                <h2>Full Stack Web Development Bootcamp</h2>
                <h3 className="intro-content">
                  2018 | Codespace Academy | +1000 hours
                </h3>
                <h2>Master's degree in graphic design</h2>
                <h3 className="intro-content">
                  2016 | Animum 3D School | +1500 hours
                </h3>
                <h2>Higher Technical Certificate - Subjects </h2>
                <h3 className="intro-content">
                  2010 | FOC | .NET Certification
                </h3>
                <h2>Higher Technical Certificate - Administration</h2>
                <h3 className="intro-content">1995 | IES Vega del Mar</h3>
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <div className="aboutMeDetails">
                <h1 className="homeTitle">EXPERIENCE</h1>
                <hr />
                <br />
                <h2>+1 year · Digital Project Manager</h2>
                <h3>2017 | Please Networks | Barcelona</h3>
                <h2>+4 years · Graphic and web design - SEO - SEM </h2>
                <h3>2013-2016 | Localiza Marketing | Marbella</h3>
                <h2>+2 years · Sales Team Lead - Vodafone </h2>
                <h3>2010-2013 | Niza Móviles | Marbella</h3>
                <h2>+10 years · Store Manager & Sales Rep</h2>
                <h3>2000-2010 | Duna Trading | Tarifa - Spain</h3>
                <h2>+5 years · Accountant & Tax Advisor</h2>
                <h3>1995-2000 | Global Abogados y Economistas | Marbella</h3>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
