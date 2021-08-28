import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { resetPassword, verifyResetURL } from "../utils/networkHandler";

const Reset = (props) => {
  const [verified, setVerified] = useState({
    isVerified: false,
    message: "Hold on! Verifying URL",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState({ type: "", message: "" });
  const history = useHistory();

  console.log(props);

  useEffect(() => {
    const verifyURL = async () => {
      let res = await verifyResetURL({
        id: props.match.params.id,
        randomString: props.match.params.hash,
      });
      console.log(res);
      setVerified({ isVerified: res.verified, message: res.message });
    };
    verifyURL();
  }, [props.match.params.id, props.match.params.hash]);

  const handleSubmit = async () => {
    if (newPassword.length > 0) {
      setMessage({ type: "", message: "" });
      if (newPassword === confirmNewPassword) {
        setMessage({ type: "green", message: "Loading...." });
        let res = await resetPassword({
          newPassword,
          id: props.match.params.id,
        });
        setMessage({
          type: res.success ? "green" : "red",
          message: res.message,
        });
        if (res.success) {
          setTimeout(() => {
            history.push("/login");
          }, 2000);
        }
      } else {
        setMessage({ type: "red", message: "Password does not match" });
      }
    } else {
      setMessage({ type: "red", message: "Enter password" });
    }
  };

  return (
    <>
      {verified.isVerified && (
        <div className="form-container">
          <div>
            <h1>Password Reset</h1>
            <div className="control">
              <input
                type="password"
                id="newPassword"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="control">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <p style={{ color: message.type }}>{message.message}</p>
            <div className="control">
              <input type="submit" onClick={handleSubmit} value="Reset" />
            </div>
            <div className="link">
              <Link className="a" to="/login">
                Go back
              </Link>
              <Link className="a" to="/signup">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      )}
      {!verified.isVerified && <h3>{verified.message}</h3>}
    </>
  );
};

export default Reset;
