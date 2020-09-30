import { Form, Button } from "react-bootstrap"
import { connectToDatabase } from "../utils/mongodb"
import { useState } from 'react'

export default function Posts({ posts }) {
    const [post, setPost] = useState({
        title: "",
        content: ""
    });

    function onChange(e) {
        const { name, value } = e.target;

        setPost((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    };

    function onSubmit(e) {
        createPostRequest(post);
    }

    return (
        <div>
            <h1>Latest News</h1>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>

            <Form onSubmit={onSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="textarea" placeholder="Post Title" onChange={onChange} name="title"/>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows="3" onChange={onChange} name="content"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Post
                </Button>
            </Form>

        </div>
    );
}

// Fetch DATA on each request
export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const posts = await db
        .collection("posts")
        .find({})
        // .limit(20) Uncomment to limit the numbers of posts displayed
        .toArray();

    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        }
    };
}

async function createPostRequest(newPost) {
    const response = await fetch("/api/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ post: newPost }),
    });
    const data = await response.json();
    return data.post;
}