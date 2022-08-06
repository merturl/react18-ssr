import React from "react";

import { fetchProfileData } from "../lib/fakeApi";

const initialResource = fetchProfileData();

function Posts() {
  const posts = initialResource.posts.read();
  return posts.map((post) => <div>{post.text}</div>);
}

export default Posts;
