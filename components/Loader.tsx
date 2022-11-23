export default function Loader({show}) {
    console.log(show);
    return show ? <div className="loader"></div> : null;
}