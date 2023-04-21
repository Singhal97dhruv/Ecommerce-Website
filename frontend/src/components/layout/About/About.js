import React from "react";
import "./about.css";
import { Button, Avatar } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
const About = () => {
  const visitLinkedIn = () => {
    window.location = "https://linkedin.com/in/singhal97";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        {/* <Typography component="h1">About Us</Typography> */}
        <h1>About Us</h1>

        <div>
          <div>
          <div className="profilePicContainer">
            <Avatar className="profilePic"
              style={{ width: "12vmax", height: "12vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dsk75d0xd/image/upload/v1681936975/avatars/Untitled_design_3_yqasnl.png"
              alt="Founder"
            />
            </div>
            <h2>Dhruv Singhal</h2>
            <Button onClick={visitLinkedIn} color="secondary">
              Visit LinkedIn
            </Button>
            <span>
            This is a mern stack ecommerce Project.
            I used various tecnologies and discover a lot of modules which was amazing.
            The whole journey in making of this Project is just amazing.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <h2>Reach Us</h2>
            <a
              href="https://github.com/Singhal97dhruv"
              target="blank"
            >
              <GitHubIcon className="githubSvgIcon" />
            </a>

            <a href="https://linkedin.com/in/singhal97" target="blank">
              <LinkedInIcon className="linkedinSvgIcon" />
            </a>
            <a href="mailto:dhruvsinghal9876@gmail.com" target="blank">
              <EmailIcon className="emailSvgIcon"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;