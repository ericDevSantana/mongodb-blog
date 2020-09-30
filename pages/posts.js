import { Form } from "react-bootstrap"
import { connectToDatabase } from "../utils/mongodb"

export default function Posts({ posts }) {
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
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="textarea" placeholder="Post Title" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>
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