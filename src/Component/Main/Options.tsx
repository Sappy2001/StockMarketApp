import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";

const Options = () => {
  const navigate = useNavigate();
  return (
    <div className="options">
      <h2>Start your investing journey</h2>
      <div className="optionBox">
        <Card className="cards" component={Container}>
          <CardContent>
            <Container>
              <img
                src="https://assets.tickertape.in/images/landing-page/invest-mobile.svg"
                width="52px"
                height="52px"
              />
            </Container>
            <Typography variant="h4" component="div">
              Invest
              <br />
            </Typography>
            <Typography>
              Invest & track your portfolio with crisp insights
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="medium"
              className="optionButton"
              variant="contained"
              color="inherit"
              style={{ marginBottom: 20 }}
              onClick={() => navigate("/login")}
            >
              <span className="buttonText">Learn More</span>
              <ArrowDownwardIcon />
            </Button>
          </CardActions>
        </Card>
        <Card className="cards" component={Container}>
          <CardContent>
            <Container>
              <img
                src="https://assets.tickertape.in/images/landing-page/learn-desktop.svg"
                width="52px"
                height="52px"
              />
            </Container>
            <Typography variant="h4" component="div">
              Learn
              <br />
            </Typography>
            <Typography sx={{ fontSize: "10" }}>
              Grow & Learn with a supportive community
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="medium"
              className="optionButton"
              variant="contained"
              color="inherit"
              style={{ marginBottom: 20 }}
              onClick={() => navigate("/news")}
            >
              <span className="buttonText">Learn More</span>
              <ArrowDownwardIcon />
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Options;
