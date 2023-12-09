import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./FeedScreen.module.css";
import { LoadingButton } from "@mui/lab";
import CreateIcon from "@mui/icons-material/Create";
import PostCard from "../../components/PostCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from '@mui/icons-material/Refresh';

const FeedScreen = () => {
  const [loading, setLoading] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [createPostValue, setCreatePostValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryPost, setSearchQueryPost] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const token = localStorage.getItem("@jwt-token");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadAllPosts = () => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_PROD_URL + "allposts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const resp = JSON.stringify(response.data.posts);
        setFeedData(response.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error loadAllPosts response: ", err);
      });
  };

  const contentData = {
    content: createPostValue,
  };

  const createPost = () => {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_PROD_URL + "createpost", contentData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const resp = JSON.stringify(response.data.post);
        setLoading(false);
        loadAllPosts();
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error createPost response: ", err);
      });
  };

  const searchAll = async () => {
    setLoading(true);
    await axios
      .get(import.meta.env.VITE_PROD_URL + `search?q=${searchQuery}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const resp = JSON.stringify(response.data.results);
        setSearchQueryPost(response.data.results);
        setLoading(false);
        setIsSearch(true);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error searchAll response: ", err);
      });
  };

  useEffect(() => {
    loadAllPosts();
  }, []);

  return (
    <div>
      <div className={styles.feedContainer}>
        <div className={styles.left}>
          {isSearch && searchQueryPost.length === 0 ? (
            <p>Search concluded with no results!</p>
          ) : (
            searchQueryPost.map((post) => (
              <PostCard key={post._id} apiData={[post]} />
            ))
          )}
          {!isSearch ? (
            feedData.length === 0 ? (
              <p>No posts yet. Please create a new post!</p>
            ) : (
              feedData.map((post) => (
                <PostCard key={post._id} apiData={[post]} />
              ))
            )
          ) : (
            <></>
          )}
        </div>
        <div className={styles.right}>
          <div className={styles.internalDiv}>
            <h4 className={styles.searchHeading}>
              Search all posts and comments!
            </h4>
            <TextField
              id="outlined-multiline-static"
              label="Search"
              margin="normal"
              multiline
              fullWidth
              placeholder="Search..."
              value={searchQuery}
              onChange={(res) => setSearchQuery(res.target.value)}
            />
            <LoadingButton
              variant="contained"
              endIcon={<SearchIcon />}
              loading={loading}
              onClick={() => {
                searchAll();
              }}
            >
              Search
            </LoadingButton>
          </div>
          <div className={styles.internalDiv}>
            <h4 className={styles.createPostHeading}>Create a post!</h4>
            <TextField
              id="outlined-multiline-static"
              label="Post"
              margin="normal"
              multiline
              fullWidth
              placeholder="Add your content here"
              value={createPostValue}
              onChange={(res) => setCreatePostValue(res.target.value)}
            />
            <LoadingButton
              variant="contained"
              endIcon={<CreateIcon />}
              loading={loading}
              onClick={() => {
                createPost();
                setCreatePostValue("");
              }}
            >
              Post
            </LoadingButton>
          </div>
          <h4 className={styles.logoutHeading}>Have a refresh here!</h4>
          <LoadingButton
            variant="contained"
            endIcon={<RefreshIcon />}
            loading={loading}
            onClick={() => {
              loadAllPosts();
            }}
          >
            Refresh
          </LoadingButton>
          <h4 className={styles.logoutHeading}>Wanna logout?</h4>
          <Button
            variant="contained"
            endIcon={<LogoutIcon />}
            onClick={() => {
              dispatch(logOut());
              localStorage.removeItem("@jwt-token");
              localStorage.removeItem("@seller-details");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedScreen;
