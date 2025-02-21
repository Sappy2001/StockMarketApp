import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import {
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { loginvali } from "./loginvali";
import { auth } from "../Firebase/firebase";

const Login = () => {
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(true);
	const handleClose = () => {
		setShowModal(false);
		navigate("/");
	};

	const startValues = {
		email: "",
		password: "",
	};

	const handleLogin = async (values: { email: string; password: string }) => {
		try {
			// Firebase authentication
			const userCredential = await signInWithEmailAndPassword(
				auth,
				values.email,
				values.password
			);

			// Successfully signed in
			alert("Successfully Logined");

			handleClose();
		} catch (error: any) {
			let errorMessage = " Wrong email/password";
			if (
				error.email === "auth/user-not-found" ||
				error.password === "auth/wrong-password"
			) {
				errorMessage =
					"Invalid email or password. Please check your credentials.";
			} else if (error.password === "auth/too-many-requests") {
				errorMessage = "Too many login attempts. Please try again later.";
			}

			// You can set an error message in your form state or show an alert
			alert(errorMessage);
		}
	};
	const handleGoogleSignup = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);

			// Successfully signed in with Google
			console.log("User signed in with Google");
			alert("Successfully signed in with Google");

			// Close the modal or handle navigation as needed

			handleClose();
		} catch (error: any) {
			// Handle errors
			console.error("Error signing in with Google:", error.message);
		}
	};

	return (
		<Formik
			onSubmit={handleLogin}
			initialValues={startValues}
			validationSchema={loginvali}
		>
			{({ handleSubmit, handleChange, values, errors }) => (
				<Modal show={showModal} onHide={handleClose}>
					<Modal.Header style={{ display: "flex", justifyContent: "center" }}>
						<Modal.Title>Login</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={handleSubmit}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									id="email-input"
									type="email"
									placeholder="Enter email"
									name="email"
									value={values.email}
									onChange={handleChange}
								/>
								{errors.email && <small>{errors.email}</small>}
								<br />
							</Form.Group>

							<Form.Group controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									id="pass-input"
									type="password"
									placeholder="Password"
									name="password"
									value={values.password}
									onChange={handleChange}
								/>
								{errors.password && <small>{errors.password}</small>}
								<br />
							</Form.Group>

							<div
								style={{
									display: "flex",
									justifyContent: "center",
									flexDirection: "column",
								}}
							>
								<Button id="loginbtn" type="submit">
									Login
								</Button>
								<br />
								<Button variant="text" onClick={handleGoogleSignup}>
									<img
										src="https://th.bing.com/th/id/R.a74e23dc362abbbc61515008ede68c79?rik=Mov5CtF4MRkg1w&riu=http%3a%2f%2fwebcafe.iima.ac.in%2fimages%2fglogin.png&ehk=9hV5EenXuWJNckQxF9KZkh7rNNDgdVp88wCOQ04Qb%2bY%3d&risl=&pid=ImgRaw&r=0"
										width="215px"
										height="50px"
										style={{ alignContent: "center", borderRadius: "4px" }}
									/>
								</Button>
							</div>

							<div
								style={{
									display: "flex",
									justifyContent: "center",
									flexDirection: "row",
									alignItems: "flex-start",
								}}
							>
								<small>
									New User? <Link to="/signup">Create an account</Link>
								</small>
								<br />
							</div>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</Formik>
	);
};
export default Login;
