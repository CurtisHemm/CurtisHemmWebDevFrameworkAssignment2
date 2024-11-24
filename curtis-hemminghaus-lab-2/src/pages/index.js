import { useEffect, useState } from "react";

export default function Home() {

  const [name, setName] = useState("Sample")

  useEffect(() => {
    console.log("hello")
  }, []);

  return (
    <>
      <h1>This website I've created has 4 pages in the navbar that access a headless CMS and displays genres and games I like, and genres and Games that are my favorites.</h1>
    </>
  );
}
