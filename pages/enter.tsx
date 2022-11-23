import Loader from "../components/Loader";
import { auth, firestore, googleAuth } from '../lib/firebase';
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import { signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc } from "firebase/firestore";
import debounce from 'lodash.debounce'

export default function EnterPage({}) {
    const { user, username } = useContext(UserContext);
    return(
        <main>
            {user ? !username ? <UsernameForm/> : <SignOutButton/> : <SignInButton/>}
        </main>
    )
}

function SignInButton() {
    const signInWithGoogle = async() => {
        await signInWithPopup(auth ,googleAuth);
    };
    return(
        <button className="btn-google" onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    )
}

function SignOutButton() {
    return(<button onClick={() => auth.signOut()}>Sign out</button>)
}

function UsernameForm() {
    const[formValue, setFormValue] = useState('');
    const[isValid, setIsValid] = useState(false);
    const[loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    const onChange = (e) => {
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
      

        if(val.length < 3) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }

        if(re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    }

    useEffect(() => {
        checkUsername(formValue);

    }, [formValue]);

    const checkUsername = useCallback(debounce(async (username:string) => {
        if(username.length >= 3) {
            const ref = doc(firestore, `usernames/${username}`);
            const snapshot = await getDoc(ref);
            console.log('Firestore read executed ');
            setIsValid(!snapshot.exists());
            setLoading(false);
        }
    }, 500
    )
    , []);

    const onSubmit = async (e) => {
        e.preventDefault();

        const userdoc = doc(firestore, `users/${user.uid}`);
        const usernamedoc = doc(firestore, `usernames/${formValue}`);

        await setDoc(userdoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName})
        await setDoc(usernamedoc, {uid: user.uid});

    }

    return(
        !username && (
            <section>
                <h3>Choose Username</h3>
                <form onSubmit={onSubmit}>
                    <input name="username" placeholder="username" value={formValue}
                        onChange={onChange}></input>

                    <UsernameMessage username={formValue} isValid={isValid} loading={loading}></UsernameMessage>

                    <button type="submit" className="btn-green" disabled={!isValid}>

                    </button>

                    <h3>Debug State</h3>
                    <div>
                        Username: {formValue}
                    <br />
                        Loading: {loading.toString()}
                    <br />
                        Username Valid: {isValid.toString()}
                    </div>
                </form>
            </section>
        )
    )
}

function UsernameMessage({username, isValid, loading}) {
    if (loading) {
        return <p>Checking... </p>
    } else if (isValid) {
        return <p className="text-success">{username} is available!</p>
    } else if (username && !isValid) {
        return <p className="text-danger">That username is taken!</p>
    } else {
        return <p></p>
    }
}