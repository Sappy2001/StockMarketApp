import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const about = () => {
  return (
    <div>
      {/* Heading Section */}
      <Typography>
        <h1
          style={{ justifyContent: "center", display: "flex", marginTop: 120 }}
        >
          The Ultimate Trading Choice
        </h1>
        <br />
        <h3 style={{ justifyContent: "center", display: "flex" }}>
          Trade FX, CFDs, Cryptos and Stocks with an established global broker
        </h3>
      </Typography>

      {/* Main Content */}
      <Card
        sx={{
          height: 500,
          width: 1100,
          marginTop: 20,
          marginBottom: 10,
          borderRadius: 10,
          marginLeft: 11,
        }}
      >
        {/* Left Section with Image */}
        <div className="about-card-left">
          <CardMedia sx={{ float: "right" }}>
            <img
              src="https://live.cdn-fxgt.com/2023/04/About-FXGT-1.jpg"
              height={500}
              width={550}
              alt="About FXGT"
            />
          </CardMedia>
        </div>

        {/* Right Section with Text Content */}
        <div className="about-card-right">
          <CardContent>
            {/* Mission Section */}
            <Typography sx={{ marginTop: 5 }}>
              <h2 style={{ justifyContent: "center", display: "flex" }}>
                Our mission
              </h2>
            </Typography>
            <Typography color="black">
              We created FINUP because we wanted to revolutionize the trader
              experience. We set out three rules to guide our mission: to
              empower traders with competence, and a peace of mind.
            </Typography>
            <br />

            {/* Choice Section */}
            <Typography>
              <h4
                style={{
                  justifyContent: "center",
                  display: "flex",
                  color: "blue",
                }}
              >
                Choice
              </h4>
            </Typography>
            <Typography color="black">
              With multiple accounts to pick from, traders are guaranteed to
              find the account that matches their trading needs and style.
            </Typography>
            <br />

            {/* Access Section */}
            <Typography>
              <h4
                style={{
                  justifyContent: "center",
                  display: "flex",
                  color: "blue",
                }}
              >
                Access
              </h4>
            </Typography>
            <Typography color="black">
              A variety of markets means more opportunity. We bring opportunity
              to traders – with a wide range of instruments, market research
              tools for informed insights, and bonuses to boost their trades.
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default about;
