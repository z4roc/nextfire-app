import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";

export default function UserPage({ user, posts }) {
    return(
        <main>
            <UserProfile user={user}/>
            <PostFeed posts={posts} admin/>    
        </main>
    )
}