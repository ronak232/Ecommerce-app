import React, { useState } from "react";
import { TfiEmail, TfiLock } from "react-icons/tfi";
import { Button } from "../Styles/Button.style";
import { LiaUserCircle } from "react-icons/lia";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import Loginlogo from "../Images/login-logo.png";
import { useFirebaseAuth } from "../hooks/context/firebase";
import { Link } from "react-router-dom";

function LoginUser() {
  const { signUpUser, putUserData } = useFirebaseAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPssd: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(12, "Username should be 12 characters or less!")
        .required("Required Field"),

      password: Yup.string()
        .min(8, "Atleast 8 characters")
        .max(12, "Password must be less than 12!")
        .required("Required Field"),
      email: Yup.string().email("Invalid email").required("Required Field"),
    }),
    validate: (values) => {
      const errors = {};
      if (!values.confirmPssd) {
        errors.confirmPssd = "Required Field";
      } else if (values.confirmPssd !== values.password) {
        errors.confirmPssd = "Password does not match";
      }
      return errors;
    },
    onSubmit: async () => {
      try {
        await signUpUser(
          formik.values.email,
          formik.values.password,
          formik.values.username,
          formik.values.confirmPssd
        ).then(() => {
          window
            .open("/register", "_blank", "rel=noopener noreferrer")
            .catch(() => {
              alert("Something happened!");
            });
        });
      } catch {
        <ErrorMessage />;
      }
    },
  });

  return (
    <>
      <div className="store-account">
        <div className="store-account__container">
          <div className="store-account__card">
            <div className="store-account__card-body">
              <img
                className="store-account__logo"
                src={Loginlogo}
                alt="no-img"
              />
              <h1 className="store-account__card-title">Login</h1>
              <div className="store-account__card-link">
                <h3 className="store-account__card-link-text">
                  or Login with :
                </h3>
                <div className="store-account__card-loginoptions">
                  <button className="store-account__card-link-media bg-google">
                    <i class="bg-grey fa-brands fa-google"></i>
                  </button>
                  <button className="store-account__card-link-media bg-facebook">
                    <i class="bg-grey fa-brands fa-facebook-f"></i>
                  </button>
                  <button className="store-account__card-link-media  bg-twitter">
                    <i class="bg-grey fa-brands fa-twitter"></i>
                  </button>
                </div>
              </div>
              <div className="store-account__form">
                <form
                  className="store-account__form-control"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="store-account__form-control-validation">
                    <TfiEmail className="store-account__form-control-icons" />
                    <input
                      type="email"
                      className="store-account__form-control-validation-text"
                      placeholder="Email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <p className="fieldmssg-error">{formik.errors.email}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="store-account__form-control-validation">
                    <TfiLock className="store-account__form-control-icons" />
                    <input
                      type="password"
                      className="store-account__form-control-validation-text"
                      placeholder="Password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {!formik.touched.password && formik.errors.password ? (
                      <p className="fieldmssg-error">
                        {formik.errors.password}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="user-login">
                    <span>
                      Register With Us
                      <Link to="/account">
                        <Button>Sign Up</Button>
                      </Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginUser;
