import React from "react";
import { TfiEmail, TfiLock } from "react-icons/tfi";
import { Button } from "../Styles/Button.style";
import { LiaUserCircle } from "react-icons/lia";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loginlogo from "../Images/login-logo.png";

function Account() {
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
      const error = {};
      if (!values.confirmPssd) {
        error.confirmPssd = "Required";
      } else if (values.confirmPssd !== values.password) {
        error.confirmPssd = "Confirm Password should match";
      }
      return error;
    },
    onSubmit: (value) => {
      console.log(value);
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
                  <a
                    className="store-account__card-link-media bg-google"
                    href="/"
                  >
                    <i class="bg-grey fa-brands fa-google"></i>
                  </a>
                  <a
                    className="store-account__card-link-media bg-facebook"
                    href="/"
                  >
                    <i class="bg-grey fa-brands fa-facebook-f"></i>
                  </a>
                  <a
                    className="store-account__card-link-media  bg-twitter"
                    href="/"
                  >
                    <i class="bg-grey fa-brands fa-twitter"></i>
                  </a>
                </div>
              </div>
              <div className="store-account__form">
                <form
                  className="store-account__form-control"
                  onSubmit={formik.handleSubmit}
                >
                  <p>Or Create using below</p>
                  <div className="store-account__form-control-validation">
                    <LiaUserCircle className="store-account__form-control-icons" />
                    <input
                      type="text"
                      className="store-account__form-control-validation-text"
                      placeholder="Username"
                      name="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                      <p className="fieldmssg-error">
                        {formik.errors.username}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
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
                      value={formik.values.password}
                      placeholder="Password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <p className="fieldmssg-error">
                        {formik.errors.password}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="store-account__form-control-validation">
                    <TfiLock className="store-account__form-control-icons" />
                    <input
                      type="password"
                      className="store-account__form-control-validation-text"
                      value={formik.values.confirmPssd}
                      placeholder="Confirm Password"
                      name="confirmPssd"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPssd && formik.errors.confirmPssd ? (
                      <p className="fieldmssg-error">
                        {formik.errors.confirmPssd}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="btn-red">
                    <Button
                      bgColor="#383fdc"
                      borderRadius="5px"
                      color="white"
                      padding="14px"
                      fontSize="18px"
                      type="submit"
                    >
                      Sign In
                    </Button>
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

export default Account;
