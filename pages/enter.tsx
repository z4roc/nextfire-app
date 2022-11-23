import Loader from "../components/Loader";
import { auth, googleAuth } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth'

export default function EnterPage({}) {
    const user = null;
    const username = null;
    return(
        <main>
            {user ? !username ? <UsernameForm/> : <SignInButton/> : <SignInButton/>}
        </main>
    )
}

function SignInButton() {
    const signInWithGoogle = async() => {
        await signInWithPopup(auth, googleAuth)
    };
    return(
        <button className="btn-google" onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    )
}

function SingOutButton() {
    return(<button onClick={() => auth.signOut()}>Sign out</button>)
}

function UsernameForm() {
    return(<></>)
}