import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TextField } from "@mui/material";
import CommentCard from "./CommentCard";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { LoadingButton } from "@mui/lab";
import moment from 'moment';
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard = (props) => {
  const { apiData } = props;
  let post;
  let commentsData = [];
  if (apiData && apiData.length > 0) {
    post = apiData[0];
    commentsData = post.comments;
  }

  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [makeCommentValue, setMakeCommentValue] = useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  const commentApiData = {
    text: makeCommentValue,
    postId: post._id
  }

  const token = localStorage.getItem("@jwt-token");

  const makeComment = () => {
    setLoading(true);
    axios
      .put(import.meta.env.VITE_PROD_URL + "comment", commentApiData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const resp = JSON.stringify(response.data.updatedPost);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error makeComment response: ", err);
      });
  };

  return (
    <div style={{ margin: "0.25rem", padding: "0.25rem" }}>
      <Card>
        <CardHeader
          avatar={<Avatar {...stringAvatar(post.postedBy.name)} />}
          action={
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          }
          title={post.postedBy.name}
          subheader={moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a')}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 0.5rem",
              }}
            >
              <TextField
                id="outlined-multiline-static"
                label="Add a comment"
                margin="none"
                fullWidth
                multiline
                size="small"
                placeholder="Add your comment here"
                value={makeCommentValue}
                onChange={(res) => setMakeCommentValue(res.target.value)}
              />
              <LoadingButton
                variant="contained"
                endIcon={<AddCommentIcon />}
                loading={loading}
                style={{ marginLeft: "0.5rem" }}
                onClick={() => {
                  makeComment();
                  
                }}
              >
                Comment
              </LoadingButton>
            </div>
            {commentsData.map((commentData) => (
              <CommentCard
                key={commentData._id}
                apiCommentData={[commentData]}
              />
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default PostCard;
