import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { auth } from "../Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signupvali } from "./singupvali";

const startValues = {
  email: "",
  mobileno: "",
  password: "",
  cpassword: "",
};

const Signup = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const handleClose = () => {
    setShowModal(false);
    navigate("/");
  };

  const handleSignup = async (values: { email: string; password: string }) => {
    try {
      // Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // Successfully created user
      console.log("User created:", userCredential.user);
      alert("Successfully SignIn");

      handleClose();
    } catch (error: any) {
      let errorMessage = "Email is already exist ";
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
  return (
    <div>
      <Formik
        onSubmit={handleSignup}
        initialValues={startValues}
        validationSchema={signupvali}
      >
        {/* destructuring the formik properties  */}
        {({ handleSubmit, handleChange, values, errors }) => (
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header style={{ display: "flex", justifyContent: "center" }}>
              <Modal.Title>Sign Up</Modal.Title>
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

                <Form.Group controlId="formBasicMobile">
                  <Form.Label>Mobile No</Form.Label>
                  <Form.Control
                    id="mobile-input"
                    type="text"
                    placeholder="Enter Mobile No"
                    name="mobileno"
                    value={values.mobileno}
                    onChange={handleChange}
                  />
                  {errors.mobileno && <small>{errors.mobileno}</small>}
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

                <Form.Group controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    id="cpass-input"
                    type="password"
                    placeholder="Confirm Password"
                    name="cpassword"
                    value={values.cpassword}
                    onChange={handleChange}
                  />
                  {errors.cpassword && <small>{errors.cpassword}</small>}
                  <br />
                </Form.Group>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Button type="submit" id="loginbtn">
                    Signup
                  </Button>
                  <br />
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
                    Already have an account? <Link to="/login">Login</Link>
                  </small>
                  <br />
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Link to="/">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Link>
            </Modal.Footer>
          </Modal>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
