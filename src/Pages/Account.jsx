import React from "react";
import { TfiEmail, TfiLock } from "react-icons/tfi";
import { Button } from "../Styles/Button.style";
function Account() {
  return (
    <section>
      <div className="store-account">
        <div className="store-account__container">
          <div className="store-account__content">
            <div className="store-account__card">
              <div className="store-account__card-body">
                <h1 className="store-account__card-title">Login</h1>
                <div className="store-account__card-link">
                  <h3 className="store-account__card-link-text">
                    Or Login with :
                  </h3>
                  <div>
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
                    action=""
                    method="get"
                  >
                    <p>Or using form below</p>
                    <div className="store-account__form-control-validation">
                      <TfiEmail className="store-account__form-control-validation-mail" />

                      <input
                        type="text"
                        className="store-account__form-control-validation-text"
                        placeholder="Email"
                      />
                    </div>
                    <div className="store-account__form-control-validation">
                      <TfiLock className="store-account__form-control-validation-password" />
                      <input
                        type="text"
                        className="store-account__form-control-validation-text"
                        placeholder="Password"
                      />
                    </div>
                    <div className="btn-red">
                      <Button
                        bgColor="#fe4042;"
                        borderRadius="5px"
                        color="white"
                        padding="14px"
                        fontSize="18px"
                      >Sign In</Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Account;
