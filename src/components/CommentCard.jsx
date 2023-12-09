import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const CommentCard = (props) => {
  const { apiCommentData } = props;
  let comment = [];
  let naam;
  if (apiCommentData && apiCommentData.length > 0) {
    comment = apiCommentData[0];
    naam = comment.postedBy.name
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials,
    };
  }

  return (
    <div style={{ margin: "0.25rem", padding: "0.25rem" }}>
      <Card sx={{ bgcolor: "#FFFDD0" }}>
        <CardHeader
          avatar={<Avatar {...stringAvatar(naam)} />}
          title={naam}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {comment.text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentCard;
