import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

//destructuring the props using {}
const NewsContainer = (props: any) => {
  let i: number = 0;

  useEffect(() => {
    // Scroll to the top when the component mounts or updates
    window.scrollTo(0, 0);
  }, []);

  const createNewsItems = props.news.map((e: any, id: number) => {
    // (e.urlToImage.includes("jpg") ||e.urlToImage.includes("jpeg")) not working
    if (e.urlToImage && i < 15) {
      i++;
      return (
        <Card className="cards" key={id}>
          <CardContent>
            <Button sx={{ fontSize: 14 }} color="primary">
              {e.source.name}
            </Button>
            <div className="newsImage">
              <img
                src={`${e.urlToImage}`}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </CardContent>
          <CardActions sx={{ margin: 0, padding: 0, paddingLeft: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontSize: 18, overflow: "hidden" }}
            >
              {e.title}
            </Typography>
            <Button
              size="small"
              className="optionButton"
              variant="contained"
              color="error"
              href={`${e.url}`}
            >
              Read More
            </Button>
          </CardActions>
        </Card>
      );
    }
  });

  return (
    <>
      <h1 style={{ marginLeft: 20, fontWeight: 500 }}>Latest Finance News</h1>
      <div className="newsContainer">{createNewsItems}</div>
    </>
  );
};

export default NewsContainer;
