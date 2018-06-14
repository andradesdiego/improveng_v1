import React from "react";
import { Tab, Grid } from "semantic-ui-react";

const panes = [
  {
    menuItem: "Intro",
    render: () => (
      <Tab.Pane attached={false}>
        <Intro />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Architecture",
    render: () => (
      <Tab.Pane attached={false}>
        <Structure />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Server",
    render: () => (
      <Tab.Pane attached={false}>
        <Server />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Client",
    render: () => (
      <Tab.Pane attached={false}>
        <Client />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Best practices",
    render: () => (
      <Tab.Pane attached={false}>
        <BestPractices />
      </Tab.Pane>
    )
  }
];

const AboutTech = () => (
  <div id="aboutMe">
    <h1>About Tools & Technologies</h1>
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
  </div>
);

export default AboutTech;

const Intro = () => (
  <div id="techIntro">
    <blockquote>
      "My job is a game. A very serious game."<footer>
        <cite>M. C. Escher | Artist | 1878-1972</cite>
      </footer>
    </blockquote>
  </div>
);

const Structure = () => (
  <div id="techStructure">
    <Grid>
      <Grid.Column width={8}>
        <h3>SERVER | API Restful</h3>
        <hr />
        <br />
        <p className="techP">MongoDB</p>
        <p className="techP">MongooseJS</p>
        <p className="techP">NodeJS</p>
        <p className="techP">ExpressJS</p>
        <p className="techP">MomentJS</p>
        <p className="techP">JWT</p>
      </Grid.Column>
      <Grid.Column width={8}>
        <h3>CLIENT | Single Page Application</h3>
        <hr />
        <br />
        <p className="techP">NodeJS</p>
        <p className="techP">ExpressJS</p>
        <p className="techP">Webpack</p>
        <p className="techP">ReactJS</p>
        <p className="techP">React Router</p>
        <p className="techP">Semantic UI</p>
      </Grid.Column>
    </Grid>
  </div>
);

const Server = () => (
  <div id="techServer">
    <Grid>
      <Grid.Column width={16}>
        <h3>SERVER | Features</h3>
        <hr />
        <br />
        <p className="techP">
          Completely isolated module to be consumed for several clients: webs,
          apps, others
        </p>
        <p className="techP">Running on Port: 3001</p>
        <p className="techP">MongoDB - Non relational database | Collections for "Quizzes" and "Gamers"</p>
        <p className="techP">API Restul | Create, Read, Update, Delete</p>
        <p className="techP">
          JSON Web Tokens | Generates and verify a token for each gamer on signup or signin
        </p>
      </Grid.Column>
    </Grid>
  </div>
);

const Client = () => (
  <div id="techClient">
    <Grid>
      <Grid.Column width={16}>
        <h3>CLIENT | Features</h3>
        <hr />
        <br />
        <p className="techP">Single Page Application</p>
        <p className="techP">Running on Port: 3000</p>
        <p className="techP">Client side rendering</p>
        <p className="techP">
          React without Redux, whick means no persistent data across navigation
        </p>
        <p className="techP">React Semantic UI components</p>
      </Grid.Column>
    </Grid>
  </div>
);

const BestPractices = () => (
  <div id="techBestPractices">
    <Grid>
      <Grid.Column width={16}>
        <h3>BEST PRACTICES... or not</h3>
        <hr />
        <br />
        <p className="techP">ES6</p>
        <p className="techP">Pure functions</p>
        <p className="techP">Stateless components</p>
        <p className="techP">
          Container - Content Pattern
        </p>
        <p className="techP">Composition vs Inheritance</p>
        <p className="techP">PropTypes (not used)</p>
      </Grid.Column>
    </Grid>
  </div>
);
